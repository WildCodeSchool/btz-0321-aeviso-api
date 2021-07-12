# Express AEViso API

Team:  
 -Aeryle  
 -Chabelle78  
 -ThomasBarrial  
 -MatthiasWanner  
 -Benwade-progldc

API REST made for AEVISO client project: https://github.com/WildCodeSchool/btz-0321-aeviso-client
With jwt authentication.

Includes API Server utilities:

- [morgan](https://www.npmjs.com/package/morgan)
  - HTTP request logger middleware for node.js
- [helmet](https://www.npmjs.com/package/helmet)
  - Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can
    help!
- [dotenv](https://www.npmjs.com/package/dotenv)
  - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`

Development utilities:

- [nodemon](https://www.npmjs.com/package/nodemon)
  - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application
    when file changes in the directory are detected.
- [eslint](https://www.npmjs.com/package/eslint)
  - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [mocha](https://www.npmjs.com/package/mocha)
  - ☕️ Simple, flexible, fun JavaScript test framework for Node.js & The Browser ☕️
- [supertest](https://www.npmjs.com/package/supertest)
  - HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```

and run

```
http://localhost:5000

```

## Documentation

go to `/api-docs`

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CLIENT=client/url`

`SECRET=secret_key_used_by_jwt`

`DATABASE_URL=your/db/url`

`USER_JOB=jobLabelYouWantToCreateOnServerLaunch`

`USER_FIRSTNAME=firstname`

`USER_LASTNAME=lastname`

`USER_EMAIL=mail@example.dev`

`USER_PASSWORD=password`

## Facultativs Variables

If you want to share API to your local network

`HOST=ip.local.adress`

API URL wil become:

`http://ip.local.adress:5000`
