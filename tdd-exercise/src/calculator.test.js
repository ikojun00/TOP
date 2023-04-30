import calculator from './calculator';

test('"add(2, 4)" should become "4"', () => {
    expect(calculator.add(2, 4)).toBe(6);
});

test('"subtract(5, 2)" should become "3"', () => {
    expect(calculator.subtract(5, 2)).toBe(3);
});

test('"divide(8, 2)" should become "4"', () => {
    expect(calculator.divide(8, 2)).toBe(4);
});

test('"multiply(2, 3)" should become "4"', () => {
    expect(calculator.multiply(2, 3)).toBe(6);
});

test('"multiply(test, 3)" should become "invalid value"', () => {
    expect(calculator.multiply(test, 3)).toBe('invalid value');
});