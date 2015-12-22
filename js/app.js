(function(){

	'use strict';

	// IMAGE GALLERY CODE \\

	var thumbnails = [ 
		'images/01.jpg',
		'images/02.jpg',
		'images/03.jpg',
		'images/04.jpg',
		'images/05.jpg',
		'images/06.jpg',
		'images/07.jpg',
		'images/08.jpg'
	];

	var appBody = document.getElementById('app-wrapper');
	var appBodyHeight = parseInt(window.getComputedStyle(appBody, null).getPropertyValue('height'));
	var appBodyTop = 0;
	var pageSections = document.querySelectorAll('.section');
	var gallery = document.querySelectorAll('.gallery');
	var imageContainer = document.getElementById('image-wrapper');
	var galleryWidth = parseInt(window.getComputedStyle(gallery[0], null).getPropertyValue('width'));
	var thumbnailWrapperWidth = galleryWidth + 'px';
	var totalThumbnails = thumbnails.length;
	
	var mcGallery = new Hammer(imageContainer);
	var mcSections = new Hammer(appBody);

	displayAllThumbnails(thumbnails);

	for (var i = 0; i < pageSections.length; i++) {

		pageSections[i].style.height = window.innerHeight + 'px';
	}

	document.body.addEventListener('touchstart', function (e) { 
		
		e.preventDefault(); 
	});

	mcGallery.on('panleft panright', function (evnt) {

		updateMainImage(evnt.type, evnt.target);
	});

	mcSections.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

	mcSections.on('swipeup swipedown', function (evnt) {
		
		updateView(evnt.type);
	});

	function displayAllThumbnails (sourceArray) {

		imageContainer.style.width = galleryWidth * totalThumbnails + 'px';

		for (var i = 0; i < totalThumbnails; i++) {

			var thumbnailWrapper = document.createElement('div');
			var thumbnailInstance = document.createElement('img');

			thumbnailInstance.src = sourceArray[i];
			thumbnailInstance.classList.add('thumbnail');
			
			thumbnailWrapper.style.width = thumbnailWrapperWidth;
			thumbnailWrapper.classList.add('thumbnail-wrapper');
			thumbnailWrapper.appendChild(thumbnailInstance);
			imageContainer.appendChild(thumbnailWrapper);
		}
	}

	function updateMainImage (eventType, eventTarget) {

		var imageWrapper = document.querySelectorAll('.thumbnail-wrapper');
		var imageWrappersArray = [];

		for (var x = 0; x < imageWrapper.length; x++) {

			imageWrappersArray.push(imageWrapper[x]);
		}

		var currentIndex = imageWrappersArray.indexOf(eventTarget.parentNode);
		var next;
		
		if (eventType === 'panright') {

			if (currentIndex > 0) {

				next = currentIndex - 1;

				imageWrapper[currentIndex].setAttribute('style', 'width: 0;');
			
				imageWrapper[next].style.width = thumbnailWrapperWidth;
			}
		}

		if (eventType === 'panleft') {

			if (currentIndex < imageWrapper.length -1 && currentIndex >= 0) {

				next = currentIndex + 1;

				imageWrapper[currentIndex].setAttribute('style', 'width: 0;');
				imageWrapper[next].style.width = thumbnailWrapperWidth;
			}
		}
	}

	// VIEW CHANGE CODE \\

	function updateView (eventType) {
		
		var pageSectionHeight = parseInt(pageSections[0].style.height);

		if (appBodyTop <= 0) {

			if (eventType === 'swipeup' && appBodyTop > (- appBodyHeight + pageSectionHeight)) {

				appBodyTop -= pageSectionHeight;
				appBody.style.top = appBodyTop + 'px';
			}

			if (eventType === 'swipedown' && appBodyTop < (- pageSectionHeight / 2)) {
				
				appBodyTop += pageSectionHeight;
				appBody.style.top = appBodyTop + 'px';
			}
		}
	}

})();