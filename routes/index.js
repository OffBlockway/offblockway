var express = require('express');
var router = express.Router();
var fs = require("fs");
var request = require('request');
var contents = fs.readFileSync("./routes/dummy.json");
var dummy = JSON.parse(contents);
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var index = 1; 

console.log("User Name:", dummy.username);

var postings = [ 
	{"num" : 1, "username":"xyz", "content": "hey how is everyone doing today?", "verification": "unverified" },
	{"num" : 2, "username":"zaid", "content": "how am i?", "verification": "unverified" }
]

var v_postings = [];


//post changed to content, add time stamp, index = uid

// make unverified, verified arrays, when i send them make them in progress
// send every time 
// make a counter for full nodes, if i try to connect to  a full node and get a service error disconnect the full node
// 

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Spherical', posts: postings, username: postings[index].username, post: postings[index].content, verification: "Unverified"  });
  //res.render('post', { username: dummy.username }, { post: dummy.post });
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
	dummy.posts.push({"num" : index+1, "username":"xyz", "content": "hey how is everyone doing today?", "verification":
	"unverified" });
	// fs.writeFile("./routes/dummy.json", "whats up", function(err) {
 //    if(err) {
 //        return console.log(err);
 //    }
	// });
	postings.push({num : ++index, "username":req.body.user, "content":req.body.content, "verification": "unverified"});
	console.log(req.body.content);
	console.log(req.body.user);
	console.log("here is index: " +index);

	// THIS IS WHERE U CAN CONVERT THE ARRAY TO JSON AND THEN SEND IT!!!!!
	console.log( JSON.stringify(postings));


	//router.set('view engine', 'ejs');
	//res.send('post.pug', { username: posts[index].username, post: posts[index].post });
	//router.set('view engine', 'pug');
	res.redirect('/');
	res.render('index', { title: 'Spherical', posts: postings, username: postings[index].username, post: postings[index].content, index: index, 
	verification: "Unverified" });
	res.end();

});

router.get('/', function(req, res)
	{
		res.render('/posts');
	});






router.post('/register', function(req, res, next) {

	res.send(250);
});

router.post('/package', function(req, res, next) {

	res.send(250);
});


// from full node for consensus
router.post('/consensus', function(req, res, next) {

	res.send(250);
});

// for DJ PRotocol B from full node
router.post('/scores', function(req, res, next) {

	res.send(250);
});


module.exports = router;
