<p align="center">
  <img src="./client/src/public/uatech.png"/>
</p>

- [UA Tech Documentation (Drive)](#ua-tech-documentation-drive)
- [First Time Setup](#first-time-setup)
    - [All Environments](#all-environments)
        - [Mac Users](#mac-users)
        - [On Linux](#on-linux)
        - [On Windows](#on-windows)
    - [Install Modules and Packages](#install-modules-and-packages)
    - [Tools](#tools)
        - [Install Chrome extensions](#install-chrome-extensions)
        - [Install VS Code Extensions](#install-vs-code-extensions)
        - [Postgres](#postgres)
    - [Having Issues? Try these things first](#having-issues-try-these-things-first)
    - [Technologies](#technologies)
    - [License](#license)


This app was built using the React-Slingshot Starter. Refer to it [Here](https://github.com/coryhouse/react-slingshot/) or check out the [FAQ](./docs/FAQ.md)

Please add candidates for the App Store! Your data will be used for testing and eventually in the app :)

# UA Tech Documentation (Drive)
* [Project Overview](https://docs.google.com/document/d/1kJfeBeUI7Y72LbAvIeLP_qGH9i5XkfwrC7KkWiDlR18/edit?usp=sharing)

* [Athena Basics/ Backend Overview](https://docs.google.com/document/d/11MmvCYgbHwHia4OiB-7J1JdDet1n_yRlhpLnKDRhfJQ/edit?usp=sharing)

* [Submit an App](https://docs.google.com/spreadsheets/d/1YrL39knRdZq_DqHL1wX1ndiEKW8aAK2bircn9CWxD-E/edit#gid=0)


Look at the Issues tab for TODOs
Comment on whatever ticket you want to take
If you're bored, adventurous, or no tickets are open, search the project directory for TODO and see what you can find.

If you leave any loose ends or think of something to add, make sure you mark it in the codebase with a //TODO, and make an Issue for it in the repository (`issues > new issue > feature`)

**Commands to get started** 

cd into client and run `yarn start` to start the frontend at http://localhost:3000

cd into server and run `yarn start` to start the backend at http://localhost:8080

graphiql is at http://localhost:8080/graphql

> Note: in frontend development each time you hit save, changes hot reload and linting and automated tests run. Not yet set up on the backend // TODO

1. **Libraries we're using** - [Popular and powerful libraries](#technologies) for  React.

2. **Production build (not yet configured)** - `npm run build` 

# First Time Setup

## All Environments

0. **Set Up Development Environment**
>Note: I reccomend using [VS Code](https://code.visualstudio.com/) since I will probably be able to give you better help. I also can't guarantee all other plugins play nicely with other text editors. Use other editors at your own risk.


Install node (I'm on v 9.7, most version should work but install node 9 if you have problems)
You can do this by going to their website or installing via brew (mac or linux)


1. **Install [Git](https://git-scm.com/downloads)**.

2. Not familiar with Git? Try [Gitkraken](https://www.gitkraken.com/)

3. **[Disable safe write in your editor](https://webpack.js.org/guides/development/#adjusting-your-text-editor)** to assure hot reloading works properly. VSCode users Ignore this.

4. **Install Package managers and yarn**
### Mac Users
**Using Brew**

Install brew by running the following in your terminal...

install brew: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

install node: `brew install node`

(if you have problems, try installing a different version of node and linking with): `brew link node -f`

install yarn: `brew install yarn`

install watchman for hot reloading: `brew install watchman`

<!-- Add the Babel CLI (transpiles newer javascript -ES6- to older EMCA2015) -->

If you're on Linux or Windows, complete the steps for your OS below.

### On Linux

* Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).

    `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`.

install linuxbrew and follow the instructions for mac.

### On Windows

Download [cygwin](http://www.cygwin.com/), you will be using this as your terminal
In the installation you will see a menu with many expandable dropdowns, these are packages for your cygwin environment.
Find python, expand the dropdown (hit the plus) and click on python2 and pip (python2-pip...). Make sure it doesn't say skip and that the bin box is checked.

Then go to Devel and add mingw-gcc, mingw-g++ for your operating system (64 bit vs 32 bit). You should have added 4 packages total.

Complete the cygwin installation.


**Install [Node 4.0.0 or greater](https://nodejs.org)**

    (5.0 or greater is recommended for optimal build performance)
    Need to run multiple versions of Node? Try unlinking and linking with Brew or use [nvm](https://github.com/creationix/nvm).

**Once you have downloaded and installed cygwin, node, and git. restart your computer**

Cygwin should have yarn installed, to check run `yarn help`, if that throws an error run the following
to install yarn `npm install -g yarn`

If you keep having problems try the next two steps:

* **Install [Python 2.7](https://www.python.org/downloads/)**. Some node modules may rely on node-gyp, which requires Python on Windows.
* **Install C++ Compiler**. Browser-sync requires a C++ compiler on Windows.

    [Visual Studio Express](https://www.visualstudio.com/en-US/products/visual-studio-express-vs) comes bundled with a free C++ compiler.
    
    If you already have Visual Studio installed:
    Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop.
    The C++ compiler is used to compile browser-sync (and perhaps other Node modules).

You will be using cygwin to run the program. You should be able access the root of your directory with `cd C:\ ` then navigate to your repository location. Contact me if you have any trouble.

---

## Install Modules and Packages
install packages: `yarn`

`npm install -g nodemon`

> Other platforms install watchman [Here](https://facebook.github.io/watchman/)


## Tools
Learn how to use the Chrome Developer Console [Here](https://developers.google.com/web/tools/chrome-devtools/console/)!

### Install Chrome extensions

[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related?hl=en)

[Redux Developer Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

### Install VS Code Extensions
I use the following extensions in VS Code and highly recommmend you do too.

[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

[React Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

[ESLINT - linting for JS](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

[Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

You can see a brief overview of what they are and how to use VSCode [Here!](https://www.youtube.com/watch?v=u21W_tfPVrY)

### Postgres

If you want to use an offline DB (its faster iand i think the SIPB one only has a 100MB) download pgadmin 4 for postgres. Use the following as credentials so you don't have to change the config eevry time. 

* DB Name: UATechDB
* User Name: postgres
* Password: password


## Having Issues? Try these things first

1. Make sure you ran all steps in [Get started](#get-started) including the [initial machine setup](#initial-machine-setup).
2. Run `npm install` - If you forget to do this, you'll see this: `babel-node: command not found`.
3. Install the latest version of Node. Or install [Node 5.12.0](https://nodejs.org/download/release/v5.12.0/) if you're having issues on Windows. Node 6 has issues on some Windows machines.
4. Make sure you don't have NODE_ENV set to production on your machine. If you do then the [development dependencies won't be installed](https://github.com/coryhouse/react-slingshot/issues/400#issuecomment-290497767). Here's [how to check](http://stackoverflow.com/a/27939821/26180).
5. Install watchman with `brew install watchman` if you are having the following error after an initial `npm start -s`:

    ```bash
    2017-09-05 00:44 node[68587] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
    2017-09-05 00:44 node[68587] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
    events.js:160
          throw er; // Unhandled 'error' event
          ^

    Error: Error watching file for changes: EMFILE
        at exports._errnoException (util.js:1022:11)
        at FSEvent.FSWatcher._handle.onchange (fs.js:1406:11)
    ```

6. Tip: Things to check if you get an `npm run lint` error or build error:

    * If ESW found an error or warning in your project (e.g. console statement or a missing semi-colon), the lint thread will exit with `Exit status 1`. To fix:

      1. Change the `npm run lint` script to `"esw webpack.config.* src tools; exit 0"`
      2. Change the `npm run lint:watch` script to `"esw webpack.config.* src tools --watch; exit 0"`

      > Note: Adding `exit 0` will allow the npm scripts to ignore the status 1 and allow ESW to print all warnings and errors.
    * Ensure the `eslint`/`esw` globally installed version matches the version used in the project. This will ensure the `esw` keyword is resolved.

7. Rebuild node-sass with `npm rebuild node-sass` if you are having and error like `Node Sass does not yet support your current environment on macOS XXX` after an initial `npm start -s`. if this doesn't work. Delete node_modules directory, package.lock, and yarn.lock files then run `yarn`

---

## Technologies

Slingshot offers a rich development experience using the following technologies:

| **Tech** | **Description** |**Learn More**|
|----------|-------|---|
|  [React](https://facebook.github.io/react/)  |   Fast, composable client-side components.    | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications)  |
|  [Redux](http://redux.js.org) |  Enforces unidirectional data flows and immutable, hot reloadable store. Supports time-travel debugging. Lean alternative to [Facebook's Flux](https://facebook.github.io/flux/docs/overview.html).| [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux), [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux), [Pluralsight Course](http://www.pluralsight.com/courses/react-redux-react-router-es6)|
|  [React Router](https://github.com/reactjs/react-router) | A complete routing library for React | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications) |
|  [Babel](http://babeljs.io) |  Compiles ES6 to ES5. Enjoy the new version of JavaScript today.     | [ES6 REPL](https://babeljs.io/repl/), [ES6 vs ES5](http://es6-features.org), [ES6 Katas](http://es6katas.org), [Pluralsight course](https://www.pluralsight.com/courses/javascript-fundamentals-es6)    |
| [Webpack](https://webpack.js.org) | Bundles npm packages and our JS into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). | [Quick Webpack How-to](https://github.com/petehunt/webpack-howto) [Pluralsight Course](https://www.pluralsight.com/courses/webpack-fundamentals)|
| [Browsersync](https://www.browsersync.io/) | Lightweight development HTTP server that supports synchronized testing and debugging on multiple devices. | [Intro vid](https://www.youtube.com/watch?time_continue=1&v=heNWfzc7ufQ)|
| [Jest](https://facebook.github.io/jest/) | Automated tests with built-in expect assertions and [Enzyme](https://github.com/airbnb/enzyme) for DOM testing without a browser using Node. | [Pluralsight Course](https://www.pluralsight.com/courses/testing-javascript) |
| [ESLint](http://eslint.org/)| Lint JS. Reports syntax and style issues. Using [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) for additional React specific linting rules. | |
| [SASS](http://sass-lang.com/) | Compiled CSS styles with variables, functions, and more. | [Pluralsight Course](https://www.pluralsight.com/courses/better-css)|
| [PostCSS](https://github.com/postcss/postcss) | Transform styles with JS plugins. Used to autoprefix CSS |
| [Editor Config](http://editorconfig.org) | Enforce consistent editor settings (spaces vs tabs, etc). | [IDE Plugins](http://editorconfig.org/#download) |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. | [Pluralsight course](https://www.pluralsight.com/courses/npm-build-tool-introduction), [Why not Gulp?](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.vtaziro8n)  |
| [Apollo](https://www.apollographql.com/docs/react/)| React Graphql Queries | [Queries](https://www.apollographql.com/docs/react/essentials/queries.html),  Also see the Online Component Example in src/components/onlinecomoponent.example.js|
| [GraphQL & Graphiql](https://graphql.org/learn/)| About Graphql (dynamic query endpoint framework) | [Graphiql Usage](https://youtu.be/5RGEODLhjhY?t=2m16s)|
| [React Bootstrap (DEPRECATED)](https://react-bootstrap.github.io)| WE NO LONGER USE THIS, but if you must... | [Documentation](https://react-bootstrap.github.io/components/alerts/): See testForm.js|
| [Semantic UI React](https://react.semantic-ui.com/)| Current component library | [Semantic Usage](https://semantic-ui.com/elements/button.html): See RegisterForm.js|

---

Please fix typos by editing readme.md

## License

This project is Licensed under the MIT License.