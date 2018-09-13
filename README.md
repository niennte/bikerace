# README

An experimental web app for a bicycle race event built with Rails and React, mashing up third party API services (photosharing, geolocation and graphic library, real time data streaming).

[Live demo](https://evening-ravine-37137.herokuapp.com/)

## System dependencies:
#####dev, test:
1) Ruby (2.5.0)
2) Rails (5.2.0)
3) Node w / yarn or npm (dev)
4) git, any reasonable version
5) Postgre run locally (dev)
#####prod:
1) git
2) heroku CLI

## Third party services: 
##### all environments
1) [flickr](flickr.com) - API key to access flickr service programmatically
2) [mapbox](mapbox.com) - token and style, update manually in app/javascript/components/Map.js to access mapbox and apply custom style
3) [pubnub](pubnub.com) - publish and subscribe keys for the datastream app managing data sent by GPS devices

### Deployment:
##### Production (deployment to heroku):
- clone repo and navigate into it
```
$ git clone [repo] [your_pathname]
$ cd [your_pathname]
```
- login to Heroku and deploy app
```
$ heroku login
$ heroku create
$ git push heroku master
```
- set up and populate production database
```
$ heroku run rails db:create
$ heroku run rails db:seed
```

##### API keys - provide to server as environment variables

- Flickr: Obtain the API key from your flickr account. 
- Run (replace [your-flickr-key] with your actual key, no quotes, no brackets)
```
$ heroku config:set API_KEY=[your-flickr-key]
```
- Pubnub: Create an app and obtain publish and subscribe keys
- Run (replace [your-pubnub-publish-key] and [your-pubnub-subscribe-key] with your actual publish and subscribe keys for the app, no brackets, no quotes)
```
$ heroku config:set PN_PUB_KEY=[your-pubnub-publish-key]
$ heroku config:set PN_SUB_KEY=[your-pubnub-subscribe-key]
```
(or set the environment variables through the heroku web app)

- app available at the address indicated when deployment is finished, or run
```
$ heroku open
```
 
#### Development (running locally):
- clone repo and navigate into it
```linux
$ git clone [repo] [your_pathname]
$ cd [your_pathname]
```
- update Ruby gems
```linux
$ rails bundle
```

- update Node modules
```linux
$ yarn install
```

- run postgre locally - if needed, update config/database.yml

- set up and populate dev database
```linux
$ rails db:create
$ rails db:seed
```

##### API keys as environment vars:

- Flickr: Create or log into your flickr account at flickr.com. Obtain the API development key

- Pubnub: Make a Pubnub account at pubnub.com. Create an app and obtain publish and subscribe keys

- Run dev server passing inline your API creds as environment vars
(replace [your-pubnub-subscribe-key], [your-pubnub-subscribe-key], [your-pubnub-subscribe-key] with your actual keys, no brackets, no quotes)
```
$ API_KEY=[your-flickr-api-key] PN_PUB_KEY=[your-pubnub-publish-key] PN_SUB_KEY=[your-pubnub-subscribe-key] rails server
```

- App running at localhost (0.0.0.0) port indicated by the server output, eg:
```
...
Listening on tcp://0.0.0.0:3000
...
```
available at [http://localhost:3000](http://localhost:3000)


### Test:

##### standard:
```
$ rails test -v
```
##### system:

```
$ rails test -v test/system/*
```

### Live demo: 
https://evening-ravine-37137.herokuapp.com/
