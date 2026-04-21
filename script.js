document.addEventListener("DOMContentLoaded", () => {
  const card1 = document.querySelector(".card-profile");
  const card2 = document.querySelector(".info-card");
  const revealElements = document.querySelectorAll(".reveal");
  const titleSpan = document.querySelector(".title-text");
  const welcomeText = document.querySelector(".welcome-text");
  const bio = document.querySelector(".bio");
  const verif = document.querySelector(".verif");

  const textToType = "Hello! I'm Ejaa";
  const welcomeMsg = "Welcome to my portfolio";
  let container2Finished = false; 

  welcomeText.textContent = welcomeMsg;
  welcomeText.style.opacity = "0";
  card1.style.opacity = "0";
  card1.style.transform = "translateY(20px)";
  card2.style.opacity = "0";
  card2.style.transform = "translateY(20px)";
  verif.style.opacity = "0";
  verif.style.transform = "scale(0.5)";
  bio.style.opacity = "0";

  setTimeout(() => {
    card1.style.transition = "all 0.6s ease";
    card1.style.opacity = "1";
    card1.style.transform = "translateY(0)";
    setTimeout(startTyping, 500);
  }, 300);

  let charIndex = 0;
  function startTyping() {
    if (charIndex < textToType.length) {
      titleSpan.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(startTyping, 60);
    } else {
      showVerif();
    }
  }

  function showVerif() {
    verif.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    verif.style.opacity = "1";
    verif.style.transform = "scale(1)";
    setTimeout(() => {
      welcomeText.style.transition = "opacity 0.5s ease";
      welcomeText.style.opacity = "1";
      expandAndShowBio();
    }, 400);
  }

  function expandAndShowBio() {
    card1.classList.add("expand"); 
    setTimeout(() => {
      bio.style.transition = "opacity 0.6s ease";
      bio.style.opacity = "1";
      showCard2();
    }, 500);
  }

  function showCard2() {
    setTimeout(() => {
      card2.style.transition = "all 0.6s ease";
      card2.style.opacity = "1";
      card2.style.transform = "translateY(0)";
      setTimeout(() => { container2Finished = true; checkScrollOnLoad(); }, 500); 
    }, 300);
  }

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && container2Finished) {
        entry.target.classList.add("active");
        scrollObserver.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => scrollObserver.observe(el));
  function checkScrollOnLoad() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && container2Finished) {
        el.classList.add("active");
      }
    });
  }
});
