$(function () {
  //// Navbar
  $(".nav-link").on("click", function () {
    // 1) Remove class show when click link
    $(this).parentsUntil("navbar-collapse").removeClass("show");
    // 2) Get name id section
    const getIdSection = $(this).data("section");
    // 3) Got to section
    $("html, body").scrollTop($(`#${getIdSection}`).offset().top);
  });

  //
  const getDirPage = $("html").attr("dir");
  const statusDir = getDirPage === "ltr" ? false : true;

  // Header slider
  $(".header__slider").slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    rtl: statusDir,
    prevArrow: `<svg class='a-left control-c prev slick-prev'>
    <use xlink:href="../icons/sprite.svg#icon-Angle-Left">
    </svg>`,
    nextArrow: `<svg class='a-right control-c next slick-next'>
    <use xlink:href="../icons/sprite.svg#icon-Angle-Right">
    </svg>`,
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
    // Each for all sections
    $("body section").each(function () {
      // 1) Get id section
      const idSection = $(this).attr("id");
      // 2) Check if scroll top greather than or equal this section
      if ($(document).scrollTop() >= $(this).offset().top) {
        // 3) Finaly filter on all nav link and check if this section data section equal sectiom above scroll top
        $(".nav-link").filter(function () {
          $(this).data("section") == idSection
            ? $(this).addClass("active-link")
            : $(this).removeClass("active-link");
        });
      }
    });
  });
});
