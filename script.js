document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const imageFolder = 'backuptesti/';
    const images = ['testi1.jpg', 'testi2.jpg', 'testi3.jpg']; // Tambahkan semua gambar di sini

    images.forEach((image, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container', 'w-full', 'h-auto', 'rounded-lg', 'shadow-md', 'overflow-hidden');

        const imgElement = document.createElement('img');
        imgElement.src = `${imageFolder}${image}`;
        imgElement.alt = `Testimonial Image ${index + 1}`;
        imgElement.classList.add('w-full', 'h-auto');

        const caption = document.createElement('div');
        caption.classList.add('img-caption');
        caption.innerText = `Testimonial ${index + 1}`;

        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(caption);
        gallery.appendChild(imgContainer);
    });
});
