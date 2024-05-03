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

//buttons creation

function createButton( id, text){
    let button = document.createElement("button")
    button.innerHTML= text
    // button.id = id;
    // button.addEventListener("click", function(){
    //     alert('button' + id + "clicked")
    // });
    button.classList.add('NumberButtons')
    return button
}

function addButtons() {

    let buttonOrder = ['AC','DEL','%',"÷",7,8,9,"x",4,5,6,"-",1,2,3,"+",0,".","="]
    let container = document.getElementById("button-container");
    for (let i = 0; i < buttonOrder.length; i++) {
        let buttonId = "button" + i;
        let buttonText = buttonOrder[i];
        let newButton = createButton(buttonId, buttonText);
        newButton.classList.add("button-" + buttonText)
        container.appendChild(newButton);

    
    (buttonOrder[i] === '%') ?newButton.classList.add('modulusButton'):
    (buttonOrder[i] === '÷') ?newButton.classList.add('modulusButton'):
    (buttonOrder[i] === 'x') ?newButton.classList.add('modulusButton'):
    (buttonOrder[i] === '-') ?newButton.classList.add('modulusButton'):
    (buttonOrder[i] === '+') ?newButton.classList.add('modulusButton'):
    (buttonOrder[i] === '=') ?newButton.classList.add('modulusButton'):
    '';
    }
}
addButtons()