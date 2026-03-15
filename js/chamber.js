/* ================================================================
   FORBIDDEN GNOSIS — MIRROR GATE / CHAMBER LOGIC
   Exposes window.FG namespace. Auto-inits on DOMContentLoaded.
   Load after data/creators.js, before script.js.
   ================================================================ */

(function () {
  'use strict';

  var KEY_SESSION     = 'fg_chamber';
  var KEY_ATTRIBUTION = 'fg_attribution';

  /* ── UTILITIES ── */

  function readViaParam() {
    try {
      var params = new URLSearchParams(window.location.search);
      return params.get('via') || null;
    } catch (e) { return null; }
  }

  function readChamberSession() {
    try { return sessionStorage.getItem(KEY_SESSION); } catch (e) { return null; }
  }

  function writeAttribution(slug) {
    try {
      if (!localStorage.getItem(KEY_ATTRIBUTION)) {
        localStorage.setItem(KEY_ATTRIBUTION, JSON.stringify({
          slug:     slug,
          entryTs:  Date.now(),
          entryUrl: window.location.href
        }));
      }
    } catch (e) {}
  }

  function activateChamberSession(slug) {
    try { sessionStorage.setItem(KEY_SESSION, slug); } catch (e) {}
  }

  function resolveCreator() {
    var slug = readViaParam() || readChamberSession();
    if (!slug) return null;
    if (!window.FG_CREATORS || !window.FG_CREATORS[slug]) return null;
    return window.FG_CREATORS[slug];
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── LINK DECORATION ── */
  /* Appends ?via=slug to all internal links in the current page */

  function decorateLinks(slug) {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (!href) continue;
      if (href.indexOf('http') === 0) continue;
      if (href.indexOf('#') === 0)    continue;
      if (href.indexOf('mailto') === 0) continue;
      if (href.indexOf('via=') !== -1) continue;
      // Preserve fragments — insert ?via= before #
      var hashIdx = href.indexOf('#');
      var path     = hashIdx === -1 ? href : href.slice(0, hashIdx);
      var fragment = hashIdx === -1 ? ''   : href.slice(hashIdx);
      var sep = path.indexOf('?') === -1 ? '?' : '&';
      links[i].setAttribute('href', path + sep + 'via=' + slug + fragment);
    }
  }

  /* ── CHAMBER BANNER ── */
  /* Injected into #chamber-banner on artifacts.html when inside a session */

  function renderChamberBanner(creator) {
    var el = document.getElementById('chamber-banner');
    if (!el) return;
    el.innerHTML =
      '<div class="chamber-banner fade-down">' +
        '<svg class="chamber-banner-eye" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
          '<path d="M10 50 Q30 20 50 20 Q70 20 90 50 Q70 80 50 80 Q30 80 10 50Z" fill="none" stroke="#D4A853" stroke-width="1.5" opacity="0.7"/>' +
          '<circle cx="50" cy="50" r="10" fill="none" stroke="#D4A853" stroke-width="1.5"/>' +
          '<circle cx="50" cy="50" r="4" fill="#D4A853"/>' +
        '</svg>' +
        '<p class="chamber-banner-copy">' +
          'You entered through the work of ' +
          '<strong class="chamber-banner-name">' + escapeHtml(creator.displayName) + '</strong>. ' +
          'To move beyond this chamber and enter the wider Archive, ' +
          '<a href="./index.html#waitlist">membership is required</a>.' +
        '</p>' +
      '</div>';
  }

  /* ── GATE WALL ── */
  /* Shown on artifacts.html when visitor arrived with no guide */

  function renderGateWall() {
    var filterRow  = document.querySelector('.filter-row');
    var archiveBar = document.querySelector('.archive-bar');
    var grid       = document.querySelector('.artifacts-grid');
    var hero       = document.querySelector('.archive-hero');

    if (hero) {
      var h1 = hero.querySelector('h1');
      if (h1) h1.textContent = 'The Archive Requires a Guide.';
      var p = hero.querySelector('p');
      if (p) p.textContent = 'You have arrived without an introduction. Enter through a creator\'s chamber, or join the waitlist for membership.';
    }

    if (filterRow)  filterRow.style.display  = 'none';
    if (archiveBar) archiveBar.style.display = 'none';

    if (grid) {
      // Remove coming-soon seed cards — leave only the published artifact
      var seeds = grid.querySelectorAll('.artifact-card-coming');
      for (var i = 0; i < seeds.length; i++) {
        seeds[i].parentNode.removeChild(seeds[i]);
      }

      // Insert gate wall before the grid
      var wall = document.createElement('div');
      wall.className = 'gate-wall';
      wall.innerHTML =
        '<div class="gate-wall-icon" aria-hidden="true">' +
          '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M10 50 Q30 20 50 20 Q70 20 90 50 Q70 80 50 80 Q30 80 10 50Z" fill="none" stroke="#D4A853" stroke-width="1.5" opacity="0.5"/>' +
            '<circle cx="50" cy="50" r="10" fill="none" stroke="#D4A853" stroke-width="1.5" opacity="0.7"/>' +
            '<circle cx="50" cy="50" r="4" fill="#D4A853" opacity="0.6"/>' +
          '</svg>' +
        '</div>' +
        '<h2 class="gate-wall-title">The Archive Requires a Guide</h2>' +
        '<p class="gate-wall-copy">You have arrived without an introduction.<br>' +
          'To explore the full archive, enter through a creator\'s chamber — or join the waitlist for membership.</p>' +
        '<div class="gate-wall-actions">' +
          '<a href="./creators.html" class="btn btn-ghost btn-sm">Find a Creator</a>' +
          '<a href="./index.html#waitlist" class="btn btn-gold btn-sm">Join the Waitlist</a>' +
        '</div>' +
        '<p class="gate-wall-note">One artifact is always open — no membership required.</p>';

      grid.parentNode.insertBefore(wall, grid);
    }
  }

  /* ── CHAMBER ARCHIVE MODE (artifacts.html in a session) ── */

  function activateChamberArchive(creator) {
    renderChamberBanner(creator);

    var h1 = document.querySelector('.archive-hero h1');
    if (h1) h1.textContent = 'The Chamber of ' + creator.displayName;

    var heroP = document.querySelector('.archive-hero > p');
    if (heroP) heroP.textContent = creator.shortBio;

    var searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.placeholder = 'Search within ' + creator.displayName + '\u2019s archive\u2026';
    }

    var searchNote = document.querySelector('.search-gate-note');
    if (searchNote) {
      searchNote.innerHTML =
        'Search within this chamber is coming soon. ' +
        '<a href="./index.html#waitlist">Join the waitlist</a> for full archive access.';
    }

    var gateNoticeSpan = document.querySelector('.gate-notice span');
    if (gateNoticeSpan) {
      gateNoticeSpan.innerHTML =
        'You are inside <strong>' + escapeHtml(creator.displayName) + '\u2019s</strong> chamber. ' +
        'Explore their artifacts freely. ' +
        '<a href="./index.html#waitlist">Membership</a> unlocks the wider archive.';
    }

    var published = creator.artifacts.filter(function (a) { return a.published; }).length;
    var countEl   = document.querySelector('.archive-count');
    if (countEl) {
      countEl.innerHTML =
        'Showing <span>' + published + '</span> artifact' +
        (published !== 1 ? 's' : '') +
        ' from ' + escapeHtml(creator.displayName);
    }

    // Hide seed cards that don't belong to this creator
    var seeds = document.querySelectorAll('.artifact-card-coming');
    for (var i = 0; i < seeds.length; i++) {
      seeds[i].style.display = 'none';
    }
  }

  /* ── INDEX.HTML PERSONALIZATION ── */

  function personalizeGatePage(creator) {
    // Activate the pre-built data-creator hook
    document.body.dataset.creator = creator.displayName;
    document.querySelectorAll('.creator-name').forEach(function (el) {
      el.textContent = creator.displayName;
    });
  }

  /* ── ANALYTICS ── */
  /* Fires custom Plausible events if the Plausible script is loaded on the page */

  function track(eventName, props) {
    if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props: props || {} });
    }
  }

  /* ── PUBLIC API ── */

  window.FG = {
    readViaParam:          readViaParam,
    readChamberSession:    readChamberSession,
    writeAttribution:      writeAttribution,
    activateChamberSession: activateChamberSession,
    resolveCreator:        resolveCreator,
    renderChamberBanner:   renderChamberBanner,
    renderGateWall:        renderGateWall,
    activateChamberArchive: activateChamberArchive,
    decorateLinks:         decorateLinks,
    personalizeGatePage:   personalizeGatePage,
    escapeHtml:            escapeHtml,

    /* Used by index.html ConvertKit handler to inject attribution */
    getAttributionSlug: function () {
      return readChamberSession();
    },

    /* Fire a named analytics event (no-op if Plausible not loaded) */
    track: track
  };

  /* ── AUTO-INIT ── */

  function init() {
    var viaSlug = readViaParam();

    // On any ?via= arrival, write attribution and activate session
    if (viaSlug && window.FG_CREATORS && window.FG_CREATORS[viaSlug]) {
      var isNewSession = !readChamberSession();
      writeAttribution(viaSlug);
      activateChamberSession(viaSlug);
      if (isNewSession) track('chamber_entry', { creator: viaSlug });
    }

    var creator = resolveCreator();
    var page    = window.location.pathname.split('/').pop() || 'index.html';

    if (page === 'chamber.html') {
      // chamber.html renders its own content via inline script
      // Session is already set above; link decoration happens there too
      return;
    }

    if (page === 'artifacts.html') {
      if (creator) {
        activateChamberArchive(creator);
        decorateLinks(creator.slug);
      } else {
        renderGateWall();
        track('gate_wall_shown');
      }
      return;
    }

    if (creator) {
      decorateLinks(creator.slug);
      if (page === 'index.html' || page === '') {
        personalizeGatePage(creator);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
