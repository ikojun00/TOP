function DNAStrand(dna){
    let dnaNew = '';
    for(i=0; i<dna.length; i++)
      {
        if(dna[i]=='A')
          dnaNew+='T';
        else if(dna[i]=='T')
          dnaNew+='A';
        else if(dna[i]=='C')
          dnaNew+='G';
        else if(dna[i]=='G')
          dnaNew+='C';
        else console.log('Error')
      }
    return dnaNew
}