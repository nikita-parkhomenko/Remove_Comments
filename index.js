const fs = require("fs");

const removeLineComments = (str) => {
    str = str.split('');
    let lineComment = false;
    for (let i = 0, l = str.length; i < l; i++) {
 
        if (lineComment) {
            if ((str[i] === '\\') && (str[i+1] === 'r' || str[i+1] === 'n')) {
                lineComment = false;
            }
            str[i] = '';
            continue;
        }
 
        if (str[i] === '/' && str[i+1] === '/') {
                str[i] = '';
                lineComment = true;
                continue;
        }
 
    }
    return str.join('');
}

const removeBlockComments = (str) => {
    str = str.split('');
    let blockComment = false;

    for (let i = 0, l = str.length; i < l; i++) {
 
        if (blockComment) {
            if (str[i] === '*' && str[i+1] === '/') {
                str[i+1] = '';
                blockComment = false;
            }
            str[i] = '';
            continue;
        }
        if (str[i] === '/' && str[i+1] === '*') {
                str[i] = '';
                blockComment = true;
                continue;
        }
 
    }
    return str.join('');
}


fs.readFile("test.js", (err, data) => {
    if(err) throw err;
    let str = data.toString();
    str = removeBlockComments(str)
    str = str.split("\n")
    str = str.map( str => {
       return removeLineComments(str);
    })
    str = str.join('\n')
    console.log(str)
})