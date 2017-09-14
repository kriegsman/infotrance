/*
depends on this, too:
<script src="http://www.google.com/jsapi?key=ABQIAAAAedXI6jOx4-zFwXFYnESL5BQRpMkK8-2Na9NjYHUllJ4r36OOGhTOKINVqZGzRp-QcPUMW-jX-denRQ"></script>
*/

var feedsReady = false;
function feedsAreReady() {
	feedsReady = true;
}
google.load("feeds", "1");
google.setOnLoadCallback(feedsAreReady);

var XMLchunk;

function getPlaylistFromPodcastURL(url,doneFunction,doneContext) 
{
	while( !feedsReady ) {
		setTimeout(function(){getPlaylistFromPodcastURL(url,doneFunction,doneContext)},5000);
		return;
	};
	
	if( url.match(/^feed:/) ) {
		url = "http:" + url.substr(5);
	}
	
	var playlist = "";
	var feed = new google.feeds.Feed(url);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	feed.load(function(result) {
		XMLchunk = result;
		if (!result.error) {
			var container = document.getElementById("feed");
			for (var i = 0; i < result.feed.entries.length; i++) {
				var entry = result.feed.entries[i];
				var thelink = null;
				try {
					thelink = entry.link;
					theenclosure = google.feeds.getElementsByTagNameNS(entry.xmlNode, "*", "enclosure")[0]; 
					theurl=theenclosure.getAttribute("url");
					thetype=theenclosure.getAttribute("type");
					thesnippet = entry.contentSnippet;
					if( theurl != null && theurl.length != 0 && (theurl.match(/.*\.mp3/) || thetype == "audio/mpeg")) {
					        // fix broken URLs like http://www.foo.com/podcast/http://www.foo.com/podcast/12345.mp3
					        theurl = theurl.replace(/http:\/\/.*http\:\/\//,"HTTP://");

						if( playlist.length == 0) {
						    //alert(theurl + " " + thesnippet);
							playlist = theurl;
						} else {
							playlist = playlist + ";" + theurl;
						}
					}
				} catch(err) {};
			}
		}
		doneFunction(doneContext,playlist);
	});
}

