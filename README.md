# Lyrical-GraphQL
##Starter project from a GraphQL course on Udemy.com


###Setup Docker - Mongo DB:
#### Download and install Docker image and execute Docker container
````
docker run --name graph-mongo -v [local-vol]:/data/db -p 27017:27017 -p 8081:9000 
-e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=[password] -d mongo:4.1
````

#### Create user and database:
````
#REM# Enter docker container [graph-mongo]:
docker exec -it graph-mongo bash
#REM# Run script to create user for DB user for application:
mongo --authenticationDatabase admin --host localhost -u mongoadmin -p [password] lyricaldb --eval "db.createUser({user: 'lyrical', pwd: 'dev00199', roles:[{role:'readWrite',db:'lyricaldb'}]});"
````
##### Response:
```
MongoDB shell version v4.1.2
  connecting to: mongodb://localhost:27017/lyricaldb
  MongoDB server version: 4.1.2
  Successfully added user: {
  	"user" : "lyrical",
  	"roles" : [
  		{
  			"role" : "readWrite",
  			"db" : "lyricaldb"
  		}
  	]
  }
 ```
 
 
 ### Install Auth0 to integrate with Application 
 #### installation with npm
 ````npm install --save auth0-js````
 #### Auth0 configuration information
 1. Make a copy of file [Lyrical-GraphQL/client/auth/auth0-variables.js.example] and name it [Lyrical-GraphQL/client/auth/auth0-variables.js]
 2. Update Domain and Client ID variables within [Lyrical-GraphQL/client/auth/auth0-variables.js]: 
 ````
 export const AUTH_CONFIG = {
       domain: '{DOMAIN}',
       clientId: '{CLIENT_ID}',
       callbackUrl: 'http://localhost:4000/songs'
     }
 ````  
 
 ### React application:
 #### Install all necessary components:
 ````
 #REM# main directory
 npm install
 ````
 #### Run application:
 ````
 npm run dev
 ````
 
 Application is running on http://localhost:4000/#/
 