# Endpoints

## Character
- create `[POST]` `/characters`
	- throws BadRequestException if an unsupported value is provided for `character.gender` or `character.status`
- request body:
```
		{
			"firstName": "Cool",
			"lastName": "Cat",
			"status": "ALIVE",
			"stateOfOrigin": "Lagos",
			"gender": "MALE",
			"locationId": 1,
			"episodeIds": []
		}
```

- response body:
```
		{
		    "firstName": "Cool",
		    "lastName": "Cat",
		    "status": "ALIVE",
		    "stateOfOrigin": "Lagos",
		    "gender": "MALE",
		    "locationId": 1,
		    "episodes": [],
		    "id": 1,
		    "createdAt": "2024-06-06T11:03:28.699Z"
		}
```

- findOne `[GET]` `/characters/:id`
	- returns the character that matches the provided `id`
	- throws NotFoundException if no character matching `id`is found
	- response body:
```
		{
	        "id": 2,
	        "firstName": "Swae",
	        "lastName": "Lee",
	        "status": "UNKNOWN",
	        "stateOfOrigin": "Detroit",
	        "gender": "MALE",
	        "locationId": 1,
	        "createdAt": "2024-06-06T11:03:33.203Z",
	        "location": {
	            "id": 1,
	            "name": "NYC",
	            "longitude": "-73.935242",
	            "latitude": "40.730610",
	            "createdAt": "2024-06-06T11:02:52.586Z"
	        },
	        "episodes": [
	            {
	                "id": 1,
	                "name": "And so it begins",
	                "releaseDate": "2024-06-05T23:00:00.000Z",
	                "episodeCode": "EP01",
	                "createdAt": "2024-06-06T11:03:11.189Z",
	                "commentCount": null
	            }
	        ]
	    }
```

- findAll `[GET]` `/characters`
	- returns all characters if no ordering or filtering parameters are supplied
	- supports filtering characters on status, gender, and location via the location id
	- also supports sorting on name and first name. Both columns can be used to sort simultaneously with precedence given to the first name column, if present
	- Sorting options for ascending and descending are supported
	- `/characters?filterLocation=[ID]&filterStatus=[STATUS]&sortByName=[TRUE/FALSE]&sortByGender=[TRUE/FALSE]&sortAscending=[TRUE/FALSE]`
	- see `retrieve-characters.dto.ts`
	- response body:
```
		[
		    {
		        "id": 5,
		        "firstName": "Allpha",
		        "lastName": "Abbey",
		        "status": "DEAD",
		        "stateOfOrigin": "Tokyo",
		        "gender": "MALE",
		        "locationId": 2,
		        "createdAt": "2024-06-06T13:39:28.082Z",
		        "location": {
		            "id": 2,
		            "name": "Paris",
		            "longitude": "2.349014",
		            "latitude": "48.864716",
		            "createdAt": "2024-06-06T11:02:55.424Z"
		        },
		        "episodes": []
		    },
		    {
		        "id": 4,
		        "firstName": "Hero",
		        "lastName": "Dude",
		        "status": "ALIVE",
		        "stateOfOrigin": "NYC",
		        "gender": "MALE",
		        "locationId": 1,
		        "createdAt": "2024-06-06T11:03:41.163Z",
		        "location": {
		            "id": 1,
		            "name": "NYC",
		            "longitude": "-73.935242",
		            "latitude": "40.730610",
		            "createdAt": "2024-06-06T11:02:52.586Z"
		        },
		        "episodes": []
		    }
		]
```


- findEpisodeFeatures `[GET]` `/characters/:id/episodes`
	- returns the episodes that the character with `id` featured in

## Episode
- create `[POST]` `/episodes`
	- throws BadRequestException if the comment is a duplicate of an existing duplicate
- request body:
	```
		{
		    "name": "And so it begins",
		    "releaseDate": "2024-06-06",
		    "episodeCode": "EP01"
		}
	````
- response body:
	```
		{
		    "name": "And so it begins",
		    "releaseDate": "2024-06-06",
		    "episodeCode": "EP01",
		    "id": 1,
		    "createdAt": "2024-06-06T11:03:11.189Z"
		}
	```


- findAll `[GET]` `/episodes`
	- returns all episodes sorted by `release_date` column in ascending order
	- response body:
```
		[
		    {
		        "id": 3,
		        "name": "Long long ago",
		        "releaseDate": "2012-06-05T23:00:00.000Z",
		        "episodeCode": "EP00",
		        "createdAt": "2024-06-06T12:58:14.763Z",
		        "characters": [],
		        "episodeComments": []
		    },
		    {
		        "id": 2,
		        "name": "More to this",
		        "releaseDate": "2024-06-12T23:00:00.000Z",
		        "episodeCode": "EP02",
		        "createdAt": "2024-06-06T11:03:13.372Z",
		        "characters": [
		            {
		                "id": 3,
		                "firstName": "Hailey",
		                "lastName": "Bailey",
		                "status": "DEAD",
		                "stateOfOrigin": "Tennesse",
		                "gender": "FEMALE",
		                "locationId": 2,
		                "createdAt": "2024-06-06T11:03:36.985Z"
		            }
		        ],
		        "episodeComments": [
		            {
		                "id": 3,
		                "comment": "Look at the state of you",
		                "ipAddressLocation": "192.158.1.89",
		                "episodeId": 2,
		                "createdAt": "2024-06-06T11:03:24.945Z"
		            }
		        ]
		    }
		]
```

- findOne `[GET]` `/episodes`
	- returns the episode that matches the provided `id`
	- throws NotFoundException if no episode matching `id` is found
	- response body:
```
		{
		    "name": "And so it begins",
		    "releaseDate": "2024-06-06",
		    "episodeCode": "EP01",
		    "id": 1,
		    "createdAt": "2024-06-06T11:03:11.189Z"
		}
```

## Location
- create `[POST]` `/locations`
	- throws BadRequestException if a location exists on the same longitude and latitude
- request body:
```
		{
			"name": "NYC",
			"longitude": "-73.935242",
			"latitude": "40.730610"
		}
```
- response body:
```
		{
		    "name": "NYC",
		    "longitude": "-73.935242",
		    "latitude": "40.730610",
		    "id": 1,
		    "createdAt": "2024-06-06T11:02:52.586Z"
		}
```


- findOne `[GET]` `/locations/:id`
	- returns the location that matches the provided `id`
	- throws NotFoundException if no location matching `id` is found
	- response body:
```
		{
		    "name": "NYC",
		    "longitude": "-73.935242",
		    "latitude": "40.730610",
		    "id": 1,
		    "createdAt": "2024-06-06T11:02:52.586Z"
		}
```

- findAll `[GET]` `/locations`
	- returns all locations
	- response body:
```
		[
		    {
		        "id": 1,
		        "name": "NYC",
		        "longitude": "-73.935242",
		        "latitude": "40.730610",
		        "createdAt": "2024-06-06T11:02:52.586Z",
		        "characters": [
		            {
		                "id": 1,
		                "firstName": "Harley",
		                "lastName": "Davidson",
		                "status": "ALIVE",
		                "stateOfOrigin": "NYC",
		                "gender": "MALE",
		                "locationId": 1,
		                "createdAt": "2024-06-06T11:03:28.699Z"
		            }
		        ]
		    },
		    {
		        "id": 2,
		        "name": "Paris",
		        "longitude": "2.349014",
		        "latitude": "48.864716",
		        "createdAt": "2024-06-06T11:02:55.424Z",
		        "characters": [
		            {
		                "id": 3,
		                "firstName": "Hailey",
		                "lastName": "Bailey",
		                "status": "DEAD",
		                "stateOfOrigin": "Tennesse",
		                "gender": "FEMALE",
		                "locationId": 2,
		                "createdAt": "2024-06-06T11:03:36.985Z"
		            }
		        ]
		    }
		]
```


## Comment
- create `[POST]` `/comments`
	- throws BadRequestException if the comment is a duplicate of an existing comment from the same IP address
- request body:
```
		{
		    "comment": "this can be a short or long comment; but wrap it up in 250 chars",
		    "ipAddressLocation": "127.0.0.1",
		    "episodeId": 1
		}
```
- response body:
```
		{
		    "comment": "this can be a short or long comment; but wrap it up in 250 chars",
		    "ipAddressLocation": "127.0.0.1",
		    "episodeId": 1,
		    "id": 1,
		    "createdAt": "2024-06-06T11:03:18.728Z"
		}
```

- findAll `[GET]` `/comments`
	- returns all comments sorted by `created_at` column in descending order
	- response body:
```
		[
		    {
		        "id": 3,
		        "comment": "",
		        "ipAddressLocation": "192.158.1.89",
		        "episodeId": 2,
		        "createdAt": "2024-06-06T11:03:24.945Z"
		    },
		    {
		        "id": 2,
		        "comment": "Super thoughtful. super reasonable",
		        "ipAddressLocation": "192.158.1.38",
		        "episodeId": 2,
		        "createdAt": "2024-06-06T11:03:22.882Z"
		    },
		    {
		        "id": 1,
		        "comment": "this can be a short or long comment; but wrap it up in 250 chars",
		        "ipAddressLocation": "127.0.0.1",
		        "episodeId": 1,
		        "createdAt": "2024-06-06T11:03:18.728Z"
		    }
		]
```

- findOne `[GET]` `/comments/:id`
	- returns the comment that matches the provided `id`
	- throws NotFoundException if no comment matching `id` is found
	- response body:
```
		{
		    "comment": "this can be a short or long comment; but wrap it up in 250 chars",
		    "ipAddressLocation": "127.0.0.1",
		    "episodeId": 1,
		    "id": 1,
		    "createdAt": "2024-06-06T11:03:18.728Z"
		}
```



------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
