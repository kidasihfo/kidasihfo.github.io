document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const searchInput = document.getElementById('search');
    const loadMoreButton = document.getElementById('loadMore');
    const loadingIndicator = document.getElementById('loading');
    let currentPage = 1;
    const imagesPerPage = 8;
    
    async function fetchImages() {
        const response = await fetch('images.json');
        return await response.json();
    }

    function renderImages(images) {
        images.forEach((image, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container', 'w-full', 'h-auto', 'rounded-lg', 'shadow-md', 'overflow-hidden');

            const imgElement = document.createElement('img');
            imgElement.src = `backuptesti/${image.file}`;
            imgElement.alt = `Testimonial Image ${index + 1}`;
            imgElement.classList.add('w-full', 'h-auto', 'cursor-pointer');
            imgElement.onclick = () => openLightbox(image.file, image.description);

            const caption = document.createElement('div');
            caption.classList.add('img-caption');
            caption.innerText = image.description;

            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(caption);
            gallery.appendChild(imgContainer);
        });
    }

    async function loadImages() {
        const allImages = await fetchImages();
        const start = (currentPage - 1) * imagesPerPage;
        const end = currentPage * imagesPerPage;
        const imagesToLoad = allImages.slice(start, end);
        renderImages(imagesToLoad);

        if (end >= allImages.length) {
            loadMoreButton.classList.add('hidden');
        }

        loadingIndicator.classList.add('hidden');
    }

    searchInput.addEventListener('input', async (event) => {
        const query = event.target.value.toLowerCase();
        const allImages = await fetchImages();
        const filteredImages = allImages.filter(image => image.description.toLowerCase().includes(query));
        gallery.innerHTML = '';
        renderImages(filteredImages);
    });

    loadMoreButton.addEventListener('click', () => {
        currentPage++;
        loadingIndicator.classList.remove('hidden');
        loadImages();
    });

    loadImages();
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
