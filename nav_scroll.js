document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const topOfNav = nav.offsetTop;

    function fixNav() {
        if (window.scrollY >= topOfNav) {
            document.body.style.paddingTop = nav.offsetHeight + 'px';
            document.body.classList.add('fixed-nav');
        } else {
            document.body.style.paddingTop = 0;
            document.body.classList.remove('fixed-nav');
        }
    }

    window.addEventListener('scroll', fixNav);

    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksList = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('nav-active');
        navLinks.style.maxHeight = isActive ? `${window.innerHeight}px` : '0px'; // Adjust max-height based on viewport height

        navLinksList.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
});
