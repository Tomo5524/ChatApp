# MERN: Full-stack Real-Time Chat Application

## [Live](https://mern-realtime-chat-app.netlify.app/)

#### Introduction

The MERN stack (**Mongo DB**, **Express.js**, **React.js** and **Node.js**) is a popular stack for building full-stack web-based applications because of its simplicity and ease of use. With the explosive popularity and the growing maturity of the JavaScript ecosystem, the MERN stack has been the go-to stack for a large number of web applications. I built this chat application because I wanted to create something users can actually enjoy.
<br/><br/>

This is a full-stack chat application that can be up and running with just a few steps.
Its frontend is built with [Bootstrap](https://getbootstrap.com/) running on top of React.
The backend is built with Express.js and Node.js.
Real-time message broadcasting is developed using [Socket.IO](https://socket.io/).

### Features

This application provides users with the following features
<br/>

- Authentication using **JWT Tokens**
- **Public Chat** which can be used by anyone using the application to broadcast messages to everyone else.
- **Private Chat** functionality where users can chat with other users privately.
- Real-time updates to the user list, conversation list, and conversation messages

#### Screenshots

##### Chat Room

<img width="746" alt="Chat Room" src="https://user-images.githubusercontent.com/35819620/118435923-d4abe580-b71a-11eb-896c-85d49aaeabaa.png">
<br/><br/>

##### Choose Public Room

<img width="1180" alt="Public Room" src="https://user-images.githubusercontent.com/35819620/118436194-57cd3b80-b71b-11eb-9a51-fff3233260b4.png">

<br/><br/>

##### Login

<img width="1160" alt="Login" src="https://user-images.githubusercontent.com/35819620/118436376-b09cd400-b71b-11eb-8b4e-5d775bfc6389.png">

<br/><br/>

##### Sign Up

<img width="1203" alt="Sign up" src="https://user-images.githubusercontent.com/35819620/118436329-9c58d700-b71b-11eb-8991-a1778b8fa68b.png">


### How to use

You can get this application up and running with just a few steps because it has both the frontend and the backend in a single repository. Follow the steps below to do so.

1. Clone this repo `~$ git clone <SSH URL> `
2. Once you have the repo, you need to install its dependencies. So using a terminal, move into the root directory of the project and execute `npm install` to install the dependencies of the Node.js server and then run `npm run client-install` to install the dependencies of the frontend. The second command is a custom command that I wrote to simplify the installation process. As for client (front-end), navigate to client folder and execute `yarn`
3. This application uses MongoDB as its Database. So make sure you have it installed. You can find detailed guides on how to do so [here](https://docs.mongodb.com/manual/administration/install-community/). Once installed, make sure that your local MongoDB server is not protected by any kind of authentication. If there is authentication involved, make sure you edit the `mongoURI` in the enviromental variable
4. Finally, all you have to do is simply run `npm run start` and run `yarn start` for client

### Things to note

- The frontend is created using [create-react-app](https://github.com/facebook/create-react-app)
- Database connections in the backend are handled using the [Mongoose ORM](https://mongoosejs.com/)
- Code quality is ensured using (ESLint)[https://eslint.org/]

<!--
### Disclaimer

This repository contains beginner level code and might contain some things I wish to change or remove. I have not maintained this for quite some time, but now I am trying to slowly fix these issues. You are welcome to open issues if you find any and I will accept PR's as well.
<br/><br/>

-->

Now, you are ready to chat! 💻 🍺 🔥 🙌
