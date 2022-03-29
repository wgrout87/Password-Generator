// Variable for password length. Changes based on user input.
var passwordLength = 8;

// BEGIN OBJECTS REPRESENTING PASSWORD CHARACTER OPTIONS
var lowerCase = {
	// String contains all possible options for lower case letters
	chars: "abcdefghijklmnopqrstuvwxyz",
	// Boolean value is changed to true if the user selects lower case letter in their password
	wasSelected: false,
	// The position value is given a value in the chosenCharacters() function and referenced for password generation
	position: null
};

var upperCase = {
	chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	// Boolean value is changed to true if the user selects upper case letter in their password
	wasSelected: false,
	// The position value is given a value in the chosenCharacters() function and referenced for password generation
	position: null
};

var numeric = {
	chars: "0123456789",
	// Boolean value is changed to true if the user selects numeric values in their password
	wasSelected: false,
	// The position value is given a value in the chosenCharacters() function and referenced for password generation
	position: null
};

var specialCharacter = {
	chars: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
	// Boolean value is changed to true if the user selects special characters in their password
	wasSelected: false,
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
	};
	if (upperCase.wasSelected) {
		// Upper case are added to the passwordCharacters string
		passwordCharacters += upperCase.chars;
		// The position is set in the upperCase object
		upperCase.position = positionArray[1];
	};
	if (numeric.wasSelected) {
		// numerical values are added to the passwordCharacters string
		passwordCharacters += numeric.chars;
		// The position is set in the numeric object
		numeric.position = positionArray[2];
	};
	if (specialCharacter.wasSelected) {
		// Special characters are added to the passwordCharacters string
		passwordCharacters += specialCharacter.chars;
		// The position is set in the specialCharacters object
		specialCharacter.position = positionArray[3];
	};
	// END CHECKING FOR OPTIONS SELECTED
};

// This function generates the new password, making sure to include at least one of each selected character type
var generatePassword = function() {
	// BEGIN CALL TO RUN USER PROMPTS
	// Length is prompted and checked
	lengthPrompt();

	// Character option prompts are called and checked
	characterOptionPrompts();

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
	console.log(newPassword.length);

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
};

// This function will prompt the user for password length
var lengthPrompt = function () {
	console.log("the user is being prompted for length");
	var chosenLength = window.prompt("Please choose the length of your password from 8 to 128 characters.");
	// User input is parsed to an integer value
	chosenLength = parseInt(chosenLength);
	// User input is validated
	if (chosenLength >= 8 && chosenLength <= 128) {
		passwordLength = chosenLength;
	}
	// Invalid input alerts the user and calls for the prompt again
	else {
		window.alert("Please choose a length by entering a whole number value from 8 to 128.");
		lengthPrompt();
	}
	console.log(passwordLength);
};

// BEGIN CHARACTER SET OPTION PROMPT FUNCTIONS
// This function will ask the user if they would like to include lower case characters
var lowerCaseConfirm = function () {
	console.log("the user is being prompted for the use of lower case");
	// useLowerCase is set to the boolean value returned by the user input
	var useLowerCase = window.confirm("Would you like to include lowercase in your new password?\nSelect \"OK\" to include lowercase, or \"Cancel\" to exclude lowercase.");
	// The lowerCase object's wasSelected property is updated
	lowerCase.wasSelected = useLowerCase;
	console.log(lowerCase.wasSelected);
};

// This function will ask the user if they would like to include upper case characters
var upperCaseConfirm = function () {
	console.log("the user is being prompted for the use of upper case");
	// useUpperCase is set to the boolean value returned by the user input
	var useUpperCase = window.confirm("Would you like to include uppercase in your new password?\nSelect \"OK\" to include uppercase, or \"Cancel\" to exclude uppercase.");
	// The upperCase object's wasSelected property is updated
	upperCase.wasSelected = useUpperCase;
	console.log(upperCase.wasSelected);
};

// This function will ask the user if they would like to include numeric characters
var numericConfirm = function () {
	console.log("the user is being prompted for the use of numeric characters");
	// useNumeric is set to the boolean value returned by the user input
	var useNumeric = window.confirm("Would you like to include numeric characters in your new password?\nSelect \"OK\" to include numeric characters, or \"Cancel\" to exclude numeric characters.");
	// The numeric object's wasSelected property is updated
	numeric.wasSelected = useNumeric;
	console.log(numeric.wasSelected);
};

// This function will ask the user if they would like to include special characters
var specialCharacterConfirm = function () {
	console.log("the user is being prompted for the use of special characters");
	// useSpecialCharacters is set to the boolean value returned by the user input
	var useSpecialCharacters = window.confirm("Would you like to include special characters in your new password?\nSelect \"OK\" to include special characters, or \"Cancel\" to exclude special characters.");
	// The specialCharacter object's wasSelected property is updated
	specialCharacter.wasSelected = useSpecialCharacters;
	console.log(specialCharacter.wasSelected);
};
// END CHARACTER SET OPTION PROMPT FUNCTIONS

// Runs the functions that will prompt for character set selection and validates that at least one character set was chosen
var characterOptionPrompts = function () {
	// These functions will prompt the user to choose what characters to include in their password generation
	lowerCaseConfirm();
	upperCaseConfirm();
	numericConfirm();
	specialCharacterConfirm();

	// User choices are validated to ensure at least one set of characters was chosen.
	if (!lowerCase.wasSelected && !upperCase.wasSelected && !numeric.wasSelected && !specialCharacter.wasSelected) {
		window.alert("Please choose at lease one set of characters for password generation.");
		characterOptionPrompts();
	}
};

// THIS CODE WAS PROVIDED BY THE UNIVERSITY OF UTAH CODING BOOTCAMP
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
// END CODE PROVIDED BY THE UNIVERSITY OF UTAH CODING BOOTCAMP