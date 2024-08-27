interface FunctionInfo {
    syntax: string;
    description: string;
    parameters: { name: string; description: string; }[];
    example?: string | null;
    returns: null | string;
}

export function newCMD(
    name: string,
    syntax: string,
    description: string,
    parameters: { name: string; description: string; }[],
    returns: string | null = null,
    example?: string | null
) {
    functions[name] = {
        syntax,
        description,
        parameters,
        returns,
        example
    };
}


export const functions: { [key: string]: FunctionInfo } = {};

newCMD('PRINT', 'PRINT {ANY}', 'Print something in the console.', [{ name: 'ANY', description: 'Any datatype' }], null, 'PRINT "Hello World"');

// Variables
newCMD('SET', 'SET {VAR} AS {ANY}\nSET {ARRAY_VAR} AS {ARRAY}', 'Define or modify a variable.', [{ name: 'VAR', description: 'Variable.' }, { name: 'ANY', description: 'Value of the variable.' }], null, 'SET $x AS 15 * 15\nSET [$x, $y, $z] AS [100, 200, -1]');

newCMD(
    'UNSET',
    'UNSET {VAR}\nUNSET {ARRAY_VAR}',
    'Unset a variable or an array of variables.',
    [
        { name: 'VAR', description: 'Variable to unset.' },
        { name: 'ARRAY_VAR', description: 'Array of variables to unset.' }
    ],
    'NULL',
    'UNSET $my_var\nUNSET [$var1, $var2, $var3]'
);

newCMD(
    'INCREMENT',
    'INCREMENT {VAR}\nINCREMENT {VAR} WITH {NUMBER}',
    'Increment a variable by 1 or by a specified number.',
    [
        { name: 'VAR', description: 'Variable to increment.' },
        { name: 'NUMBER', description: 'Number to increment the variable by.' }
    ],
    'NUMBER',
    'INCREMENT $counter\nINCREMENT $counter WITH 5'
);

newCMD(
    'DECREMENT',
    'DECREMENT {VAR}\nDECREMENT {VAR} WITH {NUMBER}',
    'Decrement a variable by 1 or by a specified number.',
    [
        { name: 'VAR', description: 'Variable to decrement.' },
        { name: 'NUMBER', description: 'Number to decrement the variable by.' }
    ],
    'NUMBER',
    'DECREMENT $counter\nDECREMENT $counter WITH 3'
);

newCMD(
    'APPEND',
    'APPEND {ANY} TO {ARRAY}',
    'Append a value to an array.',
    [
        { name: 'ANY', description: 'Value to append.' },
        { name: 'ARRAY', description: 'Array to append the value to.' }
    ],
    'NULL',
    'APPEND "newItem" TO $myArray'
);

newCMD(
    'GET',
    'GET {NUMBER|STRING} IN {ARRAY|MAP} [AS {VAR}]',
    'Get a value from a data source.',
    [
        { name: 'NUMBER|STRING', description: 'Index or key to get from a data source.' },
        { name: 'ARRAY|MAP', description: 'Data source.' },
        { name: 'VAR', description: 'Variable to store the value.' }
    ],
    'ANY | NULL',
    'GET 1 IN [1, 2, 3]\nGET "name" IN $map AS $value'
);

newCMD(
    'PICK',
    '1. PICK {ANY} OR {ANY} [AS {VAR}]\n2. PICK {ARRAY} [AS {VAR}]',
    'Pick selects a TRUE value between two elements or the first `TRUE` value from an array.',
    [
        { name: 'ANY', description: 'Any value.' },
        { name: 'ARRAY', description: 'Array to pick the value from.' },
        { name: 'VAR', description: 'Variable to store the value.' }

    ],
    "ANY",
    'PICK "apple" OR "banana"\nPICK "apple" OR "banana" AS $fruit\nPICK [FALSE, "", TRUE]'
);

newCMD(
    'CLEAR',
    'CLEAR {ANY}',
    'Clear the value of a variable, an array or a map.',
    [
        { name: 'ANY', description: 'Array, map or variable to clear.' }
    ],
    'NULL',
    'CLEAR $myArray'
);

newCMD(
    'COPY',
    'COPY {ANY} [AS {VAR}]',
    'Copy a value to a new variable.',
    [
        { name: 'ANY', description: 'Value to copy.' },
        { name: 'VAR', description: 'Variable to store the copied value.' }
    ],
    'ANY',
    'COPY $source\nCOPY $source AS $destination'
);

newCMD(
    'CLONE',
    'CLONE {ANY} [AS {VAR}]',
    'Clone a value to a new variable.',
    [
        { name: 'ANY', description: 'Value to clone.' },
        { name: 'VAR', description: 'Variable to store the cloned value.' }
    ],
    'ANY',
    'CLONE $source\nCLONE $source AS $clone'
);

newCMD(
    'VAR_SET',
    'VAR_SET {STRING} AS {ANY}',
    'Assigns a value to a variable with a specific name.',
    [
        { name: 'STRING', description: 'Name of the variable to set.' },
        { name: 'ANY', description: 'Value to assign to the variable.' }
    ],
    'NULL',
    'VAR_SET "myVar" AS 10'
);

newCMD(
    'VAR_GET',
    'VAR_GET {STRING} [AS {VAR}]',
    'Retrieves the value of a variable with a specific name.',
    [
        { name: 'STRING', description: 'Name of the variable to get.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ANY',
    'SET $var1 AS 1\n' +
    'SET $id AS 1\n' +
    'PRINT VAR_GET "var" + $id;'
);

newCMD(
    'VAR_UNSET',
    'VAR_UNSET {STRING}',
    'Unset a variable with a specific name.',
    [
        { name: 'STRING', description: 'Name of the variable to remove.' }
    ],
    'NULL',
    'VAR_UNSET "myVar"'
);

newCMD(
    'VAR_EXISTS',
    'VAR_EXISTS {STRING} [AS {VAR}]',
    'Checks if a variable with a specific name exists.',
    [
        { name: 'STRING', description: 'Name of the variable to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'VAR_EXISTS "myVar" AS $exists'
);

newCMD(
    'GLOBAL_SET',
    'GLOBAL_SET {VAR|ARRAY_VAR} [AS {ANY|ARRAY}]',
    'Assigns a value to a variable or an array of variables globally.',
    [
        { name: 'VAR|ARRAY_VAR', description: 'Variable or array of variables to set.' },
        { name: 'ANY|ARRAY', description: 'Value(s) to assign to the variable(s).' }
    ],
    'NULL',
    'DEFINE EXAMPLE\n' +
    '    GLOBAL_SET $var AS "Hello World"\n\n' +
    'EXAMPLE\n' +
    'PRINT $var'
);

// RASSIGN
newCMD(
    'RASSIGN',
    'RASSIGN {ANY} TO {DEST}',
    'Exposes variables to higher contexts or returns the value if DEST is `NULL`. Imitates the functionality of `[AS {VAR}]` in custom commands.',
    [
        { name: 'ANY', description: 'Value or result to assign or return.' },
        { name: 'DEST', description: 'Destination variable name or NULL.' }
    ],
    'ANY | NULL',
    'DEFINE TEST\n' +
    '    RASSIGN "hola" TO "$var"\n'+
    'TEST\n'+
    'PRINT $var'
);


// Format
newCMD(
    'PRINT',
    'PRINT {ANY}',
    'Prints a value to the console.',
    [
        { name: 'ANY', description: 'Any datatype to print.' }
    ],
    'NULL',
    'PRINT "Hello World"'
);

newCMD(
    'PRINTF',
    'PRINTF {ANY}',
    'Prints a formatted value to the console.',
    [
        { name: 'ANY', description: 'Any datatype to format and print.' }
    ],
    'NULL',
    'PRINTF {"name": "Martin", "age": 23, "id": 012121}'
);

newCMD(
    'PRINTL',
    'PRINTL {ARRAY}',
    'Prints each element of an array on the same line.',
    [
        { name: 'ARRAY', description: 'Array of values to print.' }
    ],
    'NULL',
    'PRINTL ["Hello", "world", "123"]'
);

// Math
newCMD(
    'SUM',
    '1. SUM {ARRAY_NUMBER} [AS {VAR}]\n2. SUM {NUMBER} TO {NUMBER} [AS {VAR}]',
    'Calculate the sum of numbers.',
    [
        { name: 'NUMBER', description: 'Number to add.' },
        { name: 'ARRAY_NUMBER', description: 'Array of numbers to sum.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'SUM [1, 2, 3]\nSUM 5 TO 10 AS $total'
);

newCMD(
    'SUBTRACT',
    '1. SUBTRACT {ARRAY_NUMBER} [AS {VAR}]\n2. SUBTRACT {NUMBER} WITH {NUMBER} [AS {VAR}]',
    'Calculate the difference between numbers.',
    [
        { name: 'NUMBER', description: 'Number to subtract.' },
        { name: 'ARRAY_NUMBER', description: 'Array of numbers to subtract.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'SUBTRACT [10, 5, 2]\nSUBTRACT 15 WITH 5'
);

newCMD(
    'MULTIPLY',
    '1. MULTIPLY {ARRAY_NUMBER} [AS {VAR}]\n2. MULTIPLY {NUMBER} BY {NUMBER} [AS {VAR}]',
    'Calculate the product of numbers',
    [
        { name: 'NUMBER', description: 'Number to multiply by.' },
        { name: 'ARRAY_NUMBER', description: 'Array of numbers to multiply.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    '1. MULTIPLY [2, 3, 4]\n2. MULTIPLY 5 BY 4'
);

newCMD(
    'DIVIDE',
    '1. DIVIDE {ARRAY_NUMBER} [AS {VAR}]\n2. DIVIDE {NUMBER} BY {NUMBER} [AS {VAR}]',
    'Calculate the quotient of numbers.',
    [
        { name: 'NUMBER', description: 'Number to divide by.' },
        { name: 'ARRAY_NUMBER', description: 'Array of numbers to divide.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DIVIDE [10, 5, 2]\nDIVIDE 20 BY 4 AS $result'
);

newCMD(
    'MIN',
    'MIN {ARRAY_NUMBER} [AS {VAR}]',
    'Find the minimum value from an array of numbers.',
    [
        { name: 'ARRAY_NUMBER', description: 'Array of numbers to find the minimum from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'PRINT MIN [10, 5, 7];\nMIN [$age_1, $age_2, $age_3] AS $minValue'
);

newCMD(
    'MAX',
    'MAX {ARRAY_NUMBER} [AS {VAR}]',
    'Find the maximum value from an array of numbers.',
    [
        { name: 'ARRAY_NUMBER', description: 'Array of numbers to find the maximum from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'SET $max AS MAX [10, 5, 7];'
);

newCMD(
    'BOUND',
    'BOUND {NUM1} WITH {NUM2} AND {NUM3} [AS {VAR}]',
    'Bound a value within a range.',
    [
        { name: 'NUM1', description: 'Value to bound.' },
        { name: 'NUM2', description: 'Minimum value.' },
        { name: 'NUM3', description: 'Maximum value.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'BOUND 10 WITH 5 AND 15 AS $boundedValue'
);


newCMD(
    'ROUND',
    'ROUND {NUMBER} [AS {VAR}]',
    'Round a number to the nearest integer.',
    [
        { name: 'NUMBER', description: 'Number to round.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'ROUND 10.6'
);

newCMD(
    'ROUND_UP',
    '1. ROUND_UP {NUM1}\[AS {VAR}]\n2. ROUND_UP {NUM1} TO {NUM2} [AS {VAR}]',
    'Round a number up to the nearest integer or specified number.',
    [
        { name: 'NUM1', description: 'Number to round up.' },
        { name: 'NUM2', description: 'Optional number to specify the rounding precision.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' },
    ],
    'NUMBER',
    'ROUND_UP 10.2\nROUND_UP 10.2 TO 2 AS $roundedNumber'
);

newCMD(
    'ROUND_DOWN',
    '1. ROUND_DOWN {NUM1} [AS {VAR}]\n2. ROUND_DOWN {NUM1} TO {NUM2} [AS {VAR}]',
    'Round a number down to the nearest integer or specified number.',
    [
        { name: 'NUM1', description: 'Number to round down.' },
        { name: 'NUM2', description: 'Optional number to specify the rounding precision.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }

    ],
    'NUMBER',
    'ROUND_DOWN 10.8 AS $roundedNumber\nROUND_DOWN 10.8 TO 5'
);

newCMD(
    'FRAC',
    'FRAC {NUMBER} [AS {VAR}]',
    'Get the fractional part of a number.',
    [
        { name: 'NUMBER', description: 'Number to get the fractional part from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'FRAC 10.75\nFRAC 10.75 AS $fractionalPart'
);

newCMD(
    'FRACTIONAL',
    'FRACTIONAL {NUMBER} [AS {VAR}]',
    'Get the fractional part of a number.',
    [
        { name: 'NUMBER', description: 'Number to get the fractional part from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'FRACTIONAL 10.75'
);


newCMD(
    'SQRT',
    'SQRT {NUMBER} [AS {VAR}]',
    'Calculate the square root of a number.',
    [
        { name: 'NUMBER', description: 'Number to calculate the square root of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'SQRT 9 AS $result'
);

newCMD(
    'ABS',
    'ABS {NUMBER} [AS {VAR}]',
    'Calculate the absolute value of a number.',
    [
        { name: 'NUMBER', description: 'Number to calculate the absolute value of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'ABS -5 AS $result'
);

newCMD(
    'SIN',
    'SIN {NUMBER} [AS {VAR}]',
    'Calculate the sine of a number (in radians).',
    [
        { name: 'NUMBER', description: 'Number to calculate the sine of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'SIN 1.57 AS $result'
);

newCMD(
    'COS',
    'COS {NUMBER} [AS {VAR}]',
    'Calculate the cosine of a number (in radians).',
    [
        { name: 'NUMBER', description: 'Number to calculate the cosine of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'COS 1.57 AS $result'
);

newCMD(
    'TAN',
    'TAN {NUMBER} [AS {VAR}]',
    'Calculate the tangent of a number (in radians).',
    [
        { name: 'NUMBER', description: 'Number to calculate the tangent of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'TAN 1.57 AS $result'
);

newCMD(
    'LOG',
    'LOG {NUMBER} [AS {VAR}]',
    'Calculate the natural logarithm (base e) of a number.',
    [
        { name: 'NUMBER', description: 'Number to calculate the natural logarithm of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'LOG 10 AS $result'
);

newCMD(
    'LOG10',
    'LOG10 {NUMBER} [AS {VAR}]',
    'Calculate the base-10 logarithm of a number.',
    [
        { name: 'NUMBER', description: 'Number to calculate the base-10 logarithm of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'LOG10 10\nLOG10 10 AS $result'
);

newCMD(
    'LOGN',
    'LOGN {NUM1} OF {NUM2} [AS {VAR}]',
    'Calculate the logarithm of a number with a specified base.',
    [
        { name: 'NUM1', description: 'Number to calculate the logarithm of.' },
        { name: 'NUM2', description: 'Base of the logarithm.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'LOGN 100 OF 10 AS $result'
);

newCMD(
    'POWER',
    'POWER {NUM1} TO {NUM2} [AS {VAR}]',
    'Calculate the power of a number raised to a specified exponent.',
    [
        { name: 'NUM1', description: 'Base number.' },
        { name: 'NUM2', description: 'Exponent.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'POWER 2 TO 3\nPOWER 2 TO 3 AS $result'
);

newCMD(
    'POW',
    'POW {NUM1} TO {NUM2} [AS {VAR}]',
    'Calculate the power of a number raised to a specified exponent. Alias of `POWER`.',
    [
        { name: 'NUM1', description: 'Base number.' },
        { name: 'NUM2', description: 'Exponent.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'POW 2 TO 3 AS $result'
);

newCMD(
    'MOD',
    'MOD {NUM1} BY {NUM2} [AS {VAR}]',
    'Calculate the modulus (remainder) of a number divided by another number.',
    [
        { name: 'NUM1', description: 'Dividend.' },
        { name: 'NUM2', description: 'Divisor.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'MOD 10 BY 3 AS $result'
);

newCMD(
    'EXP',
    'EXP {NUMBER} [AS {VAR}]',
    'Calculate the exponential of a number.',
    [
        { name: 'NUMBER', description: 'Number to calculate the exponential of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'EXP 2\nEXP 2 AS $result'
);

newCMD(
    'FACTORIAL',
    'FACTORIAL {NUMBER} [AS {VAR}]',
    'Calculate the factorial of a number.',
    [
        { name: 'NUMBER', description: 'Number to calculate the factorial of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'FACTORIAL 5 AS $result'
);

newCMD(
    'AVERAGE',
    'AVERAGE {ARRAY_NUMBER} [AS {VAR}]',
    'Calculate the average of a list of numbers.',
    [
        { name: 'ARRAY_NUMBER', description: 'Array of numbers to calculate the average of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'AVERAGE [1, 2, 3, 4] AS $result'
);

newCMD(
    'MEDIAN',
    'MEDIAN {ARRAY_NUMBER} [AS {VAR}]',
    'Calculate the median of a list of numbers.',
    [
        { name: 'ARRAY_NUMBER', description: 'Array of numbers to calculate the median of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'MEDIAN [1, 2, 3, 4] AS $result'
);

newCMD(
    'MODE',
    'MODE {ARRAY_NUMBER} [AS {VAR}]',
    'Calculate the mode of a list of numbers.',
    [
        { name: 'ARRAY_NUMBER', description: 'Array of numbers to calculate the mode of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'MODE [1, 2, 2, 3]'
);

newCMD(
    'STDEV',
    'STDEV {ARRAY_NUMBER} [AS {VAR}]',
    'Calculate the standard deviation of a list of numbers.',
    [
        { name: 'ARRAY_NUMBER', description: 'Array of numbers to calculate the standard deviation of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'STDEV [1, 2, 3, 4] AS $result'
);


newCMD(
    'VARIANCE',
    'VARIANCE {ARRAY_NUMBER} [AS {VAR}]',
    'Calculate the variance of a list of numbers.',
    [
        { name: 'ARRAY_NUMBER', description: 'Array of numbers to calculate the variance of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'VARIANCE [1, 2, 3, 4] AS $result'
);


// Types

newCMD(
    'TYPE',
    'TYPE {ANY} [AS {VAR}]',
    'Get the type of a variable or value.',
    [
        { name: 'ANY', description: 'Value or variable to get the type of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'TYPE $variable AS $type'
);

newCMD(
    'STRING',
    'STRING {ANY} [AS {VAR}]',
    'Convert a value to a string.',
    [
        { name: 'ANY', description: 'Value to convert to a string.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'STRING 123 AS $result'
);

newCMD(
    'NUMBER',
    'NUMBER {ANY} [AS {VAR}]',
    'Convert a value to an integer.',
    [
        { name: 'ANY', description: 'Value to convert to an integer.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'NUMBER "123" AS $result'
);

newCMD(
    'FLOAT',
    'FLOAT {ANY} [AS {VAR}]',
    'Convert a value to a float.',
    [
        { name: 'ANY', description: 'Value to convert to a float.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'FLOAT "123.45" AS $result'
);

newCMD(
    'BOOL',
    'BOOL {ANY} [AS {VAR}]',
    'Convert a value to a boolean.',
    [
        { name: 'ANY', description: 'Value to convert to a boolean.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'BOOL "true" AS $result'
);

newCMD(
    'ARRAY',
    'ARRAY {ANY} [AS {VAR}]',
    'Convert a value to an array.',
    [
        { name: 'ANY', description: 'Value to convert to an array.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'ARRAY {"name": "Martin", "age": 23} AS $array'
);

newCMD(
    'MAP',
    'MAP {ANY} [AS {VAR}]',
    'Convert a value to a map.',
    [
        { name: 'ANY', description: 'Value to convert to a map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'MAP [["name", "Martin"], ["age", 23]] AS $map'
);

newCMD(
    'LENGTH',
    'LENGTH {ANY} [AS {VAR}]',
    'Get the length of a string, array, or map.',
    [
        { name: 'ANY', description: 'Value to get the length of.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'LENGTH "hello"\nLENGTH [1, 2, 3]\nLENGTH { "key": "value" } AS $result'
);


// String manipulation
newCMD(
    'CAPITALIZE',
    'CAPITALIZE {STRING} [AS {VAR}]',
    'Capitalize the first letter of a string.',
    [
        { name: 'STRING', description: 'String to capitalize.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'CAPITALIZE "hello" AS $result'
);

newCMD(
    'UPPERCASE',
    'UPPERCASE {STRING} [AS {VAR}]',
    'Convert a string to uppercase.',
    [
        { name: 'STRING', description: 'String to convert to uppercase.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'UPPERCASE "hello" AS $result'
);

newCMD(
    'LOWERCASE',
    'LOWERCASE {STRING} [AS {VAR}]',
    'Convert a string to lowercase.',
    [
        { name: 'STRING', description: 'String to convert to lowercase.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'LOWERCASE "HELLO" AS $result'
);

newCMD(
    'TITLECASE',
    'TITLECASE {STRING} [AS {VAR}]',
    'Convert a string to title case.',
    [
        { name: 'STRING', description: 'String to convert to title case.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'TITLECASE "hello world" AS $result'
);

newCMD(
    'SWAPCASE',
    'SWAPCASE {STRING} [AS {VAR}]',
    'Swap the case of each character in a string.',
    [
        { name: 'STRING', description: 'String to swap case.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'SWAPCASE "Hello World" AS $result'
);

newCMD(
    'CAMELCASE',
    'CAMELCASE {STRING} [AS {VAR}]',
    'Convert a string to camel case.',
    [
        { name: 'STRING', description: 'String to convert to camel case.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'CAMELCASE "hello world" AS $result'
);

newCMD(
    'SNAKECASE',
    'SNAKECASE {STRING} [AS {VAR}]',
    'Convert a string to snake case.',
    [
        { name: 'STRING', description: 'String to convert to snake case.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'SNAKECASE "hello world" AS $result'
);

newCMD(
    'SLUG',
    'SLUG {STRING} [AS {VAR}]',
    'Convert a string to a slug.',
    [
        { name: 'STRING', description: 'String to convert to a slug.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'SLUG "Hello World" AS $result'
);

newCMD(
    'KEBABCASE',
    'KEBABCASE {STRING} [AS {VAR}]',
    'Convert a string to kebab case.',
    [
        { name: 'STRING', description: 'String to convert to kebab case.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'KEBABCASE "hello world" AS $result'
);

newCMD(
    'MACROCASE',
    'MACROCASE {STRING} [AS {VAR}]',
    'Convert a string to macro case.',
    [
        { name: 'STRING', description: 'String to convert to macro case.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'MACROCASE "hello world" AS $result'
);

newCMD(
    'FLATCASE',
    'FLATCASE {STRING} [AS {VAR}]',
    'Convert a string to flat case.',
    [
        { name: 'STRING', description: 'String to convert to flat case.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'FLATCASE "hello world" AS $result'
);

newCMD(
    'CASEFOLD',
    'CASEFOLD {STRING} [AS {VAR}]',
    'Convert a string to casefolded form.',
    [
        { name: 'STRING', description: 'String to convert to casefolded form.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'CASEFOLD "Hello World"'
);

newCMD(
    'SPLIT',
    '1. SPLIT {STRING} BY {STRING} [AS {VAR}]\n2. SPLIT {STRING} BY {PATTERN} [AS {VAR}]',
    'Split a string by a delimiter.',
    [
        { name: 'STRING', description: 'String to split.' },
        { name: 'PATTERN', description: 'Pattern to split by.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY_STRING',
    'SPLIT "hello world" BY " "\nSPLIT "hello123world" BY PATTERN "\d";'
);

newCMD(
    'TRIM',
    'TRIM {STRING} [AS {VAR}]',
    'Trim whitespace from both ends of a string.',
    [
        { name: 'STRING', description: 'String to trim.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'TRIM "  hello  "'
);

newCMD(
    'TRIM_START',
    'TRIM_START {STRING} [AS {VAR}]',
    'Trim whitespace from the start of a string.',
    [
        { name: 'STRING', description: 'String to trim.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'TRIM_START "  hello  "'
);

newCMD(
    'TRIM_END',
    'TRIM_END {STRING} [AS {VAR}]',
    'Trim whitespace from the end of a string.',
    [
        { name: 'STRING', description: 'String to trim.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'TRIM_END "  hello  "'
);

newCMD(
    'CLEAN',
    '1. CLEAN {STRING} [AS {VAR}]\n2. CLEAN {ARRAY} [AS {VAR}]',
    'Removes extra blank spaces in a string or remove false values from an array.',
    [
        { name: 'STRING', description: 'String to clean.' },
        { name: 'ARRAY', description: 'Array to clean.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING | ARRAY',
    'CLEAN "hello   world"\nCLEAN ["", TRUE, 0, FALSE, "Hello"]'
);

newCMD(
    'REPLACE',
    'REPLACE {STRING|PATTERN} WITH {STRING} IN {STRING} [AS {VAR}]',
    'Replace occurrences of a pattern in a string with another string.',
    [
        { name: 'STRING|PATTERN', description: 'String or pattern to replace.' },
        { name: 'STRING', description: 'Replacement string.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'REPLACE $pattern WITH "hi" IN "hello world"\nREPLACE "hello" WITH "hi" IN "hello world" AS $result'
);

newCMD(
    'REPLACE_ALL',
    'REPLACE_ALL {STRING|PATTERN} WITH {STRING} IN {STRING} [AS {VAR}]',
    'Replace all occurrences of a pattern in a string with another string.',
    [
        { name: 'STRING|PATTERN', description: 'String or pattern to replace.' },
        { name: 'STRING', description: 'Replacement string.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'REPLACE_ALL $pattern WITH "hi" IN "hello world hello"\nREPLACE_ALL "hello" WITH "hi" IN "hello world hello" AS $result'
);

newCMD(
    'PAD',
    'PAD {STRING} TO {NUMBER} WITH {FILL} [AS {VAR}]',
    'Pad the STRING text to reach a length of NUMBER using the FILL character.',
    [
        { name: 'STRING', description: 'Text to pad.' },
        { name: 'NUMBER', description: 'Desired length.' },
        { name: 'FILL', description: 'Padding character.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'PAD "bird" TO 10 WITH "-"'
);

newCMD(
    'PAD_START',
    'PAD_START {STRING} TO {NUMBER} WITH {FILL} [AS {VAR}]',
    'Pad the STRING text with the FILL character at the start to reach a length of NUMBER.',
    [
        { name: 'STRING', description: 'Text to pad.' },
        { name: 'NUMBER', description: 'Desired length.' },
        { name: 'FILL', description: 'Padding character.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'PRINT PAD_START "2" TO 2 WITH "0";\nPRINT PAD_START "10" TO 2 WITH "0";'
);

newCMD(
    'PAD_END',
    'PAD_END {STRING} TO {NUMBER} WITH {FILL} [AS {VAR}]',
    'Pad the STRING text with the FILL character at the end to reach a length of NUMBER.',
    [
        { name: 'STRING', description: 'Text to pad.' },
        { name: 'NUMBER', description: 'Desired length.' },
        { name: 'FILL', description: 'Padding character.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'PAD_END "Hello" TO 10 WITH "-" AS $padded_end'
);

newCMD(
    'STARTS',
    'STARTS {SUBSTR} IN {STRING} [AS {VAR}]',
    'Checks if the text starts with the specified substring.',
    [
        { name: 'SUBSTR', description: 'Substring to check at the start.' },
        { name: 'STRING', description: 'Text to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'STARTS "Hel" IN "Hello"'
);

newCMD(
    'ENDS',
    'ENDS {SUBSTR} IN {STRING} [AS {VAR}]',
    'Checks if the text ends with the specified substring.',
    [
        { name: 'SUBSTR', description: 'Substring to check at the end.' },
        { name: 'STRING', description: 'Text to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'ENDS "llo" IN "Hello"'
);

// Command Definitions

// TRUNCATE
newCMD(
    'TRUNCATE',
    '1. TRUNCATE {STRING} TO {NUMBER} [AS {VAR}]\n2. TRUNCATE {STRING} TO {NUMBER} WITH {TOKEN} [AS {VAR}]',
    'Truncates the text to a specified index and optionally appends a default or custom token.',
    [
        { name: 'STRING', description: 'Text to truncate.' },
        { name: 'NUMBER', description: 'Index to truncate the text to.' },
        { name: 'TOKEN', description: 'Custom token to append (optional, default is "...").' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'PRINT TRUNCATE "Hello World" TO 5;\n' +
    'PRINT TRUNCATE "Hello World" TO 5 WITH "***";'
);

// ESCAPE
newCMD(
    'ESCAPE',
    'ESCAPE {STRING} [AS {VAR}]',
    'Escapes special characters in the text.',
    [
        { name: 'STRING', description: 'Text to escape.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'ESCAPE "Hello\\nworld!" AS $escaped'
);

// UNESCAPE
newCMD(
    'UNESCAPE',
    'UNESCAPE {STRING} [AS {VAR}]',
    'Unescapes special characters in the text.',
    [
        { name: 'STRING', description: 'Text to unescape.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'UNESCAPE "Hello\\nWorld!" AS $unescaped'
);

// NORMALIZE
newCMD(
    'NORMALIZE',
    'NORMALIZE {STRING} TO {FORM} [AS {VAR}]',
    'Normalizes the text to a specified Unicode normalization form.',
    [
        { name: 'STRING', description: 'Text to normalize.' },
        { name: 'FORM', description: 'Normalization form (NFC, NFD, NFKC, NFKD).' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'SET $a AS "é" # e + combining acute accent\n' +
    'SET $b AS "é"\n' +
    'NORMALIZE $a TO "NFC" AS $normalized_a\n' +
    'NORMALIZE $b TO "NFC" AS $normalized_b\n' +
    'PRINT $normalized_a IS $normalized_b'
);

// TRANSLIT
newCMD(
    'TRANSLIT',
    'TRANSLIT {STRING} [AS {VAR}]',
    'Transliterates text from any Unicode alphabet to ASCII representation.',
    [
        { name: 'STRING', description: 'Text to transliterate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'PRINT TRANSLIT "Καλημέρα κόσμεβ";\n' +
    'PRINT TRANSLIT "Текст на кириллице";\n' +
    'PRINT TRANSLIT "こんにちは";'
);

// REMOVE_ACCENTS
newCMD(
    'REMOVE_ACCENTS',
    'REMOVE_ACCENTS {STRING} [AS {VAR}]',
    'Cleans the text by removing accents and diacritics, converting characters to their base forms.',
    [
        { name: 'STRING', description: 'Text to clean.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'REMOVE_ACCENTS "café";\n' +
    'REMOVE_ACCENTS "A criança está à espera do ônibus na praça";'
);

// CHAR_AT
newCMD(
    'CHAR_AT',
    'CHAR_AT {NUMBER} IN {STRING} [AS {VAR}]',
    'Gets the character at the specified position in the text.',
    [
        { name: 'NUMBER', description: 'Position in the text.' },
        { name: 'STRING', description: 'Text to extract the character from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }

    ],
    'STRING',
    'CHAR_AT 2 IN "Hello"'
);

// FORMAT
newCMD(
    'FORMAT',
    'FORMAT {STRING} WITH {ARRAY} [AS {VAR}]',
    'Formats the text using values from the array.',
    [
        { name: 'STRING', description: 'Text to format.' },
        { name: 'ARRAY', description: 'Array of values for formatting.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }

    ],
    'STRING',
    'FORMAT "Hello {1}" WITH ["world"]'
);



// (COMPARTIDOS)

newCMD(
    'INSERT',
    '1. INSERT {SUBSTR} AT {NUMBER} IN {STRING} [AS {VAR}]\n2. INSERT {ANY} AT {NUMBER} IN {ARRAY}',
    '1. Insert a specified text at a given position within another string.\n2. Insert an element at a particular index within an array.',
    [   
        { name: 'SUBSTR', description: 'The substring to be inserted.' },
        { name: 'NUMBER', description: 'Position to insert the text.' },
        { name: 'STRING', description: 'The string to be copied.' },
        { name: 'ARRAY', description: 'Array where the element will be inserted.' },
        { name: 'ANY', description: 'Element to insert into the array.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING | ARRAY',
    '1. INSERT "Wonderful " AT 7 IN "Hello World!" AS $result\n2. INSERT "New Element" AT 3 IN ["A", "B", "C", "D"]'
);

newCMD(
    'REMOVE',
    '1. REMOVE {SUBSTR|INDEX} IN {STRING|ARRAY} [AS {VAR}]\n2. REMOVE FROM {X} TO {Y} IN {STRING|ARRAY} [AS {VAR}]',
    '1. Removes all occurrences of a specific text from a string or an element at a specific index from an array.\n2. Removes characters from a start position to an end position within a string or removes elements from a start index to an end index within an array.',
    [
        { name: 'SUBSTR|INDEX', description: 'Text to be removed from the string or index of the element to be removed from the array.' },
        { name: 'X', description: 'Starting position for the range to remove.' },
        { name: 'Y', description: 'Ending position for the range to remove.' },
        { name: 'STRING', description: 'Original string from which text will be removed.' },
        { name: 'ARRAY', description: 'Array from which elements will be removed.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING | ARRAY',
    '1. REMOVE "world" IN "Hello world!" AS $removed\n2. REMOVE FROM 1 TO 6 IN "Hello world!" AS $removed\n3. REMOVE 2 IN $array\n4. REMOVE FROM 1 TO 3 IN $array'
);


newCMD(
    'COUNT',
    '1. COUNT {ANY} IN {ARRAY} [AS {VAR}]\n2. COUNT {PATTERN} IN {STRING} [AS {VAR}]\n3. COUNT {SUBSTR} IN {STRING} [AS {VAR}]',
    '1. Counts the number of times an element appears in an array.\n2. Counts the number of times a pattern matches within a string.\n3. Counts the occurrences of a substring within a string.',
    [
        { name: 'ANY', description: 'Element to count in the array.' },
        { name: 'PATTERN', description: 'Pattern to count matches in the string.' },
        { name: 'SUBSTR', description: 'Substring to count occurrences in the string.' },
        { name: 'ARRAY', description: 'Array in which to count the element.' },
        { name: 'STRING', description: 'String in which to count occurrences or matches.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    '1. COUNT "hello" IN $array\n2. COUNT $pattern IN "abc123xyz456"\n3. COUNT "l" IN "Hello"'
);

newCMD(
    'FIND',
    '1. FIND {SUBSTR} IN {STRING} [AS {VAR}]\n2. FIND {ANY} IN {ARRAY} [AS {VAR}]\n3. FIND {PATTERN} IN {STRING} [AS {VAR}]',
    '1. Finds the position of the first occurrence of a substring in a string.\n2. Finds the position of the first match of an element in an array.\n3. Finds the position of the first match of a pattern in a string.',
    [
        { name: 'SUBSTR', description: 'Substring to find in the string.' },
        { name: 'ANY', description: 'Element to find in the array.' },
        { name: 'PATTERN', description: 'Pattern to find in the string.' },
        { name: 'STRING', description: 'String in which to find occurrences or matches.' },
        { name: 'ARRAY', description: 'Array in which to find the element.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    '1. FIND "lo" IN "Hello"\n2. FIND "red" IN ["blue", "pink", "yellow", "red", "white"]\nFIND $pattern IN "abc123xyz"'
);

newCMD(
    'REVERSE',
    '1. REVERSE {STRING} [AS {VAR}]\n2. REVERSE {ARRAY}',
    '1. Reverses the text.\n2. Reverses the order of elements in an array.',
    [
        { name: 'STRING', description: 'String to reverse.' },
        { name: 'ARRAY', description: 'Array to reverse.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING | ARRAY',
    '1. REVERSE "Hello" AS $reversed\n2. REVERSE $array'
);

newCMD(
    'CONTAINS',
    '1. CONTAINS {SUBSTR} IN {STRING} [AS {VAR}]\n2. CONTAINS {ELEM} IN {ARRAY} [AS {VAR}]\n3. CONTAINS {KEY} IN {MAP} [AS {VAR}]',
    'Checks if the text contains a substring, if an array contains an element, or if a map contains a key.',
    [
        { name: 'SUBSTR', description: 'Substring to check in the text.' },
        { name: 'STRING', description: 'Text to check.' },
        { name: 'ELEM', description: 'Element to check in the array.' },
        { name: 'ARRAY', description: 'Array to check.' },
        { name: 'KEY', description: 'Key to check in the map.' },
        { name: 'MAP', description: 'Map to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'CONTAINS "beautiful" IN "You are so beautiful"\n' +
    'CONTAINS "apple" IN ["pear", "watermelon", "apple", "lemon"]\n' +
    'CONTAINS "name" IN {"name": "John", "age": 30}'
);

newCMD(
    'EXTRACT',
    '1. EXTRACT FROM {X} TO {Y} IN {STRING|ARRAY} [AS {VAR}]\n2. EXTRACT BETWEEN {SUBSTR1} TO {SUBSTR2} IN {STRING} [AS {VAR}]',
    'Extracts a substring or a portion of an array based on specified indices or delimiters.',
    [
        { name: 'X', description: 'Starting position or index.' },
        { name: 'Y', description: 'Ending position or index.' },
        { name: 'SUBSTR1', description: 'Start delimiter substring.' },
        { name: 'SUBSTR2', description: 'End delimiter substring.' },
        { name: 'STRING', description: 'Text to extract from.' },
        { name: 'ARRAY', description: 'Array to extract from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING | ARRAY',
    'EXTRACT FROM 1 TO 5 IN "Hello World"\n' +
    'EXTRACT BETWEEN "(" AND ")" IN "I am free. (I am not) Lorem Ipsum"\n' +
    'EXTRACT FROM 1 TO 3 IN [1, 2, 3, 4, 5]'
);


newCMD(
    'EXTRACT_FIRST',
    '1. EXTRACT_FIRST TO {N} IN {STRING} [AS {VAR}]\n2. EXTRACT_FIRST TO {N} IN {ARRAY} [AS {VAR}]',
    'Extracts the first N characters from a string or the first N elements from an array.',
    [
        { name: 'N', description: 'Number of characters or elements to extract.' },
        { name: 'STRING', description: 'Text to extract from.' },
        { name: 'ARRAY', description: 'Array to extract from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING | ARRAY',
    'EXTRACT_FIRST TO 5 IN "Hello World"\n' +
    'EXTRACT_FIRST TO 2 IN $array'
);

newCMD(
    'EXTRACT_LAST',
    '1. EXTRACT_LAST TO {N} IN {STRING} [AS {VAR}]\n2. EXTRACT_LAST TO {N} IN {ARRAY} [AS {VAR}]',
    'Extracts the last N characters from a string or the last N elements from an array.',
    [
        { name: 'N', description: 'Number of characters or elements to extract.' },
        { name: 'STRING', description: 'Text to extract from.' },
        { name: 'ARRAY', description: 'Array to extract from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING | ARRAY',
    'EXTRACT_LAST TO 5 IN "Hello World"\n' +
    'EXTRACT_LAST TO 2 IN $array'
);

// DELETE
newCMD(
    'DELETE',
    '1. DELETE {ANY} IN {ARRAY}\n2. DELETE {STRING} IN {MAP}',
    'Removes elements or key-value pairs based on the specified type.',
    [
        { name: 'ANY', description: 'Element (value) to remove from the array.' },
        { name: 'STRING', description: 'Key to remove from the map.' },
        { name: 'ARRAY', description: 'Array from which to remove the element.' },
        { name: 'MAP', description: 'Map from which to remove the key and its value.' }
    ],
    'ARRAY | MAP',
    'DELETE "hola" IN ["world", "hello", "hola"]\n' +
    'SET $map AS {"name": "John", "age": 30}\n' +
    'DELETE "age" IN $map'
);

newCMD(
    'MERGE',
    '1. MERGE {ARRAY} WITH {ARRAY} [AS {VAR}]\n2. MERGE {MAP} WITH {MAP} [AS {VAR}]',
    'Combines two arrays or two maps. For arrays, it removes duplicate elements. For maps, it merges the key-value pairs, with later values overwriting earlier ones for duplicate keys.',
    [
        { name: 'ARRAY', description: 'First array to merge (for array syntax).' },
        { name: 'ARRAY', description: 'Second array to merge (for array syntax).' },
        { name: 'MAP', description: 'First map to merge (for map syntax).' },
        { name: 'MAP', description: 'Second map to merge (for map syntax).' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY | MAP',
    'MERGE [1, 2, 3] WITH [2, 3, 4] AS $merged_array' + '\n' +
    'MERGE {"name": "John"} WITH {"age": 30} AS $mergedMap'
);



// (ARRAYS)

newCMD(
    'ARRAY_SET',
    'ARRAY_SET {VAR}\n\t{ELEMS}',
    'Defines or modifies an array. ',
    [
        { name: 'VAR', description: 'Variable to define or modify' },
        { name: 'ELEMS', description: 'Elements' },
    ],
    'NULL',
    'ARRAY_SET $fruits\n\tELEM "Watermelon"'
);

newCMD(
    'JOIN',
    'JOIN {ARRAY} WITH {STRING} [AS {VAR}]',
    'Joins the elements of the array using TOKEN as a separator.',
    [
        { name: 'ARRAY', description: 'Array of elements to join.' },
        { name: 'STRING', description: 'Separator to use between elements.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'JOIN ["a", "b", "c"] WITH "-"  # "a-b-c"'
);

newCMD(
    'PUT',
    '1. PUT {ANY} IN {ARRAY}\n2. PUT {ANY} AT {NUMBER} IN {ARRAY}',
    'Adds an element to the end of the array or modifies/replaces the value at the specified index.',
    [
        { name: 'ANY', description: 'Element to add or replace.' },
        { name: 'NUMBER', description: 'Index to modify or replace the value at (optional).' },
        { name: 'ARRAY', description: 'Array to modify.' }
    ],
    'ARRAY',
    'SET $array AS [1, 2, 3, 4, 5]\n' +
    'PUT "nuevo" IN $array\n' +
    'PUT "modificado" AT 3 IN $array'
);

newCMD(
    'ELEM',
    '1. ELEM {ANY}\n2. ELEM {ANY} AT {NUMBER}',
    'Adds an element to the end of the array or modifies/replaces the value at the specified index. Must be inside an ARRAY_SET structure.',
    [
        { name: 'ANY', description: 'Element to add or replace.' },
        { name: 'NUMBER', description: 'Index to modify or replace the value at (optional).' },
    ],
    'NULL',
    'ARRAY_SET $fruits\n' +
    '   ELEM "Orange"\n' +
    '   ELEM "Apple" AT 1'
);

newCMD(
    'REMOVE_FIRST',
    'REMOVE_FIRST {ARRAY}',
    'Removes the first element from an array.',
    [
        { name: 'ARRAY', description: 'Array from which to remove the first element.' }
    ],
    'ARRAY',
    'SET $array AS [1, 2, 3]\n' +
    'REMOVE_FIRST $array'
);

newCMD(
    'REMOVE_LAST',
    'REMOVE_LAST {ARRAY}',
    'Removes the last element from an array.',
    [
        { name: 'ARRAY', description: 'Array from which to remove the last element.' }
    ],
    'ARRAY',
    'SET $array AS [1, 2, 3]\n' +
    'REMOVE_LAST $array'
);

newCMD(
    'REMOVE_DUPLICATES',
    'REMOVE_DUPLICATES {ARRAY} [AS {VAR}]',
    'Returns a new array without duplicate elements.',
    [
        { name: 'ARRAY', description: 'Array to remove duplicates from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'REMOVE_DUPLICATES ["hello", "world", "hello", "there", "hello", "sir"] AS $result'
);

newCMD(
    'SORT',
    'SORT {ARRAY}',
    'Sorts an array in ascending order.',
    [
        { name: 'ARRAY', description: 'Array to sort.' }
    ],
    'ARRAY',
    'SET $array AS ["b", "c", "a"]\n' +
    'SORT $array'
);

newCMD(
    'SHUFFLE',
    'SHUFFLE {ARRAY}',
    'Randomly shuffles the elements of an array.',
    [
        { name: 'ARRAY', description: 'Array to shuffle.' }
    ],
    'ARRAY',
    'SHUFFLE $array'
);

newCMD(
    'EXTEND',
    'EXTEND {ARRAY} WITH {ARRAY}',
    'Adds the elements of one array to the end of another array, modifying the original array.',
    [
        { name: 'ARRAY', description: 'Array to extend.' },
        { name: 'ARRAY', description: 'Array to add to the end.' }
    ],
    'ARRAY',
    'EXTEND $array1 WITH $array2'
);

newCMD(
    'FLATTEN',
    'FLATTEN {ARRAY} [AS {VAR}]',
    'Flattens a multi-dimensional array into a single level array.',
    [
        { name: 'ARRAY', description: 'Array to flatten.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'FLATTEN ["a", "b", ["c", "d", ["e"]]] # ["a", "b", "c", "d", "e"]'
);

newCMD(
    'DUPLICATES',
    'DUPLICATES IN {ARRAY} [AS {VAR}]',
    'Returns an array with duplicated elements from the original array.',
    [
        { name: 'ARRAY', description: 'Array to find duplicates in.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'DUPLICATES IN [1, 2, 2, 3, 4, 4, 5] # [2, 4]'
);

newCMD(
    'INTERSECT',
    'INTERSECT {ARRAY} WITH {ARRAY} [AS {VAR}]',
    'Returns an array with common elements found in both arrays.',
    [
        { name: 'ARRAY', description: 'First array to intersect.' },
        { name: 'ARRAY', description: 'Second array to intersect.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'INTERSECT [1, 2, 3] WITH [2, 3, 4]'
);

newCMD(
    'DIFFERENCE',
    'DIFFERENCE {ARRAY} WITH {ARRAY} [AS {VAR}]',
    'Returns an array with elements found in the first array but not in the second array.',
    [
        { name: 'ARRAY', description: 'First array to compare.' },
        { name: 'ARRAY', description: 'Second array to compare against.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'DIFFERENCE [1, 2, 3] WITH [2, 4] AS $difference'
);

newCMD(
    'CONCAT',
    'CONCAT {ARRAY} WITH {ARRAY} [AS {VAR}]',
    'Combines two arrays into one. Similar to `MERGE` but without removing duplicates.',
    [
        { name: 'ARRAY', description: 'First array to concatenate.' },
        { name: 'ARRAY', description: 'Second array to concatenate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'CONCAT [1, 2, 3] WITH [2, 3, 4]'
);

newCMD(
    'CHUNK',
    'CHUNK {ARRAY} BY {NUM} [AS {VAR}]',
    'Divides an array into chunks of specified size.',
    [
        { name: 'ARRAY', description: 'Array to chunk.' },
        { name: 'NUM', description: 'Size of each chunk.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'CHUNK [1, 2, 3, 4, 5] BY 2 AS $chunks'   // Returns [[1, 2], [3, 4], [5]]
);

newCMD(
    'TRANSFORM',
    'TRANSFORM {ARRAY} WITH {COMMAND} [AS {VAR}]',
    'Applies a specified command to each element of the array, returning a new array with the results.',
    [
        { name: 'ARRAY', description: 'Array to transform.' },
        { name: 'COMMAND', description: 'Command to apply to each element. Must be in string.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'TRANSFORM ["hello", "world", "my", "name", "is", "John"] WITH "UPPERCASE" AS $transformed_array'
);


// (MAPS)

newCMD(
    'MAP_SET',
    'MAP_SET {VAR}\n\t{KEYS}',
    'Defines or modifies a map. ',
    [
        { name: 'VAR', description: 'Variable to define or modify.' },
        { name: 'KEYS', description: 'Elements.' },
    ],
    'NULL',
    'MAP_SET $info\n\tKEY "name": "Martin"'
);

newCMD(
    'KEY',
    'KEY {STRING} AS {ANY}',
    'Defines or modifies a key in the current map structure. Must be inside a MAP_SET structure.',
    [
        { name: 'STRING', description: 'The key to define or modify.' },
        { name: 'ANY', description: 'The value to assign to the key.' }
    ],
    'NULL',
    'MAP_SET $map\n\tKEY "hello" AS "Hola"'
);

newCMD(
    'MAP_SET_KEY',
    'MAP_SET_KEY {STRING} AS {ANY} IN {MAP}',
    'Sets or updates the value for a key in a map.',
    [
        { name: 'STRING', description: 'The key to set or update.' },
        { name: 'ANY', description: 'The value to assign to the key.' },
        { name: 'MAP', description: 'The map to update.' }
    ],
    'NULL',
    'SET $map AS {"name": "John", "age": 30}\nMAP_SET_KEY "name" AS "Doe" IN $map'
);

newCMD(
    'MAP_GET_KEY',
    'MAP_GET_KEY {STRING} IN {MAP} [AS {VAR}]',
    'Gets the value of a key from a map. Throws an error if the key does not exist. You can use `GET` too.',
    [
        { name: 'STRING', description: 'The key to get the value of.' },
        { name: 'MAP', description: 'The map to get the value from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }

    ],
    'ANY',
    'SET $map AS {"name": "John", "age": 30}\nMAP_GET_KEY "name" AS $value IN $map'
);

newCMD(
    'MAP_KEYS',
    'MAP_KEYS {MAP} [AS {VAR}]',
    'Gets all the keys from a map.',
    [
        { name: 'MAP', description: 'The map to get the keys from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'MAP_KEYS {"name": "John", "age": 30} AS $keys'
);

newCMD(
    'MAP_VALUES',
    'MAP_VALUES {MAP} [AS {VAR}]',
    'Gets all the values from a map.',
    [
        { name: 'MAP', description: 'The map to get the values from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'MAP_VALUES {"name": "John", "age": 30} AS $values'
);

newCMD(
    'MAP_ITEMS',
    'MAP_ITEMS {MAP} [AS {VAR}]',
    'Gets all key-value pairs from a map as an array of arrays.',
    [
        { name: 'MAP', description: 'The map to get the items from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'MAP_ITEMS {"name": "John", "age": 30} AS $items'
);

newCMD(
    'UPDATE',
    'UPDATE {MAP} WITH {MAP}',
    'Merges two maps, modifying the original map.',
    [
        { name: 'MAP', description: 'The original map to be updated.' },
        { name: 'MAP', description: 'The map to merge with the original map.' }
    ],
    'MAP',
    'SET $map1 AS {"name": "John"}\nSET $map2 AS {"age": 30}\nUPDATE $map1 WITH $map2'
);


// Anothers

newCMD(
    'WHEN',
    'WHEN {CONDITION}',
    'Executes a block of code if the specified condition is true.',
    [
        { name: 'CONDITION', description: 'The condition to evaluate'}
    ],
    'NULL',
    'WHEN $count > 5\n\tPRINT "The value is greater than 5"'
)

newCMD(
    'ORWHEN',
    'ORWHEN {CONDITION}',
    'Adds an alternative condition in a `WHEN` structure, so that if any of the specified conditions are true, the corresponding block of code is executed.',
    [
        { name: 'CONDITION', description: 'The condition to evaluate.' }
    ],
    'NULL',
    'WHEN $count > 10\n\tPRINT "The value is greater than 10"\nORWHEN $count == 10\n\tPRINT "The value is exactly 10"'
);

newCMD(
    'ELSE',
    'ELSE',
    'Specifies a block of code to execute if none of the previous `WHEN` or `ORWHEN` conditions are true.',
    [],
    'NULL',
    'WHEN $count > 10\n\tPRINT "The value is greater than 10"\nELSE\n\tPRINT "The value is 10 or less"'
);

newCMD(
    'WHILE',
    'WHILE {CONDITION}',
    'Executes a block of code as long as the specified condition is true.',
    [
        { name: 'CONDITION', description: 'The condition to evaluate for each iteration.' }
    ],
    'NULL',
    'WHILE $count < 10\n\tPRINT $count\n\tINCREMENT $count'
);

newCMD(
    'ITERATE',
    '1. ITERATE {STRING|ARRAY} [AS {VAR}]\n2. ITERATE FROM {NUMBER} TO {NUMBER} [AS {VAR}]',
    'Iterates over the elements of a string or array, or over a range of indices. The current value is stored in the specified variable.',
    [
        { name: 'STRING | ARRAY', description: 'The string or array to iterate over.' },
        { name: 'NUMBER', description: 'Range for iteration.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NULL',
    'ITERATE $array AS $element\n\tPRINT $element\n\nITERATE $array AS [$index, $element]\n\tPRINT "" + $index + ". " + $element\n\nITERATE FROM 1 TO 5 AS $index\n\tPRINT $index'
);

newCMD(
    'REPEAT',
    'REPEAT {NUMBER}',
    'Executes a block of code a specified number of times.',
    [
        { name: 'NUMBER', description: 'The number of times to repeat the block of code.' }
    ],
    'NULL',
    'REPEAT 5\n\tPRINT "Repetition"'
);

newCMD(
    'BREAK',
    'BREAK',
    'Exits the loop or the ITERATE or WHILE block in which it is located.',
    [],
    'NULL',
    'WHILE $count < 10\n\tPRINT $count\n\tWHEN $count == 5\n\t\tBREAK\n\tINCREMENT $count'
);

newCMD(
    'CONTINUE',
    'CONTINUE',
    'Skips to the next iteration of the loop or the ITERATE or WHILE block.',
    [],
    'NULL',
    'WHILE $count < 10\n\tWHEN $count % 2 == 0\n\t\tINCREMENT $count\n\t\tCONTINUE\n\tPRINT $count\n\tINCREMENT $count'
);

newCMD(
    'SKIP',
    'SKIP',
    'Allows code to maintain correct indentation without performing any action, similar to `pass` in Python.',
    [],
    'NULL',
    'WHEN $debug IS TRUE\n\tSKIP'
);

newCMD(
    'DEFINE',
    'DEFINE {STRING}',
    'Defines a custom command with the specified name.',
    [
        { name: 'STRING', description: 'The name of the command to define.' }
    ],
    'NULL',
    'DEFINE GREET\n\tPRINT "Hello, World!"'
);

newCMD(
    'PARAMS',
    'PARAMS {ARRAY}',
    'Specifies the parameters that the `DEFINE` command will receive. The parameters must be in an array.',
    [
        { name: 'ARRAY', description: 'An array of parameters that the command will accept.' }
    ],
    'NULL',
    'DEFINE GREET\n\tPARAMS [STRING, NUMBER]\n\tPRINT "Hello, " + @PARAMS.1 + ". You have " + @PARAMS.2 +" new messages."\n\nGREET "Martin" 32   # Hello, Martin. You have 32 new messages.'
);

newCMD(
    'RETURN',
    'RETURN {ANY}',
    'Returns a value from a command defined with `DEFINE`.',
    [
        { name: 'ANY', description: 'The value to return from the command.' }
    ],
    'NULL',
    'DEFINE ADD\n\tPARAMS [NUMBER, NUMBER]\n\tSET $result AS @PARAMS.1 + @PARAMS.2\n\tRETURN $result'
);

newCMD(
    'ON',
    'ON {EVENT}',
    'Executes a block of code on a specified event.',
    [
        { name: 'EVENT', description: 'The event that triggers the execution of the code block.' }
    ],
    'NULL',
    'ON START\n\tPRINT "Hello"\n\nON END\n\tPRINT "Bye"'
);


// IS_COMPARASION

newCMD(
    'IS_STRING',
    'IS_STRING {ANY} [AS {VAR}]',
    'Validates if the specified value is a string.',
    [
        { name: 'ANY', description: 'Value to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_STRING "Hello, world!" AS $result'
);

newCMD(
    'IS_NUMBER',
    'IS_NUMBER {ANY} [AS {VAR}]',
    'Validates if the specified value is a number (integer or float).',
    [
        { name: 'ANY', description: 'Value to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_NUMBER 42 AS $result'
);

newCMD(
    'IS_INTEGER',
    'IS_INTEGER {ANY} [AS {VAR}]',
    'Validates if the specified value is an integer.',
    [
        { name: 'ANY', description: 'Value to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_INTEGER 123 AS $result'
);

newCMD(
    'IS_FLOAT',
    'IS_FLOAT {ANY} [AS {VAR}]',
    'Validates if the specified value is a float.',
    [
        { name: 'ANY', description: 'Value to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_FLOAT 12.34 AS $result'
);

newCMD(
    'IS_ARRAY',
    'IS_ARRAY {ANY} [AS {VAR}]',
    'Validates if the specified value is an array.',
    [
        { name: 'ANY', description: 'Value to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_ARRAY [1, 2, 3] AS $result'
);

newCMD(
    'IS_MAP',
    'IS_MAP {ANY} [AS {VAR}]',
    'Validates if the specified value is a map (dictionary).',
    [
        { name: 'ANY', description: 'Value to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_MAP {"key": "value"} AS $result'
);

newCMD(
    'IS_BOOL',
    'IS_BOOL {ANY} [AS {VAR}]',
    'Validates if the specified value is a boolean.',
    [
        { name: 'ANY', description: 'Value to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_BOOL TRUE AS $result'
);

newCMD(
    'IS_PATTERN',
    'IS_PATTERN {ANY} [AS {VAR}]',
    'Validates if the specified value is a pattern (regular expression).',
    [
        { name: 'ANY', description: 'Value to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_PATTERN $pattern AS $result'
);

newCMD(
    'IS_EMPTY',
    'IS_EMPTY {ANY} [AS {VAR}]',
    'Validates if the specified value is empty.',
    [
        { name: 'ANY', description: 'Value to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_EMPTY "" AS $result'
);

newCMD(
    'IS_NULL',
    'IS_NULL {ANY} [AS {VAR}]',
    'Validates if the specified value is null.',
    [
        { name: 'ANY', description: 'Value to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_NULL "" AS $result'
);

newCMD(
    'IS_NAN',
    'IS_NAN {NUMBER} [AS {VAR}]',
    'Checks if the specified value is NAN (Not a Number).',
    [
        { name: 'NUMBER', description: 'Number to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'SET $num AS NAN\nIS_NAN $num AS $result'
);

newCMD(
    'IS_INFINITY',
    'IS_INFINITY {NUMBER} [AS {VAR}]',
    'Checks if the specified number is infinite.',
    [
        { name: 'NUMBER', description: 'Number to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'SET $num AS 1e308 * 10\nIS_INFINITY $num AS $result'
);

newCMD(
    'IS_ODD',
    'IS_ODD {NUMBER} [AS {VAR}]',
    'Checks if the specified number is odd.',
    [
        { name: 'NUMBER', description: 'Number to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_ODD 3 AS $result'
);

newCMD(
    'IS_EVEN',
    'IS_EVEN {NUMBER} [AS {VAR}]',
    'Checks if the specified number is even.',
    [
        { name: 'NUMBER', description: 'Number to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_EVEN 2 AS $result'
);

newCMD(
    'IS_DATE',
    'IS_DATE {ANY} [AS {VAR}]',
    'Validates if the specified value is a date map.',
    [
        { name: 'ANY', description: 'Value to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_DATE $dateMap AS $result'
);


newCMD(
    'IS_EMAIL',
    'IS_EMAIL {STRING} [AS {VAR}]',
    'Validates if the specified string is a valid email address.',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_EMAIL "example@example.com" AS $result'
);

newCMD(
    'IS_URL',
    'IS_URL {STRING} [AS {VAR}]',
    'Validates if the specified string is a valid URL.',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_URL "https://www.example.com" AS $result'
);

newCMD(
    'IS_DIGIT',
    'IS_DIGIT {STRING} [AS {VAR}]',
    'Validates if the specified string contains only digits.',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_DIGIT "123456" AS $result'
);

newCMD(
    'IS_NUMERIC',
    'IS_NUMERIC {STRING} [AS {VAR}]',
    'Validates if the specified string is numeric, allowing integers, floats, and exponents (e.g., ², ¾).',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_NUMERIC "123.45" AS $result\n' +
    'IS_NUMERIC "¾" AS $result2\n' +
    'IS_NUMERIC "-43.322" AS $result3'
);

newCMD(
    'IS_ALPHA',
    'IS_ALPHA {STRING} [AS {VAR}]',
    'Validates if the specified string contains only alphabetic characters.',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_ALPHA "Hello" AS $result'
);

newCMD(
    'IS_ALPHANUMERIC',
    'IS_ALPHANUMERIC {STRING} [AS {VAR}]',
    'Validates if the specified string contains only alphabetic characters and numbers.',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_ALPHANUMERIC "Hello123" AS $result'
);

newCMD(
    'IS_UPPERCASE',
    'IS_UPPERCASE {STRING} [AS {VAR}]',
    'Validates if the specified string is in uppercase.',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_UPPERCASE "HELLO" AS $result'
);

newCMD(
    'IS_LOWERCASE',
    'IS_LOWERCASE {STRING} [AS {VAR}]',
    'Validates if the specified string is in lowercase.',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_LOWERCASE "hello" AS $result'
);

newCMD(
    'IS_TITLECASE',
    'IS_TITLECASE {STRING} [AS {VAR}]',
    'Validates if the specified string is in title case (capitalization of the first letter of each word).',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_TITLECASE "Hello World" AS $result'
);

newCMD(
    'IS_DEC',
    'IS_DEC {STRING} [AS {VAR}]',
    'Validates if the specified string represents a decimal number.',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_DEC "255" AS $result'
);

newCMD(
    'IS_HEX',
    'IS_HEX {STRING} [AS {VAR}]',
    'Validates if the specified string represents a hexadecimal number.',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_HEX "1A3F" AS $result'
);

newCMD(
    'IS_ASCII',
    'IS_ASCII {STRING} [AS {VAR}]',
    'Validates if the specified string contains only ASCII characters (basic English alphabet and standard symbols).',
    [
        { name: 'STRING', description: 'String to validate.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'IS_ASCII "Hello!" AS $result'
);


// (MISC)
newCMD(
    'CHAR',
    'CHAR {NUMBER} [AS {VAR}]',
    'Returns the character associated with the given Unicode code point for visualization.',
    [
        { name: 'NUMBER', description: 'The Unicode code point of the character.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'CHAR 65 AS $char_value'
);

newCMD(
    'ORD',
    'ORD {STRING} [AS {VAR}]',
    'Returns the Unicode (UTF-8) value for the given character.',
    [
        { name: 'STRING', description: 'The character to get the Unicode value for.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'ORD "A" AS $ord_value'
);

newCMD(
    'HEX',
    'HEX {NUMBER} [AS {VAR}]',
    'Converts a decimal number to its hexadecimal representation.',
    [
        { name: 'NUMBER', description: 'The decimal number to convert.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'HEX 255 AS $hex_value'
);

newCMD(
    'BIN',
    'BIN {NUMBER} [AS {VAR}]',
    'Converts a decimal number to its binary representation.',
    [
        { name: 'NUMBER', description: 'The decimal number to convert.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'BIN 10 AS $bin_value'
);

newCMD(
    'OCT',
    'OCT {NUMBER} [AS {VAR}]',
    'Converts a decimal number to its octal representation.',
    [
        { name: 'NUMBER', description: 'The decimal number to convert.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'OCT 64 AS $oct_value'
);

newCMD(
    'HEX_TO_DEC',
    'HEX_TO_DEC {STRING} [AS {VAR}]',
    'Converts a hexadecimal value to its decimal representation.',
    [
        { name: 'STRING', description: 'The hexadecimal string to convert.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'HEX_TO_DEC "FF" AS $decimal_value'
);

newCMD(
    'BIN_TO_DEC',
    'BIN_TO_DEC {STRING} [AS {VAR}]',
    'Converts a binary value to its decimal representation.',
    [
        { name: 'STRING', description: 'The binary string to convert.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'BIN_TO_DEC "1010" AS $decimal_value'
);

newCMD(
    'OCT_TO_DEC',
    'OCT_TO_DEC {STRING} [AS {VAR}]',
    'Converts an octal value to its decimal representation.',
    [
        { name: 'STRING', description: 'The octal string to convert.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'OCT_TO_DEC "100" AS $decimal_value'
);


// (PATTERNS)
newCMD(
    'PATTERN',
    '1. PATTERN {STRING} [AS {VAR}]\n2. PATTERN {STRING} WITH {FLAGS} [AS {VAR}]',
    'Creates a pattern (regular expression) from a string, optionally with an array of flags.',
    [
        { name: 'STRING', description: 'The regular expression pattern as a string.' },
        { name: 'FLAGS', description: 'Array of flags to apply to the pattern.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'PATTERN',
    'PATTERN "[0-9]+" AS $pattern\nPATTERN "[0-9]+" WITH ["i", "MULTILINE"] AS $pattern'
);

newCMD(
    'PATTERN_INFO',
    'PATTERN_INFO {PATTERN} [AS {VAR}]',
    'Returns a map with information about the pattern.',
    [
        { name: 'PATTERN', description: 'The pattern whose details are to be retrieved.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'PATTERN_INFO $pattern AS $details'
);

newCMD(
    'MATCH',
    'MATCH {PATTERN} IN {STRING} [AS {VAR}]',
    'Finds all matches of the pattern in the text, similar to `re.findall` in Python or `match` in JavaScript.',
    [
        { name: 'PATTERN', description: 'The pattern to match against the text.' },
        { name: 'STRING', description: 'The text to search for matches.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'MATCH $pattern IN "abc123xyz" AS $matches'
);

newCMD(
    'MATCH_FIRST',
    'MATCH_FIRST {PATTERN} IN {STRING} [AS {VAR}]',
    'Finds the first match of the pattern in the text.',
    [
        { name: 'PATTERN', description: 'The pattern to match against the text.' },
        { name: 'STRING', description: 'The text to search for matches.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'MATCH_FIRST $pattern IN "abc123xyz456" AS $first_match'
);

newCMD(
    'MATCH_ALL',
    'MATCH_ALL {PATTERN} IN {STRING} [AS {VAR}]',
    'Finds all matches of the pattern in the text and returns a map of results with their positions, similar to re.finditer in Python.',
    [
        { name: 'PATTERN', description: 'The pattern to match against the text.' },
        { name: 'STRING', description: 'The text to search for matches.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY',
    'MATCH_ALL $pattern IN "abc123xyz456" AS $all_matches'
);

newCMD(
    'MATCH_FULL',
    'MATCH_FULL {PATTERN} IN {STRING} [AS {VAR}]',
    'Checks if the entire text matches the pattern.',
    [
        { name: 'PATTERN', description: 'The pattern to match against the text.' },
        { name: 'STRING', description: 'The text to check for full match.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'MATCH_FULL $pattern IN "123" AS $is_full_match'
);


// (FILES)

newCMD(
    'FILE_EXISTS',
    'FILE_EXISTS {FILE} [AS {VAR}]',
    'Checks if a file exists at the specified path.',
    [
        { name: 'FILE', description: 'The path of the file to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL', 
    'FILE_EXISTS "example.txt" AS $exists'
);

newCMD(
    'FILE_DELETE',
    'FILE_DELETE {FILE}',
    'Deletes the specified file.',
    [
        { name: 'FILE', description: 'The path of the file to delete.' }
    ],
    'NULL', 
    'FILE_DELETE "example.txt"'
);

newCMD(
    'FILE_MOVE',
    'FILE_MOVE {FILE} TO {DEST}',
    'Moves a file to a new location.',
    [
        { name: 'FILE', description: 'The path of the file to move.' },
        { name: 'DEST', description: 'The destination path.' }
    ],
    'NULL', 
    'FILE_MOVE "example.txt" TO "new_folder/example.txt"'
);

newCMD(
    'FILE_RENAME',
    'FILE_RENAME {OLD} TO {NEW}',
    'Renames the specified file.',
    [
        { name: 'OLD', description: 'The current name of the file.' },
        { name: 'NEW', description: 'The new name for the file.' }
    ],
    'NULL', 
    'FILE_RENAME "old_name.txt" TO "new_name.txt"'
);

newCMD(
    'FILE_SIZE',
    'FILE_SIZE {FILE} [AS {VAR}]',
    'Gets the size of a file in bytes.',
    [
        { name: 'FILE', description: 'The path of the file to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER', 
    'FILE_SIZE "example.txt" AS $size'
);

newCMD(
    'FILE_OPEN',
    'FILE_OPEN {file} [AS {VAR}]',
    'Opens a file for reading or writing, returning the file ID.',
    [
        { name: 'FILE', description: 'The path of the file to open.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER', 
    'FILE_OPEN "example.txt" AS $file_id'
);

newCMD(
    'FILE_WRITE',
    'FILE_WRITE {ID} WITH {STRING}',
    'Writes text to an open file.',
    [
        { name: 'ID', description: 'The ID of the file to write to.' },
        { name: 'STRING', description: 'The text to write to the file.' }
    ],
    'NULL', 
    'FILE_WRITE $file_id WITH "Hello, world!"'
);

newCMD(
    'FILE_READ',
    'FILE_READ {ID} [AS {VAR}]',
    'Reads the content of an open file.',
    [
        { name: 'ID', description: 'The ID of the file to read from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING', 
    'FILE_READ $file_id AS $content'
);

newCMD(
    'FILE_APPEND',
    'FILE_APPEND {ID} WITH {STRING}',
    'Appends text to the end of an open file.',
    [
        { name: 'ID', description: 'The ID of the file to append to.' },
        { name: 'STRING', description: 'The text to append to the file.' }
    ],
    'NULL', 
    'FILE_APPEND $file_id WITH "More text."'
);

newCMD(
    'FILE_CLOSE',
    'FILE_CLOSE {ID}',
    'Closes an open file.',
    [
        { name: 'ID', description: 'The ID of the file to close.' }
    ],
    'NULL', 
    'FILE_CLOSE $file_id'
);

newCMD(
    'DIRECTORY_CREATE',
    'DIRECTORY_CREATE {DIR}',
    'Creates a new directory.',
    [
        { name: 'DIR', description: 'The path of the directory to create.' }
    ],
    'NULL', 
    'DIRECTORY_CREATE "new_folder"'
);

newCMD(
    'DIRECTORY_DELETE',
    'DIRECTORY_DELETE {DIR}',
    'Deletes the specified directory.',
    [
        { name: 'DIR', description: 'The path of the directory to delete.' }
    ],
    'NULL', 
    'DIRECTORY_DELETE "old_folder"'
);

newCMD(
    'DIRECTORY_RENAME',
    'DIRECTORY_RENAME {OLD} TO {NEW}',
    'Renames the specified directory.',
    [
        { name: 'OLD', description: 'The current name of the directory.' },
        { name: 'NEW', description: 'The new name for the directory.' }
    ],
    'NULL', 
    'DIRECTORY_RENAME "old_folder" TO "new_folder"'
);

newCMD(
    'DIRECTORY_EXISTS',
    'DIRECTORY_EXISTS {DIR} [AS {VAR}]',
    'Checks if a directory exists at the specified path.',
    [
        { name: 'DIR', description: 'The path of the directory to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL', 
    'DIRECTORY_EXISTS "example_folder" AS $exists'
);

newCMD(
    'DIRECTORY_COPY',
    'DIRECTORY_COPY {DIR} TO {DEST}',
    'Copies a directory to a new location.',
    [
        { name: 'DIR', description: 'The path of the directory to copy.' },
        { name: 'DEST', description: 'The destination path.' }
    ],
    'NULL', 
    'DIRECTORY_COPY "example_folder" TO "backup_folder"'
);

newCMD(
    'DIRECTORY_MOVE',
    'DIRECTORY_MOVE {DIR} TO {DEST}',
    'Moves a directory to a new location.',
    [
        { name: 'DIR', description: 'The path of the directory to move.' },
        { name: 'DEST', description: 'The destination path.' }
    ],
    'NULL', 
    'DIRECTORY_MOVE "example_folder" TO "new_location"'
);

newCMD(
    'DIRECTORY_SIZE',
    'DIRECTORY_SIZE {DIR} [AS {VAR}]',
    'Gets the total size of a directory and its contents.',
    [
        { name: 'DIR', description: 'The path of the directory to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER', 
    'DIRECTORY_SIZE "example_folder" AS $size'
);

newCMD(
    'DIRECTORY_LIST',
    'DIRECTORY_LIST {DIR} [AS {VAR}]',
    'Lists all files and directories in a directory.',
    [
        { name: 'DIR', description: 'The path of the directory to list.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY', 
    'DIRECTORY_LIST "example_folder" AS $items'
);

newCMD(
    'DIRECTORY_LIST_FILES',
    'DIRECTORY_LIST_FILES {DIR} [AS {VAR}]',
    'Lists only the files in a directory.',
    [
        { name: 'DIR', description: 'The path of the directory to list.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY', 
    'DIRECTORY_LIST_FILES "example_folder" AS $files'
);

newCMD(
    'DIRECTORY_LIST_DIRS',
    'DIRECTORY_LIST_DIRS {DIR} [AS {VAR}]',
    'Lists only the subdirectories in a directory.',
    [
        { name: 'DIR', description: 'The path of the directory to list.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY', 
    'DIRECTORY_LIST_DIRS "example_folder" AS $dirs'
);

newCMD(
    'PATH_FILENAME',
    'PATH_FILENAME {PATH} [AS {VAR}]',
    'Gets the filename from a full path.',
    [
        { name: 'PATH', description: 'The full path of the file.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING', 
    'PATH_FILENAME "/path/to/file.txt" AS $filename'
);

newCMD(
    'PATH_EXT',
    'PATH_EXT {PATH} [AS {VAR}]',
    'Gets the file extension from a full path.',
    [
        { name: 'PATH', description: 'The full path of the file.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING', 
    'PATH_EXT "/path/to/file.txt" AS $extension'
);

newCMD(
    'PATH_DIR',
    'PATH_DIR {PATH} [AS {VAR}]',
    'Gets the directory from a full path.',
    [
        { name: 'PATH', description: 'The full path of the file.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING', 
    'PATH_DIR "/path/to/file.txt" AS $directory'
);

newCMD(
    'PATH_JOIN',
    'PATH_JOIN {ARRAY} [AS {VAR}]',
    'Combines path elements into a single string.',
    [
        { name: 'ARRAY', description: 'An array of path components to join.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING', 
    'PATH_JOIN ["/path", "to", "file.txt"] AS $full_path'
);

newCMD(
    'PATH_ABSOLUTE',
    'PATH_ABSOLUTE {PATH} [AS {VAR}]',
    'Converts a relative path to an absolute path.',
    [
        { name: 'PATH', description: 'The relative path to convert.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING', 
    'PATH_ABSOLUTE "relative/path" AS $absolute_path'
);

newCMD(
    'PATH_RELATIVE',
    '1. PATH_RELATIVE {PATH} [AS {VAR}]\n2. PATH_RELATIVE {PATH} FROM {STARTDIR} [AS {VAR}]',
    'Converts an absolute path to a relative path. Converts an absolute path to a relative path based on a specific start directory.',
    [
        { name: 'PATH', description: 'The absolute path to convert.' },
        { name: 'STARTDIR', description: 'The starting directory for the relative path conversion (optional).' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING', 
    'PATH_RELATIVE "/absolute/path" AS $relative_path\nPATH_RELATIVE "/absolute/path" FROM "/start/dir" AS $relative_path'
);

newCMD(
    'PATH_PARENT',
    'PATH_PARENT {PATH} [AS {VAR}]',
    'Gets the parent directory of a specified path.',
    [
        { name: 'PATH', description: 'The path to get the parent directory from.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING', 
    'PATH_PARENT "/path/to/file.txt" AS $parent_dir'
);

newCMD(
    'PATH_NORMALIZE',
    'PATH_NORMALIZE {PATH} [AS {VAR}]',
    'Normalizes a file path by removing redundant components.',
    [
        { name: 'PATH', description: 'The path to normalize.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING', 
    'PATH_NORMALIZE "/path/./to/../file.txt" AS $normalized_path'
);

newCMD(
    'PATH_SPLIT',
    'PATH_SPLIT {PATH} [AS {VAR}]',
    'Splits a file path into components (filename, directory, extension).',
    [
        { name: 'PATH', description: 'The path to split.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ARRAY', 
    'PATH_SPLIT "/path/to/file.txt" AS $components'
);

newCMD(
    'JSON_PARSE',
    'JSON_PARSE {STRING} [AS {VAR}]',
    'Converts a string (in JSON format) into a map.',
    [
        { name: 'STRING', description: 'The string in JSON format to be parsed.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'JSON_PARSE \'{"key": "value"}\' AS $parsed_map'
);

newCMD(
    'JSON_TO_STRING',
    'JSON_TO_STRING {MAP} [AS {VAR}]',
    'Converts a map into a string in JSON format.',
    [
        { name: 'MAP', description: 'The map to be converted into a JSON string.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'JSON_TO_STRING {"key": "value"} AS $json_string'
);

newCMD(
    'JSON_TO_PRETTY',
    'JSON_TO_PRETTY {MAP} WITH {SPACES} [AS {VAR}]',
    'Converts a map into a pretty-printed JSON string with defined spaces.',
    [
        { name: 'MAP', description: 'The map to be converted into a pretty-printed JSON string.' },
        { name: 'SPACES', description: 'The number of spaces for indentation in the pretty-printed JSON string.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'JSON_TO_PRETTY {"key": "value"} WITH 4 AS $json_string'
);

newCMD(
    'JSON_LOAD',
    'JSON_LOAD {FILE} [AS {VAR}]',
    'Loads a JSON file and converts it into a map.',
    [
        { name: 'FILE', description: 'The path to the JSON file to be loaded.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'JSON_LOAD "data.json" AS $data_map'
);

newCMD(
    'JSON_SAVE',
    'JSON_SAVE {MAP} TO {FILE}',
    'Saves a map into a file in JSON format.',
    [
        { name: 'MAP', description: 'The map to be saved as a JSON file.' },
        { name: 'FILE', description: 'The path where the JSON file will be saved.' }
    ],
    'NULL',
    'JSON_SAVE {"key": "value"} TO "output.json"'
);


// (RANDOM)

newCMD(
    'RANDOM',
    '1. RANDOM {NUMBER} [AS {VAR}]\n2. RANDOM FROM {NUMBER} TO {NUMBER} [AS {VAR}]',
    'Generates a random number between 0 and the specified value or generates a random number within the specified range.',
    [
        { name: 'NUMBER', description: 'Range for random number generation.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'RANDOM 100 AS $random_number\nRANDOM FROM 10 TO 20'
);

newCMD(
    'RANDOM_CHOICE',
    'RANDOM_CHOICE {ARRAY} [AS {VAR}]',
    'Selects a random element from an array.',
    [
        { name: 'ARRAY', description: 'The array from which to select a random element.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'ANY',
    'RANDOM_CHOICE [1, 2, 3, 4] AS $random_element'
);

// (MISC)
newCMD(
    'IMPORT',
    'IMPORT {STRING}',
    'Imports a file containing command definitions, variables, or data that can be used in the current code. This command allows for code reuse and modularization in your project. You can also import libraries.',
    [
        { name: 'STRING', description: 'The file to import, including commands, variables, or data.' }
    ],
    'NULL',
    'IMPORT "myfunctions.mapy"\nIMPORT "myfunctions"    # The extension can be omitted'
);

newCMD(
    'EXPORT',
    '1. EXPORT {VAR}\n2. EXPORT {COMMAND}',
    'Exports a variable or a command (as a string) so they can be used in other files or contexts. This command is useful for sharing data or commands between different parts of the project or with libraries.',
    [
        { name: 'VAR', description: 'Variable to export.' },
        { name: 'COMMAND', description: 'Command to export.' }
    ],
    'NULL',
    'EXPORT $myVariable\nEXPORT "MYCOMMAND"'
);

newCMD(
    'TRY',
    'TRY',
    'Begins a block of code that may generate errors, which will be handled with `CATCH`.',
    [],
    'NULL',
    'TRY\n\tPRINT 1 / 0\nCATCH\n\tPRINT "Error"'
);

newCMD(
    'CATCH',
    'CATCH [AS {VAR}]',
    'Catches and handles errors generated in the TRY block. The captured error is stored in the specified variable.',
    [
        { name: 'VAR', description: 'Variable to store the caught error (optional).' }
    ],
    'NULL',
    'TRY\n\tPRINT 1 / 0\nCATCH AS $error\n\tPRINTF $error'
);

newCMD(
    'ERROR',
    'ERROR {STRING}',
    'Throws a generic error.',
    [
        { name: 'STRING', description: 'The error message to throw.' }
    ],
    'NULL',
    'SET $n AS 0\nWHEN $n IS LEQ 0\n\tERROR "Must be greater than 0."'
);

newCMD(
    'THROW',
    'THROW {MAP}',
    'Throws an error from a map.',
    [
        { name: 'MAP', description: 'The map generated by commands like `SYNTAX_ERROR`.' }
    ],
    'NULL',
    'THROW SYNTAX_ERROR ["Invalid Syntax"];\nTHROW VALUE_ERROR ["Invalid Value"];'
);

newCMD( 'SYNTAX_ERROR', 'SYNTAX_ERROR {ARRAY}', 'Returns a map containing error details.', [ { name: 'ARRAY', description: 'An array containing error details. The first element specifies the error message, while the optional second element defines the error code (useful for the CATCH statement).' } ], 'MAP', 'THROW SYNTAX_ERROR ["Invalid Syntax"];' );
newCMD( 'VALUE_ERROR', 'VALUE_ERROR {ARRAY}', 'Returns a map containing error details.', [ { name: 'ARRAY', description: 'An array containing error details. The first element specifies the error message, while the optional second element defines the error code (useful for the CATCH statement).' } ], 'MAP', 'THROW VALUE_ERROR ["Invalid Value"];' );
newCMD( 'RUNTIME_ERROR', 'RUNTIME_ERROR {ARRAY}', 'Returns a map containing error details.', [ { name: 'ARRAY', description: 'An array containing error details. The first element specifies the error message, while the optional second element defines the error code (useful for the CATCH statement).' } ], 'MAP', 'THROW RUNTIME_ERROR ["Runtime Error"];' );
newCMD( 'TYPE_ERROR', 'TYPE_ERROR {ARRAY}', 'Returns a map containing error details.', [ { name: 'ARRAY', description: 'An array containing error details. The first element specifies the error message, while the optional second element defines the error code (useful for the CATCH statement).' } ], 'MAP', 'THROW TYPE_ERROR ["Type Error"];' );
newCMD( 'NOT_FOUND_ERROR', 'NOT_FOUND_ERROR {ARRAY}', 'Returns a map containing error details.', [ { name: 'ARRAY', description: 'An array containing error details. The first element specifies the error message, while the optional second element defines the error code (useful for the CATCH statement).' } ], 'MAP', 'THROW NOT_FOUND_ERROR ["File not found"];' );
newCMD( 'FILESYSTEM_ERROR', 'FILESYSTEM_ERROR {ARRAY}', 'Returns a map containing error details.', [ { name: 'ARRAY', description: 'An array containing error details. The first element specifies the error message, while the optional second element defines the error code (useful for the CATCH statement).' } ], 'MAP', 'THROW FILESYSTEM_ERROR ["Cannot delete the file."];' );


// (HTTP)

newCMD(
    'HTTP_SET_PARAMS',
    'HTTP_SET_PARAMS {MAP}',
    'Sets the parameters for the HTTP request.',
    [
        { name: 'MAP', description: 'A map containing the parameters to set for the HTTP request.' }
    ],
    'NULL',
    'HTTP_SET_PARAMS {"key": "value"}'
);

newCMD(
    'HTTP_SET_HEADER',
    'HTTP_SET_HEADER {MAP}',
    'Sets the headers for the HTTP request.',
    [
        { name: 'MAP', description: 'A map containing the headers to set for the HTTP request.' }
    ],
    'NULL',
    'HTTP_SET_HEADER {"Content-Type": "application/json"}'
);

newCMD(
    'HTTP_SET_METHOD',
    'HTTP_SET_METHOD {STR}',
    'Defines the HTTP method to use (e.g., POST, GET, etc.).',
    [
        { name: 'STR', description: 'The HTTP method to use for the request.' }
    ],
    'NULL',
    'HTTP_SET_METHOD "POST"'
);

newCMD(
    'HTTP_SET_DATA',
    'HTTP_SET_DATA {MAP}',
    'Sets the data to be sent in the HTTP request.',
    [
        { name: 'MAP', description: 'A map containing the data to send in the HTTP request.' }
    ],
    'NULL',
    'HTTP_SET_DATA {"name": "John", "age": 30}'
);

newCMD(
    'HTTP_SET_TIMEOUT',
    'HTTP_SET_TIMEOUT {NUMBER}',
    'Sets the timeout (in seconds) for the HTTP request. Default is 30 seconds.',
    [
        { name: 'NUMBER', description: 'The timeout duration in seconds for the HTTP request.' }
    ],
    'NULL',
    'HTTP_SET_TIMEOUT 10'
);

newCMD(
    'HTTP_RESET',
    'HTTP_RESET',
    'Resets all configured parameters for the HTTP request.',
    [],
    'NULL',
    'HTTP_RESET'
);

newCMD(
    'HTTP_REQUEST',
    'HTTP_REQUEST {STRING} [AS {VAR}]',
    'Performs an HTTP request to the specified URL and stores the response in a variable.',
    [
        { name: 'STRING', description: 'The URL to send the HTTP request to.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'HTTP_REQUEST "https://example.com/api" AS $response'
);

newCMD(
    'HTTP_REQUEST_EXT',
    'HTTP_REQUEST_EXT {URL} [AS {VAR}]',
    'Performs an HTTP request to the specified URL and stores extended response information (redirects, encoding, history, text, etc.) in a variable.',
    [
        { name: 'STRING', description: 'The URL to send the HTTP request to.' },
        { name: 'VAR', description: 'Variable to store the extended response information (optional).' }
    ],
    'MAP',
    'HTTP_REQUEST_EXT "https://example.com/api" AS $extended_response'
);

newCMD(
    'HTTP_GET',
    'HTTP_GET {STRING} [AS {VAR}]',
    'Performs a GET request to the specified URL and stores the response in a variable.',
    [
        { name: 'STRING', description: 'The URL to send the GET request to.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'HTTP_GET "https://example.com/api" AS $get_response'
);

newCMD(
    'HTTP_POST',
    'HTTP_POST {STRING} [AS {VAR}]',
    'Performs a POST request to the specified URL and stores the response in a variable.',
    [
        { name: 'STRING', description: 'The URL to send the POST request to.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'HTTP_POST "https://example.com/api" AS $post_response'
);

newCMD(
    'HTTP_DOWNLOAD',
    'HTTP_DOWNLOAD {STRING} TO {FILE}',
    'Downloads a file from the specified URL and saves it to the specified location.',
    [
        { name: 'STRING', description: 'The URL to download the file from.' },
        { name: 'FILE', description: 'The location to save the downloaded file.' }
    ],
    'NULL',
    'HTTP_DOWNLOAD "https://example.com/file.zip" TO "downloads/file.zip"'
);

newCMD(
    'HTTP_UPLOAD',
    'HTTP_UPLOAD {FILE} TO {STRING} [AS {VAR}]',
    'Uploads a file to the specified URL and stores the response in a variable.',
    [
        { name: 'FILE', description: 'The file to upload.' },
        { name: 'STRING', description: 'The URL to upload the file to.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NULL',
    'HTTP_UPLOAD "path/to/file.zip" TO "https://example.com/upload" AS $upload_response'
);

newCMD(
    'HTTP_GET_SETTINGS',
    'HTTP_GET_SETTINGS [AS {VAR}]',
    'Returns the global settings (parameters, headers, etc.).',
    [
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'HTTP_GET_SETTINGS AS $settings'
);


// Translate

newCMD(
    'TRANSLATE',
    '1. TRANSLATE FROM {SOURCE_LANG} TO {TARGET_LANG}\n2. TRANSLATE {STRING} [AS {VAR}]',
    '1. Sets the source and target languages globally for translation.\n2. Translates the specified text to the default target language. If the translation fails, it will throw an error.',
    [
        { name: 'SOURCE_LANG', description: 'The source language code (e.g., "en" for English).' },
        { name: 'TARGET_LANG', description: 'The target language code (e.g., "it" for Italian).' },
        { name: 'STRING', description: 'The string to be translated.' },
        { name: 'VAR', description: 'Variable to store the translated text (optional).' }
    ],
    'STRING | NULL',
    'TRANSLATE FROM "en" TO "es"\nTRANSLATE "Hello, world!" AS $translated_text'
);

newCMD(
    'TRANSLATES',
    'TRANSLATES {STRING} [AS {VAR}]',
    'Translates the specified text to the default target language. If the translation fails, the result will be the input text.',
    [
        { name: 'STRING', description: 'The string to be translated.' },
        { name: 'VAR', description: 'Variable to store the translated text (optional).' }
    ],
    'STRING',
    'TRANSLATES "How are you?" AS $translated_text'
);

newCMD(
    'TRANSLATE_ATTEMPTS',
    'TRANSLATE_ATTEMPTS {NUMBER}',
    'Sets the number of attempts for translation in case of failures.',
    [
        { name: 'NUMBER', description: 'The number of attempts to try for a translation.' }
    ],
    'NULL',
    'TRANSLATE_ATTEMPTS 3'
);

newCMD(
    'TRANSLATE_FROM',
    'TRANSLATE_FROM {SOURCE_LANG}',
    'Sets the source language for future translations.',
    [
        { name: 'SOURCE_LANG', description: 'The source language code (e.g., "en" for English).' }
    ],
    'NULL',
    'TRANSLATE_FROM "en"'
);

newCMD(
    'TRANSLATE_TO',
    'TRANSLATE_TO {TARGET_LANG}',
    'Sets the target language for future translations.',
    [
        { name: 'TARGET_LANG', description: 'The target language code (e.g., "es" for Spanish).' }
    ],
    'NULL',
    'TRANSLATE_TO "es"'
);

newCMD(
    'TRANSLATE_SUPPORTED_CODES',
    'TRANSLATE_SUPPORTED_CODES [AS {VAR}]',
    'Returns the supported language codes for translation.',
    [
        { name: 'VAR', description: 'Variable to store the supported language codes (optional).' }
    ],
    'ARRAY',
    'TRANSLATE_SUPPORTED_CODES AS $supported_codes'
);

newCMD(
    'TRANSLATE_SUPPORTED_LANGS',
    'TRANSLATE_SUPPORTED_LANGS [AS {VAR}]',
    'Returns the supported languages for translation.',
    [
        { name: 'VAR', description: 'Variable to store the supported languages (optional).' }
    ],
    'ARRAY',
    'TRANSLATE_SUPPORTED_LANGS AS $supported_langs'
);



newCMD(
    'INPUT',
    'INPUT {STRING}\nINPUT FROM {FILENAME}',
    'Loads input from a string or a file. This command is used to provide data that will be processed by the code.',
    [
        { name: 'STRING', description: 'The string to be loaded as input.' },
        { name: 'FILENAME', description: 'The name of the file from which the input will be loaded.' }
    ],
    'NULL',
    'INPUT "Hello, world!"\nINPUT FROM "data.txt"'
);

newCMD(
    'STORE',
    'STORE {STRING}',
    'Stores a string as a line, which can later be exported to a file using the `OUTPUT` command. Useful for accumulating content before writing it to a file.',
    [
        { name: 'STRING', description: 'The string to be stored.' }
    ],
    'NULL',
    'STORE "Testing my content."'
);

newCMD(
    'CLEAR_STORAGE',
    'CLEAR_STORAGE',
    'Empties the global storage of lines, removing all stored strings and resetting the storage to an empty state.',
    [
        
    ],
    'NULL',
    'STORE "Testing my content."\nOUTPUT "result.txt"\nCLEAR_STORAGE'
);

newCMD(
    'OUTPUT',
    'OUTPUT {FILENAME}',
    'Exports all stored content to a file with the specified filename. The stored lines will be written to the file in the order they were stored.',
    [
        { name: 'FILENAME', description: 'The name of the file to which the content will be exported.' }
    ],
    'NULL',
    'OUTPUT "result.txt"'
);



// (DATES)

newCMD(
    'DATE_CREATE',
    'DATE_CREATE {STRING|ARRAY} [AS {VAR}]',
    'Creates a new date from a string or array. Returns a date map. If an array is used, it must contain 7 elements: year, month, day, hour, minute, second, and microsecond. If a string is used, it should be formatted as: `YYYY-MM-DD`, `MM-DD-YYYY`, `MM/DD/YYYY`, `YYYY-MM-DD HH:mm:ss`, etc.',
    [
        { name: 'STRING', description: 'A string representing the date.' },
        { name: 'ARRAY', description: 'An array containing year, month, day, hour, minute, second, and microsecond.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'DATE_CREATE "2020-10-10"\nDATE_CREATE [2024, 8, 12, 12, 0, 0, 0] AS $date'
);

newCMD(
    'DATE_NOW',
    'DATE_NOW [AS {VAR}]',
    'Gets the current date and time. Returns a date map.',
    [
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'DATE_NOW AS $current_date'
);

newCMD(
    'DATE_FORMAT',
    '1. DATE_FORMAT {DATE_MAP} [AS {VAR}]\n2. DATE_FORMAT {DATE_MAP} TO {FORMAT} [AS {VAR}]',
    'Formats a date map according to the global format or a specified format.',
    [
        { name: 'DATE_MAP', description: 'The date map to format.' },
        { name: 'FORMAT', description: 'The format string, e.g., "MM/DD/YYYY".' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'DATE_CREATE "2024-06-03" AS $date\nDATE_FORMAT $date # Global format\nDATE_FORMAT $date TO "MM/DD/YYYY" AS $formatted_date'
);

newCMD(
    'DATE_FORMAT_NOW',
    'DATE_FORMAT_NOW [AS {VAR}]',
    'Formats the current date and time according to the global format.',
    [
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'DATE_FORMAT_NOW AS $formatted_now'
);


newCMD(
    'DATE_IS_LEAP_YEAR',
    'DATE_IS_LEAP_YEAR {DATE_MAP} [AS {VAR}]',
    'Checks if the specified year is a leap year.',
    [
        { name: 'DATE_MAP', description: 'The date map to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'DATE_IS_LEAP_YEAR $DATE_MAP'
);

newCMD(
    'DATE_COMPARE',
    'DATE_COMPARE {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Compares two dates and returns 1 if the first is greater, -1 if it is less, and 0 if they are equal.',
    [
        { name: 'DATE_MAP', description: 'The first date map to compare.' },
        { name: 'DATE_MAP', description: 'The second date map to compare.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_COMPARE $date1 AND $date2'
);

newCMD(
    'DATE_IS_BEFORE',
    'DATE_IS_BEFORE {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Checks if `DATE_MAP` is before `DATE_MAP`.',
    [
        { name: 'DATE_MAP', description: 'The first date map to check.' },
        { name: 'DATE_MAP', description: 'The second date map to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'DATE_IS_BEFORE $date1 AND $date2'
);

newCMD(
    'DATE_IS_AFTER',
    'DATE_IS_AFTER {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Checks if `DATE_MAP` is after `DATE_MAP`.',
    [
        { name: 'DATE_MAP', description: 'The first date map to check.' },
        { name: 'DATE_MAP', description: 'The second date map to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'DATE_IS_AFTER $date1 AND $date2'
);

newCMD(
    'DATE_IS_SAME',
    'DATE_IS_SAME {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Checks if `DATE_MAP` and `DATE_MAP` are the same.',
    [
        { name: 'DATE_MAP', description: 'The first date map to check.' },
        { name: 'DATE_MAP', description: 'The second date map to check.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'BOOL',
    'DATE_IS_SAME $date1 AND $date2'
);

newCMD(
    'DATE_SINCE',
    'DATE_SINCE {DATE_MAP} [AS {VAR}]',
    'Gets the elapsed time from the specified date until now.',
    [
        { name: 'DATE_MAP', description: 'The date map to compare against the current date.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'DATE_CREATE "2024-06-03" AS $date\nDATE_SINCE $date AS $elapsed_time   # 2 months ago '
);

newCMD(
    'DATE_DISTANCE',
    '1. DATE_DISTANCE {DATE_MAP} [AS {VAR}]\n2. DATE_DISTANCE {DATE_MAP} TO {DATE_MAP} [AS {VAR}]',
    'Gets the elapsed time from the specified date until now or between two dates.',
    [
        { name: 'DATE_MAP', description: 'The date map to compare.' },
        { name: 'DATE_MAP', description: 'The second date map to compare.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'DATE_DISTANCE $date1 AS $distance\nDATE_DISTANCE $date1 TO $date2 AS $time_distance    # 4 years'
);

newCMD(
    'DATE_DIFF_YEARS',
    'DATE_DIFF_YEARS {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Calculates the difference in years between two dates.',
    [
        { name: 'DATE_MAP', description: 'The first date map.' },
        { name: 'DATE_MAP', description: 'The second date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_DIFF_YEARS $date1 AND $date2'
);

newCMD(
    'DATE_DIFF_MONTHS',
    'DATE_DIFF_MONTHS {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Calculates the difference in months between two dates.',
    [
        { name: 'DATE_MAP', description: 'The first date map.' },
        { name: 'DATE_MAP', description: 'The second date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_DIFF_MONTHS $date1 AND $date2'
);

newCMD(
    'DATE_DIFF_WEEKS',
    'DATE_DIFF_WEEKS {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Calculates the difference in weeks between two dates.',
    [
        { name: 'DATE_MAP', description: 'The first date map.' },
        { name: 'DATE_MAP', description: 'The second date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_DIFF_WEEKS $date1 AND $date2'
);

newCMD(
    'DATE_DIFF_DAYS',
    'DATE_DIFF_DAYS {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Calculates the difference in days between two dates.',
    [
        { name: 'DATE_MAP', description: 'The first date map.' },
        { name: 'DATE_MAP', description: 'The second date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_DIFF_DAYS $date1 AND $date2'
);

newCMD(
    'DATE_DIFF_HOURS',
    'DATE_DIFF_HOURS {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Calculates the difference in hours between two dates.',
    [
        { name: 'DATE_MAP', description: 'The first date map.' },
        { name: 'DATE_MAP', description: 'The second date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_DIFF_HOURS $date1 AND $date2'
);

newCMD(
    'DATE_DIFF_MINUTES',
    'DATE_DIFF_MINUTES {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Calculates the difference in minutes between two dates.',
    [
        { name: 'DATE_MAP', description: 'The first date map.' },
        { name: 'DATE_MAP', description: 'The second date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_DIFF_MINUTES $date1 AND $date2'
);

newCMD(
    'DATE_DIFF_SECONDS',
    'DATE_DIFF_SECONDS {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Calculates the difference in seconds between two dates.',
    [
        { name: 'DATE_MAP', description: 'The first date map.' },
        { name: 'DATE_MAP', description: 'The second date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_DIFF_SECONDS $date1 AND $date2'
);


newCMD(
    'DATE_DIFF_MICROSECONDS',
    'DATE_DIFF_MICROSECONDS {DATE_MAP} AND {DATE_MAP} [AS {VAR}]',
    'Calculates the difference in microseconds between two dates.',
    [
        { name: 'DATE_MAP', description: 'The first date map.' },
        { name: 'DATE_MAP', description: 'The second date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_DIFF_MICROSECONDS $date1 AND $date2'
);

newCMD(
    'DATE_GET_YEAR',
    'DATE_GET_YEAR {DATE_MAP} [AS {VAR}]',
    'Obtains the year from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_YEAR $date AS $year'
);

newCMD(
    'DATE_GET_MONTH',
    'DATE_GET_MONTH {DATE_MAP} [AS {VAR}]',
    'Obtains the month from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_MONTH $date AS $month'
);

newCMD(
    'DATE_GET_WEEK',
    'DATE_GET_WEEK {DATE_MAP} [AS {VAR}]',
    'Obtains the week number of the year from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_WEEK $date AS $week'
);

newCMD(
    'DATE_GET_DAY',
    'DATE_GET_DAY {DATE_MAP} [AS {VAR}]',
    'Obtains the day of the month from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_DAY $date AS $day'
);

newCMD(
    'DATE_GET_HOUR',
    'DATE_GET_HOUR {DATE_MAP} [AS {VAR}]',
    'Obtains the hour from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_HOUR $date AS $hour'
);

newCMD(
    'DATE_GET_MINUTE',
    'DATE_GET_MINUTE {DATE_MAP} [AS {VAR}]',
    'Obtains the minute from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_MINUTE $date AS $minute'
);

newCMD(
    'DATE_GET_SECOND',
    'DATE_GET_SECOND {DATE_MAP} [AS {VAR}]',
    'Obtains the second from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_SECOND $date AS $second'
);

newCMD(
    'DATE_GET_MICROSECOND',
    'DATE_GET_MICROSECOND {DATE_MAP} [AS {VAR}]',
    'Obtains the microsecond from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_MICROSECOND $date AS $microsecond'
);

newCMD(
    'DATE_GET_WEEKDAY',
    'DATE_GET_WEEKDAY {DATE_MAP} [AS {VAR}]',
    'Obtains the weekday number (1 to 7) from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_WEEKDAY $date AS $weekday'
);

newCMD(
    'DATE_GET_WEEKDAY_NAME',
    'DATE_GET_WEEKDAY_NAME {DATE_MAP} [AS {VAR}]',
    'Obtains the name of the weekday from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'DATE_GET_WEEKDAY_NAME $date AS $weekday_name'
);

newCMD(
    'DATE_GET_DAYS_IN_MONTH',
    'DATE_GET_DAYS_IN_MONTH {DATE_MAP} [AS {VAR}]',
    'Obtains the number of days in the month from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_DAYS_IN_MONTH $date AS $days_in_month'
);

newCMD(
    'DATE_GET_DAYS_IN_YEAR',
    'DATE_GET_DAYS_IN_YEAR {DATE_MAP} [AS {VAR}]',
    'Obtains the number of days in the year from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_DAYS_IN_YEAR $date AS $days_in_year'
);

newCMD(
    'DATE_GET_TIMESTAMP',
    'DATE_GET_TIMESTAMP {DATE_MAP} [AS {VAR}]',
    'Obtains the Unix timestamp from the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_TIMESTAMP $date AS $timestamp'
);

newCMD(
    'DATE_GET_WEEK_OF_YEAR',
    'DATE_GET_WEEK_OF_YEAR {DATE_MAP} [AS {VAR}]',
    'Obtains the week number of the year for the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_WEEK_OF_YEAR $date AS $week_of_year'
);

newCMD(
    'DATE_GET_DAY_OF_YEAR',
    'DATE_GET_DAY_OF_YEAR {DATE_MAP} [AS {VAR}]',
    'Obtains the day number of the year for the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_DAY_OF_YEAR $date AS $day_of_year'
);

newCMD(
    'DATE_GET_HOUR_OF_YEAR',
    'DATE_GET_HOUR_OF_YEAR {DATE_MAP} [AS {VAR}]',
    'Obtains the hour of the year for the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_HOUR_OF_YEAR $date AS $hour_of_year'
);

newCMD(
    'DATE_GET_MINUTE_OF_YEAR',
    'DATE_GET_MINUTE_OF_YEAR {DATE_MAP} [AS {VAR}]',
    'Obtains the minute of the year for the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_MINUTE_OF_YEAR $date AS $minute_of_year'
);

newCMD(
    'DATE_GET_SECOND_OF_YEAR',
    'DATE_GET_SECOND_OF_YEAR {DATE_MAP} [AS {VAR}]',
    'Obtains the second of the year for the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_SECOND_OF_YEAR $date AS $second_of_year'
);

newCMD(
    'DATE_GET_MICROSECOND_OF_YEAR',
    'DATE_GET_MICROSECOND_OF_YEAR {DATE_MAP} [AS {VAR}]',
    'Obtains the microsecond of the year for the specified date.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'NUMBER',
    'DATE_GET_MICROSECOND_OF_YEAR $date AS $microsecond_of_year'
);

newCMD(
    'DATE_INCREMENT_YEAR',
    'DATE_INCREMENT_YEAR {DATE_MAP} WITH {NUM} [AS {VAR}]',
    'Increments the year of the specified date by the given number. Returns a new date map.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'NUM', description: 'The number of years to increment.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'DATE_INCREMENT_YEAR $date WITH 5 AS $new_date'
);

newCMD(
    'DATE_INCREMENT_MONTH',
    'DATE_INCREMENT_MONTH {DATE_MAP} WITH {NUM} [AS {VAR}]',
    'Increments the month of the specified date by the given number. Returns a new date map.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'NUM', description: 'The number of months to increment.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'DATE_INCREMENT_MONTH $date WITH -3 AS $new_date'
);

newCMD(
    'DATE_INCREMENT_WEEK',
    'DATE_INCREMENT_WEEK {DATE_MAP} WITH {NUM} [AS {VAR}]',
    'Increments the week of the specified date by the given number. Returns a new date map.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'NUM', description: 'The number of weeks to increment.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'DATE_INCREMENT_WEEK $date WITH -3 AS $new_date'
);

newCMD(
    'DATE_INCREMENT_DAY',
    'DATE_INCREMENT_DAY {DATE_MAP} WITH {NUM} [AS {VAR}]',
    'Increments the day of the specified date by the given number. Returns a new date map.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'NUM', description: 'The number of days to increment.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'DATE_INCREMENT_DAY $date WITH 10 AS $new_date'
);

newCMD(
    'DATE_INCREMENT_HOUR',
    'DATE_INCREMENT_HOUR {DATE_MAP} WITH {NUM} [AS {VAR}]',
    'Increments the hour of the specified date by the given number. Returns a new date map.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'NUM', description: 'The number of hours to increment.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'DATE_INCREMENT_HOUR $date WITH 5 AS $new_date'
);

newCMD(
    'DATE_INCREMENT_MINUTE',
    'DATE_INCREMENT_MINUTE {DATE_MAP} WITH {NUM} [AS {VAR}]',
    'Increments the minute of the specified date by the given number. Returns a new date map.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'NUM', description: 'The number of minutes to increment.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'DATE_INCREMENT_MINUTE $date WITH 30 AS $new_date'
);

newCMD(
    'DATE_INCREMENT_SECOND',
    'DATE_INCREMENT_SECOND {DATE_MAP} WITH {NUM} [AS {VAR}]',
    'Increments the second of the specified date by the given number. Returns a new date map.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'NUM', description: 'The number of seconds to increment.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'DATE_INCREMENT_SECOND $date WITH 15 AS $new_date'
);

newCMD(
    'DATE_INCREMENT_MICROSECOND',
    'DATE_INCREMENT_MICROSECOND {DATE_MAP} WITH {NUM} [AS {VAR}]',
    'Increments the microsecond of the specified date by the given number. Returns a new date map.',
    [
        { name: 'DATE_MAP', description: 'The date map.' },
        { name: 'NUM', description: 'The number of microseconds to increment.' },
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'MAP',
    'DATE_INCREMENT_MICROSECOND $date WITH 500 AS $new_date'
);

newCMD(
    'DATE_SET_LOCALE',
    'DATE_SET_LOCALE {LOCAL}',
    'Sets the regional locale configuration. Accepts a language code as a parameter.',
    [
        { name: 'LOCAL', description: 'The locale to set (e.g., "en_US", "es_ES").' }
    ],
    'NULL',
    'DATE_SET_LOCALE "es_ES"'
);

newCMD(
    'DATE_SET_TIMEZONE',
    'DATE_SET_TIMEZONE {TIMEZONE}',
    'Sets the timezone.',
    [
        { name: 'TIMEZONE', description: 'The timezone to set (e.g., "Europe/Berlin", "LOCAL").' }
    ],
    'NULL',
    'DATE_SET_TIMEZONE "Europe/Berlin"'
);

newCMD(
    'DATE_SET_FORMAT',
    'DATE_SET_FORMAT {FORMAT} AS {format}',
    'Sets the global date format.',
    [
        { name: 'FORMAT', description: 'The date format to set (e.g., "YYYY-MM-DD").' },
        { name: 'format', description: 'Variable to store the format (optional).' }
    ],
    'STRING',
    'DATE_SET_FORMAT "YYYY-MM-DD" AS $format'
);

newCMD(
    'DATE_GET_LOCALE',
    'DATE_GET_LOCALE [AS {VAR}]',
    'Returns the regional localization code for the date format, like "en-us".',
    [
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'DATE_GET_LOCALE AS $locale'
);

newCMD(
    'DATE_GET_TIMEZONE',
    'DATE_GET_TIMEZONE [AS {VAR}]',
    'Returns the set timezone.',
    [
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'DATE_GET_TIMEZONE AS $timezone'
);

newCMD(
    'DATE_GET_FORMAT',
    'DATE_GET_FORMAT [AS {VAR}]',
    'Returns the global date format.',
    [
        { name: 'VAR', description: 'Variable to store the result (optional).' }
    ],
    'STRING',
    'DATE_GET_FORMAT AS $format'
);
