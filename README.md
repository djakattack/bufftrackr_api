# BUFF TRACKER (API)

<!-- This document is meant to serve as a standard operating procedure (SOP) for the construction of the back end code base for a MERN stack application. Much of this code was written following a tutorial from Traversy media. The intention behind much of what is written here is to allow an individual with minimal experience coding to follow the instructions and perfectly reconstruct an exact duplicate of this application (minus design details) as well as provide support for some issues that may crop up during that process (provided the individual experience is similar or identical to my own). -->

<!-- ## Assumptions Made in this Document -->

<!-- Should the reader chose to replicate this project, it should be known that I am assuming you have a superficail familiarity with using a terminal/gitbash application as well as interacting with GitHub.

This project utilizes two separate code bases to function as an exercise in me learning more about the concept of _separation of concerns_ as well as learning more about the interaction between multiple repos. To view the code base for the front-end of this application, you can check out the [Client Repo](https://github.com/djakattack/bufftrack-client-beta).

Some more in-depth SOPs are included within this repository.   -->

<!-- ## **Technology Used** -->

<!-- - VSCode Editor - Text editor.
- ES6+ Syntax - Language for structuring/promising
- Async / Await - Front and Back End
- React Hooks - Functional components
- Redux with DevTools - State management
- JWT (JSON Web Tokens) - Authentication Something better?
- Postman HTTP Client - To test HTTP endpoints
- Mongoose - Database abstraction layer
- MongoDB Atlas - Database
- Bcrypt Password Hashing - Something better?
- Heroku & Git Deployment
- React withou CRA
- SASS for styles -->

<!-- ## **Procedure** -->

<!-- ### MongoDB (Atlas) Setup -->

<!-- Mongo is a noSQL (non-relational) database that is different from mySQL and PostGres which uses documents rather than tables/columns to organize data. The language used is very similar to JSON syntax, so it pairs well with JS or Node applications. MongoDB Atlas, the cloud solution, is used in this project because it is easily managed and also because this application will be deployed to Heroku, which does not allow for local instances of Mongo. The cloud database removes the need to use another service for the database when hosting to something like Heroku. Make this sound more intelligent -->

<!-- The Traversy Media tutorial I am using on Udemy to complete this project is somewhat out of date as the way to do some things with MongoDB Atlas has changed. As such, I have detailed a more up-to-date list of instructions. -->

<!-- #### Creating a Cluster in MongoDB Atlas -->

<!-- 1. Create a [MongoDB](http://mongodb.com/) account.
2. Once logged in, click "Visit MongoDB Atlas," if the account overview page is visible. SS-RM-001
3. Create a new project. SS-RM-002
4. Select "Build a Cluster"
5. For the provider select AWS.
6. For default region select "North America"
7. For the tier plan select the M0 (free forever) plan. This plan is used for development environments and is not suitable for production environments.
8. No additional settings are necessary.
9. Give the cluster a name.
10. Select "create cluster."
11. Atlas will create the cluster which can take an amount of time. -->

<!-- #### Adding Security Features to the MongoDB Atlas cluster -->

<!-- 1. Using the navigation bar on the left side of the screen, select "Database Access."
2. On the following screen, select "Add New Database User" -->
<!-- Certificate, AWS IAM, vs Password -->
<!-- 3. Create a user to your specifications. You can select from three authentication methods (password, certificate, or AWS IAM).
4. Once your user has been created, select "network access."
5. On the following screen, select "Add IP address." From here you can chose to whitelist a specific IP address to allow access to the database, or allow access from anywhere. This is contingent upon what stage of development you are in and also your preference for level of security. -->

<!-- ### Creating the Express Backend -->

<!-- 1. Create a .gitignore file to exclude `node_modules/` and `.env`. If you are using a Mac, you also want to exclude the `.DS_Store` folder.
2. If you did not start by cloning a repository created on the GitHub website, enter the `git init` command in the termianl.
3. Run `npm init` in the terminal to create a package.json file by following the prompts that follow.
4. Install NPM packages (see Dependencies and Developer Dependencies list). Use `npm i` for dependnecies and `npm i -D` for developer dependencies. -->

<!-- ## DEPENDENCIES -->

<!-- | PACKAGE                                                              | DETAILS/PURPOSE                                                                        |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [express](https://www.npmjs.com/package/express)                     | Main framework.                                                                        |
| [express-validator](https://www.npmjs.com/package/express-validator) | Data Validation for post request to API. If fields are missing it will throw an error. |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs)                   | Password encryption.                                                                   |
| [config](https://www.npmjs.com/package/config)                       | Global variables                                                                       |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)           | User Validation                                                                        |
| [mongoose](https://www.npmjs.com/package/mongoose)                   | Database interaction                                                                   |
| [cors](https://www.npmjs.com/package/cors)                           | Express middleware                                                                     | -->

<!-- ## DEV DEPENDENCIES -->

<!-- | PACKAGE                                          | DETAILS/PURPOSE                                           |
| ------------------------------------------------ | --------------------------------------------------------- |
| [nodemon](https://www.npmjs.com/package/nodemon) | Constant refreshing of the backend when server is active. | -->

<!-- ## EXTRA DEPENDENCIES -->

<!-- | PACKAGE                                                          | DETAILS/PURPOSE                           |
| ---------------------------------------------------------------- | ----------------------------------------- |
| [gradient-string](https://www.npmjs.com/package/gradient-string) | Aesthetic choice for terminal print outs. | -->

<!-- ## Resources -->

<!-- - [Traversy Media](https://www.traversymedia.com). Web Development Tutorial and Courses delivered by [Brad Traversy](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA?sub_confirmation=1&feature=subscribe-embed).
- [Udemy](http://www.udemy.com). Catalog of short and long courses, some of which provide instructional material for coding/web development.
- [NPM](https://www.npmjms.com). Catalog of all available NPM package that also details how each one may be used. -->

<!-- ##### _Last Updated_: 20211501 -->
