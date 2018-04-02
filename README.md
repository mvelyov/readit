# Readit App
-----------
This is an application similar to www.reddit.com done as a course project for Telerik Academy Alpha JS to implement a standard web application using Node.js, Express and MariaDB.

# Table of contents
--------
1. [Getting Started](#GettingStarted)
2. [Prerequisites](#Prerequisites)
3. [Usage](#Usage)

## Getting Started <a name ="GettingStarted"></a>   

To get a copy of the project running on your local machine for development and testing purposes you will need to clone the repository into a brand new folder on your machine and run in the terminal in the root folder:
```
npm install
```
After all the dependancies are downloaded ensure that you have MariaDB service up and running and create a database. The default database is readitdb. This can be changed in the config.json file inside the db folder. From the root folder, you need to enter the db folder and run the following commands to init the database and add the migrations and the seeds:
```
cd db/   (to change to the db folder)
../node_modules/.bin/sequelize db:migrate
../node_modules/.bin/sequelize db:seed:all
cd ..  (to change back to the root folder)
```
Locally the app is set up to work on port 3001. to run the app use the command:
```
node app/server.js
or
npm start (from the root folder)
```
In your browser navigate to link:
```
http://localhost:3001/
```
Voalá!!
### Prerequisites <a name ="Prerequisites"></a>

The only mandatory requirement for installing the project is [Node Js](https://nodejs.org/dist/v8.11.1/node-v8.11.1-x64.msi). The rest of the dependancies are installed via the command: 
```
npm install
```

### Usage <a name ="Usage"></a>

To be able to experience all the features of the app, you will need to register to the app.
Choose a unique username and password, at least 3 characters long and provide an url for an avatar (optional, if omitted it will use the default avatar).
After registering, proceed to log-in with the newly created username and password.

You now have thet ability to create new posts and comment on your or existing posts.
Clicking on your profile will provide you with a summary of your posts and comments.
At this current 1.0.0 version of the application there are only 3 subreadits, however at future versions admins will be able to add aditional tags and subreadits.


## Running the tests

The app has tests that can be run with Mocha.
The terminal command is:

```
npm test (from the root folder of the app)
```
### Break down into end to end tests

The tests currently test the controllers and the data methods.

## Built With

* [Node Js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MariaDB](https://mariadb.com/)
* [PassportJS](http://www.passportjs.org/)
* [Pug](https://pugjs.org/api/getting-started.html)
* [Sequelize](http://docs.sequelizejs.com/)
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* Others..

## Authors

* **Vladimir Tumbev** - *Initial work* - [VladimirTumbev](https://github.com/VladimirTumbev)
* **Mario Velyov** - *Initial work* - [mvelyov](https://github.com/mvelyov)
* **Desislava Karova** - *Initial work* - [dsdka](https://github.com/dsdka)

## License

This project is licensed under the MIT License

Copyright 2018

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Acknowledgments

* Hat tip to colleagues from Telerik Akademy Alpha JS, who gave ides or helped with technologies suggestions and their usage
* Hat tip to www.reddit.com for being an amazing website that inspired us to do this project