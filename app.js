/*(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();*/

(function () {
    // This function runs when the script loads
    function initialize() {
        // Add event listeners to all control buttons
        document.querySelectorAll(".control").forEach(button => {
            button.addEventListener("click", function() {
                // Remove active state from the previously active button and section
                document.querySelector(".active-btn").classList.remove("active-btn");
                document.querySelector(".active").classList.remove("active");

                // Add active state to the clicked button and the corresponding section
                this.classList.add("active-btn");
                document.getElementById(button.dataset.id).classList.add("active");

                // Save the id of the active section in localStorage
                localStorage.setItem('activeSection', button.dataset.id);
            });
        });

        // Toggle theme and save the preference in localStorage
        document.querySelector(".theme-btn").addEventListener("click", () => {
            const body = document.body;
            body.classList.toggle("light-mode");
            localStorage.setItem('theme', body.classList.contains("light-mode") ? "light" : "dark");
        });

        // Set the saved theme on page load
        if (localStorage.getItem('theme') === "light") {
            document.body.classList.add("light-mode");
        }
    }

    // Set up event listeners on page load
    window.addEventListener('DOMContentLoaded', initialize);

    // Save the scroll position in localStorage before the page is unloaded
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('scrollPosition', window.scrollY || window.pageYOffset);
    });

    // Restore the previously active section and scroll position when the page is reloaded
    window.addEventListener('load', function() {
        // Scroll to the saved position
        const savedPosition = localStorage.getItem('scrollPosition');
        if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition, 10));
        }

        // Activate the saved section
        const activeSection = localStorage.getItem('activeSection');
        if (activeSection) {
            document.querySelector(".active").classList.remove("active");
            document.getElementById(activeSection).classList.add("active");
            document.querySelector(".active-btn").classList.remove("active-btn");
            document.querySelector(`.control[data-id="${activeSection}"]`).classList.add("active-btn");
        }
    });
})();

