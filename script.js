// Guide JavaScript

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menuButton");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    // Open / close sidebar
    if (menuButton) {
        menuButton.addEventListener("click", () => {
            sidebar.classList.toggle("open");

            if (overlay) {
                overlay.classList.toggle("visible");
            }
        });
    }

    // Close sidebar when overlay is clicked
    if (overlay) {
        overlay.addEventListener("click", () => {
            sidebar.classList.remove("open");
            overlay.classList.remove("visible");
        });
    }

    // Sidebar navigation
    const guideLinks = document.querySelectorAll("[data-section]");

    guideLinks.forEach(link => {
        link.addEventListener("click", () => {

            const sectionId = link.getAttribute("data-section");
            const section = document.getElementById(sectionId);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            // Close sidebar on mobile
            sidebar.classList.remove("open");

            if (overlay) {
                overlay.classList.remove("visible");
            }
        });
    });

    // Highlight the current section while scrolling
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    guideLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink =
                        document.querySelector(
                            `[data-section="${entry.target.id}"]`
                        );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }
            });
        },
        {
            rootMargin: "-20% 0px -60% 0px"
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });

    // Back-to-top button
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
