(function() {
	
	var Namespace = function() {
		//Private
		_init = function(jq) {
			if(!jq) {
				_getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', _run);
				return;
			}
			_run();
		}
		
		_run = function() {
			//Bullet
			$div = $('<div>').css({
				position: 'relative',
				top: 0,
				left: 0
			});
			$img = $('<img>').attr('src', 'bullet_hole.png');
			$div.append($img);
			
			//Targets
			$targets = $('div, container, article');
			$targets.click(function(e) {
				e.stopPropagation();
				e.cancelBubble = true;
				var $this = $(this);
				$this.append($div);
				window.setTimeout(function() {
					$this.remove();
				}, 100)
			});
		}
		
		// Paul Irish getScript method http://pastie.org/462639
	    _getScript = function(url, success) {
			var head = document.getElementsByTagName('head')[0], 
				done = false,
				script = document.createElement('script');

			script.src = url;

			script.onload = script.onreadystatechange = function(){
				if(!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
					done = true;
					success();
	            }
	        };

			head.appendChild(script);
	    };
		
		//Public
		return {
			init: _init
		};
	}();
	
	// check for jQuery, if not present pass reference
	var jq = true;
	if(!window.jQuery) {
		jq = false;
	}
	
	//Run app
	Namespace.init(jq);
	
})();