/*
You will be given a number and you will need to return it as a string in Expanded Form. For example:

expandedForm(12); // Should return '10 + 2'
expandedForm(42); // Should return '40 + 2'
expandedForm(70304); // Should return '70000 + 300 + 4'
NOTE: All numbers will be whole numbers greater than 0.
*/

function expandedForm(num) {
    let a = '', i=0;
    while(num>0)
      {
        if(num%10===0)
          a+='';
        else if(a==='')
          a+=`${num%10*Math.pow(10, i)}`;
        else
          a = `${num%10*Math.pow(10, i)} + `.concat(a);
        num=parseInt(num/10);
        i++;
      }
    return a;
  }