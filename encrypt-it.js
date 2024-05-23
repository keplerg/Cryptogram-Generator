(function() {
  "use strict";

  window.addEventListener("load", init);

  function init() {
    console.log("Window loaded!"); // Confirms that the JS file is correctly linked and executed
    document.getElementById("encrypt-it").addEventListener("click", handleClick);
    document.getElementById("reset").addEventListener("click", resetForm);
  }

  function handleClick() {
    console.log("Button clicked!"); // Logs to the console when the "Encrypt-It!" button is clicked
    let myText = document.getElementById("input-text").value;
    let cipherType = document.getElementById("cipher-type").value;
    if (cipherType === "shift") {
      myText = shiftCipher(myText);
    } else {
      // Assuming a function exists for the randomized cipher or implement it similarly.
      myText = randomizeCipher(myText);
    }
    applyTextStyles(myText);
  }

  function resetForm() {
    document.getElementById("input-text").value = '';
    document.getElementById("result").innerHTML = '';
    // Reset any styles or selections if necessary
  }

  function shiftCipher(text) {
    text = text.toLowerCase();
    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] < 'a' || text[i] > 'z') {
        result += text[i];
      } else if (text[i] == 'z') {
        result += 'a';
      } else {
        let letter = text.charCodeAt(i);
        result += String.fromCharCode(letter + 1);
      }
    }
    return result;
  }

  function applyTextStyles(text) {
    const isAllCaps = document.getElementById("all-caps").checked;
    const fontSize = document.querySelector('input[name="text-size"]:checked').value;
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = isAllCaps ? text.toUpperCase() : text;
    resultElement.style.fontSize = fontSize;
  }

  function randomizeCipher(text) {
    // This is a placeholder for a randomizing cipher function.
    return text.split('').sort(() => 0.5 - Math.random()).join('');
  }

})();

