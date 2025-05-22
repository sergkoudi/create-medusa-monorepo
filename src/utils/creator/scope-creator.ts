import inquirer from "inquirer"
import slugifyType from "slugify"

const slugify = slugifyType.default

export async function getScopeName(
  scopeName: string,
): Promise<string> {
  return !scopeName
    ? await askForScopeName()
    : scopeName
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
          return "Scope name must start with @ (for example, @myscope)"
        }
        return true
      },
    },
  ])
  return scopeName
}