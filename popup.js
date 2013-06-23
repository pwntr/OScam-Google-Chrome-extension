var bkg = chrome.extension.getBackgroundPage();
var num = bkg.getNumberOfClients();
var names = bkg.getClientNames();
var channels = bkg.getClientChannels();

for (i = 0; i < num; i++) {
	document.write("<tr>");
	document.write("<td nowrap>"+names[i]+"</td>");
	document.write("<td nowrap>"+channels[i]+"</td>");
	document.write("</tr>");
}

//var names = bkg.getClientNames();
//var channels = bkg.getClientChannels();

//document.writeln(names);