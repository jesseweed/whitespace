# Whitespace
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


## Installing & Configuring

### Installation

Clone to repo locall and run the following command to install all dependencies:
```
$ npm install
```

Then to start the server, simple run "grunt":

```
$ grunt
```

Then simply point your browser to [http://localhost:1856](http://localhost:1856)

#### Configuration
Whiteboard uses javascripts "eval" to run the code in the browser that has been written anytime the user in the code views presses cmd+enter. It can be dangerous to run scripts from unknown sources, so only observe sessions for users that you trust.

Because of this, there's a config setting which lets you decide whether or not to allow script to be executed in public/js/whitespace.js


```
WSP.config = {
  eval: {
    local: true,
    remote: false
  }
};
```

```WSP.config.local``` defines whether to allow the coder to run script in their own browser when then press cmd+enter (defaults to true).

```WSP.config.remote``` defines whether to allow a scripts to run in the observers browser when the coder press press cmd+enter (dafults to false). It should be noted, that if this is false but ```WSP.config.local``` is true, the observer to run the coders script in their browser when the observer presses cmd+enter.

This is a precaution to keep potentially harmful scripts from executing without your knowledge, while still allowing you to run a script if you've looked at it and deemed itsafe.



## Deployment

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

## Demo
##### CODE
[http://wsp-demo.herokuapp.com/code/octocat](http://wsp-demo.herokuapp.com/code/octocat)

##### OBSERVE
[http://wsp-demo.herokuapp.com/observe/octocat](http://wsp-demo.herokuapp.com/observe/octocat)


## Current Support & Future Plans
Currently this only supports running Javascript code. I plan to eventually add the ability to code & runn HTML & CSS code as well.

I also plan to add soon the ability for observers to push instructions in real time to the code environment with details on a specific challenge you might like the user to complete.