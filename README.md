<p align="center">
  <a href="https://www.medusajs.com">
    <img alt="Medusa" src="https://user-images.githubusercontent.com/7554214/153162406-bf8fd16f-aa98-4604-b87b-e13ab4baf604.png" width="100" />
  </a>
</p>
<h1 align="center">
  create-medusa-monorepo
</h1>

<p align="center">
  A CLI tool to scaffold a Medusa monorepo structure with a plugin and example projects.
</p>

## Usage

```bash
npx create-medusa-monorepo [monorepo-name] [options]
```

Replace `[monorepo-name]` with your desired monorepository name.

### Options

| Option                     | Description                                | Default           |
| -------------------------- | ------------------------------------------ | ----------------- |
| `-s, --scope <name>`       | Plugin scope name, must start with @       | _none_            |
| `-p, --plugin <name>`      | Plugin name                                | _none_            |
| `-e, --example <name>`     | Example project name                       | _none_            |
| `--directory-path <path>`  | Directory path to install the monorepo     | Current directory |
| `--plugin-repo-url <url>`  | Repository URL for plugin setup            | _none_            |
| `--example-repo-url <url>` | Repository URL for example setup           | _none_            |
| `--no-storefront`          | Do not create example storefront           | `false`           |
| `--skip-example-db`        | Skip creating the database for the example | `false`           |
| `--verbose`                | Show all logs (for debugging)              | `false`           |

## Example

```bash
npx create-medusa-monorepo my-plugin-monorepo -s @my-scope -p my-plugin -e my-plugin-example
```

## License

Licensed under the [MIT License](LICENSE).