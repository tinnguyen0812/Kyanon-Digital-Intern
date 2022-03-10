# Kyanon-Digital-Intern
## Week02
* ExpressJS: Expressjs is a framework built on top of Nodejs. It provides powerful features for web or mobile development. Expressjs supports HTTP and midleware methods creating an incredibly powerful and easy-to-use API.
  - Set up intermediate classes to return HTTP requests.
  - Define router allows use with different actions based on HTTP method and URL.
  - Allows returning HTML pages based on parameters.
* Middlewares: You will need to confirm that requests meet certain criteria before proceeding. For example, if someone tries to log in to the site:
  - Do they have an account?
  - Did they enter the correct password?  
 This is why the middleware concept came about. Middleware functions allow us to take action on any request and modify it before sending the response back. Middleware in the software engineering industry is defined as a piece of software that acts as a bridge, providing services from the operating system to applications, helping applications to interact with components. part allowed by the operating system. Middleware is considered the glue between software together. Middleware will act as an intermediary between request/response (interaction with users) and internal logic processes web server.
* Router: Routing in Node.js is a concept that refers to determining how an application should respond when a user makes a request to a particular endpoint. That endpoint is usually a URI or a path (Path) with a specific Request method (POST, PUT, GET, ...). 
* Express supports many different types of HTTP methods, including: get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch and search  
* Passport: Passport is authentication middleware for Node.js. As it's extremely flexible and modular, Passport can be unobtrusively dropped into any Express-based web application. A comprehensive set of strategies supports authentication using a username and password, Facebook, Twitter, and more.
    - Passport module support many authenticate strategy: JWT, Facebook, Google, Twitter,...
* Logging: Winston is designed as a simple Javascript logging library that supports multiple transports and supports customization across different log levels.
    - Transport is a way to use logs like console logs or log files, etc.
    - Log levels are levels of log
    To initialize a logger we use winston.createLogger. Some parameters in the logger we need to pay attention to such as:
      - level: allows us to use the log for levels less than or equal to the level set based on the specified level order.
      - levels: default winston.config.npm.levels are default levels already set with corresponding colors. You can manually customize the levels log and color of the levels
      - transport: Set the logging method of the logger.
      - format: Allows you to adjust the format settings of the log.
* Run `npm start` to run server  
* Server run as port: 3000
* If testing with Postman you need to login with *username: test123, password: 123456* to get token for user.  
* I use Bearer authentication to verify the token, so with each API need to add ***Bearer Token*** to header.
* List of api: 
  - `http://localhost:3000/read` lấy list data (method: get)
  - `http://localhost:3000/create` tạo data mới (method: post)
  - `http://localhost:3000/update/:id` update data (method: put)
  - `http://localhost:3000/del/:id` xóa data (method: delete)
