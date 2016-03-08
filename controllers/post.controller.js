var request = require('superagent'),
    config = require('../config');

var express = config.express;
var port = (express.port) ? express.port : '8088';
var baseUrl = 'http://' + express.host + ':' + port;

exports.showAllPosts = function(req,res,next){
    request.get(baseUrl+'/static/posts.json',function(err,response){
       res.locals.data = {
           "PostStore" : {
               "posts" : response.body
           }
       }
       next();
    });
}

exports.loadPostsViaAjax = function(req,res){
    request.get(baseUrl+'/static/posts.json',function(err,response){
        res.json(response.body);
    });
}

exports.showSinglePost = function(req,res,next){
    var id = req.params.id;

    request.get(baseUrl+'/static/posts.json',function(err,response){

        var posts = response.body;

        posts.forEach(function(post){
            if(post.id === parseInt(id,10)){
                res.locals.data = {
                    "PostStore" : {
                        "currentPost" : post
                    }
                };
                next();
            }
        });

        next();
    });
}

exports.loadSinglePostViaAjax = function(req,res){
    var id = req.params.id;
    request.get(baseUrl+'/static/posts.json',function(err,response){
        response.body.forEach(function(post){
            if(post.id === parseInt(id,10)){
                return res.json(post);
            }
        });
    });
}
