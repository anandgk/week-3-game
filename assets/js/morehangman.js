
//Variable declaration
var swTitleAudio = new Audio('assets/audio/swtheme.m4a');

//Function to play sound when entering image
function playSWSound()	{

		swTitleAudio.play();
				
}

//Function to stop playing sound when leaving image
function stopSWSound()	{
	
		swTitleAudio.pause();
		swTitleAudio.currentTime = 0;
				
}