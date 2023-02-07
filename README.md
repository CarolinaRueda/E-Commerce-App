# E-Commerce App

Hello!! Welcome to the second phase of the [E-Commerce-App-Rest-API](https://github.com/CarolinaRueda/E-Commerce-APP-Rest_API), this time it's a fullstack PERN app project, an E-Commerce with client and backend implemented.

---

### Description

An application where I combined my knowledge with postgres, express, react and node to replicate the same functionability of a real E Commerce website.

---

### Setup

1. Run `npm install` in the root, frontend and backend directories so every dependency in the package.json file installs correctly.
2. Pass the correct information to the .env, config, dbConfing and databaseSetup files to connect the program with a database.
3. In the backend folder run `node databaseSetup` to create the necessary tables for the API to work with.
4. Create a [Stripe] account (https://stripe.com/), set up a company, add the respective products that will match the products in your database and in turn update your database in the _products_ table in the _stripe_ column with the respective _Stripe_ string.
5. In the root `npm run dev` to start both server and client for the app work properly.

## Dependencies

### backend

- bcrypt
- cookie-parser
- cors
- dotenv
- express
- express-async-handler
- express-session
- passport
- passport-google-oauth2
- passport-local
- pg
- stripe

### frontend

- @reduxjs/toolkit
- axios
- js-cookie
- react
- react-dom
- react-icons
- react-redux
- react-router-dom
- react-scripts

### devDependencies

- nodemon (backend)
- concurrently (root)

---

### Previews

![App Preview Image 1](/preview/1.jpg "App Preview Image 1")

![App Preview Image 2](/preview/2.jpg "App Preview Image 2")

![App Preview Image 3](/preview/3.jpg "App Preview Image 3")

![App Preview Image 4](/preview/4.jpg "App Preview Image 4")

![App Preview Image 5](/preview/5.jpg "App Preview Image 5")

![App Preview Image 6](/preview/6.jpg "App Preview Image 6")

![App Preview Image 7](/preview/7.jpg "App Preview Image 7")

![App Preview Image 7](/preview/8.jpg "App Preview Image 7")
