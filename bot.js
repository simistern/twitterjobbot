/*!
 * Bot.js : A Twitter bot that can retweet in response to the tweets matching particluar keyword
 * Version 1.0.0
 * Created by Debashis Barman (http://www.debashisbarman.in)
 * License : http://creativecommons.org/licenses/by-sa/3.0
 */

/* Configure the Twitter API */
var TWITTER_CONSUMER_KEY = 'IoFoVxgIPWJeKVtFoKZvNEdcJ';
var TWITTER_CONSUMER_SECRET = 'UYslm702dSFKHvgrYyGJAV4tsTe024XtbXEwGavMTV3jK0lpva';
var TWITTER_ACCESS_TOKEN = '4828358653-ryLfjymyKRlQkbTRhSI39jJWPytQXsylXvSiZj4';
var TWITTER_ACCESS_TOKEN_SECRET = 'K0goMBSK9Y14SLmGDk05q7ZnHppfXXo6ZVCEbXt26sgF3';

/* Set Twitter search phrase */
var TWITTER_SEARCH_PHRASE = '#Toronto AND #techjobs';
var incrementer = 0;
var Twit = require('twit');

var Bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN, 
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The bot is running...');

/* BotInit() : To initiate the bot */
function BotInit() {
	
	BotRetweet();
	//Bot.post('statuses/retweet/:id', { id: '669520341815836672' }, BotInitiated);
	function BotInitiated (error, data, response) {
		if (error) {
			console.log('Bot could not be initiated, : ' + error);
		}
		else {
  			console.log('Bot initiated : 669520341815836672');
		}
	}
	
}

/* BotRetweet() : To retweet the matching recent tweet */
function BotRetweet() {

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
	       incrementer++;
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}
		else {
    		try{
				var id = {
					id : data.statuses[incrementer].id_str
				}
			}
			catch(e){
			console.log('what a time: ' + e);
			}
/*			var name = {
				name : data.statuses[incrementer].screen_name
			} */

			Bot.post('statuses/retweet/:id', id, BotRetweeted);
			
			function BotRetweeted(error, response) {
				if (error) {
					console.log('Bot could not retweet, : ' + error);
					incrementer++;
				}
				else {
					//console.log('Bot retweeted : ' + i);
					console.log('Bot retweeted : ' + id.id);
					//console.log('Bot value : ' + JSON.stringify(data));
				}
			}
		}
	}
	
	/* Set an interval of 30 minutes (in microsecondes) */
	setInterval(BotRetweet, 2*60*1000);
}

/* Initiate the Bot */
BotInit();