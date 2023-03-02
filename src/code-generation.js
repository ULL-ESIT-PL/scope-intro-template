const recast = require("recast");
const Support = require("./support-lib.js");

const template = (name, fun) => `const ${name} = ${fun.toString()};\n`;
const path = require('path');

function buildSupportCode(dependencies) {
  /* Returns the code for the support functions used in the program. */
  /* fill the code */
  return code;
}

module.exports = function codeGen(ast) {
  let fullPath = path.join(__dirname, 'complex.js');
  let preamble = 
`#!/usr/bin/env node
const Complex = require("${fullPath}");  
`;
  preamble += buildSupportCode(ast.dependencies);
  let output = preamble+recast.print(ast.ast).code;
  return output;  
}
