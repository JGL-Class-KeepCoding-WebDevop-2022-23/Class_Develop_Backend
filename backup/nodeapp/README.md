# NodeApp

Install dependencies with:

```sh
npm install
```

Initialize the database with:

```sh
npm run initDB
```

Start in development mode:

```sh
npm run dev
```

## start in cluster mode

```sh
npm run cluster
```

## General info

Application created with:

```sh
npx express-generator nodeapp --ejs
```

## Start a MongoDB Server in Macos or Linux

In the console go to MongoDB folder and:

```sh
./bin/mongod --dbpath ./data
```

## API Methods

### GET /api/agentes
{
    "results": [
        {
            "_id": "63eaac1bd919d8e221525522",
            "name": "Smith",
            "age": 39
        },
        ...
    ]
}