// module.exports = 


function extractOpenBrackets(array) {
  let arrayOfOpenBrackets = [];
  let singleArray = array.flat();

  singleArray.forEach((element, index) => {
    if (index % 2 === 0) {
      arrayOfOpenBrackets.push(element);
    }
  });

  return arrayOfOpenBrackets
}


function createBracketsPair(array) {
  let invertedArray = []

  array.forEach(e => {
    invertedArray.push([e[0], e[1]] = [e[1], e[0]]);
  });

  return Object.fromEntries(invertedArray);
}



module.exports = function check(str, bracketsConfig) {
  const OPEN_BRACKETS = extractOpenBrackets(bracketsConfig),
    BRACKETS_PAIRS = createBracketsPair(bracketsConfig);

  let stack = [];

  for (let i = 0; i < str.length; i++) {
    let currentSymbol = str[i];
    let topElement = stack[stack.length - 1];

    if (OPEN_BRACKETS.includes(currentSymbol) && 
    currentSymbol in BRACKETS_PAIRS && 
    currentSymbol === topElement) {
      stack.pop();

    } else if (OPEN_BRACKETS.includes(currentSymbol)) {
      stack.push(currentSymbol);

    } else {
      if (stack.length === 0) {
        return false;
      }

      if (BRACKETS_PAIRS[currentSymbol] === topElement) {
        stack.pop();

      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}



// console.log(check('((()))()', [['(', ')'], ['[', ']']]));// первая ошибка в тестах 
// console.log(check('[]()', [['(', ')'], ['[', ']']]));// шестая ошибка в тестах