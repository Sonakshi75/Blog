//jshint eversion:6

const express = require("express")
const bodyParser= require("body-parser")
const ejs=require("ejs")
const lodash=require("lodash");
const app=express()
var posts=[];
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use("/public",express.static(__dirname + "/public"));
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/",function(req,res){
  res.render("home",{
    homeStartingContent:homeStartingContent,
    posts:posts
  });
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{
    contactContent:contactContent
  });
});

app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){
  var post={
    title: req.body.title,
    body: req.body.body
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postname",function(req,res){
  var requested=lodash.lowerCase(req.params.postname);
  for(var i=0;i<posts.length;i++){
    if(lodash.lowerCase(posts[i].title)===requested){
      var body=posts[i].body;
      res.render("post",{requested:requested,body:body});
    }
    else{
      console.log("Not found");
    }
  }
});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
