/*
Take 2 strings s1 and s2 including only letters from a to z. 
Return a new sorted string, the longest possible, containing distinct letters - each taken only once - coming from s1 or s2.

Examples:
a = "xyaabbbccccdefww"
b = "xxxxyyyyabklmopq"
longest(a, b) -> "abcdefklmopqwxy"

a = "abcdefghijklmnopqrstuvwxyz"
longest(a, a) -> "abcdefghijklmnopqrstuvwxyz"
*/

function sortString(s) {
    return s.split('').sort().join('');
}

function longest(s1, s2) {
  let s = s1+s2;
  let a = "";
  s = sortString(s);
  console.log(s)
  for(let i=1; i<=s.length; i++)
    {
      if(s[i]!==s[i-1])
        a+=s[i-1];
    }
  return a;
}