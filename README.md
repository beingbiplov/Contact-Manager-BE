# Contact Mananger

A simple contacts manger API.


## User Authentication
This project uses jwt-tokens to authenticate requests. You can get the tokens from `api/users/auth//login` endpoint by providing regisered user's eamil and password. You can use the returned access token to prove authentication for a protected endpoint. You can also use valid refresh token to create new access token.

|   | Endpoints |
| ------------- | ------------- |
| POST  | `/api/users/auth//token` |
| POST  |`/api/users/auth//token`  |

## Users
`/api/users/` is used to manage users in the system. The API allows you to create, get and update users. User registration is also done through this endpoint.

| |  Endpoints |
| ------------- | ------------- |
| GET | `/api/users/:id` |
| PUT | `/api/users/:id` |
| POST | `/api/users/` |


## Contacts
`/api/contacts` allows to perform basic CRUD operation on contact table. It is also used to get favorite contacts of a user. 

|  |  Endpoints |
| ------------- | ------------- |
| GET |`/api/contacts` |
| POST | `/api/contacts` |
| GET | `/api/contacts/:id` |
| PUT | `/api/contacts/:id` |
| DELETE | `/api/contacts/:id` |
| GET | `/api/contacts/:id/favorite` |



## Local Setup

- Clone the repository
```
git clone  git@github.com:beingbiplov/Contact-Manager-BE.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm start
