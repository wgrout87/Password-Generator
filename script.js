var passwordLength = 8;
var lowerCase = {
	chars: "abcdefghijklmnopqrstuvwxyz",
	wasSelected: true,
	position: null
};
var upperCase = {
	chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	wasSelected: true,
	position: null
};
var numeric = {
	chars: "0123456789",
	wasSelected: true,
	position: null
};
var specialCharacter = {
	chars: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
	wasSelected: true,
	position: null
};
var passwordCharacters = "";
var positionArray = [];

var chosenCharacters = function () {
	randomPositon();
	if (lowerCase.wasSelected) {
		passwordCharacters += lowerCase.chars;
		lowerCase.position = positionArray[0];
		console.log(lowerCase.position);
	};
	if (upperCase.wasSelected) {
		passwordCharacters += upperCase.chars;
		upperCase.position = positionArray[1];
		console.log(upperCase.position);
	};
	if (numeric.wasSelected) {
		passwordCharacters += numeric.chars;
		numeric.position = positionArray[2];
		console.log(numeric.position);
	};
	if (specialCharacter.wasSelected) {
		passwordCharacters += specialCharacter.chars;
		specialCharacter.position = positionArray[3];
		console.log(specialCharacter.position);
	};
	console.log(passwordCharacters);
};

var randomPositon = function () {
	while (positionArray.length < 4) {
		var possiblePosition = Math.floor(Math.random() * passwordLength);
		if (positionArray.indexOf(possiblePosition) === -1) {
			positionArray.push(possiblePosition);
		}
	}
	console.log(positionArray);
};

var generatePassword = function() {
	chosenCharacters();

};


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