# User admin database using demo, Passport, Session cookies, Roles and Permissions.

## Summary
Dev work in progress

## CRUD features
Create new user, set roles
Edit and existing user, set roles
Delete a user


## Use case:
use ./tests/roles.rest AND ./tests/user.rest create configure users vua API


## TODO NEXT:
Add input validation when create and update user



## Modules used:
npm i dotenv express mongoose express-session passport passport-local bcryptjs passport-local-mongoose express-flash ejs method-override uuid


# .env file:
LOCALHOST_PORT=3000
MONGODB_URL=mongodb://localhost:27017/user-admin-demo

# git notes:
echo "# user-access-controll-demoV3" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/adriangbarnett/user-access-controll-demoV3.git
git push -u origin main

…or push an existing repository from the command line
git remote add origin https://github.com/adriangbarnett/user-access-controll-demoV3.git
git branch -M main
git push -u origin main
