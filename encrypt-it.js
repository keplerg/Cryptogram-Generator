(function() {
  "use strict";

  String.prototype.shuffle = function () {
    let a = this.split(""), n = a.length;
    const orig = [...a];
    let check = false;

    while (! check) {
      for(let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
      }
      // make sure no letters remain unmoved.
      check = true;
      for(let i = 0; i < n; i++) {
        if (a[i] == orig[i]) {
          check = false;
          break;
        }
      }
    }
    return a.join("");
  }

  function truncateText(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  }

  function copyResult() {
    const inputField = document.getElementById('result');
    const textToCopy = inputField.innerText;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Text copied to clipboard: ' + truncateText(textToCopy,40));
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text. Please try again.');
      });
  }

  function handleChange() {
    // console.log("Select changed!");
    let cipherType = document.getElementById("cipher-type").value;
    document.getElementById("offset-label").style.display = "none";
    document.getElementById("ascii-label").style.display = "none";
    switch (cipherType) {
    case "shift":
      document.getElementById("offset-label").style.display = "inline-block";
      break;
    case "morse":
      document.getElementById("ascii-label").style.display = "inline-block";
      break;
    case "cryptogram":
      break;
    default:
    }
  }

  function handleClick() {
    // console.log("Button clicked!");
    let myText = document.getElementById("input-text").value;
    let offset = document.getElementById("offset").value;
    let ascii = document.getElementById("ascii").checked;
    let cipherType = document.getElementById("cipher-type").value;
    switch (cipherType) {
    case "shift":
      myText = shiftCipher(myText, offset);
      break;
    case "morse":
      myText = morse(myText);
      if (ascii) {
        myText = myText.replaceAll('−','-').replaceAll('·','.');
      }
      break;
    case "cryptogram":
      myText = cryptogram(myText);
      break;
    default:
      myText = randomizeCipher(myText);
    }
    applyTextStyles(myText);
  }

  function resetForm() {
    document.getElementById("input-text").value = '';
    document.getElementById("result").innerHTML = '';
    // Reset any styles or selections if necessary
  }

  function shiftCipher(text, offset=1) {
    text = text.toLowerCase();
    offset = parseInt(offset) % 26;
    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] < 'a' || text[i] > 'z') {
        result += text[i];
      } else {
        let letter = text.charCodeAt(i) + offset;
        let new_letter = String.fromCharCode(letter);
        if (new_letter > 'z') {
            letter = text.charCodeAt(i) + offset - 26;
        } else if (new_letter < 'a') {
            letter = text.charCodeAt(i) + offset + 26;
        }
        result += String.fromCharCode(letter);
      }
    }
    return result;
  }

  function cryptogram(text) {
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let key = "abcdefghijklmnopqrstuvwxyz".shuffle();
    // console.log(key.toUpperCase());
    // console.log(letters.toUpperCase());
    let result = "";
    text = text.toLowerCase();
    for (let i = 0; i < text.length; i++) {
      if (text[i] < 'a' || text[i] > 'z') {
        result += text[i];
      } else {
        let offset = letters.indexOf(text[i]);
        let letter = key.charAt(offset);
        result += letter;
      }
    }
    return result;
  }

  function morse(text) {
    let letters = 'abcdefghijklmnopqrstuvwxyz0123456789.,?/-_"\'';
    let code = ["·−", "−···", "−·−·", "−··", "·", "··−·", "−−·", "····", "··", "·−−−", "−·−", "·−··", "−−", "−·", "−−−", "·−−·", "−−·−", "·−·", "···", "−", "··−", "···−", "·−−", "−··−", "−·−−", "−−··", "−−−−−", "·−−−−", "··−−−", "···−−", "····−", "·····", "−····", "−−···", "−−−··", "−−−−·", "·−·−·−", "−−··−−", "··−−··", "−··−·", "−····−", "··−−·−", "·−−−−·", "·−··−·"];
    let result = "";
    text = text.toLowerCase();
    for (let i = 0; i < text.length; i++) {
      let index = letters.indexOf(text[i]);
      if (index >= 0) {
        result += code[index];
      } else {
        result += text[i];
      }
      result += ' ';
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
 
  function init() {
    console.log("Window loaded!"); // Confirms that the JS file is correctly linked and executed
    document.getElementById("cipher-type").addEventListener("change", handleChange);
    document.getElementById("encrypt-it").addEventListener("click", handleClick);
    document.getElementById("reset").addEventListener("click", resetForm);
    document.getElementById("result").addEventListener("click", copyResult);
  }

  window.addEventListener("load", init);

})();

