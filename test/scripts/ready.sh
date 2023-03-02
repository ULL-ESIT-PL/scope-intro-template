#!/bin/bash
cat test/data/input/test"$1".calc
bin/calc2js.mjs test/data/input/test"$1".calc -o test/data/expectedjs/correct"$1".js
node test/data/expectedjs/correct"$1".js > test/data/expectedout/correct-out"$1".txt
node test/scripts/push-description.mjs $1
#npx mocha --grep "test$1\\.calc" test/test.mjs 