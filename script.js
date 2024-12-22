const slider = document.querySelector(".slider");
const list = document.querySelector(".list");
const thumbnail = document.querySelector(".thumbnail");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

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
  }, 2000); // Sesuaikan dengan durasi animasi Anda

  // Reset autoplay
  clearInterval(runAutoPlay);
  runAutoPlay = setInterval(() => {
    next.click();
  }, 8000);
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
