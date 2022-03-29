var passwordLength = 8;
var lowerCase = {
	chars: "abcdefghijklmnopqrstuvwxyz",
	wasSelected: false
};
var upperCase = {
	chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	wasSelected: false
};
var numeric = {
	chars: "0123456789",
	wasSelected: false
};
var specialCharacter = {
	chars: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
	wasSelected: false
};
var passwordCharacters = "";

var chosenCharacters = function () {
	if (lowerCase.wasSelected) {
		passwordCharacters += lowerCase.chars;
	};
	if (upperCase.wasSelected) {
		passwordCharacters += upperCase.chars;
	};
	if (numeric.wasSelected) {
		passwordCharacters += numeric.chars;
	};
	if (specialCharacter.wasSelected) {
		passwordCharacters += specialCharacter.chars;
	};
	console.log(passwordCharacters);
};

chosenCharacters();


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
	var password = generatePassword();
	var passwordText = document.querySelector("#password");

	passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);