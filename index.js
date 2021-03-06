var login = require('facebook-chat-api')
var prompt = require('prompt')
console.log("Enter your Facebook credentials - your password will not be visible as you type it in")

prompt.start();
prompt.get([{
		name: 'email',
		required: true
	}, {
		name: 'password',
		hidden: true,//so we don't see the user's password when they type it in
		conform: function (value) {
			return true;
		}
	}], function (err, result) {
		authenticate(result)//pass credentials to authenticate function
	}
);

function authenticate(credentials){//where credentials is the user's credentials as an object, fields `email` and `password
	login(credentials, function(err, api) {

		if(err) return console.error(err);

		console.log("Logged in as " + credentials.email)//we've authenticated

		api.setOptions({
			logLevel: "silent",
			//selfListen: true //uncomment this line if you want messages from yourself to be passed to the `api.listen` function - defaults to false so we don't get caught in a painful loop
		})

		api.listen(function(err, message) {//this function is called whenever we get a message
			if(err)
				return console.log(err)

			if(message.type != "message")
				return

			//put your message handling code here
			
			console.log("Got a message from",message.senderName,":",message.body)
			api.sendMessage(message.body.toUpperCase(), message.threadID)

		})

		//use the api object to use any of the functions in the facebook-chat-api docs
		//https://github.com/Schmavery/facebook-chat-api#documentation


	})

}