const selectTextInput = document.getElementById("inputAsText");
const selectfileInput = document.getElementById("inputAsFile");
const generateEncriptionKey = document.getElementById("getRandomKeyButton");

selectTextInput.addEventListener("change", ()=>{toggleInputType()});
selectfileInput.addEventListener("change", ()=>{toggleInputType()});
generateEncriptionKey.addEventListener("click", (e)=>{generateAkey(e)});

function toggleInputType(){
    let textInput = document.getElementById("textInput");
    let fileInput = document.getElementById("fileInput");
    textInput.classList.toggle("inputContent");
    textInput.classList.toggle("hidden");
    fileInput.classList.toggle("inputContent");
    fileInput.classList.toggle("hidden");
}

function generateAkey(e){
    e.preventDefault();
}
