# Express AEViso API

Team:  
 -Aeryle  
 -Chabelle78  
 -ThomasBarrial  
 -MatthiasWanner  
 -Benwade-progldc

API REST made for AEVISO client project: https://github.com/WildCodeSchool/btz-0321-aeviso-client
With jwt authentication.

## Setup

- run `$ git clone git@github.com:WildCodeSchool/btz-0321-aeviso-api.git` in your terminal
- run `$ cd btz-0321-aeviso-api`
- run `npm install `

We use a POSTRGESQL database if you already have it, paste the url in DATABASE_URL environment variable (in your .env file at the root of the project)  
If not, a `docker-compose.yml` file can be used:

- Be sure your docker app is running
- In you terminal, run `docker-compose up -b`

Check if the container is running now with an `adminer` at `8080` port, and a `postres` image at `5342` port.  
Check if the `aeviso` database was created running `http://localhost:8080` in your browser.  
If all is ok, you should be on the adminer login page. Complete the form like that:

![Adminer](images/adminer_form.png)

`aeviso` database should apear in the list, but she's empty.

- If done, paste `DATABASE_URL=postgres://aeviso:aeviso@localhost:5432/aeviso` in your .env
- It will connect the db to the API.
- Now you can run `npx prisma migrate dev` to create tables and schemas in you db. Confirm message should appear in you console.
- If you want to push some datas in the db, run `node prisma/seed.js`

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
