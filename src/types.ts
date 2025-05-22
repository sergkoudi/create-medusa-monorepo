export type Options = {
  monorepo?: string
  scope?: string
  plugin?: string
  example?: string
  directoryPath?: string
  withStorefront?: boolean
  pluginRepoUrl?: string
  exampleRepoUrl?: string
  verbose?: boolean
  skipExampleDb?: boolean
}

export type PluginOptions = {
  plugin: string
  basePath: string
  repoUrl?: string
  verbose?: boolean
}

export type ExampleOptions = {
  plugin: string
  example: string
  basePath: string
  withStorefront: boolean
  repoUrl?: string
  verbose?: boolean
  skipDb?: boolean
}

export type PackageOptions = {
  basePath: string,
  monorepo: string,
  pluginPath: string,
  examplePath: string,
  withStorefront: boolean
}