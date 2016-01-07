(function(){

// DEVICE ORIENTATION & INTRO VIDEO CODE \\

var introVideo = document.getElementById('intro-page-video');

window.addEventListener('deviceorientation', function(event) {

  if(event.gamma > 0) {
    introVideo.currentTime += 0.1;
  }

  if(event.gamma < 0) {
    introVideo.currentTime -= 0.1;
  }
});

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

var videoStillsSrc = [
  'images/Scotland-videoScreenshot.png',
  'images/Lommel-videoScreenshot.png',
  'images/Cologne-videoScreenshot.png',
  'images/France-videoScreenshot.png'
];

var appBody = document.getElementById('app-wrapper');
var pageSections = document.querySelectorAll('.section');
var gallery = document.querySelectorAll('.gallery');
var imageContainer = document.getElementById('image-wrapper');
var videoContainer = document.getElementById('video-wrapper');
var galleryWidth = parseInt(window.getComputedStyle(gallery[0], null).getPropertyValue('width'));
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

// VIDEO GALLERY CODE \\

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
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  var videosArray = [
    '9_4kgjTyl4g',
    'cC5KtODInB4', 
    'ZxoVapWVuXs', 
    'n3nXe3-IXZM'
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

});

var mcVideoGallery = new Hammer(videoContainer);

mcVideoGallery.on('panleft panright', function(evnt) {

 updateViewContent(evnt.type, evnt.target, '.video-still');
 
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
  introVideo.currentTime = (introVideo.duration / 2);
  appBody.style.visibility = 'visible';
}

})();