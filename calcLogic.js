/* Caveats when creating calculator
1. RE(Reassign) button does not carry full percision when ans is float
2. Calc does not follow order of operations, and instead calculates from left to right
*/
// Conversion of String to Number type happens within operator functions


let input = ""
let ans = null
const operators = "+-/*"
const operatorsArray = [...operators]
const dispExpression = document.querySelector(".expression")
const numBtns = document.querySelectorAll(".numInput")
const operatorBtns = document.querySelectorAll(".operatorInput")
const delBtn = document.querySelector(".del")
const ansBtn = document.querySelector(".answer")
const dispAns = document.querySelector(".dispAns")
const reassignBtn = document.querySelector(".reassign")
const maxExpressionLength = 20


function add(num1, num2) {
    return String(+num1 + +num2)
}
function subtract(num1, num2) {
    return String(+num1 - +num2)
}
function multiply(num1, num2) {
    return String(+num1 * +num2)
}
function divide(num1, num2) {
    if (Number(num2) === 0) {
        return "Error"
    }
    return String(+num1 / +num2)
}
function operate(num1, num2, operator) {
    if (operator === "+") return add(num1, num2)
    else if (operator === "-") return subtract(num1, num2)
    else if (operator === "*") return multiply(num1, num2)
    else if (operator === "/") return divide(num1, num2)
}

// Fn takes in a str and returns the number of operators in the str

function hasOperator(arrayEl) {
    let operatorCount = 0
    operatorsArray.forEach((operator) => {
        // Can only have 1 operator in each el in operatorArray
        if (arrayEl === operator) operatorCount++
    })
    return operatorCount
}

function hasDecimal(arrayEl) {
    let decimalCount = 0
    let individualNumsArray = arrayEl.split("")
    individualNumsArray.forEach((el) => {
        if (el === ".") decimalCount++
    });
    return decimalCount
}

//Checks if operator is present in only odd indexes
function operatorCheck(expArr) {
    let numArr = []
    let operatorArr = []
    expArr.forEach((value, index) => {
        if (index % 2 === 0) numArr.push(value)
        else operatorArr.push(value)
    })
    return (numArr.every((value) => hasOperator(value) === 0 && hasDecimal(value) <= 1)
        && operatorArr.every((value) => hasOperator(value) === 1))
}

function handleInput() {
    numBtns.forEach((numBtn) => {
        numBtn.addEventListener("click", () => {
            if (input.length <= (maxExpressionLength - 1)) {
                input += numBtn.textContent
                dispExpression.textContent = input
            }
        })
    })

    operatorBtns.forEach((operatorBtn) => {
        operatorBtn.addEventListener("click", () => {
            if (input.length <= (maxExpressionLength - 1)) {
                input += (" " + operatorBtn.textContent + " ")
                dispExpression.textContent = input
            }
        })
    })
}

function handleReassign() {
    reassignBtn.addEventListener("click", () => {
        if (ans === null) input = ""
        else if (!Number.isInteger(Number(ans))) input = String(Number(ans).toFixed(5))   
        else input = ans 
        ans = null
        dispExpression.textContent = input
        dispAns.textContent = ans
    })
}

function handleDel() {
    delBtn.addEventListener("click", () => {
        let inputArr = [...input]
        const inputArrLength = inputArr.length
        if (inputArr[inputArrLength - 1] === " ") {
            for (let i = 0; i < 3; i++) {
                inputArr.pop()
            }
        }
        else inputArr.pop()
        input = inputArr.join("")
        dispExpression.textContent = input
        ans = null
        dispAns.textContent = ans
    })

    delBtn.addEventListener("dblclick", () => {
        input = "", ans = null
        dispExpression.textContent = input
        dispAns.textContent = ans
    })
}

function handleEval() {
    ansBtn.addEventListener("click", () => {
        let num1, num2, operator
        // trim() to remove trailing whitespace, such that it is not a value in the array
        let inputArr = input.trim().split(" ")
        const inputArrLength = inputArr.length
        if (inputArrLength < 3 || inputArrLength % 2 === 0 || !operatorCheck(inputArr)) ans = "Error"
        else {
            // i + 2 ==> max index being assigned, inputArrLength -1 ===> length to max index
            for (let i = 0; i + 2 <= inputArrLength - 1; i += 2) {
                num1 = inputArr[i], operator = inputArr[i + 1], num2 = inputArr[i + 2]
                if (i !== 0) num1 = ans
                ans = operate(num1, num2, operator)
            }
        }
        if (ans !== "Error" && ans.length > 10 && !Number.isInteger(Number(ans))) dispAns.textContent = String(Number(ans).toFixed(9))
        else dispAns.textContent = ans
    })
}

handleInput()
handleDel()
handleEval()
handleReassign()
