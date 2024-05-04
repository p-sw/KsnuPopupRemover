var __ksnupopupremover;
(
  () => {
    console.log("Loading program...");
    fetch("https://raw.githubusercontent.com/p-sw/KsnuPopupRemover/main/clicker.js").then((res) => {
      if (!res.ok) {
        throw Error(`Error occurred while loading program code. (${res.status} ${res.statusText})`)
      }
      const code = res.text();
      console.log("Program loaded");
      return code;
    })
      .then(
        (code) => {
          console.log("Injecting to page..")
          eval(code);
          __ksnupopupremover = new PopupRemover();
          console.log("Injection completed");
        }
      )
      .then(
        () => {
          console.log("Running program...");
          __ksnupopupremover.start();
          console.log("Started program");
        }
      )
      .catch(
        (err) => {
          console.log(err.toString());
        }
      );
  }
)()

function stopPopupRemover() {
  if (!__ksnupopupremover || !__ksnupopupremover || !__ksnupopupremover.interval) {
    console.log("Popup remover is not started")
  }
  __ksnupopupremover.stop()
}
