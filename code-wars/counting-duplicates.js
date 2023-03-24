function removeDuplicates(arr) {
    return [...new Set(arr)];
}

function duplicateCount(text){
let counter = 0
let a=''
text = text.toLowerCase();
for(let i=0; i<text.length-1; i++)
{
  for(let j=i+1; j<text.length; j++)
  {
    if(text[i]===text[j])
    {
      a+=text[i]
    }
  }
}
a = removeDuplicates(a)
return a.length
}