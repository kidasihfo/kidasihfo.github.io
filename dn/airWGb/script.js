document.addEventListener('DOMContentLoaded', function() {
    var viewCount = localStorage.getItem('viewCount');
    if (!viewCount) {
        viewCount = 0;
    }
    document.getElementById('view-count').textContent = viewCount;
    localStorage.setItem('viewCount', parseInt(viewCount) + 1);

    setTimeout(function() {
        localStorage.removeItem('viewCount');
    }, 5000);
});
