# Next JS with Next Auth implementation

This is a [Next.js](https://nextjs.org/) Application with a simple implementation of NextAuth.js. The application support :
- Typescript ;
- NextAuth.js ;

## Clone the repository

```bash
git clone https://github.com/clemb8/boilerplate-next-auth-typescript-pg.git
```

## Build Setup

First, run the development server:

```bash
# Install dependency
npm install
## or
yarn

# serve with hot reload at localhost:3000
npm run dev
## or
yarn run dev
```
## Setup local environment

Create a .env file :
```bash
touch .env.local
```
You need to setup the following variables :
```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5433/postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=***
GOOGLE_CLIENT_ID=XXX.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXX
```

Install the PostGreSQL Database :
```bash
docker-compose up
```
