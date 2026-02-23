/* ==========================================================================
   registration.js — 4-step registration: Username, Birthday, Continent, Country
   ========================================================================== */

/* ==========================================================================
   COUNTRY DATA — keyed by continent name
   ========================================================================== */
var COUNTRIES = {
    'Africa': [
        {flag:'🇿🇦', name:'South Africa'}, {flag:'🇩🇿', name:'Algeria'}, {flag:'🇦🇴', name:'Angola'},
        {flag:'🇧🇯', name:'Benin'}, {flag:'🇧🇼', name:'Botswana'}, {flag:'🇧🇫', name:'Burkina Faso'},
        {flag:'🇧🇮', name:'Burundi'}, {flag:'🇨🇲', name:'Cameroon'}, {flag:'🇨🇻', name:'Cape Verde'},
        {flag:'🇨🇫', name:'C.A.R.'}, {flag:'🇹🇩', name:'Chad'}, {flag:'🇰🇲', name:'Comoros'},
        {flag:'🇨🇬', name:'Congo'}, {flag:'🇨🇩', name:'DR Congo'}, {flag:'🇨🇮', name:"Côte d'Ivoire"},
        {flag:'🇩🇯', name:'Djibouti'}, {flag:'🇪🇬', name:'Egypt'}, {flag:'🇬🇶', name:'Eq. Guinea'},
        {flag:'🇪🇷', name:'Eritrea'}, {flag:'🇪🇹', name:'Ethiopia'}, {flag:'🇬🇦', name:'Gabon'},
        {flag:'🇬🇲', name:'Gambia'}, {flag:'🇬🇭', name:'Ghana'}, {flag:'🇬🇳', name:'Guinea'},
        {flag:'🇬🇼', name:'Guinea-Bissau'}, {flag:'🇰🇪', name:'Kenya'}, {flag:'🇱🇸', name:'Lesotho'},
        {flag:'🇱🇷', name:'Liberia'}, {flag:'🇱🇾', name:'Libya'}, {flag:'🇲🇬', name:'Madagascar'},
        {flag:'🇲🇼', name:'Malawi'}, {flag:'🇲🇱', name:'Mali'}, {flag:'🇲🇷', name:'Mauritania'},
        {flag:'🇲🇺', name:'Mauritius'}, {flag:'🇲🇦', name:'Morocco'}, {flag:'🇲🇿', name:'Mozambique'},
        {flag:'🇳🇦', name:'Namibia'}, {flag:'🇳🇪', name:'Niger'}, {flag:'🇳🇬', name:'Nigeria'},
        {flag:'🇷🇼', name:'Rwanda'}, {flag:'🇸🇹', name:'São Tomé'}, {flag:'🇸🇳', name:'Senegal'},
        {flag:'🇸🇨', name:'Seychelles'}, {flag:'🇸🇱', name:'Sierra Leone'}, {flag:'🇸🇴', name:'Somalia'},
        {flag:'🇸🇩', name:'Sudan'}, {flag:'🇸🇸', name:'South Sudan'}, {flag:'🇹🇿', name:'Tanzania'},
        {flag:'🇹🇬', name:'Togo'}, {flag:'🇹🇳', name:'Tunisia'}, {flag:'🇺🇬', name:'Uganda'},
        {flag:'🇿🇲', name:'Zambia'}, {flag:'🇿🇼', name:'Zimbabwe'}
    ],
    'Asia': [
        {flag:'🇦🇫', name:'Afghanistan'}, {flag:'🇦🇲', name:'Armenia'}, {flag:'🇦🇿', name:'Azerbaijan'},
        {flag:'🇧🇭', name:'Bahrain'}, {flag:'🇧🇩', name:'Bangladesh'}, {flag:'🇧🇹', name:'Bhutan'},
        {flag:'🇧🇳', name:'Brunei'}, {flag:'🇰🇭', name:'Cambodia'}, {flag:'🇨🇳', name:'China'},
        {flag:'🇨🇾', name:'Cyprus'}, {flag:'🇬🇪', name:'Georgia'}, {flag:'🇮🇳', name:'India'},
        {flag:'🇮🇩', name:'Indonesia'}, {flag:'🇮🇷', name:'Iran'}, {flag:'🇮🇶', name:'Iraq'},
        {flag:'🇮🇱', name:'Israel'}, {flag:'🇯🇵', name:'Japan'}, {flag:'🇯🇴', name:'Jordan'},
        {flag:'🇰🇿', name:'Kazakhstan'}, {flag:'🇰🇼', name:'Kuwait'}, {flag:'🇰🇬', name:'Kyrgyzstan'},
        {flag:'🇱🇦', name:'Laos'}, {flag:'🇱🇧', name:'Lebanon'}, {flag:'🇲🇾', name:'Malaysia'},
        {flag:'🇲🇻', name:'Maldives'}, {flag:'🇲🇳', name:'Mongolia'}, {flag:'🇳🇵', name:'Nepal'},
        {flag:'🇰🇵', name:'North Korea'}, {flag:'🇴🇲', name:'Oman'}, {flag:'🇵🇰', name:'Pakistan'},
        {flag:'🇵🇸', name:'Palestine'}, {flag:'🇵🇭', name:'Philippines'}, {flag:'🇶🇦', name:'Qatar'},
        {flag:'🇸🇦', name:'Saudi Arabia'}, {flag:'🇸🇬', name:'Singapore'}, {flag:'🇰🇷', name:'South Korea'},
        {flag:'🇱🇰', name:'Sri Lanka'}, {flag:'🇸🇾', name:'Syria'}, {flag:'🇹🇯', name:'Tajikistan'},
        {flag:'🇹🇭', name:'Thailand'}, {flag:'🇹🇲', name:'Turkmenistan'}, {flag:'🇦🇪', name:'UAE'},
        {flag:'🇺🇿', name:'Uzbekistan'}, {flag:'🇻🇳', name:'Vietnam'}, {flag:'🇾🇪', name:'Yemen'}
    ],
    'Europe': [
        {flag:'🇦🇱', name:'Albania'}, {flag:'🇦🇩', name:'Andorra'}, {flag:'🇦🇹', name:'Austria'},
        {flag:'🇧🇾', name:'Belarus'}, {flag:'🇧🇪', name:'Belgium'}, {flag:'🇧🇦', name:'Bosnia'},
        {flag:'🇧🇬', name:'Bulgaria'}, {flag:'🇭🇷', name:'Croatia'}, {flag:'🇨🇾', name:'Cyprus'},
        {flag:'🇨🇿', name:'Czech Rep.'}, {flag:'🇩🇰', name:'Denmark'}, {flag:'🇪🇪', name:'Estonia'},
        {flag:'🇫🇮', name:'Finland'}, {flag:'🇫🇷', name:'France'}, {flag:'🇩🇪', name:'Germany'},
        {flag:'🇬🇷', name:'Greece'}, {flag:'🇭🇺', name:'Hungary'}, {flag:'🇮🇸', name:'Iceland'},
        {flag:'🇮🇪', name:'Ireland'}, {flag:'🇮🇹', name:'Italy'}, {flag:'🇱🇻', name:'Latvia'},
        {flag:'🇱🇮', name:'Liechtenstein'}, {flag:'🇱🇹', name:'Lithuania'}, {flag:'🇱🇺', name:'Luxembourg'},
        {flag:'🇲🇹', name:'Malta'}, {flag:'🇲🇩', name:'Moldova'}, {flag:'🇲🇨', name:'Monaco'},
        {flag:'🇲🇪', name:'Montenegro'}, {flag:'🇳🇱', name:'Netherlands'}, {flag:'🇲🇰', name:'N. Macedonia'},
        {flag:'🇳🇴', name:'Norway'}, {flag:'🇵🇱', name:'Poland'}, {flag:'🇵🇹', name:'Portugal'},
        {flag:'🇷🇴', name:'Romania'}, {flag:'🇷🇺', name:'Russia'}, {flag:'🇸🇲', name:'San Marino'},
        {flag:'🇷🇸', name:'Serbia'}, {flag:'🇸🇰', name:'Slovakia'}, {flag:'🇸🇮', name:'Slovenia'},
        {flag:'🇪🇸', name:'Spain'}, {flag:'🇸🇪', name:'Sweden'}, {flag:'🇨🇭', name:'Switzerland'},
        {flag:'🇬🇧', name:'United Kingdom'}
    ],
    'North America': [
        {flag:'🇨🇦', name:'Canada'}, {flag:'🇺🇸', name:'United States'}, {flag:'🇲🇽', name:'Mexico'},
        {flag:'🇨🇺', name:'Cuba'}, {flag:'🇩🇴', name:'Dominican Rep.'}, {flag:'🇬🇹', name:'Guatemala'},
        {flag:'🇭🇳', name:'Honduras'}, {flag:'🇸🇻', name:'El Salvador'}, {flag:'🇳🇮', name:'Nicaragua'},
        {flag:'🇵🇦', name:'Panama'}, {flag:'🇯🇲', name:'Jamaica'}, {flag:'🇹🇹', name:'Trinidad'},
        {flag:'🇧🇸', name:'Bahamas'}, {flag:'🇧🇧', name:'Barbados'}, {flag:'🇧🇿', name:'Belize'},
        {flag:'🇩🇲', name:'Dominica'}, {flag:'🇬🇩', name:'Grenada'}, {flag:'🇭🇹', name:'Haiti'},
        {flag:'🇰🇳', name:'St. Kitts'}, {flag:'🇱🇨', name:'St. Lucia'}, {flag:'🇻🇨', name:'St. Vincent'},
        {flag:'🇦🇬', name:'Antigua'}
    ],
    'South America': [
        {flag:'🇦🇷', name:'Argentina'}, {flag:'🇧🇴', name:'Bolivia'}, {flag:'🇧🇷', name:'Brazil'},
        {flag:'🇨🇱', name:'Chile'}, {flag:'🇨🇴', name:'Colombia'}, {flag:'🇪🇨', name:'Ecuador'},
        {flag:'🇬🇾', name:'Guyana'}, {flag:'🇵🇾', name:'Paraguay'}, {flag:'🇵🇪', name:'Peru'},
        {flag:'🇸🇷', name:'Suriname'}, {flag:'🇺🇾', name:'Uruguay'}, {flag:'🇻🇪', name:'Venezuela'}
    ],
    'Oceania': [
        {flag:'🇦🇺', name:'Australia'}, {flag:'🇳🇿', name:'New Zealand'}, {flag:'🇵🇬', name:'Papua N.G.'},
        {flag:'🇫🇯', name:'Fiji'}, {flag:'🇸🇧', name:'Solomon Is.'}, {flag:'🇻🇺', name:'Vanuatu'},
        {flag:'🇼🇸', name:'Samoa'}, {flag:'🇰🇮', name:'Kiribati'}, {flag:'🇫🇲', name:'Micronesia'},
        {flag:'🇲🇭', name:'Marshall Is.'}, {flag:'🇵🇼', name:'Palau'}, {flag:'🇳🇷', name:'Nauru'},
        {flag:'🇹🇻', name:'Tuvalu'}, {flag:'🇹🇴', name:'Tonga'}
    ]
};

var CONTINENT_LABELS = {
    'Africa':        '🌍 Africa',
    'Asia':          '🌏 Asia',
    'Europe':        '🇪🇺 Europe',
    'North America': '🌎 North America',
    'South America': '🌎 South America',
    'Oceania':       '🌏 Oceania'
};

var PER_PAGE = 9;

/* ==========================================================================
   STEP REFERENCES & HELPER
   ========================================================================== */
var stepLanding   = document.getElementById('step-landing');
var stepSignin    = document.getElementById('step-signin');
var stepUsername  = document.getElementById('step-username');
var stepBirthday  = document.getElementById('step-birthday');
var stepContinent = document.getElementById('step-continent');
var stepCountry   = document.getElementById('step-country');
var stepPhoto     = document.getElementById('step-photo');
var stepEmail     = document.getElementById('step-email');
var stepPassword  = document.getElementById('step-password');
var stepRecap     = document.getElementById('step-recap');
var stepProfile   = document.getElementById('step-profile');
var editingFrom   = null; /* tracks if user is editing a field from recap */

/* Simulated stored account (set on registration confirm) */
var storedAccount = null;

/* ── Status badge ── */
function updateStatusBadge(on) {
    var badge = document.getElementById('statusBadge');
    var label = document.getElementById('statusLabel');
    badge.className = 'status-badge ' + (on ? 'online' : 'offline');
    label.textContent = on ? 'ON' : 'OFF';
    try { sessionStorage.setItem('mse_logged', on ? '1' : '0'); } catch(e) {}
}

/* Restore badge on page load — tryAutoRestore() gérera le redirect vers profil */
(function() {
    try { if (sessionStorage.getItem('mse_logged') === '1') updateStatusBadge(true); } catch(e) {}
})();

var ALL_STEPS = [stepLanding, stepSignin, stepUsername, stepBirthday, stepContinent, stepCountry, stepPhoto, stepEmail, stepPassword, stepRecap, stepProfile];

function showStep(el) {
    ALL_STEPS.forEach(function(s) { s.classList.add('hidden'); });
    el.classList.remove('hidden');
}

document.getElementById('go-signup').addEventListener('click', function() {
    showStep(stepUsername);
    document.getElementById('username').focus();
});

document.getElementById('go-signin').addEventListener('click', function() {
    document.getElementById('signin-email').value = '';
    document.getElementById('signin-password').value = '';
    document.getElementById('signin-error').classList.add('hidden');
    showStep(stepSignin);
    document.getElementById('signin-email').focus();
});

/* SIGN IN */
document.getElementById('signin-back').addEventListener('click', function() {
    showStep(stepLanding);
});

document.getElementById('signin-to-signup').addEventListener('click', function() {
    showStep(stepUsername);
    document.getElementById('username').focus();
});

document.getElementById('signin-pwd-toggle').addEventListener('click', function() {
    var inp = document.getElementById('signin-password');
    var isPass = inp.type === 'password';
    inp.type = isPass ? 'text' : 'password';
    document.querySelector('.eye-open-si').classList.toggle('hidden', isPass);
    document.querySelector('.eye-closed-si').classList.toggle('hidden', !isPass);
});

document.getElementById('signin-submit').addEventListener('click', function() {
    var email = document.getElementById('signin-email').value.trim();
    var pwd   = document.getElementById('signin-password').value;
    var err   = document.getElementById('signin-error');
    if (storedAccount && storedAccount.email === email && storedAccount.password === pwd) {
        err.classList.add('hidden');
        /* Restore profile data to sessionStorage for settings page */
        try {
            var existing = JSON.parse(localStorage.getItem('mse_profile')) || {};
            existing.email    = email;
            existing.password = pwd;
            localStorage.setItem('mse_profile', JSON.stringify(existing));
        } catch(e) {}
        updateStatusBadge(true);
        buildProfile();
        showStep(stepProfile);
    } else {
        err.classList.remove('hidden');
        document.getElementById('signin-email').focus();
    }
});

/* Also allow Enter key in signin fields */
['signin-email','signin-password'].forEach(function(id) {
    document.getElementById(id).addEventListener('keydown', function(e) {
        if (e.key === 'Enter') document.getElementById('signin-submit').click();
    });
});

/* ==========================================================================
   STEP 1 — USERNAME
   ========================================================================== */
document.getElementById('username-back').addEventListener('click', function() {
    showStep(stepLanding);
});

document.getElementById('username-next').addEventListener('click', function() {
    if (editingFrom === 'recap') {
        editingFrom = null; showRecap(); showStep(stepRecap); return;
    }
    if (editingFrom === 'profile') { return; } /* handled by patch below */
    showStep(stepBirthday); birthdayHiddenInput.focus(); updateCircles();
});

/* ==========================================================================
   STEP 2 — BIRTHDAY
   ========================================================================== */
var circles             = document.querySelectorAll('.digit-circle');
var birthdayHiddenInput = document.getElementById('birthday-input');
var digits              = ['','','','','','','',''];
var currentIndex        = 0;

function updateCircles() {
    circles.forEach(function(c, i) {
        c.textContent = digits[i] || '';
        c.classList.toggle('filled',  digits[i] !== '');
        c.classList.toggle('active',  i === currentIndex && currentIndex < 8);
    });
}

birthdayHiddenInput.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace') {
        e.preventDefault();
        if (currentIndex > 0) { currentIndex--; digits[currentIndex] = ''; updateCircles(); }
        return;
    }
    if (!/^\d$/.test(e.key) || currentIndex >= 8) return;
    e.preventDefault();
    digits[currentIndex] = e.key; currentIndex++; updateCircles();
});

circles.forEach(function(c) {
    c.addEventListener('click', function() {
        currentIndex = Math.min(parseInt(c.getAttribute('data-index'), 10), countFilled());
        updateCircles(); birthdayHiddenInput.focus();
    });
});

stepBirthday.addEventListener('click', function() { birthdayHiddenInput.focus(); });

function countFilled() { return digits.filter(function(d) { return d !== ''; }).length; }

document.getElementById('birthday-back').addEventListener('click', function() { showStep(stepUsername); });
/* birthday-next: unified */
document.getElementById('birthday-next').addEventListener('click', function() {
    if (editingFrom === 'recap' && countFilled() === 8) {
        editingFrom = null; showRecap(); showStep(stepRecap); return;
    }
    if (countFilled() === 8) showStep(stepContinent);
});

/* ==========================================================================
   STEP 3 — CONTINENT
   ========================================================================== */
var continentBtns     = document.querySelectorAll('.continent-btn');
var selectedContinent = null;

continentBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        continentBtns.forEach(function(b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        selectedContinent = btn.getAttribute('data-continent');
    });
});

document.getElementById('continent-back').addEventListener('click', function() { showStep(stepBirthday); birthdayHiddenInput.focus(); });

/* continent-next: unified */
document.getElementById('continent-next').addEventListener('click', function() {
    if (!selectedContinent) return;
    if (editingFrom === 'recap') {
        editingFrom = null;
        // Continent changed — must re-pick country
        selectedCountry = null;
        currentPage = 0;
        document.getElementById('country-continent-label').textContent = CONTINENT_LABELS[selectedContinent] || selectedContinent;
        renderCountries();
        showStep(stepCountry);
        return;
    }
    document.getElementById('country-continent-label').textContent = CONTINENT_LABELS[selectedContinent] || selectedContinent;
    currentPage = 0; selectedCountry = null;
    renderCountries(); showStep(stepCountry);
});

/* ==========================================================================
   STEP 4 — COUNTRY
   ========================================================================== */
var currentPage     = 0;
var selectedCountry = null;

function renderCountries() {
    var list  = COUNTRIES[selectedContinent] || [];
    var total = Math.ceil(list.length / PER_PAGE);
    var start = currentPage * PER_PAGE;
    var page  = list.slice(start, start + PER_PAGE);

    var grid = document.getElementById('country-grid');
    grid.innerHTML = '';

    page.forEach(function(country) {
        var btn = document.createElement('button');
        btn.className = 'country-btn';
        if (selectedCountry === country.name) btn.classList.add('selected');
        btn.innerHTML =
            '<span class="country-flag">' + country.flag + '</span>' +
            '<span class="country-name">' + country.name + '</span>';
        btn.addEventListener('click', function() {
            document.querySelectorAll('.country-btn').forEach(function(b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
            selectedCountry = country.name;
        });
        grid.appendChild(btn);
    });

    // Pagination info
    document.getElementById('page-info').textContent = (currentPage + 1) + ' / ' + total;
    document.getElementById('page-prev').disabled = currentPage === 0;
    document.getElementById('page-next').disabled = currentPage >= total - 1;
}

document.getElementById('page-prev').addEventListener('click', function() {
    if (currentPage > 0) { currentPage--; renderCountries(); }
});
document.getElementById('page-next').addEventListener('click', function() {
    var total = Math.ceil((COUNTRIES[selectedContinent] || []).length / PER_PAGE);
    if (currentPage < total - 1) { currentPage++; renderCountries(); }
});

document.getElementById('country-back').addEventListener('click', function() { showStep(stepContinent); });

/* country-next: unified */
document.getElementById('country-next').addEventListener('click', function() {
    if (!selectedCountry) return;
    if (editingFrom === 'recap') { editingFrom = null; showRecap(); showStep(stepRecap); return; }
    showStep(stepPhoto);
});


/* ==========================================================================
   STEP 5 — PROFILE PHOTO
   Canvas-based circular crop with drag to reposition and zoom slider
   ========================================================================== */

var photoDropzone   = document.getElementById('photo-dropzone');
var photoFileInput  = document.getElementById('photo-file-input');
var photoEmpty      = document.getElementById('photo-empty');
var photoPreviewWrap = document.getElementById('photo-preview-wrap');
var photoDragHint   = document.getElementById('photo-drag-hint');
var cropCanvas      = document.getElementById('crop-canvas');
var zoomSlider      = document.getElementById('zoom-slider');
var photoZoomWrap   = document.getElementById('photo-zoom-wrap');

var cropCtx         = cropCanvas.getContext('2d');
var photoImg        = null;
var zoom            = 1;
var offsetX         = 0;   // image center X offset (in image px)
var offsetY         = 0;   // image center Y offset (in image px)
var isDraggingPhoto = false;
var lastMouseX      = 0;
var lastMouseY      = 0;
var profilePhotoDataURL = null;

var CANVAS_SIZE = 400; // internal canvas resolution (high-dpi)
cropCanvas.width  = CANVAS_SIZE;
cropCanvas.height = CANVAS_SIZE;

/* Draw the image centred on the canvas with zoom and offset applied */
function drawCrop() {
    if (!photoImg) return;
    cropCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    /* Draw a circular clip */
    cropCtx.save();
    cropCtx.beginPath();
    cropCtx.arc(CANVAS_SIZE/2, CANVAS_SIZE/2, CANVAS_SIZE/2, 0, Math.PI*2);
    cropCtx.clip();

    /* Scale image so its shortest side fills the circle at zoom=1 */
    var scale = (CANVAS_SIZE / Math.min(photoImg.naturalWidth, photoImg.naturalHeight)) * zoom;
    var drawW = photoImg.naturalWidth  * scale;
    var drawH = photoImg.naturalHeight * scale;

    /* Clamp offset so the image always covers the circle */
    var maxOX = (drawW - CANVAS_SIZE) / 2;
    var maxOY = (drawH - CANVAS_SIZE) / 2;
    offsetX = Math.max(-maxOX, Math.min(maxOX, offsetX));
    offsetY = Math.max(-maxOY, Math.min(maxOY, offsetY));

    var drawX = (CANVAS_SIZE - drawW) / 2 + offsetX;
    var drawY = (CANVAS_SIZE - drawH) / 2 + offsetY;

    cropCtx.drawImage(photoImg, drawX, drawY, drawW, drawH);
    cropCtx.restore();

    /* Save result for recap */
    profilePhotoDataURL = cropCanvas.toDataURL('image/jpeg', 0.92);
}

/* Load image from File object */
function loadPhotoFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
            photoImg = img;
            zoom = 1; offsetX = 0; offsetY = 0;
            zoomSlider.value = 1;
            photoEmpty.style.display = 'none';
            photoPreviewWrap.classList.add('visible');
            photoZoomWrap.classList.remove('hidden');
            drawCrop();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

/* File input change */
photoFileInput.addEventListener('change', function() {
    if (photoFileInput.files && photoFileInput.files[0]) {
        loadPhotoFile(photoFileInput.files[0]);
    }
});

/* Drag & drop onto the dropzone */
photoDropzone.addEventListener('dragover', function(e) {
    e.preventDefault(); photoDropzone.classList.add('drag-over');
});
photoDropzone.addEventListener('dragleave', function() {
    photoDropzone.classList.remove('drag-over');
});
photoDropzone.addEventListener('drop', function(e) {
    e.preventDefault(); photoDropzone.classList.remove('drag-over');
    var file = e.dataTransfer && e.dataTransfer.files[0];
    if (file) loadPhotoFile(file);
});

/* Drag to reposition inside the canvas */
cropCanvas.addEventListener('mousedown', function(e) {
    if (!photoImg) return;
    isDraggingPhoto = true;
    lastMouseX = e.clientX; lastMouseY = e.clientY;
    e.preventDefault();
});
window.addEventListener('mousemove', function(e) {
    if (!isDraggingPhoto) return;
    var scale = (CANVAS_SIZE / Math.min(photoImg.naturalWidth, photoImg.naturalHeight)) * zoom;
    /* Convert screen delta to image-space delta */
    var rect  = cropCanvas.getBoundingClientRect();
    var ratio = CANVAS_SIZE / rect.width;
    offsetX += (e.clientX - lastMouseX) * ratio;
    offsetY += (e.clientY - lastMouseY) * ratio;
    lastMouseX = e.clientX; lastMouseY = e.clientY;
    drawCrop();
});
window.addEventListener('mouseup', function() { isDraggingPhoto = false; });

/* Touch drag support */
cropCanvas.addEventListener('touchstart', function(e) {
    if (!photoImg || !e.touches[0]) return;
    isDraggingPhoto = true;
    lastMouseX = e.touches[0].clientX; lastMouseY = e.touches[0].clientY;
    e.preventDefault();
}, {passive: false});
window.addEventListener('touchmove', function(e) {
    if (!isDraggingPhoto || !e.touches[0]) return;
    var rect  = cropCanvas.getBoundingClientRect();
    var ratio = CANVAS_SIZE / rect.width;
    offsetX += (e.touches[0].clientX - lastMouseX) * ratio;
    offsetY += (e.touches[0].clientY - lastMouseY) * ratio;
    lastMouseX = e.touches[0].clientX; lastMouseY = e.touches[0].clientY;
    drawCrop();
}, {passive: false});
window.addEventListener('touchend', function() { isDraggingPhoto = false; });

/* Zoom slider */
zoomSlider.addEventListener('input', function() {
    zoom = parseFloat(zoomSlider.value);
    drawCrop();
});

/* Navigation */
document.getElementById('photo-back').addEventListener('click', function() {
    showStep(stepCountry);
});

document.getElementById('photo-next').addEventListener('click', function() {
    if (editingFrom === 'recap') { editingFrom = null; showRecap(); showStep(stepRecap); return; }
    showStep(stepEmail);
    document.getElementById('email').focus();
});

/* ==========================================================================
   STEP 6 — EMAIL
   ========================================================================== */
document.getElementById('email-back').addEventListener('click', function() {
    showStep(stepPhoto);
});

document.getElementById('email-next').addEventListener('click', function() {
    var emailVal = document.getElementById('email').value.trim();
    var emailErr = document.getElementById('email-error');
    var emailRx  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(emailVal)) {
        emailErr.classList.remove('hidden');
        document.getElementById('email').focus();
        return;
    }
    emailErr.classList.add('hidden');
    if (editingFrom === 'recap') { editingFrom = null; showRecap(); showStep(stepRecap); return; }
    showStep(stepPassword);
    document.getElementById('password').focus();
});

document.getElementById('email').addEventListener('input', function() {
    document.getElementById('email-error').classList.add('hidden');
});

/* ==========================================================================
   STEP 7 — PASSWORD
   ========================================================================== */
var passwordInput = document.getElementById('password');

function checkPasswordRules(val) {
    return {
        lower:   /[a-z]/.test(val),
        upper:   /[A-Z]/.test(val),
        digit:   /[0-9]/.test(val),
        special: /[^a-zA-Z0-9]/.test(val)
    };
}

passwordInput.addEventListener('input', function() {
    var r = checkPasswordRules(passwordInput.value);
    document.getElementById('rule-lower').classList.toggle('valid', r.lower);
    document.getElementById('rule-upper').classList.toggle('valid', r.upper);
    document.getElementById('rule-digit').classList.toggle('valid', r.digit);
    document.getElementById('rule-special').classList.toggle('valid', r.special);
});

document.getElementById('password-toggle').addEventListener('click', function() {
    var isPass = passwordInput.type === 'password';
    passwordInput.type = isPass ? 'text' : 'password';
    document.querySelector('.eye-open').classList.toggle('hidden', isPass);
    document.querySelector('.eye-closed').classList.toggle('hidden', !isPass);
});

document.getElementById('password-back').addEventListener('click', function() {
    showStep(stepEmail);
});

document.getElementById('password-next').addEventListener('click', function() {
    var r = checkPasswordRules(passwordInput.value);
    if (!r.lower || !r.upper || !r.digit || !r.special) {
        /* Shake all invalid rules */
        ['rule-lower','rule-upper','rule-digit','rule-special'].forEach(function(id) {
            var el = document.getElementById(id);
            if (!el.classList.contains('valid')) {
                el.classList.add('shake');
                setTimeout(function() { el.classList.remove('shake'); }, 500);
            }
        });
        return;
    }
    if (editingFrom === 'recap') { editingFrom = null; showRecap(); showStep(stepRecap); return; }
    showRecap(); showStep(stepRecap);
});

/* ==========================================================================
   STEP 8 — RECAP
   ========================================================================== */

/* Source of truth: which step we came from when editing a single field */

function showRecap() {
    // Copy cropped photo to recap mini-circle canvas
    var recapPhotoCanvas = document.getElementById('recap-photo-canvas');
    recapPhotoCanvas.width  = 104;
    recapPhotoCanvas.height = 104;
    var rCtx = recapPhotoCanvas.getContext('2d');
    if (profilePhotoDataURL) {
        var tmpImg = new Image();
        tmpImg.onload = function() {
            rCtx.save();
            rCtx.beginPath();
            rCtx.arc(52, 52, 52, 0, Math.PI*2);
            rCtx.clip();
            rCtx.drawImage(tmpImg, 0, 0, 104, 104);
            rCtx.restore();
        };
        tmpImg.src = profilePhotoDataURL;
    } else {
        rCtx.clearRect(0, 0, 104, 104);
        rCtx.fillStyle = 'rgba(255,255,255,0.08)';
        rCtx.beginPath();
        rCtx.arc(52, 52, 52, 0, Math.PI*2);
        rCtx.fill();
    }

    // Populate recap values
    document.getElementById('recap-username').textContent  = document.getElementById('username').value || '—';
    var bd = digits.join('');
    document.getElementById('recap-birthday').textContent  = bd.length === 8
        ? bd.slice(0,2) + ' / ' + bd.slice(2,4) + ' / ' + bd.slice(4)
        : '—';
    document.getElementById('recap-continent').textContent = selectedContinent || '—';
    // Find country flag
    var countryList = COUNTRIES[selectedContinent] || [];
    var countryObj  = countryList.find(function(c) { return c.name === selectedCountry; });
    document.getElementById('recap-country').textContent   = countryObj
        ? countryObj.flag + '  ' + selectedCountry
        : (selectedCountry || '—');
    document.getElementById('recap-email').textContent = document.getElementById('email').value || '—';

    // Force re-animation of recap rows by re-triggering the animation
    document.querySelectorAll('.recap-row').forEach(function(row) {
        row.style.animation = 'none';
        row.offsetHeight; // reflow
        row.style.animation = '';
    });
    var checkPath = document.querySelector('.check-path');
    if (checkPath) {
        checkPath.style.animation = 'none';
        checkPath.offsetHeight;
        checkPath.style.animation = '';
    }
}

/* Edit buttons — each sends the user back to the relevant step,
   storing editingFrom so we know to return to recap after */
document.querySelectorAll('.recap-edit-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var target = btn.getAttribute('data-target');
        editingFrom = 'recap';
        if (target === 'photo') {
            showStep(stepPhoto);
        } else if (target === 'username') {
            showStep(stepUsername);
        } else if (target === 'birthday') {
            showStep(stepBirthday);
            birthdayHiddenInput.focus();
        } else if (target === 'continent') {
            showStep(stepContinent);
        } else if (target === 'country') {
            currentPage = 0;
            document.getElementById('country-continent-label').textContent = CONTINENT_LABELS[selectedContinent] || selectedContinent;
            renderCountries();
            showStep(stepCountry);
        } else if (target === 'email') {
            showStep(stepEmail);
            document.getElementById('email').focus();
        } else if (target === 'password') {
            showStep(stepPassword);
            document.getElementById('password').focus();
        }
    });
});

/* Override next buttons to return to recap when editing a single field */








document.getElementById('recap-confirm').addEventListener('click', function() {
    storedAccount = {
        email:    document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    /* Save full profile for settings page */
    try {
        localStorage.setItem('mse_profile', JSON.stringify({
            username:     document.getElementById('username').value,
            email:        document.getElementById('email').value,
            password:     document.getElementById('password').value,
            photoDataURL: profilePhotoDataURL,
            country:      selectedCountry,
            continent:    selectedContinent
        }));
    } catch(e) {}
    updateStatusBadge(true);
    buildProfile();
    showStep(stepProfile);
});

/* ==========================================================================
   PROFILE BLOCK
   ========================================================================== */
function buildProfile() {
    /* Big photo */
    var canvas = document.getElementById('profile-photo-canvas');
    canvas.width = 160; canvas.height = 160;
    var ctx = canvas.getContext('2d');
    if (profilePhotoDataURL) {
        var img = new Image();
        img.onload = function() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(80, 80, 80, 0, Math.PI*2);
            ctx.clip();
            ctx.drawImage(img, 0, 0, 160, 160);
            ctx.restore();
        };
        img.src = profilePhotoDataURL;
    } else {
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.beginPath(); ctx.arc(80,80,80,0,Math.PI*2); ctx.fill();
    }

    /* Hero name & sub */
    document.getElementById('profile-hero-name').textContent = document.getElementById('username').value || '—';
    var countryList2 = COUNTRIES[selectedContinent] || [];
    var cObj = countryList2.find(function(c) { return c.name === selectedCountry; });
    document.getElementById('profile-hero-sub').textContent = (cObj ? cObj.flag + ' ' : '') + (selectedCountry || '') + (selectedContinent ? '  ·  ' + selectedContinent : '');

    /* Editable fields */
    var bd = digits.join('');
    var fields = [
        { key:'username',  label:'Username',  value: document.getElementById('username').value },
        { key:'birthday',  label:'Birthday',  value: bd.length === 8 ? bd.slice(0,2)+' / '+bd.slice(2,4)+' / '+bd.slice(4) : '—' },
        { key:'continent', label:'Continent', value: selectedContinent || '—' },
        { key:'country',   label:'Country',   value: (cObj ? cObj.flag+' ' : '') + (selectedCountry || '—') },
        { key:'email',     label:'Email',     value: document.getElementById('email').value },
        { key:'password',  label:'Password',  value: '••••••••' }
    ];

    var container = document.getElementById('profile-fields');
    container.innerHTML = '';
    fields.forEach(function(f, i) {
        if (i > 0) {
            var div = document.createElement('div'); div.className = 'profile-divider'; container.appendChild(div);
        }
        var row = document.createElement('div');
        row.className = 'profile-field-row';
        row.style.setProperty('--delay', (i * 0.08) + 's');
        row.innerHTML =
            '<div class="profile-field-left">' +
            '<span class="profile-field-label">' + f.label + '</span>' +
            '<span class="profile-field-value" id="pf-' + f.key + '">' + f.value + '</span>' +
            '</div>' +
            '<button class="recap-edit-btn profile-edit-btn" data-profile-target="' + f.key + '" aria-label="Edit ' + f.label + '">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2.5l3 3L6 17H3v-3L14.5 2.5z"/></svg>' +
            '</button>';
        container.appendChild(row);
    });

    /* Profile edit buttons go back to the relevant step */
    document.querySelectorAll('.profile-edit-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var t = btn.getAttribute('data-profile-target');
            editingFrom = 'profile';
            if      (t === 'username')  { showStep(stepUsername); }
            else if (t === 'birthday')  { showStep(stepBirthday); birthdayHiddenInput.focus(); }
            else if (t === 'continent') { showStep(stepContinent); }
            else if (t === 'country')   { currentPage=0; document.getElementById('country-continent-label').textContent=CONTINENT_LABELS[selectedContinent]||selectedContinent; renderCountries(); showStep(stepCountry); }
            else if (t === 'email')     { showStep(stepEmail); document.getElementById('email').focus(); }
            else if (t === 'password')  { openChangePasswordModal(); }
        });
    });
}

/* When editing from profile, return to profile block after each step */
/* We hook into the existing unified next buttons by checking editingFrom === 'profile' */
(function patchProfileReturn() {
    function returnToProfile() { buildProfile(); showStep(stepProfile); }

    /* Username */
    var origUsernameNext = document.getElementById('username-next');
    origUsernameNext.addEventListener('click', function() {
        if (editingFrom === 'profile') { editingFrom = null; returnToProfile(); }
    });
    /* Birthday */
    var origBdNext = document.getElementById('birthday-next');
    origBdNext.addEventListener('click', function() {
        if (editingFrom === 'profile' && countFilled() === 8) { editingFrom = null; returnToProfile(); }
    });
    /* Continent → forces country re-pick so stay in country */
    /* Country */
    document.getElementById('country-next').addEventListener('click', function() {
        if (editingFrom === 'profile' && selectedCountry) { editingFrom = null; returnToProfile(); }
    });
    /* Email */
    document.getElementById('email-next').addEventListener('click', function() {
        if (editingFrom === 'profile') { editingFrom = null; returnToProfile(); }
    });
})();

/* Change password modal */
function openChangePasswordModal() {
    var modal = document.getElementById('change-password-modal');
    var input = document.getElementById('new-password-input');
    input.value = '';
    input.type = 'password';
    document.querySelector('.eye-open-new').classList.remove('hidden');
    document.querySelector('.eye-closed-new').classList.add('hidden');
    ['new-rule-lower','new-rule-upper','new-rule-digit','new-rule-special'].forEach(function(id){
        document.getElementById(id).classList.remove('valid');
    });
    document.getElementById('change-password-confirm').disabled = true;
    modal.classList.remove('hidden');
    setTimeout(function(){ input.focus(); }, 50);
}

document.getElementById('new-password-input').addEventListener('input', function() {
    var val = this.value;
    var r = { lower:/[a-z]/.test(val), upper:/[A-Z]/.test(val), digit:/[0-9]/.test(val), special:/[^a-zA-Z0-9]/.test(val) };
    document.getElementById('new-rule-lower').classList.toggle('valid', r.lower);
    document.getElementById('new-rule-upper').classList.toggle('valid', r.upper);
    document.getElementById('new-rule-digit').classList.toggle('valid', r.digit);
    document.getElementById('new-rule-special').classList.toggle('valid', r.special);
    document.getElementById('change-password-confirm').disabled = !(r.lower && r.upper && r.digit && r.special);
});

document.getElementById('new-password-toggle').addEventListener('click', function() {
    var inp = document.getElementById('new-password-input');
    var isPass = inp.type === 'password';
    inp.type = isPass ? 'text' : 'password';
    document.querySelector('.eye-open-new').classList.toggle('hidden', isPass);
    document.querySelector('.eye-closed-new').classList.toggle('hidden', !isPass);
});

document.getElementById('change-password-cancel').addEventListener('click', function() {
    document.getElementById('change-password-modal').classList.add('hidden');
});

document.getElementById('change-password-confirm').addEventListener('click', function() {
    var newPwd = document.getElementById('new-password-input').value;
    document.getElementById('password').value = newPwd;
    document.getElementById('change-password-modal').classList.add('hidden');
    /* Flash the password row to confirm update */
    var pwRow = document.querySelector('[data-profile-target="password"]');
    if (pwRow) { pwRow.closest('.profile-field-row').classList.add('field-updated'); setTimeout(function(){ pwRow.closest('.profile-field-row').classList.remove('field-updated'); }, 1200); }
});

/* Logout */
document.getElementById('logout-btn').addEventListener('click', function() {
    updateStatusBadge(false);
    showStep(stepLanding);
});

/* Delete account */
document.getElementById('delete-account-btn').addEventListener('click', function() {
    document.getElementById('delete-modal').classList.remove('hidden');
    document.getElementById('delete-confirm-input').value = '';
    document.getElementById('delete-modal-confirm').disabled = true;
    setTimeout(function() { document.getElementById('delete-confirm-input').focus(); }, 50);
});

document.getElementById('delete-confirm-input').addEventListener('input', function() {
    document.getElementById('delete-modal-confirm').disabled = this.value !== 'delete';
});

document.getElementById('delete-modal-cancel').addEventListener('click', function() {
    document.getElementById('delete-modal').classList.add('hidden');
});

document.getElementById('delete-modal-confirm').addEventListener('click', function() {
    /* Reset everything */
    storedAccount = null;
    try { localStorage.removeItem('mse_profile'); sessionStorage.setItem('mse_logged','0'); } catch(e) {}
    updateStatusBadge(false);
    document.getElementById('username').value = '';
    digits = ['','','','','','','','']; currentIndex = 0; updateCircles();
    selectedContinent = null; selectedCountry = null;
    document.querySelectorAll('.continent-btn').forEach(function(b){b.classList.remove('selected');});
    profilePhotoDataURL = null; photoImg = null;
    photoEmpty.style.display = ''; photoPreviewWrap.classList.remove('visible');
    photoZoomWrap.classList.add('hidden');
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('delete-modal').classList.add('hidden');
    showStep(stepLanding);
});

/* ==========================================================================
   SIDEBAR NAV — hover oval + active tab
   ========================================================================== */
var oval    = document.getElementById('hoverOval');
var sidenav = document.getElementById('sidenav');
var items   = document.querySelectorAll('.nav-item');

function snapToItem(item) {
    var wrap = item.querySelector('.nav-icon-wrap');
    var rect = wrap.getBoundingClientRect();
    oval.style.left = (rect.left + rect.width  / 2) + 'px';
    oval.style.top  = (rect.top  + rect.height / 2) + 'px';
}

sidenav.addEventListener('mouseenter', function() { oval.classList.add('visible'); });
sidenav.addEventListener('mouseleave', function() { oval.classList.remove('visible'); });
items.forEach(function(item) {
    item.addEventListener('mouseenter', function() { snapToItem(item); });
});
/* ==========================================================================
   AUTO-RESTORE SESSION — if already logged in, jump straight to profile
   Runs on DOMContentLoaded to ensure all DOM elements are ready.
   This covers navigation from any page (Market, Assets, Settings → Account).
   ========================================================================== */
/* tryAutoRestore → replaced by inline doRestore below */

/* ─── Auto-restore : si connecté → aller directement au profil ───
   Le script est en fin de <body> donc le DOM est déjà prêt.
   On utilise un timeout minimal pour laisser les autres IIFE s'exécuter d'abord. */

/* ── Language: apply translations ── */
function applyLang() {
    if (!window.MSE_LANG) return;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        el.textContent = window.MSE_LANG.t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
        el.innerHTML = window.MSE_LANG.t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
        el.setAttribute('placeholder', window.MSE_LANG.t(el.getAttribute('data-i18n-ph')));
    });
}
if (window.MSE_LANG) {
    window.MSE_LANG.onChange(function() { applyLang(); });
}

(function() {
    function doRestore() {
        try {
            var logged  = sessionStorage.getItem('mse_logged') === '1';
            var profile = JSON.parse(localStorage.getItem('mse_profile') || 'null');
            if (!logged || !profile || !profile.username) return false;

            /* Remplir les champs formulaire */
            var u = document.getElementById('username');
            var e = document.getElementById('email');
            var p = document.getElementById('password');
            if (u) u.value = profile.username || '';
            if (e) e.value = profile.email    || '';
            if (p) p.value = profile.password || '';

            if (profile.continent)    selectedContinent    = profile.continent;
            if (profile.country)      selectedCountry      = profile.country;
            if (profile.photoDataURL) profilePhotoDataURL  = profile.photoDataURL;
            if (profile.birthday) {
                var raw = (profile.birthday + '').replace(/\D/g,'');
                if (raw.length === 8) digits = raw.split('');
            }
            storedAccount = { email: profile.email, password: profile.password };
            updateStatusBadge(true);
            buildProfile();
            showStep(stepProfile);
            return true;
        } catch(ex) { return false; }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { doRestore(); applyLang(); });
    } else {
        /* DOM ready */
        doRestore();
        applyLang();
    }
})();
