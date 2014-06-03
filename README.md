# Whiteboard
Proof of concept digital white-boarding app for remote tech screens & code challenges.

## Environment
The runs on top of Node.js app uses socket.io to allow communication between a coding environment and an observation environment.


### Code
Dynamic URL's to give to candidates that creates a unique environment where they can code in the browser. For example, to create an environment for a user named Bob Dylan:

[http://mydomain.com/code/bobdylan](http://mydomain.com/code/bobdylan)

The user will have access to jQuery as well as any native JavaScript commands, as well as a console clone at the bottom of the screen.

### Observe
Watch the candidate code & real time, and see their code executed in real-time. Just go to observe/usernam. For example:

[http://mydomain.com/observer/bobdylan](http://mydomain.com/observe/bobdylan)

###### WARNING!
This code uses javascripts "eval" to run the code in the browser that has been written anytime the user in the code views presses cmd+enter. It can be dangerous to run scripts from unknown sources, so only observe sessions for users that you trust.


### Installing & Configuring
Clone to repo locall and run the following command to install all dependencies:
```
$ npm install
```

Then to start the server, simple run "grunt":

```
$ grunt
```

Then simply point your browser to [http://localhost:1856](http://localhost:1856)

### Deployment

Whiteboard is configured to work with Heroku out of the box. To delpoy, just open a terminal window and follow these commands (just be sure to replace {app_name} with the name of your app):

```
// LOG IN TO YOUR HEROKU ACCOUNT
heroku login

// CREATE A NEW APP
heroku apps:create {app_name}

// SET THE NODE ENVIRONMENT
heroku config:add NODE_ENV=production --remote heroku --app {app_name}

// PUSH THE CODE TO HEROKU
git push heroku master


// ENABLE WEB SOCKETS FOR YOUR APP
heroku labs:enable websockets


```


## Current Support & Future Plans
Currently this only supports running Javascript code. I plan to eventually add the ability to code & runn HTML & CSS code as well.

I also plan to add soon the ability for observers to push instructions in real time to the code environment with details on a specific challenge you might like the user to complete.