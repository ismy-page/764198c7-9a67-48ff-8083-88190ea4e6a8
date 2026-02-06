(() => {
  // Year stamp
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Smooth scroll for on-page anchors
  const internalLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
  internalLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Move focus for accessibility if the target is focusable
        if (target instanceof HTMLElement) {
          const prevTabIndex = target.getAttribute("tabindex");
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          // Restore tabindex after focus shift
          setTimeout(() => {
            if (prevTabIndex === null) target.removeAttribute("tabindex");
            else target.setAttribute("tabindex", prevTabIndex);
          }, 0);
        }
      }
    });
  });

  // FAQ accordion behavior
  const faqButtons = Array.from(document.querySelectorAll(".faq-q"));
  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const id = btn.getAttribute("aria-controls");
      const panel = id ? document.getElementById(id) : null;
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) {
        if (expanded) {
          panel.hidden = true;
        } else {
          panel.hidden = false;
        }
      }
    });
  });

  // CTA pulse nudge
  const pulse = () => {
    const el = document.querySelector(".pulse-target");
    if (!el) return;
    el.classList.add("is-pulsing");
    setTimeout(() => el.classList.remove("is-pulsing"), 1600);
  };
  // Nudge a few seconds after load, then occasionally
  window.setTimeout(pulse, 1800);
  window.setInterval(pulse, 14000);

  // Simple parallax for hero floaters
  const floaters = document.querySelectorAll(".floater");
  const onScroll = () => {
    const y = window.scrollY || 0;
    floaters.forEach((el, idx) => {
      const speed = (idx + 1) * 0.08;
      el.style.transform = `translateY(${y * speed * -0.2}px)`;
    });
  };
  document.addEventListener("scroll", onScroll, { passive: true });

  // Mock newsletter submit
  const newsForm = document.querySelector(".newsletter");
  const newsMsg = document.getElementById("newsMsg");
  if (newsForm && newsMsg) {
    newsForm.addEventListener("submit", () => {
      newsMsg.textContent = "Thanks for subscribing! We'll share seasonal dates and tips.";
    });
  }
})();

