function mergeSort(A, p, r) 
{
    if (p < r) 
    {
      let q = parseInt((p + r)/2);
      mergeSort(A, p, q);
      mergeSort(A, q + 1, r);
      merge(A, p, q, r);
    }
}
  
function merge(A, p, q, r) {
    let B = new Array(r - p + 1);
    let i = (k = p);
    let j = q + 1;
    
    while (i <= q && j <= r) 
    {
      if (A[i] <= A[j]) B[k++] = A[i++];
      else B[k++] = A[j++];
    }
    
    while (i <= q) B[k++] = A[i++];
    
    while (j <= r) B[k++] = A[j++];
    
    for (let i = p; i <= r; i++) A[i] = B[i];
}

let A = [7, 2, 5, 6, 1, 3];
mergeSort(A, 0, A.length - 1);
console.log(A);