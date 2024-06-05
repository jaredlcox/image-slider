function updateSlider(value) {
  const afterDiv = document.querySelector(".comparison-slider .after");
  const slider = document.querySelector(".comparison-slider .slider");
  afterDiv.style.width = `${100 - value}%`;
  slider.style.left = `${value}%`;
}

const rangeInput = document.querySelector(
  '.comparison-slider input[type="range"]'
);
rangeInput.addEventListener("input", (event) =>
  updateSlider(event.target.value)
);

const slider = document.querySelector(".comparison-slider .slider");
let isDragging = false;
let startX = 0;
let startLeft = 0;

slider.addEventListener("mousedown", (event) => {
  if (event.target === slider) {
    isDragging = true;
    startX = event.clientX;
    startLeft = parseInt(getComputedStyle(slider).left, 10);
  }
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const offsetX = event.clientX - startX;
    const newLeft = startLeft + offsetX;
    const rangeWidth = slider.offsetWidth;
    const value = (newLeft / rangeWidth) * 100;

    if (value >= 0 && value <= 100) {
      updateSlider(value);
      rangeInput.value = value;
    }
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
