import inquirer from "inquirer"
import slugifyType from "slugify"
import logMessage from "../log-message.js"
import { execSync } from "child_process"
import { PluginOptions } from "../../types.js"

const slugify = slugifyType.default

export async function getPluginName(
  pluignName: string,
): Promise<string> {
  return !pluignName
    ? await askForPluginName()
    : pluignName
}

async function askForPluginName(): Promise<string> {
  const { pluginName } = await inquirer.prompt([
    {
      type: "input",
      name: "pluginName",
      message: `What's the name of your plugin?`,
      default: `my-plugin`,
      filter: (input) => {
        return slugify(input).toLowerCase()
      },
      validate: (input) => {
        if (!input.length) {
          return `Please enter a plugin name`
        }
        return true
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
    message: `├─ Installing plugin to the ${basePath}/${plugin} directory...`,
    type: "info"
  })
  execSync([
    "npx create-medusa-app@latest",
    plugin,
    "--plugin",
    `--directory-path ${basePath}`,
    `${repoUrl ? `--repo-url ${repoUrl}` : ""}`,
    `${verbose ? `--verbose` : ""}`
  ].join(" "), {
    stdio: "inherit",
  })
}