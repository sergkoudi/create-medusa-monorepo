import inquirer from "inquirer"
import slugifyType from "slugify"
import logMessage from "../log-message.js"

const slugify = slugifyType.default
const errorMessage = "Scope name must start with @ (for example, @my-scope)"

export async function getScopeName(scopeName: string): Promise<string> {
  if (scopeName && isValidScopeName(scopeName)) return scopeName
  return askForScopeName()
}

async function askForScopeName(): Promise<string> {
  const { scopeName } = await inquirer.prompt([
    {
      type: "input",
      name: "scopeName",
      message: `What's the scope of your plugin (optional)?`,
      filter: (input) => input ? slugify(input).toLowerCase() : undefined,
      validate: (input) => {
        if (input && !input.startsWith("@")) {
          return errorMessage
        }
        return true
      },
    },
  ])
  return scopeName
}

function isValidScopeName(scopeName: string): boolean {
  logMessage({
    message: errorMessage,
    type: "warn"
  })
  return scopeName.startsWith("@") && scopeName.length > 1
}