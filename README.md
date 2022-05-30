# nara-book-search

MERN Stack App for Book Search Engine using Google Books API

# 21 MERN: Book Search Engine

## Table of Contents 

- [About Task](#about-task)
- [User Story](#user-story)
- [Getting Started](#getting-started)
- [Database Models](#database-models)
- [My Solution](#my-solution)
- [Live](#live)

## About Task

I refactored this application to a GraphQL API built with Apollo Server from a fully functioning Google Books API search engine built with a RESTful API. The app was built using the MERN stack with a React front end, MongoDB database, and Node.js/Express.js server and API. 

To complete the assignment, the following tasks are done:

1. Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

2. Modified the existing authentication middleware so that it works in the context of a GraphQL API.

3. Implemented an Apollo Provider so that requests can communicate with an Apollo Server.

**Important**: This app is deployed to Heroku with a MongoDB database using MongoDB Atlas.  

## User Story

```md
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```

## Getting Started

This application’s folder structure follows a full-stack app divided by client (front-end) and server (back-end) directories. This application uses the following packages and dependencies: 

* /client - side

  - [apollo-client](https://www.apollographql.com/docs/react/) is a comprehensive state management library to manage both local and remote data with GraphQL. 
  - [graphql](https://www.npmjs.com/graphql) is a query language for APIs and a runtime for fulfilling queries with the app's existing data. 
  - [jwt-decode](https://jwt.io/) JSON Web Token (JWT) is for securely transmitting information between parties as a JSON object.
  - [react](https://reactjs.org/) is a JavaScript library for building UIs
  - [react-dom](https://reactjs.org/docs/react-dom.html) package provides DOM-specific methods that can be used at the top level of our app and as an escape hatch to get outside the React model
  - [react-router-dom](https://www.npmjs.com/package/react-router-dom) contains bindings for using React Router in web applications
  - [react-bootstrap](https://www.npmjs.com/package/react-bootstrap) replaces the Bootstrap JavaScript for styling.
  - [react-error-overlay](https://www.npmjs.com/package/react-error-overlay?activeTab=versions) is used to debug front-end code.

* /server - side

  - [apollo-server-express](https://www.npmjs.com/package/apollo-server-express) is for the Express integration of Apollo Server
  - [graphql](https://www.npmjs.com/graphql) is a general-purpose library and can be used both in a Node server and in the browser
  - [express](https://www.npmjs.com/package/express) is to provide tooling for HTTP servers, making it a great solution for single-page applications, websites, hybrids, or public HTTP APIs
  - [mongoose](https://www.npmjs.com/package/mongoose) is a MongoDB object modeling tool designed to work in an asynchronous environment
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  is a compact URL-safe means of representing claims to be transferred between two parties
  - [dotenv package](https://www.npmjs.com/package/dotenv) to use environment variables
  - [bcrypt package](https://www.npmjs.com/package/bcrypt) to hash passwords

**Note**: The [concurrently](https://www.npmjs.com/package/concurrently) is an npm package that allows us to run multiple commands concurrently. This dev dependency package is used during the development stage.

## Database Models

### Database: `book-database` 

This MongoDB database is created using `mongoose` ODM library. Mongoose provides a straight-forward, schema-based solution to model data.

### Models:

- User (referenced document)
- Book (SCHEMA ONLY - embedded document) 

If you want to see more about the Model Schema, check out [here](https://github.com/Nara1469/nara-book-search/wiki/Models "link to Models").

### Schemas:

To replace the existing RESTful API with the GraphQL API, the following changes were made in the Schemas in the back-end and added custom GraphQL queries and mutations in the front-end.

  * Back-End: In the server side, an Apollo Server needs to be defined in schema settings with resolvers and typeDefs

	* `index.js`: Export own typeDefs and resolvers.

	* `resolvers.js`: Defined the query and mutation functionality to work with the Mongoose models.

		**Hint**: Used the functionality in the `user-controller.js` as a guide.

	* `typeDefs.js`: Defined the necessary `Query` and `Mutation` types:

		* `Query` type:

			* `me`: Which returns a `User` type.
		
		* `Mutation` type:

			* `login`: Accepts an email and password as parameters; returns an `Auth` type.

			* `addUser`: Accepts a username, email, and password as parameters; returns an `Auth` type.

			* `saveBook`: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. 

			* `removeBook`: Accepts a book's `bookId` as a parameter; returns a `User` type.
			
		* `User` type:

			* `_id`

			* `username`

			* `email`

			* `bookCount`

			* `savedBooks` (an array of the `Book` type.)

		* `Book` type:

			* `bookId` (Not the `_id`, but the book's `id` value returned from Google's Book API.)

			* `authors` (An array of strings, as there may be more than one author.)

			* `description`

			* `title`

			* `image`

			* `link`

		* `Auth` type:

			* `token`

			* `user` (References the `User` type.)

  * Front-End: In the client side, an Apollo Server uses GraphQL queries and mutations to fetch and modify data

	* `queries.js`: The query `GET_ME` execute the `me` query set up using Apollo Server.

	* `mutations.js`:

		* `LOGIN_USER` execute the `loginUser` mutation set up using Apollo Server.

		* `ADD_USER` execute the `addUser` mutation.

		* `SAVE_BOOK` execute the `saveBook` mutation.

		* `REMOVE_BOOK` execute the `removeBook` mutation.

## My Solution

To replace the existing RESTful API with the GraphQL API, the following changes made both in the back-end and front-end:
  * Added Schemas with resolvers and typeDefs in the back-end to replace the Routes and Controllers of the existing code.
  * Added own GraphQL queries and mutations in the front-end to replace API.js of the existing code. 

### Back-End Completions

* Implemented an Apollo Server and apply it to the Express.js server as middleware. `server.js`

* Modified the existing authentication middleware to work in the context of a GraphQL API. `auth.js`

### Front-End Completions

* Added an Apollo Provider so that the application can communicate with the Apollo Server. `App.js`
	
* `SearchBooks.js`:

	* Replaced the Apollo `useMutation()` Hook to execute the `SAVE_BOOK` mutation in the `handleSaveBook()` function instead of the `saveBook()` function imported from the `API` file.

	* Copied the `searchGoogleBooks()` function imported from the `API` file, then added in `SearchBooks.js`.

* `SavedBooks.js`:

	* Replaced the `useEffect()` Hook that sets the state for `userData` to `userDataLength`. 

	* Added the `useQuery()` Hook to execute the `GET_ME` query on load and save it to a variable named `userData` instead of the `useEffect()` Hook that sets the state for `UserData`. 

	* Added the `useMutation()` Hook to execute the `REMOVE_BOOK` mutation in the `handleDeleteBook()` function instead of the `deleteBook()` function that's imported from `API` file.

* `SignupForm.js`: Replaced the `addUser()` functionality imported from the `API` file with the `ADD_USER` mutation functionality.

* `LoginForm.js`: Replaced the `loginUser()` functionality imported from the `API` file with the `LOGIN_USER` mutation functionality.


## Live

This web application is deployed to Heroku.com. Here is a link to the deployed website. [Heroku - Book Search](https://fierce-woodland-08736.herokuapp.com/)

If you have any questions about the repo, open an issue or contact me directly at naraamtm@gmail.com. Here is a link to this application repo on [GitHub](https://github.com/Nara1469/nara-book-search).

A user can type a search term (in this case, "star wars") in a search box and the results appear:

![Animation shows "star wars" typed into a search box and books about Star Wars appearing as results.](./assets/21-mern-homework-demo-01.gif)

The user can save books by clicking "Save This Book!" under each search result, as shown in the following animation:

![Animation shows the user clicking "Save This Book!" button to save books that appear in search results. The button label changes to "Book Already Saved" after it is clicked and the book is saved.](./assets/21-mern-homework-demo-02.gif)

The user can view their saved books on a separate page, as shown in the following animation:

![The Viewing Lernantino's Books page shows the books that the user Lernaninto has saved.](./assets/21-mern-homework-demo-03.gif)