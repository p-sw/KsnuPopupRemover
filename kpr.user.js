// ==UserScript==
// @name         KsnuPopupRemover
// @namespace    https://github.com/p-sw/KsnuPopupRemover
// @version      2024-09-03+1
// @description  Remove popup of Kunsan National University web lecture
// @author       Shinwoo PARK
// @match        https://eclass.kunsan.ac.kr/Lesson.do?cmd=viewStudyContentsForm*
// @match        https://p-sw.github.io/KsnuPopupRemover/extpage*
// @icon         https://github.com/p-sw/KsnuPopupRemover/blob/b03f854502aae229bc481223767f5a6506a25c3b/ksnu_logo.png
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_notification
// @grant        unsafeWindow
// ==/UserScript==

(function() {
  'use strict';
  const DIVIDER = "__";
  const APP_ID = "ksnupopupremover";
  const CATCHED = `${APP_ID}${DIVIDER}catched`;
  const OPTION_BASE = `${APP_ID}${DIVIDER}option`;
  const OPTION_VERBOSE = `${OPTION_BASE}${DIVIDER}verbose`;

  const options_metadata = {
    [OPTION_VERBOSE]: ["프로그램 알림을 윈도우 알림으로 전송", "checkbox"],
  }
  const options = {
    [OPTION_VERBOSE]: GM_getValue(OPTION_VERBOSE, false),
  }

  if (window.location.hostname === "p-sw.github.io") {
    const catched = GM_getValue(CATCHED, 0);

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
    for (const [key, metadata] of Object.entries(options_metadata)) {
      const option_block = document.createElement("div");
      option_block.classList.add("option");
      option_block.id = key;
      const option_check = document.createElement("input");
      option_check.type = metadata[1];
      option_check[metadata[1] ==="checkbox" ? "checked" : "value"] = options[key];
      option_check.addEventListener("change", function(e) {GM_setValue(key, e.currentTarget[metadata[1] === "checkbox" ? "checked" : "value"])});
      option_block.appendChild(option_check);
      const option_description = document.createElement("span");
      option_description.innerText = metadata[0];
      option_block.appendChild(option_description);
      options_container.appendChild(option_block);
    }

    function option_updator(key, oldValue, newValue) {
      console.log(`option_updator for ${key} triggered: ${oldValue} -> ${newValue}`);
      const el_input = document.querySelector(`#${key}>input`);
      el_input[el_input.type === "checkbox" ? "checked" : "value"] = newValue;
      options[key] = newValue;
    }
    GM_addValueChangeListener(OPTION_VERBOSE, option_updator);
  } else {
    function notify_log(text) {
      if (options[OPTION_VERBOSE]) {
        GM_notification({ title: "KsnuPopupRemover", text: text });
      }
    }
    
    class R /* PopupRemover */ {
      constructor() {}
      t() {
        notify_log("KsnuPopupRemover Successfully Loaded & Started.");
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
          notify_log("Closed a popup.");
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
