document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const imageFolder = 'backuptesti/';
    const images = [
        { name: 'testi1.jpg', date: '2024-06-01' },
        { name: 'testi2.jpg', date: '2024-06-02' },
        { name: 'testi3.jpg', date: '2024-06-03' }
    ]; // Tambahkan semua gambar di sini dengan tanggal

    function renderImages(imageList) {
        gallery.innerHTML = '';
        imageList.forEach((image, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container', 'w-full', 'h-auto', 'rounded-lg', 'shadow-md', 'overflow-hidden');

            const imgElement = document.createElement('img');
            imgElement.src = `${imageFolder}${image.name}`;
            imgElement.alt = `Testimonial Image ${index + 1}`;
            imgElement.classList.add('w-full', 'h-auto', 'cursor-pointer');
            imgElement.onclick = () => openLightbox(image.name, `Testimonial ${index + 1}`);

            const caption = document.createElement('div');
            caption.classList.add('img-caption');
            caption.innerText = `Testimonial ${index + 1}`;

            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(caption);
            gallery.appendChild(imgContainer);
        });
    }

    function sortImagesNewest() {
        const sortedImages = images.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderImages(sortedImages);
    }

    function sortImagesOldest() {
        const sortedImages = images.sort((a, b) => new Date(a.date) - new Date(b.date));
        renderImages(sortedImages);
    }

    document.getElementById('sort-newest').addEventListener('click', sortImagesNewest);
    document.getElementById('sort-oldest').addEventListener('click', sortImagesOldest);

    // Initial render
    sortImagesNewest();
});

function openLightbox(image, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('caption');

    lightboxImg.src = `backuptesti/${image}`;
    lightboxCaption.innerText = caption;
    lightbox.style.display = 'flex';

    const closeBtn = document.querySelector('.lightbox .close');
    closeBtn.onclick = () => {
        lightbox.style.display = 'none';
    };
}
