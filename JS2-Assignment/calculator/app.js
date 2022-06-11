const btnsClear = document.querySelectorAll(".clear, .clearEntry");
const btnDelete = document.querySelector(".delete");
const btnSignChange = document.querySelector(".signChange");
const btnNums = document.querySelectorAll(".number");
const btnsOperator = document.querySelectorAll(".operator");
const btnEqual = document.querySelector(".equals");
const display = document.querySelector(".display");
const currentValueEl = document.querySelector(".currentvalue");
const previousValueEl = document.querySelector(".previousvalue");

const main = () => {
  currentValueEl;
  previousValueEl;
  let itemArray = [];
  const equationArray = [];
  let newNumberFlag = false;

  btnNums.forEach((button) => {
    button.addEventListener("click", (e) => {
      const newInput = e.target.textContent;
      if (newNumberFlag) {
        currentValueEl.value = newInput;
        newNumberFlag = false;
      } else {
        currentValueEl.value =
          currentValueEl.value == 0
            ? newInput
            : `${currentValueEl.value}${newInput}`;
      }
    });
  });

  btnsOperator.forEach((button) => {
    button.addEventListener("click", (e) => {
      //equal sign showing
      if (newNumberFlag) {
        previousValueEl.textContent = "";
        itemArray = [];
      }
      const newOperator = e.target.textContent;
      const currentVal = currentValueEl.value;
      //need number first
      if (!itemArray.length && currentVal == 0) return;

      //begin new equation
      if (!itemArray.length) {
        itemArray.push(currentVal, newOperator);
        previousValueEl.textContent = `${currentVal}${newOperator}`;
        return (newNumberFlag = true);
      }
      // complete equation
      if (itemArray.length) {
        itemArray.push(currentVal); //3rd element
        const equationObj = {
          num1: parseFloat(itemArray[0]),
          num2: parseFloat(currentVal),
          op: itemArray[1],
        };
        equationArray.push(equationObj);
        const equationString = `${equationObj["num1"]}
         ${equationObj["op"]} ${equationObj["num2"]}`;

        const newVaule = calculate(equationString, currentValueEl);
        previousValueEl.textContent = `${newVaule} ${newOperator}`;

        //start new equation
        itemArray = [newVaule, newOperator];
        newNumberFlag = true;
        console.log(equationArray);
      }
    });
  });

  btnEqual.addEventListener("click", () => {
    const currentVal = currentValueEl.value;
    let equationObj;
    if (!itemArray.length) {
      return currentVal;
    } else {
      itemArray.push(currentVal);
      equationObj = {
        num1: parseFloat(itemArray[0]),
        num2: parseFloat(currentVal),
        op: itemArray[1],
      };
    }

    equationArray.push(equationObj);
    const equationString = `${equationObj["num1"]} ${equationObj["op"]} ${equationObj["num2"]}`;
    calculate(equationString, currentValueEl);
    previousValueEl.textContent = `${equationString} =`;

    newNumberFlag = true;
    itemArray = [];
    console.log(equationArray);
  });

  btnsClear.forEach((button) => {
    button.addEventListener("click", (e) => {
      currentValueEl.value = 0;
      if (e.target.classList.contains("clear")) {
        previousValueEl.textContent = "";
        itemArray = [];
      }
    });
  });

  btnDelete.addEventListener("click", () => {
    currentValueEl.value = currentValueEl.value.slice(0, -1);
  });
  btnSignChange.addEventListener("click", () => {
    currentValueEl.value = parseFloat(currentValueEl.value) * -1;
  });
};

main();

const calculate = (equation, currentValueEl) => {
  const regex = /(^[*/=])|(\s)/g;
  equation.replace(regex, "");
  const divByZero = /(\/0)/.test(equation); //divided by zero
  if (divByZero) return (currentValueEl.value = 0);
  return (currentValueEl.value = eval(equation));
};
