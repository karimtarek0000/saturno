jQuery(function () {
  //// Navbar
  $(".nav-link").on("click", function () {
    // 1) Remove class show when click link
    $(this).parentsUntil("navbar-collapse").removeClass("show");
  });

  //
  let getDirPage = $("html").attr("dir");

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
  $(".change_lang").on("change", function () {
    // 1) Get lang when change lang
    const getLang = $(this).val().replace("#", "");
    // 2)
    if (getLang === "ar") {
      $("html").attr({ dir: "rtl", lang: "ar" });
    } else {
      $("html").attr({ dir: "ltr", lang: "en" });
    }
    //
    $(".slick-slider").addClass("direction-ltr");
  });

  //
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
});
