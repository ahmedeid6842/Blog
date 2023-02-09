<div align="center">
    <img src="https://user-images.githubusercontent.com/57197702/217839044-f0e66ebc-ff6f-4abf-b0e9-f926cc56f192.PNG">
</div>

# Affable

Affable manages your Blog through REST API and you can also see others' Blogs . 


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

#### Find User
```http
  GET /api/v2/user?
```
| Request Query | Type     | Description                   |
| :--------     | :------- | :-------------------------    |
| `userName`    | `string` |  username of selected user    |
| `email`       | `string` |  email of selected user       |
|    `id`       | `Int`    |  id of selected user          |

#### Login 
```http
  POST /api/v2/session/login
```
| Request Body | Type     | Description                          |
| :--------    | :------- | :-------------------------           |
| `email`      | `string` | **Required** .email of exist user    |
| `passwrod`   | `string` | **Required** .password of that email |

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




