# REST API MOVIES

## Database Configuration

After DB install change config in `index.js` file (linie 15-21):

```js
const client = new Pool ({
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432, // podaj port
    database: process.env.PGDB || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: process.env.POSTGRES_PASS || 'zaq1@WSX' // change password
});
```


## Available Scripts

Installing the necessary packages:
```
yarn install
```

Backend start:
```
yarn start
```

Backend available at:
```
http://localhost:3000
```


## Available endpoints:

```json
GET /movies // Get all movies

// Response
[
    {
        "id": 1, 
        "title": "Zielona mila",
        "director": "Frank Darabont",
        "genre": "Dramat",
        "year": 1999,
        "description": "Emerytowany strażnik więzienny...",
        "image_url": "https://...",
        "rating_count": 7,
        "rating": 4
    }
]
```

```json
GET /movie/{id} // Get movie of id

// Response
{
    "id": 1, 
    "title": "Zielona mila",
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999,
    "description": "Emerytowany strażnik więzienny...",
    "image_url": "https://...",
    "rating_count": 7,
    "rating": 4
}
```

```json
POST /movie // Add movie

// Parameters - przykładowe body
{
    "title": "Zielona mila", // unique value
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999, // value between 1000 and current year
    "description": "Emerytowany strażnik więzienny...",
    "image_url": null //can be null
}

// Response
{
    "title": "Zielona mila", // unique value
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999,
    "description": "Emerytowany strażnik więzienny...",
    "image_url": null, // can be nulle
    "rating_count": 7,
    "rating": 4
}
```

```json
PUT /movie/{id} // Edit movie of id

// Parameters - przykładowe body
{
    "title": "Zielona mila", // unique value
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999, // value between 1000 and current year
    "description": "Emerytowany strażnik więzienny...",
    "image_url": "https://..." // can be nulle
}

// Response
{
    "title": "Zielona mila",
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999,
    "description": "Emerytowany strażnik więzienny...",
    "image_url": null
}
```

```json
DELETE /movie/{id} // Delete movie of id
```

```json
GET /movie/{id}/rate // Get rating of movie of id

// Response 
{
    "id": "1",
    "rating_count": 7,
    "rating": 4
}
```

```json
PATCH /movie/{id}/rate // Rate movie of id

// Parameters - query
score // ?score={score}, where score between 1 and 5

// Response 
{
    "id": 1,
    "title": "Zielona mila",
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999,
    "description": "Emerytowany strażnik więzienny...",
    "image_url": "https://...",
    "rating_count": 10,
    "rating": 4.3
}
```