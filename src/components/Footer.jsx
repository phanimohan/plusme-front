var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var PostActions = require('../actions/PostActions');

var Footer = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render : function() {
        return (
          <footer id='footer'>
            <div className='container'>
              <div className='row row-padded'>
                <div className='col-md-12 text-center'>
                  <p>&copy; Copyrights reserved.</p>
                </div>
              </div>
            </div>
          </footer>
        )
    }
});

module.exports = Footer;
