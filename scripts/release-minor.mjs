import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import semver from "semver";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoDir = path.resolve(scriptDir, "..");
const packageJsonPath = path.join(repoDir, "package.json");
const dryRun = process.argv.includes("--dry-run");

function capture(command, args) {
  return execFileSync(command, args, {
    cwd: repoDir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function run(command, args) {
  execFileSync(command, args, {
    cwd: repoDir,
    stdio: "inherit",
  });
}

function readPackageVersion() {
  const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  return pkg.version;
}

function tagExists(tag) {
  try {
    capture("git", ["rev-parse", "--verify", `refs/tags/${tag}`]);
    return true;
  } catch {
    return false;
  }
}

function remoteTagExists(tag) {
  try {
    capture("git", ["ls-remote", "--exit-code", "--tags", "origin", `refs/tags/${tag}`]);
    return true;
  } catch {
    return false;
  }
}

const currentVersion = readPackageVersion();
const nextVersion = semver.inc(currentVersion, "minor");

if (!nextVersion) {
  throw new Error(`Unsupported package version: ${currentVersion}`);
}

const nextTag = `v${nextVersion}`;

if (tagExists(nextTag) || remoteTagExists(nextTag)) {
  throw new Error(`Tag already exists: ${nextTag}`);
}

if (dryRun) {
  console.log(`Current version: ${currentVersion}`);
  console.log(`Next version: ${nextVersion}`);
  console.log(`Next tag: ${nextTag}`);
  process.exit(0);
}

const branch = capture("git", ["branch", "--show-current"]);
if (branch !== "main") {
  throw new Error(`release:minor must be run from main. Current branch: ${branch}`);
}

const status = capture("git", ["status", "--porcelain"]);
if (status) {
  throw new Error("release:minor requires a clean working tree.");
}

run("npm", ["version", nextVersion, "--no-git-tag-version"]);

const updatedVersion = readPackageVersion();
if (updatedVersion !== nextVersion) {
  throw new Error(`Expected version ${nextVersion}, got ${updatedVersion}`);
}

run("git", ["add", "package.json"]);
run("git", ["commit", "-m", `chore: release ${nextTag}`]);
run("git", ["tag", "-a", nextTag, "-m", `Release ${nextTag}`]);
run("git", ["push", "origin", "main"]);
run("git", ["push", "origin", nextTag]);

console.log(`Released ${nextTag}`);
