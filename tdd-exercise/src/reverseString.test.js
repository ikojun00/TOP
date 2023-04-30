import reverseString from './reverseString'

test('"test" should become "tset"', () => {
    expect(reverseString('test')).toBe('tset');
});

test('"12345" becomes "54321"', () => {
    expect(reverseString('12345')).toBe('54321');
  });
  
test('12345 becomes "not a string"', () => {
    expect(reverseString(12345)).toBe('not a string');
});