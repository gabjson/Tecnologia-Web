const numCalc = document.querySelectorAll('.numero');
const simbCalc = document.querySelectorAll('.operacao');
const equalCalc = document.querySelector('.resultar');
let TelaCalc = document.getElementById('resultado');
let TelaUse = false
let dot = true;
let symbol = false;
let saveSymbol;


window.addEventListener('load', () => {
    start();
})

function start() {
    numCalc.forEach((numCalc) => {
        numCalc.addEventListener('click', parceType);
    });
    simbCalc.forEach((simbCalc) => {
        simbCalc.addEventListener('click', impSimb);
    });
    equalCalc.addEventListener('click', equal);
}

function parceType() {
    if(event.target.textContent !== '.') {
        impNum(event.target.textContent);
    } else {
        impDot(event.target.textContent);
    }
}

function impNum(simb) {
    if (TelaCalc.value.length == 0) {
        dot = true;
    }
    if(TelaCalc.value == 0) {
        TelaCalc.value = simb;
    } else {
        TelaCalc.value += simb;
    }
    if (!TelaUse) {
        TelaUse = true;
        symbol = true;
    };
}

function impDot(simb) {
    if(dot || TelaCalc.value.length == 0) {
        TelaCalc.value += simb;
        dot = false;
    }
}

function impSimb() {
    if(TelaCalc.value.length != 0 && !(TelaCalc.value.includes('+') ||
    TelaCalc.value.includes('-') || 
    TelaCalc.value.includes('*') || 
    TelaCalc.value.includes('/'))) {
        TelaCalc.value += event.target.textContent;
        saveSymbol = event.target.textContent;
        dot = true;
        symbol = false;
    }
}

function equal() {
    if(TelaCalc.value.length == 0 || symbol ||!(TelaCalc.value.includes('+') ||
    !TelaCalc.value.includes('-') || 
    !TelaCalc.value.includes('*') || 
    !TelaCalc.value.includes('/'))) {
        TelaCalc.value = TelaCalc.value;
    } else {
        let lastVal;
        let contValue = TelaCalc.value.split(saveSymbol);
        let valOne = parseFloat(contValue[0]);
        let valTwo = parseFloat(contValue[1]);
        if(saveSymbol == '+') {
            lastVal = valOne + valTwo;
        } else if(saveSymbol == '-') {
            lastVal = valOne - valTwo;
        } else if(saveSymbol == '*') {
            lastVal = valOne * valTwo;
        } else {
            if(valTwo == 0) {
                lastVal = 'Erro de operação';
            } else {
                lastVal = valOne / valTwo;
            }
        }
        if(isNaN(lastVal)) {
            TelaCalc.value = 'Erro de operação';
        } else {
            TelaCalc.value = lastVal;
        }
    }
    dot = true;
    symbol = false;
    TelaUse = false;
}
