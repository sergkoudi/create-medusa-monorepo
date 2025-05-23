import inquirer from "inquirer"
import { execSync } from "child_process"
import logMessage from "../log-message.js"
import { Plugin, PluginOptions } from "../../types.js"

export async function getPluginName(
  pluginName: string,
): Promise<Plugin> {
  const isValid = isValidPluginName(pluginName)
  if (isValid === true) {
    return buildPlugin(pluginName)
  } else {
    if (pluginName)
      logMessage({
        message: isValid as string,
        type: "warn",
      })
    pluginName = await askForPluginName()
    return buildPlugin(pluginName)
  }
}

async function askForPluginName(): Promise<string> {
  const { pluginName } = await inquirer.prompt([
    {
      type: "input",
      name: "pluginName",
      message: `What's the name of your plugin (scope is optional)?`,
      default: `my-plugin`,
      validate: (input) => {
        if (!input.length) {
          return `Please enter a plugin name`
        }
        return isValidPluginName(input)
      },
    },
  ])
  return pluginName
}

export function createPlugin({
  plugin,
  basePath,
  repoUrl,
  verbose
}: PluginOptions) {
  logMessage({
    message: `├─ Installing plugin to the ${basePath}/${plugin.name} directory...`,
    type: "info"
  })
  execSync([
    "npx create-medusa-app@latest",
    plugin.fullName,
    "--plugin",
    `--directory-path ${basePath}`,
    `${repoUrl ? `--repo-url ${repoUrl}` : ""}`,
    `${verbose ? `--verbose` : ""}`
  ].join(" "), {
    stdio: "inherit",
  })
}

function isValidPluginName(name: string) {
  if (!name) return false
  const parts = name.split("/")
  if (parts.length > 2) {
    return "Plugin name must be in the format `@my-scope/my-plugin` or `my-plugin`"
  }
  if (parts.length === 2) {
    const [scope, plugin] = parts
    if (!scope.startsWith("@"))
      return "Scope name must start with @ (for example, `@my-scope`)"
    if (scope.length < 2)
      return "Scope name must be at least 2 characters long"
    if (!/^[a-z0-9-@]+$/.test(scope))
      return "Scope name can only contain lowercase letters, numbers, and hyphens, for example, `@my-scope`"
    if (!plugin || plugin.length < 1)
      return "Plugin name must be at least 1 character long"
    if (!/^[a-z0-9-]+$/.test(plugin))
      return "Plugin name can only contain lowercase letters, numbers, and hyphens, for example, `my-plugin`"
  } else {
    const plugin = parts[0]
    if (!/^[a-z0-9-]+$/.test(plugin)) {
      return "Plugin name can only contain lowercase letters, numbers, and hyphens, for example, `my-plugin`"
    }
  }
  return true
}

function buildPlugin(input: string): Plugin {
  const parts = input.split("/")
  if (parts.length === 2) {
    const [scope, name] = parts
    return { scope, name, fullName: input }
  } else {
    return { name: parts[0], fullName: input }
  }
}