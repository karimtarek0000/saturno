"use strict";

jQuery(function () {
  //// Navbar
  $(".nav-link").on("click", function () {
    // 1) Remove class show when click link
    $(this).parentsUntil("navbar-collapse").removeClass("show");
    // 2) Get name id section
    var getIdSection = $(this).data("section");
    // 3) Got to section
    $("html, body").animate({
      scrollTop: $("#" + getIdSection).offset().top
    }, 1000);
  });

  //
  var getDirPage = $("html").attr("dir");
  var statusDir = getDirPage === "ltr" ? false : true;

  // Header slider
  $(".header__slider, .testimonial").slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    rtl: $("html").attr("dir") === "rtl" ? true : false,
    prevArrow: "<svg class='a-left control-c prev slick-prev'>\n    <use xlink:href=\"../icons/sprite.svg#icon-Angle-Left\">\n    </svg>",
    nextArrow: "<svg class='a-right control-c next slick-next'>\n    <use xlink:href=\"../icons/sprite.svg#icon-Angle-Right\">\n    </svg>"
  });

  // Blog slider
  $(".blog__article").slick({
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: false,
    appendDots: $(".placeholder"),
    responsive: [{
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }],
    rtl: $("html").attr("dir") === "rtl" ? true : false
  });

  // Section gallery
  $(".our-works__btn-gallery .btn").on("click", function () {
    // 1) Get id when click the button
    var classSelect = $(this).data("select");
    // 2) Add class active on select button then remove class active from all siblings
    $(this).addClass("active").siblings().removeClass("active");
    // 3) Filter with all images
    $(".our-works__gallery__image").filter(function (i, cur) {
      $(cur).hasClass(classSelect) ? $(cur).removeClass("opacity") : $(cur).addClass("opacity");
    });
  });

  // Scroll document
  $(document).on("scroll", function () {
    // Each for all sections
    $("body section").each(function () {
      // 1) Get id section
      var idSection = $(this).attr("id");
      // 2) Check if scroll top greather than or equal this section
      if ($(document).scrollTop() >= $(this).offset().top) {
        // 3) Finaly filter on all nav link and check if this section data section equal section above scroll top
        $(".nav-link").filter(function () {
          $(this).data("section") == idSection ? $(this).addClass("active-link") : $(this).removeClass("active-link");
        });
      }
    });

    //
    var getSectionAbout = $("#about-us").offset().top;
    //
    $(document).scrollTop() >= getSectionAbout ? $("#scrollUp").addClass("fadeIn") : $("#scrollUp").removeClass("fadeIn");
  });

  // Scroll up document
  $("#scrollUp").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
  });

  // Change direction page
  $(".change_lang").on("change", function () {
    // 1) Get lang when change lang
    var getLang = $(this).val().replace("#", "");
    // 2)
    if (getLang === "ar") {
      $(document).attr({ dir: "rtl", lang: "ar" });
    } else {
      $(document).attr({ dir: "ltr", lang: "en" });
    }
    $(".slick-slider").addClass("direction-ltr");
  });
});
"use strict";

// TRANSLATING
function translating(_ref) {
  var _ref$changeLang = _ref.changeLang,
      changeLang = _ref$changeLang === undefined ? ".change_lang" : _ref$changeLang,
      _ref$classParentTrans = _ref.classParentTrans,
      classParentTrans = _ref$classParentTrans === undefined ? ".translate" : _ref$classParentTrans,
      objTranslate = _ref.objTranslate,
      _ref$langStartLoad = _ref.langStartLoad,
      langStartLoad = _ref$langStartLoad === undefined ? "ar" : _ref$langStartLoad,
      _ref$statusLocalStora = _ref.statusLocalStorage,
      statusLocalStorage = _ref$statusLocalStora === undefined ? false : _ref$statusLocalStora;

  // ALL VARIABLES
  var btnLang = document.querySelector(changeLang);

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
    var textBtn = this.value.replace("#", "");
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
  window.addEventListener("hashchange", function (e) {
    // VAR RETURN NEW HASH
    var newUrl = e.newURL.split("#").pop();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJ0cmFuc2xhdGUuanMiXSwibmFtZXMiOlsialF1ZXJ5IiwiJCIsIm9uIiwicGFyZW50c1VudGlsIiwicmVtb3ZlQ2xhc3MiLCJnZXRJZFNlY3Rpb24iLCJkYXRhIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsImdldERpclBhZ2UiLCJhdHRyIiwic3RhdHVzRGlyIiwic2xpY2siLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwiYXJyb3dzIiwicnRsIiwicHJldkFycm93IiwibmV4dEFycm93IiwiZG90cyIsImFwcGVuZERvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwiY2xhc3NTZWxlY3QiLCJhZGRDbGFzcyIsInNpYmxpbmdzIiwiZmlsdGVyIiwiaSIsImN1ciIsImhhc0NsYXNzIiwiZG9jdW1lbnQiLCJlYWNoIiwiaWRTZWN0aW9uIiwiZ2V0U2VjdGlvbkFib3V0IiwiZ2V0TGFuZyIsInZhbCIsInJlcGxhY2UiLCJkaXIiLCJsYW5nIiwidHJhbnNsYXRpbmciLCJjaGFuZ2VMYW5nIiwiY2xhc3NQYXJlbnRUcmFucyIsIm9ialRyYW5zbGF0ZSIsImxhbmdTdGFydExvYWQiLCJzdGF0dXNMb2NhbFN0b3JhZ2UiLCJidG5MYW5nIiwicXVlcnlTZWxlY3RvciIsImNoYW5nZVNvbWVNZXRhIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRleHRCdG4iLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJsb2NhdGlvbiIsInJlbG9hZCIsIndpbmRvdyIsImUiLCJuZXdVcmwiLCJuZXdVUkwiLCJzcGxpdCIsInBvcCIsInNldExvY2FsU3RvcmFnZSIsIm5ld0xhbmciLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPLFlBQVk7QUFDakI7QUFDQUMsSUFBRSxXQUFGLEVBQWVDLEVBQWYs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QkMsT0FBekIsRUFBa0M7QUFDaEM7QUFDQSxRQUFJbEIsa0JBQUosRUFBd0JtQixhQUFhQyxPQUFiLENBQXFCLFVBQXJCLEVBQWlDRixPQUFqQztBQUN6Qjs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7QUFFRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcbiAgLy8vLyBOYXZiYXJcbiAgJChcIi5uYXYtbGlua1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyAxKSBSZW1vdmUgY2xhc3Mgc2hvdyB3aGVuIGNsaWNrIGxpbmtcbiAgICAkKHRoaXMpLnBhcmVudHNVbnRpbChcIm5hdmJhci1jb2xsYXBzZVwiKS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgLy8gMikgR2V0IG5hbWUgaWQgc2VjdGlvblxuICAgIGNvbnN0IGdldElkU2VjdGlvbiA9ICQodGhpcykuZGF0YShcInNlY3Rpb25cIik7XG4gICAgLy8gMykgR290IHRvIHNlY3Rpb25cbiAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxuICAgICAge1xuICAgICAgICBzY3JvbGxUb3A6ICQoYCMke2dldElkU2VjdGlvbn1gKS5vZmZzZXQoKS50b3AsXG4gICAgICB9LFxuICAgICAgMTAwMFxuICAgICk7XG4gIH0pO1xuXG4gIC8vXG4gIGxldCBnZXREaXJQYWdlID0gJChcImh0bWxcIikuYXR0cihcImRpclwiKTtcbiAgY29uc3Qgc3RhdHVzRGlyID0gZ2V0RGlyUGFnZSA9PT0gXCJsdHJcIiA/IGZhbHNlIDogdHJ1ZTtcblxuICAvLyBIZWFkZXIgc2xpZGVyXG4gICQoXCIuaGVhZGVyX19zbGlkZXIsIC50ZXN0aW1vbmlhbFwiKS5zbGljayh7XG4gICAgaW5maW5pdGU6IGZhbHNlLFxuICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgIGFycm93czogdHJ1ZSxcbiAgICBydGw6ICQoXCJodG1sXCIpLmF0dHIoXCJkaXJcIikgPT09IFwicnRsXCIgPyB0cnVlIDogZmFsc2UsXG4gICAgcHJldkFycm93OiBgPHN2ZyBjbGFzcz0nYS1sZWZ0IGNvbnRyb2wtYyBwcmV2IHNsaWNrLXByZXYnPlxuICAgIDx1c2UgeGxpbms6aHJlZj1cIi4uL2ljb25zL3Nwcml0ZS5zdmcjaWNvbi1BbmdsZS1MZWZ0XCI+XG4gICAgPC9zdmc+YCxcbiAgICBuZXh0QXJyb3c6IGA8c3ZnIGNsYXNzPSdhLXJpZ2h0IGNvbnRyb2wtYyBuZXh0IHNsaWNrLW5leHQnPlxuICAgIDx1c2UgeGxpbms6aHJlZj1cIi4uL2ljb25zL3Nwcml0ZS5zdmcjaWNvbi1BbmdsZS1SaWdodFwiPlxuICAgIDwvc3ZnPmAsXG4gIH0pO1xuXG4gIC8vIEJsb2cgc2xpZGVyXG4gICQoXCIuYmxvZ19fYXJ0aWNsZVwiKS5zbGljayh7XG4gICAgaW5maW5pdGU6IGZhbHNlLFxuICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICBzbGlkZXNUb1Njcm9sbDogMixcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgIGRvdHM6IHRydWUsXG4gICAgYXJyb3dzOiBmYWxzZSxcbiAgICBhcHBlbmREb3RzOiAkKFwiLnBsYWNlaG9sZGVyXCIpLFxuICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogNjAwLFxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBydGw6ICQoXCJodG1sXCIpLmF0dHIoXCJkaXJcIikgPT09IFwicnRsXCIgPyB0cnVlIDogZmFsc2UsXG4gIH0pO1xuXG4gIC8vIFNlY3Rpb24gZ2FsbGVyeVxuICAkKFwiLm91ci13b3Jrc19fYnRuLWdhbGxlcnkgLmJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyAxKSBHZXQgaWQgd2hlbiBjbGljayB0aGUgYnV0dG9uXG4gICAgY29uc3QgY2xhc3NTZWxlY3QgPSAkKHRoaXMpLmRhdGEoXCJzZWxlY3RcIik7XG4gICAgLy8gMikgQWRkIGNsYXNzIGFjdGl2ZSBvbiBzZWxlY3QgYnV0dG9uIHRoZW4gcmVtb3ZlIGNsYXNzIGFjdGl2ZSBmcm9tIGFsbCBzaWJsaW5nc1xuICAgICQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAvLyAzKSBGaWx0ZXIgd2l0aCBhbGwgaW1hZ2VzXG4gICAgJChcIi5vdXItd29ya3NfX2dhbGxlcnlfX2ltYWdlXCIpLmZpbHRlcigoaSwgY3VyKSA9PiB7XG4gICAgICAkKGN1cikuaGFzQ2xhc3MoY2xhc3NTZWxlY3QpID8gJChjdXIpLnJlbW92ZUNsYXNzKFwib3BhY2l0eVwiKSA6ICQoY3VyKS5hZGRDbGFzcyhcIm9wYWNpdHlcIik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFNjcm9sbCBkb2N1bWVudFxuICAkKGRvY3VtZW50KS5vbihcInNjcm9sbFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gRWFjaCBmb3IgYWxsIHNlY3Rpb25zXG4gICAgJChcImJvZHkgc2VjdGlvblwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIDEpIEdldCBpZCBzZWN0aW9uXG4gICAgICBjb25zdCBpZFNlY3Rpb24gPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcbiAgICAgIC8vIDIpIENoZWNrIGlmIHNjcm9sbCB0b3AgZ3JlYXRoZXIgdGhhbiBvciBlcXVhbCB0aGlzIHNlY3Rpb25cbiAgICAgIGlmICgkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSA+PSAkKHRoaXMpLm9mZnNldCgpLnRvcCkge1xuICAgICAgICAvLyAzKSBGaW5hbHkgZmlsdGVyIG9uIGFsbCBuYXYgbGluayBhbmQgY2hlY2sgaWYgdGhpcyBzZWN0aW9uIGRhdGEgc2VjdGlvbiBlcXVhbCBzZWN0aW9uIGFib3ZlIHNjcm9sbCB0b3BcbiAgICAgICAgJChcIi5uYXYtbGlua1wiKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykuZGF0YShcInNlY3Rpb25cIikgPT0gaWRTZWN0aW9uXG4gICAgICAgICAgICA/ICQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmUtbGlua1wiKVxuICAgICAgICAgICAgOiAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLWxpbmtcIik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9cbiAgICBjb25zdCBnZXRTZWN0aW9uQWJvdXQgPSAkKFwiI2Fib3V0LXVzXCIpLm9mZnNldCgpLnRvcDtcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpID49IGdldFNlY3Rpb25BYm91dFxuICAgICAgPyAkKFwiI3Njcm9sbFVwXCIpLmFkZENsYXNzKFwiZmFkZUluXCIpXG4gICAgICA6ICQoXCIjc2Nyb2xsVXBcIikucmVtb3ZlQ2xhc3MoXCJmYWRlSW5cIik7XG4gIH0pO1xuXG4gIC8vIFNjcm9sbCB1cCBkb2N1bWVudFxuICAkKFwiI3Njcm9sbFVwXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gICAgICB7XG4gICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgIH0sXG4gICAgICAxMDAwXG4gICAgKTtcbiAgfSk7XG5cbiAgLy8gQ2hhbmdlIGRpcmVjdGlvbiBwYWdlXG4gICQoXCIuY2hhbmdlX2xhbmdcIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgIC8vIDEpIEdldCBsYW5nIHdoZW4gY2hhbmdlIGxhbmdcbiAgICBjb25zdCBnZXRMYW5nID0gJCh0aGlzKS52YWwoKS5yZXBsYWNlKFwiI1wiLCBcIlwiKTtcbiAgICAvLyAyKVxuICAgIGlmIChnZXRMYW5nID09PSBcImFyXCIpIHtcbiAgICAgICQoZG9jdW1lbnQpLmF0dHIoeyBkaXI6IFwicnRsXCIsIGxhbmc6IFwiYXJcIiB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChkb2N1bWVudCkuYXR0cih7IGRpcjogXCJsdHJcIiwgbGFuZzogXCJlblwiIH0pO1xuICAgIH1cbiAgICAkKFwiLnNsaWNrLXNsaWRlclwiKS5hZGRDbGFzcyhcImRpcmVjdGlvbi1sdHJcIik7XG4gIH0pO1xufSk7XG4iLCIvLyBUUkFOU0xBVElOR1xuZnVuY3Rpb24gdHJhbnNsYXRpbmcoe1xuICBjaGFuZ2VMYW5nID0gXCIuY2hhbmdlX2xhbmdcIixcbiAgY2xhc3NQYXJlbnRUcmFucyA9IFwiLnRyYW5zbGF0ZVwiLFxuICBvYmpUcmFuc2xhdGUsXG4gIGxhbmdTdGFydExvYWQgPSBcImFyXCIsXG4gIHN0YXR1c0xvY2FsU3RvcmFnZSA9IGZhbHNlLFxufSkge1xuICAvLyBBTEwgVkFSSUFCTEVTXG4gIGNvbnN0IGJ0bkxhbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNoYW5nZUxhbmcpO1xuXG4gIC8vIENIQU5HRSBESVIgQU5EIExBTkdcbiAgZnVuY3Rpb24gY2hhbmdlU29tZU1ldGEobGFuZykge1xuICAgIGlmIChsYW5nID09IFwiYXJcIikge1xuICAgICAgZG9jdW1lbnQuZGlyID0gXCJydGxcIjtcbiAgICAgIC8vIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcImFyYWJpY1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZGlyID0gXCJsdHJcIjtcbiAgICAgIC8vIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImFyYWJpY1wiKTtcbiAgICB9XG4gICAgZG9jdW1lbnQubGFuZyA9IGxhbmc7XG4gIH1cblxuICAvLyBBREQgRVZFTlQgTElTVEVORVIgV0lMTCBCRSBDSEFOR0UgTEFOR1VBR0VcbiAgYnRuTGFuZy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBJRiBCVE4gTk9UIEVRVUFMIEhBU0ggV0lMTCBCRSBTVE9QIEZVTkNUSU9OIElGIE5PVCBXSUxMIEJFIFJVTklOTkcgQUxMIEFDVElPTlMgSU5UTyBGVU5DVElPTlxuICAgIC8vIFRFWFQgQlROXG4gICAgY29uc3QgdGV4dEJ0biA9IHRoaXMudmFsdWUucmVwbGFjZShcIiNcIiwgXCJcIik7XG4gICAgY29uc29sZS5sb2codGV4dEJ0bik7XG4gICAgXG4gICAgLy8gUlVOSU5ORyBDSEFOR0UgU09NRSBNRVRBXG4gICAgY2hhbmdlU29tZU1ldGEodGV4dEJ0bik7XG4gICAgLy8gUlVOSU5ORyBTRVQgTE9DQUwgU1RPUkFHRVxuICAgIC8vIHNldExvY2FsU3RvcmFnZSh0ZXh0QnRuKTtcbiAgICAvL1xuICAgIC8vIGxvY2F0aW9uLmhyZWYgPSBgIyR7dGV4dEJ0bn1gO1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIFxuICB9KTtcblxuICAvLyBFVkVOVCBMSVNURU5FUiBFVkVOVCBIQVNIIENIQU5HRSBXSUxMIEJFIENIQU5HRSBIQVNIXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCAoZSkgPT4ge1xuICAgIC8vIFZBUiBSRVRVUk4gTkVXIEhBU0hcbiAgICBjb25zdCBuZXdVcmwgPSBlLm5ld1VSTC5zcGxpdChcIiNcIikucG9wKCk7XG4gICAgLy8gY29uc29sZS5sb2cobmV3VXJsKTtcbiAgICAvLyB0cmFuc2xhdGluZyh7IGxhbmdTdGFydExvYWQ6IG5ld1VybCwgc3RhdHVzTG9jYWxTdG9yYWdlOiB0cnVlIH0pO1xuICAgIFxuICB9KTtcblxuICAvLyBMT0NBTCBTVE9SQUdFXG4gIGZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZShuZXdMYW5nKSB7XG4gICAgLy8gSUYgU1RBVFVTIExPQ0FMIFNUT1JBR0UgRVFVQUwgVFJVRSBXSUxMIEJFIFNFVCBMT0NBTCBTVE9SQUdFXG4gICAgaWYgKHN0YXR1c0xvY2FsU3RvcmFnZSkgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsYW5ndWFnZVwiLCBuZXdMYW5nKTtcbiAgfVxuXG4gIC8vXG4gIC8vIChmdW5jdGlvbiAoKSB7XG4gIC8vICAgbGV0IHNldExhbmcgPSBudWxsO1xuICAvLyAgIC8vXG4gIC8vICAgaWYgKHN0YXR1c0xvY2FsU3RvcmFnZSkge1xuICAvLyAgICAgbGV0IGdldExvY2FsU3RvcmFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGFuZ3VhZ2VcIik7XG4gIC8vICAgICBzZXRMYW5nID0gYCMke2dldExvY2FsU3RvcmFnZX1gO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICBzZXRMYW5nID0gYCMke2xhbmdTdGFydExvYWR9YDtcbiAgLy8gICB9XG5cbiAgLy8gICBidG5MYW5nLnZhbHVlID0gc2V0TGFuZztcblxuICAvLyAgIC8vIGJ0bkxhbmcuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIikpO1xuXG4gIC8vICAgLy8gLy8gUlVOSU5ORyBDSEFOR0UgU09NRSBNRVRBXG4gIC8vICAgLy8gY2hhbmdlU29tZU1ldGEoc2V0TGFuZy5yZXBsYWNlKFwiI1wiLCBcIlwiKS50cmltKCkpO1xuICAvLyAgIC8vIC8vXG4gIC8vICAgLy8gc2V0TG9jYWxTdG9yYWdlKHNldExhbmcucmVwbGFjZShcIiNcIiwgXCJcIikudHJpbSgpKTtcbiAgLy8gICAvLyAvLyBSVU5JTk5HIFRSQU5TTEFURSBFTEVNRU5UXG4gIC8vICAgLy8gdHJhbnNsYXRlRWxlbWVudChjbGFzc1BhcmVudFRyYW5zLCBvYmpUcmFuc2xhdGUsIHNldExhbmcpO1xuICAvLyAgIC8vIC8vXG4gIC8vICAgLy8gbG9jYXRpb24uaHJlZiA9IGAke3NldExhbmd9YDtcbiAgLy8gfSkoKTtcbn1cblxuLy8gdHJhbnNsYXRpbmcoe30pO1xuIl19
