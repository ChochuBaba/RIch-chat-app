# Chat App

Welcome to the Chat App repository! This is a web application built using web sockets and React.js for the front end. In this README file, you will find instructions on how to install, deploy, run, and use the web application.

## Installation

To install and set up the Chat App, follow these steps:

1. Clone the repository to your local machine using the following command:

   ```
   git clone https://github.com/ChochuBaba/RIch-chat-app
   ```

2. Navigate to the project directory:

   ```
   cd chat-app
   ```

3. Install the dependencies by running the following command:

   ```
   npm install
   ```

## Deployment

To deploy the Chat App, you have multiple options. Here are a few common methods:

- **Local Development**: If you want to run the application locally for development purposes, you can use the development server provided by React.js. Run the following command in the client directory:

  ```
  npm start
  ```

  This will start the development server and open the application in your default browser.

  After this the front-end would be completely loaded now to load the server to facilitate the interaction

  Go to the server folder and inside it run

  ```
  npm run dev
  ```

  This will run the custom script which will get the server going and running.
  

- **Hosted Deployment**: To deploy the application to a hosting platform, such as GitHub Pages, Netlify, or Heroku, follow the specific deployment instructions for the platform you choose. Typically, you need to configure the build and deployment settings, including the build command, environment variables, and domain settings.

- setting the build command to

 ```
  npm run build
  ```


## Usage

Once the Chat App is deployed and running, you can access it using a web browser. Here are the basic steps to use the application:

1. Open your web browser and navigate to the URL where the application is deployed.

2. You will be presented with a login page. Type in the username and select from the list of rooms available to join yourself into.

3. After logging in, you will be redirected to the chat interface. Here, you can see a list of available users in your specific chat room and the entire of log of messages.

4. In the chat screen, you can send messages by typing in the input field and clicking the send button. Your messages will be displayed in the chat window along with messages from other participants in the room.

5. The text box contains various formatting options according to which you can customize and format the message you want to send. (Bold, Italic, Strikethrough, Hyperlink, Bulleted List, Numbered List, Blockquote ,Code Snippet ,Code Block ,Image upload using URL, Emoji, Mention Someone in the chat room.

7. To leave a chat room, click on the "Leave Room" button.

That's it! You are now ready to use the Chat App and engage in conversations with other users.

## Acknowledgements

- [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) - A communication protocol that provides full-duplex communication channels over a single TCP connection.
- [Create React App](https://create-react-app.dev/) - A toolchain for creating React applications with no build configuration.
- [Socket.IO](https://socket.io/) - A library that enables real-time, bidirectional, and event-based communication between the browser and the server.
- [React-draft-wysiwyg](https://www.npmjs.com/package/react-draft-wysiwyg)- The library to create the rich text box for formatting.
