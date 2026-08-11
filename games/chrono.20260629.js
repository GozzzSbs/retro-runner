/* global i18n */
(function () {
  'use strict';

  if (document.getElementById('chrono')) return;

  const chronoCssHref = '/css/chrono.css?v=32';
  const chronoCssLink = document.querySelector('link[data-chrono-css], link[href*="/css/chrono.css"]');
  if (chronoCssLink) {
    chronoCssLink.href = chronoCssHref;
    chronoCssLink.dataset.chronoCss = 'true';
  } else {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chronoCssHref;
    link.dataset.chronoCss = 'true';
    document.head.appendChild(link);
  }

  document.body.insertAdjacentHTML('beforeend', `
<div id="chrono" class="livesplit-chrono" aria-label="LiveSplit style timer">
  <div class="chrono-time" aria-hidden="true">
    <span id="chronoMain" class="chrono-main">0.00</span><span id="chronoFraction" class="chrono-fraction"></span>
  </div>
  <button id="chronoGearHint" class="chrono-gear-hint" type="button" title="Segure para abrir configurações" aria-label="Abrir configurações do cronômetro (segure)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  </button>
</div>

<div id="chronoSettingsPopup" class="settings-popup" style="display:none; z-index: 2147483647;">
  <div class="settings-popup-header">
    <h3 data-i18n="chronoSettings">Configurações do cronômetro</h3>
    <button class="settings-close" id="closeChronoSettingsBtn" type="button" aria-label="Close">&times;</button>
  </div>
  <div class="settings-popup-content">
    <div class="settings-section-title" data-i18n="chronoVisual">Visual do cronômetro</div>
    <div class="setting-item chrono-background-item">
      <label data-i18n="chronoBackgroundImage">Timer Background Image</label>
      <div class="chrono-background-controls">
        <input type="file" id="chronoBgImageUpload" accept="image/*" hidden>
        <button id="chronoBgImageUploadBtn" class="key-badge chrono-mini-btn" type="button" data-i18n="backgroundUpload">Upload</button>
        <div id="chronoBgImagePreview" class="chrono-bg-preview" aria-hidden="true"></div>
        <button id="chronoBgImageResetBtn" class="key-badge chrono-mini-btn" type="button" data-i18n="reset">Reset</button>
      </div>
    </div>
    <div class="setting-item chrono-font-item">
      <label data-i18n="chronoCustomFont">Fonte do cronômetro</label>
      <div class="chrono-font-controls">
        <input type="file" id="chronoFontUpload" accept=".ttf,.otf,.woff,.woff2,font/*" hidden>
        <button id="chronoFontUploadBtn" class="key-badge chrono-mini-btn" type="button" data-i18n="fontUpload">Upload</button>
        <span id="chronoFontName" class="chrono-font-name" data-i18n="chronoDefaultFont">Padrão LiveSplit</span>
        <button id="chronoFontResetBtn" class="key-badge chrono-mini-btn" type="button" data-i18n="reset">Reset</button>
      </div>
    </div>
    <div class="setting-item">
      <label data-i18n="chronoBorderRadius">Arredondamento das bordas</label>
      <div class="range-with-value">
        <input type="range" id="chronoBorderRadiusSlider" min="0" max="48" value="12">
        <span id="chronoBorderRadiusValue" class="setting-value">12px</span>
      </div>
    </div>
    <div class="setting-item">
      <label data-i18n="size">Size</label>
      <input type="range" id="chronoSizeSlider" min="55" max="150" value="100">
    </div>
    <div class="setting-item">
      <label data-i18n="chronoNumberSize">Tamanho do n&uacute;mero</label>
      <div class="range-with-value">
        <input type="range" id="chronoNumberSizeSlider" min="70" max="170" value="100">
        <span id="chronoNumberSizeValue" class="setting-value">100%</span>
      </div>
    </div>
    <div class="setting-item">
      <label data-i18n="chronoWidth">Largura</label>
      <div class="range-with-value">
        <input type="range" id="chronoWidthSlider" min="160" max="900" value="326">
        <span id="chronoWidthValue" class="setting-value">326px</span>
      </div>
    </div>
    <div class="setting-item">
      <label data-i18n="chronoHeight">Altura</label>
      <div class="range-with-value">
        <input type="range" id="chronoHeightSlider" min="42" max="280" value="82">
        <span id="chronoHeightValue" class="setting-value">82px</span>
      </div>
    </div>
    <div class="setting-item checkbox-item">
      <label class="switch-label">
        <input type="checkbox" id="showMillisecondsCheckbox" checked>
        <span data-i18n="showMilliseconds">Show milliseconds</span>
      </label>
    </div>
    <div class="setting-item checkbox-item">
      <label class="switch-label">
        <input type="checkbox" id="chronoAutoAudioCheckbox" checked>
        <span data-i18n="chronoAutoAudio">Iniciar e parar automaticamente</span>
      </label>
    </div>
    <div class="setting-item color-row">
      <label data-i18n="bgColor">Background Color</label>
      <input type="color" id="chronoBgColor" value="#000000">
    </div>
    <div class="setting-item color-row no-border">
      <label data-i18n="textColor">Text Color</label>
      <input type="color" id="chronoTextColor" value="#29cc54">
    </div>
    <div class="setting-divider"></div>
    <div class="settings-section-title" data-i18n="chronoHotkeys">Atalhos do cronômetro</div>
    <div class="keybind-grid">
      <div class="setting-item">
        <label data-i18n="chronoStartKey">Tecla para iniciar</label>
        <button id="chronoStartKeyBtn" class="key-badge" type="button">Q</button>
      </div>
      <div class="setting-item">
        <label data-i18n="chronoPauseKey">Tecla para pausar</label>
        <button id="chronoPauseKeyBtn" class="key-badge" type="button">P</button>
      </div>
      <div class="setting-item">
        <label data-i18n="chronoResetKey">Tecla para reiniciar</label>
        <button id="chronoResetKeyBtn" class="key-badge" type="button">R</button>
      </div>
    </div>
  </div>
</div>
`);

  if (window.i18n?.updateAllTexts) {
    window.i18n.updateAllTexts(document.getElementById('chronoSettingsPopup') || document);
  }

  const chronoEl = document.getElementById('chrono');
  const popup = document.getElementById('chronoSettingsPopup');
  const closeBtn = document.getElementById('closeChronoSettingsBtn');
  const chronoTimeEl = chronoEl.querySelector('.chrono-time');
  const mainEl = document.getElementById('chronoMain');
  const fractionEl = document.getElementById('chronoFraction');
  const sizeSlider = document.getElementById('chronoSizeSlider');
  const numberSizeSlider = document.getElementById('chronoNumberSizeSlider');
  const numberSizeValue = document.getElementById('chronoNumberSizeValue');
  const borderRadiusSlider = document.getElementById('chronoBorderRadiusSlider');
  const borderRadiusValue = document.getElementById('chronoBorderRadiusValue');
  const widthSlider = document.getElementById('chronoWidthSlider');
  const heightSlider = document.getElementById('chronoHeightSlider');
  const widthValue = document.getElementById('chronoWidthValue');
  const heightValue = document.getElementById('chronoHeightValue');
  const showMillisecondsCheckbox = document.getElementById('showMillisecondsCheckbox');
  const chronoAutoAudioCheckbox = document.getElementById('chronoAutoAudioCheckbox');
  const chronoBgColor = document.getElementById('chronoBgColor');
  const chronoTextColor = document.getElementById('chronoTextColor');
  const chronoBgImageUpload = document.getElementById('chronoBgImageUpload');
  const chronoBgImageUploadBtn = document.getElementById('chronoBgImageUploadBtn');
  const chronoBgImageResetBtn = document.getElementById('chronoBgImageResetBtn');
  const chronoBgImagePreview = document.getElementById('chronoBgImagePreview');
  const chronoFontUpload = document.getElementById('chronoFontUpload');
  const chronoFontUploadBtn = document.getElementById('chronoFontUploadBtn');
  const chronoFontResetBtn = document.getElementById('chronoFontResetBtn');
  const chronoFontName = document.getElementById('chronoFontName');
  const keyButtons = {
    start: document.getElementById('chronoStartKeyBtn'),
    pause: document.getElementById('chronoPauseKeyBtn'),
    reset: document.getElementById('chronoResetKeyBtn'),
  };

  function syncLocalizedAria() {
    if (!closeBtn) return;
    closeBtn.setAttribute('aria-label', window.i18n?.t?.('cancel') || 'Close');
  }

  syncLocalizedAria();
  window.addEventListener('ashuni:languagechange', () => {
    syncLocalizedAria();
    updateFontLabel();
  });

  const DEFAULTS = {
    size: 100,
    numberSize: 100,
    borderRadius: 12,
    width: 326,
    height: 82,
    showMilliseconds: true,
    autoAudioEnabled: true,
    bgColor: '#000000',
    textColor: '#29cc54',
    notRunningColor: '#7a7a7a',
    left: '40px',
    top: '100px',
    startKey: 'KeyQ',
    pauseKey: 'KeyP',
    resetKey: 'KeyR',
  };
  const RESIZE = {
    handleSize: 5,
    minWidth: 160,
    maxWidth: 900,
    minHeight: 42,
    maxHeight: 280,
    liveSplitBaseHeight: 70,
  };
  const AUDIO_PROFILES = {
    start: {
      lengths: new Set([167183, 166069]),
      approxLengths: [167183, 166069],
      lengthTolerance: 700,
      ignoredLengths: new Set([182787, 168000]),
      expectedDuration: 3.464580535888672,
      durationTolerance: 0.09,
    },
    coin: {
      lengths: new Set([27863]),
      approxLengths: [27863],
      lengthTolerance: 900,
      durationMin: 0.52,
      durationMax: 0.589,
    },
    jump: {
      lengths: new Set([27863, 28675]),
      approxLengths: [27863, 28675],
      lengthTolerance: 900,
      durationMin: 0.59,
      durationMax: 0.625,
    },
  };
  const AUTO_AUDIO = {
    startupIgnoreMs: 1200,
    duplicateWindowMs: 80,
    jumpSuppressMs: 320,
    hardJumpSuppressMs: 110,
    coinFallbackMaxDuration: 0.625,
    ambiguousCoinMinDuration: 0.585,
    ambiguousCoinMaxDuration: 0.605,
  };

  let elapsedMs = 0;
  let startTime = 0;
  let timerState = 'stopped';
  let animationFrame = 0;
  let lastRendered = '';
  let clickTimer = 0;
  let dragging = false;
  let resizing = false;
  let resizeDirection = '';
  let moved = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let resizeStart = null;
  let longPressTimer = 0;
  let longPressOpened = false;
  let resizeFrame = 0;
  let showMilliseconds = true;
  let autoAudioEnabled = true;
  let startKey = DEFAULTS.startKey;
  let pauseKey = DEFAULTS.pauseKey;
  let resetKey = DEFAULTS.resetKey;
  let lastGradientKey = '';
  let lastFitSignature = '';
  let pendingKeyBind = null;
  let initialFitRefreshDone = false;
  let chronoBackgroundImage = '';
  let chronoCustomFontData = '';
  let chronoCustomFontName = '';
  let autoStartedAtMs = 0;
  let lastAudioSignature = '';
  let lastAudioAtMs = 0;
  let lastJumpInputAtMs = 0;
  let jumpCoinSuppressionUsed = false;
  const heldControlKeys = new Set();
  const touchJumpPointers = new Map();
  let autoAudioListenersInstalled = false;
  let autoAudioPointerTrackingInstalled = false;
  const audioSignatureEventCache = new Map();
  let pendingAudioDispatches = 0;
  let audioHookInstalled = false;
  let audioHookOriginalStart = null;
  let audioHookPatchedStart = null;
  let saveTimeout = 0;

  function installAutoAudioHook() {
    const proto = window.AudioBufferSourceNode && window.AudioBufferSourceNode.prototype;
    if (!proto || typeof proto.start !== 'function') return;

    if (audioHookInstalled && proto.start === audioHookPatchedStart) return;

    audioHookOriginalStart = proto.start;
    audioHookPatchedStart = function patchedChronoStart() {
      const result = audioHookOriginalStart.apply(this, arguments);
      if (autoAudioEnabled && this.buffer) {
        const buf = this.buffer;
        queueMicrotask(() => {
          if (!autoAudioEnabled) return;
          const data = classifyAudioBuffer(buf, 'WebAudio');
          if (data) dispatchAudioEventLater(data);
        });
      }
      return result;
    };
    audioHookPatchedStart.__ashuniChronoAudioHook = true;
    proto.start = audioHookPatchedStart;
    audioHookInstalled = true;
  }

  function uninstallAutoAudioHook() {
    const proto = window.AudioBufferSourceNode && window.AudioBufferSourceNode.prototype;
    if (
      proto &&
      audioHookInstalled &&
      audioHookOriginalStart &&
      proto.start === audioHookPatchedStart
    ) {
      proto.start = audioHookOriginalStart;
    }

    audioHookInstalled = false;
    audioHookOriginalStart = null;
    audioHookPatchedStart = null;
  }

  function cacheAudioSignature(key, value) {
    if (audioSignatureEventCache.size > 96) audioSignatureEventCache.clear();
    audioSignatureEventCache.set(key, value);
    return value;
  }

  function now() {
    return performance.now();
  }

  function classifyAudioBuffer(buffer, source = 'WebAudio') {
    if (!buffer) return null;

    const length = Number(buffer.length || 0) || 0;
    const duration = Number(buffer.duration || 0) || 0;
    if (!length || !duration) return null;

    const signature = `${length}:${Math.round(duration * 1000)}`;
    if (audioSignatureEventCache.has(signature)) {
      return audioSignatureEventCache.get(signature);
    }

    let kind = '';
    const data = { type: 'GAME_AUDIO_PLAYED', source, length, duration };
    if (isStartAudioEvent(data)) kind = 'start';
    else if (isCoinAudioEvent(data) || isFallbackCoinEvent(data)) kind = 'coin';
    else if (isJumpAudioEvent(data)) kind = 'jump';

    const result = kind ? { ...data, kind } : null;
    cacheAudioSignature(signature, result);
    return result;
  }

  function dispatchAudioEventLater(data) {
    if (!data) return;
    pendingAudioDispatches += 1;
    const run = () => {
      pendingAudioDispatches = Math.max(0, pendingAudioDispatches - 1);
      handleGameAudioMessage(data);
    };

    if (typeof queueMicrotask === 'function') queueMicrotask(run);
    else Promise.resolve().then(run).catch(() => {});
  }

  function matchesAudioProfile(data, profile) {
    if (!profile) return false;
    const length = Number(data && data.length) || 0;
    const duration = Number(data && data.duration) || 0;

    if (profile.ignoredLengths?.has(length)) return false;

    const matchesApproxLength = Array.isArray(profile.approxLengths) && profile.approxLengths.some((value) => (
      Math.abs(length - value) <= (profile.lengthTolerance || 0)
    ));

    const matchesDurationRange = (
      Number.isFinite(profile.durationMin) &&
      Number.isFinite(profile.durationMax) &&
      duration >= profile.durationMin &&
      duration <= profile.durationMax
    );

    if (profile.lengths?.has(length)) {
      if (Number.isFinite(profile.durationMin) && Number.isFinite(profile.durationMax)) {
        return matchesDurationRange;
      }
      if (!Number.isFinite(profile.expectedDuration) || !Number.isFinite(duration)) return true;
      return Math.abs(duration - profile.expectedDuration) <= profile.durationTolerance;
    }

    if (matchesApproxLength) {
      if (Number.isFinite(profile.durationMin) && Number.isFinite(profile.durationMax)) {
        return matchesDurationRange;
      }
      if (!Number.isFinite(profile.expectedDuration) || !Number.isFinite(duration)) return true;
      return Math.abs(duration - profile.expectedDuration) <= profile.durationTolerance;
    }

    return false;
  }

  function isStartAudioEvent(data) {
    return matchesAudioProfile(data, AUDIO_PROFILES.start);
  }

  function isCoinAudioEvent(data) {
    return matchesAudioProfile(data, AUDIO_PROFILES.coin);
  }

  function isJumpAudioEvent(data) {
    return matchesAudioProfile(data, AUDIO_PROFILES.jump);
  }

  function settingKeyToCode(value, fallback) {
    const raw = String(value || fallback || '').trim();
    if (!raw) return settingKeyToCode(fallback, 'W');
    if (/^Key[A-Z]$/i.test(raw)) return `Key${raw.slice(3).toUpperCase()}`;
    if (/^Digit[0-9]$/i.test(raw)) return `Digit${raw.slice(5)}`;
    if (/^Arrow(Up|Down|Left|Right)$/i.test(raw)) {
      return `Arrow${raw.slice(5, 6).toUpperCase()}${raw.slice(6).toLowerCase()}`;
    }
    if (raw === 'Space' || raw === ' ') return 'Space';
    if (/^[a-z]$/i.test(raw)) return `Key${raw.toUpperCase()}`;
    if (/^[0-9]$/.test(raw)) return `Digit${raw}`;
    return raw;
  }

  function getConfiguredJumpCodes() {
    const codes = new Set(['ArrowUp', 'Space', 'KeyW']);
    try {
      codes.add(settingKeyToCode(localStorage.getItem('keyUp'), 'W'));
    } catch {}
    return codes;
  }

  function isJumpControlEvent(event) {
    if (!event) return false;
    const codes = getConfiguredJumpCodes();
    if (event.code && codes.has(event.code)) return true;
    if (event.key === 'ArrowUp' || event.key === ' ' || event.key === 'Space') return true;
    return false;
  }

  function rememberJumpInput(source) {
    lastJumpInputAtMs = Date.now();
    jumpCoinSuppressionUsed = false;
    window.__ashuniChronoLastJumpInput = {
      at: lastJumpInputAtMs,
      source: source || 'keyboard',
    };
  }

  function isAmbiguousCoinEvent(data) {
    const duration = Number(data && data.duration) || 0;
    return duration >= AUTO_AUDIO.ambiguousCoinMinDuration &&
      duration <= AUTO_AUDIO.ambiguousCoinMaxDuration;
  }

  function jumpInputAge(eventNow) {
    if (lastJumpInputAtMs <= 0) return Infinity;
    return eventNow - lastJumpInputAtMs;
  }

  function hasRecentJumpInput(eventNow, windowMs = AUTO_AUDIO.jumpSuppressMs) {
    const age = jumpInputAge(eventNow);
    return age >= 0 && age <= windowMs;
  }

  function isCoinSizedAudio(data) {
    const length = Number(data && data.length) || 0;
    return AUDIO_PROFILES.coin.approxLengths.some((value) => (
      Math.abs(length - value) <= AUDIO_PROFILES.coin.lengthTolerance
    ));
  }

  function isJumpSizedAudio(data) {
    const length = Number(data && data.length) || 0;
    return AUDIO_PROFILES.jump.approxLengths.some((value) => (
      Math.abs(length - value) <= AUDIO_PROFILES.jump.lengthTolerance
    ));
  }

  function isFallbackCoinEvent(data) {
    const duration = Number(data && data.duration) || 0;
    return isCoinSizedAudio(data) &&
      duration >= AUDIO_PROFILES.coin.durationMin &&
      duration <= AUTO_AUDIO.coinFallbackMaxDuration;
  }

  function isJumpLikeAudioCollision(data, msSinceJump) {
    if (!isJumpSizedAudio(data)) return false;
    if (isJumpAudioEvent(data)) return true;
    return isAmbiguousCoinEvent(data) && msSinceJump <= AUTO_AUDIO.hardJumpSuppressMs;
  }

  function shouldIgnoreCoinAfterJump(eventNow, data) {
    const msSinceJump = jumpInputAge(eventNow);
    if (msSinceJump < 0 || msSinceJump > AUTO_AUDIO.jumpSuppressMs) return false;
    if (jumpCoinSuppressionUsed) return false;

    // Some browsers/devices report the jump sound with the same buffer length as
    // the coin sound. Ignore only the first suspicious audio after a jump so a
    // real coin collected immediately after still has a second chance to stop.
    if (isJumpLikeAudioCollision(data, msSinceJump)) {
      jumpCoinSuppressionUsed = true;
      return true;
    }

    return false;
  }

  function startTimerFromAudio() {
    stopTick();
    elapsedMs = 0;
    startTime = now();
    timerState = 'running';
    autoStartedAtMs = Date.now();
    render(true);
    startTick();
    saveSettings();
  }

  function stopTimerFromAudio() {
    if (timerState !== 'running') return;
    pauseTimer();
  }

  function handleGameAudioMessage(data) {
    if (!autoAudioEnabled) return;
    const length = Number(data && data.length) || 0;
    const duration = Number(data && data.duration) || 0;
    const signature = `${length}:${Math.round(duration * 1000)}`;
    const eventNow = Date.now();
    if (signature === lastAudioSignature && (eventNow - lastAudioAtMs) < AUTO_AUDIO.duplicateWindowMs) return;
    lastAudioSignature = signature;
    lastAudioAtMs = eventNow;

    const kind = data && data.kind;
    const isStart = kind === 'start' || (!kind && isStartAudioEvent(data));
    const isJump = kind === 'jump' || (!kind && isJumpAudioEvent(data));
    const isCoin = kind === 'coin' || (!kind && (isCoinAudioEvent(data) || isFallbackCoinEvent(data)));

    if (isStart) {
      startTimerFromAudio();
      return;
    }

    if (isJump && hasRecentJumpInput(eventNow) && !jumpCoinSuppressionUsed) {
      jumpCoinSuppressionUsed = true;
      window.__ashuniChronoLastIgnoredAudio = {
        reason: 'jump-audio',
        length,
        duration,
      };
      return;
    }

    if (!isCoin) return;
    if (timerState !== 'running') return;
    if ((eventNow - autoStartedAtMs) < AUTO_AUDIO.startupIgnoreMs) return;
    if (shouldIgnoreCoinAfterJump(eventNow, data)) {
      window.__ashuniChronoLastIgnoredAudio = {
        reason: 'recent-jump',
        length,
        duration,
        msSinceJump: eventNow - lastJumpInputAtMs,
      };
      return;
    }
    stopTimerFromAudio();
  }

  function handleAutoAudioPointerDown(event) {
    if (!autoAudioEnabled) return;
    if (event.pointerType === 'mouse') return;
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('#chrono, #chronoSettingsPopup, #wasdWidget, #wasdSettingsPopup, .settings-popup-overlay, button, input, textarea, select, a')) return;
    touchJumpPointers.set(event.pointerId, {
      startX: event.clientX,
      startY: event.clientY,
      lastMoveAt: 0,
      marked: false,
    });
    installAutoAudioPointerTracking();
  }

  function handleAutoAudioPointerMove(event) {
    if (!autoAudioEnabled) return;
    if (event.pointerType === 'mouse') return;
    const pointer = touchJumpPointers.get(event.pointerId);
    if (!pointer || pointer.marked) return;

    const eventTime = event.timeStamp || now();
    if (pointer.lastMoveAt && eventTime - pointer.lastMoveAt < 16) return;
    pointer.lastMoveAt = eventTime;

    const dy = pointer.startY - event.clientY;
    const dx = Math.abs(event.clientX - pointer.startX);
    const jumpThreshold = event.pointerType === 'touch' ? 56 : 44;
    if (dy < jumpThreshold || dx > dy * 1.15) return;

    pointer.marked = true;
    rememberJumpInput('touch-swipe');
  }

  function handleAutoAudioPointerEnd(event) {
    touchJumpPointers.delete(event.pointerId);
    if (touchJumpPointers.size === 0) uninstallAutoAudioPointerTracking();
  }

  function handleAutoAudioMessage(event) {
    if (event.source !== window) return;
    if (event.origin !== window.location.origin) return;
    if (!event.data || event.data.type !== 'GAME_AUDIO_PLAYED') return;
    handleGameAudioMessage(event.data);
  }

  function installAutoAudioPointerTracking() {
    if (autoAudioPointerTrackingInstalled) return;
    document.addEventListener('pointermove', handleAutoAudioPointerMove, true);
    document.addEventListener('pointerup', handleAutoAudioPointerEnd, true);
    document.addEventListener('pointercancel', handleAutoAudioPointerEnd, true);
    autoAudioPointerTrackingInstalled = true;
  }

  function uninstallAutoAudioPointerTracking() {
    if (!autoAudioPointerTrackingInstalled) return;
    document.removeEventListener('pointermove', handleAutoAudioPointerMove, true);
    document.removeEventListener('pointerup', handleAutoAudioPointerEnd, true);
    document.removeEventListener('pointercancel', handleAutoAudioPointerEnd, true);
    autoAudioPointerTrackingInstalled = false;
  }

  function syncAutoAudioListeners() {
    if (autoAudioEnabled) {
      installAutoAudioHook();
      if (!autoAudioListenersInstalled) {
        document.addEventListener('pointerdown', handleAutoAudioPointerDown, true);
        window.addEventListener('message', handleAutoAudioMessage);
        autoAudioListenersInstalled = true;
      }
      return;
    }

    uninstallAutoAudioHook();
    uninstallAutoAudioPointerTracking();
    touchJumpPointers.clear();
    if (!autoAudioListenersInstalled) return;
    document.removeEventListener('pointerdown', handleAutoAudioPointerDown, true);
    window.removeEventListener('message', handleAutoAudioMessage);
    autoAudioListenersInstalled = false;
  }

  function safeSettings() {
    try {
      return JSON.parse(localStorage.getItem('chronoSettings') || '{}') || {};
    } catch {
      return {};
    }
  }

  function safeHex(value, fallback) {
    const color = String(value || '').trim();
    return /^#[0-9a-f]{6}$/i.test(color) ? color : fallback;
  }

  function safeBackgroundImage(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    return /^data:image\//i.test(raw) ? raw : '';
  }

  function safeFontData(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    return /^data:(font\/|application\/(font-|x-font-|octet-stream))/i.test(raw) ? raw : '';
  }

  function clampNumber(value, fallback, min, max) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(number, max));
  }

  function translate(key, fallback) {
    if (window.i18n?.t) {
      const text = window.i18n.t(key);
      return text === key ? fallback : text;
    }
    return fallback;
  }

  function keyLabel(code) {
    const labels = {
      Space: 'Space',
      Escape: 'Esc',
      Backspace: 'Backspace',
      Tab: 'Tab',
      Enter: 'Enter',
      ShiftLeft: 'Shift',
      ShiftRight: 'Shift',
      ControlLeft: 'Ctrl',
      ControlRight: 'Ctrl',
      AltLeft: 'Alt',
      AltRight: 'Alt',
      ArrowUp: '\u2191',
      ArrowDown: '\u2193',
      ArrowLeft: '\u2190',
      ArrowRight: '\u2192',
    };
    if (labels[code]) return labels[code];
    if (/^Key[A-Z]$/.test(code)) return code.slice(3);
    if (/^Digit[0-9]$/.test(code)) return code.slice(5);
    if (/^Numpad[0-9]$/.test(code)) return `Num ${code.slice(6)}`;
    return String(code || '?').replace(/^(Key|Digit)/, '');
  }

  function updateRangeLabels() {
    numberSizeValue.textContent = `${numberSizeSlider.value}%`;
    borderRadiusValue.textContent = `${currentBorderRadius()}px`;
    widthValue.textContent = `${widthSlider.value}px`;
    heightValue.textContent = `${heightSlider.value}px`;
  }

  function currentScale() {
    return Math.max(0.55, Math.min(Number(sizeSlider.value) || DEFAULTS.size, 150)) / 100;
  }

  function currentNumberScale() {
    return clampNumber(numberSizeSlider.value, DEFAULTS.numberSize, 70, 170) / 100;
  }

  function currentBorderRadius() {
    return clampNumber(borderRadiusSlider.value, DEFAULTS.borderRadius, 0, 48);
  }

  function currentWidth() {
    return clampNumber(widthSlider.value, DEFAULTS.width, RESIZE.minWidth, RESIZE.maxWidth);
  }

  function currentHeight() {
    return clampNumber(heightSlider.value, DEFAULTS.height, RESIZE.minHeight, RESIZE.maxHeight);
  }

  function resizeCursor(direction) {
    const cursors = {
      n: 'ns-resize',
      s: 'ns-resize',
      e: 'ew-resize',
      w: 'ew-resize',
      ne: 'nesw-resize',
      sw: 'nesw-resize',
      nw: 'nwse-resize',
      se: 'nwse-resize',
    };
    return cursors[direction] || 'grab';
  }

  function getResizeDirection(event) {
    const rect = chronoEl.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      return '';
    }

    const handleSize = Math.min(
      RESIZE.handleSize,
      Math.max(3, Math.min(rect.width, rect.height) * 0.075)
    );
    const nearLeft = event.clientX - rect.left <= handleSize;
    const nearRight = rect.right - event.clientX <= handleSize;
    const nearTop = event.clientY - rect.top <= handleSize;
    const nearBottom = rect.bottom - event.clientY <= handleSize;

    let direction = '';
    if (nearTop) direction += 'n';
    else if (nearBottom) direction += 's';
    if (nearLeft) direction += 'w';
    else if (nearRight) direction += 'e';
    return direction;
  }

  function updateResizeCursor(event) {
    if (dragging || resizing || popup.style.display === 'block') return;
    chronoEl.style.cursor = resizeCursor(getResizeDirection(event));
  }

  function fitTimerText() {
    const width = currentWidth();
    const height = currentHeight();

    chronoEl.style.setProperty('--chrono-fit-scale', '1');
    const unscaledWidth = Math.max(10, chronoTimeEl.scrollWidth + 11);
    const widthFactor = (width - 14) / Math.max(1, unscaledWidth - 14);
    const heightFactor = height / RESIZE.liveSplitBaseHeight;
    const fitScale = Math.max(0.35, Math.min(widthFactor, heightFactor, 5));
    const numberScale = currentNumberScale();
    chronoEl.style.setProperty('--chrono-fit-scale', (fitScale * numberScale).toFixed(4));
  }

  function getFitSignature(parts) {
    return [
      parts.main.length,
      showMilliseconds ? parts.fraction.length : 0,
      currentWidth(),
      currentHeight(),
      numberSizeSlider.value,
    ].join(':');
  }

  function fitTimerTextIfNeeded(parts, force = false) {
    const signature = getFitSignature(parts);
    if (!force && signature === lastFitSignature) return;
    lastFitSignature = signature;
    fitTimerText();
  }

  function refreshTimerFit() {
    lastFitSignature = '';
    render(true);
  }

  function scheduleInitialFitRefresh() {
    if (initialFitRefreshDone) return;
    initialFitRefreshDone = true;

    const refreshOnNextPaint = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(refreshTimerFit);
      });
    };

    refreshOnNextPaint();
    [80, 220, 600].forEach((delay) => {
      setTimeout(refreshTimerFit, delay);
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(refreshTimerFit).catch(() => {});
    }

    window.addEventListener('load', refreshTimerFit, { once: true });
  }

  function clearKeyWaitingState() {
    Object.values(keyButtons).forEach((button) => button.classList.remove('waiting'));
  }

  function updateKeyButtons() {
    keyButtons.start.textContent = keyLabel(startKey);
    keyButtons.pause.textContent = keyLabel(pauseKey);
    keyButtons.reset.textContent = keyLabel(resetKey);
  }

  function setPendingKeyBind(action) {
    pendingKeyBind = action;
    clearKeyWaitingState();
    keyButtons[action].classList.add('waiting');
    keyButtons[action].textContent = translate('pressKey', 'Pressione uma tecla');
  }

  function assignPendingKey(code) {
    if (pendingKeyBind === 'start') startKey = code;
    if (pendingKeyBind === 'pause') pauseKey = code;
    if (pendingKeyBind === 'reset') resetKey = code;
    pendingKeyBind = null;
    clearKeyWaitingState();
    updateKeyButtons();
    scheduleSaveSettings();
  }

  function cancelPendingKeyBind() {
    pendingKeyBind = null;
    clearKeyWaitingState();
    updateKeyButtons();
  }

  function hexToRgb(hex) {
    const color = safeHex(hex, DEFAULTS.textColor).slice(1);
    return {
      r: parseInt(color.slice(0, 2), 16),
      g: parseInt(color.slice(2, 4), 16),
      b: parseInt(color.slice(4, 6), 16),
    };
  }

  function rgbToHex({ r, g, b }) {
    const clamp = (value) => Math.max(0, Math.min(Math.round(value), 255));
    return `#${[clamp(r), clamp(g), clamp(b)].map((value) => value.toString(16).padStart(2, '0')).join('')}`;
  }

  function rgbToHsv({ r, g, b }) {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    let h = 0;

    if (delta !== 0) {
      if (max === red) h = ((green - blue) / delta) % 6;
      else if (max === green) h = (blue - red) / delta + 2;
      else h = (red - green) / delta + 4;
      h /= 6;
      if (h < 0) h += 1;
    }

    return {
      h,
      s: max === 0 ? 0 : delta / max,
      v: max,
    };
  }

  function hsvToRgb({ h, s, v }) {
    const hue = ((h % 1) + 1) % 1;
    const chroma = v * s;
    const x = chroma * (1 - Math.abs(((hue * 6) % 2) - 1));
    const m = v - chroma;
    let r = 0;
    let g = 0;
    let b = 0;

    if (hue < 1 / 6) [r, g, b] = [chroma, x, 0];
    else if (hue < 2 / 6) [r, g, b] = [x, chroma, 0];
    else if (hue < 3 / 6) [r, g, b] = [0, chroma, x];
    else if (hue < 4 / 6) [r, g, b] = [0, x, chroma];
    else if (hue < 5 / 6) [r, g, b] = [x, 0, chroma];
    else [r, g, b] = [chroma, 0, x];

    return {
      r: (r + m) * 255,
      g: (g + m) * 255,
      b: (b + m) * 255,
    };
  }

  function liveSplitGradient(color) {
    const hsv = rgbToHsv(hexToRgb(color));
    const top = hsvToRgb({
      h: hsv.h,
      s: hsv.s * 0.42,
      v: Math.min(1, (1.7 * hsv.v) + 0.16),
    });
    const bottom = hsvToRgb({
      h: hsv.h,
      s: hsv.s,
      v: 0.8 * hsv.v,
    });

    return {
      top: rgbToHex(top),
      bottom: rgbToHex(bottom),
    };
  }

  function updateTimerGradient(force = false) {
    const baseColor = timerState === 'running'
      ? safeHex(chronoTextColor.value, DEFAULTS.textColor)
      : DEFAULTS.notRunningColor;
    const gradientKey = `${timerState}:${baseColor}`;
    if (!force && gradientKey === lastGradientKey) return;

    const gradient = liveSplitGradient(baseColor);
    chronoEl.style.setProperty('--chrono-text', baseColor);
    chronoEl.style.setProperty('--chrono-text-top', gradient.top);
    chronoEl.style.setProperty('--chrono-text-bottom', gradient.bottom);
    chronoEl.style.setProperty('--chrono-text-shine', timerState === 'running'
      ? 'rgba(255, 255, 255, 0.74)'
      : 'rgba(255, 255, 255, 0.58)');
    chronoEl.dataset.phase = timerState === 'running' ? 'running' : 'not-running';
    lastGradientKey = gradientKey;
  }

  function visibleElapsed() {
    return timerState === 'running' ? now() - startTime : elapsedMs;
  }

  function formatLiveSplitTime(ms) {
    const totalMs = Math.max(0, Math.floor(ms));
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const hundredths = Math.floor((totalMs % 1000) / 10);

    let main;
    if (hours > 0) {
      main = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else if (minutes > 0) {
      main = `${minutes}:${String(seconds).padStart(2, '0')}`;
    } else {
      main = `${seconds}`;
    }

    return {
      main: showMilliseconds ? main : `${hours > 0 ? `${hours}:` : ''}${hours > 0 || minutes > 0 ? `${String(minutes).padStart(hours > 0 ? 2 : 1, '0')}:` : ''}${String(seconds).padStart(hours > 0 || minutes > 0 ? 2 : 1, '0')}`,
      fraction: showMilliseconds ? `.${String(hundredths).padStart(2, '0')}` : '',
    };
  }

  function render(force = false) {
    const parts = formatLiveSplitTime(visibleElapsed());
    const rendered = `${parts.main}${parts.fraction}`;
    if (!force && rendered === lastRendered) return;

    if (force) updateTimerGradient(true);
    lastRendered = rendered;
    mainEl.textContent = parts.main;
    fractionEl.textContent = parts.fraction;
    fractionEl.hidden = !showMilliseconds;
    chronoEl.setAttribute('aria-label', rendered);
    fitTimerTextIfNeeded(parts, force);
  }

  function tick() {
    animationFrame = 0;
    if (timerState !== 'running') return;
    render();
    animationFrame = requestAnimationFrame(tick);
  }

  function startTick() {
    if (!animationFrame) animationFrame = requestAnimationFrame(tick);
  }

  function stopTick() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }
  }

  function fontFamilyValue(name) {
    return `"${String(name || 'AshuniChronoCustom').replace(/["\\]/g, '')}"`;
  }

  function applyCustomFont() {
    const styleId = 'ashuniChronoCustomFontStyle';
    let style = document.getElementById(styleId);
    if (!chronoCustomFontData) {
      if (style) style.remove();
      chronoEl.style.removeProperty('--chrono-font-family');
      return;
    }

    const family = fontFamilyValue('AshuniChronoCustom');
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
    style.textContent = `
@font-face {
  font-family: ${family};
  src: url("${chronoCustomFontData}");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}`;
    chronoEl.style.setProperty('--chrono-font-family', `${family}, "LiveSplitTimer", "Century Gothic", "Segoe UI", Arial, sans-serif`);
  }

  function applyVisualSettings() {
    const scale = currentScale();
    const width = currentWidth();
    const height = currentHeight();
    const borderRadius = currentBorderRadius();
    chronoEl.style.setProperty('--chrono-scale', scale);
    chronoEl.style.setProperty('--chrono-width', `${width}px`);
    chronoEl.style.setProperty('--chrono-height', `${height}px`);
    chronoEl.style.setProperty('--chrono-radius', `${borderRadius}px`);
    applyCustomFont();
    const backgroundColor = safeHex(chronoBgColor.value, DEFAULTS.bgColor);
    chronoEl.style.setProperty('--chrono-bg', backgroundColor);
    if (chronoBackgroundImage) {
      chronoEl.style.setProperty('background-image', `url(${chronoBackgroundImage})`, 'important');
      chronoEl.style.setProperty('background-size', '100% 100%', 'important');
      chronoEl.style.setProperty('background-position', 'center', 'important');
      chronoEl.style.setProperty('background-repeat', 'no-repeat', 'important');
      chronoEl.style.setProperty('background-color', 'rgba(0, 0, 0, 0.7)', 'important');
    } else {
      chronoEl.style.removeProperty('background-image');
      chronoEl.style.removeProperty('background-size');
      chronoEl.style.removeProperty('background-position');
      chronoEl.style.removeProperty('background-repeat');
      chronoEl.style.setProperty('background-color', backgroundColor);
    }
    showMilliseconds = showMillisecondsCheckbox.checked;
    updateRangeLabels();
    lastFitSignature = '';
    render(true);
  }

  function updateBackgroundPreview() {
    if (!chronoBgImagePreview) return;
    if (chronoBackgroundImage) {
      chronoBgImagePreview.style.backgroundImage = `url(${chronoBackgroundImage})`;
      chronoBgImagePreview.dataset.empty = 'false';
    } else {
      chronoBgImagePreview.style.backgroundImage = 'none';
      chronoBgImagePreview.dataset.empty = 'true';
    }
  }

  function updateFontLabel() {
    if (!chronoFontName) return;
    const fallback = translate('chronoDefaultFont', 'Padrão LiveSplit');
    chronoFontName.textContent = chronoCustomFontName || fallback;
    chronoFontName.title = chronoCustomFontName || fallback;
  }

  function saveSettings() {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
      saveTimeout = 0;
    }

    const payload = {
      elapsed: elapsedMs,
      timerState,
      size: sizeSlider.value,
      numberSize: numberSizeSlider.value,
      borderRadius: borderRadiusSlider.value,
      width: widthSlider.value,
      height: heightSlider.value,
      showMilliseconds,
      autoAudioEnabled,
      left: chronoEl.style.left,
      top: chronoEl.style.top,
      bgColor: chronoBgColor.value,
      textColor: chronoTextColor.value,
      backgroundImage: chronoBackgroundImage,
      customFontData: chronoCustomFontData,
      customFontName: chronoCustomFontName,
      startKey,
      pauseKey,
      resetKey,
    };

    try {
      localStorage.setItem('chronoSettings', JSON.stringify(payload));
    } catch (_) {
      delete payload.customFontData;
      localStorage.setItem('chronoSettings', JSON.stringify(payload));
    }
  }

  function scheduleSaveSettings() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      saveTimeout = 0;
      saveSettings();
    }, 140);
  }

  function startTimer() {
    if (timerState === 'running') return;
    startTime = now() - elapsedMs;
    timerState = 'running';
    render(true);
    startTick();
    saveSettings();
  }

  function pauseTimer() {
    if (timerState !== 'running') return;
    elapsedMs = visibleElapsed();
    timerState = 'paused';
    stopTick();
    render(true);
    saveSettings();
  }

  function reset() {
    stopTick();
    elapsedMs = 0;
    timerState = 'stopped';
    heldControlKeys.clear();
    render(true);
    saveSettings();
  }

  function toggleStartPause() {
    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = 0;
      reset();
      return;
    }

    clickTimer = setTimeout(() => {
      clickTimer = 0;
      if (timerState === 'running') {
        pauseTimer();
      } else {
        startTimer();
      }
    }, 240);
  }

  function clampPosition() {
    const rect = chronoEl.getBoundingClientRect();
    const maxX = Math.max(0, window.innerWidth - rect.width);
    const maxY = Math.max(0, window.innerHeight - rect.height);
    const x = Math.max(0, Math.min(parseFloat(chronoEl.style.left) || 0, maxX));
    const y = Math.max(0, Math.min(parseFloat(chronoEl.style.top) || 0, maxY));
    chronoEl.style.left = `${Math.round(x)}px`;
    chronoEl.style.top = `${Math.round(y)}px`;
  }

  function beginResize(event, direction) {
    const scale = currentScale();
    resizing = true;
    resizeDirection = direction;
    moved = true;
    resizeStart = {
      x: event.clientX,
      y: event.clientY,
      left: parseFloat(chronoEl.style.left) || 0,
      top: parseFloat(chronoEl.style.top) || 0,
      width: currentWidth(),
      height: currentHeight(),
      scale,
    };
    chronoEl.classList.add('resizing');
    chronoEl.style.cursor = resizeCursor(direction);
  }

  function updateResize(event) {
    if (!resizeStart) return;

    const dx = (event.clientX - resizeStart.x) / resizeStart.scale;
    const dy = (event.clientY - resizeStart.y) / resizeStart.scale;
    let nextWidth = resizeStart.width;
    let nextHeight = resizeStart.height;
    let nextLeft = resizeStart.left;
    let nextTop = resizeStart.top;

    if (resizeDirection.includes('e')) {
      nextWidth = resizeStart.width + dx;
    }
    if (resizeDirection.includes('s')) {
      nextHeight = resizeStart.height + dy;
    }
    if (resizeDirection.includes('w')) {
      nextWidth = resizeStart.width - dx;
      nextWidth = clampNumber(nextWidth, resizeStart.width, RESIZE.minWidth, RESIZE.maxWidth);
      nextLeft = resizeStart.left + resizeStart.width - nextWidth;
    }
    if (resizeDirection.includes('n')) {
      nextHeight = resizeStart.height - dy;
      nextHeight = clampNumber(nextHeight, resizeStart.height, RESIZE.minHeight, RESIZE.maxHeight);
      nextTop = resizeStart.top + resizeStart.height - nextHeight;
    }

    nextWidth = clampNumber(nextWidth, resizeStart.width, RESIZE.minWidth, RESIZE.maxWidth);
    nextHeight = clampNumber(nextHeight, resizeStart.height, RESIZE.minHeight, RESIZE.maxHeight);

    widthSlider.value = Math.round(nextWidth);
    heightSlider.value = Math.round(nextHeight);
    chronoEl.style.left = `${Math.round(nextLeft)}px`;
    chronoEl.style.top = `${Math.round(nextTop)}px`;
    applyVisualSettings();
  }

  function closePopup() {
    popup.style.display = 'none';
    cancelPendingKeyBind();
  }

  function openPopup() {
    if (window.i18n?.updateAllTexts) window.i18n.updateAllTexts();
    updateRangeLabels();
    updateKeyButtons();
    popup.style.display = 'block';
  }

  function endDrag() {
    clearTimeout(longPressTimer);
    longPressTimer = 0;
    chronoEl.classList.remove('dragging');
    chronoEl.classList.remove('resizing');

    if (resizing) {
      clampPosition();
    } else if (dragging && !moved && !longPressOpened) {
      toggleStartPause();
    }
    if (moved) clampPosition();

    dragging = false;
    resizing = false;
    resizeDirection = '';
    resizeStart = null;
    chronoEl.style.cursor = 'grab';
    scheduleSaveSettings();
    setTimeout(() => {
      moved = false;
      longPressOpened = false;
    }, 50);
  }

  chronoEl.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    moved = false;
    longPressOpened = false;

    const resizeEdge = getResizeDirection(event);
    if (resizeEdge) {
      beginResize(event, resizeEdge);
      return;
    }

    dragging = true;

    const rect = chronoEl.getBoundingClientRect();
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;
    chronoEl.classList.add('dragging');

    longPressTimer = setTimeout(() => {
      if (moved) return;
      longPressOpened = true;
      dragging = false;
      chronoEl.classList.remove('dragging');
      openPopup();
    }, 600);
  });

  document.addEventListener('pointermove', (event) => {
    if (resizing) {
      updateResize(event);
      return;
    }
    if (!dragging) return;
    moved = true;
    clearTimeout(longPressTimer);
    longPressTimer = 0;

    const rect = chronoEl.getBoundingClientRect();
    const nextX = Math.max(0, Math.min(event.clientX - dragOffsetX, window.innerWidth - rect.width));
    const nextY = Math.max(0, Math.min(event.clientY - dragOffsetY, window.innerHeight - rect.height));
    chronoEl.style.left = `${Math.round(nextX)}px`;
    chronoEl.style.top = `${Math.round(nextY)}px`;
  });

  document.addEventListener('pointerup', endDrag);
  document.addEventListener('pointercancel', endDrag);

  chronoEl.addEventListener('pointermove', updateResizeCursor);
  chronoEl.addEventListener('pointerleave', () => {
    if (!dragging && !resizing) chronoEl.style.cursor = 'grab';
  });

  chronoEl.addEventListener('touchstart', (event) => {
    event.preventDefault();
    event.stopPropagation();
  }, { passive: false });
  chronoEl.addEventListener('touchmove', (event) => event.preventDefault(), { passive: false });

  const gearHint = document.getElementById('chronoGearHint');
  if (gearHint) {
    let lastGearOpenAt = 0;

    const openFromGear = (event) => {
      if (event.button && event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();

      const openedAt = Date.now();
      if (openedAt - lastGearOpenAt < 320) return;
      lastGearOpenAt = openedAt;

      clearTimeout(longPressTimer);
      longPressTimer = 0;
      dragging = false;
      resizing = false;
      moved = false;
      longPressOpened = true;
      chronoEl.classList.remove('dragging', 'resizing');
      openPopup();
    };

    gearHint.addEventListener('pointerdown', openFromGear);
    gearHint.addEventListener('touchstart', openFromGear, { passive: false });
    gearHint.addEventListener('click', openFromGear);
  }

  closeBtn.addEventListener('click', closePopup);
  popup.addEventListener('click', (event) => {
    if (event.target === popup) closePopup();
  });

  document.addEventListener('keydown', (event) => {
    if (pendingKeyBind) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.key === 'Escape') cancelPendingKeyBind();
      else assignPendingKey(event.code || event.key);
      return;
    }

    if (autoAudioEnabled && popup.style.display !== 'block' && isJumpControlEvent(event)) {
      rememberJumpInput(event.__ashuniSynthetic ? 'mapped-keyboard' : 'keyboard');
    }

    if (event.key === 'Escape' && popup.style.display === 'block') {
      closePopup();
      return;
    }

    if (popup.style.display === 'block') return;
    if (event.code !== startKey && event.code !== pauseKey && event.code !== resetKey) return;
    if (heldControlKeys.has(event.code)) return;

    heldControlKeys.add(event.code);
    event.preventDefault();
    if (event.code === startKey) startTimer();
    else if (event.code === pauseKey) pauseTimer();
    else reset();
  }, true);

  document.addEventListener('keyup', (event) => {
    heldControlKeys.delete(event.code);
  }, true);

  sizeSlider.addEventListener('input', () => {
    applyVisualSettings();
    scheduleSaveSettings();
    clampPosition();
  });

  numberSizeSlider.addEventListener('input', () => {
    applyVisualSettings();
    scheduleSaveSettings();
  });

  borderRadiusSlider.addEventListener('input', () => {
    applyVisualSettings();
    scheduleSaveSettings();
  });

  [widthSlider, heightSlider].forEach((slider) => {
    slider.addEventListener('input', () => {
      applyVisualSettings();
      scheduleSaveSettings();
      clampPosition();
    });
  });

  showMillisecondsCheckbox.addEventListener('change', () => {
    applyVisualSettings();
    scheduleSaveSettings();
  });

  chronoAutoAudioCheckbox.addEventListener('change', () => {
    autoAudioEnabled = chronoAutoAudioCheckbox.checked;
    syncAutoAudioListeners();
    scheduleSaveSettings();
  });

  chronoBgColor.addEventListener('input', () => {
    applyVisualSettings();
    scheduleSaveSettings();
  });

  chronoTextColor.addEventListener('input', () => {
    applyVisualSettings();
    scheduleSaveSettings();
  });

  chronoBgImageUploadBtn.addEventListener('click', () => {
    chronoBgImageUpload.click();
  });

  chronoBgImageResetBtn.addEventListener('click', () => {
    chronoBackgroundImage = '';
    chronoBgImageUpload.value = '';
    updateBackgroundPreview();
    applyVisualSettings();
    scheduleSaveSettings();
  });

  chronoBgImageUpload.addEventListener('change', () => {
    const file = chronoBgImageUpload.files && chronoBgImageUpload.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      chronoBackgroundImage = safeBackgroundImage(reader.result);
      updateBackgroundPreview();
      applyVisualSettings();
      scheduleSaveSettings();
    };
    reader.readAsDataURL(file);
  });

  chronoFontUploadBtn.addEventListener('click', () => {
    chronoFontUpload.click();
  });

  chronoFontResetBtn.addEventListener('click', () => {
    chronoCustomFontData = '';
    chronoCustomFontName = '';
    chronoFontUpload.value = '';
    updateFontLabel();
    applyVisualSettings();
    scheduleSaveSettings();
  });

  chronoFontUpload.addEventListener('change', () => {
    const file = chronoFontUpload.files && chronoFontUpload.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      chronoCustomFontData = safeFontData(reader.result);
      chronoCustomFontName = chronoCustomFontData ? file.name : '';
      updateFontLabel();
      applyVisualSettings();
      scheduleSaveSettings();
    };
    reader.readAsDataURL(file);
  });

  keyButtons.start.addEventListener('click', () => setPendingKeyBind('start'));
  keyButtons.pause.addEventListener('click', () => setPendingKeyBind('pause'));
  keyButtons.reset.addEventListener('click', () => setPendingKeyBind('reset'));

  window.addEventListener('resize', () => {
    if (resizeFrame) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      clampPosition();
      scheduleSaveSettings();
    });
  }, { passive: true });

  window.addEventListener('blur', () => {
    heldControlKeys.clear();
  }, { passive: true });

  (function restore() {
    const settings = safeSettings();
    elapsedMs = 0;
    timerState = 'stopped';
    chronoEl.style.left = settings.left || DEFAULTS.left;
    chronoEl.style.top = settings.top || DEFAULTS.top;
    sizeSlider.value = settings.size || DEFAULTS.size;
    numberSizeSlider.value = clampNumber(settings.numberSize, DEFAULTS.numberSize, 70, 170);
    borderRadiusSlider.value = clampNumber(settings.borderRadius, DEFAULTS.borderRadius, 0, 48);
    widthSlider.value = clampNumber(settings.width, DEFAULTS.width, RESIZE.minWidth, RESIZE.maxWidth);
    heightSlider.value = clampNumber(settings.height, DEFAULTS.height, RESIZE.minHeight, RESIZE.maxHeight);
    showMillisecondsCheckbox.checked = settings.showMilliseconds !== false;
    chronoAutoAudioCheckbox.checked = settings.autoAudioEnabled !== false;
    chronoBgColor.value = safeHex(settings.bgColor, DEFAULTS.bgColor);
    chronoTextColor.value = safeHex(settings.textColor, DEFAULTS.textColor);
    chronoBackgroundImage = safeBackgroundImage(settings.backgroundImage);
    chronoCustomFontData = safeFontData(settings.customFontData);
    chronoCustomFontName = chronoCustomFontData ? String(settings.customFontName || '').slice(0, 80) : '';
    autoAudioEnabled = chronoAutoAudioCheckbox.checked;
    syncAutoAudioListeners();
    startKey = settings.startKey || DEFAULTS.startKey;
    pauseKey = settings.pauseKey || DEFAULTS.pauseKey;
    resetKey = settings.resetKey || DEFAULTS.resetKey;
    updateBackgroundPreview();
    updateFontLabel();
    applyVisualSettings();
    updateKeyButtons();
    clampPosition();
    scheduleInitialFitRefresh();
    saveSettings();
  })();
})();

