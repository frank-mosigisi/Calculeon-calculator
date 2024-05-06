//arithmetic functions
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
    if (b===0){
        throw new Error("Lmao! cant ÷ by 0");

    }
    return a / b
}

function modulus (a,b){
    return a % b
}

//operation function
let numberOne;
let numberTwo;
let operator;

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

//buttons creation section
function createButton( id, text){
    let button = document.createElement("button")
    button.textContent= text
    button.classList.add('AllButtons')
    return button
}

//button adding section
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


//screen is populated and calculation occurs

let storedValueOne = "";
let operatorz = "";
let storedValueTwo = "";
let answer = "";
let buttonScreen = document.querySelector(".buttonScreen h1");

function populateAndCalculate() {
    let allButtons = document.querySelectorAll("#button-container button");

    allButtons.forEach(function (button) {
      button.addEventListener("click", function () {

        let buttonValue = button.textContent
        
        //operators section
        if (['%', '÷', 'x', '-', '+'].includes(buttonValue)) {
            if (storedValueOne === '' && buttonValue === '-' & answer === '') {
              storedValueOne = '-';
              buttonScreen.textContent = storedValueOne;
            } 
            else if(['%', '÷', 'x', '+'].includes(buttonValue) && storedValueOne === '' && answer ===''){
                operatorz = '';
            }
            //2+3+4+6 does 2 + 3 then press + does calc before proceeding to next
            else if (storedValueOne !== '' && operatorz !== '' && storedValueTwo !== '') {
              computeTotal();
              storedValueOne = answer;
              operatorz = buttonValue;
            //if answer = 5 when press operator like + stores ans=value1 and proceeds with calc
            } else if (answer !==''){
                storedValueOne = answer;
                answer =''
                operatorz = buttonValue;
                buttonScreen.textContent = '';

            }else {
              operatorz = buttonValue;
              buttonScreen.textContent = '';
            }
        }
            // clears everything at once
        else if (buttonValue=== 'AC'){
            clearEverything()  
            answer ='' 
            buttonScreen.textContent = 0 
        }

         // checks for different values & clears them one by one
        else if (buttonValue === 'DEL') {
            if (answer !==""){
                answer = String(answer).slice(0, -1);
                buttonScreen.textContent = 0
            }
            else if (storedValueTwo !== "") {
                storedValueTwo = String(storedValueTwo).slice(0, -1);
                buttonScreen.textContent = storedValueTwo
            } else if (operatorz !== "") {
                operatorz = "";
            } else if (storedValueOne !== "") {
                storedValueOne = String(storedValueOne).slice(0, -1);
                buttonScreen.textContent = storedValueOne
                buttonScreen.textContent = 0
            } else {
                return 'Error Encountered'
            }
        }
               
            //operations for valueOne
        else if (operatorz === '' && buttonValue !== '=') {
                //check decimal value if it exists
            if (buttonValue ==='.' && storedValueOne.includes('.')){
                return storedValueOne;
            }

            answer = ''
            storedValueOne += buttonValue
            storedValueOne = truncateValue(storedValueOne,14)
            buttonScreen.textContent = storedValueOne
            console.log('met 1st number', storedValueOne)
                
        }  
       
            //operations for value two
        else if (operatorz !== '' && buttonValue !== '=') {

            //check decimal value if it exists
            if (buttonValue ==='.' && storedValueTwo.includes('.')){
                return storedValueTwo;
            }
            answer = ''
            storedValueTwo += buttonValue
            storedValueTwo = truncateValue(storedValueTwo, 14)
            buttonScreen.textContent = storedValueTwo
            console.log('met 2nd number', storedValueTwo) 
        }
        
        //operations for equal sign
        else if(buttonValue === '='){
            if (storedValueOne === "" || operatorz === "" || storedValueTwo === ""){ 
                return false
            } else {
                computeTotal()
            }
        }

        else {
            return 'Error encountered'
        }

      });
    });
}
populateAndCalculate();           

function computeTotal() {
    numberOne = parseFloat(storedValueOne);
    numberTwo = parseFloat(storedValueTwo);
  
    try {
      answer = operate(numberOne, operatorz, numberTwo);
      answer = answer.toString();
  
      if (answer.length >= 10) {
        answer = parseFloat(answer);
        answer = answer.toExponential(10);
      }
  
      buttonScreen.textContent = answer;
      clearEverything();
    } catch (error) {
      buttonScreen.textContent = error.message;
      clearEverything();
    }
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