"use strict";

/* =========================================================
   MJR NPCC
   PROSPECTIVE CADET EXPERIENCE

   index.js

   Rebuilt for the revised website structure.

   Handles:
   - Theme switching
   - Page loader
   - Mobile navigation
   - Smooth scrolling
   - Active navigation state
   - Page scroll progress
   - Reveal animations
   - Development pathway animation
   - Pathway rank activation
   - Repeating animated statistics
   - Hero parallax
   - Interactive editorial scenarios
   - FAQ accordions
   - Back-to-top
   - Toast notifications
========================================================= */


/* =========================================================
   1. CONFIGURATION
========================================================= */

const CONFIG = {

    themeStorageKey:
        "mjr-npcc-theme",

    navigationOffset:
        92,

    mobileBreakpoint:
        1120,

    revealThreshold:
        0.14,

    pathwayActivationPoint:
        0.58,

    toastDuration:
        2800,

    /*
     * Statistics
     *
     * Slower animation than the previous 1200 ms.
     */
    statisticAnimationDuration:
        1800,

    /*
     * Statistics replay every 10 seconds.
     */
    statisticCycleInterval:
        10000

};


/* =========================================================
   2. APPLICATION STATE
========================================================= */

const STATE = {

    menuOpen:
        false,

    currentSection:
        null,

    currentExperience:
        "editor",

    /*
     * Keeps track of statistic replay timers.
     *
     * Element -> interval ID
     */
    statisticIntervals:
        new Map(),

    /*
     * Prevents two statistic animations from running on
     * the same number at exactly the same time.
     */
    statisticAnimating:
        new WeakSet()

};


/* =========================================================
   3. INTERACTIVE EXPERIENCE DATA
========================================================= */

const EXPERIENCE_DATA = {


    /* =====================================================
       EDITOR
    ====================================================== */

    editor: {

        label:
            "EDITOR EXPERIENCE",

        number:
            "01",

        title:
            "You receive a draft that must be issued today.",

        description:
            "The document is mostly complete, but several details appear unclear and the formatting is inconsistent. You need to improve the document while protecting its accuracy.",

        skill:
            "Judgement & precision",

        priority:
            "Accuracy before speed",

        correct:
            "A",

        choices: [

            {
                id: "A",
                text:
                    "Check the unclear information before making major edits."
            },

            {
                id: "B",
                text:
                    "Immediately reformat the entire document first."
            },

            {
                id: "C",
                text:
                    "Send the document because most of it appears correct."
            }

        ],

        feedback: {

            A:
                "Best choice. Confirming unclear information first reduces the risk of producing a polished document that still contains incorrect content.",

            B:
                "Formatting is important, but unclear information should be verified before presentation becomes the priority.",

            C:
                "Sending an unchecked document may allow errors to become part of the official record."

        }

    },


    /* =====================================================
       SYSTEMS
    ====================================================== */

    systems: {

        label:
            "SYSTEMS EXPERIENCE",

        number:
            "02",

        title:
            "A senior member cannot locate an important record.",

        description:
            "You discover that files have been named inconsistently and stored across several different locations. The immediate record must be found, but the larger issue also needs to be prevented from recurring.",

        skill:
            "Organisation & systems thinking",

        priority:
            "Consistency and retrievability",

        correct:
            "B",

        choices: [

            {
                id: "A",
                text:
                    "Create additional duplicate copies of every record."
            },

            {
                id: "B",
                text:
                    "Introduce a standard naming, storage and ownership structure."
            },

            {
                id: "C",
                text:
                    "Ask everyone to remember where they personally saved each file."
            }

        ],

        feedback: {

            A:
                "More uncontrolled copies can create version confusion and make it harder to identify the official record.",

            B:
                "Correct. A repeatable system reduces reliance on individual memory and improves continuity.",

            C:
                "A system should remain usable even when the person who created a record is unavailable."

        }

    },


    /* =====================================================
       LEADER
    ====================================================== */

    leader: {

        label:
            "LEADERSHIP EXPERIENCE",

        number:
            "03",

        title:
            "Two editors submit work using different standards.",

        description:
            "Both members are capable, but each interpreted the required format differently. The immediate work needs correction, while the underlying inconsistency also needs to be addressed.",

        skill:
            "Leadership & coaching",

        priority:
            "Standards plus development",

        correct:
            "C",

        choices: [

            {
                id: "A",
                text:
                    "Correct both documents yourself without explaining the changes."
            },

            {
                id: "B",
                text:
                    "Accept both versions because both editors made an effort."
            },

            {
                id: "C",
                text:
                    "Review the differences with both editors and clarify the common standard."
            }

        ],

        feedback: {

            A:
                "The immediate output improves, but the members do not learn how to prevent the issue next time.",

            B:
                "Accepting inconsistent standards makes future work harder to review and weakens continuity.",

            C:
                "Best choice. You correct the immediate issue while also developing the team's understanding."

        }

    },


    /* =====================================================
       LEGACY
    ====================================================== */

    legacy: {

        label:
            "LEGACY EXPERIENCE",

        number:
            "04",

        title:
            "Your batch is graduating and important knowledge has never been documented.",

        description:
            "Future members will inherit the Editorial Team, but many workflows, decisions and standards currently exist only in the memories of senior editors.",

        skill:
            "Continuity & stewardship",

        priority:
            "Leave the system stronger",

        correct:
            "A",

        choices: [

            {
                id: "A",
                text:
                    "Create handover guides, standards and ownership records."
            },

            {
                id: "B",
                text:
                    "Assume future members will learn everything through trial and error."
            },

            {
                id: "C",
                text:
                    "Keep important information within the graduating batch."
            }

        ],

        feedback: {

            A:
                "Correct. Good continuity allows future editors to inherit usable systems instead of rebuilding them from memory.",

            B:
                "Trial and error may be unavoidable sometimes, but preventable knowledge loss should not become normal.",

            C:
                "Information that cannot be transferred does not support long-term continuity."

        }

    }

};


/* =========================================================
   4. APPLICATION INITIALISATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initialiseApplication
);


function initialiseApplication() {

    initialiseTheme();

    initialisePageLoader();

    initialiseNavigation();

    initialiseMobileNavigation();

    initialiseScrollProgress();

    initialiseRevealAnimations();

    initialiseDevelopmentPathway();

    initialiseStatistics();

    initialiseHeroParallax();

    initialiseInteractiveExperience();

    initialiseAccordions();

    initialiseBackToTop();

    initialiseEditorialEnergy();

    initialiseChapterPulse();

    initialiseWindowSafety();


    requestAnimationFrame(
        () => {

            document.body.classList.add(
                "ready"
            );

        }
    );

}


/* =========================================================
   5. THEME SYSTEM
========================================================= */

function initialiseTheme() {

    const storedTheme =
        localStorage.getItem(
            CONFIG.themeStorageKey
        );


    if (
        storedTheme === "light" ||
        storedTheme === "dark"
    ) {

        applyTheme(
            storedTheme
        );

    }

    else {

        const prefersDark =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;


        applyTheme(
            prefersDark
                ? "dark"
                : "light"
        );

    }


    document
        .querySelectorAll(
            "[data-theme-toggle]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    toggleTheme
                );

            }
        );

}


/* =========================================================
   TOGGLE THEME
========================================================= */

function toggleTheme() {

    const currentTheme =
        document.documentElement
            .dataset
            .theme || "dark";


    const nextTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";


    localStorage.setItem(
        CONFIG.themeStorageKey,
        nextTheme
    );


    applyTheme(
        nextTheme
    );


    showToast(

        nextTheme === "dark"
            ? "Dark appearance enabled."
            : "Light appearance enabled."

    );

}


/* =========================================================
   APPLY THEME
========================================================= */

function applyTheme(theme) {

    document.documentElement
        .dataset
        .theme = theme;


    document
        .querySelectorAll(
            "[data-theme-toggle]"
        )
        .forEach(
            button => {

                button.setAttribute(

                    "aria-label",

                    theme === "dark"
                        ? "Switch to light appearance"
                        : "Switch to dark appearance"

                );

            }
        );

}


/* =========================================================
   6. PAGE LOADER
========================================================= */

function initialisePageLoader() {

    const loader =
        document.getElementById(
            "pageLoader"
        );


    if (!loader) {

        return;

    }


    const hideLoader =
        () => {

            setTimeout(
                () => {

                    loader.classList.remove(
                        "active"
                    );

                },
                280
            );

        };


    if (
        document.readyState ===
        "complete"
    ) {

        hideLoader();

    }

    else {

        window.addEventListener(
            "load",
            hideLoader,
            {
                once: true
            }
        );

    }

}


/* =========================================================
   7. NAVIGATION
========================================================= */

function initialiseNavigation() {


    /* =====================================================
       SMOOTH NAVIGATION
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"], [data-scroll-to]'
        )
        .forEach(
            element => {

                element.addEventListener(
                    "click",
                    event => {

                        const dataTarget =
                            element.dataset
                                .scrollTo;


                        const href =
                            element.getAttribute(
                                "href"
                            );


                        const targetID =

                            dataTarget ||

                            (
                                href &&
                                href.startsWith("#")

                                    ? href.substring(1)

                                    : null
                            );


                        if (!targetID) {

                            return;

                        }


                        const target =
                            document.getElementById(
                                targetID
                            );


                        if (!target) {

                            return;

                        }


                        event.preventDefault();


                        scrollToElement(
                            target
                        );


                        if (
                            STATE.menuOpen
                        ) {

                            closeMobileNavigation();

                        }

                    }
                );

            }
        );


    /* =====================================================
       ACTIVE SECTION TRACKING
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            STATE.currentSection =
                                entry.target.id;


                            updateActiveNavigation(
                                STATE.currentSection
                            );

                        }
                    );

                },

                {

                    rootMargin:
                        "-36% 0px -54% 0px",

                    threshold:
                        0

                }

            );


        sections.forEach(
            section => {

                observer.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

    const header =
        document.getElementById(
            "siteHeader"
        );


    const updateHeader =
        () => {

            if (!header) {

                return;

            }


            header.classList.toggle(

                "scrolled",

                window.scrollY > 18

            );

        };


    updateHeader();


    window.addEventListener(

        "scroll",

        throttle(
            updateHeader,
            60
        ),

        {
            passive: true
        }

    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation(
    sectionID
) {

    document
        .querySelectorAll(
            ".nav-link"
        )
        .forEach(
            link => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                const active =
                    href ===
                    `#${sectionID}`;


                link.classList.toggle(
                    "active",
                    active
                );


                if (active) {

                    link.setAttribute(
                        "aria-current",
                        "page"
                    );

                }

                else {

                    link.removeAttribute(
                        "aria-current"
                    );

                }

            }
        );

}


/* =========================================================
   SCROLL TO ELEMENT
========================================================= */

function scrollToElement(
    element
) {

    const position =

        element
            .getBoundingClientRect()
            .top

        +

        window.pageYOffset

        -

        CONFIG.navigationOffset;


    window.scrollTo({

        top:
            position,

        behavior:
            "smooth"

    });

}


/* =========================================================
   8. MOBILE NAVIGATION
========================================================= */

function initialiseMobileNavigation() {

    const menuButton =
        document.querySelector(
            "[data-menu-toggle]"
        );


    const mobileNav =
        document.querySelector(
            "[data-mobile-nav]"
        );


    if (
        !menuButton ||
        !mobileNav
    ) {

        return;

    }


    menuButton.addEventListener(
        "click",
        () => {

            STATE.menuOpen
                ? closeMobileNavigation()
                : openMobileNavigation();

        }
    );


    mobileNav
        .querySelectorAll(
            "a"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    closeMobileNavigation
                );

            }
        );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                STATE.menuOpen
            ) {

                closeMobileNavigation();

            }

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !STATE.menuOpen
            ) {

                return;

            }


            if (
                mobileNav.contains(
                    event.target
                ) ||
                menuButton.contains(
                    event.target
                )
            ) {

                return;

            }


            closeMobileNavigation();

        }
    );

}


/* =========================================================
   OPEN MOBILE NAVIGATION
========================================================= */

function openMobileNavigation() {

    const menu =
        document.querySelector(
            "[data-mobile-nav]"
        );


    const button =
        document.querySelector(
            "[data-menu-toggle]"
        );


    menu?.classList.add(
        "active"
    );


    button?.setAttribute(
        "aria-expanded",
        "true"
    );


    document.body.classList.add(
        "menu-open"
    );


    STATE.menuOpen =
        true;

}


/* =========================================================
   CLOSE MOBILE NAVIGATION
========================================================= */

function closeMobileNavigation() {

    const menu =
        document.querySelector(
            "[data-mobile-nav]"
        );


    const button =
        document.querySelector(
            "[data-menu-toggle]"
        );


    menu?.classList.remove(
        "active"
    );


    button?.setAttribute(
        "aria-expanded",
        "false"
    );


    document.body.classList.remove(
        "menu-open"
    );


    STATE.menuOpen =
        false;

}


/* =========================================================
   9. TOP SCROLL PROGRESS
========================================================= */

function initialiseScrollProgress() {

    const progressBar =
        document.getElementById(
            "scrollProgress"
        );


    if (!progressBar) {

        return;

    }


    const update =
        () => {

            const documentElement =
                document.documentElement;


            const scrollableHeight =

                documentElement.scrollHeight

                -

                documentElement.clientHeight;


            const progress =

                scrollableHeight > 0

                    ? documentElement.scrollTop /
                    scrollableHeight

                    : 0;


            const safeProgress =
                Math.min(
                    Math.max(
                        progress,
                        0
                    ),
                    1
                );


            progressBar.style.transform =

                `scaleX(${safeProgress})`;

        };


    update();


    window.addEventListener(

        "scroll",

        throttle(
            update,
            20
        ),

        {
            passive: true
        }

    );


    window.addEventListener(

        "resize",

        debounce(
            update,
            100
        )

    );

}


/* =========================================================
   10. REVEAL ANIMATIONS
========================================================= */

function initialiseRevealAnimations() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !revealElements.length
    ) {

        return;

    }


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {

                threshold:
                    CONFIG.revealThreshold,

                rootMargin:
                    "0px 0px -55px 0px"

            }

        );


    revealElements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   11. DEVELOPMENT PATHWAY
========================================================= */

function initialiseDevelopmentPathway() {

    const pathway =
        document.getElementById(
            "developmentPathway"
        );


    const progressFill =
        document.getElementById(
            "pathwayProgressFill"
        );


    const pathwayItems =
        [
            ...document.querySelectorAll(
                "[data-pathway-item]"
            )
        ];


    if (
        !pathway ||
        !progressFill ||
        !pathwayItems.length
    ) {

        return;

    }


    /* =====================================================
       INITIAL REVEAL STATE
    ====================================================== */

    if (
        "IntersectionObserver"
        in window
    ) {

        const itemObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "visible"
                            );


                            itemObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },

                {

                    threshold:
                        0.18,

                    rootMargin:
                        "0px 0px -50px 0px"

                }

            );


        pathwayItems.forEach(
            item => {

                itemObserver.observe(
                    item
                );

            }
        );

    }

    else {

        pathwayItems.forEach(
            item => {

                item.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       SCROLL-FOLLOWING PATHWAY LINE
    ====================================================== */

    const updatePathway =
        () => {

            const pathwayRect =
                pathway
                    .getBoundingClientRect();


            const viewportPoint =

                window.innerHeight

                *

                CONFIG.pathwayActivationPoint;


            const pathwayStart =
                pathwayRect.top;


            const pathwayHeight =
                pathwayRect.height;


            const travelled =

                viewportPoint

                -

                pathwayStart;


            let progress =

                travelled /
                pathwayHeight;


            progress =
                Math.min(
                    Math.max(
                        progress,
                        0
                    ),
                    1
                );


            progressFill.style.height =

                `${progress * 100}%`;


            pathwayItems.forEach(
                item => {

                    const itemRect =
                        item
                            .getBoundingClientRect();


                    const node =
                        item.querySelector(
                            ".pathway-node"
                        );


                    const activationLine =

                        window.innerHeight

                        *

                        CONFIG.pathwayActivationPoint;


                    const active =

                        itemRect.top

                        +

                        Math.min(
                            itemRect.height * 0.25,
                            80
                        )

                        <= activationLine;


                    item.classList.toggle(
                        "pathway-active",
                        active
                    );


                    if (node) {

                        node.classList.toggle(
                            "active",
                            active
                        );

                    }

                }
            );

        };


    updatePathway();


    window.addEventListener(

        "scroll",

        throttle(
            updatePathway,
            18
        ),

        {
            passive: true
        }

    );


    window.addEventListener(

        "resize",

        debounce(
            updatePathway,
            100
        )

    );

}


/* =========================================================
   12. REPEATING STATISTICS
========================================================= */

function initialiseStatistics() {

    const statistics =
        [
            ...document.querySelectorAll(
                "[data-statistic]"
            )
        ];


    if (
        !statistics.length
    ) {

        return;

    }


    /* =====================================================
       REDUCED MOTION
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        statistics.forEach(
            statistic => {

                setStatisticFinalValue(
                    statistic
                );

            }
        );


        return;

    }


    /* =====================================================
       FALLBACK FOR OLDER BROWSERS
    ====================================================== */

    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        statistics.forEach(
            statistic => {

                animateStatistic(
                    statistic
                );


                startStatisticCycle(
                    statistic
                );

            }
        );


        return;

    }


    /* =====================================================
       VISIBILITY OBSERVER
    ====================================================== */

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        const statistic =
                            entry.target;


                        if (
                            entry.isIntersecting
                        ) {

                            /*
                             * Run immediately on first/re-entry.
                             */
                            animateStatistic(
                                statistic
                            );


                            /*
                             * Continue every ten seconds while
                             * the statistic remains visible.
                             */
                            startStatisticCycle(
                                statistic
                            );

                        }

                        else {

                            /*
                             * Stop repeated cycles while the
                             * user is elsewhere on the page.
                             */
                            stopStatisticCycle(
                                statistic
                            );

                        }

                    }
                );

            },

            {

                threshold:
                    0.45,

                rootMargin:
                    "80px 0px 80px 0px"

            }

        );


    statistics.forEach(
        statistic => {

            observer.observe(
                statistic
            );

        }
    );

}


/* =========================================================
   START STATISTIC REPLAY CYCLE
========================================================= */

function startStatisticCycle(
    element
) {

    if (
        STATE.statisticIntervals.has(
            element
        )
    ) {

        return;

    }


    const intervalID =
        window.setInterval(
            () => {

                animateStatistic(
                    element
                );

            },
            CONFIG.statisticCycleInterval
        );


    STATE.statisticIntervals.set(
        element,
        intervalID
    );

}


/* =========================================================
   STOP STATISTIC REPLAY CYCLE
========================================================= */

function stopStatisticCycle(
    element
) {

    const intervalID =
        STATE.statisticIntervals.get(
            element
        );


    if (
        intervalID === undefined
    ) {

        return;

    }


    window.clearInterval(
        intervalID
    );


    STATE.statisticIntervals.delete(
        element
    );

}


/* =========================================================
   SET FINAL STATISTIC VALUE
========================================================= */

function setStatisticFinalValue(
    element
) {

    const target =
        Number(
            element.dataset.statistic
        );


    if (
        Number.isNaN(
            target
        )
    ) {

        return;

    }


    element.textContent =
        target.toLocaleString();

}


/* =========================================================
   ANIMATE STATISTIC
========================================================= */

function animateStatistic(
    element
) {

    const target =
        Number(
            element.dataset.statistic
        );


    if (
        Number.isNaN(
            target
        )
    ) {

        return;

    }


    /*
     * Prevent overlapping animations.
     */
    if (
        STATE.statisticAnimating.has(
            element
        )
    ) {

        return;

    }


    STATE.statisticAnimating.add(
        element
    );


    const duration =
        CONFIG.statisticAnimationDuration;


    const startTime =
        performance.now();


    /*
     * Return the number to zero so the user can
     * clearly see the statistic rolling again.
     */
    element.textContent =
        "0";


    function update(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;


        const rawProgress =
            Math.min(
                elapsed /
                duration,
                1
            );


        /*
         * Smooth ease-out.
         *
         * Fast enough to feel responsive at the beginning,
         * but deliberately slower than the previous version.
         */
        const easedProgress =

            1

            -

            Math.pow(
                1 - rawProgress,
                3
            );


        const value =
            Math.round(
                target *
                easedProgress
            );


        element.textContent =
            value.toLocaleString();


        if (
            rawProgress < 1
        ) {

            requestAnimationFrame(
                update
            );

        }

        else {

            element.textContent =
                target.toLocaleString();


            STATE.statisticAnimating.delete(
                element
            );

        }

    }


    requestAnimationFrame(
        update
    );

}


/* =========================================================
   13. HERO PARALLAX
========================================================= */

function initialiseHeroParallax() {

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;

    }


    if (
        window.innerWidth < 900
    ) {

        return;

    }


    const parallaxElements =
        document.querySelectorAll(
            "[data-parallax]"
        );


    if (
        !parallaxElements.length
    ) {

        return;

    }


    const update =
        () => {

            const pageScroll =
                window.scrollY;


            parallaxElements.forEach(
                element => {

                    const strength =
                        Number(
                            element.dataset.parallax
                            ||
                            0.04
                        );


                    const rect =
                        element
                            .getBoundingClientRect();


                    const absoluteTop =

                        rect.top

                        +

                        pageScroll;


                    const movement =

                        (
                            pageScroll

                            -

                            absoluteTop
                        )

                        *

                        strength;


                    element.style.transform =

                        `translate3d(
                            0,
                            ${movement}px,
                            0
                        )`;

                }
            );

        };


    update();


    window.addEventListener(

        "scroll",

        throttle(
            update,
            25
        ),

        {
            passive: true
        }

    );

}


/* =========================================================
   14. INTERACTIVE EXPERIENCE
========================================================= */

function initialiseInteractiveExperience() {

    const experienceButtons =
        document.querySelectorAll(
            "[data-experience]"
        );


    if (
        !experienceButtons.length
    ) {

        return;

    }


    experienceButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const experience =
                        button.dataset.experience;


                    if (
                        !EXPERIENCE_DATA[
                            experience
                        ]
                    ) {

                        return;

                    }


                    experienceButtons.forEach(
                        otherButton => {

                            otherButton.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    STATE.currentExperience =
                        experience;


                    renderExperience(
                        experience
                    );

                }
            );

        }
    );


    renderExperience(
        STATE.currentExperience
    );

}


/* =========================================================
   RENDER EXPERIENCE
========================================================= */

function renderExperience(
    experienceID
) {

    const data =
        EXPERIENCE_DATA[
            experienceID
        ];


    const panel =
        document.getElementById(
            "experiencePanel"
        );


    if (
        !data ||
        !panel
    ) {

        return;

    }


    panel.classList.add(
        "switching"
    );


    setTimeout(
        () => {

            setText(
                "experienceLabel",
                data.label
            );


            setText(
                "experienceNumber",
                data.number
            );


            setText(
                "experienceTitle",
                data.title
            );


            setText(
                "experienceDescription",
                data.description
            );


            setText(
                "experienceSkill",
                data.skill
            );


            setText(
                "experiencePriority",
                data.priority
            );


            renderScenarioChoices(
                data
            );


            panel.classList.remove(
                "switching"
            );

        },
        170
    );

}


/* =========================================================
   RENDER SCENARIO CHOICES
========================================================= */

function renderScenarioChoices(
    data
) {

    const container =
        document.getElementById(
            "scenarioActions"
        );


    const feedback =
        document.getElementById(
            "scenarioFeedback"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    if (feedback) {

        feedback.textContent =
            "";

    }


    data.choices.forEach(
        choice => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.dataset
                .scenarioChoice =
                choice.id;


            button.innerHTML =

                `
                    <span class="scenario-choice-letter">
                        ${choice.id}
                    </span>

                    <span class="scenario-choice-text">
                        ${choice.text}
                    </span>
                `;


            button.addEventListener(
                "click",
                () => {

                    evaluateScenarioChoice(

                        button,

                        choice.id,

                        data

                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   EVALUATE SCENARIO CHOICE
========================================================= */

function evaluateScenarioChoice(
    selectedButton,
    choiceID,
    data
) {

    const container =
        document.getElementById(
            "scenarioActions"
        );


    const feedback =
        document.getElementById(
            "scenarioFeedback"
        );


    if (!container) {

        return;

    }


    const buttons =
        container.querySelectorAll(
            "button"
        );


    buttons.forEach(
        button => {

            button.classList.remove(
                "correct",
                "incorrect"
            );

        }
    );


    if (
        choiceID ===
        data.correct
    ) {

        selectedButton.classList.add(
            "correct"
        );

    }

    else {

        selectedButton.classList.add(
            "incorrect"
        );


        const correctButton =
            container.querySelector(

                `[data-scenario-choice="${data.correct}"]`

            );


        correctButton?.classList.add(
            "correct"
        );

    }


    if (feedback) {

        feedback.textContent =
            data.feedback[
                choiceID
            ];

    }

}


/* =========================================================
   15. FAQ ACCORDIONS
========================================================= */

function initialiseAccordions() {

    document
        .querySelectorAll(
            "[data-accordion-button]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const item =
                            button.closest(
                                "[data-accordion]"
                            );


                        const content =
                            item?.querySelector(
                                "[data-accordion-content]"
                            );


                        if (
                            !item ||
                            !content
                        ) {

                            return;

                        }


                        const open =
                            item.classList.toggle(
                                "open"
                            );


                        button.setAttribute(

                            "aria-expanded",

                            String(open)

                        );


                        content.style.maxHeight =

                            open

                                ? `${content.scrollHeight}px`

                                : "0px";

                    }
                );

            }
        );

}


/* =========================================================
   16. BACK TO TOP
========================================================= */

function initialiseBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });

        }
    );


    const update =
        () => {

            button.classList.toggle(

                "visible",

                window.scrollY > 650

            );

        };


    update();


    window.addEventListener(

        "scroll",

        throttle(
            update,
            70
        ),

        {
            passive: true
        }

    );

}


/* =========================================================
   17. TOAST NOTIFICATIONS
========================================================= */

function showToast(
    message,
    duration = CONFIG.toastDuration
) {

    const container =
        document.getElementById(
            "toastContainer"
        );


    if (!container) {

        return;

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast";


    toast.textContent =
        message;


    container.appendChild(
        toast
    );


    requestAnimationFrame(
        () => {

            toast.classList.add(
                "visible"
            );

        }
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "visible"
            );


            setTimeout(
                () => {

                    toast.remove();

                },
                260
            );

        },
        duration
    );

}


/* =========================================================
   18. WINDOW SAFETY
========================================================= */

function initialiseWindowSafety() {


    /* =====================================================
       CLOSE MOBILE MENU WHEN RETURNING TO DESKTOP
    ====================================================== */

    window.addEventListener(

        "resize",

        debounce(
            () => {

                if (

                    window.innerWidth >
                    CONFIG.mobileBreakpoint

                    &&

                    STATE.menuOpen

                ) {

                    closeMobileNavigation();

                }

            },
            100
        )

    );


    /* =====================================================
       RECALCULATE OPEN ACCORDION HEIGHTS
    ====================================================== */

    window.addEventListener(

        "resize",

        debounce(
            () => {

                document
                    .querySelectorAll(
                        ".accordion-item.open"
                    )
                    .forEach(
                        item => {

                            const content =
                                item.querySelector(
                                    "[data-accordion-content]"
                                );


                            if (content) {

                                content.style.maxHeight =

                                    `${content.scrollHeight}px`;

                            }

                        }
                    );

            },
            150
        )

    );


    /* =====================================================
       CLEAN STATISTIC INTERVALS WHEN PAGE IS UNLOADED
    ====================================================== */

    window.addEventListener(
        "pagehide",
        () => {

            STATE.statisticIntervals
                .forEach(
                    intervalID => {

                        window.clearInterval(
                            intervalID
                        );

                    }
                );


            STATE.statisticIntervals.clear();

        }
    );

}


/* =========================================================
   19. HELPER — SET TEXT
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   20. HELPER — DEBOUNCE
========================================================= */

function debounce(
    callback,
    delay = 150
) {

    let timeoutID;


    return (
        ...argumentsReceived
    ) => {

        clearTimeout(
            timeoutID
        );


        timeoutID =
            setTimeout(
                () => {

                    callback(
                        ...argumentsReceived
                    );

                },
                delay
            );

    };

}


/* =========================================================
   21. HELPER — THROTTLE
========================================================= */

function throttle(
    callback,
    delay = 60
) {

    let waiting =
        false;


    let queuedArguments =
        null;


    return (
        ...argumentsReceived
    ) => {

        if (waiting) {

            queuedArguments =
                argumentsReceived;

            return;

        }


        callback(
            ...argumentsReceived
        );


        waiting =
            true;


        setTimeout(
            () => {

                waiting =
                    false;


                if (
                    queuedArguments
                ) {

                    const latestArguments =
                        queuedArguments;


                    queuedArguments =
                        null;


                    callback(
                        ...latestArguments
                    );

                }

            },
            delay
        );

    };

}


/* =========================================================
   22. BASIC ERROR REPORTING
========================================================= */

window.addEventListener(
    "error",
    event => {

        console.error(

            "MJR NPCC frontend error:",

            event.error ||
            event.message

        );

    }
);


window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(

            "Unhandled frontend promise:",

            event.reason

        );

    }
);


/* =========================================================
   END OF INDEX.JS
========================================================= */


/* =========================================================
   EDITORIAL ENERGY
   Lightweight visual interactions for the prospective site.
========================================================= */

function initialiseEditorialEnergy() {

    const reducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cards =
        document.querySelectorAll(
            ".feature-card, .training-card, .ability-card, " +
            ".specialisation-card, .value-card, .hero-main-card"
        );

    cards.forEach(card => {

        card.setAttribute(
            "data-energy-tilt",
            ""
        );

        if (reducedMotion) {
            return;
        }

        card.addEventListener(
            "pointermove",
            event => {

                if (
                    event.pointerType === "touch" ||
                    window.innerWidth < 900
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) / rect.width;

                const y =
                    (event.clientY - rect.top) / rect.height;

                const rotateY =
                    (x - 0.5) * 2.2;

                const rotateX =
                    (0.5 - y) * 2.2;

                card.style.transform =
                    `perspective(900px) rotateX(${rotateX}deg) ` +
                    `rotateY(${rotateY}deg) translateY(-4px)`;

            }
        );

        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    const energyWords =
        document.querySelectorAll(
            ".hero-energy-words span"
        );

    if (
        !reducedMotion &&
        energyWords.length
    ) {

        window.addEventListener(
            "pointermove",
            throttle(
                event => {

                    const x =
                        (event.clientX / window.innerWidth - 0.5);

                    const y =
                        (event.clientY / window.innerHeight - 0.5);

                    energyWords.forEach(
                        (word, index) => {

                            const strength =
                                5 + index * 1.8;

                            word.style.marginLeft =
                                `${x * strength}px`;

                            word.style.marginTop =
                                `${y * strength}px`;

                        }
                    );

                },
                30
            ),
            {
                passive: true
            }
        );

    }

}


/* =========================================================
   CHAPTER PULSE
   Gives each main section a subtle "arrival" state so the
   long page feels like a guided journey.
========================================================= */

function initialiseChapterPulse() {

    const chapters =
        document.querySelectorAll(
            "main section[data-chapter]"
        );

    if (!chapters.length) {
        return;
    }

    if (
        !("IntersectionObserver" in window)
    ) {

        chapters.forEach(
            chapter =>
                chapter.classList.add(
                    "chapter-visible"
                )
        );

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        entry.target.classList.toggle(
                            "chapter-visible",
                            entry.isIntersecting
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-18% 0px -54% 0px",
                threshold:
                    0
            }
        );

    chapters.forEach(
        chapter =>
            observer.observe(
                chapter
            )
    );

}

