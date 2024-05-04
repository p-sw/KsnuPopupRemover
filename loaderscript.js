var __ksnupopupremover;
var stopPopupRemover;
(
  () => {
    console.log("Loading program...");
    fetch("https://raw.githubusercontent.com/p-sw/KsnuPopupRemover/main/clicker.js", {cache:'no-store'}).then((res) => {
      if (!res.ok) {
        throw Error("Error occurred while loading program code. ("+res.status+" "+res.statusText+")")
      }
      const code = res.text();
      console.log("Program loaded");
      return code;
    })
      .then(
        (code) => {
          console.log("Injecting to page..")
          eval(code);
          console.log("Injection completed");
          console.log("Running program...");
          __ksnupopupremover = new PopupRemover();
          __ksnupopupremover.start();
          console.log("Started program");
          stopPopupRemover = () => {
            if (!__ksnupopupremover || !__ksnupopupremover || !__ksnupopupremover.interval) {
              console.log("Popup remover is not started");
              return;
            }
            __ksnupopupremover.stop()
          }
        }
      )
      .catch(
        (err) => {
          throw err;
        }
      );
  }
)()
