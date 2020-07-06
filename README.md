# BigDeal
## Project Details
### Project Description
An easy to use website where a user can input a link of a product they want to track and get notifications when it goes on sales.
### Team Members
* [Sina Jamshidi](https://github.com/sina-jamshidi) (Team Lead)
* [Chian-Huei Wang](https://github.com/ChianHuei)
* [Eric Thorfinnson](https://github.com/Ethorf)
* [Surhud Bhagali](https://github.com/surhud004)
### Tech Specs
Technology | Usage
---------- | ------
MongoDB    | Database (NoSQL)
ExpressJS  | Back-end (Server)
ReactJS    | Front-end (Client)
NodeJS     | JavaScript Runtime Env
### Routing
Routes                                 | Use
------                                 | ----
GET /auth                              | Get all users
POST /auth/register                    | Create a new user
POST /auth/login                       | Login user
GET /lists                             | Get all lists of one user
POST /lists/new                        | Create a new list
PUT /lists/:id                         | Edit that list
DELETE /lists/:id                      | Delete that list
GET /lists/:id                         | Get all products of one list
POST /lists/:id                        | Add a new product to that list
DELETE /lists/:id/products/:product_id | Delete the product from that list

## How to Use
- [ ] add the deployed url

## Features
* Login/sign up flow with e-mail address
* Create lists
* Add/ delete product links
* Track product price
* Browse friends
* Follow friends

###### Copyright &copy; 2020 Team Watermelon
