const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector("#qrData"),
qrBgColor = wrapper.querySelector("#qrBgColor"),
qrColor = wrapper.querySelector("#qrColor"),
generateBtn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");
let preValue;
let preBgColor;
let preColor;

IMask(
  qrBgColor,
  {
    mask: 'num-num-num',
    blocks: {
      num: {
        // nested masks are available!
        mask: Number,
        min: 0,
        max: 255
      }
    }
  }
)

IMask(
  qrColor,
  {
    mask: 'num-num-num',
    blocks: {
      num: {
        // nested masks are available!
        mask: Number,
        min: 0,
        max: 255
      }
    }
  }
)

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  let bgColor = qrBgColor.value || "255-255-255";
  let color = qrColor.value || "0-0-0";
  if(!qrValue || (preValue === qrValue && preBgColor === bgColor && preColor === color)) return;
  preValue = qrValue;
  preBgColor = bgColor;
  preColor = color;
  generateBtn.innerText = "Generating QR Code...";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=svg&color=${color}&bgcolor=${bgColor}&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
  });
});

qrInput.addEventListener("keyup", () => {
  if(!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
  }
});
