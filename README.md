# consent-manager-web-ext &middot; [![Build Status](https://travis-ci.org/privacycloud/consent-manager-web-ext.svg?branch=master)](https://travis-ci.org/privacycloud/consent-manager-web-ext) [![License](https://img.shields.io/github/license/privacycloud/consent-manager-web-ext?color=blue)](https://github.com/privacycloud/consent-manager-web-ext/blob/master/LICENSE) <!-- omit in toc -->

- [How to build the project](#how-to-build-the-project)
- [Development](#development)
  - [Setup](#setup)
  - [Run](#run)
  - [Environment Configuration](#environment-configuration)
  - [How to run tests](#how-to-run-tests)
- [License](#license)
- [Copyright](#copyright)

## How to build the project

The supported Node version for this project is specified at `.nvmrc`. To build this application, please follow the next steps:

```sh
npm install # to install dependencies
npm run build <chrome|firefox|opera|edge> # to build for the target vendor
```

The resulted artefact will be located at `./packages/consent-manager-web-ext.<version>.<vendor>.*.zip`.

> NOTE: Since Safari extensions follows a completely different approach we are not supporting this browser at the moment.

## Development

### Setup

All the code is built on top of [`webextension-toolbox`](https://github.com/webextension-toolbox/webextension-toolbox).

Dependencies are handled by `npm` so to install the project just type `npm install` on the project's root directory.

### Run

To run the project (in development) type:

```sh
npm run dev <chrome|firefox|opera|edge>
```

This will start a web server to provide hot-reloading functionality.

### Environment Configuration

`webextension-toolbox` automatically sets the `NODE_ENV` environment variable. The value for this variable will be `development` on development but it will be set to `production` on building time. See `webextension-toolbox` [documentation](https://github.com/webextension-toolbox/webextension-toolbox#usage) for more information about other environment variables or configuration details.

The project has also support for [`dotenv`](https://github.com/motdotla/dotenv), so it is possible to add custom environment variables through existing `.env` configuration file.

### How to run tests

```sh
npm run test
```

## License

[MIT](LICENSE)

## Copyright

Copyright (c) 2019 [PrivacyCloud](https://privacycloud.com)
