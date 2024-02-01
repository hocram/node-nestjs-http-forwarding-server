# NEST.JS

## install
npm i -g @nestjs/cli

### new project
nest new .

### no spec
add to nest-cli.json :
    "generateOptions": {
        "spec": false
    }

## Package
- HttpModule
    npm i --save @nestjs/axios axios
-  TYPEORM
    npm i @nestjs/typeorm typeorm 
    npm i sqlite3 
    npm i @automapper/classes @automapper/core @automapper/nestjs class-transformer class-validator 
    npm install @automapper/{core, classes, nestjs} class-transformer class-validator
    npm install --save-dev @automapper/types