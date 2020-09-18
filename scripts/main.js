var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var currentPosition = 0;
var arraySize = 0;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb, index) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
        currentPosition = index;
    });
}

function previousButtonHandler(thumbnails) {
    'use strict';
    var previousButton = document.querySelector("#previous-button");
    previousButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (currentPosition === 0) {
            currentPosition = arraySize - 1;
        }
        else {
            currentPosition = currentPosition - 1;
        }
        setDetailsFromThumb(thumbnails[currentPosition]);
    });
}

function nextButtonHandler(thumbnails) {
    'use strict';
    var nextButton = document.querySelector("#next-button");
    nextButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (currentPosition === arraySize - 1) {
            currentPosition = 0;
        }
        else {
            currentPosition = currentPosition + 1;
        }
        setDetailsFromThumb(thumbnails[currentPosition]);
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function getPosition(element, array) {
    'use strict';
    var position = array.indexOf(element);
    return position;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    arraySize = thumbnails.length;
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    previousButtonHandler(thumbnails);
    nextButtonHandler(thumbnails);
}

initializeEvents();