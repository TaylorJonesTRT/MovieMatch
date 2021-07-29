![logo](https://i.imgur.com/JE5v1H6.png)

![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

MovieMatch! is a web app that I decided to create after having a hard time with my significant other
when trying to figure out what to watch on any given night.

## ![alt text](/ghImages/moviematch.png 'Logo Title Text 1')

## HOW TO RUN THE APP

(This app requires you to already have Mongo installed locally)

First you will need to create a GitHub OAuth app in your GitHub developer settings.

Take the .env.example that you cloned with the repo and rename it just to .env. Update the variables inside with what you have.

CD into backend/src and create a directory named `data`.

Now run `npm i` to install all of the needed packages

Run both `mongod --dbpath=./data` and `npm run dev`

Now cd into the frontend folder and also run `npm i` to install all needed packages

Run the following command `npm start` in both the backend and frontend folders and everything should be running!

---

## WHAT WAS USED

This project utilizes Typescript both in the frontend (bootstrapped with create-react-app)
and the backend (an express based RESTful api server).

The backend itself takes advantage of MongoDB by using Mongoose to interface with it. MongoDB stores
users and their movies so that they can be queried at a later time (like when viewing all of your
liked movies in My Stuff!).

User authentication is handled by PassportJS and its GitHub strategy. Users are logged in via GH and
a cookie is saved (this cookie has also been encrypted to be a JWT). The JWT is sent with
the requests that need it to authenticate a user to make sure one is logged in and to make sure
that a movie is being saved to the proper place and user.

All API requests made are done using Axios.

Thank you Fontawesome for the icons!
