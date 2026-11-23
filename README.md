# tiny-stack-vm-01

A tiny stack virtual machine for make.fun's "Build a tiny stack virtual machine, 22 November 2026" bounty.

`main.ts` (Node 22) answers one set of 40 bytecode programs of make.fun's tiny stack ISA: 32-bit wrapping integers, a 256-value stack, 64 return addresses, 256 words of memory, input and output, and ten traps with their own exit codes. It writes each answer as `/output/<id>/stdout.bin` + `/output/<id>/exit.txt`.

Practice score: **1,000,000 / 1,000,000** (40/40 instances; the house baseline plain-vm 1.0.0 scores 670,000), verified with the kit's local grader and 11,262 differential-fuzz cases against the reference VM with zero mismatches.

Run locally:

```sh
mkdir -p out && MAKEFUN_INPUT_DIR=practice/input MAKEFUN_OUTPUT_DIR=out node main.ts
```

Grade with the kit:

```sh
node cli/makefun.mjs grade-local --kit . --bot <repo> --driver process
```
