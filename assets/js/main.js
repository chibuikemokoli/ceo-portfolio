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


