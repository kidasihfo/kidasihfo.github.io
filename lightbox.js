document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('caption');

    // Function to open the lightbox
    function openLightbox(imageSrc, captionText) {
        lightboxImg.src = imageSrc;
        lightboxCaption.innerText = captionText;
        lightbox.classList.remove('hidden');
    }

    // Function to close the lightbox
    function closeLightbox() {
        lightbox.classList.add('hidden');
    }

    // Close lightbox when clicking on the close button
    document.querySelector('.lightbox .close').onclick = closeLightbox;

    // Close lightbox when clicking outside of the image
    lightbox.onclick = function(event) {
        if (event.target === lightboxImg) {
            return;
        }
        closeLightbox();
    };

    // Adding event listeners to each image
    const galleryImages = document.querySelectorAll('#gallery img');
    galleryImages.forEach((img, index) => {
        img.onclick = function() {
            const imageSrc = img.src;
            const captionText = img.alt;
            openLightbox(imageSrc, captionText);
        };
    });
});
