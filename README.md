# surgical-api
convert filenames into suggested tags

## Quickstart guide
0. Create a `.env` file with the following code (no sensitive info here, but still .gitignore for best practices):

	`APP_NAME=acme`

	`PORT=3000`

	`MONGO_URI=mongodb://localhost:27017`
2. `docker run -it -v mongodata:/data/db -p 27017:27017 --name mongodb -d mongo`
3. `npm install`
4. `node app.js`

The first step runs a local docker container with a mongodb database on port `27017`, second step install dependencies, and third step runs server-side app on port `3000` by default.
Replace `localhost:3000` with the your port if running locally, or with production endpoint when running live


## Operation create
In order to create an operation, the public-facing cloud product sends a POST request to the `/operations` endpoint, containing the payload of the unique operationId, as well as userId, surgeonId, and filename. Here's a sample operation created with this curl request:

    curl -X POST -H "Content-Type: application/json" -d '{ "userId": "izzy", "doctorId": "House", "operationId": "1", "filename": "12313_laser-operation.mov" }' http://localhost:3000/operations

Successful operation creation returns `201` HTTP status code with the entire created operation as a JSON, and stores the operation with augmented suggested surgery name list. If the operationId already exists in the database, code `400` is returned with the "Operation already exists" message. Otherwise, a `500` Internal Service Error HTTP status code is returned.

## Operation return

In order to fetch an operation, the public-facing cloud product sends a GET request to the `/operations/:operation` endpoint, requiring the `operationId` param within the url but containing no payload. Here's a sample return of a operation with `operationId: '1'` :

  

    curl -X GET -H "Content-Type: application/json" -d '{}' http://localhost:3000/operations/1

Successful operation fetch returns `201` HTTP status code with the operation information. No operation with the provided `operationId` returns `404` code with Operation Not Found message. Otherwise, a `500` Internal Service Error HTTP status code is returned.

  

## Operation update

In order to update an operation, the public-facing cloud product sends a PUT request to the `/operation/:operationId` endpoint, requiring the foreign key `operationId` within the url and containing a payload of any parameters to be updated. Here's a sample update of a operation with `operationId: '1'` :

  

    curl -X PUT -H "Content-Type: application/json" -d '{ "doctorId": "Snow" }' http://localhost:3000/operations/1

Successful operation update returns `201` HTTP status code with the operation information, augmented by list of suggested procedure names. No operation with the provided `operationId` returns `404` code with "Operation not found" message. Otherwise, a `500` Internal Service Error HTTP status code is returned.

  

## Operation delete

In order to delete a operation, the public-facing cloud product sends a DELETE request to the `/operations/:operationId` endpoint, requiring the foreign key `operationId` within the url and containing no payload. Here's a sample delete of a operation with `operationId: '1'` :

  

    curl -X DELETE -H "Content-Type: application/json" -d '{}' http://localhost:3000/operations/1

Successful operation delete returns `201` HTTP status code. No operation with the provided `operationId` returns `404` code with "Operation not found" message. Otherwise, a `500` Internal Service Error HTTP status code is returned.
