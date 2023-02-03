let reduce = document.getElementById("button-reduce")
let enlarge = document.getElementById("button-enlarge")
let scaleInput = document.getElementById("scale-input")

reduce.addEventListener("click", e => {
    if (pdfDoc != null) {
        scale = scale - 0.1;
        renderPage(1);
        scaleInput.value = scale.toFixed(1)
    }
})

enlarge.addEventListener("click", e => {
    if (pdfDoc != null) {
        scale = scale + 0.1;
        renderPage(1);
        scaleInput.value = scale.toFixed(1)
    }
})

