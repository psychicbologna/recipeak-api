# Recipeak API

A friendly recipe app.

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository.
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Migrations `npm run migrate`, `npm run migrate:test`; append with step number (eg, `npm run migrate -- 0`)

Seed Recipe Api `seed:api` ----- this is alias for (`psql -U recipeak -d recipeak-api -f ./seeds/seed.recipes_table.sql`)*

Truncate Recipe Api `unseed:api` ----- this is alias for `psql -U recipeak -d recipeak-api -f ./seeds/trunc.recipes_table.sql`*

Truncate Recipe Test DB `unseed:test` ----- this is alias for `psql -U recipeak -d recipeak-api-test -f ./seeds/trunc.recipes_table.sql`*

*In package.json for these scripts, you may replace fields `recipeak` and `recipeak-api` with preferred Postgres user and database.

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

## Log

### 2019-10-16

- Migrating users in, kept separate from authors. Beginning to work in protected endpoints as well. Testing is working out okay. Interval function?

- It occurred to me this morning - users should be separate from authors, because you might want to put up recipes from outside sources!! Must keep this in mind - there should be a default option that makes the author the user, and another that allows you to enter an author name.

- A long fight here with frontend. Started sketching out a bunch of the routes and some of the testing. Look forward to implementing the helpers and having valid tests for the endpoints. Ending the night by writing some scripts to expedite seeding/unseeding for faster migration testing. Running into some issues with testing not coming out as I wanted, but got some fixes done on it.

### 2019-10-14

Beginning to flesh out the server with all the basic installations and data structures. Running into an issue with postgres where the pg server isn't being read. Moving to client side for a few hours.

This corrected itself...

Got brushed up on the INTERVAL data type [here](http://www.postgresqltutorial.com/postgresql-interval/).
