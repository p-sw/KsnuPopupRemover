// ==UserScript==
// @name         KsnuPopupRemover
// @namespace    https://github.com/p-sw/KsnuPopupRemover
// @version      2024-08-23
// @description  Remove popup of Kunsan National University web lecture
// @author       Shinwoo PARK
// @match        https://eclass.kunsan.ac.kr/Lesson.do?cmd=viewStudyContentsForm*
// @icon         https://github.com/p-sw/KsnuPopupRemover/blob/088844fc66073bf88930b7e39bbf40b8ff87a8b8/ksnu_logo.png
// @grant        none
// ==/UserScript==

class R /* PopupRemover */ {
	constructor() {}
	t() {
		this.i /* interval */ = setInterval(function() {
			let i /* iframe */ = document.getElementById("contentsCheckForm");
			console.log("lecture_iframe:", i);
			if (!i) return
			let b /* button */ = i.contentWindow.document.querySelector('body > form > div > div.footer > ul > li > a');
			console.log("lecture_btn: ", b);
			if (!b || typeof b.click !== "function") return;
			b.click();
		}, 500);
	}

	p() {
		if (this.i) {
			clearInterval(this.i);
			this.i = null;
		}
	}
}

(function() {
    'use strict';

    (new R()).start();
})();
