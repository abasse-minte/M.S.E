var L = window.MSE_LANG || { t: function(k){ return k; } };

/* ==========================================================================
   settings.js — M.S.E Configuration Page
   ========================================================================== */

'use strict';

/* ── State ── */
var prefs = loadPrefs();

function loadPrefs() {
    var defaults = { lang:'English', format:'1,234.56', tx:true, balance:true, reports:false, tfa:false };
    try { return Object.assign({}, defaults, JSON.parse(localStorage.getItem('mse_prefs'))); }
    catch(e) { return defaults; }
}
function savePrefs() {
    try { localStorage.setItem('mse_prefs', JSON.stringify(prefs)); } catch(e) {}
}

/* ── Toast ── */
var toastEl    = document.getElementById('toast');
var toastTimer = null;
function showToast(msg) {
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    toastTimer = setTimeout(function() { toastEl.classList.remove('show'); }, 2600);
}

/* ── Modal helpers ── */
function openModal(id)  { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden');    }

document.querySelectorAll('[data-close]').forEach(function(btn) {
    btn.addEventListener('click', function() { closeModal(btn.getAttribute('data-close')); });
});
document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal(overlay.id);
    });
});

/* ── Status Badge ── */
function updateStatusBadge() {
    var on    = false;
    try { on  = sessionStorage.getItem('mse_logged') === '1'; } catch(e) {}
    var badge = document.getElementById('statusBadge');
    var label = document.getElementById('statusLabel');
    badge.className   = 'status-badge ' + (on ? 'online' : 'offline');
    label.textContent = on ? 'ON' : 'OFF';
    badge.style.cursor = 'pointer';
    badge.onclick = function() {
        var logged = false;
        try { logged = sessionStorage.getItem('mse_logged') === '1'; } catch(e) {}
        if (!logged) {
            window.location.href = 'registration.html';
        } else {
            try { sessionStorage.setItem('mse_logged', '0'); } catch(e) {}
            window.location.reload();
        }
    };
}

/* ── Profile Row ── */
function updateProfileRow() {
    var profile = null;
    try { profile = JSON.parse(localStorage.getItem('mse_profile')); } catch(e) {}

    var nameEl   = document.getElementById('profileName');
    var emailEl  = document.getElementById('profileEmail');
    var guestEl  = document.getElementById('profileGuest');
    var avatarEl = document.getElementById('profileAvatar');
    var iconEl   = document.getElementById('avatarIcon');

    if (profile && profile.username) {
        nameEl.textContent  = profile.username;
        emailEl.textContent = profile.email || '';
        emailEl.style.display = profile.email ? 'block' : 'none';
        guestEl.style.display = 'none';

        if (profile.photoDataURL) {
            iconEl.style.display = 'none';
            var canvas = document.createElement('canvas');
            canvas.width = canvas.height = 100;
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.onload = function() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(50, 50, 50, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(img, 0, 0, 100, 100);
                ctx.restore();
            };
            img.src = profile.photoDataURL;
            avatarEl.appendChild(canvas);
        }
    } else {
        nameEl.textContent    = L.t('settings.notsignedin');
        emailEl.style.display = 'none';
        guestEl.style.display = 'block';
        guestEl.textContent = L.t('settings.tap.signin');
    }
}

document.getElementById('profileRow').addEventListener('click', function() {
    window.location.href = 'registration.html';
});

/* ── Apply saved prefs to UI ── */
function applyPrefsToUI() {
    document.getElementById('val-lang').textContent   = prefs.lang;
    document.getElementById('val-format').textContent = prefs.format;
    document.getElementById('toggle-tx').checked       = prefs.tx;
    document.getElementById('toggle-balance').checked  = prefs.balance;
    document.getElementById('toggle-reports').checked  = prefs.reports;
    document.getElementById('toggle-2fa').checked      = prefs.tfa;
    document.getElementById('tfa-sub').textContent     = prefs.tfa ? L.t('settings.2fa.enabled') : L.t('settings.2fa.disabled');
    document.getElementById('sel-lang').value          = prefs.lang;
    document.getElementById('sel-format').value        = prefs.format;
}

/* ── Notification Toggles ── */
document.getElementById('toggle-tx').addEventListener('change', function() {
    prefs.tx = this.checked; savePrefs();
    showToast(this.checked ? L.t('toast.tx.on') : L.t('toast.tx.off'));
});
document.getElementById('toggle-balance').addEventListener('change', function() {
    prefs.balance = this.checked; savePrefs();
    showToast(this.checked ? L.t('toast.balance.on') : L.t('toast.balance.off'));
});
document.getElementById('toggle-reports').addEventListener('change', function() {
    prefs.reports = this.checked; savePrefs();
    showToast(this.checked ? L.t('toast.reports.on') : L.t('toast.reports.off'));
});

/* ── 2FA Toggle ── */
document.getElementById('toggle-2fa').addEventListener('change', function() {
    if (this.checked && !prefs.tfa) {
        this.checked = false;
        document.getElementById('tfa-code').value = '';
        document.getElementById('tfa-error').classList.add('hidden');
        openModal('modal-2fa');
    } else if (!this.checked && prefs.tfa) {
        prefs.tfa = false; savePrefs();
        document.getElementById('tfa-sub').textContent = L.t('settings.2fa.disabled');
        showToast(L.t('toast.2fa.off'));
    }
});
document.getElementById('tfa-code').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g,'').slice(0,6);
    document.getElementById('tfa-error').classList.add('hidden');
});
document.getElementById('tfa-verify').addEventListener('click', function() {
    if (/^\d{6}$/.test(document.getElementById('tfa-code').value)) {
        prefs.tfa = true; savePrefs();
        document.getElementById('toggle-2fa').checked  = true;
        document.getElementById('tfa-sub').textContent = L.t('settings.2fa.enabled');
        closeModal('modal-2fa');
        showToast(L.t('toast.2fa.on'));
    } else {
        document.getElementById('tfa-error').classList.remove('hidden');
    }
});
document.getElementById('tfa-cancel').addEventListener('click', function() {
    document.getElementById('toggle-2fa').checked = false;
    closeModal('modal-2fa');
});

/* ── Change Password ── */
document.getElementById('row-change-pwd').addEventListener('click', function() {
    var inp = document.getElementById('new-pwd');
    inp.value = ''; inp.type = 'password';
    document.querySelector('.eye-show').style.display = '';
    document.querySelector('.eye-hide').style.display = 'none';
    ['r-lower','r-upper','r-digit','r-special'].forEach(function(id) {
        document.getElementById(id).classList.remove('ok');
    });
    document.getElementById('save-pwd').disabled = true;
    openModal('modal-change-pwd');
    setTimeout(function() { inp.focus(); }, 60);
});

document.getElementById('new-pwd').addEventListener('input', function() {
    var v  = this.value;
    var ok = { lower:/[a-z]/.test(v), upper:/[A-Z]/.test(v), digit:/[0-9]/.test(v), special:/[^a-zA-Z0-9]/.test(v) };
    document.getElementById('r-lower').classList.toggle('ok', ok.lower);
    document.getElementById('r-upper').classList.toggle('ok', ok.upper);
    document.getElementById('r-digit').classList.toggle('ok', ok.digit);
    document.getElementById('r-special').classList.toggle('ok', ok.special);
    document.getElementById('save-pwd').disabled = !(ok.lower && ok.upper && ok.digit && ok.special);
});

document.getElementById('eye-new-pwd').addEventListener('click', function() {
    var inp  = document.getElementById('new-pwd');
    var show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    document.querySelector('.eye-show').style.display = show ? 'none' : '';
    document.querySelector('.eye-hide').style.display = show ? ''     : 'none';
});

document.getElementById('save-pwd').addEventListener('click', function() {
    try {
        var profile = JSON.parse(localStorage.getItem('mse_profile')) || {};
        profile.password = document.getElementById('new-pwd').value;
        localStorage.setItem('mse_profile', JSON.stringify(profile));
    } catch(e) {}
    closeModal('modal-change-pwd');
    showToast(L.t('toast.pwd.saved'));
});

/* ── Log Out All ── */
document.getElementById('row-logout-all').addEventListener('click', function() {
    openModal('modal-logout-all');
});
document.getElementById('confirm-logout-all').addEventListener('click', function() {
    closeModal('modal-logout-all');
    showToast(L.t('toast.sessions'));
});

/* ── Preferences ── */
document.getElementById('row-language').addEventListener('click', function() { openModal('modal-language'); });
document.getElementById('save-lang').addEventListener('click', function() {
    prefs.lang = document.getElementById('sel-lang').value;
    document.getElementById('val-lang').textContent = prefs.lang;
    savePrefs(); closeModal('modal-language');
    showToast(L.t('toast.lang', { lang: prefs.lang }));
});

document.getElementById('row-format').addEventListener('click', function() { openModal('modal-format'); });
document.getElementById('save-format').addEventListener('click', function() {
    prefs.format = document.getElementById('sel-format').value;
    document.getElementById('val-format').textContent = prefs.format;
    savePrefs(); closeModal('modal-format');
    showToast(L.t('toast.format'));
});

/* ── About & Support ── */
document.getElementById('row-support').addEventListener('click', function() {
    showToast(L.t('toast.support'));
});
document.getElementById('row-legal').addEventListener('click', function() {
    openModal('modal-legal');
});

/* ── Sidebar Nav hover oval ── */
var oval     = document.getElementById('hoverOval');
var sidenav  = document.getElementById('sidenav');
var navItems = document.querySelectorAll('.nav-item');

function snapOvalTo(item) {
    var wrap = item.querySelector('.nav-icon-wrap');
    var rect = wrap.getBoundingClientRect();
    oval.style.left = (rect.left + rect.width  / 2) + 'px';
    oval.style.top  = (rect.top  + rect.height / 2) + 'px';
}

sidenav.addEventListener('mouseenter', function() { oval.classList.add('visible'); });
sidenav.addEventListener('mouseleave', function() { oval.classList.remove('visible'); });
navItems.forEach(function(item) {
    item.addEventListener('mouseenter', function() { snapOvalTo(item); });
});

/* ── Section stagger animations ── */
document.querySelectorAll('.s-section').forEach(function(sec, i) {
    sec.style.animationDelay = (0.05 + i * 0.07) + 's';
});

/* ── Init ── */
updateStatusBadge();
updateProfileRow();
applyPrefsToUI();
applyLang();

/* ── Guest mode: restrict settings when logged out ── */
(function() {
    var logged = false;
    try { logged = sessionStorage.getItem('mse_logged') === '1'; } catch(e) {}
    if (!logged) {
        /* Rows to fully hide (security & account-management only) */
        var hideIds = ['row-change-pwd', 'row-logout-all'];
        hideIds.forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        /* Dim and disable the 2FA toggle row */
        var tfaRow = document.getElementById('toggle-2fa');
        if (tfaRow) {
            var parentRow = tfaRow.closest('.s-row');
            if (parentRow) {
                parentRow.style.opacity = '0.35';
                parentRow.style.pointerEvents = 'none';
                parentRow.title = L.t('settings.guest.2fa.tip');
            }
        }

        /* Hide the entire Notifications section — requires login */
        var allSections = document.querySelectorAll('.s-section');
        var notifSection = null;
        allSections.forEach(function(s) {
            var label = s.querySelector('.s-label');
            if (label && (label.textContent.trim().toLowerCase() === 'notifications' || label.textContent.trim().toLowerCase() === 'notifications')) {
                notifSection = s;
            }
        });
        if (notifSection) notifSection.style.display = 'none';

        /* Add a subtle "sign in" banner above the Security section */
        var secSection = document.querySelector('.s-section[data-section="security"]');
        if (!secSection) {
            /* Fallback: find section that contains the 2FA toggle */
            allSections.forEach(function(s) {
                if (s.querySelector('#toggle-2fa')) secSection = s;
            });
        }
        if (secSection) {
            var banner = document.createElement('div');
            banner.className = 'guest-settings-banner';
            banner.innerHTML =
                '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
                L.t('settings.guest.banner') +
                '<a href="registration.html" class="guest-banner-link">' + L.t('settings.guest.link') + '</a>';
            secSection.insertBefore(banner, secSection.firstChild);
        }
    }
})();


/* ── i18n: apply translations to all data-i18n elements ── */
function applyLang() {
    if (!window.MSE_LANG) return;
    L = window.MSE_LANG;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        el.textContent = L.t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
        el.innerHTML = L.t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
        el.setAttribute('placeholder', L.t(el.getAttribute('data-i18n-ph')));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
        el.setAttribute('title', L.t(el.getAttribute('data-i18n-title')));
    });
    // Refresh tfa-sub
    document.getElementById('tfa-sub').textContent = (typeof prefs !== 'undefined' && prefs.tfa) ? L.t('settings.2fa.enabled') : L.t('settings.2fa.disabled');
    // Refresh profileGuest text if shown
    var guestEl2 = document.getElementById('profileGuest');
    if (guestEl2 && guestEl2.style.display !== 'none') guestEl2.textContent = L.t('settings.tap.signin');
    // Notifications section detection by key
    var notifSection = null;
    document.querySelectorAll('.s-section').forEach(function(s) {
        var lbl = s.querySelector('.s-label');
        if (lbl && lbl.getAttribute('data-i18n') === 'settings.section.notif') notifSection = s;
    });
    // Check login state
    var logged2 = false;
    try { logged2 = sessionStorage.getItem('mse_logged') === '1'; } catch(e2) {}
    if (!logged2 && notifSection) notifSection.style.display = 'none';
}

if (window.MSE_LANG) {
    window.MSE_LANG.onChange(function() { applyLang(); });
}
