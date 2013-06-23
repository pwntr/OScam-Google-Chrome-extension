// Saves options to localStorage.
function save_options() {
  var u = document.getElementById("xmlurl").value;
  localStorage["xmlurl"] = u;

  var i = document.getElementById("pollInterval").value;
  localStorage["pollinterval"] = i;

	var username = document.getElementById("username").value;
  localStorage["username"] = username;
	
	var password = document.getElementById("password").value;
  localStorage["password"] = password;
  
  var beeponerror = document.getElementById("beeponerror").checked;
  localStorage["beeponerror"] = beeponerror;
	alert("Settings saved");
	//check to see if everything saved correctly
	restore_options();
}

// Restores options from localStorage.
function restore_options() {
  var u = localStorage["xmlurl"];
  if (!u) {
    u = "http://192.168.1.3:16001";
  }
  document.getElementById("xmlurl").value = u;
  
  var i = localStorage["pollinterval"];
   if (!i) {
    i = 10;
  }
  document.getElementById("pollInterval").value = i;
  
  var username = localStorage["username"];
  if (!username) {
    username = "";
  }
  document.getElementById("username").value = username;

  var password = localStorage["password"];
  if (!password) {
    password = "";
  }
  document.getElementById("password").value = password;

	if ( localStorage["beeponerror"] == "true" ) {
		var beeponerror = true;
	} else {
		var beeponerror = false;
	}
  document.getElementById("beeponerror").checked = beeponerror;
}

window.addEventListener("load", restore_options);

document.getElementById("savebutton").addEventListener("click",save_options);

// Put all the translated strings into the DOM
document.getElementById("extNameSettingsLabel").innerHTML = chrome.i18n.getMessage("extName") + " " + chrome.i18n.getMessage("settings");
document.getElementById("loginLabel").innerHTML = chrome.i18n.getMessage("login");
document.getElementById("passwordLabel").innerHTML = chrome.i18n.getMessage("password");
document.getElementById("updateIntervalLabel").innerHTML = chrome.i18n.getMessage("updateinterval");
document.getElementById("beeponerrorLabel").innerHTML = chrome.i18n.getMessage("beeponerror");