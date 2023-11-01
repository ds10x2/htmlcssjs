const pickBtn=document.getElementById("pick-btn");
const fileInput = document.getElementById("file");
const image = document.getElementById("image");
const hexInput = document.getElementById("hex-input");
const rgbInput = document.getElementById("rgb-input");
const pickedColor = document.getElementById("picked-color");


const initEyeDropper = () =>{
    if("EyeDropper" in window){
        pickBtn.classList.remove("hide");
        const eyeDropper = new EyeDropper();
        
        //색 선택 이벤트 리스너
        pickBtn.addEventListener("click", async ()=>{
            try{
                const colorValue = await eyeDropper.open();
                const hexValue = colorValue.sRGBHex.toLowerCase();
                const rgbValue = hexToRgb(hexValue);
                result.style.display = "grid";
                hexInput.value = hexValue;
                rgbInput.value = rgbValue;
                pickedColor.style.backgroundColor = hexValue;
            }catch{
                alert("Your browser doesn't support Eyedropper Api!");
            }
        });
    }else{
        alert("Your browser doesn't support Eyedropper Api!");
    }
};


//파일 인풋 이벤트 리스너
fileInput.addEventListener("change", ()=>{
    result.style.display = "none";
    const reader = new FileReader();
    reader.onload = () => image.setAttribute("src", reader.result);
    reader.readAsDataURL(fileInput.files[0]);
});

//텍스트 복사 함수
const copyToClipboard = (textId) =>{
    const textElement = document.getElementById(textId);
    textElement.selected();
    document.execCommand("copy");
};

//RGB
const hexToRgb = (hex) =>{
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5),16);
    const b = parseInt(hex.slic(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

window.onload = initEyeDropper;
