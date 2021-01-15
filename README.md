# BUFF TRACKER (API)

This document is meant to serve as a standard operating procedure (SOP) for the construction of the back end code base for a MERN stack application. Much of this code was written following a tutorial from Traversy media. The intention behind much of what is written here is to allow an individual with minimal experience coding to follow the instructions and perfectly reconstruct an exact duplicate of this application (minus design details) as well as provide support for some issues that may crop up during that process (provided the individual experience is similar or identical to my own).

## Assumptions Made in this Document

Should the reader chose to replicate this project, it should be known that I am assuming you have a superficail familiarity with using a terminal/gitbash application as well as interacting with GitHub.

This project utilizes two separate code bases to function as an exercise in me learning more about the concept of _separation of concerns_ as well as learning more about the interaction between multiple repos. To view the code base for the front-end of this application, you can check out the [Client Repo](https://github.com/djakattack/bufftrack-client-beta).

<!-- Some more in-depth SOPs are included within this repository.   -->

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

## Procedure

### MongoDB (Atlas) Setup

Mongo is a noSQL (non-relational) database that is different from mySQL and PostGres which uses documents rather than tables/columns to organize data. The language used is very similar to JSON syntax, so it pairs well with JS or Node applications. MongoDB Atlas, the cloud solution, is used in this project because it is easily managed and also because this application will be deployed to Heroku, which does not allow for local instances of Mongo. The cloud database removes the need to use another service for the database when hosting to something like Heroku. <!-- Make this sound more intelligent -->

#### Creating a Cluster in MongoDB Atlas

1. Create a [MongoDB](http://mongodb.com/) account.
2. Once logged in, click "Visit MongoDB Atlas," if the account overview page is visible. <!--SS-RM-001-->
3. Create a new project. <!-- SS-RM-002 -->
4. Select "Build a Cluster"
5. For the provider select AWS.
6. For default region select "North America"
7. For the tier plan select the M0 (free forever) plan. This plan is used for development environments and is not suitable for production environments.
8. No additional settings are necessary.
9. Give the cluster a name.
10. Select "create cluster."
11. Atlas will create the cluster which can take an amount of time.

#### Adding Security Features to the MongoDB Atlas cluster

1. Select the cluster you'll be using for this project.
2. Set security credentials for the cluster.
3. Whitelist the IP for additional security

## Resources

- Traversy Media MERN Stack Tutorial
- Udemy
