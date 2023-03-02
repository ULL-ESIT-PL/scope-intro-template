import transpile from "../src/transpile.js";
import assert from 'assert';
import * as fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import  * as  shell from 'shelljs';

const __dirname = dirname(fileURLToPath(import.meta.url));
import Tst from './test-description.mjs';

const Test = Tst.map(t => ({
  input: __dirname + '/data/input/' + t.input,
  actualjs: __dirname + '/data/actualjs/' + t.actualjs,
  expectedjs: __dirname + '/data/expectedjs/' + t.expectedjs,
  expectedout: __dirname + '/data/expectedout/' + t.expectedout,
})
)

function removeSpaces(s) {
  return s.replace(/\s/g, '');
}

for (let i = 0; i < Test.length; i++) {
  it(`transpile(${Tst[i].input}, ${Tst[i].actualjs})`,  () => {

    // Compile the input and check the actualjs program is what expected
    transpile(Test[i].input, Test[i].actualjs);
    let actualjs = fs.readFileSync(Test[i].actualjs, 'utf-8')
    //console.log(`**********actualjs ${Test[i].actualjs}*******\n`,actualjs);
  
    let expectedjs = fs.readFileSync(Test[i].expectedjs, 'utf-8')
    //sconsole.log(`*********expectedjs ${Test[i].expectedjs}******\n`, expectedjs);
    assert.equal(removeSpaces(actualjs), removeSpaces(expectedjs));

    // Run the output program and check the logged output is what expected
    

    let expectedout = fs.readFileSync(Test[i].expectedout, 'utf-8')
    let exec = shell.default.exec;
    let result = exec(`node ${Test[i].actualjs}`, {silent:true});
    //console.error(`result  = ${result}`)
    
    assert.equal(removeSpaces(result.stdout), removeSpaces(expectedout))

    //fs.unlinkSync(Test[i].actualjs);

  });
}

