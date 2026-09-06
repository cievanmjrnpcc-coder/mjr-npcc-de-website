"use strict";

const CONFIG = {
  navigationOffset: 96,
  revealThreshold: 0.12,
  statisticDuration: 1300,
  toastDuration: 2600
};

const EXPERIENCE_DATA = {
  detail: {
    label: "DETAIL-CHECKER",
    number: "01 / 04",
    title: "A guide must be released today, but one instruction looks questionable.",
    description: "The layout is almost finished. You can make it look polished quickly, but the questionable instruction may affect how others carry out the task.",
    skill: "Judgement & precision",
    priority: "Accuracy before speed",
    correct: "B",
    choices: [
      ["A", "Finish the formatting first and check the instruction only if time remains."],
      ["B", "Clarify the questionable instruction before the guide is released."],
      ["C", "Remove the instruction so the document can still be issued on time."]
    ],
    feedback: {
      A: "Presentation matters, but polishing uncertain content can make an incorrect instruction look more authoritative.",
      B: "Good judgement. An Editor protects accuracy before appearance, especially when the information may affect others.",
      C: "Removing information without confirming why it is there may create a different problem. Clarification should come first."
    }
  },
  system: {
    label: "SYSTEM BUILDER",
    number: "02 / 04",
    title: "An important record cannot be found because everyone stores files differently.",
    description: "You can locate the missing record eventually, but the same problem is likely to happen again unless the underlying process changes.",
    skill: "Organisation & systems thinking",
    priority: "Consistency and continuity",
    correct: "C",
    choices: [
      ["A", "Create more duplicate copies so the record is easier to find next time."],
      ["B", "Ask each person to remember where they keep their own files."],
      ["C", "Introduce a common naming, storage and ownership structure."]
    ],
    feedback: {
      A: "More uncontrolled copies can create version confusion instead of solving the underlying issue.",
      B: "A system that depends on personal memory becomes fragile when people are unavailable or graduate.",
      C: "Correct. A repeatable structure makes information easier to retrieve and easier for future Editors to inherit."
    }
  },
  comms: {
    label: "COMMUNICATOR",
    number: "03 / 04",
    title: "A detailed announcement is technically correct, but younger cadets are struggling to understand it.",
    description: "The information cannot be simplified so much that important details disappear, but it also needs to be usable by the people receiving it.",
    skill: "Clarity & audience awareness",
    priority: "Useful information",
    correct: "A",
    choices: [
      ["A", "Rewrite the message around what the audience needs to know, while preserving the important details."],
      ["B", "Keep the original wording because technically correct information should not be changed."],
      ["C", "Remove most details so the announcement becomes as short as possible."]
    ],
    feedback: {
      A: "Exactly. Good communication is not just correct — it is understandable to the intended audience.",
      B: "Technical correctness is important, but communication still fails if the audience cannot use the information.",
      C: "Shorter is not always clearer. Important details still need to be preserved."
    }
  },
  leader: {
    label: "LEADER",
    number: "04 / 04",
    title: "Two capable Editors submit work using different standards.",
    description: "You could simply correct both outputs yourself, but doing that would not help the team understand what standard should be used next time.",
    skill: "Leadership & coaching",
    priority: "Standards plus development",
    correct: "B",
    choices: [
      ["A", "Correct both pieces yourself and send them back without explanation."],
      ["B", "Review the differences with both Editors and clarify the common standard."],
      ["C", "Accept both versions because each Editor has their own style."]
    ],
    feedback: {
      A: "The immediate output improves, but the Editors do not learn how to prevent the same inconsistency.",
      B: "Best choice. You solve the current issue while also strengthening the team's shared understanding.",
      C: "Individual style has a place, but official Editorial standards should remain consistent when consistency matters."
    }
  }
};

const FOUNDERS = {
  evan: {
    tag: "FOUNDING LEAD",
    name: "Evan Huang",
    role: "Chief Editor",
    profile: "Founding leadership · Editorial EXCO · Team Direction, Standards and Long-Term Development.",
    message: "You do not need to know everything. Be willing to ask questions, learn from feedback and contribute when you can."
  },
  megan: {
    tag: "FOUNDING LEAD",
    name: "Megan Yeo",
    role: "Deputy Chief Editor",
    profile: "Founding leadership · Editorial EXCO · Team Coordination and Team Development.",
    message: "Never ever ever ever give up. Because who knows, one day you'll finally be able to achieve your goals."
  },
  waidong: {
    tag: "EDITORIAL & COMMUNICATIONS",
    name: "Goh Wai Dong",
    role: "Assistant Chief Editor",
    profile: "Editorial EXCO · Document and Communication Editors, Quality Standards and Communication work.",
    message: "Don't be afraid to make mistakes as it helps you grow."
  },
  kezia: {
    tag: "SYSTEMS & DEVELOPMENT",
    name: "Kezia Zheng",
    role: "Assistant Chief Editor",
    profile: "Editorial EXCO · Database Editors, Support Specialists, Systems and Capability development.",
    message: "Small steps takes you very far."
  },
  averyl: {
    tag: "FOUNDING MEMBER",
    name: "Averyl Yeo",
    role: "Document Editor",
    profile: "Editorial & Communications branch · Founding Document Editor.",
    message: "Be the change that you wish to see in the world."
  },
  yuna: {
    tag: "FOUNDING MEMBER",
    name: "Yuna Goh",
    role: "Document Editor",
    profile: "Editorial & Communications branch · Founding Document Editor.",
    message: "You only live once. But if you do it right, once is enough."
  },
  andrea: {
    tag: "FOUNDING MEMBER",
    name: "Andrea Lim",
    role: "Document Editor",
    profile: "Editorial & Communications branch · Founding Document Editor.",
    message: "Make the most out of every opportunity, if you don't try, you'll never know."
  },
  caroline: {
    tag: "FOUNDING MEMBER",
    name: "Caroline Ow",
    role: "Communication Editor",
    profile: "Editorial & Communications branch · Founding Communication Editor.",
    message: "Work hard in your studies to achieve your goals."
  },
  hongyee: {
    tag: "FOUNDING MEMBER",
    name: "Chua Hong Yee",
    role: "Database Editor",
    profile: "Systems & Development branch · Founding Database Editor.",
    message: "Always think positively in every situation and keep learning."
  },
  danysh: {
    tag: "FOUNDING MEMBER",
    name: "Danysh Syafa'el",
    role: "Support Specialist",
    profile: "Systems & Development branch · Founding Support Specialist.",
    message: "Keep putting effort."
  },
  haozhe: {
    tag: "FOUNDING MEMBER",
    name: "Chen Hao Zhe",
    role: "Support Specialist",
    profile: "Systems & Development branch · Founding Support Specialist.",
    message: "N/A"
  }
};

const state = {
  mobileOpen: false,
  currentExperience: "detail"
};

document.addEventListener("DOMContentLoaded", initialiseApplication);

function initialiseApplication() {
  initialiseTheme();
  initialiseLoader();
  initialiseNavigation();
  initialiseScrollProgress();
  initialiseRevealAnimations();
  initialiseStatistics();
  initialiseParallax();
  initialiseExperience();
  initialiseJourney();
  initialiseFounders();
  initialiseFAQ();
  initialiseBackToTop();
  initialiseImageFallbacks();
}


function initialiseTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  /*
    The existing light theme remains the default.
    Dark mode is activated only when the user selects it.
  */
  let theme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";

  const applyTheme = nextTheme => {
    theme = nextTheme === "dark" ? "dark" : "light";

    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    if (toggle) {
      const darkModeActive = theme === "dark";

      toggle.setAttribute("aria-pressed", String(darkModeActive));
      toggle.setAttribute(
        "aria-label",
        darkModeActive ? "Switch to light mode" : "Switch to dark mode"
      );
      toggle.setAttribute(
        "title",
        darkModeActive ? "Switch to light mode" : "Switch to dark mode"
      );
    }

    if (themeMeta) {
      themeMeta.setAttribute(
        "content",
        theme === "dark" ? "#07111f" : "#f6fbff"
      );
    }

    try {
      localStorage.setItem("mjrEditorialTheme", theme);
    } catch (error) {
      // localStorage may be unavailable in some browsing modes.
    }
  };

  /*
    index.html may apply a previously saved dark theme before
    this script loads to prevent a flash of the light theme.
  */
  applyTheme(theme);

  toggle?.addEventListener("click", () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  });
}

function initialiseLoader() {
  const loader = document.getElementById("pageLoader");
  if (!loader) return;
  const hide = () => window.setTimeout(() => loader.classList.remove("active"), 260);
  if (document.readyState === "complete") hide();
  else window.addEventListener("load", hide, { once: true });
}

function initialiseNavigation() {
  document.querySelectorAll('a[href^="#"], [data-scroll-to]').forEach(element => {
    element.addEventListener("click", event => {
      const id = element.dataset.scrollTo || element.getAttribute("href")?.slice(1);
      const target = id && document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - CONFIG.navigationOffset;
      window.scrollTo({ top, behavior: "smooth" });
      closeMobileMenu();
    });
  });

  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  menuToggle?.addEventListener("click", () => state.mobileOpen ? closeMobileMenu() : openMobileMenu());
  mobileNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMobileMenu));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMobileMenu();
      closeFounderModal();
    }
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        updateActiveNavigation(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  const header = document.getElementById("siteHeader");
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", throttle(updateHeader, 60), { passive: true });
}

function openMobileMenu() {
  state.mobileOpen = true;
  document.getElementById("mobileNav")?.classList.add("active");
  document.getElementById("menuToggle")?.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  state.mobileOpen = false;
  document.getElementById("mobileNav")?.classList.remove("active");
  document.getElementById("menuToggle")?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function updateActiveNavigation(sectionID) {
  document.querySelectorAll(".nav-link").forEach(link => {
    const target = link.getAttribute("href")?.slice(1);
    const isActive = target === sectionID ||
      (target === "journey" && ["training", "structure"].includes(sectionID)) ||
      (target === "story" && ["founders", "requirements"].includes(sectionID));
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function initialiseScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  const update = () => {
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const value = max > 0 ? window.scrollY / max : 0;
    if (bar) bar.style.transform = `scaleX(${Math.min(Math.max(value, 0), 1)})`;
  };
  update();
  window.addEventListener("scroll", throttle(update, 20), { passive: true });
  window.addEventListener("resize", debounce(update, 100));
}

function initialiseRevealAnimations() {
  const items = document.querySelectorAll(".reveal, .reveal-up");
  if (!("IntersectionObserver" in window)) {
    items.forEach(item => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: CONFIG.revealThreshold, rootMargin: "0px 0px -45px 0px" });
  items.forEach(item => observer.observe(item));
}

function initialiseStatistics() {
  const numbers = document.querySelectorAll("[data-count]");
  if (!numbers.length) return;

  const animate = element => {
    if (element.dataset.animated === "true") return;
    element.dataset.animated = "true";
    const target = Number(element.dataset.count || 0);
    const start = performance.now();
    const frame = now => {
      const progress = Math.min((now - start) / CONFIG.statisticDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased).toString();
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  if (!("IntersectionObserver" in window)) {
    numbers.forEach(animate);
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animate(entry.target);
    });
  }, { threshold: 0.6 });
  numbers.forEach(number => observer.observe(number));
}

function initialiseParallax() {
  const visual = document.querySelector("[data-parallax]");
  if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  visual.addEventListener("pointermove", event => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visual.style.setProperty("--rx", `${(-y * 2.2).toFixed(2)}deg`);
    visual.style.setProperty("--ry", `${(x * 2.2).toFixed(2)}deg`);
  });
  visual.addEventListener("pointerleave", () => {
    visual.style.setProperty("--rx", "0deg");
    visual.style.setProperty("--ry", "0deg");
  });
}

function initialiseExperience() {
  document.querySelectorAll("[data-experience]").forEach(button => {
    button.addEventListener("click", () => {
      state.currentExperience = button.dataset.experience;
      document.querySelectorAll("[data-experience]").forEach(tab => tab.classList.toggle("active", tab === button));
      renderExperience(state.currentExperience);
    });
  });
  renderExperience(state.currentExperience);
}

function renderExperience(key) {
  const data = EXPERIENCE_DATA[key];
  if (!data) return;
  setText("experienceLabel", data.label);
  setText("experienceNumber", data.number);
  setText("experienceTitle", data.title);
  setText("experienceDescription", data.description);
  setText("experienceSkill", data.skill);
  setText("experiencePriority", data.priority);

  const choices = document.getElementById("experienceChoices");
  const feedback = document.getElementById("experienceFeedback");
  if (!choices || !feedback) return;
  choices.innerHTML = "";
  feedback.hidden = true;
  feedback.className = "experience-feedback";
  feedback.textContent = "";

  data.choices.forEach(([id, text]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.innerHTML = `<span>${id}</span><strong>${escapeHTML(text)}</strong>`;
    button.addEventListener("click", () => {
      choices.querySelectorAll("button").forEach(item => item.disabled = true);
      button.classList.add(id === data.correct ? "correct" : "incorrect");
      const correctButton = [...choices.querySelectorAll("button")].find(item => item.querySelector("span")?.textContent === data.correct);
      correctButton?.classList.add("correct");
      feedback.hidden = false;
      feedback.classList.add(id === data.correct ? "is-correct" : "is-learning");
      feedback.innerHTML = `<strong>${id === data.correct ? "Good judgement" : "Worth reconsidering"}</strong><p>${escapeHTML(data.feedback[id])}</p>`;
    });
    choices.appendChild(button);
  });
}

function initialiseJourney() {
  const section = document.getElementById("journey");
  const steps = [...document.querySelectorAll(".journey-step")];
  const progress = document.getElementById("journeyProgress");
  if (!section || !steps.length || !progress) return;

  const update = () => {
    const rect = section.getBoundingClientRect();
    const viewport = window.innerHeight;
    const raw = (viewport * 0.72 - rect.top) / Math.max(rect.height * 0.64, 1);
    const p = Math.min(Math.max(raw, 0), 1);
    progress.style.width = `${p * 100}%`;
    steps.forEach((step, index) => step.classList.toggle("active", p >= index / (steps.length - 1) - 0.03));
  };
  update();
  window.addEventListener("scroll", throttle(update, 40), { passive: true });
}

function initialiseFounders() {
  document.querySelectorAll("[data-founder]").forEach(button => {
    button.addEventListener("click", () => openFounderModal(button.dataset.founder));
  });
  document.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeFounderModal));
}

function openFounderModal(key) {
  const founder = FOUNDERS[key];
  const modal = document.getElementById("founderModal");
  if (!founder || !modal) return;
  setText("founderModalTag", founder.tag);
  setText("founderModalName", founder.name);
  setText("founderModalRole", founder.role);
  setText("founderModalProfile", founder.profile);
  setText("founderModalMessage", founder.message);
  modal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => modal.classList.add("active"));
  modal.querySelector(".modal-close")?.focus();
}

function closeFounderModal() {
  const modal = document.getElementById("founderModal");
  if (!modal || modal.hidden) return;
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
  window.setTimeout(() => { modal.hidden = true; }, 180);
}

function initialiseFAQ() {
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const open = item?.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(other => {
        if (other === item) return;
        other.classList.remove("open");
        other.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });
      item?.classList.toggle("open", !open);
      button.setAttribute("aria-expanded", String(!open));
    });
  });
}

function initialiseBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;
  const update = () => button.classList.toggle("visible", window.scrollY > 700);
  update();
  window.addEventListener("scroll", throttle(update, 80), { passive: true });
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initialiseImageFallbacks() {
  document.querySelectorAll('img[src="MJR NPCC Logo Transparent.png"]').forEach(img => {
    img.addEventListener("error", () => {
      img.closest(".brand__logo, .visual-logo, .page-loader__orb, .footer-brand")?.classList.add("logo-missing");
      img.style.visibility = "hidden";
    }, { once: true });
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), CONFIG.toastDuration);
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function throttle(fn, wait) {
  let last = 0;
  let timeout = null;
  return (...args) => {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      window.clearTimeout(timeout);
      timeout = null;
      last = now;
      fn(...args);
    } else if (!timeout) {
      timeout = window.setTimeout(() => {
        last = Date.now();
        timeout = null;
        fn(...args);
      }, remaining);
    }
  };
}

function debounce(fn, wait) {
  let timer;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), wait);
  };
}