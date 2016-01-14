(function(){

var headerLogo = document.getElementById('header-logo');
var gallery = document.querySelectorAll('.gallery');
galleryWidth = parseInt(window.getComputedStyle(gallery[0], null).getPropertyValue('width'));

// DEVICE ORIENTATION & INTRO VIDEO CODE \\

var introArray = [
  'images/intro-images/header_0007_Layer-8.png',
  'images/intro-images/header_0008_Layer-7.png',
  'images/intro-images/header_0006_Layer-9.png',
  'images/intro-images/header_0005_Layer-10.png',
  'images/intro-images/header_0004_Layer-11.png',
  'images/intro-images/header_0003_Layer-12.png',
  'images/intro-images/header_0002_Layer-13.png',
  'images/intro-images/header_0001_Layer-14.png',
  'images/intro-images/header_0000_Layer-15.png'
];

var introPage = document.getElementById('intro-page');

function displayArray(container) {

  container.style.width = galleryWidth * introArray.length + 'px';

  for(var i = 0; i < introArray.length; i++) {

    var thumbnailInstance = document.createElement('img');
    thumbnailInstance.src = introArray[i];
    thumbnailInstance.style.height = '100%';
    thumbnailInstance.style.width = 100 / introArray.length + '%';
    thumbnailInstance.style.float = 'left';
    container.appendChild(thumbnailInstance);
  }
}

displayArray(introPage);

window.addEventListener('deviceorientation', function(event) {

var introPagePositionX = parseInt(introPage.style.left);

  if(event.gamma > 0 && introPagePositionX > -800) {

    if(parseInt(event.gamma) % 2 === 0) {

      introPagePositionX -= 100;
      introPage.style.left = introPagePositionX + '%';
    }
  }

  if(event.gamma < 0 && introPagePositionX < 0) {
    
    if(parseInt(event.gamma) % -2 === 0) {

     introPagePositionX += 100;
     introPage.style.left = introPagePositionX + '%';
    }
  }
});

// IMAGE GALLERY CODE \\

var thumbnails = [ 
  'images/image1-iphone6+.jpg', 
  'images/image2-iphone6+.jpg', 
  'images/image3-iphone6+.jpg', 
  'images/image4-iphone6+.jpg', 
  'images/image5-iphone6+.jpg' 
];

var appBody = document.getElementById('app-wrapper');
var pageSections = document.querySelectorAll('.section');
var imageContainer = document.getElementById('image-wrapper');
var videoContainer = document.getElementById('video-wrapper');
var thumbnailWrapperWidth = galleryWidth + 'px';

videoContainer.style.width = galleryWidth * 4 + 'px';

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

function updateViewContent(eventType, eventTarget, targetElement) {

	var wrappers = document.querySelectorAll(targetElement);
  var wrappersArray = [];

  for(var x = 0; x < wrappers.length; x++) {

    wrappersArray.push(wrappers[x]);
  }

	var currentIndex = wrappersArray.indexOf(eventTarget);
	var next;
  
	if(eventType === 'panright') {

		if (currentIndex > 0) {

			next = currentIndex - 1;

			wrappersArray[currentIndex].setAttribute('style', 'width: 0;');
      
			wrappersArray[next].style.width = thumbnailWrapperWidth;
		}
	}

	if(eventType === 'panleft') {

		if (currentIndex < wrappersArray.length -1 && currentIndex >= 0) {

			next = currentIndex + 1;

	    wrappersArray[currentIndex].setAttribute('style', 'width: 0;');
  
	    wrappersArray[next].style.width = thumbnailWrapperWidth;
		}
	}
}

function hideSwipeArrows(arrow) {
  var swipeArrows = document.querySelectorAll('.user-instruction');
  swipeArrows[arrow].style.opacity = 0;
}

// VIDEO GALLERY CODE \\

var videoStillsSrc = [
  'images/Lommel-videoScreenshot.png',
  'images/Scotland-videoScreenshot.png',
  'images/Cologne-videoScreenshot.png',
  'images/France-videoScreenshot.png'
];

var videoStills = [];
var playerWrapper = document.getElementById('iframe-wrapper');
playerWrapper.style.display = 'none';

function displayVideostills() {

  for(var i = 0; i < videoStillsSrc.length; i++) {

    var still = document.createElement('img');
    still.src = videoStillsSrc[i];
    still.classList.add('video-still');
    videoContainer.appendChild(still);
    videoStills.push(still);
  }
}

displayVideostills();

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerPlaceholder = document.getElementById('player');
var playerCloseButton = document.getElementById('player-close-button');
var playButton = document.getElementById('play-button');
var player;

window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player(playerPlaceholder, {
    playerVars: {
      'fs': 0 
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  var videosArray = [
    'cC5KtODInB4', 
    'ZxoVapWVuXs', 
    'n3nXe3-IXZM',
    '9_4kgjTyl4g'
  ];

  player.cuePlaylist(videosArray);
}

function closePlayer() {
  playerWrapper.style.display = 'none';
  player.stopVideo();
}

function onPlayerStateChange(event){

  if(event.data == YT.PlayerState.PLAYING) {
    playerWrapper.style.display = 'inline-block';
    hideSwipeArrows(1);
  }

  if(event.data == YT.PlayerState.ENDED) {
    closePlayer();
  }

  if(event.data == YT.PlayerState.PAUSED) {
    playerCloseButton.style.opacity = 0.4;
  }
}

function playVideo(videoArrayIndex) {
  player.playVideoAt(videoArrayIndex);
}
 
function playButtonTapIndication() {

  var playButtonWidth = window.getComputedStyle(playButton, null).getPropertyValue('width');

  if(playButtonWidth === '75px') {
    playButton.setAttribute('style','width: 50px; opacity: 0;');
  }

  if(playButtonWidth === '50px') {
    playButton.setAttribute('style','width: 75px; opacity: 1;');
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

// HAMMER INSTANCES CODE \\

var mcGallery = new Hammer(imageContainer);

mcGallery.on('panleft panright', function(evnt) {

 updateViewContent(evnt.type, evnt.target.parentNode, '.thumbnail-wrapper');
 hideSwipeArrows(0);

});

var mcVideoGallery = new Hammer(videoContainer);

mcVideoGallery.on('panleft panright', function(evnt) {

 updateViewContent(evnt.type, evnt.target, '.video-still');
 hideSwipeArrows(1);
 
});

mcVideoGallery.on('tap press', function(evnt) {

 playVideo(videoStills.indexOf(evnt.target));

 playButtonTapIndication();

});

var mcPlayerClose = new Hammer(playerCloseButton);

mcPlayerClose.on('tap press', function(evnt) {

  closePlayer();
  playButtonTapIndication();

});

var mcSections = new Hammer(appBody);

mcSections.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

mcSections.on('swipeup swipedown', function(evnt) {
    
  updateView(evnt.type);

});

window.onload = function() {

  introPage.style.left = '-400%';
  appBody.style.visibility = 'visible';
  headerLogo.setAttribute('style','opacity: 1; top: 50px');
}

})();