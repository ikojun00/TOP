/*
Complete the method/function so that it converts dash/underscore delimited words into camel casing. 
The first word within the output should be capitalized only if the original word was capitalized (known as Upper Camel Case, also often referred to as Pascal case). 
The next words should be always capitalized.

Examples
"the-stealth-warrior" gets converted to "theStealthWarrior"

"The_Stealth_Warrior" gets converted to "TheStealthWarrior"

"The_Stealth-Warrior" gets converted to "TheStealthWarrior" 
*/

function toCamelCase(str){
    if (!str) {
      return '';
    }
    const first = str.replaceAll('-', '_').split('_').at(0);
    const strArr = str.replaceAll('-', '_').split('_').map((word) => {
      if(first === word)
        return word;
      else
        return word[0].toUpperCase() + word.substring(1).toLowerCase();
    });
    return strArr.join('');
  }