/*===== SHOW MENU =====*/
const showMenu = (toggleId,navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// Testimonials Data 
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('testimonialSlider');
    const dotsContainer = document.getElementById('dotsContainer');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    let currentIndex = 0;
    let isPlaying = true;
    let touchStartX = null;
    let touchEndX = null;
    const autoPlayInterval = 5000;
    const minSwipeDistance = 50;

    // Create testimonial cards
    testimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = `testimonial-card ${index === 0 ? 'active' : ''}`;

        card.innerHTML = `
      <div class="card-content">
        <p class="quote">"${testimonial.quote}"</p>
        <div class="author">
          ${testimonial.avatarUrl ? `
            <img 
              src="${testimonial.avatarUrl}" 
              alt="${testimonial.name}'s avatar" 
              class="author-avatar"
            />
          ` : ''}
          <div class="author-info">
            <h4>${testimonial.name}</h4>
            <p>${testimonial.title}${testimonial.company ? `, ${testimonial.company}` : ''}</p>
          </div>
        </div>
      </div>
    `;

        slider.appendChild(card);
    });

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active states
        document.querySelectorAll('.testimonial-card').forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });

        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    }

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch events for mobile swipe
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchEndX = null;
    });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        if (!touchStartX || !touchEndX) return;

        const distance = touchStartX - touchEndX;
        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    // Auto-play functionality
    const testimonialSection = document.querySelector('.testimonial-section');

    function startAutoPlay() {
        return setInterval(() => {
            if (isPlaying) nextSlide();
        }, autoPlayInterval);
    }

    let autoPlayTimer = startAutoPlay();

    testimonialSection.addEventListener('mouseenter', () => {
        isPlaying = false;
        clearInterval(autoPlayTimer);
    });

    testimonialSection.addEventListener('mouseleave', () => {
        isPlaying = true;
        autoPlayTimer = startAutoPlay();
    });
});

const testimonials = [
    {
        name: "Peggy Okonedo",
        title: "Founder",
        company: "Words of Hope Foundation",
        quote: "You did an outstanding job on our website, Chibuikem! We received rave reviews from a renowned expert in Brands, Communication, and Media, who was particularly impressed with your design. Your entrepreneurial spirit and dedication to your craft are truly admirable. Your incorporation of African American imagery was a great touch.",
        avatarUrl: "https://wordsofhope.vercel.app/assets/images/Picture1.png?auto=compress&cs=tinysrgb&w=600"
    },
    {
        name: "Chika Ezekaka",
        title: "Astraslide",
        company: "CEO",
        quote: "Chibuikem was exceptional in crafting our company's state of the art website and brand. He delivered a site that's both stunning and functional, tailored to our pool construction focus. I would highly recommend him to any business looking for top - notch web development. He's the real deal",
        avatarUrl: "https://astra-slide.vercel.app/assets/img/astraslide-ceo.jpg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        name: "Chudy Odugwe",
        title: "Interior Designer",
        company: "Lines and Borders",
        quote: "Chibuikem is a rare find in web development - a true gem! He took the time to understand my unique needs and delivered a stunning website that drives real results.His dedication and passion for his work are evident in every detail, from the initial consultation to the final launch.",
        avatarUrl: "https://ceo-dev.vercel.app/assets/img/chudy.jpg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        name: "Emeka Okoli",
        title: "CEO",
        company: "Leadway Support Australia",
        quote: "I couldn't be happier with what Chibuikem has done for my company. Working with him was an absolute pleasure, he maintained positivity and dedication all through the design and development phase. I highly recommend him to anyone seeking a skilled and enthusiastic web developer, 100% recommend!",
        avatarUrl: "https://ceo-dev.vercel.app/assets/img/lwsttp.png?auto=compress&cs=tinysrgb&w=600"
    },
    {
        name: "Tobi Arowona",
        title: "Founder",
        company: "Fifteeen-Thirty Four",
        quote: "Chibuikem brought our brand to life with a stunning website that perfectly captures our essence! His creativity, attention to detail, and expertise in web design are truly impressive. Our new website is not only visually appealing but also user- friendly and optimized for maximum impact.We couldn't be happier with the final result!",
        avatarUrl: "https://ceo-dev.vercel.app/assets/img/toby.jpg?auto=compress&cs=tinysrgb&w=600"
    }
];
/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')

        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== CHANGE BACKGROUND HEADER =====*/ 
function scrollHeader(){
    const header = document.getElementById('header')
    if(this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header')
}
window.addEventListener('scroll',scrollHeader)

/*===== SHOW SCROLL TOP =====*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top')
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll',scrollTop)

/*===== MIXITUP FILTER PORTFOLIO =====*/ 
const mixer = mixitup('.portfolio__container, .portfolioo__container', {
    selectors: {
        target: '.portfolio__content, .portfolioo__content'
    },
    animation: {
        duration: 400
    }
});

/* Link active portfolio */ 
const linkPortfolio = document.querySelectorAll('.portfolio__item')

function activePortfolio(){
    if(linkPortfolio){
        linkPortfolio.forEach(l => l.classList.remove('active-portfolio'))
        this.classList.add('active-portfolio')
    }
}
linkPortfolio.forEach(l => l.addEventListener('click', activePortfolio))

/*===== GSAP ANIMATION =====*/ 
gsap.from('.home__image, .ngg', {opacity: 0, duration: 2, delay:.5, x:60})
gsap.from('.hero-content, .ngh', {opacity: 0, duration: 2, delay:.8, y:25})
gsap.from('.hero-text, .wrapper, .social-list, .logos, .ngb', {opacity: 0, duration: 2, delay:1, y:25, ease:'expo.out', stagger:.2})

gsap.from('.nav__logo, .nav__toggle, .nlg', {opacity: 0, duration: 2, delay:1.5, y:25, ease:'expo.out', stagger:.2})
gsap.from('.nav__item', {opacity: 0, duration: 2, delay:1.8, y:25, ease:'expo.out', stagger:.2})
gsap.from('.home__social-icon', {opacity: 0, duration: 2, delay:2.3, y:25, ease:'expo.out', stagger:.2})


/*----- ANIMATE -----*/
// OVERLAY
gsap.to(".first", 1.5, {delay: .5, top: "-100%", ease: Expo.easeInOut});
gsap.to(".second", 1.5, {delay: .7, top: "-100%", ease: Expo.easeInOut});
gsap.to(".third", 1.5, {delay: .9, top: "-100%", ease: Expo.easeInOut});


// submit to google sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbwxrfwIlehc8vgwqEdH4gTfhGmTzphWIg7g8UpJft_gRLHPXmvvzaIlIS5H7fm28AbqUg/exec'
const form = document.forms['ceo-dev']
const msg = document.getElementById("msg")
  
form.addEventListener('submit', e => {
    e.preventDefault()
//     fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//         .then(response => {
//             msg.innerHTML = "Message Sent Successfully!"
//             setTimeout(function(){
//                 msg.innerHTML = ""
//             },5000)
//             form.reset()
//         })
//         .catch(error => console.error('Error!', error.message))
// })

fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        showPopup("Your submission has been received! I will review it and get back to you within 24 hours.");
        form.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        showPopup("Error sending message. Please try again.", "error");
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
    });

function showPopup(message, className) {
    popupMessage.textContent = message;
    popupMessage.className = className;
    popup.style.display = "block";
    // setTimeout(() => {
    //     popup.style.display = "none";
    // },5000);
}


