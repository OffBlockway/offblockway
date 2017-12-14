var express = require('express');
var router = express.Router();
var fs = require("fs");
var request = require('request-json');
var contents = fs.readFileSync("./routes/dummy.json");
var dummy = JSON.parse(contents);
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const http = require('http');


var index = 1; 
var v_index = 0;

console.log("User Name:", dummy.username);

var postings = [ 
	{"num" : 1, "username":"xyz", "content": "hey how is everyone doing today?", "verification": "unverified", "timestamp": "unknown" },
	{"num" : 2, "username":"zaid", "content": "how am i?", "verification": "unverified", "timestamp": "unknown" }
]

var v_postings = [
	{"num" : 1, "username":"verified_loser", "content": "wow first verified post", "verification": "verified", "timestamp": "unknown" },
	{"num" : 2, "username":"verified_loser", "content": "wow first cool post", "verification": "verified", "timestamp": "unknown" }
]

var f_nodes = [];



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
	postings.push({num : ++index, "username":req.body.user, "content":req.body.content, "verification": "Unverified", "timestamp": timeInMs});
	console.log(req.body.content);
	console.log(req.body.user);
	console.log("here is index: " +index);

	// THIS IS WHERE U CAN CONVERT THE ARRAY TO JSON AND THEN SEND IT!!!!!
	console.log( JSON.stringify(postings));


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


	//router.set('view engine', 'ejs');
	//res.send('post.pug', { username: posts[index].username, post: posts[index].post });
	//router.set('view engine', 'pug');
	//res.redirect('/');

	res.redirect('/');

	postings.reverse();
	v_postings.reverse();
	res.render('index', { title: 'Spherical', posts: postings, username: postings[index].username, post: postings[index].content, index: index, 
	verification: "Unverified", v_posts: v_postings, v_username: v_postings[v_index].username, post: v_postings[v_index].content, v_index: v_index, 
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
router.post('/register', function(req, res, next) {
	for( var i = 0; i < req.body.length; i++)
	{
		console.log(req.body[i].uid);	
		// get all the full node information in here
		f_nodes.push({"uid" : req.body[i].uid});
	}
	
	console.log(f_nodes);

	res.send(250);
});


// for verifying posts
router.post('/package', function(req, res, next) {
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
			if( postings[x].uid === req.body[i].uid) 
			{
				v_postings.push(postings[x]);
				postings.splice(x, 1);
			}

			// get all the full node information in here
			
		}

	}
	

	res.send(250);
});


// from full node for consensus
router.post('/consensus', function(req, res, next) {
	console.log(req.body.uid);
	// send post request to all full ndoes here
	res.send(250);
});

// for DJ PRotocol B from full node
router.post('/scores', function(req, res, next) {

	res.send(250);
});

router.post('/client', function(req, res, next) {
	console.log(req.body);
	res.send(250);
});

module.exports = router;
