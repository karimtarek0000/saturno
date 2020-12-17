// TRANSLATING
function translating({
  changeLang = ".change_lang",
  classParentTrans = ".translate",
  objTranslate,
  langStartLoad = "ar",
  statusLocalStorage = false,
}) {
  // ALL VARIABLES
  const btnLang = document.querySelector(changeLang);

  // CHANGE DIR AND LANG
  function changeSomeMeta(lang) {
    if (lang == "ar") {
      document.dir = "rtl";
      // document.body.classList.add("arabic");
    } else {
      document.dir = "ltr";
      // document.body.classList.remove("arabic");
    }
    document.lang = lang;
  }

  // ADD EVENT LISTENER WILL BE CHANGE LANGUAGE
  btnLang.addEventListener("change", function () {
    // IF BTN NOT EQUAL HASH WILL BE STOP FUNCTION IF NOT WILL BE RUNINNG ALL ACTIONS INTO FUNCTION
    // TEXT BTN
    const textBtn = this.value.replace("#", "");
    console.log(textBtn);
    
    // RUNINNG CHANGE SOME META
    changeSomeMeta(textBtn);
    // RUNINNG SET LOCAL STORAGE
    // setLocalStorage(textBtn);
    //
    // location.href = `#${textBtn}`;
    location.reload();
    
  });

  // EVENT LISTENER EVENT HASH CHANGE WILL BE CHANGE HASH
  window.addEventListener("hashchange", (e) => {
    // VAR RETURN NEW HASH
    const newUrl = e.newURL.split("#").pop();
    // console.log(newUrl);
    // translating({ langStartLoad: newUrl, statusLocalStorage: true });
    
  });

  // LOCAL STORAGE
  function setLocalStorage(newLang) {
    // IF STATUS LOCAL STORAGE EQUAL TRUE WILL BE SET LOCAL STORAGE
    if (statusLocalStorage) localStorage.setItem("language", newLang);
  }

  //
  // (function () {
  //   let setLang = null;
  //   //
  //   if (statusLocalStorage) {
  //     let getLocalStorage = localStorage.getItem("language");
  //     setLang = `#${getLocalStorage}`;
  //   } else {
  //     setLang = `#${langStartLoad}`;
  //   }

  //   btnLang.value = setLang;

  //   // btnLang.dispatchEvent(new Event("change"));

  //   // // RUNINNG CHANGE SOME META
  //   // changeSomeMeta(setLang.replace("#", "").trim());
  //   // //
  //   // setLocalStorage(setLang.replace("#", "").trim());
  //   // // RUNINNG TRANSLATE ELEMENT
  //   // translateElement(classParentTrans, objTranslate, setLang);
  //   // //
  //   // location.href = `${setLang}`;
  // })();
}

// translating({});
