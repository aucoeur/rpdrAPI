# Usage

This API is still under development.  `GET` requests are available without a key or user-credentials but `POST`, `PUT`, `DELETE` functionality requires users to be to registered and authenticated.

## Basic Endpoints

### Get All Queens

Place `GET` request at `/api/queen/all`

### Get Queen By ID

Place `GET` request at `/api/queen/:id`

Sample data:
```json
    {
        "_id": "5e5da29fb479040e7ca22c3d",
        "seasons": [],
        "name": "Yuhua Hamasaki",
        "govtname": " Yuhua Ou",
        "birthdate": "1990-03-01T00:00:00.000Z",
        "__v": 0
    }
```

### Get All Seasons

Place `GET` request at `/api/season/all`

### Get Season By ID

Place `GET` request at `/api/season/:id`

Sample data:
```json
    {
        "episodes": [
            {
                "_id": "5e61b98943eb39b23bf4fbd5",
                "episodeNumber": 1,
                "title": "All Star Talent Show Extravaganza"
            }
        ],
        "queens": [
            {
                "_id": "5e61c29feb0096b730c88cb3",
                "name": "Katya Zamolodchikova"
            },
            {
                "_id": "5e61c7c564fb6bb8fb200366",
                "name": "Alyssa Edwards"
            },
            {
                "_id": "5e61d256e21c9dbcbb035a86",
                "name": "Detox Icunt"
            }
        ],
        "_id": "5e5d8107b99afea2ec5c91b3",
        "seasonNumber": 2,
        "premiereDate": "2015-03-02T00:00:00.000Z",
        "seriesType": "All Stars",
        "__v": 4
    }
```


## Protected Endpoints

The following endpoints are only available to registered users.  After login, use JWT token given in `Authorization` header to send `POST`, `PUT`, `DELETE` requests using Postman or otherwise.

> Set this in `HEADERS`:
>
>| Key  | Value  |
>|---|---|
>| Content-Type  | application/json   |
>|   |   |
>| Authorization  | Bearer *yourtokenhere*   |
>


### Create a New Queen

Send `POST` request to `/api/queen/create`

```json
{
	"name": "Manila Luzon",
	"govtname": "Karl Philip Michael Westerberg",
    "birthdate": "1981-08-10",
}
```

### Edit an Existing Queen

Send `PUT` request to `/api/queen/:id`

```json
{
	"name": "Alaska Thunderfun 5000",
	"govtname": "Justin Honard"
}
```

### Delete an Existing Queen

Send `DELETE` request to `/api/queen/:id`

```json
{
	"name": "Alaska Thunderfun 5000",
	"govtname": "Justin Honard"
}
```

