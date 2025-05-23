#!/usr/bin/env node
import { program, OptionValues } from "commander"
import inquirer from "inquirer"
import create from "./commands/create.js"
import logMessage from "./utils/log-message.js"
import {
  getPluginName,
  getRepoName,
  getExampleName
} from "./utils/creator/index.js"

program
  .description("Scaffold a Medusa plugin and example projects in a ready-to-develop monorepo structure")
  .argument("[plugin-name]", "Plugin name to create")
  .option("-r, --repo <name>", "Root repository (monorepo) name")
  .option("-e, --example <name>", "Example folder name, where the `medusa` and `medusa-storefront` examples will be created")
  .option("--directory-path <path>", "Path to the output directory for the root repository")
  .option("--plugin-repo-url <url>", "URL of repository to setup a Medusa plugin (forwards `repo-url` to `create-medusa-app`)")
  .option("--example-repo-url <url>", "URL of repository to setup an example Medusa backend (forwards `repo-url` to `create-medusa-app`)")
  .option("--no-storefront", "Do not include example storefront (forwards as `--with-nextjs-starter=false` to `create-medusa-app`)")
  .option(
    "--skip-example-db",
    "Skip creating the Medusa example database (forwards `--skip-db` to `create-medusa-app`)",
    false
  )
  .option(
    "--verbose",
    "Show all logs of underlying commands (forwards `--verbose` to `create-medusa-app`)",
    false
  )
  .parse()

const options = program.opts()

async function run() {
  const { plugin, repoName, exampleName } = await getParameters(program.args, options)
  logMessage({
    message: [
      "You have definded the following:",
      `Root repository (monorepo) name: ${repoName}`,
      `Plugin name: ${plugin.fullName}`,
      `Example name: ${exampleName}`
    ].join("\n  "),
    type: "success"
  })
  const { isConfirmed } = await inquirer.prompt([
    {
      type: "confirm",
      name: "isConfirmed",
      message: "Is this correct?",
      default: true
    }
  ])
  if (isConfirmed) {
    create({
      repo: repoName,
      plugin: plugin,
      example: exampleName,
      directoryPath: options.directoryPath,
      withStorefront: options.storefront,
      pluginRepoUrl: options.pluginRepoUrl,
      exampleRepoUrl: options.exampleRepoUrl,
      verbose: options.verbose,
      skipExampleDb: options.skipExampleDb,
    })
  } else {
    logMessage({
      message: "Let's start again!",
      type: "info"
    })
    run()
  }
}

async function getParameters(args: string[], options: OptionValues) {
  const plugin = await getPluginName(
    args[0],
  )
  const repoName = await getRepoName(
    options.repo,
    plugin.name,
    options.directoryPath
  )
  const exampleName = await getExampleName(
    options.example,
    plugin.name
  )
  return {
    plugin,
    repoName,
    exampleName
  }
}

run()