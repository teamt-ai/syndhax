document.addEventListener('DOMContentLoaded', () => {
  // Update Copyright Year dynamically
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Apple Carousel Logic
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot-dash, .dot-btn');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoPlayTimer = null;

  function scrollToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentIndex = index;
    const targetSlide = slides[currentIndex];
    
    track.scrollTo({
      left: targetSlide.offsetLeft,
      behavior: 'smooth'
    });

    updateActiveDot(currentIndex);
  }

  function updateActiveDot(index) {
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  }

  // Button clicks
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      resetAutoplay();
      scrollToSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      resetAutoplay();
      scrollToSlide(currentIndex + 1);
    });
  }

  // Dot clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      resetAutoplay();
      const index = parseInt(dot.dataset.index, 10);
      scrollToSlide(index);
    });
  });

  // Track user swipe / manual scroll
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollPos = track.scrollLeft;
      const slideWidth = track.offsetWidth;
      const newIndex = Math.round(scrollPos / slideWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
        currentIndex = newIndex;
        updateActiveDot(currentIndex);
      }
    }, 50);
  });

  // Autoplay function
  function startAutoplay() {
    autoPlayTimer = setInterval(() => {
      scrollToSlide(currentIndex + 1);
    }, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoPlayTimer);
    startAutoplay();
  }

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
  track.addEventListener('mouseleave', () => startAutoplay());
  track.addEventListener('touchstart', () => clearInterval(autoPlayTimer), { passive: true });
  track.addEventListener('touchend', () => resetAutoplay());

  // Start initial autoplay
  startAutoplay();
});
