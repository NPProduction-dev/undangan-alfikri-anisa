/* 
  Minangkabau Modern Digital Wedding Invitation JavaScript Controller
  Anisa Rahmadini & M. Alfikri
*/

document.addEventListener('DOMContentLoaded', () => {
  initURLParams();
  initPetals();
  initAudio();
  initCountdown();
  initRSVP();
  initGalleryModal();
  initNavigationController();
});

/* 1. Dynamic URL Guest Parameter Parser */
function initURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('kpd') || urlParams.get('to') || urlParams.get('guest');
  const guestDisplay = document.getElementById('guest-name-display');
  
  if (guestDisplay) {
    if (guestName && guestName.trim() !== '') {
      guestDisplay.textContent = decodeURIComponent(guestName.trim());
    } else {
      guestDisplay.textContent = 'Bapak/Ibu/Saudara/i';
    }
  }
}

/* 2. Floating Petals Generator */
function initPetals() {
  const container = document.getElementById('petals-container');
  if (!container) return;
  
  const petalCount = 12;
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = Math.random() * 12 + 10;
    petal.style.width = `${size}px`;
    petal.style.height = `${size + 4}px`;
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 8}s`;
    petal.style.animationDuration = `${Math.random() * 6 + 8}s`;
    container.appendChild(petal);
  }
}

/* 3. Audio & Cover Overlay Handler */
let audioCtx = null;
let isPlaying = false;

function initAudio() {
  const musicBtn = document.getElementById('btn-music-toggle');
  const bgMusic = document.getElementById('bg-music');
  const btnOpen = document.getElementById('btn-open-invitation');
  const coverOverlay = document.getElementById('cover-overlay');

  btnOpen.addEventListener('click', () => {
    // Open cover screen
    coverOverlay.classList.add('open');
    document.body.style.overflowY = 'auto';

    // Play music
    if (bgMusic) {
      bgMusic.play().then(() => {
        isPlaying = true;
        updateMusicIcon(true);
      }).catch(err => {
        console.log('Audio autoplay prevented:', err);
      });
    }
  });

  if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', () => {
      if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
        updateMusicIcon(false);
      } else {
        bgMusic.play().then(() => {
          isPlaying = true;
          updateMusicIcon(true);
        }).catch(err => console.log(err));
      }
    });
  }
}

function updateMusicIcon(playing) {
  const musicBtn = document.getElementById('btn-music-toggle');
  if (!musicBtn) return;
  const icon = musicBtn.querySelector('i');
  if (playing) {
    icon.className = 'fas fa-compact-disc spin-music-icon';
  } else {
    icon.className = 'fas fa-play';
  }
}

/* 4. Countdown Timer Logic */
function initCountdown() {
  // Target: August 28 of current year or next occurrence
  const now = new Date();
  let targetYear = now.getFullYear();
  let eventDate = new Date(`August 28, ${targetYear} 08:00:00`);
  
  if (now > eventDate && now.getMonth() > 7) {
    targetYear++;
    eventDate = new Date(`August 28, ${targetYear} 08:00:00`);
  }

  function updateTimer() {
    const currentTime = new Date().getTime();
    const distance = eventDate.getTime() - currentTime;

    if (distance < 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-minutes').textContent = '00';
      document.getElementById('cd-seconds').textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = days < 10 ? '0' + days : days;
    document.getElementById('cd-hours').textContent = hours < 10 ? '0' + hours : hours;
    document.getElementById('cd-minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('cd-seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* 5. Copy Text & Toast Handler */
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Nomor ${label} (${text}) berhasil disalin!`);
  }).catch(err => {
    showToast(`Gagal menyalin nomor ${label}`);
  });
}

function showToast(msg) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* 6. RSVP Form & Local Storage Handler */
function initRSVP() {
  const rsvpForm = document.getElementById('rsvp-form');
  const wishesContainer = document.getElementById('wishes-list');

  let storedWishes = JSON.parse(localStorage.getItem('minang_wedding_wishes')) || [];

  function renderWishes() {
    if (!wishesContainer) return;
    wishesContainer.innerHTML = '';
    
    if (storedWishes.length === 0) {
      wishesContainer.innerHTML = `
        <div style="text-align:center; padding:18px; font-size:0.85rem; color:var(--color-text-muted); font-style:italic;">
          Belum ada ucapan. Berikan doa & ucapan selamat pertama Anda!
        </div>
      `;
      return;
    }

    storedWishes.forEach(item => {
      const div = document.createElement('div');
      div.className = 'wish-card-item';
      
      let badgeClass = 'badge-hadir';
      if (item.status === 'Tidak Hadir') badgeClass = 'badge-tidak';
      if (item.status === 'Ragu-ragu') badgeClass = 'badge-ragu';

      div.innerHTML = `
        <div class="wish-header-row">
          <span class="wish-author-name">${escapeHTML(item.name)}</span>
          <span class="wish-attendance-badge ${badgeClass}">${escapeHTML(item.status)}</span>
        </div>
        <p class="wish-message-body">${escapeHTML(item.text)}</p>
      `;
      wishesContainer.appendChild(div);
    });
  }

  renderWishes();

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rsvp-name').value.trim();
      const status = document.getElementById('rsvp-status').value;
      const text = document.getElementById('rsvp-message').value.trim();

      if (!name || !text) {
        showToast('Mohon isi nama dan ucapan Anda.');
        return;
      }

      const newWish = { name, status, text };
      storedWishes.unshift(newWish);
      localStorage.setItem('minang_wedding_wishes', JSON.stringify(storedWishes));

      renderWishes();
      rsvpForm.reset();
      showToast('Terima kasih atas doa & konfirmasi Anda!');
    });
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* 7. Lightbox Gallery Preview */
function initGalleryModal() {
  const items = document.querySelectorAll('.gallery-item img');
  items.forEach(img => {
    img.addEventListener('click', () => {
      openImageModal(img.src);
    });
  });
}

function openImageModal(src) {
  let modal = document.getElementById('gallery-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'gallery-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-box" style="padding:10px; max-width:90vw;">
        <button class="modal-close" onclick="closeImageModal()">&times;</button>
        <img id="modal-img-src" src="" style="width:100%; border-radius:12px;" />
      </div>
    `;
    document.body.appendChild(modal);
  }
  document.getElementById('modal-img-src').src = src;
  modal.classList.add('active');
}

function closeImageModal() {
  const modal = document.getElementById('gallery-modal');
  if (modal) modal.classList.remove('active');
}

/* 8. Link Generator Modal for Bride/Groom */
function openLinkGenerator() {
  let modal = document.getElementById('generator-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'generator-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-box">
        <button class="modal-close" onclick="closeLinkGenerator()">&times;</button>
        <h3 style="font-family:var(--font-serif); font-size:1.5rem; margin-bottom:10px; color:var(--color-gold-dark);">Generator Link Tamu</h3>
        <p style="font-size:0.85rem; color:var(--color-text-muted); margin-bottom:15px;">Ketik nama tamu untuk membuat URL undangan khusus:</p>
        <input type="text" id="gen-guest-name" class="form-control" placeholder="Contoh: Bapak Budi & Istri" style="margin-bottom:12px;" />
        <button class="btn-submit" onclick="generateGuestLink()" style="margin-bottom:12px;">Buat & Salin Link</button>
        <div id="gen-result" style="font-size:0.8rem; word-break:break-all; background:#FAF8F5; padding:10px; border-radius:8px; display:none;"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  modal.classList.add('active');
}

function closeLinkGenerator() {
  const modal = document.getElementById('generator-modal');
  if (modal) modal.classList.remove('active');
}

function generateGuestLink() {
  const input = document.getElementById('gen-guest-name');
  const name = input ? input.value.trim() : '';
  if (!name) {
    showToast('Ketik nama tamu terlebih dahulu');
    return;
  }
  const baseURL = window.location.origin + window.location.pathname;
  const generatedURL = `${baseURL}?kpd=${encodeURIComponent(name)}`;
  
  navigator.clipboard.writeText(generatedURL).then(() => {
    const res = document.getElementById('gen-result');
    if (res) {
      res.style.display = 'block';
      res.innerHTML = `<strong>Link tersalin:</strong><br>${generatedURL}`;
    }
    showToast('Link khusus tamu berhasil disalin!');
  });
}

/* 9. Full Section Navigation & Auto-Play Controller */
let autoPlayTimer = null;
let isAutoPlayActive = false;
let currentSectionIndex = 0;

function initNavigationController() {
  const sections = Array.from(document.querySelectorAll('.main-wrapper > section, .main-wrapper > footer'));
  const dotItems = document.querySelectorAll('.nav-dot-item');
  const btnOpen = document.getElementById('btn-open-invitation');
  const dotsContainer = document.getElementById('nav-dots-container');
  const autoplayBtn = document.getElementById('btn-autoplay-toggle');
  const mainWrapper = document.querySelector('.main-wrapper');

  // Show navigation dots after cover invitation is opened
  if (btnOpen && dotsContainer) {
    btnOpen.addEventListener('click', () => {
      dotsContainer.classList.add('visible');
    });
  }

  // Dot Item Click Navigation
  dotItems.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (isAutoPlayActive) {
          stopAutoPlay(true);
        }
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // IntersectionObserver for tracking active section dot
  const observerOptions = {
    root: mainWrapper,
    threshold: 0.35
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          const foundIdx = sections.findIndex(sec => sec.id === id);
          if (foundIdx !== -1) {
            currentSectionIndex = foundIdx;
          }
          
          dotItems.forEach(dot => {
            if (dot.getAttribute('data-target') === id) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }
      }
    });
  }, observerOptions);

  sections.forEach(sec => {
    if (sec) observer.observe(sec);
  });

  // Auto Play Button Listener
  if (autoplayBtn) {
    autoplayBtn.addEventListener('click', () => {
      if (isAutoPlayActive) {
        stopAutoPlay(true);
      } else {
        startAutoPlay();
      }
    });
  }

  // Detect User Scroll / Touch / Keyboard interactions to stop Auto-Play automatically
  const stopEvents = ['wheel', 'touchstart', 'touchmove', 'keydown'];
  stopEvents.forEach(evt => {
    window.addEventListener(evt, (e) => {
      if (isAutoPlayActive) {
        if (evt === 'keydown') {
          if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space'].includes(e.code)) {
            stopAutoPlay(true);
          }
        } else {
          stopAutoPlay(true);
        }
      }
    }, { passive: true });
  });

  function startAutoPlay() {
    isAutoPlayActive = true;
    if (autoplayBtn) {
      autoplayBtn.classList.add('autoplay-active');
      autoplayBtn.innerHTML = '<i class="fas fa-pause-circle"></i>';
      autoplayBtn.title = 'Hentikan Auto Play';
    }
    showToast('Mode Auto Play Aktif (Slide tiap 8 detik)');

    autoPlayTimer = setInterval(() => {
      currentSectionIndex = (currentSectionIndex + 1) % sections.length;
      const targetSec = sections[currentSectionIndex];
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 8000);
  }

  function stopAutoPlay(notify = false) {
    if (!isAutoPlayActive && !autoPlayTimer) return;
    isAutoPlayActive = false;
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
    if (autoplayBtn) {
      autoplayBtn.classList.remove('autoplay-active');
      autoplayBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
      autoplayBtn.title = 'Mode Auto Play (Otomatis Slide)';
    }
    if (notify) {
      showToast('Auto Play Dihentikan (Mode Manual)');
    }
  }
}
