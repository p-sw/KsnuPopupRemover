class PopupRemover {
	constructor() {}
	
	function start() {
		this.interval = setInterval(function() {
			let lecture_iframe = document.getElementById("contentsCheckForm");
		
			console.log("lecture_iframe:", lecture_iframe);
			if (!lecture_iframe)
				return;
		
			let lecture_btn = lecture_iframe.contentWindow.document.querySelector('body > form > div > div.footer > ul > li > a');
			console.log("lecture_btn: ", lecture_btn);
		
			if (!lecture_btn || typeof lecture_btn.click !== "function")
				return;
			
			lecture_btn.click();
		}, 500);
	}

	function stop() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}
}
