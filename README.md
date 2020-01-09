# Recipeak

A friendly recipe app.

Created by Alex Fukui for Thinkful.

[Github](https://github.com/psychicbologna/recipeak-client)
[Demo](https://recipeak-client.now.sh/)

## Tech

Server: Node, npm, Express.js, xss

Database: PostgresSQL, Postgrator, Knex.

Testing: Chai, supertest.

Deployed on Heroku.

Uses RESTful API, cors, and authentication middleware with JWT bearer tokens.

## Summary

Recipeak's primary function is to store your favorite recipes in one place. You can add, edit and delete these recipes and their components. The server was designed to use a database with associated tables for users, recipes, units and ingredients.

### How to Use

See the [client-side](https://github.com/psychicbologna/recipeak-client/blob/master/README.md) documentation for a step-by-step on using Recipeak.

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

\* In package.json for these scripts, you may replace fields `recipeak` and `recipeak-api` with preferred Postgres user and database.

\*\* Truncate might be useful when the test database is accidentally populated.

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

### Composing Units

Unit conversion was the most complex aspect of this project to tackle, and one I would like to expand upon in future builds.

#### Unit Conversion

Recipeak's unit conversions are calculated both as part of the response body when a recipe is sent out and when an ingredient is created.

For now, the two systems of measurement that an ingredient can be converted between are `US` and `Metric`. Each unit converts to one other unit in the opposite system. `Approximate`, `Custom` and `Base` units cannot be converted.

Ratios (`cnv_ratio`) and which unit to convert to (`cnv_to`) are stored in the units table as part of a unit's `unit_data`. When a recipe is requested, a `conversion` object is created for each applicable ingredient that calculates its opposite and determines how it will be displayed. All units have `abbreviated`, `singular` and `plural` forms.

Conversions can also be generated live when an ingredient is added or edited using the `/convert` endpoints, allowing for dynamic conversion.

#### Custom Units

Depending on its `unit_set` definition, an ingredient will be sent out with corresponding unit data. For most units, this data doesn't need to be stored with the ingredient - the reference on the units table is enough, and the services will retrieve the right data. But an ingredient with a `custom` unit will additionally store custom unit data. When viewed, the ingredient will have custom singular and plural forms.

In future builds, custom units could be scaled to a point where users could create their own unit sets, and information collected about preferred units could be used to decide new types of units to add to the units table.

## API Documentation

### /users

#### POST /users

- Data Params

```javascript
//Required:
username = [string]; // The new username, must be unique.
first_name = [string]; // First name of user.
last_name = [string]; // Last name of user.
password = [string]; // Password, must pass validation.
```

- Success

```javascript
// Code 201
{
  "id": "427e70a0-fdc9-4903-bb1e-97f2e1de1b06",
  "first_name": "FirstName",
  "last_name": "LastName",
  "username": "testuser",
  "date_created": "2020-01-08T10:56:16.996Z"
}
```

- Errors:

```javascript
// Code: 400
// In event of missing field
{
  "error": "Missing [ username, first_name, last_name, password] in response body"
}

// Code: 400
// In event of password validation error
{
  "error": [
    "Password must be longer than 8 characters",
    "Password must be less than 72 characters",
    "Password must not start or end with empty spaces",
    "Password must not start or end with empty spaces",
    "Password must contain 1 upper case, lower case, number and special character"
  ]
}
```

- Sample Call:

```javascript
//req payload
username: 'testuser';
password: 'Password123!';
first_name: 'FirstName';
last_name: 'LastName';
```

#### GET /users

- Required Auth Header

```javascript
//Authorization: Bearer [jwt]
```

- Success

```javascript
// Code 200
// res.body
{
  "user": {
      "first_name": "Julia",
      "last_name": "Child",
      "username": "bonappetite"
  },
  "recipes": [ // List of user's recipes
    {
      "user_id": "9ba39ce8-0983-4c6c-a781-fae378838c16",
      "name": "Cast Iron Pizza with Fennel and Sausage",
      "author": "Claire Saffitz",
      "prep_time_hours": 0,
      "prep_time_minutes": 35,
      "instructions": "Place a rack in top-most position of...",
      "servings": 7,
      "id": "38f716f2-bf5c-4ce7-baab-d52cdc47de5b",
      "date_created": "2020-01-04T17:50:07.863Z"
    },
  ...]
  "recipeCount": 4
}
```

- Errors:

```javascript
// Code: 400
// In event of failed database service
{
  "error": "Something went wrong retrieving user data"
}

// Code: 401
// In event of missing authorization
{
  "error": "Missing bearer token"
}
```

### api/auth

#### POST /auth/login

- Data Params

```javascript
username = [string];
password = [string];
```

- Success

```javascript
// Code 200
{
  "authtoken":"...jwt token from username and id"
}
```

- Errors:

```javascript
// Code: 400
// In event of missing field
{
  "error": "Missing [ username, password] in response body"
}

// Code: 400
// In event of wrong username or password
{
  "error": "Incorrect username or password"
}
```

#### POST /auth/refresh

- Data Params

```javascript
user = [Object];
user.username = [string];
user.user_id = [string];
```

- Success

```javascript
// Code 200
{
  "authtoken":"...jwt token from username and id"
}
```

### api/recipes

#### GET /recipes

- Note: This is primarily for testing purposes and is not currently applied in client side.

- Success

```javascript
// Code 200
{
  "user": {
      "first_name": "Julia",
      "last_name": "Child",
      "username": "bonappetite"
  },
  "recipes": [
    {
      "user_id":"9ba39ce8-0983-4c6c-a781-fae378838c16",
      "name":"Cast Iron Pizza with Fennel and Sausage",
      "author":"Claire Saffitz",
      "prep_time_hours":0,
      "prep_time_minutes":35,
      "instructions":"Place a rack in top-most position of...",
      "servings":7,
      "id":"38f716f2-bf5c-4ce7-baab-d52cdc47de5b","date_created":"2020-01-04T17:50:07.863Z"
    },
  ...] //An array list of the recipe's ingredients.
  "recipeCount": 4
}
```

#### POST /recipes

- Data Params

```javascript
//req.body
name = [string]; // (Required) Name of the recipe.
author = [string]; // The author of the recipe
prep_time_hours = [integer]; // Number of hours it takes to prepare.
prep_time_minutes = [integer]; // Number of minutes it takes to prepare.
servings = [string]; // Number of servings the recipe
instructions = [string]; // (Required) Instructions for executing the ingredient.
ingredients = [Object]; // Contains ingredients lists.
ingredients.ingredientsAddList = [Array]; // (at least 1 item required) Required for POST request, contains the list of new ingredients for the recipe.
```

- Success

```javascript
// Code 200
// res.body
{
  "recipeId":"uuid" //the new recipe's id, generated as a unique uuid by the database.
}
```

- Errors:

```javascript
// Code: 400
// In event of failed database service
{
  "error": "Something went wrong retrieving user data"
}

// Code: 400
// In event of missing required field in recipe description.
{
  "error": "Missing [ name, instructions] in response body"
}

// Code: 400
// In event there are no ingredients
{
  "error": "Missing ingredients. Please enter at least one ingredient."
}
```

### api/recipes/:recipe_id

#### GET /recipes/:recipe_id

- URL Params

```javascript
:recipe_id = [uuid] // The ID of the recipe to retrieve.
```

- Success

```javascript
// Code 200
{
  "payload": {
    "recipe": {
      user_id: "9ba39ce8-0983-4c6c-a781-fae378838c16"
      name: "Tortilla Soup"
      author: "Lindsay Ostrom"
      prep_time_hours: 0
      prep_time_minutes: 15
      instructions: "Place all soup ingredients in..."
      servings: 5
      id: "4a8d066b-9b5a-425a-9ef3-f04f364d3460"
      date_created: "2020-01-04T17:50:07.863Z" //Date object in database
    }
    "ingredients": [
      {
        id: "dc615e5a-2689-49c5-8460-0d03fba05210",
        amount: 1,
        unit_set: "hlv",
        ing_text: "onion, chopped",
      …}
    ] // An array with the recipe's ingredients.
  }
}
```

- Errors:

```javascript
// Code: 404
// In event the recipe doesn't exist
{
  "error": "Sorry, that recipe doesn't exist"
}

// Code: 400
// In event of failed database service
{
  "error": "Couldn't retrieve this recipe"
}
```

#### PATCH /recipes:recipe_id

- URL Params

```javascript
:recipe_id = [uuid] // The ID of the recipe to retrieve.
```

- Data Params

```javascript
//req.body
name = [string]; // (Required) Name of the recipe.
author = [string]; // The author of the recipe
prep_time_hours = [integer]; // Number of hours it takes to prepare.
prep_time_minutes = [integer]; // Number of minutes it takes to prepare.
servings = [string]; // Number of servings the recipe
instructions = [string]; // (Required) Instructions for executing the ingredient.
ingredients = [Object]; // Contains ingredients lists.
ingredients.ingredientsAddList = [Array]; // (at least 1 item required) Required for POST request, contains the list of new ingredient objects for the recipe.
ingredients.ingredientsEditList = [Array]; // includes a list of ingredient objects to be edited based on id and fields.
ingredients.ingredientsDeleteList = [Array]; //includes a list of uuid strings, the IDs of associated ingredients in the database to be deleted.
```

- Success

```javascript
// Code 200
{
  "payload": {
    "recipe": {
      user_id: "9ba39ce8-0983-4c6c-a781-fae378838c16"
      name: "Tortilla Soup"
      author: "Lindsay Ostrom"
      prep_time_hours: 0
      prep_time_minutes: 15
      instructions: "Place all soup ingredients in..."
      servings: 5
      id: "4a8d066b-9b5a-425a-9ef3-f04f364d3460"
      date_created: "2020-01-04T17:50:07.863Z" //Date object in database
    }
    "ingredients": [
      {
        id: "dc615e5a-2689-49c5-8460-0d03fba05210",
        amount: 1,
        unit_set: "hlv",
        ing_text: "onion, chopped",
      …}
    ] // An array with the recipe's ingredients.
  }
}
```

- Errors:

```javascript
// Code: 404
// In event the recipe doesn't exist
{
  "error": "Sorry, that recipe doesn't exist"
}

// Code: 400
// In event of failed database service
{
  "error": "Couldn't retrieve this recipe"
}
```

#### DELETE /recipes:recipe_id

- URL Params

```javascript
:recipe_id = [uuid] // the id of the recipe to delete.
```

- Success:

```javascript
// Code: 200
// res.body
'Success';
```

- Errors:

```javascript
// Code: 404
// In event the recipe doesn't exist
{
  "error": "Sorry, that recipe doesn't exist"
}
```

### /units & /units/:unit_set

#### GET /units

- Note:

  The data in the units table is meant to be static and predefined. If running locally, the units table should be migrated and populated before recipes and ingredients - the client will break down otherwise.

- Success:

```javascript
// Code: 200
// res.body
{
  "units":
    //Non-convertible units.
    "base | apprx": [
      {
        "id": 1, //The unit's id
        "unit_set":"none", //The unit's primary name.
        "unit_data": {
          "class":"base", //The class of the unit.
          "unit_plural":"", //How the unit should be displayed if the ingredient amount calls for plural form.
          "unit_single":"" //How the unit should be displayed if the ingredient amount calls for singular form.
        }
      },
    ...],

    //Convertible units
    "us | metric":[
      {
        "id": 47,
        "unit_set": "oz",
        "unit_data": {
          "class":"US",
          "cnv_to":"g", //The unit it converts to
          "cnv_ratio":"28.3495", //The ratio to multiply the unit by to convert it to the other unit.
          "unit_abbr":"oz",
          "unit_plural":"ounces",
          "unit_single":"ounce"
        }
      },
      ...]
}
```

- Errors:

```javascript
// Code: 404
// In event the units don't exist in the database
{
  "error": "Sorry, the units don't exist"
}
```

### GET units/:unit_set

- Note:

  Retrieves unit data by unit set. Doesn't work for custom unit sets, the unit data here is only retrieved with a defined ingredient.

- Success:

```javascript
// Code: 200
// res.body
{
  "class": "Approximate", //The unit's class
  "unit_plural": "truckload", // plural form
  "unit_single": "truckloads" // singular form
}
```

- Errors:

```javascript
// Code: 404
// In event the unit doesn't exist in the database
{
  "error": "Sorry, that unit doesn't exist"
}
```

### /convert

#### GET /convert/:amount/:unitSet

- URL Params:

```javascript
amount = [Integer]; //The amount of the ingredient, eg. the 1 in '1 lb' or the 3 in '3 sprigs'
unitSet = [string]; //The abbreviation (abbr) of the unit set of the ingredient to convert FROM.
```

- Success

```javascript
// Code: 200
// res.body (if sent /convert/3/lb)
{
  "amount":1.362,
  "class":"Metric",
  "unit_abbr":"kg",
  "unit_plural":"kilograms",
  "unit_single":"kilogram"
}
```
