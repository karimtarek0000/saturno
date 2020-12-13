$(function () {
  // Header slider
  $(".header__slider").slick({
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
});
