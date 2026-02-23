/* ═══════════════════════════════════════════════════════════════
   market.js — M.S.E Global Market Terminal
   Data: End of Day · Feb 19, 2026 · 16:00 EST
   ═══════════════════════════════════════════════════════════════ */

// ─── Language shorthand ───────────────────────────────────────
var L = window.MSE_LANG || { t: function(k){ return k; } };

// ═══════════════════════════════════════════════════════════════
//  DATA — End of Day Feb 19, 2026
// ═══════════════════════════════════════════════════════════════

const EQUITIES = [
    // US Mega Cap
    { name:'Apple Inc.',           sym:'AAPL',    price:243.08,  chg:+1.82,  pct:+0.75, low52:164.08,  high52:260.10,  cap:'$3.64T' },
    { name:'Microsoft Corp.',      sym:'MSFT',    price:408.52,  chg:-2.13,  pct:-0.52, low52:362.90,  high52:468.35,  cap:'$3.04T' },
    { name:'NVIDIA Corp.',         sym:'NVDA',    price:138.85,  chg:+4.21,  pct:+3.13, low52:47.32,   high52:153.13,  cap:'$3.38T' },
    { name:'Amazon.com Inc.',      sym:'AMZN',    price:228.14,  chg:+0.94,  pct:+0.41, low52:168.59,  high52:242.52,  cap:'$2.41T' },
    { name:'Alphabet Inc.',        sym:'GOOGL',   price:192.28,  chg:+1.12,  pct:+0.59, low52:150.68,  high52:208.70,  cap:'$2.35T' },
    { name:'Meta Platforms',       sym:'META',    price:731.28,  chg:+8.46,  pct:+1.17, low52:414.50,  high52:740.91,  cap:'$2.31T' },
    { name:'Tesla Inc.',           sym:'TSLA',    price:338.74,  chg:-6.12,  pct:-1.77, low52:138.80,  high52:488.54,  cap:'$1.09T' },
    { name:'Berkshire Hathaway B', sym:'BRK.B',   price:492.16,  chg:+1.08,  pct:+0.22, low52:355.00,  high52:504.28,  cap:'$1.07T' },
    { name:'JPMorgan Chase',       sym:'JPM',     price:273.48,  chg:-0.52,  pct:-0.19, low52:183.31,  high52:280.25,  cap:'$774B'  },
    { name:'Visa Inc.',            sym:'V',       price:349.22,  chg:+1.34,  pct:+0.39, low52:262.41,  high52:359.20,  cap:'$718B'  },
    // European
    { name:'LVMH Moët Hennessy',   sym:'MC.PA',   price:647.20,  chg:+9.40,  pct:+1.47, low52:530.40,  high52:782.60,  cap:'€318B'  },
    { name:'ASML Holding',         sym:'ASML',    price:662.45,  chg:+18.20, pct:+2.82, low52:508.70,  high52:1012.00, cap:'€262B'  },
    { name:'SAP SE',               sym:'SAP',     price:276.30,  chg:+3.15,  pct:+1.15, low52:179.82,  high52:293.40,  cap:'€333B'  },
    { name:'Nestlé SA',            sym:'NESN',    price:76.14,   chg:-0.48,  pct:-0.63, low52:71.50,   high52:100.08,  cap:'CHF228B'},
    { name:'Roche Holding',        sym:'ROG',     price:249.50,  chg:-1.20,  pct:-0.48, low52:218.30,  high52:289.20,  cap:'CHF211B'},
    // Asian
    { name:'Toyota Motor',         sym:'TM',      price:172.34,  chg:-1.08,  pct:-0.62, low52:159.80,  high52:226.88,  cap:'¥42T'   },
    { name:'Samsung Electronics',  sym:'SSNLF',   price:52.80,   chg:-0.40,  pct:-0.75, low52:41.30,   high52:74.00,   cap:'₩316T'  },
    { name:'Tencent Holdings',     sym:'TCEHY',   price:58.12,   chg:+1.24,  pct:+2.18, low52:32.41,   high52:63.50,   cap:'HK$5.5T'},
    { name:'TSMC',                 sym:'TSM',     price:193.82,  chg:+4.88,  pct:+2.58, low52:127.80,  high52:226.40,  cap:'NT$16T' },
    { name:'Alibaba Group',        sym:'BABA',    price:126.44,  chg:+2.30,  pct:+1.85, low52:67.05,   high52:148.40,  cap:'HK$1.4T'},
    // Other global
    { name:'Saudi Aramco',         sym:'2222',    price:6.82,    chg:-0.04,  pct:-0.58, low52:5.98,    high52:9.14,    cap:'SAR6.8T'},
    { name:'HSBC Holdings',        sym:'HSBC',    price:52.14,   chg:+0.34,  pct:+0.66, low52:36.49,   high52:56.20,   cap:'$98B'   },
    { name:'Novartis AG',          sym:'NVS',     price:108.62,  chg:+0.82,  pct:+0.76, low52:84.10,   high52:119.90,  cap:'$200B'  },
    { name:'Shell plc',            sym:'SHEL',    price:34.28,   chg:-0.18,  pct:-0.52, low52:27.40,   high52:38.80,   cap:'$208B'  },
    { name:'BHP Group',            sym:'BHP',     price:49.14,   chg:+0.68,  pct:+1.40, low52:40.30,   high52:62.50,   cap:'$126B'  },
    { name:'Rio Tinto',            sym:'RIO',     price:58.30,   chg:+1.12,  pct:+1.96, low52:47.90,   high52:74.20,   cap:'$98B'   },
    { name:'Reliance Industries',  sym:'RELIANCE',price:1244.50, chg:-8.40,  pct:-0.67, low52:1114.80, high52:1608.95, cap:'₹17T'   },
    { name:'Infosys Ltd.',         sym:'INFY',    price:22.84,   chg:+0.34,  pct:+1.51, low52:17.40,   high52:24.80,   cap:'₹9.5T'  },
    { name:'Ping An Insurance',    sym:'PNGAY',   price:11.62,   chg:+0.22,  pct:+1.93, low52:8.10,    high52:14.60,   cap:'HK$1T'  },
    { name:'Prosus NV',            sym:'PRX',     price:36.48,   chg:+0.74,  pct:+2.07, low52:22.30,   high52:44.20,   cap:'€38B'   },
];

const CRYPTO = [
    { name:'Bitcoin',   sym:'BTC',  price:95842, chg:+2.14, cap:'$1.89T', color:'#f7931a', letter:'₿' },
    { name:'Ethereum',  sym:'ETH',  price:2641,  chg:+1.88, cap:'$318B',  color:'#627eea', letter:'Ξ' },
    { name:'BNB',       sym:'BNB',  price:688,   chg:-0.42, cap:'$97B',   color:'#f3ba2f', letter:'B' },
    { name:'Solana',    sym:'SOL',  price:182.4, chg:+3.21, cap:'$86B',   color:'#9945ff', letter:'S' },
    { name:'XRP',       sym:'XRP',  price:2.64,  chg:+0.78, cap:'$152B',  color:'#00aae4', letter:'X' },
    { name:'USDC',      sym:'USDC', price:1.000, chg:+0.01, cap:'$54B',   color:'#2775ca', letter:'$' },
    { name:'Cardano',   sym:'ADA',  price:0.748, chg:-1.12, cap:'$26B',   color:'#0d1e2d', letter:'A' },
    { name:'Avalanche', sym:'AVAX', price:24.82, chg:+4.38, cap:'$10B',   color:'#e84142', letter:'A' },
    { name:'Chainlink', sym:'LINK', price:16.14, chg:+2.67, cap:'$10B',   color:'#375bd2', letter:'⬡' },
    { name:'Polkadot',  sym:'DOT',  price:5.28,  chg:-0.94, cap:'$7.9B',  color:'#e6007a', letter:'●' },
];

const FOREX = [
    { pair:'EUR/USD', rate:1.0498, chg:+0.0038, pct:+0.36 },
    { pair:'GBP/USD', rate:1.2618, chg:+0.0014, pct:+0.11 },
    { pair:'USD/JPY', rate:151.84, chg:-0.62,   pct:-0.41 },
    { pair:'USD/CHF', rate:0.8976, chg:+0.0012, pct:+0.13 },
    { pair:'USD/CAD', rate:1.4182, chg:-0.0024, pct:-0.17 },
    { pair:'AUD/USD', rate:0.6348, chg:+0.0022, pct:+0.35 },
    { pair:'NZD/USD', rate:0.5724, chg:+0.0018, pct:+0.32 },
    { pair:'EUR/GBP', rate:0.8319, chg:+0.0014, pct:+0.17 },
    { pair:'EUR/JPY', rate:159.42, chg:-0.28,   pct:-0.18 },
    { pair:'USD/CNY', rate:7.2482, chg:+0.0134, pct:+0.19 },
    { pair:'USD/INR', rate:86.88,  chg:-0.14,   pct:-0.16 },
    { pair:'USD/BRL', rate:5.8820, chg:+0.0480, pct:+0.82 },
];

const COMMODITIES = [
    { icon:'🥇', name:'Gold',           sym:'XAU',   price:2940.80, unit:'oz',    chg:+28.40, pct:+0.97 },
    { icon:'🥈', name:'Silver',         sym:'XAG',   price:32.84,   unit:'oz',    chg:+0.62,  pct:+1.92 },
    { icon:'🛢',  name:'Crude Oil WTI',  sym:'WTI',   price:71.48,   unit:'bbl',   chg:-0.84,  pct:-1.16 },
    { icon:'⛽', name:'Brent Crude',    sym:'BRENT', price:75.12,   unit:'bbl',   chg:-0.72,  pct:-0.95 },
    { icon:'⚡', name:'Natural Gas',    sym:'NG',    price:3.88,    unit:'MMBtu', chg:+0.14,  pct:+3.75 },
    { icon:'🌽', name:'Corn',           sym:'ZC',    price:494.75,  unit:'bu',    chg:+2.25,  pct:+0.46 },
    { icon:'🌾', name:'Wheat',          sym:'ZW',    price:564.25,  unit:'bu',    chg:-4.50,  pct:-0.79 },
    { icon:'☕', name:'Arabica Coffee', sym:'KC',    price:366.40,  unit:'lb',    chg:+8.20,  pct:+2.29 },
    { icon:'⚙️', name:'Copper',         sym:'HG',    price:4.68,    unit:'lb',    chg:+0.08,  pct:+1.74 },
    { icon:'🔋', name:'Lithium',        sym:'LIT',   price:12.84,   unit:'lb',    chg:-0.22,  pct:-1.68 },
];

const BONDS = [
    { name:'US 2Y Treasury',  yield:4.284, chgBps:-1.8, price:99.82  },
    { name:'US 10Y Treasury', yield:4.478, chgBps:+2.4, price:96.14  },
    { name:'US 30Y Treasury', yield:4.728, chgBps:+3.1, price:88.42  },
    { name:'German Bund 10Y', yield:2.488, chgBps:-0.6, price:101.28 },
    { name:'UK Gilt 10Y',     yield:4.524, chgBps:+1.2, price:95.80  },
    { name:'Japan JGB 10Y',   yield:1.416, chgBps:+2.8, price:98.62  },
    { name:'France OAT 10Y',  yield:3.148, chgBps:-0.4, price:97.40  },
    { name:'Italy BTP 10Y',   yield:3.582, chgBps:+0.8, price:96.18  },
];


// ── Helpers devise (MSE_CURRENCY partagé) ─────────────────────────────────
function C()    { return window.MSE_CURRENCY; }
function fmtM(v){ return C() ? C().fmt(C().fromUSD(v)) : '$' + Math.abs(v).toFixed(2); }
function symM() { return C() ? C().sym() : '$'; }


// ═══════════════════════════════════════════════════════════════
//  GESTION ENTREPRISES PERSONNALISÉES (Market)
// ═══════════════════════════════════════════════════════════════

/* Liste de travail — initialisée depuis EQUITIES, modifiable */
var EQUITIES_LIVE = EQUITIES.slice();

/* Charger les entreprises custom sauvegardées */
(function() {
    try {
        var saved = JSON.parse(localStorage.getItem('mse_custom_equities') || '[]');
        saved.forEach(function(e) { EQUITIES_LIVE.push(e); });
    } catch(ex) {}
})();

function saveCustomEquities() {
    var builtinSyms = EQUITIES.map(function(e) { return e.sym; });
    var custom = EQUITIES_LIVE.filter(function(e) { return builtinSyms.indexOf(e.sym) === -1; });
    try { localStorage.setItem('mse_custom_equities', JSON.stringify(custom)); } catch(ex) {}
}

function openAddCompanyModal() {
    var overlay = document.getElementById('modal-add-company');
    if (overlay) { resetAddCompanyForm(); overlay.classList.remove('hidden'); return; }

    /* Create the modal dynamically */
    var el = document.createElement('div');
    el.id = 'modal-add-company';
    el.className = 'mse-modal-overlay';
    el.innerHTML = `
    <div class="mse-modal-box">
      <div class="mse-modal-header">
        <span class="mse-modal-title">Add a company</span>
        <button class="mse-modal-close" id="acClose">✕</button>
      </div>
      <div class="mse-modal-body">
        <div class="mse-field-row">
          <label class="mse-field-label">Company name *</label>
          <input class="mse-field-input" id="acName" placeholder="ex: Hermès International" />
        </div>
        <div class="mse-field-row mse-field-row-2">
          <div>
            <label class="mse-field-label">Symbol / Ticker *</label>
            <input class="mse-field-input" id="acSym" placeholder="ex: RMS" style="text-transform:uppercase" />
          </div>
          <div>
            <label class="mse-field-label">Region</label>
            <select class="mse-field-input mse-field-select" id="acContinent">
              <option value="Americas">🌎 Americas</option>
              <option value="Europe">🌍 Europe</option>
              <option value="Asia">🌏 Asia</option>
              <option value="MiddleEast">🌙 Mid-East</option>
              <option value="Oceania">🦘 Oceania</option>
            </select>
          </div>
        </div>
        <div class="mse-field-row mse-field-row-3">
          <div>
            <label class="mse-field-label">Price (USD) *</label>
            <input class="mse-field-input" id="acPrice" type="number" placeholder="0.00" step="0.01" min="0" />
          </div>
          <div>
            <label class="mse-field-label">Daily change ($)</label>
            <input class="mse-field-input" id="acChg" type="number" placeholder="0.00" step="0.01" />
          </div>
          <div>
            <label class="mse-field-label">Change (%)</label>
            <input class="mse-field-input" id="acPct" type="number" placeholder="0.00" step="0.01" />
          </div>
        </div>
        <div class="mse-field-row mse-field-row-3">
          <div>
            <label class="mse-field-label">52-week low</label>
            <input class="mse-field-input" id="acLow" type="number" placeholder="0.00" step="0.01" min="0" />
          </div>
          <div>
            <label class="mse-field-label">52-week high</label>
            <input class="mse-field-input" id="acHigh" type="number" placeholder="0.00" step="0.01" min="0" />
          </div>
          <div>
            <label class="mse-field-label">Market cap</label>
            <input class="mse-field-input" id="acCap" placeholder="ex: $10B" />
          </div>
        </div>
        <div class="mse-field-row mse-field-row-2">
          <div>
            <label class="mse-field-label">Shares outstanding (M)</label>
            <input class="mse-field-input" id="acShares" type="number" placeholder="ex: 105" step="1" min="0" />
          </div>
          <div>
            <label class="mse-field-label">Eligibility</label>
            <select class="mse-field-input mse-field-select" id="acElig">
              <option value="CTO">CTO</option>
              <option value="PEA">PEA</option>
            </select>
          </div>
        </div>
        <p class="mse-field-error hidden" id="acError">Please fill in the required fields (*).</p>
      </div>
      <div class="mse-modal-footer">
        <button class="mse-btn-cancel" id="acCancel">Cancel</button>
        <button class="mse-btn-confirm" id="acConfirm">Add</button>
      </div>
    </div>`;
    document.body.appendChild(el);

    document.getElementById('acClose').addEventListener('click', function() { el.classList.add('hidden'); });
    document.getElementById('acCancel').addEventListener('click', function() { el.classList.add('hidden'); });
    el.addEventListener('click', function(e) { if (e.target === el) el.classList.add('hidden'); });

    /* Auto-calc % depuis variation $ et prix */
    document.getElementById('acChg').addEventListener('input', function() {
        var price = parseFloat(document.getElementById('acPrice').value);
        var chg   = parseFloat(this.value);
        if (price > 0 && !isNaN(chg)) {
            document.getElementById('acPct').value = ((chg / price) * 100).toFixed(2);
        }
    });

    document.getElementById('acConfirm').addEventListener('click', function() {
        var name  = document.getElementById('acName').value.trim();
        var sym   = document.getElementById('acSym').value.trim().toUpperCase();
        var price = parseFloat(document.getElementById('acPrice').value);
        var errEl = document.getElementById('acError');
        if (!name || !sym || isNaN(price) || price <= 0) {
            errEl.classList.remove('hidden'); return;
        }
        errEl.classList.add('hidden');

        /* Vérifier doublon */
        if (EQUITIES_LIVE.find(function(e) { return e.sym === sym; })) {
            errEl.textContent = 'Ce ticker existe déjà dans la liste.';
            errEl.classList.remove('hidden'); return;
        }

        var newEntry = {
            name:        name,
            sym:         sym,
            price:       price,
            chg:         parseFloat(document.getElementById('acChg').value) || 0,
            pct:         parseFloat(document.getElementById('acPct').value) || 0,
            low52:       parseFloat(document.getElementById('acLow').value) || price * 0.8,
            high52:      parseFloat(document.getElementById('acHigh').value) || price * 1.2,
            cap:         document.getElementById('acCap').value.trim() || '—',
            continent:   document.getElementById('acContinent').value,
            eligibility: document.getElementById('acElig').value,
            shares:      parseInt(document.getElementById('acShares').value) || 0,
            custom:      true
        };

        EQUITIES_LIVE.push(newEntry);
        saveCustomEquities();
        renderEquities();
        renderEquitiesControls();
        el.classList.add('hidden');
        showMarketToast(L.t('modal.add.toast', { name: name }));
    });
}

function openRemoveCompanyModal() {
    var overlay = document.getElementById('modal-remove-company');
    if (overlay) { renderRemoveList(); overlay.classList.remove('hidden'); return; }

    var el = document.createElement('div');
    el.id = 'modal-remove-company';
    el.className = 'mse-modal-overlay';
    el.innerHTML = `
    <div class="mse-modal-box mse-modal-box-sm">
      <div class="mse-modal-header">
        <span class="mse-modal-title">Supprimer une entreprise</span>
        <button class="mse-modal-close" id="rcClose">✕</button>
      </div>
      <p class="mse-modal-hint">Seules les entreprises personnalisées peuvent être supprimées.</p>
      <div class="mse-remove-list" id="removeList"></div>
      <div class="mse-modal-footer">
        <button class="mse-btn-cancel" id="rcClose2">Fermer</button>
      </div>
    </div>`;
    document.body.appendChild(el);

    document.getElementById('rcClose').addEventListener('click', function() { el.classList.add('hidden'); });
    document.getElementById('rcClose2').addEventListener('click', function() { el.classList.add('hidden'); });
    el.addEventListener('click', function(e) { if (e.target === el) el.classList.add('hidden'); });
    renderRemoveList();
}

function renderRemoveList() {
    var listEl = document.getElementById('removeList');
    if (!listEl) return;
    var builtinSyms = EQUITIES.map(function(e) { return e.sym; });
    var custom = EQUITIES_LIVE.filter(function(e) { return builtinSyms.indexOf(e.sym) === -1; });

    if (!custom.length) {
        listEl.innerHTML = '<p class="mse-remove-empty">Aucune entreprise personnalisée à supprimer.</p>';
        return;
    }
    listEl.innerHTML = custom.map(function(e) {
        return '<div class="mse-remove-row">' +
            '<span class="mse-remove-sym">' + e.sym + '</span>' +
            '<span class="mse-remove-name">' + e.name + '</span>' +
            '<button class="mse-remove-btn" data-sym="' + e.sym + '">Supprimer</button>' +
            '</div>';
    }).join('');

    listEl.querySelectorAll('.mse-remove-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var sym = btn.getAttribute('data-sym');
            EQUITIES_LIVE = EQUITIES_LIVE.filter(function(e) { return e.sym !== sym; });
            saveCustomEquities();
            renderEquities();
            renderEquitiesControls();
            renderRemoveList();
            showMarketToast(L.t('modal.rm.toast'));
        });
    });
}

function showMarketToast(msg) {
    var t = document.getElementById('mse-market-toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'mse-market-toast';
        t.className = 'mse-toast';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function() { t.classList.remove('show'); }, 2800);
}

function resetAddCompanyForm() {
    ['acName','acSym','acPrice','acChg','acPct','acLow','acHigh','acCap','acShares'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
    });
    var errEl = document.getElementById('acError');
    if (errEl) { errEl.classList.add('hidden'); errEl.textContent = 'Veuillez remplir les champs obligatoires (*).'; }
}

// ═══════════════════════════════════════════════════════════════
//  TICKER TAPE
// ═══════════════════════════════════════════════════════════════

const TICKER_DATA = [
    ...EQUITIES.slice(0, 15).map(e => ({ sym: e.sym,  price: fmtM(e.price), chg: e.pct, raw: e.price })),
    ...CRYPTO.slice(0, 6).map(c =>    ({ sym: c.sym,  price: fmtM(c.price), chg: c.chg })),
    ...FOREX.slice(0, 5).map(f =>     ({ sym: f.pair, price: f.rate.toFixed(4),        chg: f.pct })),
];

function buildTicker() {
    const items = [...TICKER_DATA, ...TICKER_DATA]; // doubled for seamless infinite loop
    return items.map(t => {
        const pos = t.chg >= 0;
        return `<span class="tick-item">
      <span class="tick-sym">${t.sym}</span>
      <span class="tick-price">${t.price}</span>
      <span class="tick-chg ${pos ? 'pos' : 'neg'}">${pos ? '▲' : '▼'} ${Math.abs(t.chg).toFixed(2)}%</span>
    </span>`;
    }).join('');
}

// ═══════════════════════════════════════════════════════════════
//  RENDER — EQUITIES
// ═══════════════════════════════════════════════════════════════

function renderEquities() {
    const list = typeof EQUITIES_LIVE !== 'undefined' ? EQUITIES_LIVE : EQUITIES;
    const tb = document.getElementById('equitiesTbody');
    tb.innerHTML = list.map(e => {
        const pos  = e.chg >= 0;
        const col  = pos ? 'var(--green)' : 'var(--red)';
        const bars = [3, 5, 4, 7, 6, 8].map((h, i) =>
            `<span style="height:${h}px;opacity:${0.4 + i * 0.1};color:${col};background:currentColor"></span>`
        ).join('');
        const customTag = e.custom ? '<span class="eq-custom-tag">✎</span>' : '';
        return `<tr class="${e.custom ? 'eq-custom-row' : ''}">
      <td>
        <span class="t-name">${e.name} ${customTag}</span>
        <span class="t-sub">${e.sym}</span>
      </td>
      <td style="font-size:.8rem">
        ${fmtM(e.price)}
      </td>
      <td class="${pos ? 't-pos' : 't-neg'}">${pos ? '+' : ''}${e.chg.toFixed(2)}</td>
      <td class="${pos ? 't-pos' : 't-neg'}">
        ${pos ? '+' : ''}${e.pct.toFixed(2)}%
        <span class="mini-bar">${bars}</span>
      </td>
      <td class="t-neu" style="font-size:.65rem">
        ${e.low52.toLocaleString()} – ${e.high52.toLocaleString()}
      </td>
      <td style="color:var(--blue);font-size:.72rem">${e.cap}</td>
    </tr>`;
    }).join('');
}

// ═══════════════════════════════════════════════════════════════
//  RENDER — CRYPTO
// ═══════════════════════════════════════════════════════════════

function renderCrypto() {
    const list = document.getElementById('cryptoList');
    list.innerHTML = CRYPTO.map(c => {
        const pos      = c.chg >= 0;
        const decimals = c.price < 10 ? 3 : 2;
        return `<div class="crypto-row">
      <div class="crypto-icon"
           style="background:${c.color}22;border:1px solid ${c.color}44;color:${c.color}">
        ${c.letter}
      </div>
      <div class="crypto-info">
        <p class="crypto-name">${c.name}</p>
        <p class="crypto-sym">${c.sym}</p>
      </div>
      <div class="crypto-right">
        <span class="crypto-price">
          ${fmtM(c.price)}
        </span>
        <span class="crypto-chg ${pos ? 't-pos' : 't-neg'}">${pos ? '+' : ''}${c.chg.toFixed(2)}%</span>
        <span class="crypto-cap">${c.cap}</span>
      </div>
    </div>`;
    }).join('');
}

// ═══════════════════════════════════════════════════════════════
//  RENDER — FOREX
// ═══════════════════════════════════════════════════════════════

function renderForex() {
    const tb = document.getElementById('forexTbody');
    tb.innerHTML = FOREX.map(f => {
        const pos = f.chg >= 0;
        return `<tr>
      <td>
        <span class="t-name" style="font-family:var(--mono);font-size:.8rem">${f.pair}</span>
      </td>
      <td style="color:var(--cyan)">${f.rate.toFixed(4)}</td>
      <td class="${pos ? 't-pos' : 't-neg'}">${pos ? '+' : ''}${f.chg.toFixed(4)}</td>
      <td class="${pos ? 't-pos' : 't-neg'}">${pos ? '+' : ''}${f.pct.toFixed(2)}%</td>
    </tr>`;
    }).join('');
}

// ═══════════════════════════════════════════════════════════════
//  RENDER — COMMODITIES
// ═══════════════════════════════════════════════════════════════

function renderCommodities() {
    const tb = document.getElementById('commoditiesTbody');
    tb.innerHTML = COMMODITIES.map(c => {
        const pos = c.chg >= 0;
        return `<tr>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="com-icon">${c.icon}</span>
          <div>
            <span class="t-name">${c.name}</span>
            <span class="t-sub">${c.sym}</span>
          </div>
        </div>
      </td>
      <td style="color:var(--gold)">
        ${fmtM(c.price)}
      </td>
      <td style="font-size:.65rem;color:var(--muted)">/${c.unit}</td>
      <td class="${pos ? 't-pos' : 't-neg'}">${pos ? '+' : ''}${c.chg.toFixed(2)}</td>
      <td class="${pos ? 't-pos' : 't-neg'}">${pos ? '+' : ''}${c.pct.toFixed(2)}%</td>
    </tr>`;
    }).join('');
}

// ═══════════════════════════════════════════════════════════════
//  RENDER — BONDS
// ═══════════════════════════════════════════════════════════════

function renderBonds() {
    const tb = document.getElementById('bondsTbody');
    tb.innerHTML = BONDS.map(b => {
        const pos = b.chgBps >= 0;
        return `<tr>
      <td><span class="t-name" style="font-size:.75rem">${b.name}</span></td>
      <td style="color:var(--gold)">${b.yield.toFixed(3)}%</td>
      <td class="${pos ? 't-pos' : 't-neg'}">${pos ? '+' : ''}${b.chgBps.toFixed(1)} bps</td>
      <td class="t-neu">${b.price.toFixed(2)}</td>
    </tr>`;
    }).join('');
}

// ═══════════════════════════════════════════════════════════════
//  STATUS BADGE — reads MSE session profile
// ═══════════════════════════════════════════════════════════════

function initStatusBadge() {
    try {
        var logged = sessionStorage.getItem('mse_logged') === '1';
        if (logged) {
            document.getElementById('statusBadge').className = 'status-badge online';
            document.getElementById('statusLabel').textContent = 'ON';
        }
    } catch (e) {}
}

// ═══════════════════════════════════════════════════════════════
//  HOVER OVAL NAV
// ═══════════════════════════════════════════════════════════════

function initHoverOval() {
    const oval = document.getElementById('hoverOval');
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            const r = item.querySelector('.nav-icon-wrap').getBoundingClientRect();
            oval.style.left = (r.left + r.width  / 2) + 'px';
            oval.style.top  = (r.top  + r.height / 2) + 'px';
            oval.classList.add('visible');
        });
        item.addEventListener('mouseleave', function() {
            oval.classList.remove('visible');
        });
    });
}

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tickerScroll').innerHTML = buildTicker();
    renderEquities();
    renderCrypto();
    renderForex();
    renderCommodities();
    renderBonds();
    initStatusBadge();
    initHoverOval();

    /* Boutons Ajouter / Supprimer entreprise */
    var btnAdd = document.getElementById('btnAddCompany');
    var btnRm  = document.getElementById('btnRemoveCompany');
    if (btnAdd) btnAdd.addEventListener('click', openAddCompanyModal);
    if (btnRm)  btnRm.addEventListener('click',  openRemoveCompanyModal);

    /* Re-build modals on language change */
    if (window.MSE_LANG) {
        window.MSE_LANG.onChange(function() {
            L = window.MSE_LANG;
            applyLang();
    /* Re-build any open modal */
            var addModal = document.getElementById('modal-add-company');
            if (addModal && !addModal.classList.contains('hidden')) {
                addModal.classList.add('hidden');
            }
            var rmModal = document.getElementById('modal-remove-company');
            if (rmModal && !rmModal.classList.contains('hidden')) {
                rmModal.classList.add('hidden');
            }
        });
    }

    /* Abonnement devise — re-render tout à chaque changement */
    if (window.MSE_CURRENCY) {
        window.MSE_CURRENCY.onChange(function() {
            document.getElementById('tickerScroll').innerHTML = buildTicker();
            renderEquities();
            renderCrypto();
            renderCommodities();
        });
    }
});

// ═══════════════════════════════════════════════════════════════
//  STATUS BADGE CLICK — sign in or logout
// ═══════════════════════════════════════════════════════════════
(function() {
    var badge = document.getElementById('statusBadge');
    if (!badge) return;
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', function() {
        var logged = sessionStorage.getItem('mse_logged') === '1';
        if (!logged) {
            window.location.href = 'registration.html';
        } else {
            // Logout
            sessionStorage.setItem('mse_logged', '0');
            badge.className = 'status-badge offline';
            document.getElementById('statusLabel').textContent = 'OFF';
        }
    });
})();

// ═══════════════════════════════════════════════════════════════
//  i18n — Apply translations to data-i18n elements
// ═══════════════════════════════════════════════════════════════
function applyLang() {
    if (!window.MSE_LANG) return;
    L = window.MSE_LANG;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        el.textContent = L.t(key);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
        el.setAttribute('title', L.t(el.getAttribute('data-i18n-title')));
    });
    // Update Add/Remove button text inside
    var btnAdd = document.getElementById('btnAddCompany');
    var btnRm  = document.getElementById('btnRemoveCompany');
    if (btnAdd) {
        var txtNode = Array.from(btnAdd.childNodes).find(function(n){ return n.nodeType === 3 && n.textContent.trim(); });
        if (txtNode) txtNode.textContent = ' ' + L.t('market.equities.add');
    }
    if (btnRm) {
        var txtNode2 = Array.from(btnRm.childNodes).find(function(n){ return n.nodeType === 3 && n.textContent.trim(); });
        if (txtNode2) txtNode2.textContent = ' ' + L.t('market.equities.remove');
    }
    // Update equities badge
    var badge = document.getElementById('equitiesBadge');
    if (badge) badge.textContent = (typeof EQUITIES_LIVE !== 'undefined' ? EQUITIES_LIVE.length : 30) + ' ' + (L.fr() ? 'actions' : 'stocks');
}
