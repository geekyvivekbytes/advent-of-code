import { permutations } from "@std/collections";

const input = Deno.readTextFileSync("./inputFile.txt");

const data = input.split(",").map((x) => parseInt(x));

const sum = (x, y) => x + y;
const mul = (x, y) => x * y;
const isLessThan = (x, y) => x < y ? 1 : 0;
const isequal = (x, y) => x === y ? 1 : 0;

const calculator = {
  1: sum,
  2: mul,
  7: isLessThan,
  8: isequal,
};

const isNonZero = (num, reff, actualIndex) =>
  num !== 0 ? reff : actualIndex + 3;
const isZero = (num, reff, actualIndex) => num === 0 ? reff : actualIndex + 3;

const flagIndex = {
  5: isNonZero,
  6: isZero,
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

const index = (array, code, i, diff) => {
  if (code === 0) {
    return array[i + diff];
  }
  return i + diff;
};

const jumpFn = function ([second, first, opc], i, array) {
  if (opc === 5 || opc === 6) {
    const delta = flagIndex[opc](
      array[index(array, first, i, 1)],
      array[index(array, second, i, 2)],
      i,
    );
    i = delta;
  }
  return i;
};

const calculationPart = function ([second, first, opc], i, array) {
  const value = calculator[opc](
    array[index(array, first, i, 1)],
    array[index(array, second, i, 2)],
  );

  array[array[i + 3]] = value;
  i += 4;
  return i;
};

export const computer = (data, phase, input, ind = 0, pCount = 0) => {
  let count = pCount;
  let toReturn = input;
  const array = [...data];
  let i = ind;

  while (i < array.length && array[i] !== 99) {
    const instruction = parseInstruction(array[i]);

    if ([1, 2, 7, 8].includes(instruction[2])) {
      i = calculationPart(instruction, i, array);
    }
    if (instruction[2] === 3) {
      let userInp = input;
      if (count === 0) {
        userInp = phase;
        count++;
      }
      array[index(array, instruction[1], i, 1)] = userInp;
      i += 2;
    }
    if (instruction[2] === 4) {
      toReturn = array[index(array, instruction[1], i, 1)];
      i += 2;
      return { output: toReturn, data: array, i, count };
    }
    i = jumpFn(instruction, i, array);
  }
  return { output: toReturn, data: array, i, count };
};

// calculation part one

const runOnPhase = (array) => {
  let currentThrust = 0;
  for (let i = 0; i < array.length; i++) {
    currentThrust = computer(data, array[i], currentThrust)["output"];
  }
  return currentThrust;
};

const allPhases = permutations([0, 1, 2, 3, 4]);

const maxThrust = allPhases.reduce(
  (min, x) => runOnPhase(x) > min ? runOnPhase(x) : min,
  0,
);

console.log(maxThrust);
