(
  () => {
    console.log("Loading program...");
    fetch("https://raw.githubusercontent.com/p-sw/KsnuPopupRemover/main/clicker.js").then((res) => {
      if (!res.ok) {
        throw Error(`Error occurred while loading program code. (${res.status} ${res.statusText})`)
      }

      return res.text();
    })
      .then(
        (code) => {
          console.log("Program loaded, injecting to page..")
          (0, eval)(code);
        }
      )
      .then(
        (code) => {
          console.log("Injection complete, running program...");
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
