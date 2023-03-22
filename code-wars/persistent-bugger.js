function persistence(num) {
    let product = 1;
    let counter = 1;
    if(num < 10)
          return 0
     while(product>9 || num>0)
      {
        if(num===0)
          {
            num = product
            product = 1;
            counter++;
          }
        product *=num%10;
        num=parseInt(num/10);
      }
    return counter;
  }