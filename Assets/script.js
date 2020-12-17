// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


var getPasswordLength = 0;

var isUppercase;
var isLowercase;
var isSpecialchar;
var isNumeric;

var checkerType = {
  uppercase: "",
  lowercase: "",
  specialchar: "",
  number: ""
};

var specialChars = ["\u0020", "\u0021", "\u0022", "\u0023", "\u0024", "\u0025",
  "\u0026", "\u0027", "\u0028", "\u0029", "\u002A", "\u002B", "\u002C", "\u002D", "\u002E", "\u002F",
  "\u003A", "\u003B", "\u003C", "\u003D", "\u003E", "\u003F", "\u0040", "\u005B", "\u005C", "\u005D",
  "\u005E", "\u005F", "\u0060", "\u007B", "\u007C", "\u007D", "\u007E"];

function getUppercaseChars() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getLowercaseChars() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getNumericValue() {
  return Math.floor(Math.random() * 10);
}

function getSpecialChars() {
  return Math.floor(Math.random() * 33);
}

function validation(validationParameter, validationType) {
  if (validationType === "numberValidation") {
    if ((validationParameter < 8 || validationParameter > 128) || isNaN(validationParameter)) {
      alert("Please enter valid number, length range, at least 8 or maximum to 128 ");
      return true;
    } else {
      return false;
    }
  } else if (validationType === "selectionValidation") {
    if (validationParameter.uppercase === "uppercase" ||
      validationParameter.lowercase === "lowercase" || validationParameter.specialchar === "specialchar"
      || validationParameter.number === "numeric") {
      return false;
    } else {
      alert("Remember, Please select any one type.");
      return true;
    }
  }
}

function generatePassword() {
  var validateInput = true; //used for validating user input
  while (validateInput) {
    getPasswordLength = prompt("Enter your desire password length in number , it must be at least 8 or maximum 128",
      "number inputs only");
    validateInput = validation(parseInt(getPasswordLength), "numberValidation");
  }
  var validateSelect = true;
  while (validateSelect) {
    isUppercase = confirm("Do you want to add uppercase in password?");
    if (isUppercase) {
      checkerType.uppercase = "uppercase";
    }
    isLowercase = confirm("Do you want to add Lowercase in password?");
    if (isLowercase) {
      checkerType.lowercase = "lowercase";
    }
    isSpecialchar = confirm("Do you want to add any special charaters in password?");
    if (isSpecialchar) {
      checkerType.specialchar = "specialchar";
    }
    isNumeric = confirm("Do you want to include any number?");
    if (isNumeric) {
      checkerType.number = "numeric";
    }
    validateSelect = validation(checkerType, "selectionValidation");
  }
  console.log(checkerType);
  return generator(checkerType);
}
