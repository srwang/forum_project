$(document).ready(function(){
	console.log("linked");

	var headerText = ['Architecting the world of REM connections', 'A dream dreams of another dream to curl up into', 'Burrowing dream-webs through the web-web', 'Lucid as a hatter']
	var text = headerText[Math.floor(Math.random()*headerText.length)];

	console.log(text);
  	$('#header-text-small').text(text);



});