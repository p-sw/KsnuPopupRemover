setTimeout(function() {
	var lecture_btn = document.querySelector('body > form > div > div.footer > ul > li > a');
	console.log("lecture_btn:", lecture_btn);
	if (typeof(lecture_btn[0]) !== "undefined") { 
		lecture_btn.click();
		console.log("Click triggered!");
	}
}, 
500
/**
 * 500은 매크로의 반복클릭 빈도를 0.5초로 세팅해둔 것입니다.
 * 이 숫자를 수정하여 반복클릭 빈도를 조정할 수 있습니다.
 * 일부 브라우저에서 0.5초 이하 값을 지정할 경우 오류가 발생하는 경우가 있습니다.
 * 특별한 경우가 아니라면 기본값인 0.5초를 사용하세요.
 */
);

