# How to contribute to this project <!-- omit in toc -->

- [Reporting & resolving issues](#reporting--resolving-issues)
  - [Did you find a bug?](#did-you-find-a-bug)
  - [Did you write a patch that fixes a bug?](#did-you-write-a-patch-that-fixes-a-bug)
- [TypeScript](#typescript)

## Reporting & resolving issues

### Did you find a bug?

1. Ensure the bug was not already reported by searching on GitHub under Issues.
2. If you're unable to find an open issue addressing the problem, open a new one. Be sure to include a title and clear description, as much relevant information as possible, and a code sample or an executable test case demonstrating the expected behavior that is not occurring.

### Did you write a patch that fixes a bug?

1. Remember to add test cases to ensure that the issue has been fixed.
1. Open a new GitHub pull request with the patch.
1. Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.
1. Before submitting, please ensure that your changes follow the current coding conventions for this project and the test suite passes without errors. Most conventions are defined in [ESLint](.eslintrc.js) and [Prettier](.prettierrc.js) configuration files.

## TypeScript

This project uses the JavaScript language but gets type checking through TypeScript and JSDoc block comments. See [`tsconfig.json`](tsconfig.json) to undestand what compiler rules are enabled.

