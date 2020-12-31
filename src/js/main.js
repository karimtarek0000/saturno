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

  // Change direction page
  const localizition = {
    navbar: {
      en: {
        home: "home",
        aboutus: "about us",
        services: "services",
        works: "works",
        price: "price",
        blog: "blog",
        contacts: "contacts",
      },
      ar: {
        home: "الرئيسية",
        aboutus: "ماذا عنا",
        services: "الخدمات",
        works: "الآعمال",
        price: "الاسعار",
        blog: "مقالات",
        contacts: "التواصل",
      },
    },
    form: {
      en: {
        phone: "*Phone number",
        email: "E-mail address",
        textArea: "*Tell us about the project",
        labelOne: `fill out the form and we'll be in touch soon!`,
        labelTwo: "what are you interested in?",
        submit: "send an application",
      },
      ar: {
        phone: "*ادخل التليفون",
        email: "ادخل الآيميل",
        textArea: "*اخبرنا معلومات عن المشروع",
        labelOne: "قم بملئ النموذج وسنتواصل معك قريبآ",
        labelTwo: "ما هو اهتمامك؟",
        submit: "ارسل الابلكيشن",
      },
    },
    pages: {
      home: {
        en: {
          "head2-1": "who are we",
          "head2-2": "why choose us",
          "head3-2": "our works",
          "head3-1": "ark",
          "head4-1": "experiance",
          "head4-2": "professional",
          "head4-3": "high quality",
          "head4-4": "speed",
          "head4-5": "lowe cost",
          "par-1":
            "the company works on the most effective job organizing principles. saturno employees are qualified service specialists, creative and technical designers, programmers, content editors and publicists. Responsibilities are professionally divided between specialists.",
          "par-2":
            "digital score offers customers 12 years of experience and knowledge about how to sell more, providing fast and high quality project management",
          "par-3": "12 year sof experience On the market",
          "par-4":
            "our system of tasks distribution allows us to offer quick solutions that are necessary for your business.",
          "par-5":
            "the most qualified specialists will be working with You to ensure high quality on each stage Of project.",
          "par-6":
            "you don’t have to wait until someone will be free from another project. tasks can be done much faster!.",
          "par-7": "you don’t have To sign long-Term contracts. we offer flexible payment terms.",
          "par-8":
            "check out our featured projects, a quick showcase on work in progress and our previous work timeline.",
          "btn-1": "about us",
          "btn-2": "all works",
          "btn-3": "sites",
          "btn-4": "logos",
          "btn-5": "others",
        },
        ar: {
          "head2-1": "من نحن",
          "head2-2": "لماذا تختارنآ",
          "head3-1": "آرك",
          "head3-2": "آعمالنا",
          "head4-1": "الخبرات",
          "head4-2": "الآحترافية",
          "head4-3": "اعلي جودة",
          "head4-4": "السرعة",
          "head4-5": "آقل تكلفة",
          "par-1":
            "تعمل الشركة علي اكثر مبادئ تنظيم العمل فاعلية، موظفين ark هم متخصصون مؤهلين لتنفيذ الخدمات ، مصممون مبدعون وتقنيون ومبرمجين ومحرري محتوي ودعاية، يتم تقسيم المسؤوليات مهنيآ بين المتخصصين.",
          "par-2":
            "تقديم افضل المهام الرقمية للعملاء، ١٢ عامآ من الخبرة و المعرفة و المزيد ، وتوفير ادارة مشاريع سريعة و عالية الجودة",
          "par-3": "خبرة ١٢ سنه في السوق",
          "par-4": "نظام توزيع المهام لدينا يتيح حلول سريعة لعملك.",
          "par-5":
            "سيعمل معك أكثر المتخصصين المؤهلين لضمان الجودة العالية في كل مرحلة من مراحل المشروع.",
          "par-6": "ليس عليك الانتظار حتي ينتهي شخص ما من عمل اخر، سوف يتم انهاء عملك سريعآ",
          "par-7": "لست ملزمًا بتوقيع عقود طويلة الأجل. نحن نقدم شروط دفع مرنة.",
          "par-8":
            "تحقق من مشاريعنا المميزة ، وعرض سريع للعمل الجاري والجدول الزمني السابق لعملنا.",
          "btn-1": "ماذا عنآ",
          "btn-2": "كل الآعمال",
          "btn-3": "المواقع",
          "btn-4": "اللوجهات",
          "btn-5": "آخري",
        },
      },
      aboutus: {
        en: {
          head: "about us",
        },
        ar: {
          head: "ماذا عنا",
        },
      },
      services: {
        en: {
          head: "services",
        },
        ar: {
          head: "الخدمات",
        },
      },
      works: {
        en: {
          head: "works",
        },
        ar: {
          head: "الآعمال",
        },
      },
      price: {
        en: {
          head: "price",
        },
        ar: {
          head: "الاسعار",
        },
      },
      blog: {
        en: {
          head: "blog",
        },
        ar: {
          head: "المقالات",
        },
      },
      contacts: {
        en: {
          head: "contacts",
          "head2-1": "how we can help?",
          "head2-2": "ready to request a quote?",
          "head3-1": "let’s work together!",
          "par-1":
            "we like to talk and on the strength of that you are invited for a coffee at our head office",
          "par-2":
            "Hosary Square - Royal Towers Mall in front of Tabarak Hospital - fourth floor - Office 301",
          "par-3":
            "we would love to work with you to cook up your next idea take the first step by choosing a project type and filing in the form we look forward to hearing from you.",
          clock: "every day 09:00 : 18:00",
          phone: "+7 495 999 00 99",
        },
        ar: {
          head: "تواصل معنا",
          "head2-1": "كيف نقوم بمساعدتك؟",
          "head2-2": "هل انت مستعد؟راسلنا الآن",
          "head3-1": "فلنبدآ العمل معـــآ!",
          "par-1": "نحب ان نتحدث معك وبسبب ذلك فآنت مدعو علي قهوة في مكتبنا الرئيسي",
          "par-2": ` ميدان الحصري - مول رويال تاورز امام مستشفي تبارك - الدور الرابع - مكتب ٣٠١`,
          "par-3":
            "نود أن نعمل معك لإعداد فكرتك التي تريدها، اتخذ الخطوة الأولى باختيار نوع المشروع وملئ  النموذج وارسالة الينآ.",
          clock: "كل يوم من ٠٩:٠٠ - ١٨:٠٠",
          phone: "٩٩ ٠٠ ٩٩٩ ٥٩٤ ٧+",
        },
      },
    },
  };
  $(".change_lang").on("change", function () {
    // 1) Get lang when change lang
    const getLang = $(this).val().replace("#", "");
    // 2)
    if (getLang === "ar") {
      $("html").attr({ dir: "rtl", lang: "ar" });
    } else {
      $("html").attr({ dir: "ltr", lang: "en" });
    }
    // Change dir slider
    $(".slick-slider").addClass("direction-ltr");

    // Change Placeholder form
    // Form
    $("form")
      .find(`[key]`)
      .each(function (i, cur) {
        //
        if ($(cur).is("input, textarea")) {
          $(cur).attr("placeholder", localizition.form[getLang][$(this).attr("key")]);
        }
        //
        if ($(cur).is("label, button")) {
          $(cur).text(localizition.form[getLang][$(this).attr("key")]);
        }
      });

    // Heading
    $("h1, h2, h3, h4, button, p, a").each((i, cur) => {
      if ($(cur).is(`[key]`))
        $(cur).text(localizition.pages[$(cur).attr("key")][getLang][$(cur).data("lang")]);
    });

    // Navbar links
    $(".navbar-nav a").each((i, cur) =>
      $(cur).text(localizition.navbar[getLang][$(cur).attr("key")])
    );
  });

  //
  $(".change_lang").trigger("change");

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
    email: /^([A-z]|[0-9]){3,}@[A-z]{3,7}.{1}[A-z]{2,4}$/g,
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
        if (regExp.phone.test($(this).val())) {
          dataForm.phone = +$(this).val();
          renderMessageErrorUI("messagePhone");
        } else {
          renderMessageErrorUI("messagePhone", "phone");
        }
      }

      // 2) Check if get id equal => EMAIL
      if (getId === allInput.email.replace("#", "")) {
        if (regExp.email.test($(this).val())) {
          dataForm.email = $(this).val().toLowerCase();
          renderMessageErrorUI("messageEmail");
        } else if (!regExp.email.test($(this).val())) {
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
});
