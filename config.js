var config = {
    "express": {
      "host": "local.plusme.com",
      "port": "8088"
    },
    "api": "http://www.plusme.co.in/a/",
    "cmsUrl": "http://www.plusme.co.in",
    "mainmenu": {
      "authenticated": {
        "home": "plus-trends",
        "plan-your-day": "plan-your-day",
        "profile": "plus-profile",
        "groups": "plus-groups",
        "logout": "plus-logout"
      },
      "anonymous": {
        "login": "plus-login",
        "signup": "plus-registration",
        "about": "about-plus"
      }
    },
    "secret": "plusmesecret",
    "session_timeout": 3600
}

module.exports = config;
