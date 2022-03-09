# Kyanon-Digital-Intern
## Week02
### Lap 3 + 4:  
* Run `npm start` to run server  
* Server run as port: 3000
* If testing with Postman you need to login with *username: test123, password: 123456* to get token for user.  
* I use Bearer authentication to verify the token, so with each API need to add ***Bearer Token*** to header.
* List of api: 
* - `http://localhost:3000/read` lấy list data (method: get)
* - `http://localhost:3000/create` tạo data mới (method: post)
* - `http://localhost:3000/update/:id` update data (method: put)
* - `http://localhost:3000/del/:id` xóa data (method: delete)
