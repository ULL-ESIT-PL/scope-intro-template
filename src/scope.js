const { $, dast2json } = require('./utils.js')
const deb = require('./deb.js');

const {
  buildIdentifier,
  buildVariableDeclaration,
  buildVariableDeclarator,
} = require('./ast-build');

const astTypes = require("ast-types");

const Support = require("./support-lib.js");
// Build regexp matching the names of the support functions /factorial|power|min|max|.../
let functionNames = Object.keys(Support).map(n => n.replace(/[$*.^]/, '[$&]')) // Escape regexp special characters
const patternIsSupport = new RegExp(functionNames.join('|'));

function dependencies(dAst) {
  /* Write the code to detect which support functions are used in the program. */
  return dAst;
}

// Builds the set of variables that are initialized in the program
const initializedVariables = (dAst) => {
  /* Write the code to detect which variables are initialized in the program. */
  return dAst;
};

// Detects which variables are used in the program
const usedVariables = (dAst) => {
  /* Write the code to detect which variables are used in the program. */
  return dAst;
};

module.exports = {
  initializedVariables,
  dependencies,
  usedVariables,
}