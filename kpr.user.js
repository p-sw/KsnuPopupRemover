// ==UserScript==
// @name         KsnuPopupRemover
// @namespace    https://github.com/p-sw/KsnuPopupRemover
// @version      2024-09-02
// @description  Remove popup of Kunsan National University web lecture
// @author       Shinwoo PARK
// @match        https://eclass.kunsan.ac.kr/Lesson.do?cmd=viewStudyContentsForm*
// @icon         https://github.com/p-sw/KsnuPopupRemover/blob/b03f854502aae229bc481223767f5a6506a25c3b/ksnu_logo.png
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

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
      if (this.i) clearInterval(this.i);
      this.i = null;
    }
  }

  (new R()).t();
})();
