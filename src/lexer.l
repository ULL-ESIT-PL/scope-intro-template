%{
const reservedWords = ["print","i"]  

const idOrReserved = text => { /* complete this function */  }
%}
number [0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?"i"?|"i"

%%
\s+            /* skip whites */;
/* complete the call to number */       return 'N';
[a-zA-Z_]\w*   return /* complete the code */; 
'**'           return '**';
[-=+*/!(),@&]  return yytext;
