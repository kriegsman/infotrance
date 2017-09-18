var InfoTranPlayer = function (playerElementId, source, label) {

    this.playerElementId = playerElementId;
    this.source = source;
    this.label = label;
    this.items = [];
    
    var myself = this;
    
    this.load = function () {  //public
        this.header = document.createElement('h2');
        this.header.appendChild(document.createTextNode(this.label));
        var playerElement = document.getElementById(playerElementId);
        playerElement.appendChild(this.header);
        
        this.popup = document.createElement('select');
        
		this.audioElement = document.createElement('audio');
        playerElement.appendChild(this.audioElement);
        
		var option = document.createElement('option');
        option.setAttribute('value', '');
        option.appendChild(document.createTextNode('--- Select ---'));
        this.popup.appendChild(option);
        playerElement.appendChild(this.popup);
        this.popup.onchange = function() {
        	if (this.selectedIndex > 0) {
        		
        		myself.audioElement.pause();
        		
        		var childNodes = myself.audioElement.childNodes;
        		for( var i = childNodes.length - 1; i >= 0; i-- ) {
        			myself.audioElement.removeChild(childNodes[i]);
        		}
        		
        		var item = myself.items[this.selectedIndex-1];
        		
        		var sourceElement = document.createElement('source');
        		sourceElement.setAttribute('src', item.url);
        		sourceElement.setAttribute('type', 'audio/mpeg');
        		myself.audioElement.appendChild(sourceElement);
        		myself.audioElement.play();
        	}
        }
        
        var request = new Request(source, { method: 'GET', mode: 'no-cors' } );
        fetch(request).then(function(response) {
			return response.json();
		})
		.then(function(json) {
			myself.items = json.items;
			myself.populateItems();
		})
	};
	
	this.populateItems = function() {
		for( var i = 0 ; i < this.items.length; i++ ) {
			var item = this.items[i];
			var option = document.createElement('option');
			option.setAttribute('value', item['url']);
			option.appendChild(document.createTextNode(item['title']));
			this.popup.appendChild(option);
		}
	}
};