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

Truncate Recipe Test DB `unseed:test` ----- this is alias for `psql -U recipeak -d recipeak-api-test -f ./seeds/trunc.recipes_table.sql`**

\* In package.json for these scripts, you may replace fields `recipeak` and `recipeak-api` with preferred Postgres user and database.

\** Truncate might be useful when the test database is accidentally populated.

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

## Documentation

### api/users

Creates new users and retrieves data from existing users.

#### POST /users

Create a new user.

#### GET /users

Retrieve data from a user.

### api/auth

Used for user authentication and session tokens. Generates an expiry token and ensures logout when user inactive.

#### POST /auth/login

Requests a JWT login token using a name and password.

### api/recipes

Deals with recipe services. When a recipe is added, ingredients are added all together from a list. Further changes to these ingredients are also done in bulk when a recipe edit is submitted.

#### GET /recipes

#### POST /recipes

### api/recipes/:recipe_id

#### GET /recipes:recipe_id

#### PATCH /recipes:recipe_id

#### DELETE /recipes:recipe_id

### /units

Deals with unit services. Units are divided by class, then sets. Each unit has data that determines how it is organized and displayed, including single and plural forms and what units it can convert into. This is, in my opinion, the feature with the most exciting growth potential. It could scale into its own, more complex service in combination with /convert.

### /convert

Deals with unit conversion on ingredients. Generates new conversions when an ingredient is changed or added in frontend, allowing for dynamic updates.
