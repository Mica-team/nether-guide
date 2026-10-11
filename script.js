// Nether Launcher Guide interactions
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const backToTop = document.getElementById("backToTop");
    const navigationLinks = [...document.querySelectorAll(".navigation a[href^='#']")];

    const closeMenu = () => {
        sidebar?.classList.remove("open");
        overlay?.classList.remove("visible");
        document.body.classList.remove("menu-open");
        menuButton?.setAttribute("aria-expanded", "false");
        menuButton?.setAttribute("aria-label", "Open navigation menu");
    };

    const openMenu = () => {
        sidebar?.classList.add("open");
        overlay?.classList.add("visible");
        document.body.classList.add("menu-open");
        menuButton?.setAttribute("aria-expanded", "true");
        menuButton?.setAttribute("aria-label", "Close navigation menu");
    };

    menuButton?.addEventListener("click", () => {
        sidebar?.classList.contains("open") ? closeMenu() : openMenu();
    });

    overlay?.addEventListener("click", closeMenu);

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
            navigationLinks.forEach((item) => item.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // Track the actual Markdown headings generated from guide.md.
    const observedHeadings = navigationLinks
        .map((link) => document.getElementById(link.dataset.section || link.hash.slice(1)))
        .filter(Boolean);

    if ("IntersectionObserver" in window && observedHeadings.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navigationLinks.forEach((link) => {
                    link.classList.toggle("active", link.hash === "#" + entry.target.id);
                });
            });
        }, { rootMargin: "-18% 0px -70% 0px", threshold: 0 });

        observedHeadings.forEach((heading) => observer.observe(heading));
    }

    const updateBackToTop = () => {
        backToTop?.classList.toggle("show", window.scrollY > 420);
    };
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();

    backToTop?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Escape closes the mobile drawer; resize prevents a stuck overlay.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) closeMenu();
    });
});
