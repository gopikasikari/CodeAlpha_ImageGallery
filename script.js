const filterButtons = document.querySelectorAll('.filter-btn');
const images = document.querySelectorAll('.gallery img');

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    // 1. Move the "active" look to the clicked button
    filterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });
    button.classList.add('active');

    // 2. Show or hide images
    const selected = button.dataset.filter;

    images.forEach(function (img) {
      if (selected === 'all' || img.dataset.category === selected) {
        img.classList.remove('hide');
      } else {
        img.classList.add('hide');
      }
    });
  });
});



const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;
let visibleImages = [];

// Get only the images that are not hidden by the filter
function getVisibleImages() {
  return Array.from(images).filter(function (img) {
    return !img.classList.contains('hide');
  });
}

function showImage(index) {
  currentIndex = index;
  lightboxImg.src = visibleImages[currentIndex].src;
  lightboxImg.alt = visibleImages[currentIndex].alt;
}

// Open when a thumbnail is clicked
images.forEach(function (img) {
  img.addEventListener('click', function () {
    visibleImages = getVisibleImages();
    showImage(visibleImages.indexOf(img));
    lightbox.classList.add('open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
}

function nextImage() {
  showImage((currentIndex + 1) % visibleImages.length);
}

function prevImage() {
  showImage((currentIndex - 1 + visibleImages.length) % visibleImages.length);
}

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Click on the dark area (outside the image) to close
lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard support
document.addEventListener('keydown', function (e) {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});