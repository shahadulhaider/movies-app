# Favorite Movies app

Favorite movies built with Nestjs and React with typescript

## Requirements

```
node.js
postgresql
typescript
```

## Tech stack

Backend:

- Nestjs
- Express
- Postgresql
- Typeorm
- Passport
- JWT

Fronend:

- React with typescript
- Redux
- Css module

## How to run

- Clone this repo and `cd` into it
- Create new postgres databse
  - `createdb movies-api`
- Run the backend: In current terminal run these following commands
  - `cd backend`
  - `cp env.sample .env` and update it
  - `yarn`
  - `yarn start:dev`
- Run the frontend: Open another terminal, cd into the root of the cloned repo and run these following commands
  - `cd app`
  - `yarn`
  - `yarn start`

NOTE: Make sure the PORT `8000` and `3000` are free.
