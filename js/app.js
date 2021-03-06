(function(){

// IMAGE GALLERY CODE \\

var thumbnails = [ 
'images/_MG_2618b-resized.jpg', 
'images/Detail_08bisNew-resized.jpg', 
'images/22_aNew-resized.jpg', 
'images/_MG_3700b-resized.jpg', 
'images/33New-resized.jpg', 
'images/_MG_3081b-resized.jpg', 
'images/_MG_3517-resized.jpg', 
'images/_MG_2746-resized.jpg'
];

var appBody = document.getElementById('app-wrapper');
var pageSections = document.querySelectorAll('.section');
var gallery = document.querySelectorAll('.gallery');
var imageContainer = document.getElementById('image-wrapper');
var galleryWidth = parseInt(window.getComputedStyle(gallery[0], null).getPropertyValue('width'));
var thumbnailWrapperWidth = galleryWidth + 'px';

function displayAllThumbnails(sourceArray) {

	for(var i = 0; i < sourceArray.length; i++) {

		imageContainer.style.width = galleryWidth * sourceArray.length + 'px';

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

displayAllThumbnails(thumbnails);

function updateMainImage(eventType, eventTarget) {

	var imageWrapper = document.querySelectorAll('.thumbnail-wrapper');
  var imageWrappersArray = [];

  for(var x = 0; x < imageWrapper.length; x++) {

    imageWrappersArray.push(imageWrapper[x]);
  }

	var currentIndex = imageWrappersArray.indexOf(eventTarget.parentNode);
	var next;
  
	if(eventType === 'panright') {

		if (currentIndex > 0) {

			next = currentIndex - 1;

			imageWrapper[currentIndex].setAttribute('style', 'width: 0;');
      
			imageWrapper[next].style.width = thumbnailWrapperWidth;
		}
	}

	if(eventType === 'panleft') {

		if (currentIndex < imageWrapper.length -1 && currentIndex >= 0) {

			next = currentIndex + 1;

	    imageWrapper[currentIndex].setAttribute('style', 'width: 0;');
  
	    imageWrapper[next].style.width = thumbnailWrapperWidth;
		}
	}
}

// VIEW CHANGE CODE \\

document.body.addEventListener('touchstart', function(e) { 
  e.preventDefault(); 
});

for (var i = 0; i < pageSections.length; i++) {

  pageSections[i].style.height = window.innerHeight + 'px';

}

var appBodyHeight = parseInt(window.getComputedStyle(appBody, null).getPropertyValue('height'));

var appBodyTop = 0;

function updateView(eventType) {
  
  var pageSectionHeight = parseInt(pageSections[0].style.height);

  if(appBodyTop <= 0) {

    if(eventType === 'swipeup' && appBodyTop > (- appBodyHeight + pageSectionHeight)) {

      appBodyTop -= pageSectionHeight;
      appBody.style.top = appBodyTop + 'px';
    }

    if(eventType === 'swipedown' && appBodyTop < (- pageSectionHeight / 2)) {
      appBodyTop += pageSectionHeight;
      appBody.style.top = appBodyTop + 'px';
    }
  }
}

var mcGallery = new Hammer(imageContainer);

mcGallery.on('panleft panright', function(evnt) {

 updateMainImage(evnt.type, evnt.target);

});

var mcSections = new Hammer(appBody);

mcSections.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

mcSections.on("swipeup swipedown", function(evnt) {
    
  updateView(evnt.type);

});

})();