const start = 146810;
const limit = 612564.;
// const a = Array.from({ length: 612564 - 146810 }, () => start + i++);

const splitedNum = (num) => {
  let number = num;
  const array = [];
  for (let i = 0; i < 6; i++) {
    array.unshift(number % 10);
    number = (number - number % 10) / 10;
  }
  return array;
};

const isValidPassword = (num) => {
  const array = splitedNum(num);
  for (let i = 1; i < array.length; i++) {
    if (!(array[i] >= array[i - 1])) {
      return false;
    }
  }
  return array.some((x, i) => (x === array[i + 1]));
};

const isValidPassword2 = (num) => {
  const array = splitedNum(num);
  for (let i = 1; i < array.length; i++) {
    if (!(array[i] >= array[i - 1])) {
      return false;
    }
  }
  return array.some((x, i) =>
    array.lastIndexOf(x) - i === 1 && array.indexOf(x) === i
  );
};

let count = 0;
let count2 = 0;
for (let i = start; i <= limit; i++) {
  if (isValidPassword2(i)) {
    count2++;
  }
}

for (let i = start; i <= limit; i++) {
  if (isValidPassword(i)) {
    count++;
  }
}
console.log("password1", count);
console.log("password12", count2);
