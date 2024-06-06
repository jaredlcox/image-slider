const slider = document.querySelector("#image-comparison-slider");
const sliderImgWrapper = document.querySelector("#image-comparison-slider .img-wrapper");
const sliderHandle = document.querySelector("#image-comparison-slider .handle");

function sliderMouseMove(event) {
  if (!isSliderLocked) return;

  const sliderLeftX = slider.offsetLeft;
  const sliderWidth = slider.clientWidth;
  const sliderHandleWidth = sliderHandle.clientWidth;

  let mouseX = (event.clientX || event.touches[0].clientX) - sliderLeftX;
  if (mouseX < 0) mouseX = 0;
  else if (mouseX > sliderWidth) mouseX = sliderWidth;

  sliderImgWrapper.style.width = `${((1 - mouseX / sliderWidth) * 100).toFixed(4)}%`;
  sliderHandle.style.left = `calc(${((mouseX / sliderWidth) * 100).toFixed(4)}% - ${sliderHandleWidth / 2}px)`;
}

let isSliderLocked = false;

sliderHandle.addEventListener("mousedown", sliderMouseDown);
sliderHandle.addEventListener("touchstart", sliderMouseDown);
document.addEventListener("mouseup", sliderMouseUp);
document.addEventListener("touchend", sliderMouseUp);

function sliderMouseDown(event) {
  isSliderLocked = true;
  document.addEventListener("mousemove", sliderMouseMove);
  document.addEventListener("touchmove", sliderMouseMove);
}

function sliderMouseUp() {
  isSliderLocked = false;
  document.removeEventListener("mousemove", sliderMouseMove);
  document.removeEventListener("touchmove", sliderMouseMove);
}