# Express AEViso API

Team:  
 -Aeryle: https://github.com/Aeryle  
 -Chabelle78: https://github.com/Chabelle78  
 -ThomasBarrial: https://github.com/ThomasBarrial  
 -MatthiasWanner: https://github.com/MatthiasWanner  
 -Benwade-progldc: https://github.com/Benwade-progldc

API REST made for AEVISO client project: https://github.com/WildCodeSchool/btz-0321-aeviso-client.  
With jwt authentication.

## Prerequisites

- Docker: https://www.docker.com/products/docker-desktop
- Node: https://nodejs.org/en/

## Setup

- run `$ git clone https://github.com/WildCodeSchool/btz-0321-aeviso-api.git` in your terminal
- run `$ cd btz-0321-aeviso-api`
- run `npm install `

We use a POSTRGESQL database. If you already have it, paste the url in DATABASE_URL environment variable (in your .env file at the root of the project).  
If not, a `docker-compose.yml` file can be used:

- Be sure your docker app is running
- In your terminal, run `docker-compose up -d`

Check if the container is running now with an `adminer` image at `8080` port, and a `postgres` image at `5342` port.  
Check if the `aeviso` database was created running `http://localhost:8080` in your browser.  
If all is ok, you should be on the adminer login page. Complete the form like that:

![Adminer](images/adminer_form.png)

password: `aeviso`.

`aeviso` database should appear in the list, but it's empty.

- If done, paste `DATABASE_URL=postgres://aeviso:aeviso@localhost:5432/aeviso` in your .env
- It will connect the db to the API.
- Now you can run `npx prisma migrate dev` to create tables and schemas in you db. Confirm message should appear in your console.
- If you want to push some datas in the db, run `node prisma/seed.js`
- If you read the seed file, you can see that all users's created passwords will be "password".
- Run `npx prisma studio` to launch an interface that displays all datas in your web browser (you can use any credential to log you in).

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
CLIENT=client/url

SECRET=secret_key_used_by_jwt

DATABASE_URL=your/db/url

USER_JOB=jobLabelYouWantToCreateOnServerLaunch

USER_FIRSTNAME=firstname

USER_LASTNAME=lastname

USER_EMAIL=mail@example.dev

USER_PASSWORD=password
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

## Optionnal Variables

If you want to share API to your local network

`HOST=ip.local.address`

API URL will become:

`http://ip.local.adress:5000`

## Lint

```
npm run lint
```

## Test

```
npm run test
```
