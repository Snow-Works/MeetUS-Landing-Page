
const hamburgerMenu = document.getElementById("hamburgerMenu");
const navLinks = document.getElementById("navLinks");



// OPEN AND CLOSE MENU

hamburgerMenu.addEventListener("click", () => {

    const isOpen = hamburgerMenu.classList.toggle("active");

    navLinks.classList.toggle("active");

    // Accessibility
    hamburgerMenu.setAttribute("aria-expanded", isOpen);

    hamburgerMenu.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});



// CLOSE MENU WHEN LINK IS CLICKED

const links = navLinks.querySelectorAll("a");

links.forEach(link => {

    link.addEventListener("click", () => {

        hamburgerMenu.classList.remove("active");

        navLinks.classList.remove("active");

        hamburgerMenu.setAttribute("aria-expanded", "false");

        hamburgerMenu.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });

});



// CLOSE WHEN CLICKING OUTSIDE


document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedHamburger =
        hamburgerMenu.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedHamburger &&
        navLinks.classList.contains("active")
    ) {

        hamburgerMenu.classList.remove("active");

        navLinks.classList.remove("active");

        hamburgerMenu.setAttribute("aria-expanded", "false");

        hamburgerMenu.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

});



// CLOSE WITH ESCAPE KEY


document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        navLinks.classList.contains("active")
    ) {

        hamburgerMenu.classList.remove("active");

        navLinks.classList.remove("active");

        hamburgerMenu.setAttribute("aria-expanded", "false");

        hamburgerMenu.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

});




// CAROUSEL SECTION AND FUNCTIONALITIES 

const slides = document.querySelectorAll('.hero-slide');
const indicators= document.querySelectorAll('.hero-indicator');
const heroCarousel = document.getElementById('heroCarousel');

let currentSlide = 0;  // this is indicating which slide is active wether (0, 1, 0r 2)
const totalSlides = 3; // this is indicating the total number of slides we have 
let autoPlayTimer = null; // this will store the timer reference 
let isPaused = false;     // this will be checking if the autoplay is paused




// CORE FUNCTIONING 

// GOING TO SPECIFIC SLIDES

function goToSlide(index) {
    //  Validate the index (prevent errors)
    if (index < 0 || index >= totalSlides) {
        console.warn(`Invalid slide index: ${index}`);
        return;
    }
    
    // Remove 'active' from ALL slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    //  Add 'active' to the target slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    //  Update the current slide tracker
    currentSlide = index;
    
    //  Update ARIA for accessibility
    slides.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', i !== index);
    });
    indicators.forEach((indicator, i) => {
        indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
        indicator.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
}




// NAVIGATION FUNCTION SECTION
// NAVIGATION SECTION 


function nextSlide() {
    // Calculate the next slide index (wrap around to 0 after the last slide)
    const nextIndex = (currentSlide + 1) % totalSlides;
    goToSlide(nextIndex);
}

function prevSlide() {
    // Calculate the previous slide index (wrap around to last slide from 0)
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
}




// AUTO-PLAY FUNCTIONS SECTION 

// AUTO PLAY CODE 


function startAutoPlay() {
    // Clear any existing timer to prevent multiple timers running
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
    
    // Start a new timer
    autoPlayTimer = setInterval(() => {
        if (!isPaused) {
            nextSlide();
        }
    }, 6000);  // 6000ms = 6 seconds
}

function pauseAutoPlay() {
    isPaused = true;
}

function resumeAutoPlay() {
    isPaused = false;
}

function resetAutoPlayTimer() {
    // Clear the current timer
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
    // Start a fresh timer
    startAutoPlay();
}




// INDICATORS MOVEMENT WHEN IT IS CLICKED ON


//  Click on indicators to Go to that slide
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        // Only do something if it's not already the active slide
        if (index !== currentSlide) {
            goToSlide(index);
            resetAutoPlayTimer();  // Reset timer after manual interaction
        }
    });
});

//  Pause on hover
heroCarousel.addEventListener('mouseenter', () => {
    pauseAutoPlay();
});

//  Resume on mouse leave
heroCarousel.addEventListener('mouseleave', () => {
    resumeAutoPlay();
});

//  Touch support for mobile (pause on touch)
heroCarousel.addEventListener('touchstart', () => {
    pauseAutoPlay();
});

heroCarousel.addEventListener('touchend', () => {
    resumeAutoPlay();
});



//  INITIALIZATION 
// MAKING THE CAROUSEL MOVE ONCE THE BROWSER IS OPENED



function initCarousel() {
    // Ensure Slide 1 is active (in case the HTML has changed)
    goToSlide(0);
    
    // Start auto-play
    startAutoPlay();
    
    // Log success
    console.log('🚀 Carousel initialized successfully!');
    console.log(`📊 ${totalSlides} slides loaded`);
    console.log(`⏱️ Auto-play: 6 seconds per slide`);
}

// Start the carousel when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});
