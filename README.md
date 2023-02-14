
![Logo](https://user-images.githubusercontent.com/57197702/217839044-f0e66ebc-ff6f-4abf-b0e9-f926cc56f192.PNG)



# Affable

Affable manages your Blog through REST API and you can also see others' Blogs . 


## Demo

Insert gif or link to demo

## Requirements
<p>
 <a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=nodejs,mongodb,postman&theme=light"/>
    </a>
    <a href="https://www.npmjs.com/"><img src="https://authy.com/wp-content/uploads/npm-logo.png" width="50px" height="50"/></a>
 </p>


## Environment Variables

To run this project, you will need to add the following environment variables to your **config/default.json** file

`PORT`

`HOST`

`MONGO_URI`

`saltWorkFactor`

`jwtSecret`

you can also take **config/test.json** as reference 
## Installation

Install my-project with npm

```bash
  npm install
  npm run dev #if your are a developer 
  npm run start
```
## Usage
Import this [JSON file](Blog.postman_collection.json) into Postman Collection, and you will be able to use all REST APIs.

If you don't know how to do it, watch this [video](https://www.youtube.com/watch?v=bzquMXmCLUQ).

## API Reference

### Authentication

#### Create User
```http
  POST /api/v2/user/
```
| Request Body | Type     | Description                   |
| :--------    | :------- | :-------------------------    |
| `userName`   | `string` | **Required** .user's username |
| `email`      | `string` | **Required** .user's email    |
| `password`   | `string` | **Required** .user's password |
| `passwordConfirmation`  | `string`  | **Required**      |

#### Login 
```http
  POST /api/v2/session/login
```
| Request Body | Type     | Description                          |
| :--------    | :------- | :-------------------------           |
| `email`      | `string` | **Required** .email of exist user    |
| `passwrod`   | `string` | **Required** .password of that email |

#### Find User
```http
  GET /api/v2/user?
```
| Request Query | Type     | Description                   |
| :--------     | :------- | :-------------------------    |
| `userName`    | `string` |  username of selected user    |
| `email`       | `string` |  email of selected user       |
|    `id`       | `Int`    |  id of selected user          |

#### Logout
```http
  GET /api/v2/session/logout
```
### CRUD Blog
#### Create Blog
```http
  POST /api/v2/blog/
```
| Constraints       | Type        | Description                   |
| :--------         | :-------    | :-------------------------    |
| `isAuthenticated` | `middleware`| **Required** you must be logged in to create a post |

| Request Body  | Type      | Description                      |
| :--------     | :-------  | :-------------------------       |
| `title`       | `string`  | **Required** .main title of blog |
| `description` | `string`  | describe your blog               |
| `tags`        | `string`  | tag your post to specific topic ["programming", "health", "sports"]                            |

#### Find Blog
```http
  GET /api/v2/blog?
```
| Request Query  | Type     | Description                    |
| :--------      | :------- | :-------------------------     |
| `id`           | `string` |  get blog with it's id         |
| `author`       | `string` |  get blogs for specific author |

#### Delete Blog
```http
  DELETE /api/v2/blog/${id}
```
| Constraints       | Type        | Description                   |
| :--------         | :-------    | :-------------------------    |
| `isAuthenticated` | `middleware`| **Required** you must be logged in to create a blog                                        |
| `isAuthorized`    | `middleware`| **Required** you must be that owner of the blog                                                 |

| Request Parameters | Type     | Description                    |
| :--------          | :------- | :-------------------------     |
| `id`               | `string` |  **Required** .id of deleted blog|

## Contributing

Contributions are always welcome!

## Authors

- [@AhmedEid](https://github.com/ahmedeid6842/)

## Lessons Learned

- How to transition from javascript to typescript and reap the benefits of typescript.
- How to use Zod for validation.
- How to migrate MongDB and typescript.
- There is always something new to learn.


