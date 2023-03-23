function tribonacci(signature,n){
    let i=2;
    while(i<n-1)
    {
      signature.push(signature[i]+signature[i-1]+signature[i-2]);
      i++;
    }
    return signature.slice(0, n);
    
}