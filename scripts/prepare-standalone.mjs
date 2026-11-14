import { cpSync } from "node:fs";
import { resolve } from "node:path";

const standalonePath = resolve(".next", "standalone");

cpSync(resolve("public"), resolve(standalonePath, "public"), {
  force: true,
  recursive: true,
});
cpSync(resolve(".next", "static"), resolve(standalonePath, ".next", "static"), {
  force: true,
  recursive: true,
});
