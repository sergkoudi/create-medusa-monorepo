import { writeFileSync } from "fs"
import { PackageOptions } from "../../types.js"

export function createPackageJson({
  basePath,
  repo,
  pluginPath,
  examplePath,
  withStorefront
}: PackageOptions) {
  const workspaces: string[] = [pluginPath]

  workspaces.push(`${examplePath}/medusa`)
  if (withStorefront) workspaces.push(`${examplePath}/medusa-storefront`)

  const rootPackageJson = {
    name: repo,
    private: true,
    version: "0.0.0",
    workspaces,
  }

  writeFileSync(`${basePath}/package.json`, JSON.stringify(rootPackageJson, null, 2))
}