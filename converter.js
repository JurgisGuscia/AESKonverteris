const conversionData = {}
const textInput = document.getElementById("inputTextArea");
const keyInput = document.getElementById("keyInput");

async function excecute(e){
    const inputType = document.querySelector('input[name="inputTypeSelection"]:checked').value;
    e.preventDefault();
    if(checkInputs(inputType)){
        await collectData();
        console.log(conversionData);
        if(conversionData.input){
            if(conversionData.operation === "scramble"){
                encode();
            }else{
                decode();
            }
        }
    };
}

function inputEmpty(str){
    return str.trim() === "";
}

function resetField(field){
    field.value = "";
    field.focus();
}

function checkInputs(inputType){
    if(inputEmpty(textInput.value) && inputType === "text"){
        resetField(textInput);
        return false;
    }
    if(inputEmpty(keyInput.value)){
        resetField(keyInput);
        return false;
    }
    return true;
}

async function collectData(){
    conversionData.inputType = document.querySelector('input[name="inputTypeSelection"]:checked').value;

    if(conversionData.inputType === "text"){ 
        conversionData.input = textInput.value;
    }else{
        conversionData.input = await readFileData();
    }
    conversionData.mode = document.querySelector('input[name="cipherTypeSelection"]:checked').value;
    conversionData.keyComplexity = document.querySelector('input[name="keyComplexitySelection"]:checked').value;
    conversionData.key = keyInput.value;
    conversionData.operation = document.querySelector('input[name="operationModeSelection"]:checked').value;
}

function validateFile(file) {
  if (!file) return false;
  if (!file.name.toLowerCase().endsWith(".txt")) return false;
  if (file.size === 0) return false;
  return true;
}

async function validateContent(file) {
    const text = await file.text();
    if (typeof text === "string" && text.trim().length > 0){
        return text;
    }else{
        return null;
    }
}

async function readFileData(){
    const inputFile = document.getElementById("textInputFile");
    const file = inputFile.files && inputFile.files[0];
    if(!validateFile(file)) return false;
    const content = await validateContent(file);
    if(content === null) return false;
    return content;
}

function encode(){
    console.log("encoding");
}
function decode(){
    console.log("decoding");
}

