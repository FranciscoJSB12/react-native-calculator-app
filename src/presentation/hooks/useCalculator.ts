import { useState, useRef, useEffect } from 'react';

enum Operator {
    add = '+',
    subtract = '-',
    multiply = 'X',
    divide = '/',
}

export const useCalculator = () => {
    const [formula, setFormula] = useState('');
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');
    const lastOperation = useRef<Operator>();

    useEffect(() => {
        if(lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }
    }, [number]);

    const buildNumber = (numberString: string):void => {
        if (numberString === '.' && number.includes(numberString)) return;

        if (number.startsWith('0') || number.startsWith('-0')) {
            if (numberString === '.') {
                return setNumber(number + numberString);
            }

            if (numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }
    
            if (numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString);
            }
    
            if (numberString === '0' && !number.includes('.')) {
                return;
            }

            return setNumber(number + numberString);
        }
        
        setNumber(number + numberString);
    }

    const clearNumber = ():void => {
        setNumber('0');
        setPrevNumber('0');
        lastOperation.current = undefined;
        setFormula('');
    }

    const deleteNumber = ():void => {
        
        setNumber((num) => {
            const isOneNumberLeft = num.length === 1 || (num.includes('-') && num.length === 2);

            return !isOneNumberLeft ? num.slice(0, num.length - 1) : '0';
        });
    }

    const toggleSign = ():void => {
        if (number.includes('-')) {
            setNumber(num => num.replace('-', ''))
        }

        return setNumber(num => '-' + num);
    }

    const setLastNumber = ():void => {
        if(number.endsWith('.')) {
            setPrevNumber(num => num.slice(0, -1));
        } else {
            setPrevNumber(number);
        }

        setNumber('0');
    }

    const divideOperation = ():void => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }

    const multiplyOperation = ():void => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }

    const addOperation = ():void => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const subtractOperation = ():void => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    }

    const calculateResult = ():void => {
        const result = calculateSubResult();
        setFormula(`${result}`);

        lastOperation.current = undefined;
        setPrevNumber('0');
    }

    const calculateSubResult = (): number => {
        const [firstValue, operation, secondValue] = formula.split(' ');

        const num1 = Number(firstValue)
        const num2 = Number(secondValue);

        if (isNaN(num2)) return num1;

        switch(operation) {
            case Operator.add: 
                return num1 + num2;
            case Operator.subtract: 
                return num1 - num2;
            case Operator.multiply: 
                return num1 * num2;
            case Operator.divide: 
                return num1 / num2;
            default: 
                throw new Error('Operation not implemented');
        }
    }

    return {
        number,
        prevNumber,
        formula,
        buildNumber,
        clearNumber,
        deleteNumber,
        toggleSign,
        divideOperation,
        multiplyOperation,
        addOperation,
        subtractOperation,
        calculateResult
    };
}

