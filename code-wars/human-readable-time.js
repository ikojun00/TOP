/*
Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)

- HH = hours, padded to 2 digits, range: 00 - 99
- MM = minutes, padded to 2 digits, range: 00 - 59
- SS = seconds, padded to 2 digits, range: 00 - 59
The maximum time never exceeds 359999 (99:59:59)

You can find some examples in the test fixtures.
*/

function humanReadable (seconds) {
    if(seconds/60<1)
      {
        if(seconds<10)
        return `00:00:0${seconds}`
        else
        return `00:00:${seconds}`
      }
    else if(seconds/60>=1 && seconds/60/60<1)
      {
        if(seconds/60<10 && seconds%60<10)
          return `00:0${parseInt(seconds/60)}:0${seconds%60}`
        else if(seconds/60<10 && seconds%60>=10)
          return `00:0${parseInt(seconds/60)}:${seconds%60}`
        else if(seconds/60>=10 && seconds%60<10)
          return `00:${parseInt(seconds/60)}:0${seconds%60}`
        else
          return `00:${parseInt(seconds/60)}:${seconds%60}`
      }
    else if(seconds/60/60>=1 && seconds<360000)
      {
        const hours = parseInt(seconds/60/60)
        const left = seconds - 3600*hours
        const minutes = parseInt(left/60)
        const secondes = left%60
        if(hours<10 && minutes<10 && secondes<10)
          return `0${hours}:0${minutes}:0${secondes}`
        else if(hours<10 && minutes<10 && secondes>10)
          return `0${hours}:0${minutes}:${secondes}`
        else if(hours<10 && minutes>10 && secondes<10)
          return `0${hours}:${minutes}:0${secondes}`
        else if(hours<10 && minutes>10 && secondes>10)
          return `0${hours}:${minutes}:${secondes}`
        else if(hours>=10 && minutes<10 && secondes<10)
          return `${hours}:0${minutes}:0${secondes}`
        else if(hours>=10 && minutes<10 && secondes>=10)
          return `${hours}:0${minutes}:${secondes}`
        else if(hours>=10 && minutes>=10 && secondes<10)
          return `${hours}:${minutes}:0${secondes}`
        else
          return `${hours}:${minutes}:${secondes}`
      }
  
    return '';
}