const input = Deno.readTextFileSync("./dataFile.txt");

const data = input.split(",").map((x) => parseInt(x));

const sum = (x, y) => x + y;
const mul = (x, y) => x * y;

const calculator = {
  1: sum,
  2: mul,
};

const parseInstruction = (input) => {
  const ins = [];
  let num = input;
  for (let i = 0; i < 3; i++) {
    const divisor = ins.length && 10 || 100;
    ins.unshift(num % divisor);
    num = (num - num % divisor) / divisor;
  }
  return ins;
};

const computer = (data) => {
  const array = [...data];
  let i = 0;
  const index = (code, i, diff) => {
    if (code === 0) {
      return array[i + diff];
    }
    return i + diff;
  };

  while (i < array.length && array[i] !== 99) {
    const [second, first, opc] = parseInstruction(array[i]);

    if (opc === 1 || opc === 2) {
      const value = calculator[opc](
        array[index(first, i, 1)],
        array[index(second, i, 2)],
      );

      array[array[i + 3]] = value;
      i += 4;
    } else if (opc === 3) {
      const userInp = +prompt("user input");
      array[index(first, i, 1)] = userInp;
      i += 2;
    } else if (opc === 4) {
      console.log("data", array[index(first, i, 1)]);
      i += 2;
    }
  }
  return array;
};

// console.log(computer([1002, 4, 3, 4, 33]));

const result = computer(data);
console.log(result);
