function getReal(src,srcRecord) {
	var result = document.createElement('object');
	result.ITStop = function() { 
										try { 
											this.DoStop(); 
										} catch(err) {}; 
									};						
	result.ITPlay = function() { 
										try { 
											this.DoPlay();  /* untested */
										} catch(err) {}; 
									};
	result.ITSetVolume = function( vol ) {
										try { 
											this.SetVolume( vol ); /* untested */
										} catch(err) {}; 
									};
	result.ITSetRate = function( rate ) {
										try { 
											this.SetRate( rate ); /* untested */
										} catch(err) {}; 
									};

	if( src.match(/^real:/) ) {
		src = "http:" + src.substr(5);
	}
	result.setAttribute('classid', 'clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA');
	result.setAttribute('align', 'baseline');
	result.setAttribute('border', '0');
	result.setAttribute('width', '160');
	result.setAttribute('height', '32');
	result.setAttribute('type', 'audio/x-pn-realaudio-plugin');
	addParam(result, 'controls', 'ControlPanel');
	addParam(result, 'autostart', 'true');
	addParam(result, 'loop', 'true');
	addParam(result, 'src', src);
	var embed = document.createElement('embed');
	embed.setAttribute('src', src);
	embed.setAttribute('align', 'baseline');
	embed.setAttribute('border', '0');
	embed.setAttribute('width', '160');
	embed.setAttribute('height', '32');
	embed.setAttribute('controls', 'ControlPanel');
	embed.setAttribute('autostart', 'true');
	embed.setAttribute('loop','true');
	embed.setAttribute('type', 'audio/x-pn-realaudio-plugin');
	result.appendChild(embed);
	return result;
}

function getQuicktime(src,srcRecord) {
	var result = document.createElement('object');
	result.ITStop = function() { 
										try { 
											this.Stop(); 
										} catch(err) {}; 
									};
	result.ITPlay = function() { 
										try { 
											this.Play(); 
										} catch(err) {}; 
									};
	result.ITSetVolume = function( vol ) {
										var qtVol = vol * 255 / 100;
										try { 
											this.SetVolume( qtVol );
										} catch(err) {}; 
									};
	result.ITSetRate = function( rate ) {
										try { 
											this.SetRate( rate );
										} catch(err) {}; 
									};

	var volume = 80;
	if( srcRecord.volume ) {
		volume = srcRecord.volume;
	}
	var qtVol = volume * 255;

	var rate = 100;
	if( srcRecord.rate ) {
		rate = srcRecord.rate;
	}
	var qtRate = rate * 0.01;
	
	result.setAttribute('classid','clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B');
	result.setAttribute('codebase', 'http://www.apple.com/qtactivex/qtplugin.cab');
	result.setAttribute('style','behavior:url(#qt_event_source);');
	result.setAttribute('width', '64');
	result.setAttribute('height', '16');
	result.setAttribute('type','audio/mpeg');
	addParam(result, 'autoplay', 'true');
	addParam(result, 'postdomevents', 'true');
	var embed = document.createElement('embed');
	embed.setAttribute('pluginspage','http://www.apple.com/quicktime/download/');
	embed.setAttribute('type','audio/mpeg');
	embed.setAttribute('width','160'); 
	embed.setAttribute('height','16');
	embed.setAttribute('autoplay','true'); 
	embed.setAttribute('postdomevents','true');
	embed.setAttribute('volume',qtVol)
	if( src.match(/^qt:/) ) {
		src = "icy:" + src.substr(3);
	}
	if (src.match(/icy:.*/)) {
		embed.setAttribute('src',''); 
		embed.setAttribute('qtsrc',src);
		embed.setAttribute('loop','true'); 
		addParam(result, 'src', src);
		addParam(result, 'qtsrc', src);
		addParam(result, 'loop', 'true');
	} else {
		if (src.match(/;/)) {
			var srcs = src.split( ";");
			var firstsrc = srcs[0];
			var firstsrcparts = firstsrc.split("/");
			var basepathparts = firstsrcparts.slice( 0, firstsrcparts.length - 1);
			var basepath = basepathparts.join("/") + "/";
			for( var i = 0; i< srcs.length; i++) {
				var thissrc = srcs[i];
				if( ! thissrc.match(/\//) ) {
					thissrc = basepath + thissrc;
				}
				thissrc = getCDNURL( thissrc);
				if( i == 0 ) {
					addParam( result, 'src', thissrc );
					embed.setAttribute( 'src', thissrc );
				} else {
					var attrname = "qtnext" + i;
					var attrval  = "<" + thissrc + "> T<myself>";
					addParam( result, attrname, attrval);
					embed.setAttribute(attrname, attrval);
				}
			}
			var lastattrname = "qtnext" + srcs.length;
			addParam( result, lastattrname, "GOTO0");
			embed.setAttribute( lastattrname, "GOTO0");
		} else {
			addParam( result, 'src', src);
			addParam( result, 'loop', 'true');
			embed.setAttribute( 'src',src); 
			embed.setAttribute( 'loop','true'); 
		}
		addParam( result, 'QTSRCCHOKESPEED', '400000');
		embed.setAttribute('QTSRCCHOKESPEED', '400000');
	}
	result.appendChild(embed);
	return result;
}

function getWindows(src,srcRecord) {
	if( hasQTFlipPlugin) {
		return getQuicktime(src, srcRecord);
	}
	
	var result = document.createElement('object');
	result.ITStop = function() { 
										try { 
											this.Stop(); 
										} catch(err) {}; 
										try { 
											this.stop(); 
										} catch(err) {}; 
									};
	result.ITPlay = function() { 
										try { 
											this.Play();  	/* untested */
										} catch(err) {}; 
										try { 
											this.play(); 	/* untested */
										} catch(err) {}; 
									};
	result.ITSetVolume = function( vol ) {
										try { 
											this.SetVolume( vol ); /* untested */
										} catch(err) {}; 
									};
	result.ITSetRate = function( rate ) {
										try { 
											this.SetRate( rate ); /* untested */
										} catch(err) {}; 
									};

	result.setAttribute('id', 'mediaplayer');
	result.setAttribute('name', 'mediaplayer');
	result.setAttribute('classid', 'clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95');
	result.setAttribute('codebase', 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#version=6,4,5,715');
	result.setAttribute('type', 'application/x-oleobject');
	result.setAttribute('height', '20');
	result.setAttribute('width', '160');
	addParam(result, 'FILENAME',src);
	addParam(result, 'AutoSize','true');
	addParam(result, 'AutoStart','true');
	addParam(result, 'ShowControls','true');
	addParam(result, 'ShowTracker','false');
	addParam(result, 'Autosize','true');
	addParam(result, 'ShowStatusBar','true');
	addParam(result, 'ShowDisplay','false');
	addParam(result, 'ShowPositionControls','false');
	addParam(result, 'loop','true');
	var embed = document.createElement('embed');
	embed.setAttribute('TYPE','application/x-mplayer2'); 
	embed.setAttribute('PLUGINSPAGE','http://microsoft.com/windows/mediaplayer/en/download'); 
	embed.setAttribute('ID','mediaPlayer'); 
	embed.setAttribute('Name','mediaPlayer'); 
	embed.setAttribute('DISPLAYSIZE','3'); 
	embed.setAttribute('AUTOSIZE','-1'); 
	embed.setAttribute('SHOWCONTROLS','-1'); 
	embed.setAttribute('SHOWTRACKER','0'); 
	embed.setAttribute('SHOWDISPLAY','0'); 
	embed.setAttribute('SHOWSTATUSBAR','1'); 
	embed.setAttribute('loop','1'); 
	embed.setAttribute('ShowPositionControls','0'); 
	embed.setAttribute('WIDTH','160'); 
	embed.setAttribute('HEIGHT','20'); 
	embed.setAttribute('SRC',src); 
	embed.setAttribute('AUTOSTART','true');
	result.appendChild(embed);
	return result;
}


function tryToSetVolumeAndRate(obj,srcRecord)
{
	try {
		var status = obj.GetPluginStatus();
		//alert( status);
		if( status == "Complete") {

			{ // set volume for all types of QT
				var volume;
				if( srcRecord.volume ) {
					volume = srcRecord.volume;
				} else if ( srcRecord.streamType == TYPE_INFO ) {
					volume = defaultInfoVolume;
				} else {
					volume = defaultTranceVolume;
				}
				var qtVol = volume * 255 / 100;
				obj.SetVolume( qtVol);
			}		

			if( isStaticFile( srcRecord.src ) || isPodcast( srcRecord.src) ) {
				// alert( "setting rate " + srcRecord.src);
				// set rate only for http (mp3) files and podcasts
				var rate;
				if( srcRecord.rate ) {
					rate = srcRecord.rate;
				} else if ( srcRecord.streamType == TYPE_INFO ) {
					rate = defaultInfoRate;
				} else {
					rate = defaultTranceRate;
				}
				var qtRate = rate * 0.01;
				obj.SetRate( qtRate);
			} else {
				// alert( "NOT setting rate " + srcRecord.src);
			}

			return;
		}
	} catch(err) {
		//alert(err);
		return;
	};
	setTimeout(function(){tryToSetVolumeAndRate(obj,srcRecord)},3000);
}