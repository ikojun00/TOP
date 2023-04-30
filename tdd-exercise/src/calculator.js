function isValid(firstOperand, secondOperand){
    if (typeof firstOperand !== 'number' || typeof secondOperand !== 'number') return false;
    return true;
}

const operation = (firstOperand, secondOperand) => {
    const add = (firstOperand, secondOperand) => {
        if(isValid(firstOperand, secondOperand) === true) return firstOperand + secondOperand;
        return 'invalid value';
    }
    const subtract = (firstOperand, secondOperand) => {
        if(isValid(firstOperand, secondOperand) === true) return firstOperand - secondOperand;
        return 'invalid value';
    }
    const divide = (firstOperand, secondOperand) => {
        if(isValid(firstOperand, secondOperand) === true) return firstOperand / secondOperand;
        return 'invalid value';
    } 
    const multiply = (firstOperand, secondOperand) => {
        if(isValid(firstOperand, secondOperand) === true) return firstOperand * secondOperand;
        return 'invalid value';
    }
    return { add, subtract, divide, multiply};
}

const calculator = operation();

module.exports = calculator;