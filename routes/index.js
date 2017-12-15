var express = require('express');
var router = express.Router();
var fs = require("fs");
var request = require('request-json');
var contents = fs.readFileSync("./routes/dummy.json");
//var dummy = JSON.parse(contents);
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const http = require('http');
var spawn = require('child_process').spawn;
var PythonShell = require('python-shell');
var PriorityQueue = require('priorityqueuejs');




// var ls  = spawn('ls', ['./consensus.py']);
// ls.stdout.on('data', (data) => {
// 	//console.log("WOWOWO");
//     console.log(`stdout: ${data}`);
// });


var index = 1; 
var v_index = 0;

var num_fnodes = 0;
var num_miners = 0;
var theChain = "";

//console.log("User Name:", dummy.username);

var postings = [ 
	{"uid" : 1, "username":"xyz", "content": "hey how is everyone doing today?", "timestamp": "unknown", "status": "unverified"},
	{"uid" : 2, "username":"zaid", "content": "how am i?", "timestamp": "unknown", "status": "unverified" }
]

var v_postings = [
	{"uid" : 1, "username":"verified_loser", "content": "wow first verified post", "timestamp": "unknown", "status": "verified"},
	{"uid" : 2, "username":"verified_loser", "content": "wow first cool post", "timestamp": "unknown", "status": "verified"}
]

//var f_nodes = [];

// var f_nodes = new PriorityQueue(function(a, b) {
//   return a.cash - b.cash;
// });

var f_nodes = new PriorityQueue(function(a, b)
	{
		return b.freq - a.freq;
	});


// const options = {
// // element.uid >>> BELOW
// hostname: '132.162.68.50',
// port: 3000,
// path: '/',
// method: 'GET',
// // headers: {
// // 'content-type': 'application/json',
// // 'accept': 'application/json'
// // }
// };

// const req = http.request(options, (res) => {
// 	res.setEncoding('utf8');
// 	res.on('data', (chunk) => {
//     	console.log(`BODY: ${chunk}`);
// 	});
// 	res.on('end', () => {
//    		console.log('No more data in response.');
// 	 	});
// });	


// var client = request.createClient('3000', '132.162.68.50');

// client.get('/hello', function(err, res, body) {
//   return console.log(res.statusCode);
// });


// var client = request.createClient("https://boiling-cove-42309.herokuapp.com/");

// client.get('/hello', function(err, res, body) {
//   return console.log(res.statusCode);
// });

router.get('/hello', function(req, res, next) {
	var output = JSON.stringify(postings);
  	res.send(output);
  //consolelog("hell yah");
  //res.render('post', { username: dummy.username }, { post: dummy.post });
});

// heeesf

//post changed to content, add time stamp, index = uid

// make unverified, verified arrays, when i send them make them in progress
// send every time 
// make a counter for full nodes, if i try to connect to  a full node and get a service error disconnect the full node
// 

/* GET home page. */
router.get('/', function(req, res, next) {

  // res.render('index', { title: 'Spherical', posts: postings, username: postings[index].username, post: postings[index].content, verification: "Unverified"  });
  //res.render('post', { username: dummy.username }, { post: dummy.post });
  postings.reverse();
	v_postings.reverse();
  res.render('index', { title: 'Spherical', posts: postings, username: postings[index].username, post: postings[index].content, index: index, 
	verification: "Unverified", v_posts: v_postings, v_username: v_postings[v_index].username, post: v_postings[v_index].content, v_index: v_index, 
	v_verification: "Verified"});
  postings.reverse();
	v_postings.reverse();
});





// // for nodes trying to register with me
// router.get('/consensus', function(req, res, next) {

// 	$.post( "ajax/test.html", function( data ) {
//   	$( ".result" ).html( data );
// 	});
//   //res.render('index', { title: 'Spherical', posts: postings, username: postings[index].username, post: postings[index].post  });
//   //res.render('post', { username: dummy.username }, { post: dummy.post });
// });


router.post('/posts', function(req, res)
{
	console.log("cool");
	// var query1=req.body.var1;
	// var query2=req.body.var2;
	// console.log(query1);
	// console.log(query2);
	//var content=req.body.content;
	var timeInMs = Date.now();

	//dummy.posts.push({"num" : index+1, "username":"xyz", "content": "hey how is everyone doing today?", "verification":
	//"unverified" });
	// fs.writeFile("./routes/dummy.json", "whats up", function(err) {
 //    if(err) {
 //        return console.log(err);
 //    }
	// });
	postings.push({uid : ++index, "username":req.body.user, "content":req.body.content, "timestamp": timeInMs,  "status": "Unverified"});
	// console.log(req.body.content);
	// console.log(req.body.user);
	// console.log("here is index: " +index);

	// THIS IS WHERE U CAN CONVERT THE ARRAY TO JSON AND THEN SEND IT!!!!!

	console.log( '{"nodes":' + JSON.stringify(postings) + '}');



	// for(var i = 0; i< postings.length; i++)
	// {
	// 	console.log( JSON.stringify({uid: postings[i] }));
	// }


	// f_nodes.forEach(function(element)
	// {
	// 	const options = {
	// 	// element.uid >>> BELOW
 //    	hostname: '172.28.49.9',
 //    	port: 8080,
 //   		path: '/injection',
 //    	method: 'POST',
 //    	headers: {
 //        'content-type': 'application/json',
 //        'accept': 'application/json'
 //    }
	// };

	// const req = http.request(options, (res) => {
 //    	res.setEncoding('utf8');
 //    	res.on('data', (chunk) => {
 //        	console.log(`BODY: ${chunk}`);
 //    	});
 //    	res.on('end', () => {
 //       		console.log('No more data in response.');
 //   	 	});
	// });	

	// });





	//{"uid":"c847aab9afb9c0e9e2e78eab216fa514c5f8bb667304f02b0b9e86649364b4a5","timestamp":"2017-12-15 00:33:54.332458 UTC","url":"132.162.123.15:3000"}




	// send to full nodes
	if( num_fnodes > 0 )
	{
		var fn = function( node )
		{
			const bodyParser = require('body-parser');

			var client = request.createClient("http://" + node.url);

			console.log("THIS IS IMPORTANT: " + node.url);

 			var data = JSON.stringify('{"nodes":' + JSON.stringify(postings) + '}');
 			//console.log(x);

			client.post('/cargo', data, function(err, res, body) {
	 		//console.log("cool");
			//res.send(x);
			//res.send("hey whats going on");
			return console.log(res.statusCode);
			});
		}
		f_nodes.forEach(fn);

	}

	console.log(f_nodes.peek);


	//router.set('view engine', 'ejs');
	//res.send('post.pug', { username: posts[index].username, post: posts[index].post });
	//router.set('view engine', 'pug');
	//res.redirect('/');

	res.redirect('/');

	postings.reverse();
	v_postings.reverse();
	res.render('index', { title: 'Spherical', posts: postings, username: postings[index].username, post: postings[index].content, index: index, 
	verification: postings[index].status, v_posts: v_postings, v_username: v_postings[v_index].username, post: v_postings[v_index].content, v_index: v_index, 
	v_verification: "Verified"});
	v_postings.reverse();
	postings.reverse();
	// res.render('index', { title: 'Spherical', posts: postings, username: postings[index].username, post: postings[index].content, index: index, 
	// verification: "Unverified"});


	

	res.end();

});


router.get('/', function(req, res)
	{
		res.render('/posts');
	});





// registering a passport.json
router.post('/client', function(req, res, next) {
	// for( var i = 0; i < req.body.length; i++)
	// {
	console.log(req.body);	
		// get all the full node information in here
	//var j_url = JSON.stringify(req.body);
	var tuple = { url: req.body.url, freq: 1, hash: req.body.hash }
	f_nodes.enq( tuple );

	// }

	// forward the json string to everyother url if the url isnt in priority quee 
	// 269 response code u can change that blocks hash to the newwest hash in the tuple
	// 469 if rejected
	console.log(f_nodes);

	num_fnodes = num_fnodes + 1;
//f_nodes.peek().url
	res.status(250).json({  URL: f_nodes.peek().url });
	//res.send(f_nodes.peek().url);

});


router.post('/transaction', function(req, res, next)
{

});
// send get request to transactions route


/// econcensus 

// for verifying posts
router.post('/package', function(req, res, next) {
	
	package = req.body;
	package_url = req.body.url;
	package_hash = req.body.hash;
	var fn = function(node)
	{
		if(node.url !== package_url)
		{
			var client = request.createClient("http://" + node.url);

 			//var data = JSON.stringify('{"nodes":' + JSON.stringify(postings) + '}');
 			//console.log(x);
 			data = package;
			client.post('/package', data, function(err, res, body) {
	 		//console.log("cool");
			//res.send(x);
			//res.send("hey whats going on");
			if(res.statusCode === 269)
			{
				node.hash = package_hash;
			}
			});
			//do nothing
		}
	}
	f_nodes.forEach(fn);
	res.send(250);
});

// for verifying posts
router.post('/cargo', function(req, res, next) {
	// for each in postings
	// {
	// 	for( each in req.body )
	// 		if( req.body.uid == postings.uid )
	// 		{
	// 			// copy into v_postings
	// 		}
	// }
	for( var i = 0; i < req.body.length; i++)
	{
		for( var x = 0; x < postings.length; i++)
		{
			if( postings[x].uid === req.body.uid[i]) 
			{
				v_postings.push(postings[x]);
				postings.splice(x, 1);
			}
			// get all the full node information in here		
		}
	}


	

	res.send(250);
});




router.post('/remove', function(req, res, next)
{
	num_fnodes = num_fnodes - 1;
	var fn = function(node)
	{
		if(req.body.url === node.url)
			{
				f_nodes.freq = 0;
				f_nodes.deq();
			}
	}
	f_nodes.forEach(fn);

	res.status(250).json({URL: f_nodes.size() })

});


let writeStream = fs.createWriteStream("./routes/dummy.json");




// from full node for consensus
router.post('/consensus', function(req, res, next) {


	// fs.readFile('max_hash.txt', function(err, data) {
 //    //res.writeHead(200, {'Content-Type': 'text/html'});
 //    //console.log("HEWOIHFEHW");
 //    max_hash = data;

// asdfasdf 
 //    res.end();
 // 	 });
 	//var input = fs.writeFileSync('data.json', req.body);
 	
 	fs.writeFile('data.json', JSON.stringify(req.body));


 	PythonShell.run('consensus.py', function (err) {
  		if (err) throw err;
 		console.log('finished');
	});

 	var text = fs.readFileSync('max_hash.txt', 'utf8');

 	var chain = {};

 	var fn = function(node)
 	{
 		if( text === node.hash )
 		{
 			var client = request.createClient("http://" + node.url)
 			client.get('/econsensus', function(err, res, body) {
				console.log(body);
				chain = body;
 				return console.log(res.statusCode);
 			});

 		}
 	}

 	f_nodes.forEach(fn);


 	var fx = function(node)
 	{
 		var client = request.createClient("http://" + node.url);
 		data = chain;
 		client.post('/injection', data, function(err, res, body) {
 			// this part is important

			});
 	}

 	f_nodes.forEach(fx);
 	// get request to econsensus the url of the hash that matches
 	// full node that u sent to will send u back the chain u need to inject to itll have hash of chain
 	// and merkel transactions 

 	// send to injection route
 	
 	console.log(text);
 	

	
	// send post request to all full ndoes here
	res.send(250);
});

router.post('/chain', function(req, res, next) {


	theChain = req.body;
	res.send(250);
});

// for DJ PRotocol B from full node
router.post('/doublejeopardy', function(req, res, next) {

	res.send(250);
});

// for DJ PRotocol B from full node
router.post('/scores', function(req, res, next) {

	res.send(250);
});

/// restartttt


router.post('/miner', function(req, res, next)
{
	var miner_url = req.body.url;
	console.log("this is the thing ur recieveing: " + req.body.url);
	
	if( f_nodes.size() == 0 )
	{
		res.status(450)
	}

	res.status(250).json({URL: f_nodes.peek().url})
	
	console.log("THIS IS THE PEEK: " + f_nodes.peek().freq)

	res.end();
});

// sdfasdf h
// asdohfaosidf 

router.post('/register', function(req, res, next) {
	//res.render('thing', {body: req.body})
	// writeStream.write(req.body, function(err) {
 //    if(err) {
 //        return console.log(err);
 //    }
 // sdfsadf
	// });
	// console.log(req.body);
	res.send(250);
});

module.exports = router;
