"use strict";

jQuery(function () {
  //// Navbar
  $(".nav-link").on("click", function () {
    // 1) Remove class show when click link
    $(this).parentsUntil("navbar-collapse").removeClass("show");
  });

  // All input
  var allInput = {
    phone: "#phone",
    email: "#email",
    textArea: "#textArea",
    selectProject: $(".form-select"),
    labelOne: $("#labelOne"),
    labelTwo: $("#labelTwo"),
    submitForm: $(".submitForm")
  };

  // Header slider
  $(".header__slider, .testimonial").slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: "<svg class='a-left control-c prev slick-prev'>\n    <use xlink:href=\"../icons/sprite.svg#icon-Angle-Left\">\n    </svg>",
    nextArrow: "<svg class='a-right control-c next slick-next'>\n    <use xlink:href=\"../icons/sprite.svg#icon-Angle-Right\">\n    </svg>",
    responsive: [{
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false
      }
    }]
  });

  // Blog slider
  $(".blog__article").slick({
    infinite: true,
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
    }]
  });

  // Our team slider
  $(".our-team__wrapper").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: false,
    responsive: [{
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }]
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
    //
    $(document).scrollTop() >= 1000 ? $("#scrollUp").addClass("fadeIn") : $("#scrollUp").removeClass("fadeIn");
  });

  // Scroll up document
  $("#scrollUp").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
  });

  //////////
  // Change lang

  // 1) Render language
  async function renderLanguage(getLang) {
    // 2) Get data
    // const localizition = await $.get(`../localizition/${getLang}.json`);
    // 3) Change language
    if (getLang === "ar") {
      $("html").attr({ dir: "rtl", lang: "ar" });
    } else {
      $("html").attr({ dir: "ltr", lang: "en" });
    }

    // Form
    // $("form")
    //   .find(`[key]`)
    //   .each(function (i, cur) {
    //     //
    //     if ($(cur).is("input, textarea")) {
    //       $(cur).attr(
    //         "placeholder",
    //         localizition.pages[$(this).attr("key")]["form"][$(this).data("lang")]
    //       );
    //     }
    //     //
    //     if ($(cur).is("label, button")) {
    //       $(cur).text(localizition.pages[$(this).attr("key")]["form"][$(this).data("lang")]);
    //     }
    //   });

    // // Pages
    // $("h1, h2, h3, h4, button, p, a, li").each((i, cur) => {
    //   if ($(cur).is(`[key]`))
    //     $(cur).text(localizition.pages[$(cur).attr("key")][$(cur).data("lang")]);
    // });

    // // Navbar links
    // $(".navbar-nav a").each((i, cur) => $(cur).text(localizition.navbar[$(cur).attr("key")]));
  }

  // 2) When change lang
  $(".change_lang").on("change", function () {
    // 1) Get new value from select element
    var getLang = $(this).val();

    // 2) Set new value in item
    localStorage.setItem("language", getLang);

    // 3) Reload page
    location.reload();
  });

  // Change select lang
  function changeSelectLang(lang) {
    $(".change_lang option").each(function (i, cur) {
      if ($(cur).attr("value") === lang) {
        $(cur).attr("selected", true).siblings().removeAttr("selected");
      }
    });
  }

  //
  var getLanguage = localStorage.getItem("language");

  // If there local storage in site with name language will be render language site with in the same language if not will be render language site with selected lang from select box
  if (getLanguage !== null) {
    changeSelectLang(getLanguage);
    renderLanguage(getLanguage);
  } else {
    var getLang = $(".change_lang").val();
    renderLanguage(getLang);
    changeSelectLang(getLang);
  }

  // Change dir slider
  $(".slick-slider").addClass("direction-ltr");

  //
  $("footer #date").text(new Date().getFullYear());

  // Lazy loading image
  // All images
  var allImages = $("[data-src]");

  // Preload image
  function preloadImages(img) {
    var src = $(img).data("src");

    if (!src) return;

    img.src = src;

    $(img).removeAttr("data-src");
  }

  //
  var ImageObServer = new IntersectionObserver(function (entries, ImageObServer) {
    $(entries).each(function (i, cur) {
      if (!cur.isIntersecting) {
        cur.target.classList.add("fadeOut");
        return;
      } else {
        //
        preloadImages(cur.target);
        cur.target.classList.remove("fadeOut");
        cur.target.classList.add("fadeIn");
        ImageObServer.unobserve(cur.target);
      }
    });
  }, {
    threshold: 0
  });

  //
  allImages.each(function (i, cur) {
    return ImageObServer.observe(cur);
  });

  function validationForm() {
    ////////////////////////////////////
    //// Validation form
    // Form
    var form = $("#form");

    // All fileds message
    var filedsMessage = {
      messagePhone: $("#messagePhone"),
      messageEmail: $("#messageEmail"),
      messageTextArea: $("#messageTextArea"),
      messageInterested: $("#messageInterested")
    };

    // Data center form
    var dataForm = {
      phone: null,
      email: null,
      chooseIntersted: [],
      aboutProject: null
    };

    // Regexp
    var regExp = {
      phone: /^[\d]{7,11}$/,
      email: /^([A-z]|[0-9]){3,}@[A-z]{3,7}[.]{1}[A-z]{2,4}$/g
    };

    // All messages errors
    var messageErrors = {
      phone: {
        en: "write between 7 and 11 numbers ❌",
        ar: "❌ يجب ادخال من ٧ الي ١١ رقم"
      },
      email: {
        en: "write correct email \u274C",
        ar: "❌ يجب ادخال الايميل بشكل صحيح"
      },
      chooseIntersted: {
        en: "You must choose some one \u274C",
        ar: "❌ يجب اختيار واحد علي الاقل"
      },
      aboutProject: {
        en: "You must write message \u274C",
        ar: "❌ يجب ادخال رسالة"
      }
    };

    // 1) Get value from input phone and email
    $(allInput.phone).add(allInput.email).add(allInput.textArea).on("input", function () {
      //
      var getId = $(this).attr("id");

      // 1) Check if get id equal => PHONE
      if (getId === allInput.phone.replace("#", "")) {
        // Check if value input equal regular expersion
        if ($(this).val().match(regExp.phone)) {
          dataForm.phone = $(this).val();
          renderMessageErrorUI("messagePhone");
        } else {
          renderMessageErrorUI("messagePhone", "phone");
        }
      }

      // 2) Check if get id equal => EMAIL
      if (getId === allInput.email.replace("#", "")) {
        if ($(this).val().match(regExp.email)) {
          dataForm.email = $(this).val().toLowerCase();
          renderMessageErrorUI("messageEmail");
        } else {
          renderMessageErrorUI("messageEmail", "email");
        }
      }

      // 3) Check if get id equal => TEXTAREA
      if (getId === allInput.textArea.replace("#", "")) {
        if ($(this).val()) {
          dataForm.aboutProject = $(this).val();
          renderMessageErrorUI("messageTextArea");
        } else {
          renderMessageErrorUI("messageTextArea", "aboutProject");
        }
      }
    });

    // 2) Choose interested project
    allInput.selectProject.on("click", function () {
      // 1) Toggle class when select intersted project
      $(this).toggleClass("active");
      // 2) Check if name project exsist in array or not
      allInput.selectProject.each(function (i, cur) {
        var nameProject = $(cur).data("project");
        //
        if ($(cur).hasClass("active") && !dataForm.chooseIntersted.includes(nameProject)) {
          dataForm.chooseIntersted.push(nameProject);
        } else if (!$(cur).hasClass("active")) {
          dataForm.chooseIntersted.splice(i, 1);
        }
      });
    });

    // 3) Render message error ui
    function renderMessageErrorUI(type) {
      var nameKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      var lang = $("html").attr("lang");
      //
      nameKey == "" ? filedsMessage[type].text("") : filedsMessage[type].text(messageErrors[nameKey][lang]);
    }

    // 4) Event submit on form
    form.on("submit", function (e) {
      // 1) Disable behover submit
      e.preventDefault();

      // 2) If all data required exsist will be send data to api
      if (dataForm.phone && dataForm.chooseIntersted.length > 0 && dataForm.aboutProject) {
        // 1) to api
        console.log(dataForm);
      } else {
        dataForm.chooseIntersted.length <= 0 ? renderMessageErrorUI("messageInterested", "chooseIntersted") : renderMessageErrorUI("messageInterested");
        $(allInput.phone).add(allInput.textArea).trigger("input");
      }
    });
  }
  // Call fn validationForm
  validationForm();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsialF1ZXJ5IiwiJCIsIm9uIiwicGFyZW50c1VudGlsIiwicmVtb3ZlQ2xhc3MiLCJhbGxJbnB1dCIsInBob25lIiwiZW1haWwiLCJ0ZXh0QXJlYSIsInNlbGVjdFByb2plY3QiLCJsYWJlbE9uZSIsImxhYmVsVHdvIiwic3VibWl0Rm9ybSIsInNsaWNrIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsImFycm93cyIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJkb3RzIiwiYXBwZW5kRG90cyIsImNsYXNzU2VsZWN0IiwiZGF0YSIsImFkZENsYXNzIiwic2libGluZ3MiLCJmaWx0ZXIiLCJpIiwiY3VyIiwiaGFzQ2xhc3MiLCJkb2N1bWVudCIsInNjcm9sbFRvcCIsImFuaW1hdGUiLCJyZW5kZXJMYW5ndWFnZSIsImdldExhbmciLCJhdHRyIiwiZGlyIiwibGFuZyIsInZhbCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJsb2NhdGlvbiIsInJlbG9hZCIsImNoYW5nZVNlbGVjdExhbmciLCJlYWNoIiwicmVtb3ZlQXR0ciIsImdldExhbmd1YWdlIiwiZ2V0SXRlbSIsInRleHQiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJhbGxJbWFnZXMiLCJwcmVsb2FkSW1hZ2VzIiwiaW1nIiwic3JjIiwiSW1hZ2VPYlNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsImlzSW50ZXJzZWN0aW5nIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwidW5vYnNlcnZlIiwidGhyZXNob2xkIiwib2JzZXJ2ZSIsInZhbGlkYXRpb25Gb3JtIiwiZm9ybSIsImZpbGVkc01lc3NhZ2UiLCJtZXNzYWdlUGhvbmUiLCJtZXNzYWdlRW1haWwiLCJtZXNzYWdlVGV4dEFyZWEiLCJtZXNzYWdlSW50ZXJlc3RlZCIsImRhdGFGb3JtIiwiY2hvb3NlSW50ZXJzdGVkIiwiYWJvdXRQcm9qZWN0IiwicmVnRXhwIiwibWVzc2FnZUVycm9ycyIsImVuIiwiYXIiLCJnZXRJZCIsInJlcGxhY2UiLCJtYXRjaCIsInJlbmRlck1lc3NhZ2VFcnJvclVJIiwidG9Mb3dlckNhc2UiLCJ0b2dnbGVDbGFzcyIsIm5hbWVQcm9qZWN0IiwiaW5jbHVkZXMiLCJwdXNoIiwic3BsaWNlIiwidHlwZSIsIm5hbWVLZXkiLCJlIiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwidHJpZ2dlciJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBTyxZQUFZO0FBQ2pCO0FBQ0FDLElBQUUsV0FBRixFQUFlQyxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFlBQVk7QUFDckM7QUFDQUQsTUFBRSxJQUFGLEVBQVFFLFlBQVIsQ0FBcUIsaUJBQXJCLEVBQXdDQyxXQUF4QyxDQUFvRCxNQUFwRDtBQUNELEdBSEQ7O0FBS0E7QUFDQSxNQUFNQyxXQUFXO0FBQ2ZDLFdBQU8sUUFEUTtBQUVmQyxXQUFPLFFBRlE7QUFHZkMsY0FBVSxXQUhLO0FBSWZDLG1CQUFlUixFQUFFLGNBQUYsQ0FKQTtBQUtmUyxjQUFVVCxFQUFFLFdBQUYsQ0FMSztBQU1mVSxjQUFVVixFQUFFLFdBQUYsQ0FOSztBQU9mVyxnQkFBWVgsRUFBRSxhQUFGO0FBUEcsR0FBakI7O0FBVUE7QUFDQUEsSUFBRSwrQkFBRixFQUFtQ1ksS0FBbkMsQ0FBeUM7QUFDdkNDLGNBQVUsS0FENkI7QUFFdkNDLGtCQUFjLENBRnlCO0FBR3ZDQyxvQkFBZ0IsQ0FIdUI7QUFJdkNDLGNBQVUsSUFKNkI7QUFLdkNDLG1CQUFlLElBTHdCO0FBTXZDQyxZQUFRLElBTitCO0FBT3ZDQyx5SUFQdUM7QUFVdkNDLDJJQVZ1QztBQWF2Q0MsZ0JBQVksQ0FDVjtBQUNFQyxrQkFBWSxHQURkO0FBRUVDLGdCQUFVO0FBQ1JULHNCQUFjLENBRE47QUFF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RUFBb0Y7QUFDbEY7QUFDQW9CLGdCQUFRQyxHQUFSLENBQVl2QixRQUFaO0FBQ0QsT0FIRCxNQUdPO0FBQ0xBLGlCQUFTQyxlQUFULENBQXlCb0IsTUFBekIsSUFBbUMsQ0FBbkMsR0FDSVgscUJBQXFCLG1CQUFyQixFQUEwQyxpQkFBMUMsQ0FESixHQUVJQSxxQkFBcUIsbUJBQXJCLENBRko7QUFHQXZGLFVBQUVJLFNBQVNDLEtBQVgsRUFBa0I0RCxHQUFsQixDQUFzQjdELFNBQVNHLFFBQS9CLEVBQXlDOEYsT0FBekMsQ0FBaUQsT0FBakQ7QUFDRDtBQUNGLEtBZEQ7QUFlRDtBQUNEO0FBQ0EvQjtBQUNELENBMVhEIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJqUXVlcnkoZnVuY3Rpb24gKCkge1xuICAvLy8vIE5hdmJhclxuICAkKFwiLm5hdi1saW5rXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIC8vIDEpIFJlbW92ZSBjbGFzcyBzaG93IHdoZW4gY2xpY2sgbGlua1xuICAgICQodGhpcykucGFyZW50c1VudGlsKFwibmF2YmFyLWNvbGxhcHNlXCIpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgfSk7XG5cbiAgLy8gQWxsIGlucHV0XG4gIGNvbnN0IGFsbElucHV0ID0ge1xuICAgIHBob25lOiBcIiNwaG9uZVwiLFxuICAgIGVtYWlsOiBcIiNlbWFpbFwiLFxuICAgIHRleHRBcmVhOiBcIiN0ZXh0QXJlYVwiLFxuICAgIHNlbGVjdFByb2plY3Q6ICQoXCIuZm9ybS1zZWxlY3RcIiksXG4gICAgbGFiZWxPbmU6ICQoXCIjbGFiZWxPbmVcIiksXG4gICAgbGFiZWxUd286ICQoXCIjbGFiZWxUd29cIiksXG4gICAgc3VibWl0Rm9ybTogJChcIi5zdWJtaXRGb3JtXCIpLFxuICB9O1xuXG4gIC8vIEhlYWRlciBzbGlkZXJcbiAgJChcIi5oZWFkZXJfX3NsaWRlciwgLnRlc3RpbW9uaWFsXCIpLnNsaWNrKHtcbiAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgc2xpZGVzVG9TaG93OiAxLFxuICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgYXJyb3dzOiB0cnVlLFxuICAgIHByZXZBcnJvdzogYDxzdmcgY2xhc3M9J2EtbGVmdCBjb250cm9sLWMgcHJldiBzbGljay1wcmV2Jz5cbiAgICA8dXNlIHhsaW5rOmhyZWY9XCIuLi9pY29ucy9zcHJpdGUuc3ZnI2ljb24tQW5nbGUtTGVmdFwiPlxuICAgIDwvc3ZnPmAsXG4gICAgbmV4dEFycm93OiBgPHN2ZyBjbGFzcz0nYS1yaWdodCBjb250cm9sLWMgbmV4dCBzbGljay1uZXh0Jz5cbiAgICA8dXNlIHhsaW5rOmhyZWY9XCIuLi9pY29ucy9zcHJpdGUuc3ZnI2ljb24tQW5nbGUtUmlnaHRcIj5cbiAgICA8L3N2Zz5gLFxuICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogNjAwLFxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9KTtcblxuICAvLyBCbG9nIHNsaWRlclxuICAkKFwiLmJsb2dfX2FydGljbGVcIikuc2xpY2soe1xuICAgIGluZmluaXRlOiB0cnVlLFxuICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICBzbGlkZXNUb1Njcm9sbDogMixcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgIGRvdHM6IHRydWUsXG4gICAgYXJyb3dzOiBmYWxzZSxcbiAgICBhcHBlbmREb3RzOiAkKFwiLnBsYWNlaG9sZGVyXCIpLFxuICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogNjAwLFxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSk7XG5cbiAgLy8gT3VyIHRlYW0gc2xpZGVyXG4gICQoXCIub3VyLXRlYW1fX3dyYXBwZXJcIikuc2xpY2soe1xuICAgIGluZmluaXRlOiB0cnVlLFxuICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgIGRvdHM6IHRydWUsXG4gICAgYXJyb3dzOiBmYWxzZSxcbiAgICByZXNwb25zaXZlOiBbXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDgwMCxcbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDIsXG4gICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA2MDAsXG4gICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9KTtcblxuICAvLyBTZWN0aW9uIGdhbGxlcnlcbiAgJChcIi5vdXItd29ya3NfX2J0bi1nYWxsZXJ5IC5idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gMSkgR2V0IGlkIHdoZW4gY2xpY2sgdGhlIGJ1dHRvblxuICAgIGNvbnN0IGNsYXNzU2VsZWN0ID0gJCh0aGlzKS5kYXRhKFwic2VsZWN0XCIpO1xuICAgIC8vIDIpIEFkZCBjbGFzcyBhY3RpdmUgb24gc2VsZWN0IGJ1dHRvbiB0aGVuIHJlbW92ZSBjbGFzcyBhY3RpdmUgZnJvbSBhbGwgc2libGluZ3NcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwiYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgLy8gMykgRmlsdGVyIHdpdGggYWxsIGltYWdlc1xuICAgICQoXCIub3VyLXdvcmtzX19nYWxsZXJ5X19pbWFnZVwiKS5maWx0ZXIoKGksIGN1cikgPT4ge1xuICAgICAgJChjdXIpLmhhc0NsYXNzKGNsYXNzU2VsZWN0KSA/ICQoY3VyKS5yZW1vdmVDbGFzcyhcIm9wYWNpdHlcIikgOiAkKGN1cikuYWRkQ2xhc3MoXCJvcGFjaXR5XCIpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBTY3JvbGwgZG9jdW1lbnRcbiAgJChkb2N1bWVudCkub24oXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xuICAgIC8vXG4gICAgJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPj0gMTAwMFxuICAgICAgPyAkKFwiI3Njcm9sbFVwXCIpLmFkZENsYXNzKFwiZmFkZUluXCIpXG4gICAgICA6ICQoXCIjc2Nyb2xsVXBcIikucmVtb3ZlQ2xhc3MoXCJmYWRlSW5cIik7XG4gIH0pO1xuXG4gIC8vIFNjcm9sbCB1cCBkb2N1bWVudFxuICAkKFwiI3Njcm9sbFVwXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gICAgICB7XG4gICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgIH0sXG4gICAgICAxMDAwXG4gICAgKTtcbiAgfSk7XG5cbiAgLy8vLy8vLy8vL1xuICAvLyBDaGFuZ2UgbGFuZ1xuXG4gIC8vIDEpIFJlbmRlciBsYW5ndWFnZVxuICBhc3luYyBmdW5jdGlvbiByZW5kZXJMYW5ndWFnZShnZXRMYW5nKSB7XG4gICAgLy8gMikgR2V0IGRhdGFcbiAgICAvLyBjb25zdCBsb2NhbGl6aXRpb24gPSBhd2FpdCAkLmdldChgLi4vbG9jYWxpeml0aW9uLyR7Z2V0TGFuZ30uanNvbmApO1xuICAgIC8vIDMpIENoYW5nZSBsYW5ndWFnZVxuICAgIGlmIChnZXRMYW5nID09PSBcImFyXCIpIHtcbiAgICAgICQoXCJodG1sXCIpLmF0dHIoeyBkaXI6IFwicnRsXCIsIGxhbmc6IFwiYXJcIiB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcImh0bWxcIikuYXR0cih7IGRpcjogXCJsdHJcIiwgbGFuZzogXCJlblwiIH0pO1xuICAgIH1cblxuICAgIC8vIEZvcm1cbiAgICAvLyAkKFwiZm9ybVwiKVxuICAgIC8vICAgLmZpbmQoYFtrZXldYClcbiAgICAvLyAgIC5lYWNoKGZ1bmN0aW9uIChpLCBjdXIpIHtcbiAgICAvLyAgICAgLy9cbiAgICAvLyAgICAgaWYgKCQoY3VyKS5pcyhcImlucHV0LCB0ZXh0YXJlYVwiKSkge1xuICAgIC8vICAgICAgICQoY3VyKS5hdHRyKFxuICAgIC8vICAgICAgICAgXCJwbGFjZWhvbGRlclwiLFxuICAgIC8vICAgICAgICAgbG9jYWxpeml0aW9uLnBhZ2VzWyQodGhpcykuYXR0cihcImtleVwiKV1bXCJmb3JtXCJdWyQodGhpcykuZGF0YShcImxhbmdcIildXG4gICAgLy8gICAgICAgKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICAvL1xuICAgIC8vICAgICBpZiAoJChjdXIpLmlzKFwibGFiZWwsIGJ1dHRvblwiKSkge1xuICAgIC8vICAgICAgICQoY3VyKS50ZXh0KGxvY2FsaXppdGlvbi5wYWdlc1skKHRoaXMpLmF0dHIoXCJrZXlcIildW1wiZm9ybVwiXVskKHRoaXMpLmRhdGEoXCJsYW5nXCIpXSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0pO1xuXG4gICAgLy8gLy8gUGFnZXNcbiAgICAvLyAkKFwiaDEsIGgyLCBoMywgaDQsIGJ1dHRvbiwgcCwgYSwgbGlcIikuZWFjaCgoaSwgY3VyKSA9PiB7XG4gICAgLy8gICBpZiAoJChjdXIpLmlzKGBba2V5XWApKVxuICAgIC8vICAgICAkKGN1cikudGV4dChsb2NhbGl6aXRpb24ucGFnZXNbJChjdXIpLmF0dHIoXCJrZXlcIildWyQoY3VyKS5kYXRhKFwibGFuZ1wiKV0pO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gLy8gTmF2YmFyIGxpbmtzXG4gICAgLy8gJChcIi5uYXZiYXItbmF2IGFcIikuZWFjaCgoaSwgY3VyKSA9PiAkKGN1cikudGV4dChsb2NhbGl6aXRpb24ubmF2YmFyWyQoY3VyKS5hdHRyKFwia2V5XCIpXSkpO1xuICB9XG5cbiAgLy8gMikgV2hlbiBjaGFuZ2UgbGFuZ1xuICAkKFwiLmNoYW5nZV9sYW5nXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyAxKSBHZXQgbmV3IHZhbHVlIGZyb20gc2VsZWN0IGVsZW1lbnRcbiAgICBsZXQgZ2V0TGFuZyA9ICQodGhpcykudmFsKCk7XG5cbiAgICAvLyAyKSBTZXQgbmV3IHZhbHVlIGluIGl0ZW1cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhbmd1YWdlXCIsIGdldExhbmcpO1xuXG4gICAgLy8gMykgUmVsb2FkIHBhZ2VcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSk7XG5cbiAgLy8gQ2hhbmdlIHNlbGVjdCBsYW5nXG4gIGZ1bmN0aW9uIGNoYW5nZVNlbGVjdExhbmcobGFuZykge1xuICAgICQoXCIuY2hhbmdlX2xhbmcgb3B0aW9uXCIpLmVhY2goKGksIGN1cikgPT4ge1xuICAgICAgaWYgKCQoY3VyKS5hdHRyKFwidmFsdWVcIikgPT09IGxhbmcpIHtcbiAgICAgICAgJChjdXIpLmF0dHIoXCJzZWxlY3RlZFwiLCB0cnVlKS5zaWJsaW5ncygpLnJlbW92ZUF0dHIoXCJzZWxlY3RlZFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vXG4gIGNvbnN0IGdldExhbmd1YWdlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYW5ndWFnZVwiKTtcblxuICAvLyBJZiB0aGVyZSBsb2NhbCBzdG9yYWdlIGluIHNpdGUgd2l0aCBuYW1lIGxhbmd1YWdlIHdpbGwgYmUgcmVuZGVyIGxhbmd1YWdlIHNpdGUgd2l0aCBpbiB0aGUgc2FtZSBsYW5ndWFnZSBpZiBub3Qgd2lsbCBiZSByZW5kZXIgbGFuZ3VhZ2Ugc2l0ZSB3aXRoIHNlbGVjdGVkIGxhbmcgZnJvbSBzZWxlY3QgYm94XG4gIGlmIChnZXRMYW5ndWFnZSAhPT0gbnVsbCkge1xuICAgIGNoYW5nZVNlbGVjdExhbmcoZ2V0TGFuZ3VhZ2UpO1xuICAgIHJlbmRlckxhbmd1YWdlKGdldExhbmd1YWdlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBnZXRMYW5nID0gJChcIi5jaGFuZ2VfbGFuZ1wiKS52YWwoKTtcbiAgICByZW5kZXJMYW5ndWFnZShnZXRMYW5nKTtcbiAgICBjaGFuZ2VTZWxlY3RMYW5nKGdldExhbmcpO1xuICB9XG5cbiAgLy8gQ2hhbmdlIGRpciBzbGlkZXJcbiAgJChcIi5zbGljay1zbGlkZXJcIikuYWRkQ2xhc3MoXCJkaXJlY3Rpb24tbHRyXCIpO1xuXG4gIC8vXG4gICQoXCJmb290ZXIgI2RhdGVcIikudGV4dChuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuXG4gIC8vIExhenkgbG9hZGluZyBpbWFnZVxuICAvLyBBbGwgaW1hZ2VzXG4gIGNvbnN0IGFsbEltYWdlcyA9ICQoXCJbZGF0YS1zcmNdXCIpO1xuXG4gIC8vIFByZWxvYWQgaW1hZ2VcbiAgZnVuY3Rpb24gcHJlbG9hZEltYWdlcyhpbWcpIHtcbiAgICBjb25zdCBzcmMgPSAkKGltZykuZGF0YShcInNyY1wiKTtcblxuICAgIGlmICghc3JjKSByZXR1cm47XG5cbiAgICBpbWcuc3JjID0gc3JjO1xuXG4gICAgJChpbWcpLnJlbW92ZUF0dHIoXCJkYXRhLXNyY1wiKTtcbiAgfVxuXG4gIC8vXG4gIGNvbnN0IEltYWdlT2JTZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgKGVudHJpZXMsIEltYWdlT2JTZXJ2ZXIpID0+IHtcbiAgICAgICQoZW50cmllcykuZWFjaCgoaSwgY3VyKSA9PiB7XG4gICAgICAgIGlmICghY3VyLmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgY3VyLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZmFkZU91dFwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy9cbiAgICAgICAgICBwcmVsb2FkSW1hZ2VzKGN1ci50YXJnZXQpO1xuICAgICAgICAgIGN1ci50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImZhZGVPdXRcIik7XG4gICAgICAgICAgY3VyLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZmFkZUluXCIpO1xuICAgICAgICAgIEltYWdlT2JTZXJ2ZXIudW5vYnNlcnZlKGN1ci50YXJnZXQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHtcbiAgICAgIHRocmVzaG9sZDogMCxcbiAgICB9XG4gICk7XG5cbiAgLy9cbiAgYWxsSW1hZ2VzLmVhY2goKGksIGN1cikgPT4gSW1hZ2VPYlNlcnZlci5vYnNlcnZlKGN1cikpO1xuXG4gIGZ1bmN0aW9uIHZhbGlkYXRpb25Gb3JtKCkge1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLy8gVmFsaWRhdGlvbiBmb3JtXG4gICAgLy8gRm9ybVxuICAgIGNvbnN0IGZvcm0gPSAkKFwiI2Zvcm1cIik7XG5cbiAgICAvLyBBbGwgZmlsZWRzIG1lc3NhZ2VcbiAgICBjb25zdCBmaWxlZHNNZXNzYWdlID0ge1xuICAgICAgbWVzc2FnZVBob25lOiAkKFwiI21lc3NhZ2VQaG9uZVwiKSxcbiAgICAgIG1lc3NhZ2VFbWFpbDogJChcIiNtZXNzYWdlRW1haWxcIiksXG4gICAgICBtZXNzYWdlVGV4dEFyZWE6ICQoXCIjbWVzc2FnZVRleHRBcmVhXCIpLFxuICAgICAgbWVzc2FnZUludGVyZXN0ZWQ6ICQoXCIjbWVzc2FnZUludGVyZXN0ZWRcIiksXG4gICAgfTtcblxuICAgIC8vIERhdGEgY2VudGVyIGZvcm1cbiAgICBjb25zdCBkYXRhRm9ybSA9IHtcbiAgICAgIHBob25lOiBudWxsLFxuICAgICAgZW1haWw6IG51bGwsXG4gICAgICBjaG9vc2VJbnRlcnN0ZWQ6IFtdLFxuICAgICAgYWJvdXRQcm9qZWN0OiBudWxsLFxuICAgIH07XG5cbiAgICAvLyBSZWdleHBcbiAgICBjb25zdCByZWdFeHAgPSB7XG4gICAgICBwaG9uZTogL15bXFxkXXs3LDExfSQvLFxuICAgICAgZW1haWw6IC9eKFtBLXpdfFswLTldKXszLH1AW0Etel17Myw3fVsuXXsxfVtBLXpdezIsNH0kL2csXG4gICAgfTtcblxuICAgIC8vIEFsbCBtZXNzYWdlcyBlcnJvcnNcbiAgICBjb25zdCBtZXNzYWdlRXJyb3JzID0ge1xuICAgICAgcGhvbmU6IHtcbiAgICAgICAgZW46IFwid3JpdGUgYmV0d2VlbiA3IGFuZCAxMSBudW1iZXJzIOKdjFwiLFxuICAgICAgICBhcjogXCLinYwg2YrYrNioINin2K/Yrtin2YQg2YXZhiDZpyDYp9mE2Yog2aHZoSDYsdmC2YVcIixcbiAgICAgIH0sXG4gICAgICBlbWFpbDoge1xuICAgICAgICBlbjogYHdyaXRlIGNvcnJlY3QgZW1haWwg4p2MYCxcbiAgICAgICAgYXI6IFwi4p2MINmK2KzYqCDYp9iv2K7Yp9mEINin2YTYp9mK2YXZitmEINio2LTZg9mEINi12K3ZititXCIsXG4gICAgICB9LFxuICAgICAgY2hvb3NlSW50ZXJzdGVkOiB7XG4gICAgICAgIGVuOiBgWW91IG11c3QgY2hvb3NlIHNvbWUgb25lIOKdjGAsXG4gICAgICAgIGFyOiBcIuKdjCDZitis2Kgg2KfYrtiq2YrYp9ixINmI2KfYrdivINi52YTZiiDYp9mE2KfZgtmEXCIsXG4gICAgICB9LFxuICAgICAgYWJvdXRQcm9qZWN0OiB7XG4gICAgICAgIGVuOiBgWW91IG11c3Qgd3JpdGUgbWVzc2FnZSDinYxgLFxuICAgICAgICBhcjogXCLinYwg2YrYrNioINin2K/Yrtin2YQg2LHYs9in2YTYqVwiLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gMSkgR2V0IHZhbHVlIGZyb20gaW5wdXQgcGhvbmUgYW5kIGVtYWlsXG4gICAgJChhbGxJbnB1dC5waG9uZSlcbiAgICAgIC5hZGQoYWxsSW5wdXQuZW1haWwpXG4gICAgICAuYWRkKGFsbElucHV0LnRleHRBcmVhKVxuICAgICAgLm9uKFwiaW5wdXRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAvL1xuICAgICAgICBjb25zdCBnZXRJZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuXG4gICAgICAgIC8vIDEpIENoZWNrIGlmIGdldCBpZCBlcXVhbCA9PiBQSE9ORVxuICAgICAgICBpZiAoZ2V0SWQgPT09IGFsbElucHV0LnBob25lLnJlcGxhY2UoXCIjXCIsIFwiXCIpKSB7XG4gICAgICAgICAgLy8gQ2hlY2sgaWYgdmFsdWUgaW5wdXQgZXF1YWwgcmVndWxhciBleHBlcnNpb25cbiAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKS5tYXRjaChyZWdFeHAucGhvbmUpKSB7XG4gICAgICAgICAgICBkYXRhRm9ybS5waG9uZSA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICByZW5kZXJNZXNzYWdlRXJyb3JVSShcIm1lc3NhZ2VQaG9uZVwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVuZGVyTWVzc2FnZUVycm9yVUkoXCJtZXNzYWdlUGhvbmVcIiwgXCJwaG9uZVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyAyKSBDaGVjayBpZiBnZXQgaWQgZXF1YWwgPT4gRU1BSUxcbiAgICAgICAgaWYgKGdldElkID09PSBhbGxJbnB1dC5lbWFpbC5yZXBsYWNlKFwiI1wiLCBcIlwiKSkge1xuICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpLm1hdGNoKHJlZ0V4cC5lbWFpbCkpIHtcbiAgICAgICAgICAgIGRhdGFGb3JtLmVtYWlsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgcmVuZGVyTWVzc2FnZUVycm9yVUkoXCJtZXNzYWdlRW1haWxcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VFcnJvclVJKFwibWVzc2FnZUVtYWlsXCIsIFwiZW1haWxcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gMykgQ2hlY2sgaWYgZ2V0IGlkIGVxdWFsID0+IFRFWFRBUkVBXG4gICAgICAgIGlmIChnZXRJZCA9PT0gYWxsSW5wdXQudGV4dEFyZWEucmVwbGFjZShcIiNcIiwgXCJcIikpIHtcbiAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSkge1xuICAgICAgICAgICAgZGF0YUZvcm0uYWJvdXRQcm9qZWN0ID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VFcnJvclVJKFwibWVzc2FnZVRleHRBcmVhXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW5kZXJNZXNzYWdlRXJyb3JVSShcIm1lc3NhZ2VUZXh0QXJlYVwiLCBcImFib3V0UHJvamVjdFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgLy8gMikgQ2hvb3NlIGludGVyZXN0ZWQgcHJvamVjdFxuICAgIGFsbElucHV0LnNlbGVjdFByb2plY3Qub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAxKSBUb2dnbGUgY2xhc3Mgd2hlbiBzZWxlY3QgaW50ZXJzdGVkIHByb2plY3RcbiAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAvLyAyKSBDaGVjayBpZiBuYW1lIHByb2plY3QgZXhzaXN0IGluIGFycmF5IG9yIG5vdFxuICAgICAgYWxsSW5wdXQuc2VsZWN0UHJvamVjdC5lYWNoKGZ1bmN0aW9uIChpLCBjdXIpIHtcbiAgICAgICAgY29uc3QgbmFtZVByb2plY3QgPSAkKGN1cikuZGF0YShcInByb2plY3RcIik7XG4gICAgICAgIC8vXG4gICAgICAgIGlmICgkKGN1cikuaGFzQ2xhc3MoXCJhY3RpdmVcIikgJiYgIWRhdGFGb3JtLmNob29zZUludGVyc3RlZC5pbmNsdWRlcyhuYW1lUHJvamVjdCkpIHtcbiAgICAgICAgICBkYXRhRm9ybS5jaG9vc2VJbnRlcnN0ZWQucHVzaChuYW1lUHJvamVjdCk7XG4gICAgICAgIH0gZWxzZSBpZiAoISQoY3VyKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAgIGRhdGFGb3JtLmNob29zZUludGVyc3RlZC5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gMykgUmVuZGVyIG1lc3NhZ2UgZXJyb3IgdWlcbiAgICBmdW5jdGlvbiByZW5kZXJNZXNzYWdlRXJyb3JVSSh0eXBlLCBuYW1lS2V5ID0gXCJcIikge1xuICAgICAgY29uc3QgbGFuZyA9ICQoXCJodG1sXCIpLmF0dHIoXCJsYW5nXCIpO1xuICAgICAgLy9cbiAgICAgIG5hbWVLZXkgPT0gXCJcIlxuICAgICAgICA/IGZpbGVkc01lc3NhZ2VbdHlwZV0udGV4dChcIlwiKVxuICAgICAgICA6IGZpbGVkc01lc3NhZ2VbdHlwZV0udGV4dChtZXNzYWdlRXJyb3JzW25hbWVLZXldW2xhbmddKTtcbiAgICB9XG5cbiAgICAvLyA0KSBFdmVudCBzdWJtaXQgb24gZm9ybVxuICAgIGZvcm0ub24oXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgIC8vIDEpIERpc2FibGUgYmVob3ZlciBzdWJtaXRcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gMikgSWYgYWxsIGRhdGEgcmVxdWlyZWQgZXhzaXN0IHdpbGwgYmUgc2VuZCBkYXRhIHRvIGFwaVxuICAgICAgaWYgKGRhdGFGb3JtLnBob25lICYmIGRhdGFGb3JtLmNob29zZUludGVyc3RlZC5sZW5ndGggPiAwICYmIGRhdGFGb3JtLmFib3V0UHJvamVjdCkge1xuICAgICAgICAvLyAxKSB0byBhcGlcbiAgICAgICAgY29uc29sZS5sb2coZGF0YUZvcm0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YUZvcm0uY2hvb3NlSW50ZXJzdGVkLmxlbmd0aCA8PSAwXG4gICAgICAgICAgPyByZW5kZXJNZXNzYWdlRXJyb3JVSShcIm1lc3NhZ2VJbnRlcmVzdGVkXCIsIFwiY2hvb3NlSW50ZXJzdGVkXCIpXG4gICAgICAgICAgOiByZW5kZXJNZXNzYWdlRXJyb3JVSShcIm1lc3NhZ2VJbnRlcmVzdGVkXCIpO1xuICAgICAgICAkKGFsbElucHV0LnBob25lKS5hZGQoYWxsSW5wdXQudGV4dEFyZWEpLnRyaWdnZXIoXCJpbnB1dFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvLyBDYWxsIGZuIHZhbGlkYXRpb25Gb3JtXG4gIHZhbGlkYXRpb25Gb3JtKCk7XG59KTtcbiJdfQ==
