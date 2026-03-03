function toggleInputType(){
    let textInput = document.getElementById("textInput");
    let textArea = document.getElementById("inputTextArea");
    let fileInput = document.getElementById("fileInput");

    textInput.classList.toggle("inputContent");
    textInput.classList.toggle("hidden");
    textArea.value = "";
    fileInput.classList.toggle("inputContent");
    fileInput.classList.toggle("hidden");
}
