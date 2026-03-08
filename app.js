    (() => {
      const htmlEl = document.documentElement;
      const nav = document.getElementById("topnav");
      const backBtn = document.getElementById("backToTop");
      const progressBar = document.getElementById("progress-bar");
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      const themeButtons = [document.getElementById("themeToggle"), document.getElementById("themeToggleLg")];
      const navLinks = Array.from(document.querySelectorAll('#topnav .nav-link[href^="#"]'));
      const form = document.getElementById("contactForm");
      const popup = document.getElementById("popup");
      const popupContent = document.getElementById("popupContent");
      const closePopupBtn = document.getElementById("closePopupBtn");
      const expShell = document.getElementById("expShell");
      const expProgress = document.getElementById("expProgress");
      const expCurrent = document.getElementById("expCurrent");
      const expTotal = document.getElementById("expTotal");
      const expPrev = document.getElementById("expPrev");
      const expNext = document.getElementById("expNext");
      const expAuto = document.getElementById("expAuto");
      const expNodes = Array.from(document.querySelectorAll(".exp-node"));
      const expSlides = Array.from(document.querySelectorAll(".exp-slide"));
      const projDeck = document.getElementById("projDeck");
      const projTabs = Array.from(document.querySelectorAll(".proj-tab"));
      const projPanels = Array.from(document.querySelectorAll(".proj-panel"));
      const skillsLab = document.getElementById("skillsLab");
      const skillTabs = Array.from(document.querySelectorAll(".skill-tab"));
      const skillViews = Array.from(document.querySelectorAll(".skill-view"));

      const setTheme = (theme) => {
        htmlEl.setAttribute("data-theme", theme);
        metaTheme.setAttribute("content", theme === "dark" ? "#0f1113" : "#f7f6f3");
        localStorage.setItem("theme", theme);
        document.querySelectorAll("#themeToggle i, #themeToggleLg i").forEach((icon) => {
          icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
        });
      };

      const closePopup = () => {
        popup.style.opacity = "0";
        setTimeout(() => {
          popup.classList.remove("show");
          popup.style.opacity = "";
          popupContent.classList.remove("animate");
        }, 500);
      };

      const adjustBodyPadding = () => {
        document.body.style.paddingTop = `${nav.offsetHeight}px`;
      };

      const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        progressBar.style.width = `${progress}%`;

        if (window.scrollY > 2) nav.classList.add("elevated");
        else nav.classList.remove("elevated");

        if (window.scrollY > 200) {
          backBtn.style.display = "block";
          backBtn.style.opacity = "1";
        } else {
          backBtn.style.opacity = "0";
          setTimeout(() => { backBtn.style.display = "none"; }, 300);
        }
        updateNavProgress();
      };

      const updateNavProgress = () => {
        if (!navLinks.length) return;
        const markerY = window.scrollY + nav.offsetHeight + 18;
        let activeLink = null;
        let activeSection = null;

        navLinks.forEach((link) => {
          const id = link.getAttribute("href");
          if (!id || !id.startsWith("#")) return;
          const section = document.querySelector(id);
          if (!section) return;
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          const inRange = markerY >= top && markerY < bottom;
          if (inRange) {
            activeLink = link;
            activeSection = section;
          }
        });

        navLinks.forEach((link) => link.style.setProperty("--nav-progress", "50"));
        if (!activeLink || !activeSection) return;

        const sectionTop = activeSection.offsetTop;
        const sectionHeight = Math.max(activeSection.offsetHeight, 1);
        const raw = (markerY - sectionTop) / sectionHeight;
        const percent = Math.min(100, Math.max(0, raw * 100));
        activeLink.style.setProperty("--nav-progress", percent.toFixed(1));
      };

      const initExperienceQuest = () => {
        if (!expShell || !expSlides.length) return;

        let currentIndex = 0;
        let isAnimating = false;
        let isAutoPlaying = true;
        let autoTimer = null;
        const slideStateClasses = ["is-active", "is-enter-left", "is-enter-right", "is-leaving-left", "is-leaving-right"];
        const setVisibleSlides = (visibleIndexes = []) => {
          expSlides.forEach((slide, idx) => {
            slide.style.display = visibleIndexes.includes(idx) ? "block" : "none";
          });
        };

        expTotal.textContent = String(expSlides.length);

        const normalizeSlides = (index) => {
          expSlides.forEach((slide, idx) => {
            slide.classList.remove(...slideStateClasses);
            if (idx === index) slide.classList.add("is-active");
          });
          setVisibleSlides([index]);
        };

        const updateMeta = () => {
          expCurrent.textContent = String(currentIndex + 1);
          expProgress.style.width = `${((currentIndex + 1) / expSlides.length) * 100}%`;
          expPrev.innerHTML = currentIndex === 0
            ? '<i class="bi bi-arrow-left"></i>Loop Back'
            : '<i class="bi bi-arrow-left"></i>Previous';
          expNext.innerHTML = currentIndex === expSlides.length - 1
            ? 'Restart<i class="bi bi-arrow-repeat ms-1"></i>'
            : 'Next<i class="bi bi-arrow-right ms-1"></i>';
          expNodes.forEach((node, idx) => {
            const active = idx === currentIndex;
            node.classList.toggle("is-active", active);
            node.setAttribute("aria-selected", active ? "true" : "false");
          });
        };

        const startAuto = () => {
          clearInterval(autoTimer);
          autoTimer = setInterval(() => {
            goTo((currentIndex + 1) % expSlides.length, 1);
          }, 7000);
        };

        const stopAuto = () => {
          clearInterval(autoTimer);
          autoTimer = null;
        };

        const setAutoState = (enabled) => {
          isAutoPlaying = enabled;
          expAuto.innerHTML = enabled
            ? '<i class="bi bi-lightning-charge"></i>Auto Play On'
            : '<i class="bi bi-pause-circle"></i>Auto Play Off';
          if (enabled) startAuto();
          else stopAuto();
        };

        const goTo = (nextIndex, direction = 1) => {
          if (isAnimating || nextIndex === currentIndex) return;
          isAnimating = true;
          expShell.classList.add("is-switching");

          const currentSlide = expSlides[currentIndex];
          const nextSlide = expSlides[nextIndex];
          setVisibleSlides([currentIndex, nextIndex]);

          currentSlide.classList.remove("is-active");
          currentSlide.classList.add(direction > 0 ? "is-leaving-left" : "is-leaving-right");

          nextSlide.classList.add(direction > 0 ? "is-enter-right" : "is-enter-left");
          requestAnimationFrame(() => {
            nextSlide.classList.add("is-active");
            nextSlide.classList.remove("is-enter-right", "is-enter-left");
          });

          setTimeout(() => {
            currentSlide.classList.remove("is-leaving-left", "is-leaving-right");
            currentIndex = nextIndex;
            normalizeSlides(currentIndex);
            updateMeta();
            isAnimating = false;
            expShell.classList.remove("is-switching");
          }, 430);
        };

        expNodes.forEach((node) => {
          node.addEventListener("click", () => {
            const target = Number(node.dataset.expIndex);
            if (Number.isNaN(target)) return;
            const dir = target > currentIndex ? 1 : -1;
            if (isAutoPlaying) {
              stopAuto();
              startAuto();
            }
            goTo(target, dir);
          });
        });

        expPrev.addEventListener("click", () => {
          if (isAutoPlaying) {
            stopAuto();
            startAuto();
          }
          goTo((currentIndex - 1 + expSlides.length) % expSlides.length, -1);
        });
        expNext.addEventListener("click", () => {
          if (isAutoPlaying) {
            stopAuto();
            startAuto();
          }
          goTo((currentIndex + 1) % expSlides.length, 1);
        });
        expAuto.addEventListener("click", () => setAutoState(!isAutoPlaying));

        expShell.addEventListener("mouseenter", () => {
          if (isAutoPlaying) stopAuto();
        });
        expShell.addEventListener("mouseleave", () => {
          if (isAutoPlaying) startAuto();
        });
        expShell.addEventListener("keydown", (event) => {
          if (event.key === "ArrowLeft") goTo((currentIndex - 1 + expSlides.length) % expSlides.length, -1);
          if (event.key === "ArrowRight") goTo((currentIndex + 1) % expSlides.length, 1);
        });

        const resyncExperienceState = () => {
          stopAuto();
          isAnimating = false;
          normalizeSlides(currentIndex);
          updateMeta();
          if (isAutoPlaying) startAuto();
        };

        updateMeta();
        normalizeSlides(currentIndex);
        setAutoState(true);

        window.addEventListener("pageshow", () => {
          // Browsers may restore stale animation classes from cache; force a clean single-slide render.
          resyncExperienceState();
          requestAnimationFrame(resyncExperienceState);
        });
        document.addEventListener("visibilitychange", () => {
          if (!document.hidden) resyncExperienceState();
        });
      };

      const initProjectDeck = () => {
        if (!projDeck || !projTabs.length || !projPanels.length) return;
        let activeIndex = 0;
        let isSwitching = false;

        const setActive = (nextIndex) => {
          if (isSwitching || nextIndex === activeIndex) return;
          isSwitching = true;

          const direction = nextIndex > activeIndex ? 1 : -1;
          const currentPanel = projPanels[activeIndex];
          const nextPanel = projPanels[nextIndex];

          currentPanel.classList.remove("is-active");
          currentPanel.classList.add(direction > 0 ? "is-leaving-left" : "is-leaving-right");

          nextPanel.classList.add(direction > 0 ? "is-enter-right" : "is-enter-left");
          requestAnimationFrame(() => {
            nextPanel.classList.add("is-active");
            nextPanel.classList.remove("is-enter-right", "is-enter-left");
          });

          setTimeout(() => {
            currentPanel.classList.remove("is-leaving-left", "is-leaving-right");
            activeIndex = nextIndex;
            projTabs.forEach((tab, idx) => {
              const on = idx === activeIndex;
              tab.classList.toggle("is-active", on);
              tab.setAttribute("aria-selected", on ? "true" : "false");
            });
            isSwitching = false;
          }, 430);
        };

        projTabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            const target = Number(tab.dataset.projIndex);
            if (Number.isNaN(target)) return;
            setActive(target);
          });
        });

        projDeck.addEventListener("keydown", (event) => {
          if (event.key === "ArrowRight") setActive((activeIndex + 1) % projPanels.length);
          if (event.key === "ArrowLeft") setActive((activeIndex - 1 + projPanels.length) % projPanels.length);
        });
      };

      const initSkillsLab = () => {
        if (!skillsLab || !skillTabs.length || !skillViews.length) return;

        const setRoleView = (role) => {
          skillTabs.forEach((tab) => {
            const on = tab.dataset.skillRole === role;
            tab.classList.toggle("is-active", on);
            tab.setAttribute("aria-selected", on ? "true" : "false");
          });
          skillViews.forEach((view) => {
            view.classList.toggle("is-active", view.dataset.skillView === role);
          });
        };

        skillTabs.forEach((tab) => {
          tab.addEventListener("click", () => setRoleView(tab.dataset.skillRole));
        });
      };

      document.getElementById("year").textContent = new Date().getFullYear();
      setTheme(localStorage.getItem("theme") || "light");
      adjustBodyPadding();
      handleScroll();

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
      initExperienceQuest();
      initProjectDeck();
      initSkillsLab();

      themeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const nextTheme = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
          setTheme(nextTheme);
        });
      });

      window.addEventListener("load", adjustBodyPadding);
      window.addEventListener("resize", adjustBodyPadding);
      window.addEventListener("scroll", handleScroll);
      backBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
      closePopupBtn.addEventListener("click", closePopup);

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        try {
          const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" }
          });

          if (response.ok) {
            form.reset();
            popup.classList.add("show");
            popupContent.classList.add("animate");
            setTimeout(closePopup, 5000);
          } else {
            alert("Something went wrong. Please try again or email me directly.");
          }
        } catch (error) {
          alert("Network error. Please try again.");
        }
      });
    })();
