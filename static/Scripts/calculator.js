$(document).ready(function () {
    initialize();
});

var txtInput;
var txtResult;
var result = 0;
var waiting = false;
var memory = 0;
var operand = 0;
var boolNewEntry = true;
var clicked = false;
var decimal = false;

function initialize() {

    txtInput = document.getElementById('txtInput');
    txtResult = document.getElementById('txtResult');
    document.getElementById('btnPlus').addEventListener('click', plusClick, false);
    document.getElementById('btnMinus').addEventListener('click', minusClick, false);
    document.getElementById('btnClearEntry').addEventListener('click', clearEntry, false);
    document.getElementById('btnClear').addEventListener('click', clear, false);
    document.getElementById('btnMult').addEventListener('click', multClick, false);
    document.getElementById('btnDiv').addEventListener('click', divClick, false);
    document.getElementById('btnEquals').addEventListener('click', equalsClick, false);
    document.getElementById('btnDecimal').addEventListener('click', decimalClick, false);
    clear();
    for (var i = 0; i < 10; i++) {
        document.getElementById('btn' + i).addEventListener('click', numberClick, false);
    }
}

function plusClick() {
    if (clicked == false) {
        if (waiting === false) {
            operand = 1;
            result = Number(txtInput.value);
            waiting = true;
        } else {
            memory = Number(txtInput.value);
            calculate();
            operand = 1;
        }
    } else {
        result = Number(txtInput.value);
        operand = 1;
    }
    boolNewEntry = true;
    clicked = true;
    clearMem();
    track();
}

function minusClick() {
    if (clicked == false) {
        if (waiting === false) {
            operand = 2;
            result = Number(txtInput.value);
            waiting = true;
        } else {

            memory = Number(txtInput.value);
            calculate();
            operand = 2;
        }
    } else {
        result = Number(txtInput.value);
        operand = 2;
    }
    boolNewEntry = true;
    clicked = true;
    clearMem();
    track();
}

function multClick() {
    if (clicked == false) {
        if (waiting === false) {
            operand = 3;
            result = Number(txtInput.value);
            waiting = true;
        } else {
            memory = Number(txtInput.value);
            calculate();
            operand = 3;
        }
    } else {
        result = Number(txtInput.value);
        operand = 3;
    }
    boolNewEntry = true;
    clicked = true;
    clearMem();
    track();
}

function divClick() {
    if (clicked == false) {
        if (waiting === false) {
            operand = 4;
            result = Number(txtInput.value);
            waiting = true;
        } else {
            memory = Number(txtInput.value);
            calculate();
            operand = 4;
        }
    } else {
        result = Number(txtInput.value);
        operand = 4;
    }
    boolNewEntry = true;
    clicked = true;
    clearMem();
    track();

}

function track() {
    txtResult.value = 'Memory: ' + memory + ' Result: ' + result + ' Mode: ' + operand;
}

function clearEntry() {
    txtInput.value = '0';
}

function clear() {
    txtInput.value = '0';
    txtResult.value = '';
    result = 0;
    memory = 0;
    clicked = false;
    waiting = false;
    track();
}

function numberClick() {
    if (boolNewEntry) {
        boolNewEntry = false;
        clicked = false;
        decimal = false;
        clearEntry();
        txtInput.value = txtInput.value == '0' ? this.innerText : txtInput.value + this.innerText;
    } else {
        txtInput.value = txtInput.value == '0' ? this.innerText : txtInput.value + this.innerText;
    }
}

function equalsClick() {
    if (clicked == false || memory == 0) {
        memory = Number(txtInput.value);
        calculate();
        clicked = true;
    } else {
        result = Number(txtInput.value);
        calculate();
    }
    boolNewEntry = true;
    result = 0;
    track();
}

function decimalClick() {
    if (decimal == false)
        txtInput.value = txtInput.value + this.innerText;
    decimal = true;
}

function clearMem() {
    memory = 0;
}

function calculate() {
    switch (operand) {
        case 1:
            result = result + memory;
            txtInput.value = result;
            break;
        case 2:
            result = result - memory;
            txtInput.value = result;
            break;
        case 3:
            result = result * memory;
            txtInput.value = result;
            break;
        case 4:
            result = result / memory;
            txtInput.value = result;
            break;
        default:
            txtResult.value = "ERROR ERROR ERROR";
            break;
    };

}