# RS - Backend

## Description

The project has been build using NestJS
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

### The application

```bash
$ npm install
```

#### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### DATABASE

The Database is a dockerized PostgresSQL database. To build the image run :
Provided for you is an example env file : .env.example

copy this file to .env to start building the project

```bash
db:dev:restart
```

It will scafold all the necessary files to run the project

port should be 5435 as it will be build from the docker compose.

POSTGRES_USER="usernameOfYourChoice"
POSTGRES_PASSWORD="passwordOfYourChoice"
POSTGRES_DB="DBNameOfYourChoice"

JWT_SECRET="whateverTokenYouWant"

but you can generate a secure one with the command below:

```bash
openssl rand -base64 32
```

The UML File is available in the root folder of the project.

### DATA

There is a faker you can run to generate fake data to test the display.
It will generate fake annonces, contacts and users

```bash
npm run seed
```
