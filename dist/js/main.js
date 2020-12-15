"use strict";

$(function () {
  //// Navbar
  $(".nav-link").on("click", function () {
    // 1) Remove class show when click link
    $(this).parentsUntil("navbar-collapse").removeClass("show");
    // 2) Get name id section
    var getIdSection = $(this).data("section");
    // 3) Got to section
    $("html, body").scrollTop($("#" + getIdSection).offset().top);
  });

  //
  var getDirPage = $("html").attr("dir");
  var statusDir = getDirPage === "ltr" ? false : true;

  // Header slider
  $(".header__slider").slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    rtl: statusDir,
    prevArrow: "<svg class='a-left control-c prev slick-prev'>\n    <use xlink:href=\"../icons/sprite.svg#icon-Angle-Left\">\n    </svg>",
    nextArrow: "<svg class='a-right control-c next slick-next'>\n    <use xlink:href=\"../icons/sprite.svg#icon-Angle-Right\">\n    </svg>"
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
        // 3) Finaly filter on all nav link and check if this section data section equal sectiom above scroll top
        $(".nav-link").filter(function () {
          $(this).data("section") == idSection ? $(this).addClass("active-link") : $(this).removeClass("active-link");
        });
      }
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsIm9uIiwicGFyZW50c1VudGlsIiwicmVtb3ZlQ2xhc3MiLCJnZXRJZFNlY3Rpb24iLCJkYXRhIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwiZ2V0RGlyUGFnZSIsImF0dHIiLCJzdGF0dXNEaXIiLCJzbGljayIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJhcnJvd3MiLCJydGwiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJjbGFzc1NlbGVjdCIsImFkZENsYXNzIiwic2libGluZ3MiLCJmaWx0ZXIiLCJpIiwiY3VyIiwiaGFzQ2xhc3MiLCJkb2N1bWVudCIsImVhY2giLCJpZFNlY3Rpb24iXSwibWFwcGluZ3MiOiI7O0FBQUFBLEVBQUUsWUFBWTtBQUNaO0FBQ0FBLElBQUUsV0FBRixFQUFlQyxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFlBQVk7QUFDckM7QUFDQUQsTUFBRSxJQUFGLEVBQVFFLFlBQVIsQ0FBcUIsaUJBQXJCLEVBQXdDQyxXQUF4QyxDQUFvRCxNQUFwRDtBQUNBO0FBQ0EsUUFBTUMsZUFBZUosRUFBRSxJQUFGLEVBQVFLLElBQVIsQ0FBYSxTQUFiLENBQXJCO0FBQ0E7QUFDQUwsTUFBRSxZQUFGLEVBQWdCTSxTQUFoQixDQUEwQk4sUUFBTUksWUFBTixFQUFzQkcsTUFBdEIsR0FBK0JDLEdBQXpEO0FBQ0QsR0FQRDs7QUFTQTtBQUNBLE1BQU1DLGFBQWFULEVBQUUsTUFBRixFQUFVVSxJQUFWLENBQWUsS0FBZixDQUFuQjtBQUNBLE1BQU1DLFlBQVlGLGVBQWUsS0FBZixHQUF1QixLQUF2QixHQUErQixJQUFqRDs7QUFFQTtBQUNBVCxJQUFFLGlCQUFGLEVBQXFCWSxLQUFyQixDQUEyQjtBQUN6QkMsY0FBVSxLQURlO0FBRXpCQyxrQkFBYyxDQUZXO0FBR3pCQyxvQkFBZ0IsQ0FIUztBQUl6QkMsY0FBVSxJQUplO0FBS3pCQyxtQkFBZSxJQUxVO0FBTXpCQyxZQUFRLElBTmlCO0FBT3pCQyxTQUFLUixTQVBvQjtBQVF6QlMseUlBUnlCO0FBV3pCQztBQVh5QixHQUEzQjs7QUFnQkE7QUFDQXJCLElBQUUsOEJBQUYsRUFBa0NDLEVBQWxDLENBQXFDLE9BQXJDLEVBQThDLFlBQVk7QUFDeEQ7QUFDQSxRQUFNcUIsY0FBY3RCLEVBQUUsSUFBRixFQUFRSyxJQUFSLENBQWEsUUFBYixDQUFwQjtBQUNBO0FBQ0FMLE1BQUUsSUFBRixFQUFRdUIsUUFBUixDQUFpQixRQUFqQixFQUEyQkMsUUFBM0IsR0FBc0NyQixXQUF0QyxDQUFrRCxRQUFsRDtBQUNBO0FBQ0FILE1BQUUsNEJBQUYsRUFBZ0N5QixNQUFoQyxDQUF1QyxVQUFDQyxDQUFELEVBQUlDLEdBQUosRUFBWTtBQUNqRDNCLFFBQUUyQixHQUFGLEVBQU9DLFFBQVAsQ0FBZ0JOLFdBQWhCLElBQStCdEIsRUFBRTJCLEdBQUYsRUFBT3hCLFdBQVAsQ0FBbUIsU0FBbkIsQ0FBL0IsR0FBK0RILEVBQUUyQixHQUFGLEVBQU9KLFFBQVAsQ0FBZ0IsU0FBaEIsQ0FBL0Q7QUFDRCxLQUZEO0FBR0QsR0FURDs7QUFXQTtBQUNBdkIsSUFBRTZCLFFBQUYsRUFBWTVCLEVBQVosQ0FBZSxRQUFmLEVBQXlCLFlBQVk7QUFDbkM7QUFDQUQsTUFBRSxjQUFGLEVBQWtCOEIsSUFBbEIsQ0FBdUIsWUFBWTtBQUNqQztBQUNBLFVBQU1DLFlBQVkvQixFQUFFLElBQUYsRUFBUVUsSUFBUixDQUFhLElBQWIsQ0FBbEI7QUFDQTtBQUNBLFVBQUlWLEVBQUU2QixRQUFGLEVBQVl2QixTQUFaLE1BQTJCTixFQUFFLElBQUYsRUFBUU8sTUFBUixHQUFpQkMsR0FBaEQsRUFBcUQ7QUFDbkQ7QUFDQVIsVUFBRSxXQUFGLEVBQWV5QixNQUFmLENBQXNCLFlBQVk7QUFDaEN6QixZQUFFLElBQUYsRUFBUUssSUFBUixDQUFhLFNBQWIsS0FBMkIwQixTQUEzQixHQUNJL0IsRUFBRSxJQUFGLEVBQVF1QixRQUFSLENBQWlCLGFBQWpCLENBREosR0FFSXZCLEVBQUUsSUFBRixFQUFRRyxXQUFSLENBQW9CLGFBQXBCLENBRko7QUFHRCxTQUpEO0FBS0Q7QUFDRixLQVpEO0FBYUQsR0FmRDtBQWdCRCxDQTdERCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XG4gIC8vLy8gTmF2YmFyXG4gICQoXCIubmF2LWxpbmtcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gMSkgUmVtb3ZlIGNsYXNzIHNob3cgd2hlbiBjbGljayBsaW5rXG4gICAgJCh0aGlzKS5wYXJlbnRzVW50aWwoXCJuYXZiYXItY29sbGFwc2VcIikucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgIC8vIDIpIEdldCBuYW1lIGlkIHNlY3Rpb25cbiAgICBjb25zdCBnZXRJZFNlY3Rpb24gPSAkKHRoaXMpLmRhdGEoXCJzZWN0aW9uXCIpO1xuICAgIC8vIDMpIEdvdCB0byBzZWN0aW9uXG4gICAgJChcImh0bWwsIGJvZHlcIikuc2Nyb2xsVG9wKCQoYCMke2dldElkU2VjdGlvbn1gKS5vZmZzZXQoKS50b3ApO1xuICB9KTtcblxuICAvL1xuICBjb25zdCBnZXREaXJQYWdlID0gJChcImh0bWxcIikuYXR0cihcImRpclwiKTtcbiAgY29uc3Qgc3RhdHVzRGlyID0gZ2V0RGlyUGFnZSA9PT0gXCJsdHJcIiA/IGZhbHNlIDogdHJ1ZTtcblxuICAvLyBIZWFkZXIgc2xpZGVyXG4gICQoXCIuaGVhZGVyX19zbGlkZXJcIikuc2xpY2soe1xuICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgYXV0b3BsYXk6IHRydWUsXG4gICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICBhcnJvd3M6IHRydWUsXG4gICAgcnRsOiBzdGF0dXNEaXIsXG4gICAgcHJldkFycm93OiBgPHN2ZyBjbGFzcz0nYS1sZWZ0IGNvbnRyb2wtYyBwcmV2IHNsaWNrLXByZXYnPlxuICAgIDx1c2UgeGxpbms6aHJlZj1cIi4uL2ljb25zL3Nwcml0ZS5zdmcjaWNvbi1BbmdsZS1MZWZ0XCI+XG4gICAgPC9zdmc+YCxcbiAgICBuZXh0QXJyb3c6IGA8c3ZnIGNsYXNzPSdhLXJpZ2h0IGNvbnRyb2wtYyBuZXh0IHNsaWNrLW5leHQnPlxuICAgIDx1c2UgeGxpbms6aHJlZj1cIi4uL2ljb25zL3Nwcml0ZS5zdmcjaWNvbi1BbmdsZS1SaWdodFwiPlxuICAgIDwvc3ZnPmAsXG4gIH0pO1xuXG4gIC8vIFNlY3Rpb24gZ2FsbGVyeVxuICAkKFwiLm91ci13b3Jrc19fYnRuLWdhbGxlcnkgLmJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyAxKSBHZXQgaWQgd2hlbiBjbGljayB0aGUgYnV0dG9uXG4gICAgY29uc3QgY2xhc3NTZWxlY3QgPSAkKHRoaXMpLmRhdGEoXCJzZWxlY3RcIik7XG4gICAgLy8gMikgQWRkIGNsYXNzIGFjdGl2ZSBvbiBzZWxlY3QgYnV0dG9uIHRoZW4gcmVtb3ZlIGNsYXNzIGFjdGl2ZSBmcm9tIGFsbCBzaWJsaW5nc1xuICAgICQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAvLyAzKSBGaWx0ZXIgd2l0aCBhbGwgaW1hZ2VzXG4gICAgJChcIi5vdXItd29ya3NfX2dhbGxlcnlfX2ltYWdlXCIpLmZpbHRlcigoaSwgY3VyKSA9PiB7XG4gICAgICAkKGN1cikuaGFzQ2xhc3MoY2xhc3NTZWxlY3QpID8gJChjdXIpLnJlbW92ZUNsYXNzKFwib3BhY2l0eVwiKSA6ICQoY3VyKS5hZGRDbGFzcyhcIm9wYWNpdHlcIik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFNjcm9sbCBkb2N1bWVudFxuICAkKGRvY3VtZW50KS5vbihcInNjcm9sbFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gRWFjaCBmb3IgYWxsIHNlY3Rpb25zXG4gICAgJChcImJvZHkgc2VjdGlvblwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIDEpIEdldCBpZCBzZWN0aW9uXG4gICAgICBjb25zdCBpZFNlY3Rpb24gPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcbiAgICAgIC8vIDIpIENoZWNrIGlmIHNjcm9sbCB0b3AgZ3JlYXRoZXIgdGhhbiBvciBlcXVhbCB0aGlzIHNlY3Rpb25cbiAgICAgIGlmICgkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSA+PSAkKHRoaXMpLm9mZnNldCgpLnRvcCkge1xuICAgICAgICAvLyAzKSBGaW5hbHkgZmlsdGVyIG9uIGFsbCBuYXYgbGluayBhbmQgY2hlY2sgaWYgdGhpcyBzZWN0aW9uIGRhdGEgc2VjdGlvbiBlcXVhbCBzZWN0aW9tIGFib3ZlIHNjcm9sbCB0b3BcbiAgICAgICAgJChcIi5uYXYtbGlua1wiKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykuZGF0YShcInNlY3Rpb25cIikgPT0gaWRTZWN0aW9uXG4gICAgICAgICAgICA/ICQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmUtbGlua1wiKVxuICAgICAgICAgICAgOiAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLWxpbmtcIik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19
