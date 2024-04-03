alert("팝업 제거 확장 프로그램이 실행되었습니다.")
setInterval(function() {
	var lecture_btn = document.querySelector('body > form > div > div.footer > ul > li > a');
	console.log("lecture_btn:", lecture_btn);
	if (!!lecture_btn && !!lecture_btn.click) {
		lecture_btn.click();
		console.log("클릭됨!");
	}
}, 500);
