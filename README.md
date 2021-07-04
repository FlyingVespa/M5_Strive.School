# M5_Strive.School

##Packages To Install For Project

####Step 1: create package.json
npm init -y

####Step 2: install packages

```
npm i libarary_name
```

Libraries:
**express** ----> _initiates server_
**express-list-endpoints** ----> _helps view router lists_
**nodemon** ----> _creates almost like live-server, when saving auto prevent restart project to see implemented changes._
**dotenv** ----> _creates environment to store "secret" stuff , such as api keys, port numbers etc to not be uploaded on github_
**http-errors** ----> _creates custom error messages_
**multer** ----> _handles uploads of files_
**cors** ----> does something
**uniqid** ----> creates unique id's
**cloudaniry** ----> free cloud storage
**express-validator**
**fs-extra**

```
npm i express express-list-endpoints dotenv http-errors cors cloudinary multer uniqid express-validator fs-extra
```

save node mone in dev mode with -D (when publishing it won't be in package)

```
npm i -D nodemon
```

####Step 4: Edit package.json
Add the following to package.json.
Under scripts,

"dev": "nodemon -r dotenv/config -e js src/server.js"
then to start server type:

```js
npm run dev
```
