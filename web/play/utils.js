function getCDNURL(url) 
{
	var resulturl = url;
	if( gUseCoralCDN == true ) {
		var regex = new RegExp("^(http://[^/]+)/(.*\.mp3)$","i");
		var matches = regex.exec( url);
		if( matches != null ) {
			var newurl = matches[1] + "." + gCoralCDNHostSuffix + "/" + matches[2];
			resulturl = newurl;
		}
	}
	return resulturl;
}


function setCookie(name, value, expires, path, domain, secure) { 
 var curCookie = name + "=" + escape(value) + 
	((expires) ? "; expires=" + expires.toGMTString() : "") + 
	((path) ? "; path=" + path : "") + 
	((domain) ? "; domain=" + domain : "") + 
	((secure) ? "; secure" : ""); 
 document.cookie = curCookie; 
}

function getCookie(name) {
	var ca = document.cookie.split(';');
	var nameEQ = name + "=";
	for(var i=0; i < ca.length; i++) {
		var c = ca[i];
		while(c.charAt(0)==' ') c = c.substring(1, c.length);
		if(c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
	var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
	var aQueryString = strQueryString.split("&");
	for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
	  if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
		var aParam = aQueryString[iParam].split("=");
		strReturn = aParam[1];
		break;
	  }
	}
  }
  return unescape(strReturn);
}


function compareNames(a,b) {
	var a2 = a.replace(/[^a-zA-Z]/g, "").toLowerCase();
	var b2 = b.replace(/[^a-zA-Z]/g, "").toLowerCase();
	return a2 == b2;
}

var hasQTFlipPlugin = false;
var hasWindowsMediaPlugin = false;
var hasRealPlugin = false;
var hasQuickTimePlugin = false;
var hasFlashPlugin = false;
var hasSilverlightPlugin = false;

function checkPlayer() { 
	try {
		if (navigator.plugins) { 
			np=navigator.plugins; 
			npl=navigator.plugins.length; 
			for (i=0; i<npl; i++) { 
				if (np[i].name.indexOf("Flip4Mac WMV Web Plugin") != -1) { 
					hasQTFlipPlugin=true; 
					continue;
				} 
				if (np[i].name.indexOf("Flip4Mac Windows Media Web Plugin") != -1) { 
					hasQTFlipPlugin=true; 
					continue;
				} 
				if (np[i].name.indexOf("Windows Media") != -1) { 
					hasWindowsMediaPlugin=true; 
				} 
				if (np[i].name.indexOf("RealPlayer Plug") != -1) { 
					hasRealPlugin=true; 
				} 
				if (np[i].name.indexOf("QuickTime Plug") != -1) { 
					hasQuickTimePlugin=true; 
				} 
				if (np[i].name.indexOf("Shockwave Flash") != -1) { 
					hasFlashPlugin=true; 
				} 
				if (np[i].name.indexOf("Silverlight Plug") != -1) { 
					hasSilverlightPlugin=true; 
				} 
			}
		}
	} catch(err) {};
};


function isRealStream(url) {
	var answer = url.match(/^real/) || url.match(/^http.*\.(ra?m|NOTM3U)(\?.*)?$/);
	return answer
}

function isWindowsStream(url) {
	var answer = url.match(/^mms/) || url.match(/^http.*\.asx(\?.*)?$/);
	return answer;
}

function isQuicktimeStream(url) {
	var answer =  url.match(/^(icy|qt)/) || url.match(/^http.*\.(qtl|pls|m3u)(\?.*)?$/);
	return answer
}

function isStream(url) {
	var answer = isRealStream(url) || isWindowsStream(url) || isQuicktimeStream(url);
	return answer;
}

function isStaticFile(url) {
	var answer = url.match(/^http.*\.(mp3|wav)(\?.*)?$/);
	return answer
}

function isPodcast(url) {
	var answer = url.match(/^feed/) || url.match(/.*\.(xml|rss)(\?.*)?$/);
	return answer
}


function addParam( el, name, value ) {
	var paramEl = document.createElement('param');
	paramEl.setAttribute('name', name);
	paramEl.setAttribute('value', value);
	el.appendChild(paramEl);
}

	
function sleep(delay) {
	var start = new Date().getTime();
	var end = start + delay;
	while ( new Date().getTime() < end ) ;
}


function getInfoPlayer() {
	var infoPlayer;
	var resultEl = document.getElementById('infodest');
	if( resultEl.childNodes.length != 0) {
		infoPlayer = resultEl.childNodes[0];
	}
	return infoPlayer;
}

function getTrancePlayer() {
	var trancePlayer;
	var resultEl = document.getElementById('trancedest');
	if( resultEl.childNodes.length != 0) {
		trancePlayer = resultEl.childNodes[0];
	}
	return trancePlayer;
}
