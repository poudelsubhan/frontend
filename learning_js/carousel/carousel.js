window.onload = function() {
    const images = [
        "./images/longexposurewaterfall1.jpg",
        "./images/route66.jpg",
        "./images/archesdrive.jpg",
        "./images/army2.jpg",
        "./images/redwoodupwards2.jpg",
        "./images/solduc2.jpg",
        "./images/truck4scale.jpg"
    ];

    let currentIndex = 0; 
    const imagesLength = images.length;

    const img = document.querySelector('img');
    const next = document.getElementById('next-button');
    const prev = document.getElementById('prev-button');

    const incrementIndex = function() {
        currentIndex = (currentIndex + 1) % imagesLength;
    }

    // same format as above does not seem to work, get image not found error in source
    const decrementIndex = function() {
        currentIndex = currentIndex - 1;
        if (currentIndex < 0) {
            currentIndex = imagesLength - 1;
        }
    }
    
    next.onclick = function() {
        incrementIndex();
        img.src = images[currentIndex];
    }

    prev.onclick = function() {
        decrementIndex();
        img.src = images[currentIndex];
    }
}