%{
const { 
  buildRoot, 
  buildBinaryExpression, 
  buildLiteral, 
  buildCallExpression, 
  buildIdentifier,
  buildAssignmentExpression,
  buildSequenceExpression,
  buildCallMemberExpression,
  buildMax,
  buildMin,
} = require('./ast-build');
const {$} = require('./utils.js')
%}

/* complete the precedences */
%left '@'
%left '&'
%left '-' '+'
%left '*' '/'
%nonassoc UMINUS
%right '**'
%left '!'
%%
es: e { return { ast: buildRoot($e) }; }
;

e: /* complete the grammar */
   /* ... */   
  | e '@' e             { $$ = buildMax($e1, $e2); }
  | e '&' e             { $$ = buildMin($e1, $e2); }

  | e '-' e             { $$ = buildCallMemberExpression($e1, 'sub', [$e2]); }
  | e '+' e             { $$ = buildCallMemberExpression($e1, 'add', [$e2]); }
  | e '*' e             { $$ = buildCallMemberExpression($e1, 'mul', [$e2]); }
  | e '/' e             { $$ = buildCallMemberExpression($e1, 'div', [$e2]); }
  | e '**' e            { $$ = buildCallMemberExpression($e1, 'pow', [$e2]); }
  | '(' e ')'           { $$ = $2; }
  | '-' e %prec UMINUS  { $$ = buildCallMemberExpression($e, 'neg', []); }
  | e '!'               { $$ = buildCallExpression('factorial', [$e], true); }
  | N                   { $$ = buildCallExpression('Complex',[buildLiteral($N)], true); }
  /* ... */
;