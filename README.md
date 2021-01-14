# BUFF TRACKER (API)

## Technology Used

- VSCode Editor - Text editor.
- ES6+ Syntax - Language for structuring/promising
- Async / Await - Front and Back End
- React Hooks - Functional components
- Redux with DevTools - State management
- JWT (JSON Web Tokens) - Authentication <!--Something better?-->
- Postman HTTP Client - To test HTTP endpoints
- Mongoose - Database abstraction layer
- MongoDB Atlas - Database
- Bcrypt Password Hashing - <!--Something better?-->
- Heroku & Git Deployment
- React withou CRA
- SASS for styles

## Procedur

### MongoDB (Atlas) Setup

Mongo is a noSQL (non-relational) database that is different from mySQL and PostGres which uses documents rather than tables/columns to organize data. The language used is very similar to JSON syntax, so it pairs well with JS or Node applications. MongoDB Atlas, the cloud solution, is used in this project because it is easily managed and also because this application will be deployed to Heroku, which does not allow for local instances of Mongo. The cloud database removes the need to use another service for the database when hosting to something like Heroku. <!-- Make this sound more intelligent -->

1. Create a [MongoDB](http://mongodb.com/) account.
2. Once logged in, click "Visit MongoDB Atlas," if the account overview page is visible. <!--SS-RM-001-->
3. If necessary, create a new project. <!-- SS-RM-002 -->

## Notes

- This project utilizes two separate code bases to function as an exercise in me learning more about the concept of _separation of concerns_ as well as learning more about the interaction between multiple repos. To view the code base for the front-end of this application, you can check out the [Client Repo](https://github.com/djakattack/bufftrack-client-beta).

## Resources

- Traversy Media MERN Stack Tutorial
- Udemy
