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


/**
 * Implementation of password logic begins here
 */

// int type of variable to store input password length 
var getPasswordLength = 0;

// variable used for user confirmation 
var isUppercase;
var isLowercase;
var isSpecialchar;
var isNumeric;

// object initialise for checking of each type user selected
var checkerType = {
  uppercase: "",
  lowercase: "",
  specialchar: "",
  number: ""
};

//hex unicode of special characters initialised in array
//unicode reference from https://www.owasp.org/index.php/Password_special_characters
var specialChars = ["\u0020", "\u0021", "\u0022", "\u0023", "\u0024", "\u0025",
  "\u0026", "\u0027", "\u0028", "\u0029", "\u002A", "\u002B", "\u002C", "\u002D", "\u002E", "\u002F",
  "\u003A", "\u003B", "\u003C", "\u003D", "\u003E", "\u003F", "\u0040", "\u005B", "\u005C", "\u005D",
  "\u005E", "\u005F", "\u0060", "\u007B", "\u007C", "\u007D", "\u007E"];

// gets Uppercase letter from random unicode
function getUppercaseChars() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// gets lowercase letter from random unicode
function getLowercaseChars() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// gets random number from 0 to 9
function getNumericValue() {
  return Math.floor(Math.random() * 10);
}

//gets random number to generate random special character from specialChars
function getSpecialChars() {
  return Math.floor(Math.random() * 33);
}

// validation of user input character length and character selection type
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

// Control function including user input with validation and generates the random password
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
  return generator(checkerType);
}

// core function of generating the password
function generator(checkerTypeArgs) {
  var newPassword = "";
  var checkerArray = [];
  //appending the selected type of characters by user into checkerArray
  for (var i = 0; i < Object.values(checkerTypeArgs).length; i++) {
    if (Object.values(checkerTypeArgs)[i] != "")
      checkerArray.push(Object.values(checkerTypeArgs)[i]);
  }
  // variable for storing random value of type of characters such as numeric or uppercase or etc.
  var randomValue;
  for (var j = 0; j < parseInt(getPasswordLength); j++) {
    randomValue = checkerArray[Math.floor(Math.random() * checkerArray.length)]; // gets the random character type
    if (randomValue === "numeric") {
      newPassword = newPassword + getNumericValue();
    } else if (randomValue === "specialchar") {
      newPassword = newPassword + specialChars[getSpecialChars()]; // gets the random special character from special chars array
    } else if (randomValue === "lowercase") {
      newPassword = newPassword + getLowercaseChars();
    } else if (randomValue === "uppercase") {
      newPassword = newPassword + getUppercaseChars();
    }
  }
  checkerType = {}; //clearing the object previous values
  return newPassword;
}
