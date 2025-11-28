// * This script is part of a website's main JavaScript functionality.
// It handles various UI interactions, animations, and features such as mobile navigation,
// scroll effects, preloader management, and more.      
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });


  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// Navigation drop down menu bar to display 100% 


document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown > ul'); // Select all dropdown ULs

  dropdowns.forEach(dropdown => {
      const parentDropdownLi = dropdown.parentElement; // Get the parent LI of the dropdown

      parentDropdownLi.addEventListener('mouseenter', function() { // Or 'click' if you prefer click-to-open dropdowns
          const dropdownRect = dropdown.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const dropdownBottom = dropdownRect.bottom;
      
          if (dropdownBottom > viewportHeight) {
              const overflowHeight = dropdownBottom - viewportHeight;
      
              // Adjust dropdown positioning to prevent flickering
              dropdown.style.transform = `translateY(-${overflowHeight + 10}px)`; // Use transform for smoother adjustment
          } else {
              dropdown.style.transform = ''; // Reset transform if no overflow
          }
      });

      parentDropdownLi.addEventListener('mouseleave', function() { // Optional: Reset position on mouseleave
          dropdown.style.top = ''; // Reset top to default on mouse leave
          dropdown.style.bottom = ''; // Reset bottom if used upwards opening
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Add click handler for event cards
    document.querySelectorAll('.archive-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.view-more')) {
                const eventId = this.dataset.eventId;
                showEventDetails(eventId);
            }
        });
    });
    
    // Add click handler for "View Details" links
    document.querySelectorAll('.view-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = this.closest('.archive-card').dataset.eventId;
            showEventDetails(eventId);
        });
    });
    
    function showEventDetails(eventId) {
        const event = pastEvents.find(e => e.id == eventId);
        if (!event) return;
        
        const detailsContainer = document.getElementById('event-details-container');
        detailsContainer.innerHTML = `
            <div class="event-details-content">
                <h2>${event.title}</h2>
                <div class="event-meta">
                    <span><i class="bi bi-calendar"></i> ${event.date}</span>
                    <span><i class="bi bi-clock"></i> ${event.time}</span>
                    <span><i class="bi bi-geo-alt"></i> ${event.location}</span>
                </div>
                <div class="event-image" style="background-image: url('${event.image}')"></div>
                <p>${event.description}</p>
                <p><strong>Attendees:</strong> ${event.attendees}</p>
            </div>
        `;
        detailsContainer.style.display = 'block';
        
        // Scroll to details
        detailsContainer.scrollIntoView({ behavior: 'smooth' });
    }
});

// Add new Recent Events :

// Event Portfolio Functionality

function initEventPortfolio() {
    // Only run if we're on the events page
    if (!document.querySelector('.portfolio-details')) return;

    const sections = [
        // Recent Events
        'portfolio-details-1',
        'portfolio-details-2',
        'portfolio-details-3',
        'portfolio-details-4', 
        'portfolio-details-5',
        'portfolio-details-6',
        'portfolio-details-7',
        'portfolio-details-8',
        'portfolio-details-9',
        'portfolio-details-10',
        'portfolio-details-11',
        'portfolio-details-12',
        'portfolio-details-13',
        'portfolio-details-14', 
        'portfolio-details-15',
        'portfolio-details-16',
        'portfolio-details-17',
        'portfolio-details-18',
        // New Events
        'portfolio-details-81',
        'portfolio-details-82',
        'portfolio-details-83',
        'portfolio-details-84', 
        'portfolio-details-85',
        'portfolio-details-86',
        'portfolio-details-87',
        'portfolio-details-88',
        'portfolio-details-89',
        'portfolio-details-90',
        'portfolio-details-91',
        'portfolio-details-92',
        'portfolio-details-93',
        'portfolio-details-94', 
        'portfolio-details-95',
        'portfolio-details-96',
        'portfolio-details-97',
        'portfolio-details-98'

    ].map(id => document.getElementById(id));

    function showSectionFromHash() {
        const hash = window.location.hash;
        let shown = false;
        
        sections.forEach(section => {
            if (!section) return;
            const shouldShow = hash ? ('#' + section.id) === hash : section.id === 'portfolio-details-1';
            section.style.display = shouldShow ? '' : 'none';
            if (shouldShow) shown = true;
        });
    }

    // Initialize
    window.addEventListener('hashchange', showSectionFromHash);
    showSectionFromHash();

    // Smooth scrolling
    document.querySelectorAll('.about-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                window.location.hash = this.getAttribute('href');
            }
        });
    });
}

// Run when DOM loads
document.addEventListener('DOMContentLoaded', initEventPortfolio);

// End of Portfolio Events :

// Disable right-click context menu (from index file)
  document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      return false;
  });


//---------------------------------------------------
// Team Slider Initialization
//--------------------------------------------------

// Team Slider Functionality

function initTeamSliders() {
  document.querySelectorAll(".team-details-slider").forEach(slider => {
    const config = JSON.parse(slider.querySelector(".swiper-config").innerHTML.trim());
    new Swiper(slider, {
      ...config,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 40
        },
        1626: {
          slidesPerView: 1,
          spaceBetween: 50
        },
        2536: {
          slidesPerView: 1,
          spaceBetween: 60
        }
      }
    });
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initTeamSliders();
  
  // Show only the section matching the hash
  function showSectionFromHash() {
    const hash = window.location.hash;
    const sections = [
      'team-details-191',
      'team-details-192',
      'team-details-193',
      'team-details-201',
      'team-details-202',
      'team-details-203',
      'team-details-204',
      'team-details-211',
      'team-details-212',
      'team-details-213',
      'team-details-214',
      'team-details-221',
      'team-details-222',
      'team-details-223',
      'team-details-231',
      'team-details-232',
      'team-details-233',
      'team-details-234',
      'team-details-235',
      'team-details-241',
      'team-details-242',
      'team-details-243',
      'team-details-244',
      'team-details-251',
      'team-details-252',
      'team-details-253',
      'team-details-261',
      'team-details-262',
      'team-details-263',
      'team-details-264',
      'team-details-265',
      'team-details-271',
      'team-details-272',
      'team-details-273',
      'team-details-274',
      'team-details-281', 
      'team-details-282',
      'team-details-283',
      'team-details-284',
      'team-details-291',
      'team-details-292',
      'team-details-293',
      'team-details-294',
      'team-details-295',
      'team-details-296',
      'team-details-297',
      'team-details-301',
      'team-details-302',
      'team-details-303', 
      'team-details-304',
      'team-details-311',
      'team-details-312',
      'team-details-313',
      'team-details-314',
      'team-details-315',
      'team-details-316',
      'team-details-391',
      'team-details-392',
      'team-details-393',
      'team-details-394',
      'team-details-395',
      'team-details-396',
      'team-details-397',
      'team-details-398',
      'team-details-399',
      'team-details-401',
      'team-details-402',
      'team-details-403',
      'team-details-404',
      'team-details-405',
      'team-details-406',
      'team-details-407',
      'team-details-411',
      'team-details-412',
      'team-details-413',
      'team-details-451',
      'team-details-452',
      'team-details-453',
      'team-details-454',
      'team-details-455',
      'team-details-456',
      'team-details-457'

    ].map(id => document.getElementById(id));
    
    let shown = false;
    if (hash && hash.startsWith('#team-details-')) {
      sections.forEach(section => {
        if (section) {
          section.style.display = ('#' + section.id) === hash ? '' : 'none';
          if (('#' + section.id) === hash) shown = true;
        }
      });
    }
    if (!shown && sections.length > 0 && sections[0]) {
      sections[0].style.display = '';
    }
  }
  
  window.addEventListener('hashchange', showSectionFromHash);
  showSectionFromHash();
  
  // Smooth scroll for team navigation buttons
  document.querySelectorAll('.about-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        window.location.hash = this.getAttribute('href');
      }
    });
  });
});

/**
 * Init swiper sliders
 */
function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
            swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        if (swiperElement.classList.contains("swiper-tab")) {
            initSwiperWithCustomPagination(swiperElement, config);
        } else {
            new Swiper(swiperElement, config);
        }
    });
}

window.addEventListener("load", initSwiper);

//----------------------------------------------------
// End of Team Slider Initialization
//----------------------------------------------------

// Run when DOM loads
document.addEventListener('DOMContentLoaded', initEventPortfolio);

// End of Portfolio Events :

// Disable right-click context menu (from index file)
  document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      return false;
  });


// footer copyright year to actual date

var copyrightYear =
  document.getElementById('copyright-year');
if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

// footer copyright year to actual date


//<!-- Anti-copy JavaScript -->   

document.addEventListener('DOMContentLoaded', function() {
    // Disable text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';

    // Prevent copy, cut, and drag events
    ['copy', 'cut', 'dragstart', 'selectstart'].forEach(function(evt) {
        document.addEventListener(evt, function(e) {
            e.preventDefault();
            return false;
        });
    });

    // Prevent keyboard shortcuts for copy (Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+U, Ctrl+A, etc.)
    document.addEventListener('keydown', function(e) {
        if (
            (e.ctrlKey && ['a', 'c', 'x', 's', 'u'].includes(e.key.toLowerCase())) ||
            (e.metaKey && ['a', 'c', 'x', 's', 'u'].includes(e.key.toLowerCase()))
        ) {
            e.preventDefault();
            return false;
        }
    });
});

//<!-- /Anti-copy JavaScript -->   

// <!-- Below is a JavaScript solution to load the page faster. -->

// Defer non-critical JS and images for faster load
document.addEventListener("DOMContentLoaded", function () {
    // Lazy load images
    document.querySelectorAll('img').forEach(function(img) {
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    });
    // Preload important CSS
    var preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'style';
    preload.href = 'assets/css/main.css';
    document.head.appendChild(preload);
});

// This script is designed to work with the Google Translate widget to persist the selected language across page loads.
// It uses cookies to store the selected language and applies it on page load.
// Note: This is a workaround since the Google Translate widget does not natively support language persistence.
// Ensure this script runs after the Google Translate widget is loaded
// and the DOM is fully loaded to avoid issues with element selection.          
document.addEventListener('DOMContentLoaded', function() {
  // Function to set a cookie
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setDate(date.getDate() + days);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Function to get a cookie
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Check for existing language preference
  var savedLang = getCookie('googtrans');
  if (savedLang) {
    // Wait for Google Translate widget to load
    var interval = setInterval(function() {
      if (typeof google !== 'undefined' && google.translate.TranslateElement) {
        clearInterval(interval);
        var select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = savedLang;
          select.dispatchEvent(new Event('change'));
        }
      }
    }, 100);
  }


// Preloader removal handled below in a single place
  // Listen for changes in the Google Translate dropdown
  var select = document.querySelector('.goog-te-combo');
  if (select) {                                                         
    select.addEventListener('change', function() {
      setCookie('googtrans', this.value, 365); // Store selected language in cookie for 1 year
    });
  }     

});
// End of Google Translate persistence script
// This script initializes various features of the website, including mobile navigation,
// scroll effects, preloader management, and more.
// This script initializes various features of the website, including mobile navigation,          

// scroll effects, preloader management, and more.
// It combines all initialization code into a single event listener for DOMContentLoaded.
// This ensures that all features are initialized after the DOM is fully loaded.    

// This script initializes various features of the website, including mobile navigation,
// scroll effects, preloader management, and more.
// It combines all initialization code into a single event listener for DOMContentLoaded.
// This ensures that all features are initialized after the DOM is fully loaded.
// This script initializes various features of the website, including mobile navigation,          
document.addEventListener('DOMContentLoaded', function() {
  // Combine all initialization code here
  toggleScrolled();
  initToggleScrollTop();
  initMobileNav();
  initScrollTop();
  aosInit();
  initPureCounter();
  initGlightbox();
  initIsotope();
  initSwiper();
  initHashScroll();
  initNavmenuScrollspy();
  initDropdownPositioning();
  initCopyrightYear();
  initGoogleTranslatePersistence();
  initPreloader();
  initLazyLoading();

});

// This script initializes various features of the website, including mobile navigation,
// scroll effects, preloader management, and more.
// It combines all initialization code into a single event listener for DOMContentLoaded.     
// This ensures that all features are initialized after the DOM is fully loaded.
// This script handles the scroll event to toggle a 'scrolled' class on the body element.

        function toggleScrolled() {
            if (window.scrollY > 50) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        }
        
        // Set up event listeners
        window.addEventListener('scroll', toggleScrolled);
        document.addEventListener('DOMContentLoaded', toggleScrolled);


        //* initToggleScrollTop() function initializes a button that scrolls the page to the top when clicked.
        function initToggleScrollTop() {
            const scrollTopButton = document.getElementById('scroll-top');
            
            if (!scrollTopButton) return; // Exit if no scroll-top button exists
            
            // Show/hide button based on scroll position
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) { // Show after 300px scroll
                    scrollTopButton.classList.add('show');
                } else {
                    scrollTopButton.classList.remove('show');
                }
            });
            
            // Smooth scroll to top when clicked
            scrollTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

// It adds the class when the page is scrolled down more than 50 pixels, and removes it when scrolled back up.

function toggleScrolled() {
    if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}

// Debounce function to limit how often toggleScrolled runs
function debounce(func, wait = 10) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}

// Use debounced version for scroll event
window.addEventListener('scroll', debounce(toggleScrolled));

//* initToggleScrollTop() function initializes a button that scrolls the page to the top when clicked.

// Initialize scroll-to-top button
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (!scrollTopBtn) {
        console.warn('Scroll to top button not found');
        return;
    }

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Call this when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollTop();
});

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', initToggleScrollTop);

// Function OF INITMOBILEVIEW ()  
// This function initializes the mobile navigation toggle functionality.
// It adds event listeners to the mobile nav toggle button and handles the opening/closing of the mobile navigation menu.
// It also manages the aria-expanded attribute for accessibility and allows closing the menu when clicking outside or on a link.

function initMobileNav() {
    // Select DOM elements
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    
    // Return early if elements don't exist
    if (!mobileNavToggle || !mobileNav) return;
    
    // Toggle mobile nav when button is clicked
    mobileNavToggle.addEventListener('click', function() {
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle mobile nav visibility
        mobileNav.classList.toggle('active');
        body.classList.toggle('nav-active'); // Optional: prevent body scroll
        
        // Change button icon/text
        this.classList.toggle('is-active');
    });
    
    // Close mobile nav when clicking on a link (optional)
    const navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.classList.remove('is-active');
            body.classList.remove('nav-active');
        });
    });
    
    // Close mobile nav when clicking outside (optional)
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && e.target !== mobileNavToggle) {
            mobileNav.classList.remove('active');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.classList.remove('is-active');
            body.classList.remove('nav-active');
        }
    });
}

// Init scrolltop () 

function initScrollTop(options = {}) {
    // Default options
    const defaults = {
        offset: 300,          // Show after scrolling this many pixels
        speed: 500,           // Scroll duration in ms
        easing: 'easeInOut',  // Easing function
        btnClass: 'scroll-top-btn',
        btnContent: '↑',
        btnPosition: { bottom: '30px', right: '30px' }
    };
    
    // Merge options with defaults
    const config = { ...defaults, ...options };
  
   
    // Smooth scroll function
    function smoothScrollToTop(duration) {
        const start = window.pageYOffset;
        const startTime = performance.now();
        
        function scrollStep(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easing = easeInOutQuad(progress);
            window.scrollTo(0, start * (1 - easing));
            
            if (progress < 1) {
                window.requestAnimationFrame(scrollStep);
            }
        }
        
        // Easing function
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        
        window.requestAnimationFrame(scrollStep);
    }
    
    // Click handler
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            smoothScrollToTop(config.speed);
        }
    });
    
    // Event listeners
    window.addEventListener('scroll', toggleScrollTopButton);
    toggleScrollTopButton();
}

//* aosinit() function initializes the AOS (Animate On Scroll) library for scroll animations.

function aosInit(customSettings = {}) {
    // Check if AOS is loaded
    if (typeof AOS === 'undefined') {
        console.warn('AOS library is not loaded');
        return;
    }

    // Default settings
    const defaultSettings = {
        offset: 120,
        duration: 400,
        easing: 'ease',
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom',
        disable: window.innerWidth < 768 // Disable on mobile if needed
    };

    // Merge custom settings with defaults
    const settings = { ...defaultSettings, ...customSettings };

    // Initialize with merged settings
    AOS.init(settings);

    // Refresh AOS when new elements are dynamically added
    document.addEventListener('ajaxComplete', AOS.refresh);
    document.addEventListener('load', AOS.refresh); // For lazy-loaded content
}

//* initpurecounter() function initializes the Pure Counter library for counting animations on scroll.

function initPureCounter() {
    // Select all elements with the purecounter class
    const counters = document.querySelectorAll('.purecounter');
    
    // Check if elements exist
    if (!counters || counters.length === 0) return;
    
    // Options with defaults
    const options = {
        start: 0,               // Starting number
        end: 100,               // End number (can be set via data-purecounter-end attribute)
        duration: 2000,         // Animation duration in ms
        delay: 10,             // Delay between increments
        once: true,             // Only animate once
        decimals: 0,            // Number of decimal places
        legacy: true,           // If true, will use setTimeout instead of requestAnimationFrame
        currency: false,        // Show as currency (set via data-purecounter-currency)
        separator: false,       // Use thousand separator (set via data-purecounter-separator)
        selector: '.purecounter' // Element selector
    };
    
    // Initialize each counter
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-purecounter-end') || options.end;
        const duration = +counter.getAttribute('data-purecounter-duration') || options.duration;
        const decimals = +counter.getAttribute('data-purecounter-decimals') || options.decimals;
        const delay = +counter.getAttribute('data-purecounter-delay') || options.delay;
        const separator = counter.getAttribute('data-purecounter-separator') || options.separator;
        const currency = counter.getAttribute('data-purecounter-currency') || options.currency;
        
        animateCounter(counter, target, duration, decimals, delay, separator, currency);
    });
    
    // Counter animation function
    function animateCounter(element, target, duration, decimals, delay, separator, currency) {
        const start = +element.innerText.replace(/[^0-9.-]/g, '') || options.start;
        const increment = (target - start) / (duration / delay);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            
            // Format the number
            let formattedValue;
            if (decimals > 0) {
                formattedValue = current.toFixed(decimals);
            } else {
                formattedValue = Math.floor(current);
            }
            
            // Add thousand separator if needed
            if (separator) {
                formattedValue = formattedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            
            // Add currency symbol if needed
            if (currency) {
                formattedValue = currency + formattedValue;
            }
            
            element.textContent = formattedValue;
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, delay);
    }
    
    // Intersection Observer to trigger on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                // Reinitialize animation if needed
                if (counter.classList.contains('purecounter')) {
                    const target = +counter.getAttribute('data-purecounter-end') || options.end;
                    const duration = +counter.getAttribute('data-purecounter-duration') || options.duration;
                    const decimals = +counter.getAttribute('data-purecounter-decimals') || options.decimals;
                    const delay = +counter.getAttribute('data-purecounter-delay') || options.delay;
                    const separator = counter.getAttribute('data-purecounter-separator') || options.separator;
                    const currency = counter.getAttribute('data-purecounter-currency') || options.currency;
                    
                    animateCounter(counter, target, duration, decimals, delay, separator, currency);
                }
                
                // Unobserve if only animating once
                if (options.once) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all counters
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

//*-------   GLightbox Initialization -------*//

function initGlightbox() {
    // Check if GLightbox is loaded
    if (typeof GLightbox === 'undefined') {
        console.warn('GLightbox library is not loaded');
        return;
    }

    // Initialize with default options
    const lightbox = GLightbox({
        selector: '.glightbox',  // selector for lightbox triggers
        touchNavigation: true,   // enable touch navigation
        loop: true,              // loop through items
        autoplayVideos: false,   // autoplay videos
        moreText: 'See more',    // text for more button
        moreLength: 60,          // length of description before showing more
        closeOnOutsideClick: true, // close when clicking outside
        zoomable: true           // enable zoom for images
    });

    // Optional: Handle events
    lightbox.on('open', () => {
        console.log('Lightbox opened');
    });

    lightbox.on('close', () => {
        console.log('Lightbox closed');
    });
}


// initIsotope()  ----------------------------
// This function initializes the Isotope library for filtering and sorting items on the page.
// It sets up the grid layout, handles filtering buttons, and manages sorting functionality.

function initIsotope() {
    // Check if Isotope is loaded
    if (typeof Isotope === 'undefined') {
        console.warn('Isotope library is not loaded');
        return;
    }

    // Initialize Isotope on container element
    const grid = document.querySelector('.grid');
    if (!grid) return;

    const iso = new Isotope(grid, {
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer'
        },
        percentPosition: true,
        transitionDuration: '0.4s'
    });

    // Filtering functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });
            
            // Update active class on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Sorting functionality (optional)
    const sortButtons = document.querySelectorAll('.sort-button');
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sortBy = this.getAttribute('data-sort-by');
            const sortOrder = this.getAttribute('data-sort-order') || 'asc';
            
            iso.arrange({ 
                sortBy: sortBy,
                sortAscending: sortOrder === 'asc'
            });
            
            // Update active class on buttons
            sortButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle imagesLoaded for proper layout (important for images)
    imagesLoaded(grid).on('progress', function() {
        iso.layout();
    });

    return iso;
}
//*--------------
//*   initHashScroll(); function initializes smooth scrolling to sections based on URL hash.
//*--------------

function initHashScroll() {
    // Select all anchor links with hashes
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Return early if no anchor links found
    if (!anchorLinks.length) return;
    
    // Add click event listeners
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target element's ID
            const targetId = this.getAttribute('href');
            
            // Skip if empty hash or just '#'
            if (targetId === '#' || targetId === '') {
                return;
            }
            
            // Find the target element
            const targetElement = document.querySelector(targetId);
            
            // If target exists, scroll to it
            if (targetElement) {
                e.preventDefault();
                
                // Get the target's position
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                // Get any offset (e.g., for fixed header)
                const offset = parseInt(this.getAttribute('data-offset')) || 0;
                
                // Calculate final position
                const finalPosition = targetPosition - offset;
                
                // Smooth scroll
                window.scrollTo({
                    top: finalPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Handle hash on page load
    window.addEventListener('load', function() {
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => { // Small delay for any layout shifts
                    const offset = 80; // Default offset
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: targetPosition - offset,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    });
}


//* initNavmenuScrollspy(); function initializes scrollspy functionality for the navigation menu.

function initNavmenuScrollspy() {
    // Initialize scrollspy on the navigation menu
    const navMenu = document.querySelector('#mainNav'); // Replace with your nav selector
    const sections = document.querySelectorAll('section'); // Replace with your section selector

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) { // Adjust offset as needed
                currentSection = section.getAttribute('id');
            }
        });

        // Remove active class from all nav items
        const navItems = navMenu.querySelectorAll('a');
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to the current section's nav item
        if (currentSection) {
            const activeNavItem = navMenu.querySelector(`a[href="#${currentSection}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
        }
    });
}

//* -- initDropdownPositioning(); function initializes dropdown positioning for the navigation menu.

function initDropdownPositioning() {
    const dropdowns = document.querySelectorAll('.dropdown'); // Adjust selector as needed

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                // Wait for the dropdown to open (if using Bootstrap)
                setTimeout(() => {
                    positionDropdown(dropdown, menu);
                }, 10);
            });

            // Handle window resize and scroll events
            window.addEventListener('resize', () => positionDropdown(dropdown, menu));
            window.addEventListener('scroll', () => positionDropdown(dropdown, menu), true);
        }
    });
}

function positionDropdown(dropdown, menu) {
    if (!menu.classList.contains('show')) return; // Skip if not open

    const dropdownRect = dropdown.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Reset positioning adjustments
    menu.style.left = '';
    menu.style.right = '';
    menu.style.top = '';
    menu.style.bottom = '';

    // Check if the menu overflows the right edge
    if (dropdownRect.left + menuRect.width > viewportWidth) {
        menu.style.left = 'auto';
        menu.style.right = '0';
    }

    // Check if the menu overflows the bottom edge
    if (dropdownRect.bottom + menuRect.height > viewportHeight) {
        menu.style.top = 'auto';
        menu.style.bottom = '100%';
    }
}

// This script initializes dropdown menus and a scroll-to-top button.
// It adds event listeners for toggling dropdowns and scrolling to the top of the page.
// It also handles the visibility of the scroll-to-top button based on the scroll position.
// It combines all initialization code into a single event listener for DOMContentLoaded.

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown menus
    function initDropdowns() {
        // Use a more specific selector if possible
        const navDropdowns = document.querySelectorAll('.navmenu .dropdown');
        
        navDropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.toggle-dropdown');
            if (toggle) {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    dropdown.classList.toggle('open');
                });
            }
        });
    }

    // Initialize scroll to top button
    function initScrollTop() {
        const scrollTopBtn = document.getElementById('scroll-top');
        if (scrollTopBtn) {
            window.addEventListener('scroll', function() {
                scrollTopBtn.classList.toggle('show', window.scrollY > 300);
            });
            
            scrollTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // Initialize all components
    initDropdowns();
    initScrollTop();
});


// * initCopyrightYear(); function updates the copyright year in the footer to the current year.

function initCopyrightYear() {
    // Get the element containing the copyright year (e.g., a span with ID #copyright-year)
    const copyrightElement = document.querySelector('#copyright-year');

    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = currentYear;

        // Optional: Support a range (e.g., "2020 - 2024")
        const startYear = copyrightElement.getAttribute('data-start-year');
        if (startYear && startYear !== currentYear.toString()) {
            copyrightElement.textContent = `${startYear} - ${currentYear}`;
        }
    }
}

//*------------------------------
//* initPreloader(); function initializes the preloader functionality, removing it after the page loads.
//*-----------------------------


function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return; // Exit if no preloader exists

    // Show preloader immediately
    preloader.style.display = 'flex'; // or 'block' depending on CSS

    // Hide preloader when page finishes loading
    window.addEventListener('load', () => {
        // Add fade-out animation
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';

        // Remove preloader after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Match this delay to the CSS transition time
    });

    // Optional: Force hide after a timeout (fallback)
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 3000); // Fallback after 3 seconds (adjust as needed)
}


//*--------------------
//* initLazyLoading(); function initializes lazy loading for images to improve page load performance.

function initLazyLoading() {
    // Select all elements with data-src or data-srcset attributes
    const lazyElements = document.querySelectorAll('[data-src], [data-srcset]');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        // Create observer with options
        const lazyObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyElement = entry.target;
                    
                    // Handle images
                    if (lazyElement.tagName === 'IMG') {
                        // Load src and srcset if available
                        if (lazyElement.dataset.src) {
                            lazyElement.src = lazyElement.dataset.src;
                        }
                        if (lazyElement.dataset.srcset) {
                            lazyElement.srcset = lazyElement.dataset.srcset;
                        }
                    }
                    // Handle iframes
                    else if (lazyElement.tagName === 'IFRAME') {
                        lazyElement.src = lazyElement.dataset.src;
                    }
                    // Handle background images
                    else if (lazyElement.dataset.bg) {
                        lazyElement.style.backgroundImage = `url(${lazyElement.dataset.bg})`;
                    }
                    
                    // Remove the data attributes to prevent duplicate loading
                    lazyElement.removeAttribute('data-src');
                    lazyElement.removeAttribute('data-srcset');
                    lazyElement.removeAttribute('data-bg');
                    
                    // Stop observing the element
                    observer.unobserve(lazyElement);
                }
            });
        }, {
            rootMargin: '200px', // Load elements 200px before they enter viewport
            threshold: 0.01
        });

        // Observe all lazy elements
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyElements.forEach(element => {
            // Immediately load all elements if no observer support
            if (element.tagName === 'IMG') {
                if (element.dataset.src) element.src = element.dataset.src;
                if (element.dataset.srcset) element.srcset = element.dataset.srcset;
            } else if (element.tagName === 'IFRAME') {
                element.src = element.dataset.src;
            } else if (element.dataset.bg) {
                element.style.backgroundImage = `url(${element.dataset.bg})`;
            }
        });
    }
}

//*------------------------------------
// Safe element selection function

function safeQuerySelectorAll(selector, parent = document) {
  if (!parent) return [];
  
  try {
    return parent.querySelectorAll(selector);
  } catch (error) {
    console.warn(`Error querying for "${selector}":`, error);
    return [];
  }
}

// Add a similar function for single element selection
function safeQuerySelector(selector, parent = document) {
  if (!parent) return null;
  
  try {
    return parent.querySelector(selector);
  } catch (error) {
    console.warn(`Error querying for "${selector}":`, error);
    return null;
  }
}

// Usage example:
const dropdowns = safeQuerySelectorAll('.dropdown');
dropdowns.forEach(el => {
  // Your dropdown code here
  const menu = safeQuerySelector('.dropdown-menu', el);
  if (menu) {
    // Safe to work with the menu
  }
});





// Function to initialize Google Translate persistence
// This function sets a cookie with the selected language and retrieves it on page load.
// It listens for changes in the Google Translate dropdown and updates the cookie accordingly.    

function initGoogleTranslatePersistence() {
  function setCookie(name, value, days) {
    /* existing code */
  }

  function getCookie(name) {
    /* existing code */
  }

  try {
    var savedLang = getCookie('googtrans');
    if (savedLang) {
      var attempts = 0;
      var maxAttempts = 10;
      var interval = setInterval(function() {
        attempts++;
        try {
          if (typeof google !== 'undefined' && google.translate && google.translate.TranslateElement) {
            clearInterval(interval);
            var select = document.querySelector('.goog-te-combo');
            if (select) {
              select.value = savedLang;
              select.dispatchEvent(new Event('change'));
            }
          } else if (attempts >= maxAttempts) {
            clearInterval(interval);
          }
        } catch(e) {
          console.error('Google Translate error:', e);
          clearInterval(interval);
        }
      }, 200);
    }

    // Listen for language changes
    var select = document.querySelector('.goog-te-combo');
    if (select) {
      select.addEventListener('change', function() {
        setCookie('googtrans', this.value, 365);
      });
    }
  } catch (e) {
    console.error('Translation persistence failed:', e);
  }
}


window.addEventListener('load', function () {
  var preloader = document.getElementById('preloader');
  if (preloader) preloader.remove();
});
// 3. Animated removal with opacity transition:
document.addEventListener('DOMContentLoaded', function() {
  var preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
  }
});

// Preloader removal: use only the animated removal for smooth UX
window.addEventListener('load', function () {
  var preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 500);
  }
});
// Function initEventPortfolio() is defined and separately called in a DOMContentLoaded listener,
// but also called again in the final initialization block

// Several overlapping scroll event listeners that could cause performance issues

// Anti-copy and right-click disable functionality is implemented twice with overlapping features


// Clean up Google Translate persistence implementation
function initGoogleTranslatePersistence() {
  // Function to set a cookie
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setDate(date.getDate() + days);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Function to get a cookie
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Check for existing language preference
  var savedLang = getCookie('googtrans');
  if (savedLang) {
    // Wait for Google Translate widget to load
    var interval = setInterval(function() {
      if (typeof google !== 'undefined' && google.translate && google.translate.TranslateElement) {
        clearInterval(interval);
        var select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = savedLang;
          select.dispatchEvent(new Event('change'));
        }
      }
    }, 100);
  }

  // Listen for changes in the Google Translate dropdown and apply mobile styles
  var checkWidgetInterval = setInterval(function() {
    var select = document.querySelector('.goog-te-combo');
    if (select) {
      clearInterval(checkWidgetInterval);
      
      // Add change listener
      select.addEventListener('change', function() {
        setCookie('googtrans', this.value, 365); // Store selected language in cookie for 1 year
      });

      // Apply Mobile Responsive Styles
      const style = document.createElement('style');
      style.innerHTML = `
        .goog-te-combo {
          width: 100% !important;
          max-width: 100% !important;
          margin: 5px 0 !important;
          padding: 8px !important;
          font-size: 14px !important;
          box-sizing: border-box !important;
          height: auto !important;
        }
        #google_translate_element {
          width: 100%;
          overflow: hidden;
          text-align: center;
        }
        .goog-te-gadget {
          width: 100%;
          font-family: inherit !important;
          color: transparent !important; /* Hide 'Powered by Google' text if desired */
        }
        .goog-te-gadget span {
          display: none !important; /* Hide 'Powered by Google' text */
        }
        .goog-te-gadget .goog-te-combo {
          color: #333 !important; /* Reset text color for dropdown */
        }
        /* Hide Google's top frame if it appears */
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, 500);

} // <-- Close initGoogleTranslatePersistence


// End of Google Translate persistence script
                                
//-----------------------------------------------
// Anthem Player Functionality
//-----------------------------------------------
// This script handles the community anthem audio player, including auto-play, lyric highlighting,
// and user interaction for play/pause functionality.
// It ensures the anthem plays smoothly and highlights lyrics in sync with the audio playback.    

document.addEventListener('DOMContentLoaded', function() {
  const anthemAudio = document.getElementById('community-anthem');
  const lyricLines = document.querySelectorAll('.lyric-line');
  
  if (anthemAudio) {
    // Disable download controls and context menu
    anthemAudio.setAttribute('controlsList', 'nodownload');
    anthemAudio.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });

    // Set audio to loop
    anthemAudio.loop = true;
    
    // Auto-play with user interaction fallback
    const playAnthem = () => {
      // Try to play muted first (more likely to be allowed by browsers)
      anthemAudio.muted = false;
      anthemAudio.play().then(() => {
        // Once playing, unmute gradually
        setTimeout(() => {
          anthemAudio.muted = false;
        }, 1000);
      }).catch(e => {
        // Show play button if autoplay fails
        const playBtn = document.createElement('button');
        playBtn.className = 'anthem-play-btn';
        playBtn.innerHTML = '▶ Play Bhavsar Kshatriya Anthem';
        playBtn.style.cssText = `
          display: block;
          margin: 20px auto;
          padding: 12px 30px;
          background: var(--accent-color);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s;
        `;
        playBtn.onmouseover = () => playBtn.style.background = 'color-mix(in srgb, var(--accent-color), transparent 20%)';
        playBtn.onmouseout = () => playBtn.style.background = 'var(--accent-color)';
        playBtn.onclick = () => {
          anthemAudio.play();
          playBtn.remove();
        };
        document.querySelector('.audio-player-container').appendChild(playBtn);
      });
    };
    
    // Try to auto-play on page load
    playAnthem();
    
    // Lyrics highlighting
    anthemAudio.addEventListener('timeupdate', () => {
      const currentTime = anthemAudio.currentTime;
      
      lyricLines.forEach(line => {
        const lineTime = parseFloat(line.dataset.time);
        const nextLine = line.nextElementSibling;
        const nextTime = nextLine ? parseFloat(nextLine.dataset.time) : Number.MAX_VALUE;
        
        if (currentTime >= lineTime && currentTime < nextTime) {
          line.classList.add('active');
        } else {
          line.classList.remove('active');
        }
      });
    });
    
    // Reset lyrics when song ends
    anthemAudio.addEventListener('ended', () => {
      lyricLines.forEach(line => line.classList.remove('active'));
    });
  }
});              

//-----------------------------------------------
// Mobile Responsiveness Enhancements
//-----------------------------------------------

/**
 * Mobile Viewport Height Fix
 * Calculates the real viewport height (excluding browser UI) and sets it as a CSS variable --vh
 * This fixes the "100vh" issue on mobile browsers where the address bar covers content
 * Usage in CSS: height: calc(var(--vh, 1vh) * 100);
 */
function setMobileViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Update on resize and orientation change
window.addEventListener('resize', setMobileViewportHeight);
window.addEventListener('orientationchange', setMobileViewportHeight);
// Initial set
setMobileViewportHeight();

/**
 * Touch Device Detection
 * Adds 'touch-device' class to body for specific CSS targeting
 * Helps prevent sticky hover states on mobile devices
 */
function detectTouchDevice() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    document.body.classList.add('touch-device');
    // Remove hover classes on touch start to prevent sticky hovers
    document.addEventListener('touchstart', function() {}, {passive: true});
  } else {
    document.body.classList.add('no-touch');
  }
}
document.addEventListener('DOMContentLoaded', detectTouchDevice);

/**
 * Responsive Table Wrapper
 * Automatically wraps tables in a scrollable container for mobile screens
 * Ensures data tables don't break the layout width
 */
document.addEventListener('DOMContentLoaded', function() {
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    // Check if already wrapped to avoid duplication
    if (!table.parentElement.classList.contains('table-responsive')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-responsive';
      // Add styles for horizontal scrolling
      wrapper.style.overflowX = 'auto';
      wrapper.style.webkitOverflowScrolling = 'touch'; // Smooth scrolling on iOS
      wrapper.style.marginBottom = '1rem';
      wrapper.style.width = '100%';
      
      // Wrap the table
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
});

/**
 * Orientation Change Handler
 * Refreshes critical layout components (Isotope, Swiper, AOS) when device rotates
 * Ensures layout doesn't break when switching between portrait and landscape
 */
window.addEventListener('orientationchange', function() {
  // Small delay to allow browser layout to settle after rotation
  setTimeout(() => {
    // Refresh AOS animations
    if (typeof AOS !== 'undefined') AOS.refresh();
    
    // Refresh Isotope layouts if they exist
    if (typeof Isotope !== 'undefined') {
      document.querySelectorAll('.isotope-layout').forEach(item => {
        const container = item.querySelector('.isotope-container');
        if (container) {
          const iso = Isotope.data(container);
          if (iso) iso.layout();
        }
      });
    }
    
    // Update Swiper instances
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll('.swiper').forEach(swiperEl => {
        if (swiperEl.swiper) swiperEl.swiper.update();
      });
    }
    
    // Recalculate scroll offsets and sticky headers
    if (typeof toggleScrolled === 'function') toggleScrolled();
    
    // Recalculate mobile viewport height
    setMobileViewportHeight();
  }, 200);
});

