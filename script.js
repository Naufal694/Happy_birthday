// --- AUDIO & VIDEO LOGIC ---
const bgAudio = document.getElementById('bgMusic');
const memVideo = document.getElementById('memoryVideo');

// Pause lagu saat video play, nyalakan saat video pause/selesai
if (memVideo) {
    memVideo.addEventListener('play', () => bgAudio.pause());
    memVideo.addEventListener('pause', () => bgAudio.play());
    memVideo.addEventListener('ended', () => bgAudio.play());
}

// --- NAVIGATION LOGIC ---
const inputNama = document.getElementById('namapenerima');
if (inputNama) {
    inputNama.addEventListener('input', function() {
        if(this.value.startsWith(' ')) this.value = this.value.trim();
    });
}

function mulaiPerjalanan() {
    let nama = document.getElementById('namapenerima').value;
    if (nama === "") { 
        alert("namanya diisi dulu dong! 🥺"); 
        return; 
    }
    
    bgAudio.play().catch(e => console.log("Autoplay ditahan browser"));
    document.getElementById('greetingTitle').innerHTML = `Halo, ${nama}! 🌸`;
    
    pindahHalaman('page2');
    setTimeout(() => { ketikPesan(); }, 800);
}

function pindahHalaman(targetId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(targetId);
    targetPage.classList.add('active');

    if(targetId === 'page3') setTimeout(fireConfetti, 600);
    if(targetId === 'page4') initGame(); 
    if(targetId === 'page5') setTimeout(fireConfetti, 500); 
}

// --- TYPEWRITER LOGIC ---
function ketikPesan() {
    const pesan = "selamat ulang tahun ya!!! di hari spesial ini aku mau bilang sama kamu, kamu wanita hebat bisa bertahan sampai sekarang. teruslah membuat warna di hidup kamu. semoga di tahun ini dan seterusnya, mimpi-mimpi yang terus kamu doakan bisa tercapai, senyum kamu makin lebar, dan beban kamu makin ringan ya... i love you❤︎";
    const tempatTeks = document.getElementById('typewriterText');
    tempatTeks.innerHTML = '<span id="teksBerjalan"></span><span class="cursor"></span>';
    
    const teksSpan = document.getElementById('teksBerjalan');
    let i = 0; 
    let kecepatan = 55;

    function ngetik() {
        if (i < pesan.length) {
            teksSpan.innerHTML += pesan.charAt(i); 
            i++;
            setTimeout(ngetik, kecepatan);
        } else {
            document.getElementById('btnLanjut').style.display = 'inline-block';
            document.querySelector('.cursor').style.display = 'none';
        }
    }
    ngetik();
}

// --- CONFETTI LOGIC ---
function fireConfetti() {
    var duration = 3 * 1000; 
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 45, spread: 360, ticks: 60, zIndex: 100 };
    
    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        
        var particleCount = 50 * (timeLeft / duration);
        
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ffccd5', '#fb6f92', '#c9184a', '#ffb3c6'] }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ffccd5', '#fb6f92', '#c9184a', '#ffb3c6'] }));
    }, 250);
}

function randomInRange(min, max) { 
    return Math.random() * (max - min) + min; 
}


// LOGIKA MINI GAME (PAKAI FOTO INTERNET)

const images = [
        'image/poto1.png', 'image/poto1.png',
        'image/poto2.png', 'image/poto2.png',
        'image/poto3.png', 'image/poto3.png',
        'image/poto4.png', 'image/poto4.png'
    ];
let flippedCards = [];
let matchedPairs = 0;
let gameSudahSelesai = false;

function initGame() {
    if (gameSudahSelesai) return; 
    
    const board = document.getElementById('gameBoard');
    if (!board) return; 

    board.innerHTML = ''; 
    flippedCards = []; 
    matchedPairs = 0;
    
    let shuffledImages = images.sort(() => Math.random() - 0.5);
    
    shuffledImages.forEach((imgSrc) => {
        const card = document.createElement('div');
        card.classList.add('card'); 
        card.dataset.image = imgSrc; 
        
        card.innerHTML = `
            <div class="front"></div>
            <div class="back">
                <img src="${imgSrc}" alt="Memori">
            </div>
        `;
        
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length >= 2 || this.classList.contains('flipped')) return;
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) checkMatch();
}

function checkMatch() {
    const card1 = flippedCards[0]; 
    const card2 = flippedCards[1];
    
    if (card1.dataset.image === card2.dataset.image) {
        matchedPairs++; 
        flippedCards = [];
        
        if (matchedPairs === 4) {
            gameSudahSelesai = true;
            setTimeout(() => { pindahHalaman('page5'); }, 1000); 
        }
    } else {
        setTimeout(() => { 
            card1.classList.remove('flipped'); 
            card2.classList.remove('flipped'); 
            flippedCards = []; 
        }, 1000); 
    }
}


// LOGIKA TOMBOL MUSIK

function toggleMusic() {
    const musicBtn = document.getElementById('musicToggle');
    if (bgAudio.paused) {
        bgAudio.play();
        musicBtn.innerHTML = '🎵'; // Ganti ikon nyala
    } else {
        bgAudio.pause();
        musicBtn.innerHTML = '🔇'; // Ganti ikon mati
    }
}