const article = document.querySelector(".article");
const images = document.querySelectorAll("img");

function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function transformImage(e) {
  images.forEach(image => {
    /* half through the image */
    const slideInAt = window.innerHeight + window.scrollY - image.height / 2;

    /* bottom of the image */
    const imageBottom = image.offsetTop + image.height;

    const isHalfShown = slideInAt > image.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      image.classList.add("scroll");
    } else {
      image.classList.remove("scroll");
    }
  });
}

window.addEventListener("scroll", debounce(transformImage));
