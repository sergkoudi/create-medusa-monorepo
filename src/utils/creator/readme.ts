import { writeFileSync } from "fs"
import { ReadmeOptions } from "../../types.js"

export function createReadme({
  basePath,
  repo,
  plugin 
}: ReadmeOptions) {
  writeFileSync(`${basePath}/README.md`, 
    `# ${repo}\n\n` +
    `This is a monorepo for the \`${plugin.fullName}\` Medusa plugin.\n`
  )
}