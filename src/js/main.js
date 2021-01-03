jQuery(function () {
  //// Navbar
  $(".nav-link").on("click", function () {
    // 1) Remove class show when click link
    $(this).parentsUntil("navbar-collapse").removeClass("show");
  });

  // All input
  const allInput = {
    phone: "#phone",
    email: "#email",
    textArea: "#textArea",
    selectProject: $(".form-select"),
    labelOne: $("#labelOne"),
    labelTwo: $("#labelTwo"),
    submitForm: $(".submitForm"),
  };

  // Header slider
  $(".header__slider, .testimonial").slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: `<svg class='a-left control-c prev slick-prev'>
    <use xlink:href="../icons/sprite.svg#icon-Angle-Left">
    </svg>`,
    nextArrow: `<svg class='a-right control-c next slick-next'>
    <use xlink:href="../icons/sprite.svg#icon-Angle-Right">
    </svg>`,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
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
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
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
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  });

  // Section gallery
  $(".our-works__btn-gallery .btn").on("click", function () {
    // 1) Get id when click the button
    const classSelect = $(this).data("select");
    // 2) Add class active on select button then remove class active from all siblings
    $(this).addClass("active").siblings().removeClass("active");
    // 3) Filter with all images
    $(".our-works__gallery__image").filter((i, cur) => {
      $(cur).hasClass(classSelect) ? $(cur).removeClass("opacity") : $(cur).addClass("opacity");
    });
  });

  // Scroll document
  $(document).on("scroll", function () {
    //
    $(document).scrollTop() >= 1000
      ? $("#scrollUp").addClass("fadeIn")
      : $("#scrollUp").removeClass("fadeIn");
  });

  // Scroll up document
  $("#scrollUp").on("click", () => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  //////////
  // Change lang

  // 1) Render language
  async function renderLanguage(getLang) {
    // 2) Get data
    const localizition = await $.get(`../localizition/${getLang}.json`);
    // 3) Change language
    if (getLang === "ar") {
      $("html").attr({ dir: "rtl", lang: "ar" });
    } else {
      $("html").attr({ dir: "ltr", lang: "en" });
    }

    // Form
    $("form")
      .find(`[key]`)
      .each(function (i, cur) {
        //
        if ($(cur).is("input, textarea")) {
          $(cur).attr(
            "placeholder",
            localizition.pages[$(this).attr("key")]["form"][$(this).data("lang")]
          );
        }
        //
        if ($(cur).is("label, button")) {
          $(cur).text(localizition.pages[$(this).attr("key")]["form"][$(this).data("lang")]);
        }
      });

    // Navbar links
    $(".navbar-nav a").each((i, cur) => $(cur).text(localizition.navbar[$(cur).attr("key")]));
  }

  // 2) When change lang
  $(".change_lang").on("change", function () {
    // 1) Get new value from select element
    let getLang = $(this).val();

    // 2) Set new value in item
    localStorage.setItem("language", getLang);

    // 3) Reload page
    location.reload();
  });

  // Change select lang
  function changeSelectLang(lang) {
    $(".change_lang option").each((i, cur) => {
      if ($(cur).attr("value") === lang) {
        $(cur).attr("selected", true).siblings().removeAttr("selected");
      }
    });
  }

  //
  const getLanguage = localStorage.getItem("language");

  // If there local storage in site with name language will be render language site with in the same language if not will be render language site with selected lang from select box
  if (getLanguage !== null) {
    changeSelectLang(getLanguage);
    renderLanguage(getLanguage);
  } else {
    const getLang = $(".change_lang").val();
    renderLanguage(getLang);
    changeSelectLang(getLang);
  }

  // Change dir slider
  $(".slick-slider").addClass("direction-ltr");

  //
  $("footer #date").text(new Date().getFullYear());

  // Lazy loading image
  // All images
  const allImages = $("[data-src]");

  // Preload image
  function preloadImages(img) {
    const src = $(img).data("src");

    if (!src) return;

    img.src = src;

    $(img).removeAttr("data-src");
  }

  //
  const ImageObServer = new IntersectionObserver(
    (entries, ImageObServer) => {
      $(entries).each((i, cur) => {
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
    },
    {
      threshold: 0,
    }
  );

  //
  allImages.each((i, cur) => ImageObServer.observe(cur));

  function validationForm() {
    ////////////////////////////////////
    //// Validation form
    // Form
    const form = $("#form");

    // All fileds message
    const filedsMessage = {
      messagePhone: $("#messagePhone"),
      messageEmail: $("#messageEmail"),
      messageTextArea: $("#messageTextArea"),
      messageInterested: $("#messageInterested"),
    };

    // Data center form
    const dataForm = {
      phone: null,
      email: null,
      chooseIntersted: [],
      aboutProject: null,
    };

    // Regexp
    const regExp = {
      phone: /^[\d]{7,11}$/,
      email: /^([A-z]|[0-9]){3,}@[A-z]{3,7}[.]{1}[A-z]{2,4}$/g,
    };

    // All messages errors
    const messageErrors = {
      phone: {
        en: "write between 7 and 11 numbers ❌",
        ar: "❌ يجب ادخال من ٧ الي ١١ رقم",
      },
      email: {
        en: `write correct email ❌`,
        ar: "❌ يجب ادخال الايميل بشكل صحيح",
      },
      chooseIntersted: {
        en: `You must choose some one ❌`,
        ar: "❌ يجب اختيار واحد علي الاقل",
      },
      aboutProject: {
        en: `You must write message ❌`,
        ar: "❌ يجب ادخال رسالة",
      },
    };

    // 1) Get value from input phone and email
    $(allInput.phone)
      .add(allInput.email)
      .add(allInput.textArea)
      .on("input", function () {
        //
        const getId = $(this).attr("id");

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
        const nameProject = $(cur).data("project");
        //
        if ($(cur).hasClass("active") && !dataForm.chooseIntersted.includes(nameProject)) {
          dataForm.chooseIntersted.push(nameProject);
        } else if (!$(cur).hasClass("active")) {
          dataForm.chooseIntersted.splice(i, 1);
        }
      });
    });

    // 3) Render message error ui
    function renderMessageErrorUI(type, nameKey = "") {
      const lang = $("html").attr("lang");
      //
      nameKey == ""
        ? filedsMessage[type].text("")
        : filedsMessage[type].text(messageErrors[nameKey][lang]);
    }

    // 4) Event submit on form
    form.on("submit", (e) => {
      // 1) Disable behover submit
      e.preventDefault();

      // 2) If all data required exsist will be send data to api
      if (dataForm.phone && dataForm.chooseIntersted.length > 0 && dataForm.aboutProject) {
        // 1) to api
        console.log(dataForm);
      } else {
        dataForm.chooseIntersted.length <= 0
          ? renderMessageErrorUI("messageInterested", "chooseIntersted")
          : renderMessageErrorUI("messageInterested");
        $(allInput.phone).add(allInput.textArea).trigger("input");
      }
    });
  }
  // Call fn validationForm
  validationForm();
});
