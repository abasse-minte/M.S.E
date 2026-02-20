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
var stepUsername  = document.getElementById('step-username');
var stepBirthday  = document.getElementById('step-birthday');
var stepContinent = document.getElementById('step-continent');
var stepCountry   = document.getElementById('step-country');

function showStep(el) {
  [stepUsername, stepBirthday, stepContinent, stepCountry].forEach(function(s) {
    s.classList.add('hidden');
  });
  el.classList.remove('hidden');
}

/* ==========================================================================
   STEP 1 — USERNAME
   ========================================================================== */
document.getElementById('username-next').addEventListener('click', function() {
  showStep(stepBirthday);
  birthdayHiddenInput.focus();
  updateCircles();
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
document.getElementById('birthday-next').addEventListener('click', function() {
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

document.getElementById('continent-next').addEventListener('click', function() {
  if (!selectedContinent) return;
  // Set continent label
  document.getElementById('country-continent-label').textContent = CONTINENT_LABELS[selectedContinent] || selectedContinent;
  // Reset country pagination
  currentPage = 0;
  selectedCountry = null;
  renderCountries();
  showStep(stepCountry);
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

document.getElementById('country-next').addEventListener('click', function() {
  if (selectedCountry) {
    console.log('Country selected: ' + selectedCountry);
    // Add next step here
  }
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
  item.addEventListener('click', function(e) {
    e.preventDefault();
    items.forEach(function(i) { i.classList.remove('active'); });
    item.classList.add('active');
  });
});
