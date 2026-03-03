const conversionData = {}
const textInput = document.getElementById("inputTextArea");
const keyInput = document.getElementById("keyInput");

async function execute(e){
    const inputType = document.querySelector('input[name="inputTypeSelection"]:checked').value;
    e.preventDefault();
    let encodedText;
    if(checkInputs(inputType)){
        await collectData();
        console.log(conversionData);
        if(conversionData.input){
            if(conversionData.operation === "scramble"){
                encodedText = encode();
            }else{
                encodedText = decode();
            }
        }
    };
    downloadOutput(encodedText);
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

function downloadOutput(content) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "output.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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

function deriveKey(userInputKey, keyBits) {
    let normalizedKey;
    keyBits === "key128" && (normalizedKey = 128);
    keyBits === "key192" && (normalizedKey = 192);
    keyBits === "key256" && (normalizedKey = 256);
    const salt = CryptoJS.enc.Utf8.parse("fixedSalt");
    const key = CryptoJS.PBKDF2(userInputKey, salt, {
        keySize: normalizedKey / 32,   
        iterations: 10000
    });
    return key; 
}

function encodeEcb(key){
    const encrypted = CryptoJS.AES.encrypt(conversionData.input, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString(); 
}

function encodeCbc(key) {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(conversionData.input, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return `${CryptoJS.enc.Base64.stringify(iv)}:${encrypted.toString()}`;
}

function encodeCfb(key) {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(conversionData.input, key, {
    iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7
  });
  return `${CryptoJS.enc.Base64.stringify(iv)}:${encrypted.toString()}`;
}

function encode(){
    const derivedKey = deriveKey(conversionData.key, conversionData.keyComplexity);
    let encryptedText;
    conversionData.mode === "ecb" && (encryptedText = encodeEcb(derivedKey));
    conversionData.mode === "cbc" && (encryptedText = encodeCbc(derivedKey));
    conversionData.mode === "cfb" && (encryptedText = encodeCfb(derivedKey));
    return encryptedText;
}
function decode(){
    console.log("decoding");
}

