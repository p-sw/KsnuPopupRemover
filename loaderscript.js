(
  () => {
    console.log("프로그램 로딩중...");
    fetch("https://raw.githubusercontent.com/p-sw/KsnuPopupRemover/main/clicker.js").then((res) => {
      if (!res.ok) {
        throw Error(`프로그램의 코드를 로딩하는 중에 오류가 발생했습니다. (${res.status} ${res.statusText})`)
      }

      return res.text();
    })
      .then(
        (code) => {
          console.log("프로그램 로딩 완료, 페이지에 주입..")
          eval(code);
        }
      )
      .then(
        (code) => {
          console.log("주입 완료, 프로그램 실행...");
          loadPopupRemover();
        }
      )
      .catch(
        (err) => {
          console.log(err.toString());
        }
      );
  }
)()
