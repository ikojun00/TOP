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