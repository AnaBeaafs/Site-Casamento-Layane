// ===================== MÚSICA PERSISTENTE ENTRE PÁGINAS =====================
const audio = new Audio('assets/music/die-for-you-instrumental.mp3');
audio.loop = true;
audio.volume = 0.45;

// Elementos
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

// ==================== FUNÇÕES DE CONTROLE ====================

// Salvar estado atual da música
function saveMusicState() {
    localStorage.setItem('musicPlaying', isPlaying);
    localStorage.setItem('musicCurrentTime', audio.currentTime);
    localStorage.setItem('musicVolume', audio.volume);
}

// Carregar estado da música
function loadMusicState() {
    const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
    const savedTime = parseFloat(localStorage.getItem('musicCurrentTime')) || 0;
    const savedVolume = parseFloat(localStorage.getItem('musicVolume')) || 0.45;

    audio.volume = savedVolume;
    
    if (savedTime > 0) {
        audio.currentTime = savedTime;
    }

    if (wasPlaying) {
        audio.play().catch(() => {});
        isPlaying = true;
        if (musicBtn) musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

// ==================== EVENTOS ====================

if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audio.play().catch(err => {
                console.log("Reprodução bloqueada:", err);
            });
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
        saveMusicState();
    });
}

// Salvar estado quando o usuário sair da página
window.addEventListener('beforeunload', saveMusicState);

// Tentar tocar automaticamente ao carregar
window.addEventListener('load', () => {
    loadMusicState();
    
    setTimeout(() => {
        if (isPlaying) {
            audio.play().catch(() => {});
        }
    }, 800);
});

// Atualizar o tempo salvo periodicamente
setInterval(() => {
    if (isPlaying) {
        saveMusicState();
    }
}, 3000);

// ===================== CONTAGEM REGRESSIVA (CORRIGIDO) =====================
function updateCountdown() {
    const container = document.getElementById('countdown-container');
    
    // Só executa se o elemento existir na página atual
    if (!container) return;

    const weddingDate = new Date("July 19, 2026 16:00:00").getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        container.innerHTML = `<div class="text-center">🎉 O grande dia chegou!</div>`;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    container.innerHTML = `
        <div class="countdown-item">
            <div class="number">${days}</div>
            <div class="label">Dias</div>
        </div>
        <div class="countdown-item">
            <div class="number">${hours}</div>
            <div class="label">Horas</div>
        </div>
        <div class="countdown-item">
            <div class="number">${minutes}</div>
            <div class="label">Minutos</div>
        </div>
        <div class="countdown-item">
            <div class="number">${seconds}</div>
            <div class="label">Segundos</div>
        </div>
    `;
}

// Executa apenas se o elemento existir
if (document.getElementById('countdown-container')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===================== NAVBAR SCROLL =====================
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

function irPara(pagina) {
    const preloader = document.createElement('iframe');
    preloader.src = 'preloader.html';
    preloader.style.position = 'fixed';
    preloader.style.top = '0';
    preloader.style.left = '0';
    preloader.style.width = '100%';
    preloader.style.height = '100%';
    preloader.style.border = 'none';
    preloader.style.zIndex = '99999';
    document.body.appendChild(preloader);
    
    setTimeout(() => {
        window.location.href = pagina;
    }, 1800);
}

// ===================== SALVAR NO CALENDÁRIO =====================
function addToCalendar() {
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=Casamento+Layane+e+Daniel&dates=20260719T000000/20260720T000000&details=Nosso+grande+dia!`;
    window.open(url, '_blank');
}

function abrirMapa() {
    window.open("https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBBzI5NGowajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=br&sa=X&geocode=KQ37A5GWuciUMTsh1sioZZWi&daddr=Estrada+Vicinal+da+Amizade,+s/n+-+Jardim+Boa+Vista,+Campinas+-+SP,+13187-041", "_blank");
}