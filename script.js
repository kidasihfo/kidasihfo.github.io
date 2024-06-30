document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const imageFolder = 'backuptesti/';
    const images = ['testi1.jpg', 'testi2.jpg', 'gambar3.jpg']; // Add all your images here

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `${imageFolder}${image}`;
        imgElement.alt = 'Testimonial Image';
        imgElement.classList.add('w-full', 'h-auto', 'rounded-lg', 'shadow-md');
        gallery.appendChild(imgElement);
    });
});
