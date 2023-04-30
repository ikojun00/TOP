function caesarCipher(string, value)
{
    if (typeof string !== 'string' || typeof value !== 'number') return 'invalid input';
    for (let i = 0; i < string.length; i += 1) 
    {
        let c = string.charCodeAt(i);
        if(c >= 65 && c <= 90)
            string = string.slice(0, i) + String.fromCharCode(((c - 65 + value) % 26) + 65) + string.slice(i + 1, string.length + 1);
        else if(c >= 97 && c <= 122) 
            string = string.slice(0, i) + String.fromCharCode(((c - 97 + value) % 26) + 97) + string.slice(i + 1, string.length + 1);
    }
    return string;
}

module.exports = caesarCipher;