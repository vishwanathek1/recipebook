# Steps to run Recipebook website

## Frontend

### `npm start`

Runs the client in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Backend

### Setup Postgres Container

Prerequisite: 
Docker Engine needs to be installed

Run the script `runThisToBuildRunPgContainer.sh` 

### `npm run server`

Runs the express server on port 5002\

## Summary
The recipebook website allows a particular user to create and manage smoothie recipes.
This includes basic authentication on login, session management, CRUD on recipes with support for adding tags.
This also includes search based on title, name, ingredients and tags.