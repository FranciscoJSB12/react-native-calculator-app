import { useState, useRef } from 'react';

enum Operator {
    add = '+',
    subtract = '-',
    multiply = '*',
    divide = '/',
}

export const useCalculator = () => {
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');
    const lastOperation = useRef<Operator>();

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
        const num1 = Number(number)
        const num2 = Number(prevNumber);

        switch(lastOperation.current) {
            case Operator.add: 
                setNumber(`${num1 + num2}`);
                break;
            case Operator.subtract: 
                setNumber(`${num2 - num1}`);
                break;
            case Operator.multiply: 
                setNumber(`${num1 * num2}`);
                break;
            case Operator.divide: 
                setNumber(`${num2 / num1}`);
                break;
            default: 
                throw new Error('Operation not implemented');
        }

        setPrevNumber('0');
    }

    return {
        number,
        prevNumber,
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

