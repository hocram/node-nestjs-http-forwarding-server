# NestJS HTTP Forwarding Server
Server, designed with the Nest.js framework, focuses on HTTP proxy forwarding requests and responses for a single domain. Evolving from the 'Simple HTTP Forwarding Server for Single Domain,' it integrates advanced features like caching, TypeORM, and SQLite for efficient storage of requests and responses. Providing a hands-on exploration of HTTP communication and data optimization, it offers a comprehensive solution for developers seeking a sophisticated approach to request handling.

[![Nest.js Version](https://img.shields.io/badge/-NestJs-ea2845?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Node.js Version](https://img.shields.io/badge/Node.js-v18.15.0-green)](https://nodejs.org/)
[![NPM Version](https://img.shields.io/npm/v/npm?color=green)](https://www.npmjs.com)
[![Express.js Version](https://img.shields.io/badge/Express.js-v4.18.2-green)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?color=green)](LICENSE.md)

## Description
Server specialized in HTTP proxy forwarding requests and responses for a specific domain, developed with the aim of optimizing efficiency and response management while maintaining a focus on increasing functionality without sacrificing clarity and simplicity of implementation. Initiated as an educational resource, the project evolves from the "Simple HTTP Forwarding Server for Single Domain," incorporating the capabilities offered by the Nest.js framework. Integrating advanced features such as caching through TypeORM and SQLite and managing proxy requests with middleware, the server aims to optimize response handling and efficiency.

Following the Keep It Simple, Stupid (KISS) design philosophy, the project promotes simplicity and clarity in the code. The adoption of Nest.js provides an organized structure, dependency injection capabilities, decorators, simplifying the modular management of controllers, services, components, data model, and entity repository.

The server offers support for compilation in different environments, ensuring flexibility and adaptability to development needs. The comprehensive logging system facilitates monitoring and debugging, contributing to an in-depth management of requests and responses. Various REST API services are available for dynamically managing cached requests and responses, allowing dynamic querying of stored data.

Fully explore the capabilities of this server, designed for advanced HTTP request forwarding with a practical and educational approach.

## Key Features

- Receives HTTP requests from clients.
- Forwards HTTP requests to a configured destination server.
- Modifies request headers, if necessary.
- Receives and manages responses from the destination server.
- Implements advanced caching using TypeORM and SQLite to store requests and responses.
- Middleware for handling proxy requests during forwarding.
- Forwards responses back to clients.
- Support for Compilation in Different Environments.
- Comprehensive Logging System.
- REST API Services for the management of cached requests and responses.

## Readme Translations
- [Read in English.](README.md)
- [Leggi in Italiano.](README.it.md)

## Requirements
- Node.js and npm installed on your system.

## Installing and Usage
1. Clone this repository to your computer.
2. Install the project dependencies using npm:
```shell
npm install
```
3. Configure the HTTP request forwarding settings in the environment config file: 'src/environments/dev.env' (default).
4. Start the server using the following command:
```shell
npm start
```
5. The server will listen for client requests and forward them to the destination server.

## Configuration
You can customize the server's behavior by editing the environment config file: 'src/environments/dev.env' (default).
NOTE: for the Windows users must install cross-env package as windows doesn't support this way of loading variables and alter the commands like so "start:dev": "cross-env NODE_ENV=dev nest start --watch"

## Author
* Name: Marco (Hocram) Di Pasquale
* GitHub Profile: [Hocram](https://github.com/hocram) (https://github.com/hocram)

## Contacts
For questions, bug reports, or suggestions, you can reach out to us through GitHub's issue tracking system:
- [Open a new issue](https://github.com/hocram/node-nestjs-http-forwarding-server/issues/new) to report problems or propose enhancements.
- Please refer to our [Issue Guidelines](https://github.com/hocram/node-nestjs-http-forwarding-server/blob/main/ISSUE_GUIDELINES.md) before opening a new issue.

## License
This project is licensed under the [MIT](LICENSE) License, Copyright (c) 2023 - Marco Di Pasquale (Hocram) Author. 
See the [LICENSE](LICENSE) file for details.

## Thank You!
A big thank you to everyone who will contribute to perfecting this project. Your future contributions will be greatly appreciated and will help make this educational resource even better, while always keeping in mind the KISS (Keep It Simple, Stupid) methodology for design: striving to keep it simple, clear, and uncomplicated.

Happy coding and learning! :smile:

Hocram