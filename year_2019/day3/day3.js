import { assertEquals } from "jsr:@std/assert";

const input = Deno.readTextFileSync("./day3Datafile.txt");

const [wire1, wire2] = input.split(/\n/);

const manhattanDistance = ([a, b], [c, d]) => {
  return Math.abs(a - c) + Math.abs(b - d);
};

const separateIns = (data) =>
  data.match(/[UDLR]\d+/g)
    .map((x) => [x[0], parseInt(x.slice(1))]);

const wire1Ins = separateIns(wire1);
const wire2Ins = separateIns(wire2);

const movement = ([ins, dx], [x, y]) => {
  if (ins === "R") {
    return [[x, y], [x + dx, y]];
  }
  if (ins === "L") {
    return [[x, y], [x - dx, y]];
  }
  if (ins === "U") {
    return [[x, y], [x, y + dx]];
  }
  if (ins === "D") {
    return [[x, y], [x, y - dx]];
  }
};

const imgLine = ({ "start": starts, ins, paths }) => {
  const path = movement(ins, starts);
  paths.push(path);
  const start = path[1];
  return { paths, ins, start };
};

const generatePath = (path) =>
  path.reduce((acc, ins) => imgLine({ ...acc, ins }), {
    start: [0, 0],
    paths: [],
  });

const wire1Path = generatePath(wire1Ins)["paths"];

const wire2Path = generatePath(wire2Ins)["paths"];

//console.log(wire1Path);
//console.log(wire2Path);

const isInBetween = (min, max, target) => {
  if (target - min === 0 && target - max === 0) return true;
  return Math.sign(target - min) !== Math.sign(target - max);
};
const checkIntersection = ([a, b], [x, y]) =>
  isInBetween(a, b, x) || isInBetween(x, y, a) || isInBetween(a, b, y) ||
  isInBetween(x, y, b);

const intersectionPoint = ([x, y], [a, b]) => {
  const absica = x[0] === y[0] && y[0] || a[0] === b[0] && b[0];
  const ordinate = x[1] === y[1] && y[1] || a[1] === b[1] && b[1];
  return [absica, ordinate];
};

const checkLineIntersection = ([x, y], [a, b]) => {
  if (
    checkIntersection([x[0], y[0]], [a[0], [b[0]]]) &&
    checkIntersection([x[1], y[1]], [a[1], [b[1]]])
  ) {
    return intersectionPoint([x, y], [a, b]);
  }
};

const allIntesection = (wire1Path, wire2Path) => {
  const intersection = [];
  for (let i = 0; i < wire1Path.length; i++) {
    for (let j = 0; j < wire2Path.length; j++) {
      const intersect = checkLineIntersection(wire1Path[i], wire2Path[j]);
      if (intersect) {
        intersection.push(intersect);
      }
    }
  }
  return intersection.slice(1);
};

const intesectedPoints = allIntesection(wire1Path, wire2Path);

const a = intesectedPoints.reduce((acc, point) => {
  if (acc < manhattanDistance(point, [0, 0])) {
    return acc;
  } else {
    return manhattanDistance(point, [0, 0]);
  }
}, Infinity);

console.log("part 1", a);

const extactPathd = (point, paths) => {
  let totalDistance = 0;
  for (let i = 0; i < paths.length; i++) {
    const [a, b] = paths[i];
    if (
      isInBetween(a[0], b[0], point[0]) &&
      isInBetween(a[1], b[1], point[1])
    ) {
      return totalDistance + manhattanDistance(paths[i][0], point);
    }
    totalDistance += manhattanDistance(paths[i][0], paths[i][1]);
  }
};

const allDistance = (interseted, path1, path2) => {
  const distance = [];
  for (let i = 0; i < interseted.length; i++) {
    distance.push(
      extactPathd(interseted[i], path1) + extactPathd(interseted[i], path2),
    );
  }
  return distance;
};

const sortedDistance = allDistance(intesectedPoints, wire1Path, wire2Path).sort(
  (
    a,
    b,
  ) => a - b,
);
console.log("part 2", sortedDistance[0]);
