const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  target.classList.add("active");
  window.scrollTo({top:0, behavior:"instant"});
}

document.getElementById("openBtn").addEventListener("click", () => {
  showScreen("reveal");
  confetti(55);
});

document.querySelectorAll(".next-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    showScreen(btn.dataset.next);
    if (btn.dataset.next === "finalSection") fireworks();
  });
});

// Envelope / letter
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const afterLetter = document.querySelector(".hidden-after-letter");

envelope.addEventListener("click", () => {
  if (envelope.classList.contains("opened")) return;
  envelope.classList.add("opened");
  envelope.querySelector(".envelope").classList.add("open");
  setTimeout(() => {
    letter.classList.add("show");
    afterLetter.classList.add("show");
    envelope.querySelector(".tap-hint").textContent = "A little letter, just for you ❤️";
  }, 900);
});

// Secret messages
const secretMessage = document.getElementById("secretMessage");
document.querySelectorAll(".secret-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    secretMessage.textContent = btn.dataset.message;
    secretMessage.classList.remove("show");
    requestAnimationFrame(() => secretMessage.classList.add("show"));
    document.querySelector(".after-secret").classList.add("show");
    confetti(18);
  });
});

// Replay
document.getElementById("replayBtn").addEventListener("click", () => {
  envelope.classList.remove("opened");
  envelope.querySelector(".envelope").classList.remove("open");
  letter.classList.remove("show");
  afterLetter.classList.remove("show");
  secretMessage.classList.remove("show");
  document.querySelector(".after-secret").classList.remove("show");
  showScreen("opening");
});

// Background particles
const particles = document.getElementById("particles");
for (let i=0;i<55;i++) {
  const p=document.createElement("span");
  p.className="particle";
  p.style.left=Math.random()*100+"%";
  p.style.animationDuration=(7+Math.random()*12)+"s";
  p.style.animationDelay=(-Math.random()*15)+"s";
  p.style.opacity=(.15+Math.random()*.65);
  p.style.width=p.style.height=(1+Math.random()*3)+"px";
  particles.appendChild(p);
}

function confetti(count=35) {
  for(let i=0;i<count;i++){
    const p=document.createElement("span");
    p.className="particle";
    p.style.left=(45+Math.random()*10)+"%";
    p.style.bottom="10%";
    p.style.width=(3+Math.random()*5)+"px";
    p.style.height=(3+Math.random()*8)+"px";
    p.style.borderRadius="1px";
    p.style.background=["#ff4f91","#ffd166","#9d7cff","#ffffff","#6fffe9"][Math.floor(Math.random()*5)];
    p.style.animationDuration=(2+Math.random()*2)+"s";
    p.style.animationName="confettiFly";
    p.style.setProperty("--dx",(Math.random()*2-1)*180+"px");
    p.style.setProperty("--dy",-(80+Math.random()*160)+"px");
    particles.appendChild(p);
    setTimeout(()=>p.remove(),4200);
  }
}

const style = document.createElement("style");
style.textContent=`@keyframes confettiFly{to{transform:translate(var(--dx),var(--dy)) rotate(720deg);opacity:0}}`;
document.head.appendChild(style);

function fireworks(){
  const area=document.getElementById("fireworks");
  area.innerHTML="";
  for(let b=0;b<7;b++){
    setTimeout(()=>{
      const cx=15+Math.random()*70, cy=18+Math.random()*48;
      for(let i=0;i<22;i++){
        const f=document.createElement("i");
        f.className="firework";
        f.style.left=cx+"%"; f.style.top=cy+"%";
        const angle=Math.PI*2*i/22, r=50+Math.random()*100;
        f.style.setProperty("--x",Math.cos(angle)*r+"px");
        f.style.setProperty("--y",Math.sin(angle)*r+"px");
        f.style.background=["#ff4f91","#ffd166","#b86cff","#ffffff","#6fffe9"][i%5];
        area.appendChild(f);
        setTimeout(()=>f.remove(),1400);
      }
    },b*450);
  }
}
