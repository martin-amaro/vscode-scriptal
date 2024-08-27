export const keywords: { [key: string]: string } = {
    'STRING': 'Represents a sequence of characters.',
    'INFINITY': 'A special numeric value representing infinity.',
    'EMPTY': 'Represents an empty value or null.',
    'BOOLEAN': 'Represents a true or false value.',
    'NUMBER': 'Represents any numeric value, including integers and floats.',
    'TRUE': 'Represents the boolean value true.',
    'FALSE': 'Represents the boolean value false.',
    'PATTERN': 'Represents a regular expression pattern used for matching strings.',
    'MAP': 'Represents a collection of key-value pairs, similar to an object or dictionary.',
    'ARRAY': 'Represents a list or collection of values, indexed by position.',
    'NAN': 'Represents a special numeric value meaning Not-A-Number.',
    'NULL': 'Represents a null value, indicating the absence of any value or object.',
    'VAR': 'Represents a raw variable (unresolved).',
    'ARRAY_NUMBER': 'Represents an array of only numbers.',
    'ARRAY_STRING': 'Represents an array of only strings.',
    'ARRAY_MAP': 'Represents an array of only maps.',
    'ARRAY_ARRAY': 'Represents an array of only arrays.',
    'ARRAY_BOOL': 'Represents an array of only booleans.',
    'ARRAY_VAR': 'Represents an array of only raw variables (unresolved variables).',


    'DOT': 'Represents a period (`.`) character.',
    'SPACE': 'Represents a space ( ) character.',
    'NEWLINE': 'Represents a newline character (`\\n`).',
    'COMMA': 'Represents a comma (`,`) character.',
    'HASH': 'Represents a hash (`#`) character.',
    'TAB': 'Represents a tab character (`\\t`).',
    'ELLIPSIS': 'Represents an ellipsis (`...`) character sequence.'

};

export const events: { [key: string]: string} = {
    'START': 'Triggered at the start. Ideal for initializing variables or setting up the environment.',
    'GLOBAL': 'The default context for commands not within other events.',
    'END': 'Triggered at the end. Used for final adjustments or resource cleanup.',
    'EACH_LINE': 'Executes on each line of loaded content.',
    'EVEN_LINES': 'Executes on lines with an even index.',
    'ODD_LINES': 'Executes on lines with an odd index.',
    'CONTENT_LINES': 'Executes on lines containing text.',
    'EMPTY_LINES': 'Executes on empty lines.',

}

export const connectors: string[] = [
    "AS",
    "AND",
    "AT",
    ":",
    "BETWEEN",
    "BY",
    "FROM",
    "IN",
    "INTO",
    "OF",
    "OR",
    "THAN",
    "TO",
    "WITH"
];


export const envars: { [key: string]: string } = { 
    '@CONTENT': 'Returns all the content that has been previously loaded.',
    '@STORED': 'Returns the stored lines.',
    '@LINE': 'Returns the current line being processed.',
    '@LINE_INDEX': 'Returns the index of the current line.',
    '@LINES': 'Returns all the lines of the loaded content.',
    '@WORDS': 'Returns all the words of the current line as an array.',
    '@CHARS': 'Returns all the characters of the current line as an array.',
    '@KEY': 'Returns the value of the current iteration. If it doesn\'t exist, returns the index.',
    '@INDEX ': 'Returns the index of the current iteration.',
    '@PARAMS': 'Returns an array with the parameters of the command used.',
    '@SYNTAX': 'Returns the index of the current syntax.',
    '@SELF': 'Export the current definition.',
}