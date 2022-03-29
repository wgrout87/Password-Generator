// Variable for password length. Changes based on user input.
var passwordLength = 8;

// BEGIN OBJECTS REPRESENTING PASSWORD CHARACTER OPTIONS
var lowerCase = {
	// String contains all possible options for lower case letters
	chars: "abcdefghijklmnopqrstuvwxyz",
	// Boolean value is changed to true if the user selects lower case letter in their password
	wasSelected: true,
	// The position value is given a value in the chosenCharacters() function and referenced for password generation
	position: null
};
var upperCase = {
	chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	// Boolean value is changed to true if the user selects upper case letter in their password
	wasSelected: true,
	// The position value is given a value in the chosenCharacters() function and referenced for password generation
	position: null
};
var numeric = {
	chars: "0123456789",
	// Boolean value is changed to true if the user selects numeric values in their password
	wasSelected: true,
	// The position value is given a value in the chosenCharacters() function and referenced for password generation
	position: null
};
var specialCharacter = {
	chars: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
	// Boolean value is changed to true if the user selects special characters in their password
	wasSelected: true,
	// The position value is given a value in the chosenCharacters() function and referenced for password generation
	position: null
};
// END OBJECTS REPRESENTING PASSWORD CHARACTER OPTIONS

// An empty string that will be added to in order to provide the available characters for password generation
var passwordCharacters = "";
// An empty array that will have 4 random values pushed into it. These values will be referenced in the generatePassword() function to insure that at least one of each selected character type is present in the generated password.
var positionArray = [];

// This function fills the positionArray with four unique values
var randomPositon = function () {
	while (positionArray.length < 4) {
		// A random number is generated
		var possiblePosition = Math.floor(Math.random() * passwordLength);
		// The new number possiblePostion is checked against the existing array and only added in if it is not already present
		if (positionArray.indexOf(possiblePosition) === -1) {
			positionArray.push(possiblePosition);
		}
	}
	console.log(positionArray);
};

// This function builds up the passwordCharacters string with additional character options and sets the position for any of the character option objects so they can be definitively included in the generated password
var chosenCharacters = function () {
	// randomPosition() is called to fill the array
	randomPositon();
	// BEGIN CHECKING FOR OPTIONS SELECTED
	if (lowerCase.wasSelected) {
		// Lower case characters are added to the passwordCharacters string
		passwordCharacters += lowerCase.chars;
		// The position is set in the lowerCase object
		lowerCase.position = positionArray[0];
		console.log(lowerCase.position);
	};
	if (upperCase.wasSelected) {
		// Upper case are added to the passwordCharacters string
		passwordCharacters += upperCase.chars;
		// The position is set in the upperCase object
		upperCase.position = positionArray[1];
		console.log(upperCase.position);
	};
	if (numeric.wasSelected) {
		// numerical values are added to the passwordCharacters string
		passwordCharacters += numeric.chars;
		// The position is set in the numeric object
		numeric.position = positionArray[2];
		console.log(numeric.position);
	};
	if (specialCharacter.wasSelected) {
		// Special characters are added to the passwordCharacters string
		passwordCharacters += specialCharacter.chars;
		// The position is set in the specialCharacters object
		specialCharacter.position = positionArray[3];
		console.log(specialCharacter.position);
	};
	// END CHECKING FOR OPTIONS SELECTED
	console.log(passwordCharacters);
};

// This function generates the new password, making sure to include at least one of each selected character type
var generatePassword = function() {
	// chosenCharacters() is called to establish what characters will go into the password and where
	chosenCharacters();
	// A local variable is set to an empty string. This will become the new password
	var newPassword = "";
		
	// This for loop will generate random characters for the password, placing any specified character options in randomly selected locations within the new string to ensure that every chosen character type is used at least once
	for (var i = 0; i < passwordLength; i++) {
		// For each character option that was chosen, a position was assigned by the chosenCharacter() function. These if statements will ensure that a character of the specified type will be placed into that position when it matches the value of i. If no specific character is specified, any option available from the passwordCharacters string will be used
		if (i === lowerCase.position && lowerCase.wasSelected) {
			newPassword += lowerCase.chars.charAt(Math.floor(Math.random() * lowerCase.chars.length));
		} else if (i === upperCase.position && upperCase.wasSelected) {
			newPassword += upperCase.chars.charAt(Math.floor(Math.random() * upperCase.chars.length));
		} else if (i === numeric.position && numeric.wasSelected) {
			newPassword += numeric.chars.charAt(Math.floor(Math.random() * numeric.chars.length));
		} else if (i === specialCharacter.position && specialCharacter.wasSelected) {
			newPassword += specialCharacter.chars.charAt(Math.floor(Math.random() * specialCharacter.chars.length));
		} else {
		newPassword += passwordCharacters.charAt(Math.floor(Math.random() * passwordCharacters.length));
		}
	}

	// Resets values for next password generation
	valuesReset();

	// When called, the new password is returned to the function caller
	return newPassword;
};

// This function resets the values that were altered by the user's choices
var valuesReset = function () {
	passwordLength = 8;
	lowerCase.wasSelected = false;
	lowerCase.position = null;
	upperCase.wasSelected = false;
	upperCase.position = null;
	numeric.wasSelected = false;
	numeric.position = null;
	specialCharacter.wasSelected = false;
	specialCharacter.position = null;
	passwordCharacters = "";
	positionArray = [];
	console.log(passwordCharacters);
	console.log(positionArray);
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword () {
	var password = generatePassword();
	var passwordText = document.querySelector("#password");

	passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);