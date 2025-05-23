import inquirer from "inquirer"
import slugifyType from "slugify"
import fs from "fs"
import path from "path"
import logMessage from "../log-message.js"

const slugify = slugifyType.default

export async function getRepoName(
  repoName: string,
  pluginName: string,
  directoryPath?: string | undefined,
): Promise<string> {
    const isValid = isValidRepoName(repoName, directoryPath)
    if(isValid !== true) {
      if (repoName)
        logMessage({
          message: isValid as string,
          type: "warn",
        })
      repoName = await askForRepoName(pluginName, directoryPath)
    }
  return slugify(repoName).toLowerCase()
}

async function askForRepoName(
  pluginName: string,
  directoryPath?: string,
): Promise<string> {
  const { repoName } = await inquirer.prompt([
    {
      type: "input",
      name: "repoName",
      message: `What's the name of your root repository (monorepo)?`,
      default: `${pluginName}-monorepo`,
      validate: (input) => {
        if (!input.length) {
          return `Please enter a plugin monorepo name`
        }
        return isValidRepoName(input, directoryPath)
      }
    }
  ])
  return repoName
}

function isValidRepoName(name: string, directoryPath?: string | undefined): string | boolean {
  if (!name) return false
  const repoPath = path.join(directoryPath ? directoryPath : "", name)
  if (
    fs.existsSync(repoPath) &&
    fs.lstatSync(repoPath).isDirectory()
  ) {
    return `A directory already exists with the name ${name}. Please enter a different monorepo name.`
  }
  return true
}