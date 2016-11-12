module.exports = {
  	hello: function(req, res) {
  		// On authentication join this user to the room_id ie the team_id say '12345'
		req.session.room = '123456';
		return res.view('homepage')
  	},
  	join_room: function(req, res){
		var roomName = req.session.room;
		  sails.sockets.join(req, roomName, function(err) {
		    if (err) {
		      return res.serverError(err);
		    }

		    // to mimic a database change.
		    setTimeout(function(){ 
	  			console.log("Emitting in 2 seconds in client log")
				sails.sockets.broadcast(req.session.room, {
				  	greetings: "hllo"
				});

	  		}, 2000);

		    return res.json({
		      message: 'Subscribed to a fun room called '+roomName+'!'
		    });
	  	});
  	}
}

