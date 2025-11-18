window.addEventListener("scroll", function() {
     let navbar = this.document.querySelector(".navbar");

     if (this.window.scrollY >= 10) {
          navbar.classList.add("scroll");
     } else {
          navbar.classList.remove("scroll");
     }
});

window.addEventListener("load", function() {
     let loadingScreen = document.getElementById("loadingScreen");
     loadingScreen.classList.add("hidden");

     this.setTimeout(function() {
          loadingScreen.style.display = "none";
     }, 500);
});

let navItems = document.querySelectorAll('.navItem');
let currentPage = window.location.pathname.split('/').pop() || 'home.html';

navItems.forEach(function(item) {
     item.addEventListener('click', function() {
          window.location.href = item.getAttribute('data-page');
     });

     if (item.getAttribute('data-page') === currentPage) {
          item.classList.add('active');
     }
});

function observeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const elementsToAnimate = document.querySelectorAll(`
        .aboutContainer,
        .infoIcon,
        .timezoneContainer > div,
        .contactBox,
        .videoContainer,
        .usernameContainer,
        .landingButton,
        .circle
    `);

    elementsToAnimate.forEach((element, index) => {
        element.classList.add('scrollAnimation');
        setTimeout(() => {
            observer.observe(element);
        }, index * 50);
    });
}

window.addEventListener('load', () => {
    observeScrollAnimations();
});