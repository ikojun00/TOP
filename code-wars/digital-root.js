function digitalRoot(n) {
    let sum = 0
          while (n > 0 || sum > 9)
          {
              if (n === 0) {
                  n = sum;
                  sum = 0;
              }
                 
              sum += n % 10;
              n = parseInt(n / 10);
          }
      return sum
  }