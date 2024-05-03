function add (a,b){
    return a + b
}

function subtract (a,b){
    return a - b
}

function multiplication (a,b){
    return a * b
}

function division (a,b){
    return a / b
}


// console.log(add(2,3))
// console.log(subtract(2,3))
// console.log(multiplication(2,3))
// console.log(division(4,2))

let numberOne
let numberTwo
let operator

function operate (numberOne, operater, numberTwo){

    switch (operater){

        case '+':
            return add(numberOne, numberTwo);

        case '-':
            return subtract(numberOne, numberTwo);
            
        case '*':
            return multiplication(numberOne, numberTwo);

        case '/':
            return division(numberOne, numberTwo);

        default:
            return 'Invalid operator';
    }
}

