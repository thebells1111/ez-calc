function calculator(input, totalArr, total, clearSet){
  if(!totalArr) {
    totalArr=[]
  };

  if(!total) {
    total=0
  };

  const lastIsNumber =
    totalArr[totalArr.length - 1] && !isNaN(totalArr[totalArr.length - 1]);

  if (!isNaN(input)){
      handleNumber(input)
  } else if(input === '+' || input === '-' || input === 'x' ||
            input === '*' || input === '/'){
    handleOperand(input)
  } else if(input === '=')  {
    handleEqual(input)
  } else if(input === '.') {
    handleDecimal(input)
  } else if(input === '+/-' || input === 'neg') {
    handleNegative(input)
  } else if(input === 'ac') {
    handleAC(input)
  } else if(input === 'c' || input === 'clear') {
    handleClear(input)
  }


  if (total > Number.MAX_VALUE || total < -Number.MAX_VALUE) {
    total = "err";
    totalArr = [];
  }

  return [totalArr, total, clearSet]


  function handleNumber(input) {
    clearSet = false;
    if (lastIsNumber) {
      if (
        totalArr[totalArr.length - 1].indexOf(".") === -1 &&
        totalArr[totalArr.length - 1] === "0"
      ) {
        totalArr[totalArr.length - 1] = input;
      } else {
        totalArr[totalArr.length - 1] =
          totalArr[totalArr.length - 1] + input;
      }
    } else {
      if (totalArr[totalArr.length - 1] === "=") {
        handleAC();
      }
      totalArr.push(input);
    }

    if (totalArr.length === 1) {
      total = parseFloat(totalArr[0]);
    }
  }

  function handleOperand(input) {
    if (totalArr.length && total !== "err") {
      if (isNaN(totalArr[totalArr.length - 1])) {
        if (totalArr[totalArr.length - 1] === "=") {
          totalArr = [total, input];
        } else {
          totalArr[totalArr.length - 1] = input;
        }
      } else {
        totalArr.push(input);
        doTheMath(input);
      }
    } else if (total === "err") {
      total = 0;
      totalArr = ["0", input];
    } else {
      totalArr.push(total);
      totalArr.push(input);
    }
  }

  function handleEqual() {
    if (totalArr.length > 2) {
      if (totalArr[totalArr.length - 1] !== "=") {
        if (lastIsNumber) {
          totalArr.push("=");
        } else {
          totalArr[totalArr.length - 1] = "=";
        }
      } else {
        //covers 2 =
        totalArr = [
          total,
          totalArr[totalArr.length - 3],
          totalArr[totalArr.length - 2],
          "="
        ];
      }
      doTheMath();
    }
  }

  function handleDecimal() {
    let last = totalArr[totalArr.length - 1];
    if (isNaN(last)) {
      if (last === "=") {
        handleAC();
      }
      totalArr.push("0.");
      if (total === "err") {
        total = "0.";
      }
      totalArr = totalArr;
    } else if (last.indexOf(".") === -1) {
      totalArr[totalArr.length - 1] = totalArr[totalArr.length - 1] + ".";
    }
  }

  function handleAC() {
    totalArr = [];
    total = 0;
  }

  function handleNegative() {
    if (lastIsNumber) {
      totalArr[totalArr.length - 1] = 0 - totalArr[totalArr.length - 1];
      if (totalArr.length === 1) {
        total = totalArr[totalArr.length - 1];
      }
    } else if (totalArr[totalArr.length - 1] === "=") {
      total = 0 - total;
      totalArr = [total];
    }
  }

  function handleClear() {
    if (totalArr[totalArr.length - 1] === "=" || total === "err") {
      clearSet = true;
    }
    if (clearSet) {
      clearSet = false;
      totalArr = [];
      total = 0;
    } else {
      clearSet = true;
      if (lastIsNumber) {
        totalArr.pop();
      }
    }
  }


  function doTheMath(o) {
    const operations = {
      "+": function(x, y) {
        return (x + y).toPrecision(9) / 1;
      },
      "-": function(x, y) {
        return (x - y).toPrecision(9) / 1;
      },
      "x": function(x, y) {
        return (x * y).toPrecision(9) / 1;
      },
      "*": function(x, y) {
        return (x * y).toPrecision(9) / 1;
      },
      "/": function(x, y) {
        return (x / y).toPrecision(9) / 1;
      }
    };
    if (totalArr[totalArr.length - 3] === "=") {
      totalArr = [total, o];
    }

    let l = totalArr.length;
    let prevOperand = totalArr[l - 3];
    if (l === 4) {
      total = operations[prevOperand](Number(totalArr[0]), Number(totalArr[2]));
    } else if (l > 5 && l % 2 === 0) {
      total = operations[prevOperand](Number(total), Number(totalArr[l - 2]));
    }
  }
}

 exports.calc = calculator