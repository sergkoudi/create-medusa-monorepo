#!/usr/bin/env node
import { program } from "commander"
import create from "./commands/create.js"
import logMessage from "./utils/log-message.js"
import {
  getScopeName,
  getPluginName,
  getMonorepoName,
  getExampleName
} from "./utils/creator/index.js"

program
  .description("Create a Medusa monorepo structure with a plugin and an example projects.")
  .argument("[monorepo-name]", "Name of the monorepo to create.")
  .option("-s, --scope <name>", "Plugin scope name")
  .option("-p, --plugin <name>", "Plugin name")
  .option("-e, --example <name>", "Example project name")
  .option("--directory-path <path>", "Specify the directory path to install the monorepo in.")
  .option("--no-storefront", "Do not create example storefront")
  .option("--plugin-repo-url <url>", "URL of repository to use to setup plugin.")
  .option("--example-repo-url <url>", "URL of repository to use to setup example.")
  .option(
    "--verbose",
    "Show all logs of underlying commands. Useful for debugging.",
    false
  )
  .option(
    "--skip-example-db",
    "Skips creating the database for the example.",
    false
  )
  .parse()

const options = program.opts()

async function run() {
  const scopeName = await getScopeName(
    options.plugin,
  )
  const pluginName = await getPluginName(
    options.plugin,
  )
  const monorepoName = await getMonorepoName(
    program.args,
    pluginName,
    options.directoryPath
  )
  const exampleName = await getExampleName(
    options.example,
    pluginName
  )

  logMessage({
    message: [
      "You have definded the following:",
      `monorepo: ${monorepoName}`,
      `scope: ${scopeName ? scopeName : ""}`,
      `plugin: ${pluginName}`,
      `example: ${exampleName}`
    ].join("\n  "),
    type: "info"
  })

  create({
    monorepo: monorepoName,
    scope: scopeName,
    plugin: pluginName,
    example: exampleName,
    directoryPath: options.directoryPath,
    withStorefront: options.storefront,
    pluginRepoUrl: options.pluginRepoUrl,
    exampleRepoUrl: options.exampleRepoUrl,
    verbose: options.verbose,
    skipExampleDb: options.skipExampleDb,
  })
}

run()