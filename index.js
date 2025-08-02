 const bubbleCanvasRef = document.querySelector('.bg-bubbles-canvas');
    const bubbleContext = bubbleCanvasRef.getContext('2d');

    function resizeBubbleCanvas() {
      bubbleCanvasRef.width = bubbleCanvasRef.offsetWidth;
      bubbleCanvasRef.height = bubbleCanvasRef.offsetHeight;
    }

    window.addEventListener('resize', resizeBubbleCanvas);
    resizeBubbleCanvas();

    const colorfulBubbles = [
      'rgba(255, 105, 180, ALPHA)',
      'rgba(135, 206, 250, ALPHA)',
      'rgba(255, 255, 102, ALPHA)',
      'rgba(144, 238, 144, ALPHA)',
      'rgba(221, 160, 221, ALPHA)',
      'rgba(255, 182, 193, ALPHA)'
    ];

    let bubbleArray = [];
    for (let i = 0; i < 40; i++) {
      const alpha = 0.3 + Math.random() * 0.5;
      const color = colorfulBubbles[Math.floor(Math.random() * colorfulBubbles.length)].replace('ALPHA', alpha.toFixed(2));
      bubbleArray.push({
        x: Math.random() * bubbleCanvasRef.width,
        y: bubbleCanvasRef.height + Math.random() * 100,
        radius: 4 + Math.random() * 6,
        speed: 0.5 + Math.random(),
        color
      });
    }

    function renderBubbles() {
      bubbleContext.clearRect(0, 0, bubbleCanvasRef.width, bubbleCanvasRef.height);
      for (let bubble of bubbleArray) {
        bubbleContext.beginPath();
        bubbleContext.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        bubbleContext.fillStyle = bubble.color;
        bubbleContext.fill();
        bubble.y -= bubble.speed;

        if (bubble.y + bubble.radius < 0) {
          bubble.x = Math.random() * bubbleCanvasRef.width;
          bubble.y = bubbleCanvasRef.height + bubble.radius;
        }
      }
      requestAnimationFrame(renderBubbles);
    }

    renderBubbles();

// --- Cake Section Elements ---
const cakeSection = document.getElementById('cake-section');
const blowCandleBtn = document.getElementById('blowCandleBtn');
const blessingQuote = document.getElementById('blessingQuote');

// --- Memories Overview Section Elements ---
const memoriesOverviewSection = document.getElementById('memoriesOverviewSection');
const rightInteractiveArea = document.getElementById('rightInteractiveArea');
const initialVector = document.getElementById('initialVector');
const memoryBook = document.getElementById('memoryBook');
const bookPageTitle = document.getElementById('bookPageTitle');
const bookPageContent = document.getElementById('bookPageContent');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageAnimationOverlay = document.getElementById('pageAnimationOverlay');

// --- Memory Book Data ---
let currentPageIndex = 0;
const memories = [
  { title: " How It All Started 😄✨", content: "😄 I still remember how our friendship began — just a random moment, a small conversation, and suddenly we were talking like we’d known each other for years 🗣️💬. It’s funny how the most unexpected connections turn out to be the most genuine and lasting 💛. I’m really glad that happened ✨." },
  { title: "The Laughs That Never Ended 😂🙈", content: "We’ve had so many laughs over the silliest things — memes, inside jokes, teasing each other for no reason 🤣. Those moments may have seemed small at the time, but they brought so much light and joy into my days 🌞. That carefree energy we shared is something I’ll always hold on to 💫." },
  { title: "Late-Night Vibes 🌙🎧", content: "Those late-night chats 🌃, song exchanges 🎶, and sending each other reels 📲 — they were honestly the best. We didn’t even need to say much, just vibing together made everything feel lighter and more comforting 💬💤." },
  { title: " The Real Talks 💬🍕", content: "From food cravings 🍟 to life updates 📝 to deep convos at 2 AM 🕑, you always kept it real. You gave off a kind of warmth that made it easy to be myself. That kind of trust and comfort is rare and something I truly appreciate 🤗💖." },
  { title: "Moments That Became Memories 📸💛", content: "The random voice notes 🎙️, weird selfies 🤳, unexpected texts 💌 — they all turned into memories I’ll always smile about. It wasn’t about big plans, just little things with the right person 🌈. And that made all the difference 🙏💫." },
];

function blowCandles() {
  // Play the music
  const audio = document.getElementById('candleMusic');
  audio.currentTime = 0; // Start from beginning
  audio.play();

  // Stop after 10 seconds
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0; // Optional: reset to start
  }, 24500); // 10000ms = 10 seconds

  // Show alert and blessings
  alert('🎂 Whooooshhh! The candles are blown out, make a wish Girl 🌟');
  blessingQuote.textContent = "Happy Birthday, Girl! May your day be filled with joy and your year with incredible memories!";
  blessingQuote.classList.add('show');
  blowCandleBtn.style.display = 'none';
}


function updateBookPage() {
  bookPageTitle.style.opacity = 0;
  bookPageContent.style.opacity = 0;
  setTimeout(() => {
    bookPageTitle.textContent = memories[currentPageIndex].title;
    bookPageContent.textContent = memories[currentPageIndex].content;
    prevPageBtn.disabled = currentPageIndex === 0;
    nextPageBtn.disabled = currentPageIndex === memories.length - 1;
    bookPageTitle.style.opacity = 1;
    bookPageContent.style.opacity = 1;
  }, 300);
}

let bookTransitioning = false;
function showBook() {
  if (bookTransitioning) return;
  bookTransitioning = true;
  initialVector.classList.add('hidden');
  initialVector.addEventListener('transitionend', function handler() {
    initialVector.style.display = 'none';
    memoryBook.classList.add('visible');
    updateBookPage();
    memoryBook.addEventListener('transitionend', function bookVisibleHandler() {
      bookTransitioning = false;
    }, { once: true });
  }, { once: true });
}

// --- Memory Book Events ---
rightInteractiveArea.addEventListener('mouseenter', showBook);
rightInteractiveArea.addEventListener('click', showBook);
nextPageBtn.addEventListener('click', () => {
  if (currentPageIndex < memories.length - 1) {
    currentPageIndex++;
    updateBookPage();
  }
});
prevPageBtn.addEventListener('click', () => {
  if (currentPageIndex > 0) {
    currentPageIndex--;
    updateBookPage();
  }
});
updateBookPage();

// ✅ Fix: Blow Candle Button Click Event
blowCandleBtn.addEventListener('click', blowCandles);

// --- Countdown Timer Logic ---
const waitScreen = document.getElementById("waitScreen");
const mainReveal = document.getElementById("mainReveal");
const liveCountdown = document.getElementById("liveCountdown");

// 🎵 Background music element
const countdownMusic = new Audio("");
countdownMusic.loop = true;

// ✅ Set countdown to 10 seconds from now
const FIXED_UNLOCK_TIME = Date.now() + 10000; // 10 seconds

function showMainContent() {
  waitScreen.style.display = "none";
  mainReveal.style.display = "block";

  // Stop music when countdown ends
  countdownMusic.pause();
  countdownMusic.currentTime = 0;
}

function startCountdown() {
  // Try autoplay
  countdownMusic.play().catch(() => {
    // If autoplay is blocked, show a tap message
    liveCountdown.innerHTML = ``;
    
    document.body.addEventListener('click', () => {
      countdownMusic.play();
    }, { once: true });
  });

  const timer = setInterval(() => {
    const now = Date.now();
    const diff = FIXED_UNLOCK_TIME - now;

    if (diff <= 0) {
      clearInterval(timer);
      showMainContent();
    } else {
      const seconds = Math.ceil(diff / 1000);
      liveCountdown.textContent = `${seconds}s`;
    }
  }, 1000);
}

// --- Initial Load ---
mainReveal.style.display = "none";
waitScreen.style.display = "flex";
startCountdown();

// === Shayari Viewer ===
const shayaris = [
  {
    text: "कुछ इस अदा से आज वो पर्दा कर गए,\nपहले हमें देखा, फिर मुस्कुरा कर चल दिए।",
    img: "https://media.istockphoto.com/id/1404887343/vector/book-lover-or-club-vector-illustration-with-young-woman-relaxing-and-reading-in-nature.jpg?s=612x612&w=0&k=20&c=l0AaAlbbVbHFUB_5ssheyOWLbVdymq62okEmF3U2OO4="
  },
  {
    text: "तेरा नाम ही काफी है सुकून देने को,\nअब तेरी बातों की बात ही क्या करें।",
    img: "https://media.istockphoto.com/id/1333533061/vector/happy-woman-sits-and-reads-the-book-with-enjoy-and-interest-the-girl-keeps-her-diary-or.jpg?s=612x612&w=0&k=20&c=o2LssWGPS93TQDhgC6N06ZS_WnrPL_BsGAZ55z797RQ="
  },
  {
    text: "हर शाम उसके लिए ढलती है,\nहर सुबह उसी की यादों में होती है।",
    img: "https://t4.ftcdn.net/jpg/04/46/60/79/360_F_446607922_3eCYQ7tVih3m0aapYlCKeXppBVba0zQ9.jpg"
  },
  {
    text: "वो कहता है तुम मुस्कुराया करो,हमने कहा तुम साथ हो, फिर ग़म किस बात का हो?",
    img: "https://img.freepik.com/premium-vector/person-sitting-hammock-reading-book-with-cup-tea-them-image-encourages_216520-71497.jpg"
  },
  {
    text: "टूट कर चाहा था जिसको हमने जिंदगी की तरह,उसने तोड़ दिया हमें एक आदत की तरह।",
    img: "https://media.istockphoto.com/id/1205897734/vector/young-female-character-reading-a-book-under-the-tree-summer-recreation-outdoor-forest-or.jpg?s=612x612&w=0&k=20&c=8BY8yUQr8CfJd7K2pNdPAbiNt4gedeqqgkiwBvT7_lg="
  },
  {
    text: "वो वक़्त भी क्या खूब था जब तुझसे बात हुए बिना नींद नहीं आती थी,और आज तू याद भी आ जाए तो दिल मुस्कुराकर चुप रह जाता है।",
    img: "https://media.istockphoto.com/id/1412212498/vector/pretty-woman-seating-on-grass-under-fruit-tree-and-reading-a-book-female-student-on-vacation.jpg?s=612x612&w=0&k=20&c=FT_z1E6ATw44zy2mGqjtGnx6vnRx0JWJjWkUmb1XHqI="
  },
  {
    text: "कठिन राहों में भी जो मुस्कान लाते हैं,वो ही लोग ज़िंदगी को जीना सिखाते हैं।",
    img: "https://media.istockphoto.com/id/1412212325/vector/pretty-woman-seating-on-grass-under-fruit-tree-and-reading-a-book-female-student-on-vacation.jpg?s=612x612&w=0&k=20&c=lBES8Xpb4VOBOmkIdC_rMGMKkMH9K158puf71ubdKYk="
  },
  {
    text: "दिल टूटे हैं आवाज़ नहीं आई,जैसे काँच गिरा हो रेत पर।",
    img: "https://cdn.vectorstock.com/i/500p/33/46/male-character-adult-or-student-reading-books-vector-36353346.jpg"
  }
];

let currentIndex = 0;
const shayariText = document.getElementById("shayariText");
const shayariImage = document.getElementById("shayariImage");
const shayariCard = document.querySelector(".shayari-card");
const imageBox = document.querySelector(".image-box img");
const buttonsGroup = document.querySelector(".buttons");

function typeText(text) {
  shayariText.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      shayariText.innerHTML += text[i] === '\n' ? "<br/>" : text[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, 40);
}

function applyAnimation() {
  [shayariCard, imageBox, buttonsGroup].forEach(el => {
    el.classList.remove("fade-in");
    void el.offsetWidth;
    el.classList.add("fade-in");
  });
}

function updateShayari() {
  const { text, img } = shayaris[currentIndex];
  typeText(text);
  shayariImage.src = img;
  applyAnimation();
}

function nextShayari() {
  currentIndex = (currentIndex + 1) % shayaris.length;
  updateShayari();
}

function prevShayari() {
  currentIndex = (currentIndex - 1 + shayaris.length) % shayaris.length;
  updateShayari();
}

const music = document.getElementById("backgroundMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

function toggleMusic() {
  if (isPlaying) {
    music.pause();
    musicBtn.classList.remove("music-on");
  } else {
    music.play();
    musicBtn.classList.add("music-on");
  }
  isPlaying = !isPlaying;
}

updateShayari();


const songs = [
  {
    title: "- The indian classical",
    src: "music/classic.mp3.mp3",
    cover: "https://pbs.twimg.com/media/Gu1QK6_WEAAMLJg.jpg"
  },
  {
    title: "mera sabse favoutite music like i love this",
    src: "music/enigma.mp3.mp3",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fSMcF3R8kF9OBsTAmfw0UGXMJXo-PL2HTQ&s"
  },
  {
    title: "kiliye kiliye",
    src: "music/kiliye kilye .mp3.mp3",
    cover: "https://static.vecteezy.com/system/resources/thumbnails/006/228/896/small_2x/girl-wearing-wireless-headphones-listening-to-music-with-free-space-for-text-illustration-vector.jpg"
  },
  {
    title: "kinna song",
    src: "music/kinna sona.mp3.mp3",
    cover: "https://media.istockphoto.com/id/1318426262/vector/confident-woman-listens-to-music-with-headphones-girl-with-flying-hair-in-earphones-enjoying.jpg?s=612x612&w=0&k=20&c=V4r72euyTK64KbkUiz2oAXkOlJeg1iuZ_1B0WEtLA4s="
  },
  {
    title: "unkanu unanne",
    src: "music/unakulu nanne.mp3.mp3",
    cover: "https://static.vecteezy.com/system/resources/previews/003/429/410/non_2x/girl-listening-music-on-headphones-free-vector.jpg"
  },
  {
    title: "most favourite ukulele music of mine",
    src: "music/chubina.mp3",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8JRPdVS7cIZoPsGzrm6Y9NwkUMBLDpKGITA&s"
  },
  {
    title: "slow-motion angreza",
    src: "music/slow motion angreza.mp3.mp3",
    cover: "https://img.freepik.com/premium-vector/listening-music-concept_140689-2459.jpg"
  },
  {
    title: "do pal",
    src: "music/do pal.mp3",
    cover: "https://media.istockphoto.com/id/1312183806/vector/beautiful-young-girl-in-headphones-listening-to-music-radio-podcast-or-audio-book-melomaniac.jpg?s=612x612&w=0&k=20&c=WecGuBbskabBw2dA9ZNYAhGtkBz1cV-fvEf8mISfA2s="
  },
  {
    title: "nahin milta ",
    src: "music/nahi milta.mp3",
    cover: "https://img.freepik.com/premium-vector/african-american-woman-listening-headphones-social-media-player-application-music-therapy_36358-98.jpg"
  },
  {
    title: "neele neele ambar",
    src: "music/neele neele ambar.mp3",
    cover: "https://png.pngtree.com/png-vector/20221110/ourmid/pngtree-smiling-young-man-in-headphones-listen-to-music-on-cellphone-png-image_6441728.png"
  },
  {
    title: "dil to bacha hai",
    src: "music/dil to bacha hai.mp3",
    cover: "data:image/jpeg;base64,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"
  },
  {
    title: " mine most faourite song",
    src: "music/pal pal.mp3",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Uv2vNuI2271hsBR-EIc8G4qe1flq_tp19Q&s"
  }
];

let currentSongIndex = 0;

const audio = document.getElementById('audio');
const titleBar = document.getElementById('titleBar');
const coverImage = document.getElementById('coverImage');
const playPauseBtn = document.getElementById('playPauseBtn');
const progress = document.getElementById('progress');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let isSongPlayingA = false;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  titleBar.textContent = `Manav's favourite ~ ${song.title}`;
  coverImage.src = song.cover;
  progress.value = 0;
}

function playSong() {
  audio.play();
  isSongPlayingA = true;
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
  audio.pause();
  isSongPlayingA = false;
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

playPauseBtn.addEventListener('click', () => {
  if (isSongPlayingA) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Initial load
loadSong(currentSongIndex);


  const emojis = document.querySelectorAll('.ff-rating span');
  let selectedRating = 0;

  emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      emojis.forEach(e => e.classList.remove('selected'));
      emoji.classList.add('selected');
      selectedRating = emoji.getAttribute('data-value');
    });
  });

  function submitFeedback() {
    const feedback = document.getElementById("feedbackText").value.trim();
    const popup = document.getElementById("popupMessage");

    if (feedback === "" || selectedRating === 0) {
      alert("Please select a rating and write your feedback!");
      return;
    }

    document.getElementById("feedbackText").value = "";
    emojis.forEach(e => e.classList.remove('selected'));
    selectedRating = 0;

    popup.classList.add("show");
    startConfetti();

    setTimeout(() => {
      popup.classList.remove("show");
      stopConfetti();
      alert("chal byee, enjoy your birthday party!' ~ Manav 👋");
    }, 3000);
  }

  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let confetti = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function createConfettiPiece() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      tilt: Math.floor(Math.random() * 10) - 5,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05,
      tiltAngle: 0
    };
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c, i) => {
      c.tiltAngle += c.tiltAngleIncrement;
      c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
      c.x += Math.sin(c.d);
      c.tilt = Math.sin(c.tiltAngle) * 15;

      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
      ctx.stroke();

      if (c.y > canvas.height) {
        confetti[i] = createConfettiPiece();
      }
    });
  }

  let confettiInterval;
  function startConfetti() {
    confetti = Array.from({ length: 150 }, createConfettiPiece);
    confettiInterval = setInterval(drawConfetti, 15);
  }

  function stopConfetti() {
    clearInterval(confettiInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }