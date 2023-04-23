# is-changed: Github Action

## Intro

Check if the entity has changed and use that knowledge to speed up your workflows.

## Usage

### Inputs

- `glob`: (required) the entity path to be checked, a glob template. For example: "src", "package-lock.json", "frontend/**/*.js"

### Outputs

- `changed`: either `"true"` or `"false"`

## Example Workflow

```yaml
on: push

name: CI

jobs:
  build:
    name: Create Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - id: ui_changed
        uses: Saionaro/is-changed@v1.0.0
        with:
          glob: frontend
      # From now you know if the "frontend" directory changed in the commit
      # You can print it - "true" of "false"
      - name: Print version
        run: echo ${{ steps.ui_changed.outputs.changed }
      # Use change state to conditionally run workflow steps
      - name: Test Frontend
        if: ${{ steps.ui_changed.outputs.changed == 'true' }}
        run: npm run test
```

## Contributing

Please, follow [Conventional Commits](https://www.conventionalcommits.org/) guidelines.

Do not commit `dist` directory - it's been commited automatically during CI workflow.
