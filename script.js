const slider = document.querySelector(".slider");
const list = document.querySelector(".list");
const thumbnail = document.querySelector(".thumbnail");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const pagination = document.querySelector(".pagination");
const dots = document.querySelectorAll(".dot");

// Autoplay slider menggunakan setInterval untuk konsistensi
let runAutoPlay = setInterval(() => {
  next.click();
}, 8000);

// Menambahkan debounce untuk mencegah klik ganda
let isAnimating = false;

next.addEventListener("click", () => {
  if (!isAnimating) {
    isAnimating = true;
    initSlider("next");
  }
});

prev.addEventListener("click", () => {
  if (!isAnimating) {
    isAnimating = true;
    initSlider("prev");
  }
});

// Navigasi melalui dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (isAnimating || index === getCurrentIndex()) return;
    isAnimating = true;
    navigateToSlide(index);
  });
});

const getCurrentIndex = () => {
  const currentSlide = list.querySelector(".item");
  return Array.from(list.children).indexOf(currentSlide);
};

const navigateToSlide = (targetIndex) => {
  const currentIndex = getCurrentIndex();
  const totalSlides = list.children.length;
  let direction = "next";

  if (targetIndex < currentIndex) {
    direction = "prev";
  }

  while (currentIndex !== targetIndex) {
    initSlider(direction);
  }
};

const initSlider = (type) => {
  const sliderItems = list.querySelectorAll(".item");
  const thumbnailItems = thumbnail.querySelectorAll(".item");

  if (type === "next") {
    list.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnailItems[0]);
    slider.classList.add("next");
  } else {
    const lastItemPosition = sliderItems.length - 1;
    list.prepend(sliderItems[lastItemPosition]);
    thumbnail.prepend(thumbnailItems[lastItemPosition]);
    slider.classList.add("prev");
  }

  setTimeout(() => {
    slider.classList.remove("next");
    slider.classList.remove("prev");
    isAnimating = false;
    updateActiveDot();
  }, 2000); // Sesuaikan dengan durasi animasi Anda

  // Reset autoplay
  clearInterval(runAutoPlay);
  runAutoPlay = setInterval(() => {
    next.click();
  }, 8000);
};

const updateActiveDot = () => {
  const currentIndex = getCurrentIndex();
  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add("active");
  }
};

// Menambahkan fitur pause autoplay saat hover
slider.addEventListener("mouseenter", () => {
  clearInterval(runAutoPlay);
});

slider.addEventListener("mouseleave", () => {
  runAutoPlay = setInterval(() => {
    next.click();
  }, 8000);
});

// Implementasikan swipe gestures untuk mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  false
);

slider.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  },
  false
);

function handleGesture() {
  if (touchEndX < touchStartX - 50) {
    next.click();
  }
  if (touchEndX > touchStartX + 50) {
    prev.click();
  }
}
