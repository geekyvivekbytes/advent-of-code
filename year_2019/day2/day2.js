const inputs = Deno.readTextFileSync("./datafileDay2.txt");
const data = inputs.match(/\d+/g).map((input) => parseInt(input));

const sum = (x, y) => x + y;
const mul = (x, y) => x * y;

const cal = {
  1: sum,
  2: mul,
};

const computer = (data, noun = 12, verb = 2) => {
  const array = [...data];
  array[1] = noun;
  array[2] = verb;
  let i = 0;
  while (i < array.length && array[i] !== 99) {
    if (array[i] === 1 || array[i] === 2) {
      const val = cal[array[i++]](array[array[i++]], array[array[i++]]);
      array[array[i++]] = val;
    }
  }
  return array;
};

const part2 = (data) => {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      if (computer(data, i, j)[0] === 19690720) {
        return i * 100 + j;
      }
    }
  }
};

console.log(computer(data));
console.log(part2(data));
