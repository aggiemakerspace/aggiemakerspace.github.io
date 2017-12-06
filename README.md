
<a name="table-of-contents"></a>
## NCAT MakerSpace Website

The makerspace is a collaborative environment for students to foster their creativity.
The Website will be built using [React JavaScript Library](https://reactjs.org/).


## Table of Contents

- [Getting Started](#getting-started)
  - [What IDE to use?](#select-ide)
- [Folder Structure](#folder-structure)

- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
  
 <a name="getting-started"></a>
## Getting Started
[Back to top](#table-of-contents)
### Node.js
Before we get started we need to set up [Node.js Javascript runtime](https://nodejs.org/en/)<br>
Follow the link above to install Node.js on your respective OS.<br>
### Npm
Node.js comes paired with [npm package manager](https://www.npmjs.com/), which we will use to install the following packages below.
<br>
If Node.js is already installed run the following to install npm: 
```
npm install npm@latest -g
```
<br> Once, Node.js and npm are installed. We will also need to set up Firebase CLI. Firebase is a Real Time Database that we will use as our backend.

```
npm install -g firebase-tools
```

### React Js
Next, let us get started with React Js.
```
npm install -g create-react-app
```
create-react-app *name of the project*
```
create-react-app my-app
```
Open directory location
```
cd my-app
```
Run Locally
```
npm start
```

**Note** *every time you want to load your site locally, you need to run npm start*

 <a name="select-ide"></a>
### What IDE to use?
There are a plethora of options available for you to use. I personally prefer to use [Visual Studio Code](https://code.visualstudio.com/), it is fast and nimble. 
You can view the following [tutorial](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial) for tips. 





 <a name="folder-structure"></a>
## Folder Structure
[Back to top](#table-of-contents)
```
aggiemakerspace/
  README.md
  public/
  src/
```

## Available Scripts
[Back to top](#table-of-contents)

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

[Back to top](#table-of-contents)
