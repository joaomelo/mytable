# Mytable

Mytable is a web app that complements my personal workflow for [Airtable](https://www.airtable.com). This app runs a script that enables organizing items in a tree structure and basic automation to creating recursive tasks.

## Motivation

I am heavy Airtable user. I love its data structure flexibility, nice ui and formulas. But two thing were always missing to close my self-management database: organize my tasks in a tree structure and create recursive tasks. I build this to overcome this. Now I am sharing the code in the case it could help others. Be my guest 😊. 

This README sections:

- [App Features](#app-features)
- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)

# App Features

The most important concept of the app is **jobs**. A job is a configuration about how an Airtable's table should be transformed by the app.

In the jobs UI, the user specify the table location, its fields and guiding parameters like if emojis should be used in path field or if recurring items should be handled. All options are accompany by helping tooltips.

After at least one job is created, the user can press the run command in the home screen to apply all jobs instructions. The user can also activate a timer in the home screen that will run all jobs every five minutes.

# Getting Started

To run mytable you first have to clone the repo.

  git clone https://github.com/joaomelo/mytable.git

## Setting Environment Variables

Mytable hosting and database rely on [Firebase](https://firebase.google.com/). So you will need to create a project and point to it using environment file.

So, after the Firebase project is available you fo to `client\cfg` folder and create a `dev.env` and `prod.env` with the content bellow, replacing the assignments with proper values.

    FIREBASE_API_KEY=foobar
    FIREBASE_AUTH_DOMAIN=foobar
    FIREBASE_DATABASE_URL=foobar
    FIREBASE_PROJECT_ID=foobar
    FIREBASE_STORAGE_BUCKET=foobar
    FIREBASE_MSG_SENDER_ID=foobar
    FIREBASE_APP_ID=foobar
    SIGN_UP=ENABLE

The `SIGN_UP` env value controls whether the login UI also make available a sign up form. In my personal production instance of **mytable** i keep it `DISABLE`, since i am currently terrified of holding responsability of other people Airtable Api Keys.

Don't forget to add the bothe `.env` files to your `.gitignore` list. All this data should be private.

## Running Locally 

Now install the dependencies and run the start script. Now you will probably see the app running on `http://localhost:8080/`

    npm install
    npm start

Other script in in the `package.json` can be useful like build or deploy.

# Development Guidelines

The stack is pretty standard, so is probably easy for any web developer to tweak the code as you like. I will talk about some things that may help.

## Tooling

The development tolling is unsurprisingly composed of [webpack](https://webpack.js.org/) and basic loaders, [babel](https://babeljs.io/) and [eslint](https://eslint.org/). 

They are all listed in the `package.json devDependencies` field and the corresponding config files are listed in the project root directory. Except for webpack files which are inside the `\client\cfg` folder.

## The Stack

The app UI is built with [Vue](https://vuejs.org/), [Vuetify](https://vuetifyjs.com/) and [Vue-Router](https://router.vuejs.org/).

The project uses [Firebase](https://firebase.google.com/) for database store, hosting and authentication. Check `firebase.json` and `firestore.rules` files to understand and update the setup if desired.

I also make use of a package i built to make database operations more easy to code in the client. It is called [hot-collection](https://www.npmjs.com/package/@joaomelo/hot-collection).

To connect to Airtable i use their official [js browser package](https://github.com/Airtable/airtable.js). I plugged [bottleneck](https://www.npmjs.com/package/bottleneck) to avoid breaking Airtable api call limits.

The [moment](https://www.npmjs.com/package/moment) library is used to help deal with recurrence logic and datetime formatting and [rxjs](https://www.npmjs.com/package/rxjs) to make event handling saner.

## How to Navigate the Code

The `/client/src` folder is where the app code resides. It is divided between `core` and `modules`. In core you will find utility features like authentication and routing.

The `modules` folder is where business logic resides. The batch and common subfolders have code to identify and dispatch commands to Airtable.

The `jobs` folder deals with setting up where and how the script should be applied to Airtable data. The `logger` folder has instructions for showing and exporting the history of operations. 

Have fun 🎉.

# Wrapping up

Well... i think this is it. If you have any doubts contact me in [twitter](https://twitter.com/joaomeloplus). I handle a daytime job, wife and three full of energy kids to take care of. It could take a while to respond but I will try to leave no fellow human behind 😊.

# License

Made by [João Melo](https://twitter.com/joaomeloplus) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
