# Contributing

Contributions are welcome and will be fully credited.

## Creating issues

### Bug reports

Always try to provide as much information as possible. If you are reporting a bug, try to provide a repro. This will help me check the problem quicker.

### Feature requests

Lay out the reasoning behind it and ideally, you should have a practical example to prove the utility of the feature you're requesting.

## Pull Requests

I only accept contributions via Pull Requests on [Github](https://github.com/{{ githubAccount }}/{{ name }}).

Here are some guidelines to make the process smoother and easier for me and you:

- **Add a test** - New features and maybe bugs need tests. If you find it difficult to test, please tell me in the pull request and I will try to help you!
- **Document any change in behaviour** - Make sure the `README.md` and any other relevant documentation are kept up-to-date.
- **Run `pnpm test` locally** - This will allow you to go faster
- **Run `pnpm lint` and `pnpm typechecking` locally** - This will prevent you to have surprise for not respecting eslint config and problem with typescript
- **One pull request per feature** - If you want to do more than one thing, send multiple pull requests.
- **Send coherent history** - Make sure your commits message means something

## Repo setup

To develop locally, fork the Blottie repository and clone it in your local machine.

The package manager used must be pnpm. So you will need to run `pnpm install` to install dependencies.

To build the package, you need to do a `pnpm build`.

### Test

The components testing are made with Cypress allowing to check if everything working as expected.

To run cypress testing in headless mode, use the command `pnpm cypress`. You can open cypress app with the `pnpm cypress-ui` command.
All test need to be writing in the corresponding file.
