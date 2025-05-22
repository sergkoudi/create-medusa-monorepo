import { execSync } from "child_process"
import path from "path"

import logMessage from "../utils/log-message.js"
import { Options } from "../types.js"
import { 
  createPlugin,
  createExample,
  createRootPackageJson
} from "../utils/creator/index.js"

export default async function createDirectoryStructure({
  monorepo,
  scope = "",
  plugin,
  example,
  directoryPath,
  withStorefront = true,
  pluginRepoUrl,
  exampleRepoUrl,
  verbose = false,
  skipExampleDb = false
}: Options) {
  if (!monorepo) {
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

  const basePath = directoryPath ? path.join(directoryPath, monorepo) : monorepo
  const basePluginPath = path.join(basePath, "packages")
  const baseExamplePath = path.join(basePath, "examples")
  const pluginPath = path.join(basePluginPath, plugin)
  const examplePath = path.join(baseExamplePath, example)

  logMessage({
    message: `/ Creating monorepo in the ${basePath} directory...`,
    type: "info"
  })

  const pluginName = scope ? `${scope}/${plugin}` : plugin

  createPlugin({
    plugin: pluginName,
    basePath: basePluginPath,
    repoUrl: pluginRepoUrl,
    verbose
  })

  createExample({
    plugin: pluginName,
    example,
    basePath: baseExamplePath,
    withStorefront,
    repoUrl: exampleRepoUrl,
    verbose,
    skipDb: skipExampleDb
  })

  createRootPackageJson({
    basePath,
    monorepo,
    pluginPath,
    examplePath,
    withStorefront
  })

  logMessage({
    message: "✔ Monorepo created!",
    type: "success"
  })
}
