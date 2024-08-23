class R /* PopupRemover */ {
	constructor() {}
	
	start() {
		this.i /* interval */ = setInterval(function() {
			let i /* iframe */ = document.getElementById("contentsCheckForm");
		
			console.log("lecture_iframe:", i);
			if (!i)
				return;
		
			let b /* button */ = i.contentWindow.document.querySelector('body > form > div > div.footer > ul > li > a');
			console.log("lecture_btn: ", b);
		
			if (!b || typeof b.click !== "function")
				return;
			
			b.click();
		}, 500);
	}

	stop() {
		if (this.i) {
			clearInterval(this.i);
			this.i = null;
		}
	}
}

p = new R();
p.start();

function stopPopupRemover() {
  if (!p || !p.i) {
    console.log("Not started yet");
    return;
  }
  p.stop();
}
