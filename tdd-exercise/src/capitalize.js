function capitalize(string){
    for(let i = 0; i<string.length; i+=1)
    {
        if(string[i] >= 'a' && string[i] <= 'z') return string.slice(0, i) + string[i].toUpperCase() + string.slice(i + 1, string.length + 1);
        else if(string[i] >= 'A' && string[i] <= 'Z') return string;
    }
    return 'no valid characters';
}
   
module.exports = capitalize;