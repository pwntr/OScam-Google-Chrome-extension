chrome.browserAction.setBadgeBackgroundColor({color: [122, 203, 62, 255]});

onload = setTimeout(init, 0);

//var pollInterval = 10000; // 10 seconds, in milliseconds
var timerId;

// Change this to fit your setup
//var xmlURL = "http://192.168.1.3:16001/oscamapi.html?part=status";
//var username = "";
//var password = "";
var xhr;
var activeClients = 0;
var arrayOfClientsLength;
var activeClientsString;
var timerId;
var xml;
var clientNames;
var arrayCounter = 0;
var clientChannels;


activeClientsString = activeClients.toFixed();
chrome.browserAction.setBadgeText({ text: activeClientsString });

function init() {

	var pollInterval = 10;
	try {
		pollInterval = localStorage["pollinterval"];
	} catch (err) {}
	if ( pollInterval<10 ) pollInterval = 10;
	pollInterval *= 1000;
	xhr = new XMLHttpRequest();

	try { 
		//xhr.open("GET", xmlURL, true, username, password);
		if ( localStorage["username"]!="" ) {
			xhr.open("GET", localStorage["xmlurl"] + "/oscamapi.html?part=status", false, localStorage["username"], localStorage["password"]);
		} else {
			xhr.open("GET", localStorage["xmlurl"] + "/oscamapi.html?part=status", false);
		}
		//xhr.onreadystatechange = updateBadge();
		xhr.send();
		xml = xhr.responseXML;
		//xhr = new XMLHttpRequest();
		updateBadge();
	} catch (err) {
		if ( localStorage["beeponerror"] == "true" ) playSound("beep.wav");
		chrome.browserAction.setBadgeText({ text: "Error" });
	}
	timerId = window.setTimeout(init, pollInterval);
}

function updateBadge() {

	clientNames = new Array();
	clientChannels = new Array();

  if (xhr.readyState == 4) {
    // innerText does not let the attacker inject HTML elements.
   clients = xml.getElementsByTagName("client");
	arrayOfClientsLength = clients.length;
	
  for (i = clients.length - 1; i >= 0; i--) {
  	if(xml.getElementsByTagName("client")[i].getAttribute("type") == "c") {
		
		clientNames[arrayCounter] = xml.getElementsByTagName("client")[i].getAttribute("name");
		try {
			clientChannels[arrayCounter] = xml.getElementsByTagName("request")[i].childNodes[0].nodeValue;
			} catch(error){
			clientChannels[arrayCounter] = "not decoding";
			}
			
		arrayCounter++;
		
		activeClients++;
	}
  }

	activeClientsString = activeClients.toFixed();
	chrome.browserAction.setBadgeText({ text: activeClientsString });
	activeClients = 0;
	arrayCounter = 0;
  }
}

function playSound (url){
    var audio=document.createElement("audio");
    audio.src=url;
    audio.play();	
}
function getNumberOfClients() {
	return activeClientsString;
}

function getClientNames() {
	return clientNames;
}

function getClientChannels() {
	return clientChannels;
}

/*function stopRequest() {
	window.clearTimeout(timerId);
}*/

window.addEventListener("load", init);