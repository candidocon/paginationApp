# READ ME

A solution to the pagination challenge built with Express and MongoDB

## Required

Make sure you have Node.js,Express,and MongoDB installed
Here are some helpful links:
How to install [Node.js](https://www.taniarascia.com/how-to-install-and-use-node-js-and-npm-mac-and-windows/)
How to install [Express](https://expressjs.com/en/starter/installing.html)
How to install [mongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

## Usage

You can use [Postman](https://www.getpostman.com/) to make post requests
use port localhost:3000

the requests should be JSON format as follows

```js
{"params": {
    "range": {
        "by": "id",
        "start": 10,
        "end": 50,
        "max": 5,
        "order": "asc"
    }
 }
}
```
