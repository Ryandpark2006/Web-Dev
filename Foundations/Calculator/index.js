{
    function add(x,y){
        return parseFloat(x)+parseFloat(y);
    }

    function subtract(x,y){
        return parseFloat(x)-parseFloat(y);
    }

    function multiply(x,y){
        return parseFloat(x)*parseFloat(y);
    }

    function divide(x,y){
        return parseFloat(x) / parseFloat(y);
    }

    function operate(val1, val2, operator){
        if (operator == "*"){
            return multiply(val1, val2);
        }
        else if (operator == "/"){
            if(val2 == 0){
                return 'not possible';
            }
            else{
                return divide(val1, val2);
            }
        }
        else if (operator == "+"){
            return add(val1, val2);
        }
        else if (operator == "-"){
            return subtract(val1, val2);
        }
    }

    let displayVal = "0";
    let val1 = 0;
    let val2 = 0;
    let operator1 = null;
    let operator2 = null;
    let result = null;
    const buttons = document.querySelectorAll('button')

    // window.addEventListener('keydown', function(e){
    //     const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    //     key.click();
    // });

    function updateDisplay(){
        const display = document.getElementById('display');
        display.innerText = displayVal;
        console.log(displayVal);
        if(displayVal.length > 9){
            display.innerText = displayVal.substring(0, 9);
        }
    }

    updateDisplay();

    function inputOperand(operand){
        if(operator1 == null){
            if(displayVal == "0" || displayVal == 0){
                displayVal = operand;
            }
            else if(displayVal == val1){
                displayVal = operand
            }
            else {
                displayVal += operand;
            }
        }
        else{
            if(displayVal == val1){
                displayVal = operand;
            }
            else{
                displayVal += operand;
            }
        }
    }

    function inputOperator(operator){
        if(operator1 != null && operator2 == null){
            // handles 4th click (second operator)
            operator2 = operator;
            val2 = displayVal;
            result = operate(Number(val1), Number(val2), operator1)
            displayVal = roundAccurately(result, 15).toString();
            val1 = displayVal;
            result = null;
        }
        else if(operator1 != null && operator2 != null){
            val2 = displayVal;
            result = operate(Number(val1), Number(val2), operator2);
            operator2 = operator;
            displayVal = roundAccurately(result, 15).toString();
            val1 = displayVal;
            result = null;
        }
        else{
            operator1 = operator; 
            val1 = displayVal;
        }
    }

    function equals(){
        console.log(val1);
        console.log(val2);
        console.log(operator1);
        if(operator1 == null){
            displayVal = displayVal;
        }
        else if(operator2 != null){
            val2 = displayVal;
            result = operate(Number(val1), Number(val2), operator2);
            if(result == 'not possible'){
                displayVal = 'not possible';
            }
            else{
                displayVal = roundAccurately(result, 15).toString();
                val1 = displayVal;
                val2 = null;
                operator1 = null;
                operator2 = null;
                result = null;
            }
        }
        else{
            val2 = displayVal;
            result = operate(Number(val1), Number(val2), operator1);
            if(result == 'not possible'){
                displayVal = 'not possible';
            }
            else{
                displayVal = roundAccurately(result, 15).toString();
                val1 = displayVal;
                val2 = null;
                operator1 = null;
                operator2 = null;
                result = null;
            }
        }
    }

    function clearAll(){
        displayVal = "0";
        val1 = 0;
        val2 = 0;
        operator1 = null;
        operator2 = null;
        result = null;
    }

    function changeSign(){
        displayVal *= -1;
    }

    function addDecimal(dot){
        if(!displayVal.includes(dot)){
            displayVal += dot;
        }
    }

    function clickButton(){
        for(let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener('click', function() {
                if(buttons[i].classList.contains('operator')){
                    inputOperator(buttons[i].value);
                    updateDisplay();
                }
                else if(buttons[i].classList.contains('numbers')){
                    inputOperand(buttons[i].value);
                    updateDisplay();
                }
                else if(buttons[i].classList.contains('equals')){
                    equals();
                    updateDisplay();
                }
                else if(buttons[i].classList.contains('clear')){
                    clearAll();
                    updateDisplay();
                }
                else if(buttons[i].classList.contains('decimal')){
                    addDecimal(buttons[i].value);
                    updateDisplay();
                }
                else if(buttons[i].classList.contains('percent')){
                    displayVal *= 10**(-2);
                    updateDisplay();
                }
                else if(buttons[i].classList.contains('negative')){
                    changeSign();
                    updateDisplay();
                }
            }
        )}
    }

    clickButton();

    function roundAccurately(num, places) {
        return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
    }

}