(function(){

	'use strict';

	// IMAGE GALLERY CODE \\

	var galleryImages = [ 
		'images/01.jpg',
		'images/02.jpg',
		'images/03.jpg',
		'images/04.jpg',
		'images/05.jpg',
		'images/06.jpg',
		'images/07.jpg',
		'images/08.jpg'
	];

	var appBody;
	var appBodyHeight;
	var appBodyTop;
	var pageSections;
	var totalPageSections;
	var gallery;
	var imageContainer;
	var galleryWidth;
	var imageWrapperWidth;
	var totalGalleryImages;
	var mcGallery;
	var mcSections;

	function init () {

		appBody = document.getElementById('app-wrapper');
		appBodyHeight = parseInt(window.getComputedStyle(appBody, null).getPropertyValue('height'));
		appBodyTop = 0;
		pageSections = document.querySelectorAll('.section');
		totalPageSections = pageSections.length;
		gallery = document.querySelectorAll('.gallery');
		imageContainer = document.getElementById('image-container');
		galleryWidth = parseInt(window.getComputedStyle(gallery[0], null).getPropertyValue('width'));
		imageWrapperWidth = galleryWidth + 'px';
		totalGalleryImages = galleryImages.length;

		document.body.addEventListener('touchstart', function (e) { 
			
			e.preventDefault(); 
		});

		createImages();
		initialiseGalleries();

		for (var i = 0; i < totalPageSections; i++) {

			pageSections[i].style.height = window.innerHeight + 'px';
		}
	}

	function initialiseGalleries () {
		
		mcGallery = new Hammer(imageContainer);
		mcSections = new Hammer(appBody);

		mcGallery.on('panleft panright', function (evnt) {

			console.log('Hammer pan:', evnt.type);
			updateMainImage(evnt.type, evnt.target);
		});

		mcSections.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

		mcSections.on('swipeup swipedown', function (evnt) {
			
			console.log('Hammer swipe:', evnt.type);
			updateView(evnt.type);
		});
	}

	function createImages () {

		imageContainer.style.width = galleryWidth * totalGalleryImages + 'px';

		for (var i = 0; i < totalGalleryImages; i++) {

			var imageWrapper = document.createElement('div');
			var image = document.createElement('img');

			image.src = galleryImages[i];
			image.classList.add('image');
			
			imageWrapper.style.width = imageWrapperWidth;
			imageWrapper.classList.add('image-wrapper');
			imageWrapper.appendChild(image);
			imageContainer.appendChild(imageWrapper);
		}
	}

	function updateMainImage (eventType, eventTarget) {

		var imageWrapper = document.querySelectorAll('.image-wrapper');
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
			
				imageWrapper[next].style.width = imageWrapperWidth;
			}
		}

		if (eventType === 'panleft') {

			if (currentIndex < imageWrapper.length -1 && currentIndex >= 0) {

				next = currentIndex + 1;

				imageWrapper[currentIndex].setAttribute('style', 'width: 0;');
				imageWrapper[next].style.width = imageWrapperWidth;
			}
		}
	}

	// VIEW CHANGE CODE \\

	function updateView (eventType) {
		
		var pageSectionHeight = parseInt(pageSections[0].style.height);

		console.log('appBodyTop:', appBodyTop);
		console.log('appBodyHeight:', appBodyHeight);
		console.log('pageSectionHeight:', pageSectionHeight);

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

	document.addEventListener('DOMContentLoaded', init);

})();