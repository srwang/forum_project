
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


	console.log(getLocation());
	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(storePosition);
	    } 
	}
	function storePosition(position) {
		var lat = position.coords.latitude;
		var long = position.coords.longitude;
		return [lat, long];
	}

// 	function initialize() {
// 	console.log("trying to get map")
// 	var styles = [
// 	  {
// 	    "stylers": [
// 	      { "hue": "#0022ff" },
// 	      { "lightness": -6 },
// 	      { "gamma": 0.97 },
// 	      { "saturation": 20 }
// 	    ]
// 	  }
// 	]

// 	var styledMap = new google.maps.StyledMapType(styles,
// 	{name: "Styled Map"});

// 	var mapOptions = {
// 	  center: { lat: 40.688716, lng: -73.941785},
// 	  zoom: 12
// 	};
// 	var map = new google.maps.Map(document.getElementById('map-canvas'),
// 	    mapOptions);

//     map.mapTypes.set('map_style', styledMap);
// 	map.setMapTypeId('map_style');

// 	var sampleProject = new google.maps.LatLng(40.676089, -73.949423);

// 	var markerSampleProject = new google.maps.Marker({
// 	  position: sampleProject,
// 	  map: map,
// 	  title: 'Sample Project',
// 	  url: "sample_project_page.html"
// 	});

// 	 var contentString = '<div id="content">'+
// 	  '<div id="siteNotice">'+
// 	  '<p>Sample Project</p>' +
// 	  '<p>Artists, Location, Short description of project<p>' +
// 	  '</div>'+
// 	  '</div>';

//   var infowindow = new google.maps.InfoWindow({
//       content: contentString
//   });

// 	google.maps.event.addListener(markerSampleProject, 'mouseover', function(){
// 		infowindow.open(map,markerSampleProject)
// 	});

// 	google.maps.event.addListener(markerSampleProject, 'click', goToPage);

// 	function goToPage() {
// 		console.log("clicked");
// 		window.location.href = this.url;
// 	}

// 	google.maps.event.addDomListener(document.getElementById('marker-link'), "click", function(ev) {
// 		map.setCenter(markerSampleProject.getPosition());
// 	})

// }
// google.maps.event.addDomListener(window, 'load', initialize);

});