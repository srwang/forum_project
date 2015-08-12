$(document).ready(function(){
	console.log("linked");

	var headerText = ['Blueprinting the world of REM connections', 'A dream dreams of another dream to curl up into', 'Burrowing dream-webs through the web-web', 'Lucid as a hatter']
	var text = headerText[Math.floor(Math.random()*headerText.length)];
  	$('#header-text-small').text(text);

 	$('header').click(function(){
 		location.href = "/dreamlucid";
 	})

 	$('.open-modal').on('click', function (){
		$('.modal').toggle();
		$('.overlay').toggle();
	})
	$('.close').on('click', function(){
		$('.modal').toggle();
		$('.overlay').toggle();
	})



});