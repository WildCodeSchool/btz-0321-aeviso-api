# Express AEViso API

Team:  
 - [Aeryle](https://github.com/Aeryle)  
 - [Chabelle78](https://github.com/Chabelle78)  
 - [ThomasBarrial](https://github.com/ThomasBarrial)  
 - [MatthiasWanner](https://github.com/MatthiasWanner)  
 - [Benwade-progldc](https://github.com/Benwade-progldc)

API REST made for AEVISO client project: https://github.com/WildCodeSchool/btz-0321-aeviso-client.  
With jwt authentication.

## Prerequisites

- Docker: [Link](https://www.docker.com/products/docker-desktop)
- Node: [Link](https://nodejs.org/en)

## Setup

Run those commands
```sh
git clone https://github.com/WildCodeSchool/btz-0321-aeviso-api.git
cd btz-0321-aeviso-api
npm install
```

We use a POSTGRESQL database. If you already have it, paste the url in DATABASE_URL environment variable (in your .env file at the root of the project).  
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
- Now you can run `npx prisma migrate dev` to create tables and schemas in you db. Confirm message should appear in your console.
- If you want to push some datas in the db, run `node prisma/seed.js`
- If you read the seed file, you can see that all users's created passwords will be "password".
- Run `npx prisma studio` to launch an interface that displays all datas in your web browser (you can use any credential to log you in).

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file  
⚠ Change values to customize your variables. `USER_` variables will be used to create a first `SUPERADMIN` user launching the server. `email` and `password` will be useful to connect you with front app. A real random `SECRET` key should be filled in during Production.

```
CLIENT=http://localhost:5000

SECRET=secret_key_used_by_jwt

DATABASE_URL=postgres://aeviso:aeviso@localhost:5432/aeviso

USER_JOB=Web Dev

USER_FIRSTNAME=Foo

USER_LASTNAME=bar

USER_EMAIL=foo@bar.dev

USER_PASSWORD=password
```

## Development

```sh
npm run dev
```

and access `http://localhost:5000` on your browser

## Documentation

go to `/api-docs`

## Optional Variables

If you want to share API to your local network

`HOST=ip.local.address`

API URL will become:

`http://ip.local.adress:5000`

## Lint

```sh
npm run lint
```

## Test

```sh
npm run test
```
