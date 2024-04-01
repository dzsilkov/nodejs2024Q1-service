# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Switch and pull `dev-nodejs-service-part2` branch

## Installing NPM modules

```
npm install
```

## Create .env file from .env.example

```
.env.example -> .env
```

## Running application

first have to build docker container.

then have to up the container

```
npm run docker:up
```

to stop the container

```
npm run docker:down
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
or
docker exec -it main sh -c "npm run test"
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
or
docker exec -it main sh -c "npm run test:auth"
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Scan images for vulnerabilities.

```
npm run scout <image>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
