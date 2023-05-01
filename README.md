# Chatzilla by OYELEKE ISREAL TIMILEHIN

## Test server is hosted at:https://chatzilla.onrender.com

## Test Ui is hosted at:https://golden-naiad-942e64.netlify.app/login

- [Key Features](#key-features)
- [Technologies used](#technologies-used)
  - [Client](#client)
  - [Server](#server)
  - [Database](#database)
- [Configuration and Setup](#configuration-and-setup)
- [Troubleshooting](#troubleshooting)

## Key Features

- Sign up user
- Sign in user
- view chats,
- initialize chats,
- send messages using socket.io
- Multiple user registration.
- Authentication using jsonwebtoken (jwt)

## Technologies used

This project was created using the following technologies.

#### Client

- React JS
- Redux (for managing and centralizing application state)
- React-router-dom (To handle routing)
- Axios (for making api calls)
- styled-components
- Material UI & CSS Module (for User Interface)
- React Hooks
- Custom React Hooks
- React Context

#### Server

- Express
- Mongoose
- JWT (For authentication)
- bcryptjs (for data encryption)
- Jest

#### Database

MongoDB (MongoDB Atlas)

## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal

- cd client and create a .env file in the root of your client directory.
- Supply the following credentials

url of api server:

```
REACT_APP_BASE_URL=

```

```
$ cd client
$ npm install (to install client-side dependencies)
$ npm start (to start the client)
```

In the second terminal

- cd server and create a .env file in the root of your server directory.
- Supply the following credentials

```
DB_URL =
ACCESS_TOKEN_SECRET=
UI_BASE_URL=


```

Please follow [This tutorial](https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i) to create your mongoDB connection url, which you'll use as your DB_URL

```
$ cd server
$ npm install (to install server-side dependencies)
& npm start (to start the server)
```

```

```
