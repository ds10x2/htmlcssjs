const preview = document.getElementById("preview");
const styles = document.getElementById("styles");
const ranges = document.querySelectorAll(".settings input");
const copyButton = document.getElementById("copy-styles");

//각각의 인풋 범위에 대해 이벤트 리스너 추가하기
ranges.forEach((slider)=>{
    slider.addEventListener("input", generateStyles);
});

// 스타일 생성 및 업데이트 함수
function generateStyles(){
    const xShadow=document.getElementById("x-shadow").value;
    const yShadow = document.getElementById("y-shadow").value;
    const blurRadius = document.getElementById("blur-r").value;
    const spreadRadius = document.getElementById("spread-r").value;
    const shadowColor = document.getElementById("shadow-color").value;
    const shadowOpacity = document.getElementById("shadow-opacity").value;
    const shadowInset = document.getElementById("inset-shadow").checked;
    const borderRadius = document.getElementById("border-r").value;

    //박스 그림자 css 프로퍼티 값을 생성
    const boxShadow = `${shadowInset ? "inset" : ""} ${xShadow}px ${yShadow}px ${blurRadius}px 
                        ${spreadRadius}px ${hexToRgba(shadowColor, shadowOpacity)}`;

    //프리뷰 업데이트
    preview.style.boxShadow = boxShadow;
    preview.style.borderRadius = `${borderRadius}px`;

    //생성된 스타일 텍스트로 업데이트
    styles.textContent = `box-shadow: ${boxShadow};\nborder-radius: ${borderRadius}px;`;
}

//헥스 코드와 투명도를 rgba로 변환
function hexToRgba(shadowColor, shadowOpacity){
    const r = parseInt(shadowColor.substr(1, 2), 16);
    const g = parseInt(shadowColor.substr(3, 2), 16);
    const b = parseInt(shadowColor.substr(5, 2), 16);

    return `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
}

//생성한 스타일 복사
function copyStyles(){
    styles.select();
    document.execCommand("copy");
    copyButton.innerText = "Copied!";
    setTimeout(()=>{
        copyButton.innerText = "Copy Styles";
    }, 500);
}
generateStyles();