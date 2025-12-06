import { permutations } from "@std/collections";
import { computer } from "./day7.js";

const input = Deno.readTextFileSync("./inputFile.txt");

const inputs = input.split(",").map((x) => parseInt(x));
const phase = [5, 6, 7, 8, 9];
const allPossiblePhase = permutations(phase);

const amplifier = ([memoryA, memoryB], phase) => {
  const computedOutput = computer(
    memoryA.data,
    phase,
    memoryA.input,
    memoryA.i,
    memoryA.phaseCount,
  );
  memoryA.data = computedOutput.data,
    memoryA.i = computedOutput.i,
    memoryA.phaseCount = computedOutput.count,
    memoryB.input = computedOutput.output;
  return computedOutput;
};

const isAllEquals = (a, b, c, d, e) => a === b && b === c && c === d && d === e;

const runOnPhase = (phase) => {
  const memory1 = { i: 0, data: [...inputs], input: 0, phaseCount: 0 };
  const memory2 = { i: 0, data: [...inputs], input: 0, phaseCount: 0 };
  const memory3 = { i: 0, data: [...inputs], input: 0, phaseCount: 0 };
  const memory4 = { i: 0, data: [...inputs], input: 0, phaseCount: 0 };
  const memory5 = { i: 0, data: [...inputs], input: 0, phaseCount: 0 };

  let flag = true;
  const pairs = [
    [memory1, memory2],
    [memory2, memory3],
    [memory3, memory4],
    [memory4, memory5],
    [memory5, memory1],
  ];

  while (flag) {
    for (let j = 0; j < phase.length; j++) {
      amplifier(pairs[j], phase[j]);
    }
    flag = !(isAllEquals(
      memory1.input,
      memory2.input,
      memory3.input,
      memory4.input,
      memory5.input,
    ));
  }

  return memory1.input;
};

const maxThrust = allPossiblePhase.reduce(
  (min, x) => runOnPhase(x) > min ? runOnPhase(x) : min,
  0,
);

console.log("result", maxThrust);
