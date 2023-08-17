/*
A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).

Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.
*/

function isPangram(string){
    // count different letters and if there are 25 than we find pangram
    let sum = 0
    const removeDuplicatesArray = (Array.from(new Set(string.toLowerCase())))
    removeDuplicatesArray.forEach((element) => {
      if(element >= 'a' && element <= 'z')
        sum += 1
    })
    return sum === 26 ? true : false
}