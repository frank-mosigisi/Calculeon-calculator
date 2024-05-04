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
    if (b==0){
        return "Don't do that"
    }
    return a / b
}

function modulus (a,b){
    return a % b
}


// console.log(add(2,3))

let numberOne
let numberTwo
let operator

function operate (numberOne, operator, numberTwo){

    switch (operator){
        case '+':
            return add(numberOne, numberTwo);

        case '-':
            return subtract(numberOne, numberTwo);
            
        case 'x':
            return multiplication(numberOne, numberTwo);

        case '÷':
            return division(numberOne, numberTwo);
        
        case '%':
            return modulus(numberOne, numberTwo);
            
        default:
            return 'Invalid operator';
    }
}
// console.log(operate(1,'+',2))

//buttons creation

function createButton( id, text){
    let button = document.createElement("button")
    button.textContent= text
    button.classList.add('AllButtons')
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
        
        if ([1,2,3,4,5,6,7,8,9,0,'.'].includes(buttonOrder[i])) {
            newButton.classList.add('numbers');
          } else {
            newButton.classList.add('operators');
          }


        container.appendChild(newButton);
    (buttonOrder[i] === '=') ?newButton.classList.add('equalsButoon'):
    '';
    }
}
addButtons()



let storedValueOne = ""
let operatorz = ""
let storedValueTwo = ""
let answer = ""
let buttonScreen = document.querySelector(".buttonScreen h1");

function populateDisplay() {
    let allButtons = document.querySelectorAll("#button-container button");

    allButtons.forEach(function (button) {
      button.addEventListener("click", function () {

        let buttonValue = button.textContent

        if (['%', '÷', 'x', '-', '+'].includes(buttonValue)) {
            if (storedValueOne !== "" && operatorz !== "" && storedValueTwo !== ""){
                computeTotal()
                storedValueOne = answer
                operatorz = buttonValue
                console.log('operator cought01', operatorz)
            } else {
            operatorz = buttonValue
            console.log('operator cought', operatorz)
            buttonScreen.textContent = ''
          } }

          else if (buttonValue=== 'AC'){
            clearEverything()   
            buttonScreen.textContent = 0 
        }

           else if (buttonValue === 'DEL') {
                if (storedValueTwo !== "") {
                  storedValueTwo = String(storedValueTwo).slice(0, -1);
                  buttonScreen.textContent = storedValueTwo
                  console.log('Deleted from storedValueTwo:', storedValueTwo);
                } else if (operatorz !== "") {
                  operatorz = "";
                  console.log('Deleted the operator');
                } else if (storedValueOne !== "") {
                    storedValueOne = String(storedValueOne).slice(0, -1);
                  buttonScreen.textContent = storedValueOne
                  console.log('Deleted from storedValueOne:', storedValueOne);
                }  
                else if (answer !== "") {
                    answer = String(answer).slice(0, -1);
                    buttonScreen.textContent = answer
                    console.log('Deleted answer:', answer);
                    buttonScreen.textContent = 0
                    
                }

                else if (storedValueOne === "") {
                    buttonScreen.textContent = 0
                    console.log('storedValueOne is empty:', storedValueOne);
            }}

            else if(answer !== '' && buttonValue !== '='){

            if (buttonValue ==='.' && storedValueTwo.includes('.')){
                return storedValueTwo;
            }
                storedValueOne = answer
                answer = ''
                storedValueTwo += buttonValue;
                storedValueTwo = truncateValue(storedValueTwo, 11)
                buttonScreen.textContent = storedValueTwo;

               }
            
          else if (operatorz === '' && buttonValue !== '=') {
                
            //check decimal value if it exists
            if (buttonValue ==='.' && storedValueOne.includes('.')){
                return storedValueOne;
            }

        answer = ""
        storedValueOne += buttonValue
        storedValueOne = truncateValue(storedValueOne,11)
        buttonScreen.textContent = storedValueOne
        console.log('the number caught', storedValueOne)
        
       }  else if (operatorz !== ''&& buttonValue !== '=') {

        //check decimal value if it exists
        if (buttonValue ==='.' && storedValueTwo.includes('.')){
            return storedValueTwo;
        }
        answer = ''
        storedValueTwo += buttonValue
        storedValueTwo = truncateValue(storedValueTwo, 11)
        buttonScreen.textContent = storedValueTwo
        console.log('the number caught2', storedValueTwo)
        
       }
       else if(buttonValue === '='){
     if (storedValueOne === "" || operatorz === "" || storedValueTwo === ""){ 
        return false
     } else {
        computeTotal()
     }
       } 
       else //better check over here
        {console.log('rara')}

      });
    });
}
populateDisplay();


function computeTotal(){
    numberOne = parseFloat(storedValueOne); // Convert to number
    numberTwo = parseFloat(storedValueTwo); // Convert to number
    answer = operate(numberOne,operatorz,numberTwo)
    buttonScreen.textContent = answer
    clearEverything()
    }


function clearEverything(){
    storedValueOne = ""
    operatorz = ""
    storedValueTwo = ""
}

function truncateValue( value, maxLength){
    if (value.length > maxLength){
        return value.slice(0, maxLength)
    }
    return value
}
