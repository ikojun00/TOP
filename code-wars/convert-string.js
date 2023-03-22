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