import inquirer from "inquirer"
import slugifyType from "slugify"
import fs from "fs"
import path from "path"
import logMessage from "../log-message.js"

const slugify = slugifyType.default

export async function getMonorepoName(
  args: string[],
  pluignName: string,
  directoryPath?: string,
): Promise<string> {
  let askMonorepoName = args.length === 0
  if (args.length > 0) {
    const projectPath = path.join(directoryPath || "", args[0])
    if (
      fs.existsSync(projectPath) &&
      fs.lstatSync(projectPath).isDirectory()
    ) {
      logMessage({
        message: `A directory already exists with the name ${args[0]
          }. Please enter a different monorepo name.`,
        type: "warn",
      })
      askMonorepoName = true
    }
  }

  return askMonorepoName
    ? await askForMonorepoName(pluignName, directoryPath)
    : args[0]
}

async function askForMonorepoName(
  pluignName: string,
  directoryPath?: string,
): Promise<string> {
  const { monorepoName } = await inquirer.prompt([
    {
      type: "input",
      name: "monorepoName",
      message: `What's the name of your monorepo?`,
      default: `${pluignName}-monorepo`,
      filter: (input) => {
        return slugify(input).toLowerCase()
      },
      validate: (input) => {
        if (!input.length) {
          return `Please enter a monorepo name`
        }
        const monorepoPath = path.join(directoryPath || "", input)
        return fs.existsSync(monorepoPath) &&
          fs.lstatSync(monorepoPath).isDirectory()
          ? `A directory already exists with the same name. Please enter a different monorepo name.`
          : true
      },
    },
  ])
  return monorepoName
}
