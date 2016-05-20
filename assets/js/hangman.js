(function() {

    //Variable declarations with defaults
    var randomWord = "";
    var userEntryUnderscore = "";
    var userEntry = [];
    var letterClicked = [];
    var allowedChances = 0;
    var selectedLetter;
    var foundLetter = false;
    var missedCount = 0;
    var remainingCount = 7;

    //When any key is pressed
    document.onkeyup = function(event) {

        // Get the corresponding key letter in upper case
        selectedLetter = String.fromCharCode(event.keyCode).toUpperCase();

        //function call to handle keypressed letter
        handleEntered();
    }

    ///////////////////////////////////////////
    //Function to handle keypressed letters
    function handleEntered()  {

        // Check if the key pressed is between a to z, 0 to 9 or space
        if ( (selectedLetter >= 'A' && selectedLetter <= 'Z') || selectedLetter === ' ' ||  (selectedLetter >= '0' && selectedLetter <= '9') )   {

            //Push into array the keypressed letter
            letterClicked.push(selectedLetter);

            //Replace the text of the node element
            document.getElementById('letter-clicked').innerHTML = letterClicked.join('');

            //Initialize variable to false
            foundLetter = false;

            //Loop through to find out if clicked key is part of the random word. For every occurance, replace "_" with the value of clicked key.
            //If the clicked key is part of the random word, change to true for variable foundLetter. 

            //Find the first occurance index of the keypressed letter in the random word
            var idx = randomWord.indexOf(selectedLetter);

            // Loop through until there are no occurances
            while ( idx != -1)  {

                // Replace "_" with keypressed letter
                userEntry[idx] = selectedLetter;

                //Replace the text of the node element
                document.getElementById('word-to-guess').innerHTML = userEntry.join('');

                //Find the next occurance of the keypressed letter
                idx = randomWord.indexOf(selectedLetter, idx + 1);

                //Change to true if any occurance of the keypressed letter is found in the random word
                foundLetter = true;
            }


            // If keypressed letter is not found in the random word
            if (!foundLetter)   {

                //Increment allowed chances
                allowedChances++;

                //Increment missed count
                missedCount++;

                //Decrement remaining count
                remainingCount--;

                //Replace the text of the node element
                document.getElementById('missed-point').innerHTML = missedCount;
                document.getElementById('remaining-point').innerHTML = remainingCount;
                document.getElementById('hman-image').src = "assets/images/hm" + allowedChances + ".jpg"

                var audio = new Audio('assets/audio/hmsound'  + allowedChances +  '.m4a');
								audio.play();

                //Set Timeout function function was added to delay alert message by few seconds.
                //This is to enable last hangman image is completely displayed.
                setTimeout(function()   {

                    //If allowed chances are over
                    if (allowedChances === 7)   {

                        //Alert user and show the random word
                        alert("Uh oh. You took too many tries to guess the word. The correct word is - '" + randomWord + "'. Better luck next time.");
                        
                        //Function call to initialize everything
                        reset();
                    }

                },3000); //For 3000 miliseconds 
            }

            //If user guessed correct random word
            if (userEntry.join('') === randomWord)   {

                //Alert user
                alert("Congratulations!! You won.");

                //Function call to initialize everything
                reset();
            }
        }
    }

    ///////////////////////////////////////////
    //Function to set "_" for equal length of 
    // random word and display for the text of 
    // the node element
    function setGuessedWord()   {

        //Function call to get random word
        randomWord = getRandomWord();

        //Loop through to put "_" for equal length of random word
        var i = 0;
        while (i != randomWord.length)  {
            if (randomWord.charAt(i) === " ")   {
                userEntryUnderscore += " ";
            }
            else   {
                userEntryUnderscore += "_";
            }

            i++;
        }

        //Split by "_" to copy values to array
        userEntry = userEntryUnderscore.split("");

        //Display for the text in the node element
        document.getElementById('word-to-guess').innerHTML = userEntry.join('');
        
    }

    /////////////////////////////////////////////
    //Function to get random word
    function getRandomWord()   {

        //List of star wars words 
        var wordList = ["ADMIRAL ACKBAR","BAZINE NETAL","BB8","C3P0","CAPTAIN PHASMA","CHEWBACCA","DOCTOR KALMONIA","DQAR","FINN","THE FIRST ORDER","GENERAL HUX","HAN SOLO","HAPPABORE","LEIA ORGANA","LUKE SKYWALKER","MAJOR EMATT","MILLENNIUM FALCON","R2D2","THE RESISTANCE","BAIL ORGANA","BOSS LYONIE","BOSS NASS","DARTH VADER","EMPEROR PALPATINE"];

        //Determine index number and get random word from array list
        var newWord = wordList[Math.floor(Math.random() * wordList.length)];

        //Function return call
        return newWord;
    }

    ///////////////////////////////////////////
    //Function call to initialize everything 
    // when game ends
    function reset()    {
        
        //Initialize variables
        userEntryUnderscore = "";
        userEntry = [];
        letterClicked = [];
        allowedChances = 0;
        setGuessedWord();
        missedCount = 0;
        remainingCount = 7;

        //Write for text in the node element
        document.getElementById('hman-image').src = "assets/images/starwarsword.png"
        document.getElementById('letter-clicked').innerHTML = 'GAME READY';
        document.getElementById('missed-point').innerHTML = 0;
        document.getElementById('remaining-point').innerHTML = 7;

    }

    //Function call to display "_" initially when the web page is loaded for first time
    setGuessedWord();
        
})();
