$(document).ready(function() {

$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		},
	});
$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		},
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
	});



		$(".ajax-contact-form").submit(function() {
		var str = $(this).serialize();

		$.ajax({
		type: "POST",
		url: "contact.php",
		data: str,
		success: function(msg) {
		if(msg == 'OK') {
		result = '<div class="notification_ok">Спасибо, ваше сообщение было отправлено.</div>';
		$(".fields").hide();
		} else {
		result = msg;
		}
		$('.field').html(result);
		
		}
		});
		return false;
		});	


});
