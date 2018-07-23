var socket = io();

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

socket.on('message', function(data) {
    console.log(data);
});
socket.on('errorUp', function(error){
  if(error==0){
    window.location.href = "";

  }else if(error==1){
    document.getElementById("ErrorSignUp").innerHTML= "Nickname is exist.";

  }else if(error==2){
    document.getElementById("ErrorSignUp").innerHTML = "Repeated password is valid.";

  }
});

socket.on('errorIn', function(error){
  if(error==0){
    if( getCookie("user") != undefined || getCookie("pass") != undefined ){
      deleteCookie('user');
      deleteCookie('pass');
    }
    document.cookie = "user="+document.getElementById("nickname_l").value+";";
    document.cookie = "pass="+document.getElementById("password_l").value+";";

    window.location.href = "main.html";
  }else if(error==1){
    document.getElementById("ErrorSignIn").innerHTML = "Nickname or password is valid.";
    return;
  }
});

document.getElementById("btn_l").onclick = function(){
  socket.emit('sign_in', document.getElementById("nickname_l").value, document.getElementById("password_l").value);
};

document.getElementById("btn_r").onclick = function(){
  socket.emit('sign_up', document.getElementById("nickname_r").value, document.getElementById("password_r1").value, document.getElementById("password_r2").value);
};

//setInterval(function() {
//  socket.emit('movement', );
//}, 1000 / 60);
