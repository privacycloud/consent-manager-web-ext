# consent-manager-web-ext &middot; [![Build Status](https://travis-ci.org/privacycloud/consent-manager-web-ext.svg?branch=master)](https://travis-ci.org/privacycloud/consent-manager-web-ext) [![License](https://img.shields.io/github/license/privacycloud/consent-manager-web-ext?color=blue)](https://github.com/privacycloud/consent-manager-web-ext/blob/master/LICENSE) <!-- omit in toc -->

- [Development](#development)
  - [Setup](#setup)
  - [Run](#run)
  - [Environment Configuration](#environment-configuration)
  - [How to run tests](#how-to-run-tests)
- [How to build the project](#how-to-build-the-project)
- [License](#license)
- [Copyright](#copyright)

## Development

### Setup

All the code is built on top of [`webextension-toolbox`](https://github.com/webextension-toolbox/webextension-toolbox).

Dependencies are handled by `yarn` so to install the project just type `yarn` or `yarn install` on the project's root directory.

### Run

To run the project (in development) type:

```sh
yarn dev <chrome|firefox|opera|edge>
```

This will start a web server to provide hot-reloading functionality.

### Environment Configuration

This project expects a `APP_HOST` environment variable to exist **at build time**. This can be configured via an `.env` file on the project's root directory. For example:

```
APP_HOST="http://localhost:3000" # change accordingly for production
```

`webextension-toolbox` automatically sets the `NODE_ENV` environment variable. The value for this variable will be `development` on development but it will be set to `production` on building time. See `webextension-toolbox` [documentation](https://github.com/webextension-toolbox/webextension-toolbox#usage) for more information about other environment variables or configuration details.

The project has also support for [`dotenv`](https://github.com/motdotla/dotenv), so it is possible to add custom environment variables through existing `.env` configuration file.

### How to run tests

```sh
yarn test
```

## How to build the project

Depending on the target vendor:

```sh
yarn build <chrome|firefox|opera|edge>
```

> NOTE: Since Safari extensions follows a completely different approach we are not supporting this browser at the moment.

## License

[MIT](LICENSE)

## Copyright

Copyright (c) 2019 [PrivacyCloud](https://privacycloud.com)
