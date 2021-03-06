
function checkStatus () {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {

      console.log('[FB] status: connected');

      // fb-login ui control
      $('.fb-login-btn').addClass('d-n');
      $('.fb-logout-btn').removeClass('d-n');

      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;

      doTheThing();
    } else if (response.status === 'not_authorized') {
      
      console.log('[FB] status: not_authorized');

      // fb-login ui control
      $('.fb-login-btn').removeClass('d-n');
      $('.fb-logout-btn').addClass('d-n');

    } else {

      console.log('[FB] status: other');

      // fb-login ui control
      $('.fb-login-btn').removeClass('d-n');
      $('.fb-logout-btn').addClass('d-n');
    }
   });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1006304879428837',
    xfbml      : true,
    version    : 'v2.5'
  });

  FB.Event.subscribe('auth.login', checkStatus); 

  checkStatus ();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function loginAndDoThing() {
  FB.login(function(response) {
    if (response.authResponse) {
        doTheThing();
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
  }, {scope: 'email, user_likes, user_friends, user_posts'});
}

function logout() {
  FB.logout(function() {
    console.log('logged out');
  });
}

function getAllFriendsID(cb) {
   FB.api('/me/friends', function(response) {
        //console.log(response['data']);
        for (var i=0;i<response['data'].length;i++) {
          //id: response['data'][i].id
          //name: response['data'][i].name
          //console.log(response['data'][i].id);
          //console.log(response['data'][i].name);
          getTargetFriendsFeed(response['data'][i].id);
        }
        cb();
   });
}
function getTargetFriendsFeed(feed_id) {
  FB.api('/' + feed_id + '/feed?fields=message,link,story,name,caption,description', function(feed) {
     //console.log( JSON.stringify(feed.data));
     //console.log('---');
     for (var i=0;i<feed['data'].length;i++) {
        /*
          "link": "http://www.appledaily.com.tw/realtimenews/article/new/20151114/732728/",
          "story": "Huang Chao-Ju shared a link.",
          "name": "台古大戰先發名單出爐　陽岱鋼、林泓育帶傷先發 | 即時新聞 | 20151114 | 蘋果日報",
          "caption": "appledaily.com.tw",
          "description": "首屆世界棒球12強賽台灣隊想拼晉級處於弱勢，今晚對上古巴隊將全力搶勝，上一場因賽前練習腳有拉傷的陽岱鋼，以及對加拿大遭觸身球砸中手指的「小胖",
          "id": "10208453813091473_10208454214101498"
        */
        console.log(feed['data'][i].link);
        console.log(feed['data'][i].story);
        console.log(feed['data'][i].name);
        console.log(feed['data'][i].caption);
        console.log(feed['data'][i].description);
        console.log(feed['data'][i].id);
     }
  });
}
function doTheThing() {
  // friends
  getAllFriendsID();
};