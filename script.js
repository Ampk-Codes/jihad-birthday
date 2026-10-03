const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));

  const target = document.getElementById(id);

  if (!target) return;

  target.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}


/* =========================
   OPEN SURPRISE
   ========================= */

document.getElementById("openBtn").addEventListener("click", () => {

  showScreen("reveal");

  confetti(55);

});


/* =========================
   NEXT BUTTONS
   ========================= */

document.querySelectorAll(".next-btn").forEach(btn => {

  btn.addEventListener("click", () => {

    const nextScreen = btn.dataset.next;

    showScreen(nextScreen);

    if (nextScreen === "finalSection") {
      fireworks();
    }

  });

});


/* =========================
   ENVELOPE / LETTER
   ========================= */

const envelope = document.getElementById("envelope");

const letter = document.getElementById("letter");

const afterLetter =
  document.querySelector(".hidden-after-letter");


envelope.addEventListener("click", () => {

  if (envelope.classList.contains("opened")) {
    return;
  }

  envelope.classList.add("opened");

  envelope
    .querySelector(".envelope")
    .classList.add("open");


  setTimeout(() => {

    letter.classList.add("show");

    afterLetter.classList.add("show");

    envelope
      .querySelector(".tap-hint")
      .textContent =
      "A little letter, just for you ❤️";

  }, 900);

});


/* =========================
   SECRET MESSAGES
   ========================= */

const secretMessage =
  document.getElementById("secretMessage");


document.querySelectorAll(".secret-btn").forEach(btn => {

  btn.addEventListener("click", () => {

    secretMessage.textContent =
      btn.dataset.message;

    secretMessage.classList.remove("show");

    requestAnimationFrame(() => {
      secretMessage.classList.add("show");
    });


    document
      .querySelector(".after-secret")
      .classList.add("show");


    confetti(18);

  });

});


/* =========================
   REPLAY
   ========================= */

document.getElementById("replayBtn")
  .addEventListener("click", () => {

    envelope.classList.remove("opened");

    envelope
      .querySelector(".envelope")
      .classList.remove("open");

    letter.classList.remove("show");

    afterLetter.classList.remove("show");

    secretMessage.classList.remove("show");

    document
      .querySelector(".after-secret")
      .classList.remove("show");


    showScreen("opening");

  });


/* =========================
   BACKGROUND PARTICLES
   ========================= */

const particles =
  document.getElementById("particles");


for (let i = 0; i < 55; i++) {

  const p = document.createElement("span");

  p.className = "particle";

  p.style.left =
    Math.random() * 100 + "%";

  p.style.animationDuration =
    (7 + Math.random() * 12) + "s";

  p.style.animationDelay =
    (-Math.random() * 15) + "s";

  p.style.opacity =
    (.15 + Math.random() * .65);

  p.style.width =
    p.style.height =
    (1 + Math.random() * 3) + "px";


  particles.appendChild(p);

}


/* =========================
   CONFETTI
   ========================= */

function confetti(count = 35) {

  for (let i = 0; i < count; i++) {

    const p = document.createElement("span");

    p.className = "particle";

    p.style.left =
      (45 + Math.random() * 10) + "%";

    p.style.bottom = "10%";

    p.style.width =
      (3 + Math.random() * 5) + "px";

    p.style.height =
      (3 + Math.random() * 8) + "px";

    p.style.borderRadius = "1px";

    p.style.background = [
      "#ff4f91",
      "#ffd166",
      "#9d7cff",
      "#ffffff",
      "#6fffe9"
    ][Math.floor(Math.random() * 5)];

    p.style.animationDuration =
      (2 + Math.random() * 2) + "s";

    p.style.animationName =
      "confettiFly";

    p.style.setProperty(
      "--dx",
      (Math.random() * 2 - 1) * 180 + "px"
    );

    p.style.setProperty(
      "--dy",
      -(80 + Math.random() * 160) + "px"
    );


    particles.appendChild(p);


    setTimeout(() => {
      p.remove();
    }, 4200);

  }

}


const style = document.createElement("style");

style.textContent = `
@keyframes confettiFly{
  to{
    transform:
      translate(var(--dx),var(--dy))
      rotate(720deg);
    opacity:0;
  }
}
`;

document.head.appendChild(style);


/* =========================
   FIREWORKS
   ========================= */

function fireworks() {

  const area =
    document.getElementById("fireworks");

  area.innerHTML = "";


  for (let b = 0; b < 7; b++) {

    setTimeout(() => {

      const cx =
        15 + Math.random() * 70;

      const cy =
        18 + Math.random() * 48;


      for (let i = 0; i < 22; i++) {

        const f =
          document.createElement("i");

        f.className = "firework";

        f.style.left =
          cx + "%";

        f.style.top =
          cy + "%";


        const angle =
          Math.PI * 2 * i / 22;

        const r =
          50 + Math.random() * 100;


        f.style.setProperty(
          "--x",
          Math.cos(angle) * r + "px"
        );

        f.style.setProperty(
          "--y",
          Math.sin(angle) * r + "px"
        );


        f.style.background = [
          "#ff4f91",
          "#ffd166",
          "#b86cff",
          "#ffffff",
          "#6fffe9"
        ][i % 5];


        area.appendChild(f);


        setTimeout(() => {
          f.remove();
        }, 1400);

      }

    }, b * 450);

  }

}


/* =====================================================
   TAKE TREAT SYSTEM
   ===================================================== */


/*
  IMPORTANT:

  This is your Google Apps Script Web App endpoint.

  The Telegram Bot Token is NOT stored here.
  It remains safely inside Google Apps Script.
*/

const TREAT_API_URL =
  "https://script.google.com/macros/s/AKfycbw6atbrK5SqUG_XAJ9KlW_3yHuVwsqUzIYRSCDy-RNo1l0Rv0MX0D2MkoQnryn3iESL4A/exec";


/* =========================
   OPEN TREAT PAGE
   ========================= */

const treatBtn =
  document.getElementById("treatBtn");


treatBtn.addEventListener("click", () => {

  showScreen("treatSection");

});


/* =========================
   BACK TO FINAL
   ========================= */

const backToFinal =
  document.getElementById("backToFinal");


backToFinal.addEventListener("click", () => {

  showScreen("finalSection");

});


/* =========================
   TREAT FORM
   ========================= */

const treatForm =
  document.getElementById("treatForm");

const phoneInput =
  document.getElementById("phone");

const locationInput =
  document.getElementById("location");

const submitTreat =
  document.getElementById("submitTreat");

const formStatus =
  document.getElementById("formStatus");


treatForm.addEventListener("submit", async (event) => {

  event.preventDefault();


  const phone =
    phoneInput.value.trim();

  const location =
    locationInput.value.trim();


  /* Basic validation */

  if (!phone) {

    formStatus.textContent =
      "Please give your phone number.";

    formStatus.className =
      "form-status error";

    phoneInput.focus();

    return;
  }


  if (!location) {

    formStatus.textContent =
      "Please give your food delivery location.";

    formStatus.className =
      "form-status error";

    locationInput.focus();

    return;
  }


  /* Disable button while submitting */

  submitTreat.disabled = true;

  submitTreat.textContent =
    "SENDING...";


  formStatus.textContent =
    "Sending your treat request... ❤️";

  formStatus.className =
    "form-status";


  const payload = {

    phone: phone,

    location: location

  };


  try {

    /*
      We use no-cors because Google Apps Script
      can redirect the request.

      The request is sent to the backend,
      but the browser cannot read its response.
    */

    await fetch(TREAT_API_URL, {

      method: "POST",

      mode: "no-cors",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify(payload)

    });


    /*
      The request has been sent.
    */

    formStatus.textContent =
      "🎉 Done! Treat তো আর পালানোর উপায় নাই 😂❤️";

    formStatus.className =
      "form-status success";


    submitTreat.textContent =
      "SUBMITTED ✓";


    confetti(35);


    /*
      Clear the form after successful submission.
    */

    treatForm.reset();


  } catch (error) {

    console.error(error);

    formStatus.textContent =
      "Something went wrong. Please try again.";

    formStatus.className =
      "form-status error";


    submitTreat.disabled = false;

    submitTreat.textContent =
      "SUBMIT 🎁";

  }

});
