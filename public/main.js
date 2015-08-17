
$(document).ready(function(){
	console.log("linked");

	var headerText = ['REM connections', 'A dream dreams of another dream to curl up to (curl into)', 'Burrowing dream-webs through the web-web', 'Lucid as a hatter']
	var text = headerText[Math.floor(Math.random()*headerText.length)];
  	$('#header-text-small').text(text);

 	$('.link-mainpage').click(function(){
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

	$('.reply-button').on('click', function(){
		console.log('clicked');
		$('.wrapper-reply-form').slideDown('slow');
	})

	$('.reply-submit').on('click', function(){
		$('.wrapper-reply-form').slideUp('slow');
	})

});