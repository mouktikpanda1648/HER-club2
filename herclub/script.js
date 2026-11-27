/* HER Club · IIIT Bhubaneswar — lightweight page controller */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  /* ---------- THEME (LIGHT / DARK MODE) ---------- */
  const root = document.documentElement;
  const themeBtn = $('#themeToggle');
  const themeIcon = $('#themeIcon');
  const metaTheme = $('meta[name="theme-color"]');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.setAttribute('data-theme', theme);
    if (themeIcon) themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    if (themeBtn) themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    if (metaTheme) metaTheme.setAttribute('content', isDark ? '#0d0d0f' : '#1b1b1b');
  }

  applyTheme(localStorage.getItem('her-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('her-theme', next);
    applyTheme(next);
  });

  /* ---------- DATA ---------- */
  const ANNOUNCEMENTS = [
    { num: '01', tag: 'Cohort', grad: 'var(--g-r)', date: 'Nov 28, 2026', text: 'Autumn 2026 R&D Project Matchmaking applications are now open for 1st & 2nd year students.' },
    { num: '02', tag: 'Global', grad: 'var(--g-h)', date: 'Dec 03, 2026', text: 'Live Q&A session with US Graduate School Admission Chairs on MS/PhD SOP strategy.' },
    { num: '03', tag: 'Venture', grad: 'var(--g-e)', date: 'Dec 09, 2026', text: 'Campus Incubation Cell prototype pitch registrations close this Friday at 6:00 PM.' },
    { num: '04', tag: 'MoU', grad: 'var(--g-h)', date: 'Dec 14, 2026', text: 'Winter Semiconductor & Hardware Security workshop in collaboration with our Dutch & UK industry partners.' }
  ];

  const DOMAINS = [
    { name: 'Quantum Information and Computation', short: 'Quantum', icon: 'bi-cpu', pos: [0, 0],
      grad: 'linear-gradient(135deg,#00122b,#003a7a 45%,#4aa3b8 75%,#f9d27a)', accent: '#003a7a',
      desc: 'Quantum networks, secure communication and algorithms, from simulating protocols in Qiskit to testing how cryptography holds up against quantum attacks.',
      tags: ['Quantum Simulation', 'PQC', 'QML', 'IBM Qiskit Platform', 'Quantum Cryptography', 'Quantum RNG'] },
    { name: 'AI and Computer Vision', short: 'AI & Vision', icon: 'bi-eye', pos: [0, -0.866],
      grad: 'linear-gradient(135deg,#06281c,#1db954 55%,#ffff8a)', accent: '#1a9d4a',
      desc: 'Vision systems that work in hard conditions: surveillance, underwater scenes, infrared-visible fusion and assistive tools for the visually impaired.',
      tags: ['Object Tracking', 'Underwater Vision', 'Image Fusion', 'Assistive Vision', 'Deep Learning'] },
    { name: 'Geoscience and Remote Sensing', short: 'Remote Sensing', icon: 'bi-globe-americas', pos: [0.75, -0.433],
      grad: 'linear-gradient(135deg,#12151f,#34456b 40%,#b3182f 70%,#ffc2ab)', accent: '#b3182f',
      desc: 'Satellite and aerial data turned into answers for environmental monitoring, earth observation and disaster management.',
      tags: ['Satellite Data', 'Earth Observation', 'Disaster Management', 'Environmental Monitoring'] },
    { name: 'Hardware Security and Cybersecurity', short: 'Security', icon: 'bi-shield-lock', pos: [0.75, 0.433],
      grad: 'linear-gradient(135deg,#1c2a10,#7d8a12 55%,#f1e27a)', accent: '#7d8a12',
      desc: 'Trustworthy chips and secure systems: from hardware fingerprints and random number generators to network and data privacy.',
      tags: ['PUFs', 'Hardware Trojans', 'Side-channel Analysis', 'TRNG', 'Data Privacy'] },
    { name: 'Nanoelectronics and VLSI', short: 'VLSI', icon: 'bi-motherboard', pos: [0, 0.866],
      grad: 'linear-gradient(135deg,#4a1050,#b3345f 40%,#f9a35a 72%,#ffd7bf)', accent: '#d9693a',
      desc: 'Atomically engineered devices and chip design for smaller, faster and more efficient computing, including hardware for AI.',
      tags: ['2D Materials', 'Nanoscale Transistors', 'Chip Design', 'Hardware for AI'] },
    { name: 'Spintronics and Quantum Materials', short: 'Spintronics', icon: 'bi-magnet', pos: [-0.75, 0.433],
      grad: 'linear-gradient(135deg,#1a1450,#6b3fc0 40%,#f857d0 75%,#ffc2c8)', accent: '#b13fc0',
      desc: 'Using electron spin and exotic materials for next-generation memory, sensing and quantum devices.',
      tags: ['MRAM', 'Topological Materials', 'Superconductors', 'Spin Logic', 'Quantum Devices'] },
    { name: 'Robotics, Drones and Autonomous Systems', short: 'Robotics', icon: 'bi-robot', pos: [-0.75, -0.433],
      grad: 'linear-gradient(135deg,#3b2414,#a8842c 55%,#fdeeb4)', accent: '#a8842c',
      desc: 'Aerial and ground robots that perceive, plan and act, built for mapping, monitoring and real-world deployment.',
      tags: ['Aerial Robotics', 'Perception and Control', 'Autonomous Systems', 'Remote Mapping'] }
  ];

  const ICON = {
    match: '<svg viewBox="0 0 200 160" aria-hidden="true"><rect x="52" y="26" width="96" height="112" rx="10" fill="#fff" fill-opacity=".35" transform="rotate(-8 100 80)"/><rect x="52" y="20" width="96" height="112" rx="10" fill="#fff"/><rect x="66" y="34" width="68" height="40" fill="#1b1b1b" fill-opacity=".85"/><path d="M78 54h44M100 42v24" stroke="#fff" stroke-width="3"/><path d="M66 90h68M66 102h46" stroke="#1b1b1b" stroke-opacity=".35" stroke-width="4"/><circle cx="76" cy="150" r="14" fill="#fff"/><path d="m70 144 12 12m0-12L70 156" stroke="#b3182f" stroke-width="3" stroke-linecap="round"/><path d="M124 150c-12-9-16-14-12-20 4-5 10-3 12 1 2-4 8-6 12-1 4 6 0 11-12 20Z" fill="#fff"/></svg>',
    globe: '<svg viewBox="0 0 200 160" aria-hidden="true"><g fill="none" stroke="#fff" stroke-width="2.5"><circle cx="100" cy="80" r="58"/><ellipse cx="100" cy="80" rx="24" ry="58"/><path d="M42 80h116M50 54h100M50 106h100"/></g><g fill="#fff"><circle cx="58" cy="52" r="6"/><circle cx="146" cy="62" r="6"/><circle cx="122" cy="116" r="6"/></g><path d="M58 52Q100 20 146 62M146 62Q150 100 122 116" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 5"/></svg>',
    rocket: '<svg viewBox="0 0 200 160" aria-hidden="true"><path d="M30 148Q80 140 120 92" stroke="#fff" stroke-opacity=".5" stroke-width="2.5" fill="none" stroke-dasharray="4 6"/><g transform="translate(96 14) rotate(38 34 56)"><path d="M34 0c18 16 22 42 18 74H16C12 42 16 16 34 0Z" fill="#fff"/><circle cx="34" cy="38" r="9" fill="#1b1b1b" fill-opacity=".85"/><path d="M16 58 0 80l18-4ZM52 58l16 22-18-4Z" fill="#fff" fill-opacity=".75"/><path d="M25 74h18l-9 28Z" fill="#fff" fill-opacity=".6"/></g><rect x="28" y="120" width="12" height="28" fill="#fff" fill-opacity=".55"/><rect x="46" y="104" width="12" height="44" fill="#fff" fill-opacity=".75"/><rect x="64" y="128" width="12" height="20" fill="#fff" fill-opacity=".55"/></svg>',
    cap: '<svg viewBox="0 0 200 160" aria-hidden="true"><path d="M100 28 172 56 100 84 28 56Z" fill="#fff"/><path d="M60 72v32c0 12 18 22 40 22s40-10 40-22V72l-40 16Z" fill="#fff" fill-opacity=".8"/><path d="M172 56v42" stroke="#fff" stroke-width="4"/><circle cx="172" cy="102" r="6" fill="#fff"/><path d="M40 146h120" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-dasharray="3 6"/></svg>'
  };

  const PERKS = [
    { tab: 'Matchmaking', title: 'R&D project and internship matchmaking portal', grad: 'var(--g-e)', icon: ICON.match,
      desc: 'Browse faculty-led, industry and student-proposed projects, shortlist the ones that fit, and get matched on your skills and interests.',
      list: ['Curated pool of short and long-term projects', 'Student profiles built from your real work', 'Connect, discuss and form teams'] },
    { tab: 'Global pathways', title: 'Global pathways from MoUs to admission chairs', grad: 'var(--g-h)', icon: ICON.globe,
      desc: 'International partnerships open doors to exchanges, internships and direct conversations with graduate admissions.',
      list: ['MoU with a UK-based cybersecurity company', 'First-in-India MoU with a Dutch semiconductor company', 'Direct links to US graduate school admission chairs'] },
    { tab: 'Incubation', title: 'Incubation and funding for deep-tech ideas', grad: 'var(--g-r)', icon: ICON.rocket,
      desc: 'An approved institutional incubation cell backs student ideas, from first prototype toward a product and a company.',
      list: ['Start-up hosting, prototyping and labs', 'Mentoring from experts and industry leaders', 'Seed support, grants and investor connect'] },
    { tab: 'Higher studies', title: 'Higher-studies desk for MS, PhD, GRE and SOPs', grad: 'linear-gradient(135deg,#06281c,#1db954 55%,#ffff8a)', icon: ICON.cap,
      desc: 'Plan your route years ahead: which groups to target, what a strong application needs, and who can write about your actual work.',
      list: ['MS/PhD guidance in India and abroad', 'GRE/TOEFL resources and SOP support', 'Conversations with alumni and faculty'] }
  ];

  const PEOPLE = [
    { name: 'Dr. Faculty Lead', role: 'Faculty mentor', initials: 'DR', photo: 'Lead1.png', grad: 'var(--g-h)', desc: 'Computer vision, image processing and intelligent sensing.', mail: '#' },
    { name: 'Dr. Faculty lead', role: 'Faculty mentor', initials: 'SM', photo: 'Lead2.png', grad: 'var(--g-r)', desc: 'Spintronics, nanoelectronics, quantum materials and hardware security.', mail: '#' },
    { name: 'Student Lead', role: 'Higher studies', initials: 'HS', photo: 'Lead3.png', grad: 'var(--g-e)', desc: 'Add a short line about this person and what they help students with.', mail: '#' },
    { name: 'Student Lead', role: 'Research & entrepreneurship', initials: 'RE', photo: 'Lead4.png', grad: 'linear-gradient(135deg,#3b2414,#a8842c 55%,#fdeeb4)', desc: 'Add a short line about this person and what they help students with.', mail: '#' }
  ];

  const PARTNERS = [
    ['ISI', 'Indian Statistical Institute', 'Kolkata', 'logos/isi.png'],
    ['IMMT', 'CSIR-IMMT', 'Bhubaneswar', 'logos/immt.png'],
    ['NDRI', 'ICAR-NDRI', 'Karnal', 'logos/ndri.png'],
    ['TIFR', 'TIFR', 'Hyderabad', 'logos/tifr.png'],
    ['SOA', 'Siksha \u2018O\u2019 Anusandhan', 'Deemed University', 'logos/soa.png'],
    ['IBM', 'IBM Research India', 'Industry', 'logos/ibm.png'],
    ['IISc', 'IISc', 'Bengaluru', 'logos/iisc.png']
  ];

  /* ---------- ANNOUNCEMENT MARQUEE (Bootstrap Collapse driven) ---------- */
  const annTrack = $('#announcementTrack');
  const annList = $('#announcementList');
  const annBar = $('#announcementBar');
  const annToggle = $('#announcementToggle');
  const annDrawer = $('#announcementDrawer');

  if (annTrack && annList) {
    const tickerHTML = ANNOUNCEMENTS.map(a => `
      <span class="ann-item">
        <span class="ann-tag" style="--tag-g:${a.grad}">${a.tag}</span>
        <span>${a.text}</span>
      </span>`).join('');
    annTrack.innerHTML = tickerHTML + tickerHTML;

    annList.innerHTML = ANNOUNCEMENTS.map(a => `
      <li>
        <div class="announcement-list-top">
          <div>
            <span class="ann-num me-2">${a.num}</span>
            <span class="ann-tag" style="--tag-g:${a.grad}">${a.tag}</span>
          </div>
          <span class="announcement-date">${a.date}</span>
        </div>
        <div>${a.text}</div>
      </li>`).join('');
  }

  if (annBar && annToggle && annDrawer) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(annDrawer, { toggle: false });
    let hoverTimer = null;

    annToggle.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimer);
      bsCollapse.show();
    });
    annToggle.addEventListener('mouseleave', () => {
      hoverTimer = setTimeout(() => bsCollapse.hide(), 220);
    });
    annDrawer.addEventListener('mouseenter', () => clearTimeout(hoverTimer));
    annDrawer.addEventListener('mouseleave', () => {
      hoverTimer = setTimeout(() => bsCollapse.hide(), 220);
    });
    document.addEventListener('click', (e) => {
      if (!annBar.contains(e.target)) bsCollapse.hide();
    });
  }

  /* ---------- Carry H, E, R from Hero onto Channel cards (Document-Space Reload-Safe) ---------- */
  const herDockPairs = [
    { hero: $('#heroLetterH'), slot: $('#her-slot-h'), svg: $('#her-slot-h .channel-her-svg'), dx: 0, dy: 0, scale: 1 },
    { hero: $('#heroLetterE'), slot: $('#her-slot-e'), svg: $('#her-slot-e .channel-her-svg'), dx: 0, dy: 0, scale: 1 },
    { hero: $('#heroLetterR'), slot: $('#her-slot-r'), svg: $('#her-slot-r .channel-her-svg'), dx: 0, dy: 0, scale: 1 }
  ];
  const heroFadeItems = $$('.hero-fade');
  const cornerMarks = $$('.corner-scatter');
  const heroTiltEls = $$('.her-tilt');
  const channelsSec = $('#channels');
  let heroTiltDestroyed = false;
  let cachedChannelsTop = 0;

  function getDocBox(el) {
    let x = 0, y = 0;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    let cur = el;
    while (cur) {
      x += cur.offsetLeft;
      y += cur.offsetTop;
      cur = cur.offsetParent;
    }
    return { cx: x + w * 0.5, cy: y + h * 0.5, w, h, top: y };
  }

  function measureHerGeometry() {
    if (!channelsSec) return;
    cachedChannelsTop = getDocBox(channelsSec).top;

    herDockPairs.forEach((item) => {
      if (!item.hero || !item.slot) return;
      const hBox = getDocBox(item.hero);
      const sBox = getDocBox(item.slot);

      if (hBox.h > 0 && sBox.h > 0) {
        item.dx = sBox.cx - hBox.cx;
        item.dy = sBox.cy - hBox.cy;
        item.scale = sBox.h / hBox.h;
      }
    });
  }

  function updateHerCarry() {
    if (!channelsSec || reduced || window.innerWidth <= 991) {
      herDockPairs.forEach(({ hero, svg }) => {
        if (hero) {
          hero.style.opacity = '1';
          hero.style.transform = '';
        }
        svg?.classList.add('visible');
      });
      heroFadeItems.forEach((el) => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      });
      cornerMarks.forEach((el) => {
        el.style.opacity = '0.34';
        el.style.visibility = 'visible';
        el.style.transform = '';
      });
      return;
    }

    const vh = innerHeight;
    const chromeH = 94;
    const currentTop = cachedChannelsTop - window.scrollY;
    const t = clamp(((vh - currentTop) / (vh - chromeH)) * 1.35, 0, 1);
    const eased = 1 - Math.pow(1 - t, 2.4);

    const fadeOpacity = clamp(1 - t * 3.2, 0, 1);
    heroFadeItems.forEach((el) => {
      el.style.opacity = fadeOpacity.toFixed(3);
      el.style.visibility = fadeOpacity <= 0.02 ? 'hidden' : 'visible';
    });

    cornerMarks.forEach((el) => {
      el.style.opacity = (fadeOpacity * 0.34).toFixed(3);
      el.style.visibility = fadeOpacity <= 0.02 ? 'hidden' : 'visible';
      el.style.transform = `translateY(${((1 - fadeOpacity) * 14).toFixed(1)}px)`;
    });

    if (t > 0.01 && !heroTiltDestroyed) {
      heroTiltEls.forEach(el => el.vanillaTilt?.destroy());
      heroTiltDestroyed = true;
    }

    herDockPairs.forEach((item) => {
      const { hero, svg, dx, dy, scale } = item;
      if (!hero) return;
      if (t > 0.005) hero.classList.add('is-moving');

      if (t >= 0.96) {
        hero.style.opacity = '0';
        hero.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
        svg?.classList.add('visible');
      } else {
        hero.style.opacity = '1';
        svg?.classList.remove('visible');
        hero.style.transform = `translate3d(${(dx * eased).toFixed(1)}px, ${(dy * eased).toFixed(1)}px, 0) scale(${(1 + (scale - 1) * eased).toFixed(4)})`;
      }
    });
  }

  /* ---------- Smooth, High-Velocity Scroll Glide in Hero -> Channels Zone ---------- */
  let glideTargetY = window.scrollY;
  let glideCurrentY = window.scrollY;
  let isGliding = false;

  const stopGlide = () => {
    isGliding = false;
  };
  window.addEventListener('touchstart', stopGlide, { passive: true });
  window.addEventListener('keydown', stopGlide, { passive: true });
  window.addEventListener('mousedown', stopGlide, { passive: true });

  function runGlideLoop() {
    if (!isGliding) return;
    const diff = glideTargetY - glideCurrentY;
    if (Math.abs(diff) < 0.6) {
      window.scrollTo({ top: glideTargetY, behavior: 'instant' });
      isGliding = false;
      return;
    }
    glideCurrentY += diff * 0.24;
    window.scrollTo({ top: glideCurrentY, behavior: 'instant' });
    requestAnimationFrame(runGlideLoop);
  }

  if (!reduced) {
    window.addEventListener('wheel', (e) => {
      if (!channelsSec || window.innerWidth < 992 || e.ctrlKey) return;
      const channelsSnapTop = Math.max(0, cachedChannelsTop - 94);
      const y = window.scrollY;

      const inTransitionZone = (y < channelsSnapTop - 2) || (y <= channelsSnapTop + 12 && e.deltaY < 0);
      if (!inTransitionZone) {
        isGliding = false;
        return;
      }

      e.preventDefault();
      if (!isGliding) {
        glideCurrentY = y;
        glideTargetY = y;
      }

      const unitScale = e.deltaMode === 1 ? 36 : (e.deltaMode === 2 ? innerHeight : 1);
      const boostedDelta = e.deltaY * unitScale * 2.4;

      glideTargetY = clamp(glideTargetY + boostedDelta, 0, channelsSnapTop);

      if (!isGliding) {
        isGliding = true;
        requestAnimationFrame(runGlideLoop);
      }
    }, { passive: false });
  }

  /* ---------- Reveal on scroll (Reload-Safe + Failsafe Sweep) ---------- */
  const rv = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        rv.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '120px 0px 120px 0px' });

  function revealVisibleAndAbove() {
    const triggerBottom = window.innerHeight + 120;
    $$('.reveal:not(.in)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= triggerBottom) {
        el.classList.add('in');
        rv.unobserve(el);
      }
    });
  }

  function observeReveals(elements) {
    elements.forEach(el => rv.observe(el));
    revealVisibleAndAbove();
  }

  observeReveals($$('.reveal'));

  /* ---------- NAV: rAF-batched progress bar & carry update ---------- */
  const bar = $('#progress');
  let scrollTicking = false;

  const renderFrame = () => {
    scrollTicking = false;
    const h = document.documentElement;
    const denom = Math.max(1, h.scrollHeight - h.clientHeight);
    bar.style.setProperty('--scroll-pct', clamp((h.scrollTop / denom) * 100, 0, 100).toFixed(2) + '%');
    updateHerCarry();
    revealVisibleAndAbove();
  };

  const onScroll = () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(renderFrame);
    }
  };

  const syncLayout = () => {
    measureHerGeometry();
    renderFrame();
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', syncLayout, { passive: true });
  addEventListener('load', syncLayout);
  addEventListener('pageshow', syncLayout);
  document.fonts?.ready.then(syncLayout);
  setTimeout(syncLayout, 150);
  setTimeout(() => $$('.reveal:not(.in)').forEach(el => el.classList.add('in')), 650);
  syncLayout();

  const links = $$('.site-nav .nav-link');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['channels', 'partners', 'domains', 'perks', 'people'].forEach(id => {
    const el = $('#' + id);
    if (el) spy.observe(el);
  });
  links.forEach(a => a.addEventListener('click', () => {
    stopGlide();
    const m = $('#navMenu');
    if (m.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(m).hide();
  }));

  /* ---------- HERO: cursor glow ---------- */
  const hero = $('.hero'), glow = $('#heroGlow');
  if (!reduced && matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      glow.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      glow.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  /* ---------- VanillaTilt.js ---------- */
  function initTilt(elements, opts = {}) {
    if (reduced || !window.VanillaTilt || !elements.length || !matchMedia('(pointer:fine)').matches) return;
    window.VanillaTilt.init(elements, Object.assign({ max: 4, speed: 450, scale: 1.02, glare: false }, opts));
  }
  initTilt($$('.tilt'));
  if (window.scrollY <= 10) {
    initTilt(heroTiltEls, { max: 6, speed: 400, scale: 1.03 });
  } else {
    heroTiltDestroyed = true;
  }

  /* ---------- DOMAINS: Desktop Hex + Mobile Filterable Cards ---------- */
  const grid = $('#hexgrid'), P = { t: $('#dTitle'), c: $('#dCount'), d: $('#dDesc'), g: $('#dTags'), panel: $('#domainPanel'), fill: $('#autoBar') };
  const DWELL = 7000; let dIdx = 0, dTimer = null, dPaused = false;

  DOMAINS.forEach((d, i) => {
    const w = document.createElement('div');
    w.className = 'hexwrap';
    w.style.setProperty('--dx', d.pos[0]); w.style.setProperty('--dy', d.pos[1]);
    w.innerHTML = `<button class="hex" role="tab" aria-selected="false" aria-label="${d.name}" style="--hg:${d.grad}"><span class="hex-inner"><i class="bi ${d.icon}" aria-hidden="true"></i><span class="mt-1" style="font-size: 15px;">${d.short}</span></span></button>`;
    w.firstElementChild.addEventListener('click', () => { selectDomain(i); restartAuto(); });
    w.firstElementChild.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { selectDomain((dIdx + 1) % DOMAINS.length); restartAuto(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { selectDomain((dIdx - 1 + DOMAINS.length) % DOMAINS.length); restartAuto(); }
    });
    grid.appendChild(w);
  });

  function selectDomain(i) {
    dIdx = i; const d = DOMAINS[i];
    $$('.hexwrap', grid).forEach((w, k) => {
      w.classList.toggle('active', k === i);
      w.firstElementChild.setAttribute('aria-selected', k === i);
    });
    P.t.textContent = d.name; P.c.textContent = `${i + 1}/${DOMAINS.length}`; P.d.textContent = d.desc;
    P.g.innerHTML = d.tags.map(t => `<span>${t}</span>`).join('');
    P.panel.style.setProperty('--accent', d.accent);
    [P.t, P.d, P.g].forEach(n => { n.classList.remove('swap'); void n.offsetWidth; n.classList.add('swap'); });
  }
  function restartAuto() {
    clearTimeout(dTimer); P.fill.classList.remove('run'); void P.fill.offsetWidth;
    if (reduced || dPaused) return;
    P.fill.style.setProperty('--dur', DWELL + 'ms'); P.fill.classList.add('run');
    dTimer = setTimeout(() => { selectDomain((dIdx + 1) % DOMAINS.length); restartAuto(); }, DWELL);
  }
  const dSection = $('#domains');
  [['pointerenter', true], ['pointerleave', false]].forEach(([ev, v]) => dSection.addEventListener(ev, () => { dPaused = v; if (v) { clearTimeout(dTimer); P.fill.classList.remove('run'); } else restartAuto(); }));
  selectDomain(0); restartAuto();

  // Mobile Domains Filter Bar + Horizontal Cards
  const mFilters = $('#mobileDomainFilters');
  const mCards = $('#mobileDomainCards');
  if (mFilters && mCards) {
    mFilters.innerHTML = DOMAINS.map((d, i) => `
      <button type="button" class="mobile-filter-btn ${i === 0 ? 'active' : ''}" data-didx="${i}" style="--df-grad:${d.grad}">
        <i class="bi ${d.icon}" aria-hidden="true"></i>
        <span>${d.short}</span>
      </button>`).join('');

    mCards.innerHTML = DOMAINS.map((d, i) => `
      <article class="mobile-domain-card" id="m-domain-card-${i}" style="--df-grad:${d.grad}">
        <div>
          <div class="mobile-domain-head">
            <span class="mobile-domain-icon"><i class="bi ${d.icon}" aria-hidden="true"></i></span>
            <span class="counter" style="font-size:1.35rem">${i + 1}/${DOMAINS.length}</span>
          </div>
          <h3>${d.name}</h3>
          <p>${d.desc}</p>
          <div class="tags">${d.tags.map(t => `<span>${t}</span>`).join('')}</div>
        </div>
        <a href="#join" class="btn-block">Understand more <i class="bi bi-arrow-right ms-2"></i></a>
      </article>`).join('');

    const filterBtns = $$('.mobile-filter-btn', mFilters);
    const setActiveMobileFilter = (idx) => {
      filterBtns.forEach((btn, k) => btn.classList.toggle('active', k === idx));
      filterBtns[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.didx;
        setActiveMobileFilter(idx);
        $(`#m-domain-card-${idx}`, mCards)?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });

    let mScrollTimer = null;
    mCards.addEventListener('scroll', () => {
      clearTimeout(mScrollTimer);
      mScrollTimer = setTimeout(() => {
        const center = mCards.scrollLeft + mCards.clientWidth * 0.5;
        let closestIdx = 0, bestDist = Infinity;
        $$('.mobile-domain-card', mCards).forEach((card, idx) => {
          const dist = Math.abs(center - (card.offsetLeft + card.offsetWidth * 0.5));
          if (dist < bestDist) { bestDist = dist; closestIdx = idx; }
        });
        setActiveMobileFilter(closestIdx);
      }, 90);
    }, { passive: true });
  }

  /* ---------- PERKS: tabs + carousel ---------- */
  const tabs = $('#perkTabs'); let pIdx = 0;
  PERKS.forEach((p, i) => {
    const b = document.createElement('button');
    b.className = 'perk-tab'; b.role = 'tab'; b.textContent = p.tab; b.id = 'perk-tab-' + i;
    b.addEventListener('click', () => showPerk(i)); tabs.appendChild(b);
  });
  function showPerk(i) {
    pIdx = (i + PERKS.length) % PERKS.length; const p = PERKS[pIdx], card = $('#perkCard');
    $$('.perk-tab', tabs).forEach((b, k) => b.setAttribute('aria-selected', k === pIdx));
    card.setAttribute('aria-labelledby', 'perk-tab-' + pIdx);
    card.style.setProperty('--g', p.grad);
    $('#perkArt').innerHTML = p.icon; $('#perkArt').style.background = p.grad;
    $('#perkTitle').textContent = p.title; $('#perkDesc').textContent = p.desc;
    $('#perkList').innerHTML = p.list.map(t => `<li>${t}</li>`).join('');
    $('#perkBtn').style.setProperty('--g', p.grad);
    $$('#perkCard .perk-art, #perkCard .perk-body').forEach(n => { n.classList.remove('perk-anim'); void n.offsetWidth; n.classList.add('perk-anim'); });
  }
  $('#perkPrev').addEventListener('click', () => showPerk(pIdx - 1));
  $('#perkNext').addEventListener('click', () => showPerk(pIdx + 1));
  tabs.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { showPerk(pIdx + 1); $$('.perk-tab')[pIdx].focus(); } if (e.key === 'ArrowLeft') { showPerk(pIdx - 1); $$('.perk-tab')[pIdx].focus(); } });
  let sx = null; const pc = $('#perkCard');
  pc.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
  pc.addEventListener('touchend', e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) showPerk(pIdx + (dx < 0 ? 1 : -1)); sx = null; });
  showPerk(0);
  $$('[data-perk]').forEach(a => a.addEventListener('click', () => showPerk(+a.dataset.perk)));

  /* ---------- PEOPLE / LEADS ---------- */
  $('#peopleRow').innerHTML = PEOPLE.map(p => `
    <div class="person-col reveal">
      <div class="person">
        <div class="person-card tilt" style="--pg:${p.grad}">
          <div class="person-photo-wrap" style="--pg:${p.grad}">
            <img class="avatar-img" src="${p.photo}" alt="${p.name}"
              onerror="this.parentElement.classList.add('fallback'); this.replaceWith(Object.assign(document.createElement('b'),{textContent:'${p.initials}'}))">
          </div>
          <div class="person-meta-head">
            <h3>${p.name}</h3>
            <span class="role">${p.role}</span>
          </div>
          <p>${p.desc}</p>
          <a class="btn-block" href="${p.mail}">Contact <i class="bi bi-envelope ms-2"></i></a>
        </div>
      </div>
    </div>`).join('');
  observeReveals($$('#peopleRow .reveal'));
  initTilt($$('#peopleRow .tilt'));

  /* ---------- PARTNERS marquee ---------- */
  const pHTML = PARTNERS.map(([s, n, sub, logo]) => `
    <div class="partner" title="${n} — ${sub}">
      <div class="partner-logo-box">
        <img src="${logo}" alt="${n} logo" loading="lazy"
          onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'seal',textContent:'${s}'}))">
      </div>
    </div>`).join('');
  $('#marquee').innerHTML = pHTML + pHTML;

  /* ---------- SIGN-UP ---------- */
  const form = $('#signup'), email = $('#email'), msg = $('#formMsg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const v = email.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const iiit = /@[^\s@]*iiit[^\s@]*\./i.test(v);
    msg.className = 'form-msg';
    if (!ok || !iiit) {
      email.classList.remove('invalid'); void email.offsetWidth; email.classList.add('invalid');
      msg.classList.add('err'); msg.textContent = ok ? 'Please use your IIIT email address.' : 'Enter a valid email address, like name@iiit-bh.ac.in.';
      email.focus(); return;
    }
    email.classList.remove('invalid');
    msg.classList.add('ok'); msg.textContent = 'You\u2019re on the list. We\u2019ll email you the next steps.';
    form.reset();
  });

  /* ---------- SLIGHT, IMMEDIATE MICRO-SNAP (HERO, CHANNELS & DOMAINS ONLY) ---------- */
  if (!reduced) {
    const lightSnapEls = $$('.light-snap');
    const chromeOffset = 94;
    const captureRadius = 48;
    let isNudging = false;
    let fallbackTimer = null;

    const getTargetY = (el) => el.id === 'top'
      ? 0
      : Math.max(0, getDocBox(el).top - chromeOffset);

    const cancelNudge = () => { isNudging = false; };
    window.addEventListener('wheel', cancelNudge, { passive: true });
    window.addEventListener('touchstart', cancelNudge, { passive: true });
    window.addEventListener('keydown', cancelNudge, { passive: true });

    const microAlign = () => {
      if (isNudging || isGliding || window.innerWidth < 992 || window.innerHeight < 661) return;
      const y = window.scrollY;
      let nearest = null;
      let minDist = Infinity;

      for (const el of lightSnapEls) {
        const target = getTargetY(el);
        const dist = Math.abs(target - y);
        if (dist < minDist) {
          minDist = dist;
          nearest = target;
        }
      }

      if (nearest !== null && minDist > 2 && minDist <= captureRadius) {
        isNudging = true;
        window.scrollTo({ top: nearest, behavior: 'smooth' });
        setTimeout(() => { isNudging = false; }, 220);
      }
    };

    if ('onscrollend' in window) {
      window.addEventListener('scrollend', microAlign, { passive: true });
    } else {
      window.addEventListener('scroll', () => {
        if (isNudging || isGliding) return;
        clearTimeout(fallbackTimer);
        fallbackTimer = setTimeout(microAlign, 75);
      }, { passive: true });
    }
  }
})();