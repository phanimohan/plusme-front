var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var PostActions = require('../actions/PostActions');

var Header = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    showAllPosts : function(e){
        e.preventDefault();
        PostActions.loadAllPosts((function(){
           this.context.router.transitionTo('postListView');
        }).bind(this));
    },

    menuToggle : function(e) {
      alert('123');
      e.preventDefault();
    },

    render : function() {
        return (
          <div>
            <div id='offcanvass'>
              <a onClick={this.menuToggle} className="offcanvass-close js-offcanvass-close" href='#'>Close <i className="icon-cross"></i> </a>
              <h1 className="logo"><a className="navbar-brand" href="/">PlusME</a></h1>
              <ul>
                <li className="active"><a href="/">Home</a></li>
                <li><a href="/">My Account</a></li>
                <li><a href="/logout">logout</a></li>
              </ul>
            </div>
            <header id="header" role="banner">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <a href='#' onClick={this.menuToggle} className="menu-btn js-menu-btn">Menu <i className="icon-menu"></i></a>
                    <a className="navbar-brand" href="/">PlusME</a>
                  </div>
                </div>
              </div>
            </header>
          </div>
        )
    }
});

module.exports = Header;
