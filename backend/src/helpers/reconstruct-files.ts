import fs from 'fs';
import readline from 'readline';
import path from'path';
import xlsx from 'xlsx';
import { validator } from './validate-data';
import ReplaceStream from 'replacestream';
import csvParser from 'csv-parser';
import stripBomStream from 'strip-bom-stream';

export const fitbitSummary = async (filePath: string, validators: any, db: any, sessionId: string, uuid: string, bufferLength: number, ajv: any) => {
    const parser = readline.createInterface({
        input: fs.createReadStream(filePath)
    });
    const headers = '^Date,Weight,BMI,Fat$|' + 
                    '^Date,Calories In$|' +
                    '^Date,Calories Burned,Steps,Distance,Floors,Minutes Sedentary,Minutes Lightly Active,Minutes Fairly Active,Minutes Very Active,Activity Calories$|' +
                    '^Start Time,End Time,Minutes Asleep,Minutes Awake,Number of Awakenings,Time in Bed,Minutes REM Sleep,Minutes Light Sleep,Minutes Deep Sleep$';
    let counter: number;
    let fileName: string;
    let items: string[];
    let data: any;
    let buffer: Promise<any[]>[] = [];
    return await new Promise<boolean>(resolve => {
        parser.on('line', line => {
            if (line.match('^Body$|^Foods$|^Activities$|^Sleep$|Food Log')) {
                counter = 0;
                counter++;
                fileName = path.join(path.dirname(filePath), line + '.csv');
            } else if (line.match(headers) && counter === 1) {
                counter++;
                items = line.replace(/ /g, '_').split(',');
            } else if (counter === 2) {
                if (line !== '') {
                    data = {};
                    const vals = line.replace(/("\d+)\,(\d+")/g, '$1$2').replace(/"/g, '').split(',');
                    for (let i=0; i<items.length; i++) {
                        data[items[i]] = vals[i];
                    }
                    buffer.push(validator(data, validators, uuid, ajv));
                    if (buffer.length > bufferLength) {
                        parser.pause();
                        Promise.all(buffer).then(x => {
                            return db.collection(sessionId).insertMany(x.flat());
                        }).then(() => {
                            parser.resume();
                        }).catch((e) => {
                            console.log(e);
                        });
                        buffer = [];
                    }
                }
            }
        }).on('close', async () => {
            if (buffer.length > 0) {
                try {
                    await db.collection(sessionId).insertMany((await Promise.all(buffer)).flat());
                } catch (error) {
                    console.log(error);
                }
            }
            resolve(true);
        }).on('error', async (e) => {
            //console.log(e);
            resolve(true);
        });
    });
};

export const huaweiXLS = async (filePath: string, validators: any, db: any, sessionId: string, uuid: string, bufferLength: number, ajv: any) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    if (sheetName === '1-user basic info') {
        const worksheet = workbook.Sheets[sheetName];
        const data = {
            weight: (worksheet['B1'] ? worksheet['B1'].v : 'null'),
            height: (worksheet['B2'] ? worksheet['B2'].v : 'null'),
            unitType: (worksheet['B3'] ? worksheet['B3'].v : 'null'),
            modifyTime: (worksheet['B4'] ? worksheet['B4'].v : 'null')
        };
        try {
            await db.collection(sessionId).insertMany(await validator(data, validators, uuid, ajv));
        } catch (error) {
            console.log(error);
        }
    }
};

export const samsungProfile = async (filePath: string, validators: any, db: any, sessionId: string, uuid: string, bufferLength: number, ajv: any) => {
    const parser = fs.createReadStream(filePath)
        .pipe(ReplaceStream(/com.samsung.health.\w+.\w+,\d+,\d+\n/, ''))
        .pipe(ReplaceStream(/,\n/g, '\n'))
        .pipe(stripBomStream())
        .pipe(csvParser());
    const obj = {
        height: {
            value: '',
            create_time: ''
        },
        weight: {
            value: '',
            create_time: ''
        },
        birth_date: '',
        gender: ''
    };
    return await new Promise<boolean>(resolve => {
        parser.on('data', async (data: any) => {
            if (data['key'] === 'height') {
                obj.height.value = data['float_value'];
                obj.height.create_time = data['create_time'];
            } else if (data['key'] === 'weight') {
                obj.weight.value = data['float_value'];
                obj.weight.create_time = data['create_time'];
            } else if (data['key'] === 'birth_date') {
                obj.birth_date = data['text_value'];
            } else if (data['key'] === 'gender') {
                obj.gender = data['text_value'];
            }
        }).on('end', async () => {
            try {
                const array = await validator(obj, validators, uuid, ajv);
                if (array.length) {
                    await db.collection(sessionId).insertMany(array);
                }
                // await db.collection(sessionId).insertMany((await Promise.all(buffer)).flat());
            } catch (error) {
                console.log(error);
            }
            resolve(true);
        }).on('error', async (e: any) => {
            //console.log(e);
            resolve(true);
        });
    });
};