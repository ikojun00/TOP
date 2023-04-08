/*
Digital root is the recursive sum of all the digits in a number.

Given n, take the sum of the digits of n. 
If that value has more than one digit, continue reducing in this way until a single-digit number is produced. 
The input will be a non-negative integer.
*/

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