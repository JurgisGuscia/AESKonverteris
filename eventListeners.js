const selectTextInput = document.getElementById("inputAsText");
const selectfileInput = document.getElementById("inputAsFile");
const executeButton = document.getElementById("executeButton");

selectTextInput.addEventListener("change", ()=>{toggleInputType()});
selectfileInput.addEventListener("change", ()=>{toggleInputType()});
executeButton.addEventListener("click", (e)=>{excecute(e)});


