const inputs = Deno.readTextFileSync("./datafile.txt");

const everyModuleMass = inputs.match(/\d+/g).map((mass) => parseInt(mass));

const fuelAsPerMass = (mass) => {
  return Math.floor(mass / 3) - 2;
};

const totalFuelRequired = (massList) =>
  massList
    .reduce((acc, mass) => acc + fuelAsPerMass(mass), 0);

console.log(totalFuelRequired(everyModuleMass));
