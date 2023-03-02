#!/usr/bin/env node
const {deb} = require('./deb.js');
const { difference, notDeclared } = require('./utils.js');
const p = require("./calc").parser;
const fs = require('fs/promises');
const { initializedVariables, dependencies, usedVariables } = require('./scope.js');
const codeGen = require('./code-generation.js')
const writeCode = require('./write-code.js');

module.exports = async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8')
  let ast;
  try {
    ast = p.parse(input);
  } catch (e) {
    let m = e.message.replace(/\s*'UNEXPECTED'\s*,?/, '')
    console.error(m);
    process.exit(1);
  }

  ast = dependencies(ast);
  ast = initializedVariables(ast);
  ast = usedVariables(ast);
  let d = difference(ast.used, ast.symbolTable)
  if (d.size > 0) { 
    console.error(notDeclared(d).join(''));
    process.exit(1);
  }

  let output = codeGen(ast);
  
  writeCode(output, outputFile);
}

