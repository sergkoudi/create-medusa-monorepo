<p align="center">
  <a href="https://www.medusajs.com">
    <img alt="Medusa" src="https://user-images.githubusercontent.com/7554214/153162406-bf8fd16f-aa98-4604-b87b-e13ab4baf604.png" width="100" />
  </a>
</p>
<h1 align="center">
  create-medusa-plugin
</h1>

<p align="center">
  A CLI tool to quickly scaffold a Medusa plugin and example projects in a ready-to-develop monorepo structure.
</p>

## Usage

`create-medusa-plugin` uses the official [`create-medusa-app`](https://docs.medusajs.com/resources/create-medusa-app) under the hood to scaffold Medusa projects—including the plugin, backend and storefront folders. This ensures your setup follows official best practices and remains fully compatible with the Medusa ecosystem by leveraging the official Medusa app generator.

```bash
npx create-medusa-plugin [plugin-name] [options]
```

Replace `[plugin-name]` with your desired plugin name.

### Options

| Option                     | Description                                                                                          | Default           |
| -------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------- |
| `-r, --repo <name>`        | Root repository (monorepo) name                                                                      | _none_            |
| `-e, --example <name>`     | Example folder name, where the `medusa` and `medusa-storefront` examples will be created             | _none_            |
| `--directory-path <path>`  | Path to the output directory for the root repository                                                 | Current directory |
| `--plugin-repo-url <url>`  | URL of repository to setup a Medusa plugin (forwards `repo-url` to `create-medusa-app`)              | _none_            |
| `--example-repo-url <url>` | URL of repository to setup an example Medusa backend (forwards `repo-url` to `create-medusa-app`)    | _none_            |
| `--no-storefront`          | Do not include example storefront (forwards as `--with-nextjs-starter=false` to `create-medusa-app`) | `false`           |
| `--skip-example-db`        | Skip creating the Medusa example database (forwards `--skip-db` to `create-medusa-app`)              | `false`           |
| `--verbose`                | Show all logs of underlying commands (forwards `--verbose` to `create-medusa-app`)                   | `false`           |

## Examples

* **Basic usage**

  ```bash 
  npx create-medusa-plugin
  ```

  This command will prompt you for the plugin name and other configuration options interactively.

* **With options**

  ```bash
  npx create-medusa-plugin my-plugin -r my-plugin-monorepo -e my-plugin-example --skip-example-db
  ```

  This command scaffolds the following monorepo structur, installing the Medusa projects within it:

  ```
  /
  └── my-plugin-monorepo/
      ├── examples/
      │   └── my-plugin-example/
      │      ├── medusa/
      │      └── medusa-storefront/
      ├── packages/
      │   └── my-plugin/
      ├── package.json
      └── README.md
  ```

* **With a plugin scope**

  ```bash
  npx create-medusa-plugin @my-scope/my-plugin -r my-plugin-monorepo -e my-plugin-example --skip-example-db
  ```

  This command scaffolds the following monorepo structure, placing your scoped plugin in a nested folder under `packages` and installing the Medusa projects within it:


  ```
  /
  └── my-plugin-monorepo/
      ├── examples/
      │   └── my-plugin-example/
      │      ├── medusa/
      │      └── medusa-storefront/
      ├── packages/
      │   └── @my-scope/
      │      └── my-plugin/
      ├── package.json
      └── README.md
  ```

## License

Licensed under the [MIT License](LICENSE).