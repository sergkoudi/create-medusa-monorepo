import inquirer from "inquirer"
import slugifyType from "slugify"
import { execSync } from "child_process"
import path from "path"
import { readFileSync, writeFileSync } from "fs"
import logMessage from "../log-message.js"
import { ExampleOptions, Plugin } from "../../types.js"

const slugify = slugifyType.default

export async function getExampleName(
  exampleName: string,
  pluignName: string,
): Promise<string> {
  return !exampleName
    ? await askForExampleName(pluignName)
    : exampleName
}

async function askForExampleName(
  pluignName: string,
): Promise<string> {
  const { exampleName } = await inquirer.prompt([
    {
      type: "input",
      name: "exampleName",
      message: `What's the name of your example?`,
      default: `${pluignName}-example`,
      filter: (input) => {
        return slugify(input).toLowerCase()
      },
      validate: (input) => {
        if (!input.length) {
          return `Please enter an example name`
        }
        return true
      },
    },
  ])
  return exampleName
}

export function createExample({
  plugin,
  example,
  basePath,
  withStorefront,
  repoUrl,
  verbose,
  skipDb
}: ExampleOptions) {
  logMessage({
    message: `└─ Installing example to the ${basePath}/${example} directory...`,
    type: "info"
  })
  const projectName = "medusa"
  execSync([
    "npx create-medusa-app@latest",
    projectName,
    `--directory-path ${basePath}/${example}`,
    `--with-nextjs-starter ${withStorefront ? "true" : "false"}`,
    `${repoUrl ? `--repo-url ${repoUrl}` : ""}`,
    `${verbose ? "--verbose" : ""}`,
    `${skipDb ? "--skip-db" : ""}`
  ].join(" "), {
    stdio: "inherit",
  })

  patchPackageJson(
    path.join(basePath, example, projectName),
    plugin
  )
}

function patchPackageJson(
  examplePath: string,
  plugin: Plugin,
) {
  const packageJsonPath = path.join(examplePath, "package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))

  // Add local dependency to medusa/package.json
  packageJson.dependencies = packageJson.dependencies || {}
  packageJson.dependencies[plugin.fullName] = `file:../../../packages/${plugin.fullName}`

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}