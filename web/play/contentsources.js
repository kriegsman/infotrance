//
//
// YOU DO NOT HAVE TO EDIT THIS FILE TO ADD YOUR OWN SOURCES!
//
//
//  Instead, do this:
//    1) Prepare a javascript file that defines a variable called mysources, 
//       with the same format as the sources in this file.
//    2) Put that file on a web server somewhere as mysources.js
//    3) Invoke the main page with http://infotran.cc/?mysources=URL_TO_MYSOURCES_FILE
//
//  The URL to your mysources file will be saved in a cookie, so you don't have to do this every time, 
//  only when you want to change the URL to your personal mysources.js file.
//
//  Your mysources.js file will be reloaded every time you reload infotran.cc.



// The streamType values in the sources, used to determine which 
// menu the stream belongs in.
var TYPE_INFO = 1;
var TYPE_TRANCE = 2;


// Source URL formats:
//
//	MP3 streams
//		single stream (icecast/shoutcast) 	=	icy://flamencoradio.net:8100 							// uses quicktime
//		stream playlist (PLS)				=	http://somafm.com/groovesalad.pls						// uses quicktime
//		stream playlist (M3U)				=	http://renoscanner.myftp.org:8000/RenoScanner.mp3.m3u	// uses realplayer
//	
//	MP3 files																							// all use quicktime
//		single MP3 file						=	http://www.freephotop.com/data/book555/20/mp3/0.mp3
// 		multiple MP3 files					=	http://www.remotehypnosis.com/trance0001.mp3;http://www.selfhypnosismadeez.com/creativetempleofmind.mp3
//		multiple MP3 files (same base URL)	=	http://www.freephotop.com/data/book555/20/mp3/0.mp3;1.mp3;2.mp3
//
//	MP3 Podcasts																						// all use quicktime
//		XML feed							= 	http://www.twiar.org/twiarpodcast.xml
//		RSS 'podcast' (forced)				=	feed://www.npr.org/rss/podcast.php?id=510221
//
//	QuickTime streaming
//		qtl stream file						=	http://somafm.com/sss.qtl
//
//	Windows Media
//		asx stream file						=	http://www.bbc.co.uk/worldservice/meta/tx/nb/live_eneuk_au_nb.asx
//		mms stream							=	mms://wmscnn.stream.aol.com/live/cnn/cnn_radio
//
//	Real Audio
//		http stream							=	http://www.voanews.com/real/voa/english/spec/specengla.ram
//		rtsp stream							=	rtsp://streaming.rte.ie/encoder/rnag.rm
//		stream (force real audio)			=	real://renoscanner.myftp.org:8000/RenoScanner.mp3.m3u


var sources = [

{ streamType: TYPE_INFO,	enabled: true,	name: 'atclive boston', 			src: 'icy://bos.liveatc.net:80/kbos_twr', 		volume: 100 } ,
{ streamType: TYPE_INFO, 	enabled: true,	name: 'reno police scanner',		src: 'icy://renoscanner.myftp.org:8200/RenoScanner.mp3', volume: 150 } , 
{ streamType: TYPE_INFO,	enabled: true,	name: 'sf police scanner',			src: 'http://somafm.com/sfscanner.pls', volume: 180 } ,
{ streamType: TYPE_INFO, 	enabled: false,	name: 'london traffic', 			src: 'icy://193.27.42.114', 					volume: 300 } ,
{ streamType: TYPE_INFO,	enabled: false,	name: 'bbc world service', 			src: 'http://www.bbc.co.uk/worldservice/meta/tx/nb/live_eneuk_au_nb.asx' } ,
{ streamType: TYPE_INFO, 	enabled: true, 	name: 'voa special english', 		src: 'http://www.voanews.com/mp3/voa/english/spec/special_english.mp3;spec2245a.mp3;spec0041a.mp3;spec0040a.mp3', volume: 120, rate:90, } ,
{ streamType: TYPE_INFO, 	enabled: true, 	name: 'npr wbur 1', 					src: 'icy://wbur-sc.streamguys.com:80/'} ,
{ streamType: TYPE_INFO, 	enabled: true,	name: 'npr wbur 2', 					src: 'http://audio.wbur.org/stream/live_mp3.m3u'} ,
{ streamType: TYPE_INFO, 	enabled: false, name: 'securitycast',		 		src: 'icy://www.securitycast.net:8000/securitycast.mp3'} ,
{ streamType: TYPE_INFO, 	enabled: true, 	name: 'sabotage manual',	 		src: 'http://www.archive.org/download/simple_sabotage_0908_librivox/simplesabotage_01_usoss_64kb.mp3;simplesabotage_02_usoss_64kb.mp3', volume: 300} ,
{ streamType: TYPE_INFO, 	enabled: true, 	name: 'chemistry textbook',	 		src: 'http://www.freephotop.com/data/book555/60/mp3/14.mp3;15.mp3;16.mp3;10.mp3'} ,
{ streamType: TYPE_INFO,	enabled: true,  name: 'hypnorelaxation', 	 		src: 'http://www.remotehypnosis.com/trance0001.mp3;http://www.selfhypnosismadeez.com/creativetempleofmind.mp3;http://www.wayneperkins.net/free.mp3', volume: 250 } ,
{ streamType: TYPE_INFO,	enabled: true, 	name: 'norad',						src: 'feed://www.norad.mil/pc_pod/podcast/xml/NChannel.xml' } ,
{ streamType: TYPE_INFO,	enabled: true, 	name: 'pentagon briefings',			src: 'feed://www.pentagonchannel.mil/podcast/xml/PentagonChannelBriefings.xml' } ,
{ streamType: TYPE_INFO,	enabled: true, 	name: 'oral arguments',				src: 'feed://www.ca7.uscourts.gov/fdocs/docs.fwx?submit=rss_itunes' , volume: 300 } ,
{ streamType: TYPE_INFO,	enabled: false,	name: 'awareness',					src: 'feed://feeds.feedburner.com/PathwayToHappiness/', volume: 110, rate: 90 } ,

{ name: 'arabic lessons',src: 'feed://www.peacecorps.gov/wws/multimedia/language/arabic.xml', streamType: TYPE_INFO, enabled: true, volume: 80, rate: 90 } ,

{ name: 'apollo', streamType: TYPE_INFO, enabled: true, volume: 100, rate: 100,
src: 'http://161.115.184.211/teague/apollo/audio/ap8_01_liftoff.mp3;http://161.115.184.211/teague/apollo/audio/ap8_07_earth_desc.mp3;http://161.115.184.211/teague/apollo/audio/ap9_01_liftoff.mp3;http://161.115.184.211/teague/apollo/audio/ap9_09_deorbit_and_reentry.mp3;http://161.115.184.211/teague/apollo/audio/ap10_01_liftoff.mp3;http://161.115.184.211/teague/apollo/audio/ap10_02_go_for_TLI.mp3;http://161.115.184.211/teague/apollo/audio/ap10_15_TEI_burn_results.mp3;http://161.115.184.211/teague/apollo/audio/ap11_01_liftoff.mp3;http://161.115.184.211/teague/apollo/audio/ap11_landing_with_FD_loop.mp3;http://history.nasa.gov/alsj/a11/a11a1091545-1101226.mp3 ;http://161.115.184.211/teague/apollo/audio/ap13_01_liftoff.mp3;http://161.115.184.211/teague/apollo/audio/ap13_09_trouble_sequence.mp3;http://161.115.184.211/teague/apollo/audio/ap14_01_liftoff.mp3;http://161.115.184.211/teague/apollo/audio/ap14_14_lunar_landing.mp3;http://161.115.184.211/teague/apollo/audio/ap14_21_EVA_1_debriefing.mp3;http://161.115.184.211/teague/apollo/audio/ap14_25_Shepards_golf_game.mp3;http://161.115.184.211/teague/apollo/audio/ap15_01_liftoff.mp3;http://161.115.184.211/teague/apollo/audio/a15-step.mp3;http://161.115.184.211/teague/apollo/audio/a15-step.mp3;http://161.115.184.211/teague/apollo/audio/ap16_01_liftoff.mp3;http://161.115.184.211/teague/apollo/audio/ap16_13_ALSEP_deploy.mp3;http://161.115.184.211/teague/apollo/audio/ap17_01_cutoff.mp3;http://161.115.184.211/teague/apollo/audio/ap17_02_liftoff.mp3;http://161.115.184.211/teague/apollo/audio/ap17_17_Children_of_World_rock.mp3;http://161.115.184.211/teague/apollo/audio/ap17_18_reading_of_plaque.mp3;http://161.115.184.211/teague/apollo/audio/ap7_01_liftoff.mp3;http://161.115.184.211/teague/apollo/audio/ap7_04_deorbit_burn.mp3'
} ,

{ streamType: TYPE_INFO,	enabled: false,	name: 'wsj weekend',				src: 'http://www.tapingfortheblind.org/Audio_Archives/Wall%20Street%20Journal/WEEKEND_WSJ.mp3', volume: 250, rate: 85 } ,
{ streamType: TYPE_INFO,	enabled: true,	name: 'discount store ads',			src: 'http://www.tapingfortheblind.org/Audio_Archives/Discount%20Store%20Digest/DISCOUNT_STORE_DIGEST.mp3;http://www.tapingfortheblind.org/Audio_Archives/Grocery%20Ads/GROCERY_ADS.mp3', volume: 200, rate: 90 } ,


{ streamType: TYPE_TRANCE,	enabled: true, 	name: 'somafm tag\'s trance trip',	src: 'http://somafm.com/tags.pls', 			volume: 100  } ,
{ streamType: TYPE_TRANCE,	enabled: true, 	name: 'somafm groove salad',		src: 'http://somafm.com/groovesalad.pls', 	volume: 100  } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'somafm secret agent',		src: 'http://somafm.com/sa.qtl', 			volume: 100  } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'cytopia',					src: 'icy://cytopia.org:8000/cytopiaradio80', volume: 80 } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'schizoid psytrance',			src: 'http://schizoid.in/schizoid-psy.pls' } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'schizoid progressive',		src: 'http://schizoid.in/schizoid-prog.pls' } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'schizoid chill',				src: 'http://schizoid.in/schizoid-chill.pls' } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'difm goa psytrance',			src: 'http://www.di.fm/mp3/goapsy.pls' } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'difm progressive',			src: 'http://www.di.fm/mp3/progressive.pls' } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'difm drum and bass',			src: 'http://www.di.fm/mp3/drumandbass.pls' } ,
{ streamType: TYPE_TRANCE,	enabled: false,	name: 'psyfreakz',					src: 'icy://radio.netbynet.ru:8000/psy_freakz_radio' } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'skyfm world',				src: 'http://www.sky.fm/mp3/world.pls' } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'skyfm guitar',				src: 'http://www.sky.fm/mp3/guitar.pls' } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'glitch.fm',					src: 'http://glitch.fm/glitchfm.pls' } ,
{ streamType: TYPE_TRANCE,	enabled: true,	name: 'bmir burning man',			src: 'icy://listen.shoutingfire.com:12345/live' } 

];

