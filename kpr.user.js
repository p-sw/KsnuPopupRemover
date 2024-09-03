// ==UserScript==
// @name         KsnuPopupRemover
// @namespace    https://github.com/p-sw/KsnuPopupRemover
// @version      2024-09-02+1
// @description  Remove popup of Kunsan National University web lecture
// @author       Shinwoo PARK
// @match        https://eclass.kunsan.ac.kr/Lesson.do?cmd=viewStudyContentsForm*
// @match        https://p-sw.github.io/KsnuPopupRemover/extpage*
// @icon         https://github.com/p-sw/KsnuPopupRemover/blob/b03f854502aae229bc481223767f5a6506a25c3b/ksnu_logo.png
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        unsafeWindow
// ==/UserScript==

(function() {
  'use strict';
  const DIVIDER = "__";
  const APP_ID = "ksnupopupremover";
  const CATCHED = `${APP_ID}${DIVIDER}catched`;
  const OPTION_BASE = `${APP_ID}${DIVIDER}option`;
  const OPTION_VERBOSE = `${OPTION_BASE}${DIVIDER}verbose`;

  if (window.location.hostname === "p-sw.github.io") {
    const catched = GM_getValue(CATCHED, 0);
    const options = {
      verbose: ["프로그램 알림을 윈도우 알림으로 전송", "checkbox", GM_getValue(OPTION_VERBOSE, false)],
    }

    const main_p = document.createElement("p");
    main_p.style = "width:100%;text-align:center;";
    const catched_text = document.createTextNode("");
    main_p.appendChild(catched_text);
    document.querySelector("#main").appendChild(main_p);
    function catch_updator(_1, oldValue, newValue) {
      console.log(`catch_updator triggered: ${oldValue} -> ${newValue}`);
      catched_text.nodeValue = `지금까지 ${newValue}개의 팝업을 자동으로 닫았습니다.`;
    }
    catch_updator(0, 0, catched);
    GM_addValueChangeListener(CATCHED, catch_updator);

    const options_container = document.querySelector("#options");
    for (const [key, values] of Object.entries(options)) {
      const option_block = document.createElement("div");
      option_block.classList.add("option");
      option_block.id = `option_${key}`;
      const option_check = document.createElement("input");
      option_check.type = values[1];
      option_check[values[1] ==="checkbox" ? "checked" : "value"] = values[2];
      option_check.addEventListener("change", function(e) {GM_setValue(`${OPTION_BASE}${DIVIDER}${key}`, e.currentTarget[values[1] === "checkbox" ? "checked" : "value"])});
      option_block.appendChild(option_check);
      const option_description = document.createElement("span");
      option_description.innerText = values[0];
      option_block.appendChild(option_description);
      options_container.appendChild(option_block);
    }

    function option_updator(key, oldValue, newValue) {
      console.log(`option_updator for ${key} triggered: ${oldValue} -> ${newValue}`);
      const el_input = document.querySelector(`#option_${key.split(DIVIDER).at(-1)}>input`);
      if (el_input.type === "checkbox") {
        el_input.checked = newValue;
      } else {
        el_input.value = newValue;
      }
    }
    GM_addValueChangeListener(OPTION_VERBOSE, option_updator);
  } else {
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
          const catched = GM_getValue(CATCHED, 0);
          GM_setValue(CATCHED, catched + 1);
        }, 500);
      }

      p() {
        if (this.i) clearInterval(this.i);
        this.i = null;
      }
    }
    (new R()).t();
  }
})();
