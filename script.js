class Calculator {
    constructor() {
        this.previousOperandElement = document.querySelector('.previous-operand');
        this.currentOperandElement = document.querySelector('.current-operand');
        this.memory = 0;
        this.clear();
        this.setupEventListeners();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    setupEventListeners() {
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('number')) {
                    this.appendNumber(button.innerText);
                } else if (button.classList.contains('operator')) {
                    this.chooseOperation(button.innerText);
                } else if (button.classList.contains('equals')) {
                    this.calculate();
                } else if (button.classList.contains('function')) {
                    this.handleFunction(button.dataset.action);
                } else if (button.classList.contains('constant')) {
                    this.appendNumber(button.dataset.value);
                }
                this.updateDisplay();
            });
        });
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    calculate() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    handleFunction(action) {
        let number = parseFloat(this.currentOperand);
        
        switch(action) {
            case 'clear':
                this.clear();
                break;
            case 'backspace':
                this.currentOperand = this.currentOperand.slice(0, -1) || '0';
                break;
            case 'memory-clear':
                this.memory = 0;
                break;
            case 'memory-recall':
                this.currentOperand = this.memory.toString();
                break;
            case 'memory-add':
                this.memory += parseFloat(this.currentOperand);
                break;
            case 'sin':
                this.currentOperand = Math.sin(number * Math.PI / 180).toString();
                break;
            case 'cos':
                this.currentOperand = Math.cos(number * Math.PI / 180).toString();
                break;
            case 'tan':
                this.currentOperand = Math.tan(number * Math.PI / 180).toString();
                break;
            case 'sqrt':
                this.currentOperand = Math.sqrt(number).toString();
                break;
            case 'log':
                this.currentOperand = Math.log10(number).toString();
                break;
            case 'ln':
                this.currentOperand = Math.log(number).toString();
                break;
            case 'factorial':
                this.currentOperand = this.factorial(number).toString();
                break;
            case 'inverse':
                this.currentOperand = (1 / number).toString();
                break;
            case 'percent':
                this.currentOperand = (number / 100).toString();
                break;
            case 'plusMinus':
                this.currentOperand = (-number).toString();
                break;
        }
    }

    factorial(n) {
        if (n < 0) return NaN;
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.formatNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.formatNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }

    formatNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('ru', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
}

// Инициализация калькулятора
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
}); 