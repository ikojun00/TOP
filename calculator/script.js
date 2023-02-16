function operate(operation)
{
    let result;
    const a = parseInt(operation.firstOperand);
    const b = parseInt(operation.secondOperand);
    const operator = operation.operator;
    switch(operator) 
    {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "/":
            result = a / b;
            break;
        case "*":
            result = a * b;
            break;
        default:
            console.log("Error: operate()");
            break;
    }
    console.log(result);
    return result;
}

function inputOperand(operation, value)
{
    if(operation.operator === "")
        operation.firstOperand = operation.firstOperand.concat(value);
    else if(operation.operator != "")
        operation.secondOperand = operation.secondOperand.concat(value);
    else
        console.log("Error: inputOperand()");
    console.log(operation);
}

function inputOperator(operation, value)
{
    if(operation.operator === "" && operation.firstOperand !== "")
        operation.operator = value;
    else if(operation.firstOperand !== "" && operation.secondOperand !== "")
    {
        operation.firstOperand = operate(operation);
        operation.secondOperand = "";    
        operation.operator = value;
    }
    else
        console.log("Error: inputOperator()");
    console.log(operation);
}

function inputEquals(operation)
{
    if(operation.operator !== "" && operation.firstOperand !== "" && operation.secondOperand !== "")
    {
        operate(operation);
        operation.firstOperand="";
        operation.secondOperand="";
        operation.operator="";
    }
    console.log(operation);
}

function buttons(operation)
{
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if(button.id === "nine" || button.id === "eight"
            || button.id === "seven" || button.id === "six"
            || button.id === "five" || button.id === "four"
            || button.id === "three" || button.id === "two"
            || button.id === "one" || button.id === "null")
                inputOperand(operation, document.getElementById(button.id).innerHTML);
            else if(button.id === "multiply" || button.id === "divide"
            || button.id === "add" || button.id === "subtract")
                inputOperator(operation, document.getElementById(button.id).innerHTML);
            else if(button.id === "equals")
                inputEquals(operation);
            else
                return -1;
        });
        });
}

let operation = {
    firstOperand: "",
    secondOperand: "",
    operator: ""
};
buttons(operation);