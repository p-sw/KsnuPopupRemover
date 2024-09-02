# KsnuPopupRemover - 군산대 이클래스 팝업 제거 확장

군산대학교 이클래스에서 온라인 강의시 나타나는 진행확인 팝업을 자동으로 클릭하는 브라우저 확장 매크로입니다.

## 알림
* [원본 레포지토리](https://github.com/antibiotics11/KsnuPopupRemover)의 유지 보수가 중단됨에 따라 유지보수가 지속될 수 있도록 새롭게 만든 레포지토리입니다.
* 24학번에 의해 유지보수되고 있습니다.

* 9/2, 파이어폭스 기반 브라우저에서 정상 작동을 확인했습니다.

## 스크립트 활성화 방법

<details>
  <summary><h3>(권장) 자동 실행 방식</h3></summary>

  <ol>
   <li>Tampermonkey 확장 프로그램 설치</li>
    <ul><li>크로미움 기반 브라우저 (구글 크롬, 엣지, 네이버 웨일, 비발디, 아크, 오페라, 브레이브 등) - <a href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo">여기에서 설치</a></li>
    <li>파이어폭스 기반 브라우저 (파이어폭스, 플룹, 젠 등) - <a href="https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/">여기에서 설치</a></li></ul> 
  <li><a href="https://github.com/p-sw/KsnuPopupRemover/raw/main/kpr.user.js">여기</a>를 클릭해 자동 스크립트 설치</li>
  <li>적용 완료</li>
  </ol>

</details>

위 방식이 제대로 동작하지 않을 경우 아래 수동 실행 방식을 사용하여 수동으로 실행해주세요.

<details>
 <summary><h3>수동 실행 방식</h3></summary>
 <ol>
  <li>강의 학습 페이지 접속 (학습하기 클릭 후 뜨는 팝업 페이지)</li>
  <li><code>Ctrl(컨트롤)</code> + <code>Shift(시프트)</code> + <code>I</code> 클릭 -> 개발자 도구 열림</li>
  <li>상단 탭에서 <code>Element</code> 옆의 <code>Console</code> 탭 클릭</li>
  <li>맨 밑에 아래의 코드뭉치를 복붙 후 엔터</li>
  <li><code>lecture_iframe: null</code>이 0.5초마다 출력된다면 적용 완료</li>
 </ol>
 <ul>
  <li>만약 PopupRemover를 중단하고 싶을 경우 <code>stopPopupRemover()</code> 입력 후 엔터</li>
  <li>페이지를 나갈 때는 PopupRemover를 중단하지 않아도 됨</li>
 </ul>

```js
class R{constructor(){}start(){this.interval=setInterval(function(){let t=document.getElementById("contentsCheckForm");if(console.log("lecture_iframe:",t),!t)return;let e=t.contentWindow.document.querySelector("body > form > div > div.footer > ul > li > a");console.log("lecture_btn: ",e),e&&"function"==typeof e.click&&e.click()},500)}stop(){this.interval&&(clearInterval(this.interval),this.interval=null)}}function stopPopupRemover(){if(!p||!p.interval){console.log("Not started yet");return}p.stop()}(p=new R).start();
```
**정상 작동을 확인했습니다.**

Minify되지 않은 코드는 [여기](https://github.com/p-sw/KsnuPopupRemover/blob/main/loaderscript.js)에서 보실 수 있습니다. (loaderscript.js)
 
</details>

<!--
## ~~설치 및 활성화 방법 (MS Edge 기준)~~

1. [최신 릴리즈 버전](https://github.com/p-sw/KsnuPopupRemover/releases/tag/v.1.3-alpha)의 소스 파일(.zip) 다운로드 및 압축 해제
2. Edge 우측 상단의 "..." 클릭 => "확장" 클릭
3. 좌측 하단의 "개발자 모드" 활성화
4. "설치된 확장"에서 "압축 풀린 파일 로드" 클릭
5. 압축 해제한 폴더 선택
6. 아래 스크린샷처럼 "설치된 확장" 목록과 주소창 우측에 아이콘이 추가되었다면 설치 완료

### 정상 작동하지 않을 경우
"설치된 확장" => KsnuPopupRemover => "세부 정보" => "InPrivate에서 허용" 체크 => 브라우저 재시작

### 테스트되지 않은 최신 버전 설치

**주의:** 테스트되지 않은 최신 버전의 경우 의도되지 않은 버그나 오류가 생길 수 있습니다.

1. [테스트되지 않은 최신 버전](https://github.com/p-sw/KsnuPopupRemover/archive/refs/heads/main.zip) (.zip) 다운로드 및 압축 해제
2. Edge 우측 상단의 "..." 클릭 => "확장" 클릭
3. 좌측 하단의 "개발자 모드" 활성화
4. "설치된 확장"에서 "압축 풀린 파일 로드" 클릭
5. 압축 해제한 폴더 선택
6. 아래 스크린샷처럼 "설치된 확장" 목록과 주소창 우측에 아이콘이 추가되었다면 설치 완료

## ~~스크린샷~~

![1](https://user-images.githubusercontent.com/75349747/131472983-3403cc72-8c68-47ca-892f-34463f015f65.PNG)
![2](https://user-images.githubusercontent.com/75349747/138016726-bbedb7dc-02ea-4384-b3f3-40fd27142f3c.png)
-->

## 오류/버그 제보 및 기여

오류나 버그의 제보는 [Issues](https://github.com/p-sw/KsnuPopupRemover/issues) 탭에서 새로운 이슈를 열고 적어주시면 됩니다. 자세히 적을 수록 빠르게 해결될 가능성이 높습니다.

코드 기여는 언제나 환영입니다. 포크 후 코드를 수정하고 PR을 열어주시면 코드 리뷰 후 병합하겠습니다.
