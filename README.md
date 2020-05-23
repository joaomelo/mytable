# Mytable

Mytable is a web app that complements [Airtable](https://www.airtable.com) workflow with scripts that enable organizing items in a tree structure and automate the basic creation of recursive tasks. 

I use this [personal instance](https://mytable.melo.plus) regularly and you are welcome to freely sign up for an account. But since this is a hobby project, i can't guarantee any service level. The most reliable way to use the app is check the code and raise your own instance.

## Motivation

I am a heavy Airtable user. I love its data structure flexibility and rich UI. But two things were missing to complete my self-management workflow: organize my tasks in a tree structure and create recursive tasks. I built mytable to overcome those limitations. Now I am sharing the code in case it could help others. Be my guest 😊. 

This README sections:

- [App Features](#app-features)
- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)

# App Features

The most important concept of the app is **job**. The job is a configuration about how an Airtable's table should be transformed by the app.

In the jobs UI, the user specifies the table location, its fields, and guiding parameters like if emojis should be used in the path field or if recurring items should be handled. All options are accompanied by helping tooltips.

After the job required fields are filled, the user can press the run command in the home screen to apply the jobs setup to all records in the corresponding table. The user can also activate a timer on the home screen that will run all jobs every few minutes.

# Getting Started

To run mytable you can fork, clone, or download the repo. To clone, use the code below.

    git clone https://github.com/joaomelo/mytable.git

## Environment Setup

Mytable hosting and database rely on [Firebase](https://firebase.google.com/). So you will need to create a Firebase project and link the app to it using environment files.

So, after the Firebase project is available you go to `client\cfg` folder and create `dev.env` and `prod.env` files with the content bellow. Don't forget to add both `.env` files to your `.gitignore` list.

    FIREBASE_API_KEY=foobar
    FIREBASE_AUTH_DOMAIN=foobar
    FIREBASE_DATABASE_URL=foobar
    FIREBASE_PROJECT_ID=foobar
    FIREBASE_STORAGE_BUCKET=foobar
    FIREBASE_MSG_SENDER_ID=foobar
    FIREBASE_APP_ID=foobar
    SIGN_UP=ENABLE

The npm scripts expect dev and prod configurations, but you can use the same data in both the files if you prefer. 

The `SIGN_UP` env value controls whether the login UI also makes available a signup form. Do not take that as a security feature since it is very easy for a malicious agent to bypass that.

## Running Locally 

Now install the dependencies and run the start script. You should have the app running on `http://localhost:8080/`

    npm install
    npm start

Please check useful scripts in the `package.json` like build or deploy.

# Development Guidelines

The stack is pretty standard and hopefully accessible for any web developer to tweak the code as preferred. I will talk about some things that may help.

## Tooling

The development tolling is composed of [webpack](https://webpack.js.org/) and corresponding loaders, [babel](https://babeljs.io/) and [eslint](https://eslint.org/). 

They are all listed in the `package.json devDependencies` field and the corresponding config files are present in the project root directory. Except for webpack files that are inside the `\client\cfg` folder.

## The Stack

The app UI is built with [Vue](https://vuejs.org/), [Vuetify](https://vuetifyjs.com/) and [Vue-Router](https://router.vuejs.org/).

The project uses [Firebase](https://firebase.google.com/) for the database store, hosting, and authentication. Check `firebase.json` and `firestore.rules` files to understand and update the setup if desired.

I also make use of a package I built to make database operations easier to code in the client. It is called [hot-collection](https://www.npmjs.com/package/@joaomelo/hot-collection).

To connect to Airtable I use their official [js browser package](https://github.com/Airtable/airtable.js). I plugged [bottleneck](https://www.npmjs.com/package/bottleneck) to avoid breaking Airtable API call limits.

The [moment](https://www.npmjs.com/package/moment) library is used to help deal with recurrence logic and datetime formatting and the [rxjs](https://www.npmjs.com/package/rxjs) package makes event handling saner.

## How to Navigate the Code

The `/client/src` folder is where the app code resides. It is divided between `core` and `modules`. In core, you will find utility features like authentication and routing.

The `modules` folder is where the business logic resides. The batch and common subfolders have code to identify and dispatch commands to Airtable.

The `jobs` folder deals with setting up where and how the script should be applied to Airtable data. The `logger` folder has instructions for showing and exporting the history of operations. 

Have fun 🎉.

# Wrapping up

If you have any doubts contact me on [Twitter](https://twitter.com/joaomeloplus). I handle a daytime job, wife, and three full of energy kids, it could take a while to respond but I will try to leave no fellow human behind 😊.

# License

Made by [João Melo](https://twitter.com/joaomeloplus) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
