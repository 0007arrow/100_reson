/**
 * app.js - 100 Reasons I Love You (Azra Baby)
 * 
 * Features:
 * - Antigravity Floating Photo Engine (drift, 3D parallax, swirl, heart convergence)
 * - Fallback romantic polaroids for 0 photos
 * - Lightbox modal with smooth transitions
 * - Card deck gestures (touch swipe, keyboard, buttons)
 * - Favorites system saved in localStorage
 * - Finale celebration (canvas confetti, heart-shaped photo constellation, love note)
 * - Audio detection & toggle
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // State & Variables
  // -------------------------------------------------------------------------
  let currentIndex = 0;
  let favorites = new Set();
  let floatingItems = [];
  let animFrameId = null;
  let isFinale = false;
  let isReducedMotion = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchDeltaX = 0;
  let isSwiping = false;

  // Parallax Coordinates (mouse on desktop, tilt on mobile)
  const parallax = {
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    lerp: 0.08
  };

  // Audio state
  let bgAudio = null;
  let audioAvailable = false;
  let isPlayingAudio = false;

  // DOM Elements
  const welcomeScreen = document.getElementById('welcome-screen');
  const deckScreen = document.getElementById('deck-screen');
  const finaleScreen = document.getElementById('finale-screen');
  const startBtn = document.getElementById('start-btn');

  const antigravityContainer = document.getElementById('antigravity-container');
  const reasonCard = document.getElementById('reason-card');
  const reasonCategory = document.getElementById('reason-category');
  const reasonNumber = document.getElementById('reason-number');
  const reasonText = document.getElementById('reason-text');
  const progressCounter = document.getElementById('progress-counter');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const surpriseBtn = document.getElementById('surprise-btn');
  const favoriteBtn = document.getElementById('favorite-btn');
  const favoritesBadge = document.getElementById('favorites-badge');
  const favoritesBtn = document.getElementById('favorites-toggle-btn');

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  const favoritesModal = document.getElementById('favorites-modal');
  const favoritesList = document.getElementById('favorites-list');
  const favoritesClose = document.getElementById('favorites-close');

  const musicBtn = document.getElementById('music-toggle-btn');
  const confettiCanvas = document.getElementById('confetti-canvas');
  const restartBtn = document.getElementById('restart-btn');
  const finaleFavoritesBtn = document.getElementById('finale-favorites-btn');

  // Fallback romantic cards when 0 photos are present
  const FALLBACK_POLAROIDS = [
    { title: "Sweet Angel", text: "Azra Baby", icon: "heart" },
    { title: "My Whole Heart", text: "Forever & Always", icon: "sparkle" },
    { title: "Pure Joy", text: "Your Laugh", icon: "smile" },
    { title: "Soulmate", text: "You & Me", icon: "infinity" },
    { title: "My Favorite View", text: "Your Radiant Smile", icon: "sun" },
    { title: "Safe Haven", text: "In Your Arms", icon: "home" },
    { title: "Endless Love", text: "Day by Day", icon: "stars" },
    { title: "My Peace", text: "Quiet Moments", icon: "moon" },
    { title: "Best Adventure", text: "Building Our Life", icon: "compass" },
    { title: "True Happiness", text: "Every Single Day", icon: "gem" },
    { title: "My Best Friend", text: "Now and Always", icon: "ribbon" },
    { title: "Eternity", text: "Only You, Azra", icon: "flame" }
  ];

  // -------------------------------------------------------------------------
  // Initialization
  // -------------------------------------------------------------------------
  function init() {
    checkReducedMotion();
    loadFavorites();
    setupAudio();
    initAntigravity();
    setupEventListeners();
    updateUI();
  }

  // -------------------------------------------------------------------------
  // LocalStorage Favorites
  // -------------------------------------------------------------------------
  function loadFavorites() {
    try {
      const stored = localStorage.getItem('azra_love_favorites');
      if (stored) {
        const arr = JSON.parse(stored);
        if (Array.isArray(arr)) {
          favorites = new Set(arr);
        }
      }
    } catch (err) {
      console.warn('LocalStorage not available for favorites:', err);
      favorites = new Set();
    }
    updateFavoritesBadge();
  }

  function saveFavorites() {
    try {
      localStorage.setItem('azra_love_favorites', JSON.stringify([...favorites]));
    } catch (err) {
      console.warn('Could not save favorites to localStorage:', err);
    }
    updateFavoritesBadge();
  }

  function toggleCurrentFavorite() {
    const currentId = REASONS[currentIndex].id;
    if (favorites.has(currentId)) {
      favorites.delete(currentId);
      showToast('Removed from favorites');
    } else {
      favorites.add(currentId);
      showToast('Added to your favorites ♥');
    }
    saveFavorites();
    updateFavoriteBtnState();
  }

  function updateFavoriteBtnState() {
    const currentId = REASONS[currentIndex].id;
    const isFav = favorites.has(currentId);
    if (isFav) {
      favoriteBtn.classList.add('active');
      favoriteBtn.setAttribute('aria-label', 'Remove from favorites');
    } else {
      favoriteBtn.classList.remove('active');
      favoriteBtn.setAttribute('aria-label', 'Add to favorites');
    }
  }

  function updateFavoritesBadge() {
    if (favoritesBadge) {
      favoritesBadge.textContent = favorites.size;
      favoritesBadge.style.display = favorites.size > 0 ? 'flex' : 'none';
    }
  }

  // -------------------------------------------------------------------------
  // Audio Support (/audio/song.mp3)
  // -------------------------------------------------------------------------
  function setupAudio() {
    if (!musicBtn) return;

    bgAudio = new Audio('audio/song.mp3');
    bgAudio.loop = true;
    bgAudio.preload = 'metadata';

    // Test if audio is available
    bgAudio.addEventListener('canplaythrough', () => {
      audioAvailable = true;
      musicBtn.style.display = 'flex';
    });

    bgAudio.addEventListener('error', () => {
      // Audio not found or invalid; gracefully hide toggle
      audioAvailable = false;
      musicBtn.style.display = 'none';
    });

    musicBtn.addEventListener('click', toggleAudio);
  }

  function toggleAudio() {
    if (!bgAudio) return;
    if (isPlayingAudio) {
      bgAudio.pause();
      isPlayingAudio = false;
      musicBtn.classList.remove('playing');
      musicBtn.setAttribute('aria-label', 'Play background music');
      showToast('Music paused');
    } else {
      bgAudio.play().then(() => {
        isPlayingAudio = true;
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('aria-label', 'Pause background music');
        showToast('Playing music ♪');
      }).catch(err => {
        console.warn('Playback error or blocked by browser:', err);
        showToast('Tap again to allow audio playback');
      });
    }
  }

  // -------------------------------------------------------------------------
  // Antigravity Photo System
  // -------------------------------------------------------------------------
  function checkReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion = mediaQuery.matches;
    mediaQuery.addEventListener('change', (e) => {
      isReducedMotion = e.matches;
      if (isReducedMotion && animFrameId) {
        cancelAnimationFrame(animFrameId);
      } else if (!isReducedMotion) {
        animFrameLoop();
      }
    });
  }

  function initAntigravity() {
    if (!antigravityContainer) return;
    antigravityContainer.innerHTML = '';
    floatingItems = [];

    const isMobile = window.innerWidth < 768;
    const maxPhotos = isMobile ? 12 : 20;

    // Check if user has supplied photos in PHOTOS
    const hasPhotos = typeof PHOTOS !== 'undefined' && Array.isArray(PHOTOS) && PHOTOS.length > 0;

    const totalCount = hasPhotos ? Math.min(PHOTOS.length, maxPhotos) : Math.min(FALLBACK_POLAROIDS.length, maxPhotos);

    for (let i = 0; i < totalCount; i++) {
      const itemEl = document.createElement('div');
      itemEl.className = 'floating-photo';
      itemEl.setAttribute('role', 'button');
      itemEl.setAttribute('tabindex', '0');

      let photoData = null;

      if (hasPhotos) {
        photoData = PHOTOS[i % PHOTOS.length];
        itemEl.innerHTML = `
          <div class="polaroid-frame">
            <div class="polaroid-img-wrapper">
              <img class="polaroid-img" src="${photoData.src}" alt="${photoData.caption || 'Azra Baby'}" loading="lazy" />
            </div>
            <div class="polaroid-caption">${photoData.caption || 'Azra Baby ♥'}</div>
          </div>
        `;
      } else {
        // Fallback card
        const fb = FALLBACK_POLAROIDS[i % FALLBACK_POLAROIDS.length];
        photoData = {
          src: '',
          caption: `${fb.title} — ${fb.text}`,
          isFallback: true
        };
        itemEl.innerHTML = `
          <div class="polaroid-frame">
            <div class="polaroid-img-wrapper">
              <div class="fallback-polaroid-art">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>${fb.title}</span>
              </div>
            </div>
            <div class="polaroid-caption">${fb.text}</div>
          </div>
        `;
      }

      // Physics State
      const depth = 0.4 + Math.random() * 0.6; // 0.4 to 1.0 (for parallax & blur/scale)
      const baseWidth = isMobile ? (70 + depth * 35) : (95 + depth * 55);

      itemEl.style.width = `${baseWidth}px`;
      itemEl.style.opacity = `${0.65 + depth * 0.35}`;
      itemEl.style.filter = `blur(${(1 - depth) * 1.5}px)`;
      itemEl.style.zIndex = Math.floor(depth * 10);

      // Random initial position spread across screen
      const x = Math.random() * (window.innerWidth - baseWidth);
      const y = Math.random() * (window.innerHeight - baseWidth * 1.3);

      const vx = (Math.random() - 0.5) * (0.35 + depth * 0.25);
      const vy = (Math.random() - 0.5) * (0.35 + depth * 0.25);

      const rot = (Math.random() - 0.5) * 24; // -12deg to +12deg
      const rotSpeed = (Math.random() - 0.5) * 0.04;

      const floatingObj = {
        el: itemEl,
        data: photoData,
        x,
        y,
        vx,
        vy,
        rot,
        rotSpeed,
        depth,
        baseWidth,
        swirlVx: 0,
        swirlVy: 0,
        swirlRot: 0,
        targetX: null,
        targetY: null
      };

      // Tapping/clicking photo pops lightbox
      itemEl.addEventListener('click', () => openLightbox(floatingObj));
      itemEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(floatingObj);
        }
      });

      antigravityContainer.appendChild(itemEl);
      floatingItems.push(floatingObj);
    }

    if (!isReducedMotion) {
      animFrameLoop();
    }
  }

  // Animation Loop (requestAnimationFrame)
  function animFrameLoop() {
    if (isReducedMotion) return;

    // Smooth lerp parallax coordinates
    parallax.currentX += (parallax.targetX - parallax.currentX) * parallax.lerp;
    parallax.currentY += (parallax.targetY - parallax.currentY) * parallax.lerp;

    const winW = window.innerWidth;
    const winH = window.innerHeight;

    for (let i = 0; i < floatingItems.length; i++) {
      const item = floatingItems[i];

      if (isFinale && item.targetX !== null && item.targetY !== null) {
        // Finale Convergence: Smoothly pull into the heart constellation!
        item.x += (item.targetX - item.x) * 0.04;
        item.y += (item.targetY - item.y) * 0.04;
        item.rot += (item.targetRot - item.rot) * 0.05;
      } else {
        // Normal Antigravity Floating Drift
        item.x += item.vx + item.swirlVx;
        item.y += item.vy + item.swirlVy;
        item.rot += item.rotSpeed + item.swirlRot;

        // Dampen swirl impulses smoothly back to normal
        item.swirlVx *= 0.94;
        item.swirlVy *= 0.94;
        item.swirlRot *= 0.94;

        // Gentle boundary wrapping
        const margin = item.baseWidth * 0.8;
        if (item.x < -margin) item.x = winW + margin * 0.5;
        if (item.x > winW + margin) item.x = -margin * 0.5;
        if (item.y < -margin) item.y = winH + margin * 0.5;
        if (item.y > winH + margin) item.y = -margin * 0.5;
      }

      // Parallax offset proportional to depth
      const offsetX = parallax.currentX * item.depth * 35;
      const offsetY = parallax.currentY * item.depth * 35;

      const renderX = item.x + offsetX;
      const renderY = item.y + offsetY;

      item.el.style.transform = `translate3d(${renderX.toFixed(1)}px, ${renderY.toFixed(1)}px, 0) rotate(${item.rot.toFixed(1)}deg)`;
    }

    animFrameId = requestAnimationFrame(animFrameLoop);
  }

  // Gentle swirl effect when turning reasons
  function triggerSwirl() {
    if (isReducedMotion || isFinale) return;
    const count = Math.min(6, floatingItems.length);
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * floatingItems.length);
      const item = floatingItems[idx];
      if (item) {
        item.swirlVx = (Math.random() - 0.5) * 3.5;
        item.swirlVy = (Math.random() - 0.5) * 3.5;
        item.swirlRot = (Math.random() - 0.5) * 1.8;
      }
    }
  }

  // Finale Heart Constellation positioning
  function setupHeartConstellation() {
    const total = floatingItems.length;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const isMobile = window.innerWidth < 768;
    
    // Scale heart size based on screen
    const heartScale = isMobile ? (window.innerWidth * 0.024) : (window.innerWidth * 0.016);

    for (let i = 0; i < total; i++) {
      const item = floatingItems[i];
      // Parametric Heart Formula
      const t = (i / total) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      item.targetX = centerX + hx * heartScale - item.baseWidth / 2;
      item.targetY = centerY + hy * heartScale - item.baseWidth / 2;
      // Angle along the tangent of the heart
      item.targetRot = (Math.sin(t) * 15);
    }
  }

  // -------------------------------------------------------------------------
  // Lightbox Modal
  // -------------------------------------------------------------------------
  function openLightbox(floatingObj) {
    if (!lightboxModal) return;

    if (floatingObj.data.src) {
      lightboxImg.src = floatingObj.data.src;
      lightboxImg.style.display = 'block';
    } else {
      // Fallback display
      lightboxImg.src = '';
      lightboxImg.style.display = 'none';
    }

    lightboxCaption.textContent = floatingObj.data.caption || 'Azra Baby ♥';
    lightboxModal.classList.add('open');
    lightboxModal.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('open');
    lightboxModal.setAttribute('aria-hidden', 'true');
  }

  // -------------------------------------------------------------------------
  // Favorites Drawer / Modal
  // -------------------------------------------------------------------------
  function openFavoritesModal() {
    if (!favoritesModal || !favoritesList) return;

    favoritesList.innerHTML = '';

    if (favorites.size === 0) {
      favoritesList.innerHTML = `
        <div class="favorites-empty">
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <p>You haven't saved any favorite reasons yet!</p>
          <p style="font-size: 0.85rem; margin-top: 6px;">Tap the heart icon (♥) on any card to keep it here.</p>
        </div>
      `;
    } else {
      const sortedIds = [...favorites].sort((a, b) => a - b);
      sortedIds.forEach(id => {
        const item = REASONS.find(r => r.id === id);
        if (!item) return;

        const card = document.createElement('div');
        card.className = 'favorite-item-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.innerHTML = `
          <div class="favorite-item-num">#${String(item.id).padStart(3, '0')}</div>
          <div class="favorite-item-text">${item.text}</div>
        `;
        card.addEventListener('click', () => {
          closeFavoritesModal();
          goToReason(item.id - 1);
        });
        favoritesList.appendChild(card);
      });
    }

    favoritesModal.classList.add('open');
    favoritesModal.setAttribute('aria-hidden', 'false');
  }

  function closeFavoritesModal() {
    if (!favoritesModal) return;
    favoritesModal.classList.remove('open');
    favoritesModal.setAttribute('aria-hidden', 'true');
  }

  // -------------------------------------------------------------------------
  // UI Deck & Reason Updates
  // -------------------------------------------------------------------------
  function updateUI(direction = null) {
    const reason = REASONS[currentIndex];
    if (!reason) return;

    // Apply animation classes
    if (direction) {
      reasonCard.classList.remove('slide-in-left', 'slide-in-right');
      void reasonCard.offsetWidth; // Trigger reflow
      reasonCard.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
    }

    // Update Content
    reasonCategory.textContent = reason.tag || 'Forever & Always';
    reasonNumber.textContent = `#${String(reason.id).padStart(3, '0')}`;
    reasonText.textContent = reason.text;

    // Progress
    const total = REASONS.length;
    const currentNum = currentIndex + 1;
    progressCounter.innerHTML = `Reason <strong>${currentNum}</strong> of ${total}`;
    const percent = ((currentNum / total) * 100).toFixed(1);
    progressBarFill.style.width = `${percent}%`;

    // Button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.textContent = currentIndex === total - 1 ? 'Reveal Love Note ♥' : 'Next Reason →';

    updateFavoriteBtnState();
    triggerSwirl();
  }

  function nextReason() {
    if (currentIndex < REASONS.length - 1) {
      currentIndex++;
      updateUI('next');
    } else {
      triggerFinale();
    }
  }

  function prevReason() {
    if (currentIndex > 0) {
      currentIndex--;
      updateUI('prev');
    }
  }

  function surpriseMe() {
    if (REASONS.length <= 1) return;
    let nextIdx = currentIndex;
    while (nextIdx === currentIndex) {
      nextIdx = Math.floor(Math.random() * REASONS.length);
    }
    currentIndex = nextIdx;
    updateUI('next');
    showToast('Surprise reason chosen! ✨');
  }

  function goToReason(index) {
    if (index >= 0 && index < REASONS.length) {
      const dir = index > currentIndex ? 'next' : 'prev';
      currentIndex = index;
      if (deckScreen.classList.contains('hidden')) {
        finaleScreen.classList.add('hidden');
        deckScreen.classList.remove('hidden');
        isFinale = false;
      }
      updateUI(dir);
    }
  }

  // -------------------------------------------------------------------------
  // Finale Celebration (#100 Finale)
  // -------------------------------------------------------------------------
  function triggerFinale() {
    isFinale = true;
    deckScreen.classList.add('hidden');
    finaleScreen.classList.remove('hidden');

    setupHeartConstellation();
    startConfetti();
    showToast('Happy Anniversary & Endless Love, Azra Baby! 💖');
  }

  function restartExperience() {
    isFinale = false;
    stopConfetti();
    finaleScreen.classList.add('hidden');
    deckScreen.classList.remove('hidden');
    currentIndex = 0;
    updateUI('prev');
  }

  // Canvas Confetti Engine (Hearts & Golden Sparkles)
  let confettiParticles = [];
  let confettiAnimId = null;

  function startConfetti() {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    confettiParticles = [];
    const colors = ['#e91e63', '#f06292', '#f48fb1', '#ffd1dc', '#d4af37', '#f9d423', '#ffffff'];

    for (let i = 0; i < 110; i++) {
      confettiParticles.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * -confettiCanvas.height,
        size: 7 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 3,
        vy: 2 + Math.random() * 3.5,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.08,
        isHeart: Math.random() > 0.45
      });
    }

    function renderConfetti() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

      for (let i = 0; i < confettiParticles.length; i++) {
        const p = confettiParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;

        if (p.isHeart) {
          // Draw heart particle
          const s = p.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.5, s * 0.3, 0, s * 1.5);
          ctx.bezierCurveTo(s * 1.5, s * 0.3, s, -s * 0.5, 0, s * 0.3);
          ctx.fill();
        } else {
          // Rectangular / ribbon confetti
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        }

        ctx.restore();

        // Wrap around top
        if (p.y > confettiCanvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * confettiCanvas.width;
        }
      }

      confettiAnimId = requestAnimationFrame(renderConfetti);
    }

    renderConfetti();
  }

  function stopConfetti() {
    if (confettiAnimId) {
      cancelAnimationFrame(confettiAnimId);
      confettiAnimId = null;
    }
    if (confettiCanvas) {
      const ctx = confettiCanvas.getContext('2d');
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // -------------------------------------------------------------------------
  // Event Listeners & Gestures
  // -------------------------------------------------------------------------
  function setupEventListeners() {
    // Start Button on Welcome Screen
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        deckScreen.classList.remove('hidden');
        updateUI();
      });
    }

    // Navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', nextReason);
    if (prevBtn) prevBtn.addEventListener('click', prevReason);
    if (surpriseBtn) surpriseBtn.addEventListener('click', surpriseMe);
    if (favoriteBtn) favoriteBtn.addEventListener('click', toggleCurrentFavorite);

    if (favoritesBtn) favoritesBtn.addEventListener('click', openFavoritesModal);
    if (favoritesClose) favoritesClose.addEventListener('click', closeFavoritesModal);
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (restartBtn) restartBtn.addEventListener('click', restartExperience);
    if (finaleFavoritesBtn) finaleFavoritesBtn.addEventListener('click', openFavoritesModal);

    // Modal background close
    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
      });
    }
    if (favoritesModal) {
      favoritesModal.addEventListener('click', (e) => {
        if (e.target === favoritesModal) closeFavoritesModal();
      });
    }

    // Keyboard Navigation
    window.addEventListener('keydown', (e) => {
      if (lightboxModal && lightboxModal.classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        return;
      }
      if (favoritesModal && favoritesModal.classList.contains('open')) {
        if (e.key === 'Escape') closeFavoritesModal();
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextReason();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevReason();
      } else if (e.key.toLowerCase() === 'f') {
        toggleCurrentFavorite();
      } else if (e.key.toLowerCase() === 'r') {
        surpriseMe();
      }
    });

    // Touch Swipe Gestures on Reason Card
    if (reasonCard) {
      reasonCard.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchDeltaX = 0;
          isSwiping = true;
        }
      }, { passive: true });

      reasonCard.addEventListener('touchmove', (e) => {
        if (!isSwiping || e.touches.length !== 1) return;
        touchDeltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;

        // Only handle horizontal swipe if horizontal movement is dominant
        if (Math.abs(touchDeltaX) > Math.abs(deltaY) && Math.abs(touchDeltaX) > 10) {
          const rotation = (touchDeltaX / window.innerWidth) * 16;
          reasonCard.style.transform = `translateX(${touchDeltaX * 0.45}px) rotate(${rotation}deg)`;
        }
      }, { passive: true });

      reasonCard.addEventListener('touchend', () => {
        if (!isSwiping) return;
        isSwiping = false;

        reasonCard.style.transform = '';

        const threshold = 55;
        if (touchDeltaX < -threshold) {
          nextReason();
        } else if (touchDeltaX > threshold) {
          prevReason();
        }
      });
    }

    // Mouse Movement Parallax (Desktop)
    window.addEventListener('mousemove', (e) => {
      parallax.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      parallax.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Mobile Device Orientation Parallax (iOS & Android)
    if (window.DeviceOrientationEvent) {
      const handleOrientation = (e) => {
        if (e.gamma !== null && e.beta !== null) {
          // gamma is left/right [-90, 90], beta is front/back [-180, 180]
          parallax.targetX = Math.max(-1, Math.min(1, e.gamma / 28));
          parallax.targetY = Math.max(-1, Math.min(1, (e.beta - 40) / 28));
        }
      };

      // Request iOS 13+ permission on user interaction
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        document.addEventListener('click', function requestTiltPermission() {
          DeviceOrientationEvent.requestPermission().then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          }).catch(console.warn);
          document.removeEventListener('click', requestTiltPermission);
        }, { once: true });
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }

    // Window Resize
    window.addEventListener('resize', () => {
      if (confettiCanvas && isFinale) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
      }
    });
  }

  // -------------------------------------------------------------------------
  // Toast Helper
  // -------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    container.innerHTML = `<div class="toast">${message}</div>`;

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      container.innerHTML = '';
    }, 2500);
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

