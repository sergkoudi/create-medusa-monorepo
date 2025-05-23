export type Options = {
  repo?: string
  scope?: string
  plugin?: Plugin
  example?: string
  directoryPath?: string
  withStorefront?: boolean
  pluginRepoUrl?: string
  exampleRepoUrl?: string
  verbose?: boolean
  skipExampleDb?: boolean
}

export type Plugin = {
  scope?: string
  name: string
  fullName: string
}

export type PluginOptions = {
  plugin: Plugin
  basePath: string
  repoUrl?: string
  verbose?: boolean
}

export type ExampleOptions = {
  plugin: Plugin
  example: string
  basePath: string
  withStorefront: boolean
  repoUrl?: string
  verbose?: boolean
  skipDb?: boolean
}

export type PackageOptions = {
  basePath: string
  repo: string
  pluginPath: string
  examplePath: string
  withStorefront: boolean
}

export type ReadmeOptions = {
  basePath: string
  repo: string
  plugin: Plugin
}