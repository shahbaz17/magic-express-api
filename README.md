# Node APIs secured by Magic

## Quickstart Instructions

```bash
$ git clone https://github.com/shahbaz17/magic-express-api
$ cd magic-express-api
$ mv .env.example .env
# enter your Magic API keys in your env variables
$ yarn install
$ yarn api
# starts server at http://localhost:8080 and have following route
#
# GET http://localhost:8080 - unsecured
# GET http://localhost:8080/secret - secured with Magic

# Alternatively, this repo also has a REST API
$ yarn rest-api
# starts server at http://localhost:8080 and have following route
#
# GET http://localhost:8080 - unsecured
# GET http://localhost:8080/api/talks - secured - list of talks
# GET http://localhost:8080/api/talks/:id - secured - display single talk based on id
# POST http://localhost:8080/api/talks - secured - create a talk
# PUT http://localhost:8080/api/talks/:id - secured - update a tallk based on id
# DELETE http://localhost:8080/api/talks/:id - secured - delete a talk based on id
```

## Environment Variables

```
PORT=8080
MAGIC_SECRET_KEY=sk_test_
```

## Get your Magic Keys

Sign Up with [Magic](https://dashboard.magic.link/signup) and get your `MAGIC_SECRET_KEY`.

![Dashboard Image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dw9pkxeqf1cpmuch5a1h.png)
