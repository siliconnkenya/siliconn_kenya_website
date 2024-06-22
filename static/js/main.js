document.addEventListener("DOMContentLoaded", function () {
    const link = document.getElementById("link");
    const socialIconsDiv = document.getElementById("socialIconsDiv");
    const menu = document.getElementById("menu");
    const nav = document.getElementById("nav");
    const menuIcon = document.getElementById("menuIcon");
    const header = document.getElementById("header");
    const personNames = document.querySelectorAll(".person-name");
    const testimonies = document.querySelectorAll(".testimony");
    let currentIndex = 0;
    let autoScrollInterval;

    // Toggle social icons visibility
    link.addEventListener("click", () => {
        if (socialIconsDiv.style.display === "none" || socialIconsDiv.style.display === "") {
            socialIconsDiv.style.display = "flex";
        } else {
            socialIconsDiv.style.display = "none";
        }
    });

    // Toggle nav menu visibility
    menu.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
            if (nav.style.display === "none" || nav.style.display === "") {
                nav.style.display = "block";
                menuIcon.classList.remove("ri-menu-line");
                menuIcon.classList.add("ri-close-line");
            } else {
                nav.style.display = "none";
                menuIcon.classList.remove("ri-close-line");
                menuIcon.classList.add("ri-menu-line");
            }
        }
    });

    // Change header background color on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            header.style.backgroundColor = "black";
        } else {
            header.style.backgroundColor = "transparent";
        }
    });

    // Hide nav menu if window is resized to be wider than 1024px
    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024) {
            nav.style.display = "none";
            menuIcon.classList.remove("ri-close-line");
            menuIcon.classList.add("ri-menu-line");
        }
    });

     // Function to update active person
    function updateActivePerson(index) {
        personNames.forEach((person, i) => {
            if (i === index) {
                person.classList.add("active");
            } else {
                person.classList.remove("active");
            }
        });
    }

    // Function to update active testimony
    function updateActiveTestimony(index) {
        testimonies.forEach((testimony, i) => {
            if (i === index) {
                testimony.classList.add("active");
            } else {
                testimony.classList.remove("active");
            }
        });
    }

    // Function to scroll to a specific testimony
    function scrollToTestimony(index) {
        updateActiveTestimony(index);
        updateActivePerson(index);
    }

    // Function to auto-scroll testimonies
    function autoScroll() {
        currentIndex = (currentIndex + 1) % personNames.length;
        scrollToTestimony(currentIndex);
    }

    // Function to start auto-scroll
    function startAutoScroll() {
        autoScrollInterval = setInterval(autoScroll, 3000); // Change testimony every 3 seconds
    }

    // Function to stop auto-scroll
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Event listeners for person names
    personNames.forEach((person, index) => {
        person.addEventListener("click", () => {
            stopAutoScroll();
            currentIndex = index;
            scrollToTestimony(index);
            startAutoScroll();
        });
    });

    // Initialize the first testimony as active
    scrollToTestimony(currentIndex);
    startAutoScroll();

});
