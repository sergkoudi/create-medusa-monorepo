import path from "path"

import logMessage from "../utils/log-message.js"
import { Options } from "../types.js"
import { 
  createPlugin,
  createExample,
  createPackageJson,
  createReadme
} from "../utils/creator/index.js"

export default async function createDirectoryStructure({
  repo,
  plugin,
  example,
  directoryPath,
  withStorefront = true,
  pluginRepoUrl,
  exampleRepoUrl,
  verbose = false,
  skipExampleDb = false
}: Options) {
  if (!repo) {
    return logMessage({
      message: "The 'monorepo' option must be provided.",
      type: "error",
    })
  }
  if (!plugin) {
    return logMessage({
      message: "The 'plugin' option must be provided.",
      type: "error",
    })
  }
  if (!example) {
    return logMessage({
      message: "The 'example' option must be provided.",
      type: "error",
    })
  }

  const basePath = directoryPath ? path.join(directoryPath, repo) : repo
  const basePluginPath = path.join(basePath, "packages")
  const baseExamplePath = path.join(basePath, "examples")
  const relativePluginPath = path.join("packages", plugin.fullName)
  const relativeExamplePath = path.join("examples", example)

  logMessage({
    message: `/ Creating plugin monorepo in the ${basePath} directory...`,
    type: "info"
  })

  createPlugin({
    plugin: plugin,
    basePath: basePluginPath,
    repoUrl: pluginRepoUrl,
    verbose
  })

  createExample({
    plugin: plugin,
    example,
    basePath: baseExamplePath,
    withStorefront,
    repoUrl: exampleRepoUrl,
    verbose,
    skipDb: skipExampleDb
  })

  createPackageJson({
    basePath,
    repo,
    pluginPath: relativePluginPath,
    examplePath: relativeExamplePath,
    withStorefront
  })

  createReadme({
    basePath,
    repo,
    plugin
  })

  logMessage({
    message: "✔ Plugin monorepo created!",
    type: "success"
  })
}
