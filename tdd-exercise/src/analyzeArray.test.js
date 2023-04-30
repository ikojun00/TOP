import analyzeArray from './analyzeArray';

test('"analyzeArray([1,8,3,4,2,6])" should be "average: 4, min: 1, max: 8, length: 6"', () => {
    expect(analyzeArray([1,8,3,4,2,6]))
    .toEqual
    (
        {
            average: 4,
            min: 1,
            max: 8,
            length: 6
        }
    );
});

test('"analyzeArray([1,"a",3,4,2,6])" should be "non number inside array"', () => {
    expect(analyzeArray([1,'a',3,4,2,6])).toEqual('non number inside array');
});

test('"analyzeArray("test")" should be "invalid input"', () => {
    expect(analyzeArray('test')).toEqual('invalid input');
});