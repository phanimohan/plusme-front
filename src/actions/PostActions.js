var alt = require('../alt');
var request = require('superagent');
var config = require('../../config');

var express = config.express;
var port = (express.port) ? express.port : '8088';
var baseUrl = 'http://' + express.host + ':' + port;

class PostActions {
    loadAllPosts(cb){
        var self = this;
        NProgress.start();
        request.get(baseUrl+'/ajax/posts',function(err,response){
            self.actions.updatePosts(response.body);
            setTimeout(function(){
                NProgress.done();
            },500);
            if(cb){
                cb();
            }
        });
    }

    loadSinglePost(id,cb){
        var self = this;
        NProgress.start();
        request.get(baseUrl+'/ajax/post/'+id,function(err,response){
            self.actions.updateCurrentPost(response.body);
            setTimeout(function(){
                NProgress.done();
            },500);
            if(cb){
                cb();
            }
        });
    }

    updatePosts(posts){
        this.dispatch(posts);
    }

    updateCurrentPost(post){
        this.dispatch(post);
    }
}


module.exports = alt.createActions(PostActions);
