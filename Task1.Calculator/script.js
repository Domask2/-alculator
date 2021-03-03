class Calculator {
	constructor(previousElement, currentElement) {
		this.previousElement = previousElement;
		this.currentElement  = currentElement;
		this.clear();
		this.sqrt();
	}

	clear() {
		this.currentNumber = '';
		this.previousNumber = '';
		this.operation = undefined;
		this.sq = '';
	}

	delete() {
		this.currentNumber = this.currentNumber.toString().slice(0,-1);
	}
 
	appendNumber(number) {
		this.number=number;
		if(number === '.' && this.currentNumber.toString().includes(number)) return;
		if(number === '.' && this.currentNumber === '') this.currentNumber = 0; 
		if(this.sq === '√') {
			this.currentNumber = '';
			this.previousNumber = '';
			this.sq = '';
	}
		this.currentNumber = this.currentNumber.toString() + number.toString(); 
	}

	chooseOperation(operation) {
		if(this.currentNumber === '') return;
		if(this.previousNumber != '') this.compute();

		this.operation = operation;
		this.previousNumber = this.currentNumber;
		this.currentNumber = '';
	}

	plus () {
		if(this.currentNumber === '') return;

		if(this.currentNumber>0) {
				this.currentNumber = this.currentNumber*-1;
		} else {
				this.currentNumber = this.currentNumber*-1;
		}
	}

	sqrt(sq) {
		if(this.currentNumber === '') return;
		this.sq = sq;
		let resultSqrt='';
		let prev = parseFloat(this.currentNumber);
		if(prev<0) {
			resultSqrt = 'error'
		} else resultSqrt = Math.sqrt(prev);

		let resultNum = resultSqrt.toString().split('.')[1]
		if( resultNum > 12 ) {
			resultSqrt = resultSqrt.toFixed(12);
		}

		this.previousNumber = this.currentNumber;
		this.currentNumber = resultSqrt;

	}

	compute() {
		this.sq='';
		let result;
		let numFix;
		let current = parseFloat(this.currentNumber);
		let prev	= parseFloat(this.previousNumber);
		if(isNaN(current) && isNaN(prev)) return;

		switch (this.operation) {
			case "+" :
				if (!Number.isInteger(prev) && !Number.isInteger(current)) {
					numFix = Math.max(this.previousNumber.toString().split('.')[1].length, this.currentNumber.toString().split('.')[1].length) + 1;git 
					result = +(prev + current).toFixed(numFix);
					break;
				  }
				  result = prev + current;
				  break;
			break;
			case '-':
				if (!Number.isInteger(current) && !Number.isInteger(prev)) {
					numFix = Math.max(this.previousNumber.toString().split('.')[1].length, this.currentNumber.toString().split('.')[1].length) + 1;
				  	result = +(prev - current).toFixed(numFix + 1);
				  	break;
				}
				result = parseFloat(prev - current);
				break;
			case '*':
				if (!Number.isInteger(current) && !Number.isInteger(prev)) {
					numFix = (this.previousNumber.toString().split('.')[1].length + this.currentNumber.toString().split('.')[1].length) * 2;
					result = +(current * prev).toFixed(numFix);
					break;
				}
				
				if (!Number.isInteger(current) || !Number.isInteger(prev)) {
					const noInteger = !Number.isInteger(current) ? current : prev;
					numFix = noInteger.toString().split('.')[1].length;
					result = +(current * prev).toFixed(numFix);
					break;
				}
				result = parseFloat(prev * current);
				break;
			case '/':
				if(current === 0) {
					result = 'error';
					break;
				} 
				result = prev / current;

				if (!Number.isInteger(result)) {
					let resultNum = result.toString().split('.')[1];
					if (resultNum.length > 12) {
					  result = result.toFixed(12);
					  break;
					}
				  }
				  break;
			case 'xn':
				if (prev !== 0 && result === 0) {
					result = 'error';
					}
				if (current < 0) {
					result = 1 / (prev ** -current);
					} else {
					result = prev ** current;
					}
				break
			default:
					return
		}
			
			this.currentNumber = result;
			this.previousNumber = '';
			this.operation = undefined;
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if(number=='error') return 'error';
		if (isNaN(integerDigits)) {
		  integerDisplay = '';
		} else {
		  integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
		}

		if (decimalDigits != null) {
		  return `${integerDisplay}.${decimalDigits}`;
		} else {
		  return integerDisplay;
		}
	  }

	updateDisplay() {
		this.currentElement.innerHTML = this.getDisplayNumber(this.currentNumber);

		if(this.operation != null) this.previousElement.innerHTML = `${this.getDisplayNumber(this.previousNumber)} ${this.operation}`;
		else this.previousElement.innerHTML = '';
		
		if(this.sq === '√') this.previousElement.innerHTML = `${this.sq}${this.getDisplayNumber(this.previousNumber)}`;

		if(this.currentNumber === 'error') this.clear();

	}
} 

const numberButtons    = document.querySelectorAll('[data-number]'),
 		  operationButtons = document.querySelectorAll('[data-operation]'),
 		  equalsButton     = document.querySelector('[data-equals]'),
 		  deleteButton     = document.querySelector('[data-delete]'),
 		  clearButton      = document.querySelector('[data-all-clear]'),
 		  sqrtButton       = document.querySelector('[data-sqrt]'),
 		  minusButton      = document.querySelector('[data-minus]'),
 		  previousElement  = document.querySelector('[data-previous-operand]'),
 		  currentElement   = document.querySelector('[data-current-operand]'),
		  plusMinusButton  = document.querySelector('[data-plus-minus]'); 
			 
const calculator = new Calculator(previousElement,currentElement);

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

clearButton.addEventListener('click', () => {
		calculator.clear();
		calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
	calculator.compute();
	calculator.updateDisplay();
	calculator.clear();
});

plusMinusButton.addEventListener('click', button => {
	calculator.plus();
	calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
		calculator.delete();
		calculator.updateDisplay();
});

sqrtButton.addEventListener('click', (e) => {
	calculator.sqrt(e.target.innerText);
	calculator.updateDisplay();
});