/*
This time we want to write calculations using functions and get the results. Let's have a look at some examples:
  seven(times(five())); // must return 35
  four(plus(nine())); // must return 13
  eight(minus(three())); // must return 5
  six(dividedBy(two())); // must return 3

  
Requirements:
  -There must be a function for each number from 0 ("zero") to 9 ("nine")
  -There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy
  -Each calculation consist of exactly one operation and two numbers
  -The most outer function represents the left operand, the most inner function represents the right operand
  -Division should be integer division. For example, this should return 2, not 2.666666...: eight(dividedBy(three()));
*/

let expr = function (number, operation) {
  if (!operation)
    return number;
  return operation(number);
}
  
function zero(operation) {
  return expr(0, operation)
}
function one(operation) {
  return expr(1, operation)
}
function two(operation) {
  return expr(2, operation)
}
function three(operation) {
  return expr(3, operation)
}
function four(operation) {
  return expr(4, operation)
}
function five(operation) {
  return expr(5, operation)
}
function six(operation) {
  return expr(6, operation)
}
function seven(operation) {
  return expr(7, operation)
}
function eight(operation) {
  return expr(8, operation)
}
function nine(operation) {
  return expr(9, operation)
}
  
function plus(a) {
  return function (b) {
    return b + a;
  }
}
function minus(a) {
  return function (b) {
    return b - a;
  }
}
function times(a) {
  return function (b) {
    return b * a;
  }
}
function dividedBy(a) {
  return function (b) {
    return parseInt(b / a);
  }
}