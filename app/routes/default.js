module.exports = function(app, tesla) {

  var dir = '../../',
      controllers = dir + 'app/controllers/',
      routes = dir + 'app/routes/';
      require('colors');


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //
  // - - - - - - - - - - - - CUSTOM ROUTES GO HERE - - - - - - - - - - - - - //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //



  // CREATE CODE ROOM FOR USER
  app.get('/code/:user', function(req, res) {

    var user = req.params.user,
        codeRoom = app.io.of('/' + user);

    codeRoom.on('connection', function(socket){

      socket.broadcast.emit('userStatus', { status: 'connected', msg: 'user ' + user + ' is connected' });

      socket.emit('init', { msg: 'Hi ' + user + '!' });

      socket.on('update', function (data) {
        console.log(data);
      });

      socket.on('disconnect', function () {
        console.log('user disconnected');
        socket.broadcast.emit('userStatus', { status: 'disconnected', msg: 'user ' + user + ' has disconnected' });
      });

      socket.on('userStatus', function (data) {
       console.log(data);
       console.log('user connected');
       console.log(data);
      });

    });

    res.render('code', {
      title : app.site.name,
      site: app.site,
      user: user
    });

  });


  // OBSERVE CODE ROOM FOR USER
  app.get('/observe/:user', function(req, res) {

    var user = req.params.user,
        codeRoom = app.io.of('/' + user);


    codeRoom.on('connection', function(socket){

      socket.on('update', function (data) {
        console.log(data);
        socket.broadcast.emit('code', { code: data.code, run: data.run });
      });


      // socket.on('userStatus', function (data) {
      //   console.log('user connected');
      //   console.log(data);
      //   socket.broadcast.emit('userStatus', { status: data.connection, msg: data.msg });
      // });

    });

    res.render('observe', {
      title : app.site.name,
      site: app.site,
      user: user
    });

  });




  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //
  // - - - DANGER ! DON'T EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING - - - //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //


    // AUTO ROUTER (THIS SHOULD COME AFTER ANY CUSTOME ROUTES)
    if ( app.config.autoRouting === true ) {
      tesla.log( 'INFO:'.blue + ' using auto router');
      require(routes + 'system/auto')(app, tesla);
    }

    // ERROR HANDLER
    require(routes + 'system/errors')(app);

};
