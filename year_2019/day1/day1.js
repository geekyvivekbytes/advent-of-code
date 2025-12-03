const inputs = Deno.readTextFileSync("./datafile.txt");

const everyModuleMass = inputs.match(/\d+/g).map((mass) => parseInt(mass));

const fuelAsPerMass = (mass) => {
  return Math.floor(mass / 3) - 2;
};

const totalFuelRequired = (massList) =>
  massList
    .reduce((acc, mass) => acc + fuelAsPerMass(mass), 0);

const part2 = (mass) => {
  if (mass < 9) {
    return 0;
  }
  const fuel = fuelAsPerMass(mass);
  return fuel + part2(fuel);
};

const totalFuelForPartTwo = (massList) =>
  massList.reduce((acc, mass) => acc + part2(mass), 0);

console.log("part one", totalFuelRequired(everyModuleMass));
console.log("part one one", part2(100756));
console.log("part two", totalFuelForPartTwo(everyModuleMass));
