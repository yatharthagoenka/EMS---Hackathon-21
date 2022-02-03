# Online Event Management System

<img alt="HTML" src="https://img.shields.io/badge/HTML-•-red" /> <img alt="CSS" src="https://img.shields.io/badge/CSS/SCSS-•-orange" /> <img alt="JS" src="https://img.shields.io/badge/JS-•-blue" />
<img alt="NodeJS" src="https://img.shields.io/badge/NodeJS-•-brown" />
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-•-green" />
<img alt="EXPRESS" src="https://img.shields.io/badge/EXPRESS-•-pink" />
<img alt="PASSPORT" src="https://img.shields.io/badge/PASSPORT-•-black" />
</br></br>

> The project is hosted online through Heroku - [Check it out](https://ews-hackathon.herokuapp.com/)


<img src="public\resources\landing_page.png" align="left" width="450" hspace="10" vspace="10">
</br>

A user-organised event management system that lets you log-in using the registered credentials, view/manage/update/delete the upcoming events, categorising them with corresponding tags through `CRUD` operations using RESTful API.

The application's backend is supported through a self-designed system hosted remotely on `MongoDB Atlas`, while the complete project is deployed online through `Heroku`.
</br></br>

## Features
 - Users can register and login using their EMail IDs and passwords set while signing up. Passwords are encrypted through `Bcrypt` and `Passport` middleware for higher security.
 - The landing page and each subsequent route features a modern UI designed through `CSS/SCSS and JS`.
 - Exploits `RESTful API` supported through MongoDB Atlas, managed by `NodeJS`.
 - The website is integrated with `ExpressJS` as its templating engine, providing the users with multiple routes to Tags, Events, Reviews etc.
 - Implemented `JSON Web Token` for user session storage.

</br>

## Running in production mode

1. Pull down the code locally
2. Open the project in your preferred IDE.
3. The cloned branch opens to the root directory for the application.
4. Run the following commands to set up a development environment/server.
```
npm run devStart
```
5. Other npm scripts for reference.
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "devStart": "nodemon server.js"
}
```
</br>

## User Guide 

- Sign-Up / Login
    - Pick a username that suits your description for identification
    - Use a 10-digit mobile number for registering
    - Sign in to your account using the corresponding username and password.
> All fields are case sensitive.

- Landing Page
    - Showcasing the various aspects of the system.
    - Hosts a timeline, updated according to the events posted by the users in real-time.

- Events 
    - Showcasing events finalized through the admin panel show up in the events tab.
    - Styling Credits: Bootstrap Carousel (CSS)

- Organize 
    - Suggest a new event, associating it with a corresponding tag that would be reviewed and taken into due consideration by the administrators.
    - New tags can be suggested by the users, if not already present.
    - Once finalised, the post will show up in the Events tab.

- Comments
    - Help the community by leaving reviews that encourage or help us improve.
    - Found a bug? Don't forget to mention it.

- Contact
    - Find the social media handles of the administrator at a click.

> To keep it safe, we have made it so you can't edit the tags, posts or reviews posted by any other individual.
</br> Exceptions: Profiles with admin priveledges are allowed to perform the specified actions.

</br>

