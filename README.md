# Grade-calc

## Description
Grad-calc is a glorified spreadsheet handling all of the user's grades and calculating their total grade throughout their terms. The future plans of this project is to add graphs on the website as well as a drag and drop task manager.

## Installation
To install there are only the dependencies needed to get started. The only necessary thing to do is to go to both the client and server directories and **npm install** the required dependencies.

### .env

The server requires the following .env variables:

- PROJECT_URI - URI string to connect to mongodb database
- MAIL_TOKEN
- MAIL_CLIENT_ID
- MAIL_CLIENT_SECRET
- REDIRECT_URI

The second variable and onwards are required for Google API's mail service. for more information regarding this click [here](https://nodemailer.com/usage/using-gmail/)

## Running Grade-calc
Since there is no current script to run both the client and server, there are two steps required.

1. In the client directory running **npm start**
2. In the server directory you can also run **npm start**; however, **nodemon server** will also work

## Contributors

- [@imphungky](https://github.com/imphungky)
- [@jcserv](https://github.com/jcserv)
