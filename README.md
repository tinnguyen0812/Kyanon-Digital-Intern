# Kyanon-Digital-Intern 
***

## Week 01 
Download code .zip or *'git clone https://github.com/tinnguyen0812/Kyanon-Digital-Intern.git'* to clone repository.  
* Concept about NPM:
  - NPM is the package manager for the Node JavaScript platform. It puts modules in place so that node can find them, and manages dependency conflicts intelligently. 
  - The NPM program is installed on your computer when you install Node.js
  - A package in Node.js contains all the files you need for a module.
  - Modules are JavaScript libraries you can include in your project.
* Basic syntax:
  - `npm link` in a package folder will create a symlink in the global folder {prefix}/lib/node_modules/<package> that links to the package where the npm link command was executed.
  - `npm install` This command installs a package, and any packages that it depends on. If the package has a package-lock or shrinkwrap file, the installation of dependencies will be driven by that, with an npm-shrinkwrap.json taking precedence if both files exist.
  - `npm init <initializer>` can be used to set up a new or existing npm package. initializer in this case is an npm package named create-<initializer>, which will be installed by npx, and then have its main bin executed -- presumably creating or updating package.json and running any other initialization-related operations.
  - `npm start` This runs an arbitrary command specified in the package's "start" property of its "scripts" object. If no "start" property is specified on the "scripts" object, it will run node server.js.
* Package.json:
  - package.json is a special file, you can understand it is a document that helps you know which packages are needed in this pile of code (Moreover, nodejs builds on many modules called packages, managed through npm) . Package.json is the configuration file of npm, which helps npm understand what it needs to install, application information, version, etc. The file package.json is written in json.  
  - name: The name of the project or package, should be capitalized for the name attribute. This is a required attribute. Also you can publicize your project, then this name attribute will be the package name, so this must be unique.
  - version: The version of the project. The way to write the current version is regulated by someone named Semantic Versioning. He stipulates like this, the version must include 3 parts MAJOR.MINOR.PATCH verbatim, in which:
     - MAJOR version when you make incompatible API changes
     - MINOR version when you add functionality in a backwards-compatible manner
     - PATCH version when you make backwards-compatible bug fixe
  - description: Project description. Pay attention to write concise, clear, easy to understand, not fictional.
  - author: Information about the author. I hope one day a package on npm has your name.
  - dependencies: This is important here. In the project, you will have to use a lot of packages, these packages are already written, just require and then blow.For example, we have packages sails or express as framework, jade is package template engine, socket.io supports realtime application, ...For this to work, you need to install the package using npm. The dependencies attribute tells npm which packages to install. The package.json file is located in the root directory of the project.
* Package-log.json:
  - package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.
  - One key detail about package-lock.json is that it cannot be published, and it will be ignored if found in any place other than the toplevel package. It shares a format with npm-shrinkwrap.json, which is essentially the same file, but allows publication. This is not recommended unless deploying a CLI tool or otherwise using the publication process for producing production packages.
* JS syntax:
   - The JavaScript syntax defines two types of values:
      - Fixed values: Fixed values are called Literals.
      - Variable values: Variable values are called Variables.
* Arrow function:
   - Arrow functions allow us to write shorter function syntax
   - The handling of this is also different in arrow functions compared to regular functions. In short, with arrow functions there are no binding of this. In regular functions the this keyword represented the object that called the function, which could be the window, the document, a button or whatever. With arrow functions the this keyword always represents the object that defined the arrow function.
 * Require/Export/Import:
    - Require: require are used to consume modules. It allows you to include modules in your programs. You can add built-in core Node.js modules, community-based modules (node_modules), and local modules.
    - Export: the exports keyword gives you the chance to “export” your objects and methods
    - Import: the same with require but it for the `.mjs` extension
 * Callbacks: A Callback Function, also known as a Higher Order Function, is a function that is passed into another function (called F1) as a form parameter, and called within that function F1. We can pass a function as a variable and return it in another function. When we pass the callback function as an argument to another function, we are only passing the definition. It will be executed when we pass the whole function as a parameter
 * callback hell: Callback hell, also known as pyramid of doom, is a non-optimal code, based on the concept explained above.
 * Promise: A JavaScript Promise object contains both the producing code and calls to the consuming code.
    - A JavaScript Promise object can be:
      - Pending
      - Fulfilled
      - Rejected
    - The Promise object supports two properties: state and result.
    - While a Promise object is "pending" (working), the result is undefined.
    - When a Promise object is "fulfilled", the result is a value.
    - When a Promise object is "rejected", the result is an error object.
 * Async/Await: Async / Await is a JavaScript feature that helps us work with asynchronous functions in a way that is more interesting and easier to understand. It is built on Promises and is compatible with all API-based Promises.
    - Async - declares an asynchronous function (async function someName(){...}).
      - Automatically transforms a regular function into a Promise.
      - When calling the async function it will handle everything and return the result in its function.
      - Async allows the use of Await.
    - Await - pauses the execution of async functions. (Var result = await someAsyncCall().
      - When placed in front of a Promise, it waits until the Promise ends and returns the result.
      - Await only works with Promises, it doesn't work with callbacks.
      - Await can only be used inside async functions.
* Lap 1: run `npm init` in terminal to installize all package needed and run `node lap1`  
Input your path of file and then the content at the terminal(if file doesn't exists it will be created)  
* Lap 2: Run `node lap2`  
Input your link you want in terminal. And then open file 'content_from_page.txt' to see the HTML.
