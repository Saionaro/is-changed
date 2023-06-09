# is-changed: Github Action

## Intro

Check if the entity has changed in the latest commit and use that knowledge to speed up your workflows.

## Usage

### Inputs

- `glob`: **[required]** the entity path to be checked, a glob template. For example: `"src/**"`, `"package-lock.json"`, `"frontend/**/*.js"`
- `token`: **[required]** the GITHUB_TOKEN to grant the action an access to commits history

### Outputs

- `changed`: either `"true"` or `"false"`

## Example Workflow

```yaml
name: CI

on: push

jobs:
  build:
    name: Create Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - id: ui_changed
        uses: Saionaro/is-changed@v1.2.0
        with:
          glob: frontend/**
          token: ${{ secrets.GITHUB_TOKEN }}
      # from now you know if the "frontend" directory content changed in the commit
      # you can print it - "true" of "false"
      - run: echo "${{ steps.ui_changed.outputs.changed }}"
      # use change state to conditionally run workflow steps
      - name: Test Frontend
        if: ${{ steps.ui_changed.outputs.changed == 'true' }}
        run: npm run test
```

## Contributing

Please, follow [Conventional Commits](https://www.conventionalcommits.org/) guidelines.

Do not commit `dist` directory - it's been commited automatically during CI workflow.
