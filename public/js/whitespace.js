/*

    FILE: WSP.JS
    DESCRIPTION: Basic App functions and config
    AUTHOR(S): Jesse Weed

    TO DO:
    - Compare use of head.js with another similar library

*/

var WSP = window.WSP || {};


/* - - - - - - - - - - - - - - - - - >

    CONFIGURATION & INITILIZATION

< - - - - - - - - - - - - - - - - - */


WSP.status = {
  user: 'disconnected'
},


WSP.init = function () {  // INITALIZE WSP

    var self = this;

    // SIZ CODE VIEW TO WINDOW
    $('#sample-code').css('height', $('body').height() - ( $('.console').height() + 30 ) );
    $('.challenge').css('height', $('body').height() -  ( $('.console').height() + 30 ) );

    $(window).resize(function() {
      $('#sample-code').css('height', $('body').height() - ( $('.console').height() + 30 ) );
      $('.challenge').css('height', $('body').height() -  ( $('.console').height() + 30 ) );
    });


    self.log(); // ACTIVATE OUR FAKE CONSOLE
    self.tab(); // CONVERT TABS TO SPACES

}; // END: INIT


// PIPE LOGGING TO OUR FAKE CONSOLE
WSP.log = function() {

  var log = console.log;
  console.log = function(msg) {
      log.apply(this, arguments);
      $('.log').append('<li class="console-log">' + msg + '</li>');
  };


  var info = console.info;
  console.info = function(msg) {
      info.apply(this, arguments);
      $('.log').append('<li class="console-info">' + msg + '</li>');
  };

  var error = console.error;
  console.error = function(msg) {
      error.apply(this, arguments);
      $('.log').append('<li class="console-error">' + msg + '</li>');
  };

  var warn = console.warn;
  console.warn = function(msg) {
      warn.apply(this, arguments);
      $('.log').append('<li class="console-warn">' + msg + '</li>');
  };


};


// OBSERVER USER CODE
WSP.socketListen = function( user ) {

  var self = this,
      socket = io.connect('/' + user);


  socket.on('userStatus', function (data) {

    if ( data.status === 'connected' ) {

      if ( WSP.status.user !== data.status ) {
        console.info(data.msg);
        WSP.status.user = data.status;
      }

    } else {

      if ( WSP.status.user !== data.status ) {
        console.error(data.msg);
        WSP.status.user = data.status;
      }

    }
  });



  socket.on('code', function (data) {

    $('#client-code').val(data.code);

    if ( data.run === true ) {
        $('.log').html('');
        eval( data.code ); // run the script(s)
    }


  });
};

// SEND USER CODE TO OBSERVER
WSP.socketSend = function( user ) {

  var self = this,
      socket = io.connect( '/' + user);

  // TELL THE SERVER WHEN THE USER IS CONNECTED
  $(document).ready(function() {
    socket.emit('update', { msg: 'waiting on input from ' + user });
    socket.emit('userStatus', { status: 'connected', msg: user + ' is connected' });
  });


  // SEND CODE UPDATE ON KEYUP
  $('#sample-code').keyup( function(e) {
      socket.emit('update', { msg: 'code received from: ' + user, code: $('#sample-code').val(), run: false });
  });

  // GET INITIAL DATA FOR PAGE
  socket.on('init', function (data) {
    $('.username').html(data.msg);
  });

  // RUN CODE
  WSP.run( user, function() {
      socket.emit('update', { msg: 'code received from: ' + user, code: $('#sample-code').val(), run: true });
  });


};

// RUN CODE ON CRTL/CMD + ENTER
WSP.run = function( user, cb ) {

  var self = this;

  $('body').keydown( function(e) {

    if ( e.which === 13 && (e.ctrlKey || e.metaKey) ) {
      cb();
      eval( $('#sample-code').val() ); // run the script(s)
    }

  });

};

// CONVERT TABS TO SPACES
WSP.tab = function () {

  $(document).delegate('#sample-code', 'keydown', function(e) {

    // IF TAB KEY
    if ( e.which === 9) {
      e.preventDefault();

      // GET CURSOR POSTION
      var start = $(this).get(0).selectionStart;
      var end = $(this).get(0).selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      $(this).val($(this).val().substring(0, start) + '  ' + $(this).val().substring(end));

      // put caret at right position again
      $(this).get(0).selectionStart =
      $(this).get(0).selectionEnd = start + 1;

      return false;
    }

  });

};



// END OF FILE: _MAIN.JS
