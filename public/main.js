$(document).ready(function(){
	console.log("linked");

	var headerText = ['Blueprinting the world of REM connections', 'A dream dreams of another dream to curl up to (curl into)', 'Burrowing dream-webs through the web-web', 'Lucid as a hatter']
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

	$('.reply-button').on('click', function(){
		console.log('clicked');
		$('.reply-form').slideDown('slow');
	})

	$('.reply-submit').on('click', function(){
		$('.reply-form').slideUp('slow');
	})

	// for (i=0; i<100; i++){
	// 	for (j=0; j<50; j++) {
	// 			$('.' + i).find('.button' + j).click(function(){
	// 				console.log(clicked);
	// 			})

	// 			// $('.-button').on('click', function(){
	// 			// 	console.log('clicked');
	// 			// 	$('.reply-form').slideDown('slow');
	// 			// })

	// 			// $('.reply-submit').on('click', function(){
	// 			// 	$('.reply-form').slideUp('slow');
	// 			// })			
	// 	}		
	// }


});