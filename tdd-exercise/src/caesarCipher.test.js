import caesarCipher from './caesarCipher';

test('"attack at dawn" should become "fyyfhp fy ifbs"', () => {
  expect(caesarCipher('attack at dawn', 5)).toBe('fyyfhp fy ifbs');
});

test('"attaCK at DaWN" should become "fyyfHP fy IfBS"', () => {
    expect(caesarCipher('attaCK at DaWN', 5)).toBe('fyyfHP fy IfBS');
});

test('"9" should become "invalid input"', () => {
    expect(caesarCipher(9, 5)).toBe('invalid input');
});