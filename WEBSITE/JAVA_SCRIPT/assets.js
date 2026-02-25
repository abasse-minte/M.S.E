/* ==========================================================================
   assets.js — M.S.E Assets Page
   Gestion portefeuille : CTO / PEA, achats, ventes, wallet, holdings
   ========================================================================== */

'use strict';

/* Initialiser le wallet à 0 si pas encore défini */
(function initWallet() {
    try {
        var existing = localStorage.getItem('mse_wallet');
        if (!existing) {
            localStorage.setItem('mse_wallet', JSON.stringify({CTO: 0, PEA: 0}));
        }
        var existingH = localStorage.getItem('mse_holdings');
        if (!existingH) {
            localStorage.setItem('mse_holdings', JSON.stringify({CTO: {}, PEA: {}}));
        }
    } catch(e) {}
})();

/* ── Currency shorthand ── */
function C()     { return window.MSE_CURRENCY; }
function fmtC(v) { return C() ? C().fmt(C().fromUSD(v)) : '$' + Math.abs(v).toFixed(2); }
function symC()  { return C() ? C().sym() : '$'; }

/* ── Language shorthand ── */
function _L() { return window.MSE_LANG || { t: function(k){ return k; }, fr: function(){ return false; } }; }

/* ==========================================================================
   STOCK DATA — partagé avec market.js via localStorage (mse_custom_equities)
   ========================================================================== */

var BASE_STOCKS = [
    { name:'Apple Inc.',           sym:'AAPL',     price:243.08,  chg:+0.75 },
    { name:'Microsoft Corp.',      sym:'MSFT',     price:408.52,  chg:-0.52 },
    { name:'NVIDIA Corp.',         sym:'NVDA',     price:138.85,  chg:+3.13 },
    { name:'Amazon.com Inc.',      sym:'AMZN',     price:228.14,  chg:+0.41 },
    { name:'Alphabet Inc.',        sym:'GOOGL',    price:192.28,  chg:+0.59 },
    { name:'Meta Platforms',       sym:'META',     price:731.28,  chg:+1.17 },
    { name:'Tesla Inc.',           sym:'TSLA',     price:338.74,  chg:-1.77 },
    { name:'Berkshire Hathaway B', sym:'BRK.B',    price:492.16,  chg:+0.22 },
    { name:'JPMorgan Chase',       sym:'JPM',      price:273.48,  chg:-0.19 },
    { name:'Visa Inc.',            sym:'V',        price:349.22,  chg:+0.39 },
    { name:'LVMH Moët Hennessy',   sym:'MC.PA',    price:647.20,  chg:+1.47 },
    { name:'ASML Holding',         sym:'ASML',     price:662.45,  chg:+2.82 },
    { name:'SAP SE',               sym:'SAP',      price:276.30,  chg:+1.15 },
    { name:'Nestlé SA',            sym:'NESN',     price:76.14,   chg:-0.63 },
    { name:'Roche Holding',        sym:'ROG',      price:249.50,  chg:-0.48 },
    { name:'Toyota Motor',         sym:'TM',       price:172.34,  chg:-0.62 },
    { name:'Samsung Electronics',  sym:'SSNLF',    price:52.80,   chg:-0.75 },
    { name:'Tencent Holdings',     sym:'TCEHY',    price:58.12,   chg:+2.18 },
    { name:'TSMC',                 sym:'TSM',      price:193.82,  chg:+2.58 },
    { name:'Alibaba Group',        sym:'BABA',     price:126.44,  chg:+1.85 },
    { name:'Saudi Aramco',         sym:'2222',     price:6.82,    chg:-0.58 },
    { name:'HSBC Holdings',        sym:'HSBC',     price:52.14,   chg:+0.66 },
    { name:'Novartis AG',          sym:'NVS',      price:108.62,  chg:+0.76 },
    { name:'Shell plc',            sym:'SHEL',     price:34.28,   chg:-0.52 },
    { name:'BHP Group',            sym:'BHP',      price:49.14,   chg:+1.40 },
    { name:'Rio Tinto',            sym:'RIO',      price:58.30,   chg:+1.96 },
    { name:'Reliance Industries',  sym:'RELIANCE', price:1244.50, chg:-0.67 },
    { name:'Infosys Ltd.',         sym:'INFY',     price:22.84,   chg:+1.51 },
    { name:'Ping An Insurance',    sym:'PNGAY',    price:11.62,   chg:+1.93 },
    { name:'Prosus NV',            sym:'PRX',      price:36.48,   chg:+2.07 },
];

/* Actions éligibles PEA (actions européennes) */
var PEA_ELIGIBLE = ['MC.PA','ASML','SAP','NESN','ROG','HSBC','NVS','SHEL','BHP','RIO','PRX'];

function getStocks() {
    var list = BASE_STOCKS.slice();
    try {
        var custom = JSON.parse(localStorage.getItem('mse_custom_equities') || '[]');
        var baseSyms = BASE_STOCKS.map(function(s){ return s.sym; });
        custom.forEach(function(e) {
            if (baseSyms.indexOf(e.sym) === -1) {
                list.push({ name: e.name, sym: e.sym, price: e.price, chg: e.pct || 0 });
            }
        });
    } catch(e) {}
    return list;
}

/* ==========================================================================
   STATE
   ========================================================================== */

var activeAccount = 'CTO'; /* 'CTO' | 'PEA' */
var hasPEA        = false;

/* Wallet : solde liquide par compte */
function getWallet() {
    try { return JSON.parse(localStorage.getItem('mse_wallet') || '{"CTO":0,"PEA":0}'); }
    catch(e) { return {CTO:0, PEA:0}; }
}
function setWallet(w) {
    try { localStorage.setItem('mse_wallet', JSON.stringify(w)); } catch(e) {}
}

/* Holdings : { CTO: { SYM: {name, shares, avgPrice} }, PEA: {...} } */
function getHoldings() {
    try {
        var h = JSON.parse(localStorage.getItem('mse_holdings') || '{}');
        if (!h.CTO) h.CTO = {};
        if (!h.PEA) h.PEA = {};
        return h;
    } catch(e) { return {CTO:{}, PEA:{}}; }
}
function setHoldings(h) {
    try { localStorage.setItem('mse_holdings', JSON.stringify(h)); } catch(e) {}
}

/* Profil utilisateur */
function getProfile() {
    try { return JSON.parse(localStorage.getItem('mse_profile') || 'null'); }
    catch(e) { return null; }
}

/* ==========================================================================
   INIT — lire le profil et configurer les onglets
   ========================================================================== */

(function initAccount() {
    var profile = getProfile();
    if (profile && profile.hasPEA) {
        hasPEA = true;
        var tabPEA = document.getElementById('tabPEA');
        if (tabPEA) tabPEA.classList.remove('hidden');
    }

    /* Restaurer l'onglet actif mémorisé */
    try {
        var saved = sessionStorage.getItem('mse_active_account');
        if (saved === 'PEA' && hasPEA) activeAccount = 'PEA';
    } catch(e) {}

    /* Appliquer l'état actif des onglets */
    refreshAccountTabs();
})();

function refreshAccountTabs() {
    document.querySelectorAll('.account-tab').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.account === activeAccount);
    });
}

/* Clics sur les onglets */
document.querySelectorAll('.account-tab').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var target = btn.dataset.account;
        if (target === 'PEA' && !hasPEA) return;
        activeAccount = target;
        try { sessionStorage.setItem('mse_active_account', activeAccount); } catch(e) {}
        refreshAccountTabs();
        renderAll();
    });
});

/* ==========================================================================
   STATUS BADGE
   ========================================================================== */

function updateStatusBadge() {
    var badge = document.getElementById('statusBadge');
    var label = document.getElementById('statusLabel');
    if (!badge) return;
    var on = false;
    try { on = sessionStorage.getItem('mse_logged') === '1'; } catch(e) {}
    badge.className = 'status-badge ' + (on ? 'online' : 'offline');
    label.textContent = on ? 'ON' : 'OFF';
}
updateStatusBadge();

/* ==========================================================================
   GUEST LOCK — bloque la page si non connecté (mode OFF)
   ========================================================================== */

function checkAuthLock() {
    var logged = false;
    try { logged = sessionStorage.getItem('mse_logged') === '1'; } catch(e) {}
    var overlay = document.getElementById('guestLockOverlay');
    if (!overlay) return;
    if (logged) {
        overlay.style.display = 'none';
        /* Charger le contenu maintenant que l'utilisateur est connecté */
        renderAll();
        renderStatCards();
    } else {
        overlay.style.display = 'flex';
    }
}

/* Vérifier dès le chargement */
checkAuthLock();

/* Ré-vérifier si le badge status change (clic sur OFF→ON depuis cette page) */
var _statusBadgeEl = document.getElementById('statusBadge');
if (_statusBadgeEl) {
    _statusBadgeEl.addEventListener('click', function() {
        setTimeout(checkAuthLock, 50);
    });
}


/* ==========================================================================
   RENDER — Balance & Holdings
   ========================================================================== */

function renderAll() {
    renderBalance();
    renderHoldings();
    renderStocks();
    renderTaxSummary();
    renderPerfChart();
}

function renderBalance() {
    var wallet = getWallet();
    var balance = wallet[activeAccount] || 0;
    var holdings = getHoldings();
    var acctHoldings = holdings[activeAccount] || {};
    var stocks = getStocks();

    /* Calculer valeur totale du portefeuille */
    var stocksValue = 0;
    Object.keys(acctHoldings).forEach(function(sym) {
        var h = acctHoldings[sym];
        var s = stocks.find(function(x){ return x.sym === sym; });
        if (s) stocksValue += s.price * h.shares;
    });

    var totalUSD = balance + stocksValue;
    var displayed = C() ? C().fromUSD(totalUSD) : totalUSD;
    var label     = C() ? C().label() : 'USD';

    document.getElementById('displayBalance').textContent =
        displayed.toLocaleString(label === 'EUR' ? 'fr-FR' : 'en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
    document.getElementById('balanceCurrencyLabel').textContent = label;
}

function renderHoldings() {
    var list      = document.getElementById('holdingsList');
    var countEl   = document.getElementById('holdingsCount');
    var holdings  = getHoldings();
    var acctH     = holdings[activeAccount] || {};
    var stocks    = getStocks();
    var keys      = Object.keys(acctH).filter(function(k){ return acctH[k].shares > 0; });

    countEl.textContent = keys.length + ' ' + (_L().fr() ? (keys.length !== 1 ? 'actions' : 'action') : 'stock' + (keys.length !== 1 ? 's' : ''));

    if (keys.length === 0) {
        list.innerHTML = '<p class="holdings-empty">' + _L().t('assets.holdings.empty') + '</p>';
        return;
    }

    list.innerHTML = '';
    keys.forEach(function(sym) {
        var h = acctH[sym];
        var s = stocks.find(function(x){ return x.sym === sym; });
        var currentPrice = s ? s.price : h.avgPrice;
        var currentVal   = currentPrice * h.shares;
        var costBasis    = h.avgPrice   * h.shares;
        var pnl          = currentVal - costBasis;
        var pnlPct       = costBasis > 0 ? (pnl / costBasis) * 100 : 0;
        var isPos        = pnl >= 0;

        var row = document.createElement('div');
        row.className = 'holding-row';
        row.innerHTML =
            '<div class="holding-ticker-wrap">' + sym.slice(0,4) + '</div>' +
            '<div class="holding-info">' +
            '<div class="holding-name">' + h.name + '</div>' +
            '<div class="holding-shares">' + h.shares + ' ' + (_L().fr() ? 'action' + (h.shares > 1 ? 's' : '') : 'share' + (h.shares > 1 ? 's' : '')) + ' · avg ' + fmtC(h.avgPrice) + '</div>' +
            '</div>' +
            '<div class="holding-right">' +
            '<div class="holding-value">' + fmtC(currentVal) + '</div>' +
            '<div class="holding-change ' + (isPos ? 'pos' : 'neg') + '">' +
            (isPos ? '▲' : '▼') + ' ' + (isPos ? '+' : '') + pnl.toFixed(2) +
            ' (' + (isPos ? '+' : '') + pnlPct.toFixed(2) + '%)' +
            '</div>' +
            '</div>' +
            '<button class="btn-sell" data-sym="' + sym + '">Sell</button>';

        row.querySelector('.btn-sell').addEventListener('click', function() {
            openSellModal(sym);
        });
        list.appendChild(row);
    });
}

/* ==========================================================================
   RENDER — Stock List (right panel)
   ========================================================================== */

var searchQuery = '';

function renderStocks() {
    var list   = document.getElementById('stocksList');
    var stocks = getStocks();
    var q      = searchQuery.toLowerCase().trim();
    var isPEA  = activeAccount === 'PEA';

    var filtered = stocks.filter(function(s) {
        if (!q) return true;
        return s.name.toLowerCase().indexOf(q) !== -1 ||
            s.sym.toLowerCase().indexOf(q)  !== -1;
    });

    list.innerHTML = '';

    if (filtered.length === 0) {
        list.innerHTML = '<p class="holdings-empty">' + _L().t('assets.search.noresults') + ' &ldquo;' + searchQuery + '&rdquo;</p>';
        return;
    }

    filtered.forEach(function(s) {
        var isPos    = s.chg >= 0;
        var eligible = !isPEA || PEA_ELIGIBLE.indexOf(s.sym) !== -1;
        var priceUSD = fmtC(s.price);

        var row = document.createElement('div');
        row.className = 'stock-row';
        if (!eligible) row.style.opacity = '0.4';

        var buyBtn = '';
        if (eligible) {
            buyBtn = '<button class="btn-buy" data-sym="' + s.sym + '">Buy</button>';
        } else {
            buyBtn = '<span style="font-family:\'Exo 2\',sans-serif;font-size:.58rem;color:rgba(251,191,36,.6);letter-spacing:.04em;flex-shrink:0;">Non éligible PEA</span>';
        }

        row.innerHTML =
            '<div class="stock-logo">' + s.sym.slice(0,4) + '</div>' +
            '<div class="stock-info">' +
            '<div class="stock-name">' + s.name + '</div>' +
            '<div class="stock-ticker">' + s.sym + '</div>' +
            '</div>' +
            '<div class="stock-price-wrap">' +
            '<div class="stock-price">' + priceUSD + '</div>' +
            '<div class="stock-change ' + (isPos ? 'pos' : 'neg') + '">' +
            (isPos ? '▲ +' : '▼ ') + s.chg.toFixed(2) + '%' +
            '</div>' +
            '</div>' +
            buyBtn;

        if (eligible) {
            row.querySelector('.btn-buy').addEventListener('click', function() {
                openBuyModal(s.sym);
            });
        }

        list.appendChild(row);
    });
}

/* Search */
document.getElementById('searchInput').addEventListener('input', function() {
    searchQuery = this.value;
    renderStocks();
});

/* ==========================================================================
   MODAL — Add Funds
   ========================================================================== */

document.getElementById('btnAdd').addEventListener('click', function() {
    var inp = document.getElementById('addAmount');
    inp.value = '';
    inp.removeAttribute('min');  /* évite blocage navigateur */
    document.getElementById('modal-add').classList.remove('hidden');
    setTimeout(function(){ inp.focus(); }, 60);
});
document.getElementById('addCancel').addEventListener('click', function() {
    document.getElementById('modal-add').classList.add('hidden');
});
document.getElementById('addConfirm').addEventListener('click', function() {
    try {
        var raw = document.getElementById('addAmount').value.replace(',', '.').trim();
        var amt = parseFloat(raw);
        if (isNaN(amt) || amt <= 0) {
            showToast('⚠ Montant invalide — veuillez entrer un nombre positif.');
            return;
        }
        /* Stockage toujours en USD */
        var usdAmt = amt;
        try {
            if (window.MSE_CURRENCY && typeof window.MSE_CURRENCY.get === 'function' && window.MSE_CURRENCY.get() === 'EUR') {
                usdAmt = amt / 0.9526;
            }
        } catch(ce) {}
        var wallet = getWallet();
        wallet[activeAccount] = (wallet[activeAccount] || 0) + usdAmt;
        setWallet(wallet);
        document.getElementById('modal-add').classList.add('hidden');
        var toastMsg = '✓ +' + amt.toFixed(2) + ' déposé dans le compte ' + activeAccount;
        try { toastMsg = '✓ ' + fmtC(usdAmt) + ' ' + _L().t('assets.toast.added') + ' ' + activeAccount; } catch(te) {}
        showToast(toastMsg);
        try { renderAll(); } catch(re) {}
        try { renderStatCards(); } catch(re) {}
    } catch(e) {
        showToast('⚠ Erreur inattendue : ' + e.message);
    }
});

/* ==========================================================================
   MODAL — Withdraw Funds
   ========================================================================== */

document.getElementById('btnWithdraw').addEventListener('click', function() {
    var inp = document.getElementById('withdrawAmount');
    inp.value = '';
    inp.removeAttribute('min');
    document.getElementById('modal-withdraw').classList.remove('hidden');
    setTimeout(function(){ inp.focus(); }, 60);
});
document.getElementById('withdrawCancel').addEventListener('click', function() {
    document.getElementById('modal-withdraw').classList.add('hidden');
});
document.getElementById('withdrawConfirm').addEventListener('click', function() {
    try {
        var raw = document.getElementById('withdrawAmount').value.replace(',', '.').trim();
        var amt = parseFloat(raw);
        if (isNaN(amt) || amt <= 0) {
            showToast('⚠ Montant invalide — veuillez entrer un nombre positif.');
            return;
        }
        var usdAmt = amt;
        try {
            if (window.MSE_CURRENCY && typeof window.MSE_CURRENCY.get === 'function' && window.MSE_CURRENCY.get() === 'EUR') {
                usdAmt = amt / 0.9526;
            }
        } catch(ce) {}
        var wallet = getWallet();
        var bal    = wallet[activeAccount] || 0;
        if (usdAmt > bal) {
            var balLabel = bal.toFixed(2);
            try { balLabel = fmtC(bal); } catch(fe) {}
            showToast('⚠ Solde insuffisant (' + balLabel + ')');
            return;
        }
        wallet[activeAccount] = bal - usdAmt;
        setWallet(wallet);
        document.getElementById('modal-withdraw').classList.add('hidden');
        var toastMsg = '✓ ' + amt.toFixed(2) + ' retiré du compte ' + activeAccount;
        try { toastMsg = '✓ ' + fmtC(usdAmt) + ' ' + _L().t('assets.toast.withdrawn') + ' ' + activeAccount; } catch(te) {}
        showToast(toastMsg);
        try { renderAll(); } catch(re) {}
        try { renderStatCards(); } catch(re) {}
    } catch(e) {
        showToast('⚠ Erreur inattendue : ' + e.message);
    }
});

/* ==========================================================================
   MODAL — Buy Stock
   ========================================================================== */

var _buyTarget = null;
var _buyShares = 1;

/* Which account will receive the buy — defaults to activeAccount, can be overridden in modal */
var _buyAccount = 'CTO';

/* Expose for inline onclick in HTML */
window.selectBuyAccount = function(acc) {
    _buyAccount = acc;
    /* Restyle CTO button */
    var ctoBtn = document.getElementById('buyAccCTO');
    var peaBtn = document.getElementById('buyAccPEA');
    if (ctoBtn) {
        ctoBtn.style.border     = acc === 'CTO' ? '1.5px solid rgba(96,165,250,.55)' : '1.5px solid rgba(255,255,255,.12)';
        ctoBtn.style.background = acc === 'CTO' ? 'rgba(96,165,250,.15)' : 'rgba(255,255,255,.04)';
        ctoBtn.style.color      = acc === 'CTO' ? '#60a5fa' : 'rgba(255,255,255,.4)';
    }
    if (peaBtn) {
        peaBtn.style.border     = acc === 'PEA' ? '1.5px solid rgba(251,191,36,.55)' : '1.5px solid rgba(255,255,255,.12)';
        peaBtn.style.background = acc === 'PEA' ? 'rgba(251,191,36,.12)' : 'rgba(255,255,255,.04)';
        peaBtn.style.color      = acc === 'PEA' ? '#fbbf24' : 'rgba(255,255,255,.4)';
    }
    updateBuyTotal();
};

function openBuyModal(sym) {
    var stocks = getStocks();
    var s = stocks.find(function(x){ return x.sym === sym; });
    if (!s) return;
    _buyTarget  = s;
    _buyShares  = 1;
    _buyAccount = activeAccount; /* default to current tab */

    document.getElementById('buyModalTitle').textContent = _L().t('modal.buy.title') + ' — ' + s.sym;
    document.getElementById('buyModalPrice').textContent = _L().t('assets.buy.priceper') + ' ' + fmtC(s.price);
    document.getElementById('counterVal').textContent    = '1';

    /* Show account selector only when user has both CTO + PEA */
    var row = document.getElementById('buyAccountRow');
    if (row) {
        if (hasPEA) {
            row.style.display       = 'flex';
            row.style.flexDirection = 'column';
            window.selectBuyAccount(activeAccount);
        } else {
            row.style.display = 'none';
        }
    }

    updateBuyTotal();
    document.getElementById('modal-buy').classList.remove('hidden');
}

function updateBuyTotal() {
    if (!_buyTarget) return;
    var total   = _buyTarget.price * _buyShares;
    var wallet  = getWallet();
    var balance = wallet[_buyAccount] || 0;
    var canBuy  = total <= balance;

    var confirmBtn = document.getElementById('buyConfirm');
    confirmBtn.disabled      = !canBuy;
    confirmBtn.style.opacity = canBuy ? '1' : '0.4';

    var label = fmtC(total);
    if (!canBuy) label += ' — ' + _L().t('assets.balance.insufficient') + ' (' + fmtC(balance) + ')';
    document.getElementById('buyTotal').textContent = label;
}

document.getElementById('counterMinus').addEventListener('click', function() {
    if (_buyShares > 1) { _buyShares--; document.getElementById('counterVal').textContent = _buyShares; updateBuyTotal(); }
});
document.getElementById('counterPlus').addEventListener('click', function() {
    _buyShares++; document.getElementById('counterVal').textContent = _buyShares; updateBuyTotal();
});
document.getElementById('buyCancel').addEventListener('click', function() {
    document.getElementById('modal-buy').classList.add('hidden');
});
document.getElementById('buyConfirm').addEventListener('click', function() {
    if (!_buyTarget || this.disabled) return;
    var cost     = _buyTarget.price * _buyShares;
    var wallet   = getWallet();
    var balance  = wallet[_buyAccount] || 0;
    if (cost > balance) { showToast('⚠ Insufficient balance'); return; }

    /* Debit wallet */
    wallet[_buyAccount] = balance - cost;
    setWallet(wallet);

    /* Add to holdings */
    var holdings = getHoldings();
    var acctH    = holdings[_buyAccount];
    if (!acctH) { acctH = {}; holdings[_buyAccount] = acctH; }
    var sym      = _buyTarget.sym;
    if (acctH[sym]) {
        var oldShares = acctH[sym].shares;
        var oldAvg    = acctH[sym].avgPrice;
        var newShares = oldShares + _buyShares;
        acctH[sym].avgPrice = ((oldAvg * oldShares) + (_buyTarget.price * _buyShares)) / newShares;
        acctH[sym].shares   = newShares;
    } else {
        acctH[sym] = { name: _buyTarget.name, shares: _buyShares, avgPrice: _buyTarget.price };
    }
    setHoldings(holdings);

    document.getElementById('modal-buy').classList.add('hidden');
    showToast('✓ ' + _L().t('assets.toast.bought') + ' ' + _buyShares + ' × ' + sym + ' ' + _L().t('assets.toast.for') + ' ' + fmtC(cost) + ' (' + _buyAccount + ')');
    _buyTarget = null;
    renderAll();
});

/* ==========================================================================
   MODAL — Sell Stock
   ========================================================================== */

var _sellTarget  = null;
var _sellShares  = 1;
var _sellMaxShares = 1;

function openSellModal(sym) {
    var stocks   = getStocks();
    var holdings = getHoldings();
    var acctH    = holdings[activeAccount] || {};
    var h        = acctH[sym];
    if (!h || h.shares === 0) return;

    var s = stocks.find(function(x){ return x.sym === sym; });
    if (!s) return;

    _sellTarget    = s;
    _sellMaxShares = h.shares;
    _sellShares    = 1;
    document.getElementById('sellModalTitle').textContent  = _L().t('modal.sell.title') + ' — ' + sym;
    document.getElementById('sellModalPrice').textContent  = _L().t('assets.sell.price') + ' ' + fmtC(s.price) + ' · ' + _L().t('assets.sell.youown') + ' ' + h.shares + ' ' + (_L().fr() ? 'actions' : 'shares');
    document.getElementById('sellCounterVal').textContent  = '1';
    document.getElementById('sellTaxLabel').textContent    = activeAccount === 'PEA' ? _L().t('assets.sell.taxpea') : _L().t('assets.sell.taxcto');
    updateSellBreakdown(s, h);
    document.getElementById('modal-sell').classList.remove('hidden');
}

function updateSellBreakdown(s, h) {
    if (!s || !h) return;
    var gross   = s.price * _sellShares;
    var cost    = h.avgPrice * _sellShares;
    var pnl     = gross - cost;
    var taxRate = activeAccount === 'PEA' ? 0.172 : 0.30; /* PEA: prélèvements sociaux 17.2% */
    var tax     = pnl > 0 ? pnl * taxRate : 0;
    var net     = gross - tax;

    document.getElementById('sellGross').textContent   = fmtC(gross);
    document.getElementById('sellPnlLine').textContent = (pnl >= 0 ? '+' : '') + fmtC(pnl);
    document.getElementById('sellTaxLine').textContent = pnl > 0 ? '− ' + fmtC(tax) : '—';
    document.getElementById('sellNetLine').textContent = fmtC(net);
    document.getElementById('sellPnlLine').style.color = pnl >= 0 ? 'var(--gain)' : 'var(--loss)';
}

document.getElementById('sellCounterMinus').addEventListener('click', function() {
    if (_sellShares > 1) {
        _sellShares--;
        document.getElementById('sellCounterVal').textContent = _sellShares;
        var s = _sellTarget;
        var h = getHoldings()[activeAccount][s.sym];
        updateSellBreakdown(s, h);
    }
});
document.getElementById('sellCounterPlus').addEventListener('click', function() {
    if (_sellShares < _sellMaxShares) {
        _sellShares++;
        document.getElementById('sellCounterVal').textContent = _sellShares;
        var s = _sellTarget;
        var h = getHoldings()[activeAccount][s.sym];
        updateSellBreakdown(s, h);
    }
});
document.getElementById('sellCancel').addEventListener('click', function() {
    document.getElementById('modal-sell').classList.add('hidden');
});
document.getElementById('sellConfirm').addEventListener('click', function() {
    if (!_sellTarget) return;
    var holdings = getHoldings();
    var acctH    = holdings[activeAccount];
    var sym      = _sellTarget.sym;
    var h        = acctH[sym];
    if (!h) return;

    var gross   = _sellTarget.price * _sellShares;
    var pnl     = gross - h.avgPrice * _sellShares;
    var taxRate = activeAccount === 'PEA' ? 0.172 : 0.30;
    var tax     = pnl > 0 ? pnl * taxRate : 0;
    var net     = gross - tax;

    /* Update holdings */
    h.shares -= _sellShares;
    if (h.shares <= 0) delete acctH[sym];
    setHoldings(holdings);

    /* Credit wallet with net amount */
    var wallet = getWallet();
    wallet[activeAccount] = (wallet[activeAccount] || 0) + net;
    setWallet(wallet);

    document.getElementById('modal-sell').classList.add('hidden');
    showToast('✓ ' + _L().t('assets.toast.sold') + ' ' + _sellShares + ' × ' + sym + ' — ' + _L().t('assets.toast.net') + ': ' + fmtC(net));
    _sellTarget = null;
    renderAll();
});


/* ==========================================================================
   TAX SUMMARY CARD
   ========================================================================== */

function renderTaxSummary() {
    var holdings = getHoldings();
    var acctH    = holdings[activeAccount] || {};
    var stocks   = getStocks();
    var isPEA    = activeAccount === 'PEA';

    document.getElementById('taxSummaryTitle').textContent =
        _L().t(activeAccount === 'PEA' ? 'assets.tax.title.pea' : 'assets.tax.title.cto');

    var taxBadge = document.getElementById('taxBadge');
    taxBadge.className = 'tax-badge ' + (isPEA ? 'pea' : 'cto');
    taxBadge.textContent = isPEA ? 'PEA — PS 17.2%' : 'Flat Tax 30%';

    var totalGross = 0;
    var taxRate    = isPEA ? 0.172 : 0.30;
    var breakdown  = [];

    Object.keys(acctH).forEach(function(sym) {
        var h = acctH[sym];
        if (h.shares <= 0) return;
        var s = stocks.find(function(x){ return x.sym === sym; });
        if (!s) return;
        var gross = s.price * h.shares;
        var cost  = h.avgPrice * h.shares;
        var pnl   = gross - cost;
        var tax   = pnl > 0 ? pnl * taxRate : 0;
        var net   = gross - tax;
        totalGross += pnl;
        breakdown.push({ sym: sym, shares: h.shares, gross: gross, pnl: pnl, tax: tax, net: net });
    });

    var totalTax = totalGross > 0 ? totalGross * taxRate : 0;
    var totalNet = totalGross - totalTax;

    document.getElementById('taxGrossPnl').textContent = fmtC(totalGross);
    document.getElementById('taxGrossPnl').style.color = totalGross >= 0 ? 'var(--gain)' : 'var(--loss)';
    document.getElementById('taxAmount').textContent   = totalTax > 0 ? '− ' + fmtC(totalTax) : '—';
    document.getElementById('taxNetPnl').textContent   = fmtC(totalNet);
    document.getElementById('taxNetPnl').style.color   = totalNet >= 0 ? 'var(--gain)' : 'var(--loss)';

    var bdEl = document.getElementById('taxBreakdown');
    bdEl.innerHTML = '';
    breakdown.forEach(function(b) {
        var row = document.createElement('div');
        row.className = 'tax-stock-row';
        row.innerHTML =
            '<span class="tax-stock-sym">' + b.sym + '</span>' +
            '<span class="tax-stock-shares">' + b.shares + ' ' + _L().t('assets.sh') + '</span>' +
            '<div class="tax-stock-nums">' +
            '<span class="tax-stock-gross">' + fmtC(b.gross) + '</span>' +
            '<span class="tax-stock-tax">' + (b.tax > 0 ? '−' + fmtC(b.tax) : '—') + '</span>' +
            '<span class="tax-stock-net" style="color:' + (b.net >= b.gross ? 'var(--gain)' : 'var(--loss)') + '">' + fmtC(b.net) + '</span>' +
            '</div>';
        bdEl.appendChild(row);
    });
}

/* ==========================================================================
   PERFORMANCE CHART (mini sparkline based on portfolio history)
   ========================================================================== */

function renderPerfChart() {
    /* Données simulées proportionnelles au portfolio actuel */
    var holdings = getHoldings();
    var acctH    = holdings[activeAccount] || {};
    var stocks   = getStocks();

    var totalVal = 0;
    Object.keys(acctH).forEach(function(sym) {
        var h = acctH[sym];
        var s = stocks.find(function(x){ return x.sym === sym; });
        if (s) totalVal += s.price * h.shares;
    });
    totalVal += (getWallet()[activeAccount] || 0);

    /* Générer 10 points de données simulés */
    var pts   = [];
    var base  = totalVal * 0.92;
    for (var i = 0; i < 10; i++) {
        var noise = (Math.random() - 0.4) * totalVal * 0.04;
        pts.push(Math.max(0, base + noise + (i / 9) * totalVal * 0.08));
    }
    pts[pts.length - 1] = totalVal;

    var min = Math.min.apply(null, pts);
    var max = Math.max.apply(null, pts);
    var range = max - min || 1;
    var W = 320, H = 80;

    var coords = pts.map(function(v, i) {
        var x = (i / (pts.length - 1)) * W;
        var y = H - ((v - min) / range) * (H - 10) - 5;
        return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');

    var firstY = H - ((pts[0] - min) / range) * (H - 10) - 5;
    var lastY  = H - ((pts[pts.length-1] - min) / range) * (H - 10) - 5;
    var isPos  = pts[pts.length-1] >= pts[0];
    var color  = isPos ? '#4ade80' : '#f87171';

    var chartLine = document.getElementById('chartLine');
    var chartFill = document.getElementById('chartFill');
    if (!chartLine || !chartFill) return;

    chartLine.setAttribute('points', coords);
    chartLine.setAttribute('stroke', color);

    var fillPath = 'M 0,' + firstY.toFixed(1) + ' ' +
        pts.map(function(v, i) {
            var x = (i / (pts.length - 1)) * W;
            var y = H - ((v - min) / range) * (H - 10) - 5;
            return 'L ' + x.toFixed(1) + ',' + y.toFixed(1);
        }).join(' ') +
        ' L ' + W + ',' + H + ' L 0,' + H + ' Z';
    chartFill.setAttribute('d', fillPath);

    var gradTop = document.getElementById('gradTop');
    var gradBot = document.getElementById('gradBot');
    if (gradTop) gradTop.setAttribute('stop-color', isPos ? 'rgba(74,222,128,.35)' : 'rgba(248,113,113,.35)');
    if (gradBot) gradBot.setAttribute('stop-color', isPos ? 'rgba(74,222,128,0)' : 'rgba(248,113,113,0)');

    /* KPIs */
    var wallet = getWallet();
    var bal    = wallet[activeAccount] || 0;
    var startV = pts[0];
    var endV   = pts[pts.length-1];
    var pnl    = endV - startV;
    var pct    = startV > 0 ? (pnl / startV) * 100 : 0;

    var perfPnl    = document.getElementById('perfPnl');
    var perfReturn = document.getElementById('perfReturn');
    var perfHigh   = document.getElementById('perfHigh');
    var perfLow    = document.getElementById('perfLow');

    if (perfPnl)    { perfPnl.textContent = (pnl >= 0 ? '+' : '') + fmtC(pnl); perfPnl.style.color = isPos ? 'var(--gain)' : 'var(--loss)'; }
    if (perfReturn) { perfReturn.textContent = (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%'; perfReturn.style.color = isPos ? 'var(--gain)' : 'var(--loss)'; }
    if (perfHigh)   perfHigh.textContent = fmtC(max);
    if (perfLow)    perfLow.textContent  = fmtC(min);
}

/* ==========================================================================
   PERFORMANCE TABS
   ========================================================================== */

document.querySelectorAll('.perf-tab').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.perf-tab').forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        renderPerfChart();
    });
});

/* ==========================================================================
   GAINS / LOSSES STAT CARDS (bottom of perf card)
   ========================================================================== */

function renderStatCards() {
    var holdings = getHoldings();
    var acctH    = holdings[activeAccount] || {};
    var stocks   = getStocks();
    var gain = 0, loss = 0, totalCost = 0;

    Object.keys(acctH).forEach(function(sym) {
        var h = acctH[sym];
        var s = stocks.find(function(x){ return x.sym === sym; });
        if (!s) return;
        var pnl  = (s.price - h.avgPrice) * h.shares;
        var cost = h.avgPrice * h.shares;
        totalCost += cost;
        if (pnl >= 0) gain += pnl;
        else          loss += pnl;
    });

    var gainPct = totalCost > 0 ? (gain / totalCost) * 100 : 0;
    var lossPct = totalCost > 0 ? (loss / totalCost) * 100 : 0;

    var dg = document.getElementById('displayGain');
    var gl = document.getElementById('displayLoss');
    var gp = document.getElementById('displayGainPct');
    var lp = document.getElementById('displayLossPct');

    if (dg) dg.textContent = '+' + fmtC(gain);
    if (gl) gl.textContent = fmtC(loss);
    if (gp) gp.textContent = '+' + gainPct.toFixed(2) + '%';
    if (lp) lp.textContent = lossPct.toFixed(2) + '%';
}

/* ==========================================================================
   TOAST
   ========================================================================== */

var _toastTimer = null;
function showToast(msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    clearTimeout(_toastTimer);
    el.textContent = msg;
    el.classList.add('show');
    _toastTimer = setTimeout(function(){ el.classList.remove('show'); }, 3000);
}

/* ==========================================================================
   SIDEBAR NAV — hover oval
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
if (sidenav) {
    sidenav.addEventListener('mouseenter', function() { oval.classList.add('visible'); });
    sidenav.addEventListener('mouseleave', function() { oval.classList.remove('visible'); });
}
items.forEach(function(item) {
    item.addEventListener('mouseenter', function() { snapToItem(item); });
});

/* ==========================================================================
   LANGUAGE
   ========================================================================== */

function applyLang() {
    var lang = window.MSE_LANG;
    if (!lang) return;

    /* data-i18n elements */
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        el.textContent = lang.t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
        el.setAttribute('placeholder', lang.t(el.getAttribute('data-i18n-ph')));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
        document.title = lang.t(el.getAttribute('data-i18n-title'));
    });

    /* Dynamic strings that JS rebuilds */
    renderHoldings();
    renderStocks();
    renderTaxSummary();
}

if (window.MSE_LANG) {
    window.MSE_LANG.onChange(function() { applyLang(); });
}

/* ==========================================================================
   CURRENCY CHANGE LISTENER
   ========================================================================== */

if (window.MSE_CURRENCY) {
    window.MSE_CURRENCY.onChange(function() { renderAll(); renderStatCards(); });
}

/* ==========================================================================
   INITIAL RENDER
   ========================================================================== */

/* Ne rendre le contenu que si connecté */
(function() {
    var logged = false;
    try { logged = sessionStorage.getItem('mse_logged') === '1'; } catch(e) {}
    if (logged) {
        renderAll();
        renderStatCards();
    }
})();
