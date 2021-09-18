# varlyq-crud-node

## Documentation   Just go on [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/bcebdd24edc35ebca15f)
---
## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v10.19.0

    $ npm --version
    6.14.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/whoismayank/varlyq-crud-node.git
    $ cd varlyq-crud-node
    $ NPM install

## Configure app
Setup .env file like this

* HOST=https://varlyq-crud-node.herokuapp.com/	
* LOGGING_LEVEL=2
* PORT=3000
* DATABASE_URL=pgsql:database_url




## Running the App in development
    $ npm install -g nodemon
    $ npm run dev
    
## Simple build for production

    $ npm start

