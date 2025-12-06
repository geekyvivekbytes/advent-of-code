const input = Deno.readTextFileSync("./dataFile.txt");
const data = input.split(/\n/).map((x) => x.split(/\)/));
//console.log(data);

const sampleData = [
  ["COM", "B"],
  ["B", "C"],
  ["C", "D"],
  ["D", "E"],
  ["E", "F"],
  ["B", "G"],
  ["G", "H"],
  ["D", "I"],
  ["E", "J"],
  ["J", "K"],
  ["K", "L"],
];

const path = {};
for (let i = 0; i < data.length; i++) {
  const orbit = data[i];
  if (!(orbit[1] in path)) {
    path[orbit[1]] = [];
  }
  path[orbit[1]].push(orbit[0]);
}

// const countOrbit = (planet) => {
//   if (planet === "COM") {
//     return 0;
//   }
//   return 1 + countOrbit(path[planet][0]);
// };

// const all = Object.keys(path);
// let count = 0;
// for (let i = 0; i < all.length; i++) {
//   count += countOrbit(all[i]);
// }
const makePath = (planet) => {
  const pathOf = [];
  const pathOfPlanet = (planet) => {
    if (planet === "COM") {
      return "COM";
    }
    pathOf.unshift(planet);
    pathOfPlanet(path[planet][0]);
    return ["COM", ...pathOf];
  };
  return pathOfPlanet(planet);
};

const pathOfYou = makePath("YOU");
const pathOfSan = makePath("SAN");

const indexOfLastMatch = pathOfYou
  .reduce((index, x, i) => i === pathOfSan.indexOf(x) ? i : index, 0) + 1;

console.log(
  pathOfSan.slice(indexOfLastMatch).length +
    pathOfYou.slice(indexOfLastMatch).length - 2,
);
