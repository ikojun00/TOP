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
    return result;
}

function inputOperand(operation, value)
{
    if(operation.operator === "")
    {
        operation.firstOperand = operation.firstOperand.concat(value);
        document.getElementById("display").innerHTML = operation.firstOperand;
    }
    else if(operation.operator != "")
    {
        operation.secondOperand = operation.secondOperand.concat(value);
        document.getElementById("display").innerHTML = operation.secondOperand;
    }
    else
        console.log("Error: inputOperand()");
    console.log(operation);
}

function inputOperator(operation, value)
{
    if(operation.result !== "" && operation.firstOperand === "")
    {
        operation.firstOperand = operation.result;
        operation.result = "";
        operation.operator = value;
    }
    else if(operation.operator === "" && operation.firstOperand !== "")
        operation.operator = value;
    else if(operation.firstOperand !== "" && operation.secondOperand !== "")
    {
        operation.firstOperand = operate(operation);
        operation.secondOperand = "";    
        operation.operator = value;
        document.getElementById("display").innerHTML = operation.firstOperand;
    }
    else
        console.log("Error: inputOperator()");
    console.log(operation);
}

function eraseInput(operation)
{
    operation.firstOperand="";
    operation.secondOperand="";
    operation.operator="";
    operation.result ="";
    document.getElementById("display").innerHTML = "";
    console.log(operation);
}

function addSign(operation)
{
    if(operation.operator === "" && operation.firstOperand !== "")
    {
        if(operation.firstOperand.startsWith("-"))
            operation.firstOperand = operation.firstOperand.slice(1);
        else
            operation.firstOperand = "-" + operation.firstOperand;
        document.getElementById("display").innerHTML = operation.firstOperand;
    }
    else if(operation.operator !== "" && operation.secondOperand !== "")
    {
        if(operation.secondOperand.startsWith("-"))
            operation.secondOperand = operation.secondOperand.slice(1);
        else
            operation.secondOperand = "-" + operation.secondOperand;
        document.getElementById("display").innerHTML = operation.secondOperand;
    }
    else
        console.log("Error: addSign()");
    console.log(operation);
}

function solveWithPercent(operation)
{
    if(operation.firstOperand !== "" && operation.secondOperand === "")
    {
        operation.result = operation.firstOperand / 100;
        document.getElementById("display").innerHTML = operation.result;
        operation.firstOperand = "";
    }
    else
        console.log("Error: solveWithPercent()");
}

function inputEquals(operation)
{
    if(operation.operator !== "" && operation.firstOperand !== "" && operation.secondOperand !== "")
    {
        operation.result = operate(operation);
        document.getElementById("display").innerHTML = operation.result;
        operation.firstOperand="";
        operation.secondOperand="";
        operation.operator="";
    }
    else
        console.log("Error: inputEquals()");  
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
            else if(button.id === "clear")
                eraseInput(operation);
            else if(button.id === "sign")
                addSign(operation);
            else if(button.id === "percent")
                solveWithPercent(operation);
            else
                return -1;
        });
        });
}

let operation = {
    firstOperand: "",
    secondOperand: "",
    operator: "",
    result: ""
};
buttons(operation);