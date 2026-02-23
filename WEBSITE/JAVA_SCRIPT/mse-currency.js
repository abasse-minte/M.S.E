/* ═══════════════════════════════════════════════════════════════
   mse-currency.js — M.S.E Global Currency Manager
   Shared across all pages: Market, Assets, Settings
   ═══════════════════════════════════════════════════════════════ */

'use strict';

(function(global) {

    /* ── EOD exchange rates Feb 19, 2026 ── */
    var USD_TO_EUR = 0.9526;
    var EUR_TO_USD = 1 / USD_TO_EUR; // ≈ 1.0497

    /* ── Active currency — persisted in localStorage ── */
    var _currency = 'USD';
    try {
        var saved = localStorage.getItem('mse_currency');
        if (saved === 'EUR' || saved === 'USD') _currency = saved;
    } catch(e) {}

    /* ── Callbacks registered by each page ── */
    var _listeners = [];

    /* ── API publique ── */
    var MSE = global.MSE_CURRENCY = {

        /** Current currency : 'USD' | 'EUR' */
        get: function() { return _currency; },

        /** Toggle USD ↔ EUR and notify all pages */
        toggle: function() {
            _currency = _currency === 'USD' ? 'EUR' : 'USD';
            try { localStorage.setItem('mse_currency', _currency); } catch(e) {}
            _listeners.forEach(function(fn) { try { fn(_currency); } catch(e) {} });
            MSE._updateToggles();
        },

        /** Set directly */
        set: function(c) {
            if (c !== 'USD' && c !== 'EUR') return;
            _currency = c;
            try { localStorage.setItem('mse_currency', _currency); } catch(e) {}
            _listeners.forEach(function(fn) { try { fn(_currency); } catch(e) {} });
            MSE._updateToggles();
        },

        /** Subscribe to currency changes */
        onChange: function(fn) { _listeners.push(fn); },

        /** Convert a USD value based on the active currency */
        fromUSD: function(usd) {
            return _currency === 'EUR' ? usd * USD_TO_EUR : usd;
        },

        /** Convert a EUR value based on the active currency */
        fromEUR: function(eur) {
            return _currency === 'USD' ? eur * EUR_TO_USD : eur;
        },

        /** Format an amount with the correct symbol */
        fmt: function(amount, decimals) {
            decimals = (decimals === undefined) ? 2 : decimals;
            var sym = _currency === 'EUR' ? '€' : '$';
            var locale = _currency === 'EUR' ? 'fr-FR' : 'en-US';
            return sym + Math.abs(amount).toLocaleString(locale, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
        },

        /** Format with +/- sign */
        fmtSigned: function(amount, decimals) {
            decimals = (decimals === undefined) ? 2 : decimals;
            var sym = _currency === 'EUR' ? '€' : '$';
            var locale = _currency === 'EUR' ? 'fr-FR' : 'en-US';
            var abs = Math.abs(amount).toLocaleString(locale, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
            return (amount >= 0 ? '+' : '−') + sym + abs;
        },

        /** Symbole courant */
        sym: function() { return _currency === 'EUR' ? '€' : '$'; },

        /** Label courant */
        label: function() { return _currency; },

        /** Taux de change */
        rate: function() { return _currency === 'EUR' ? USD_TO_EUR : 1; },

        /** Update the visual state of all toggles on the page */
        _updateToggles: function() {
            document.querySelectorAll('.currency-toggle').forEach(function(btn) {
                var usdSpan = btn.querySelector('.ct-usd');
                var eurSpan = btn.querySelector('.ct-eur');
                if (!usdSpan || !eurSpan) return;
                if (_currency === 'EUR') {
                    usdSpan.classList.remove('ct-active');
                    eurSpan.classList.add('ct-active');
                } else {
                    usdSpan.classList.add('ct-active');
                    eurSpan.classList.remove('ct-active');
                }
            });
        }
    };

    /* ── Wire up the currency toggle button ── */
    /* If the button is already in the HTML (market.html), just bind the click.
       Otherwise inject it dynamically (other pages). */
    document.addEventListener('DOMContentLoaded', function() {
        var existing = document.getElementById('currencyToggleBtn');
        if (existing) {
            /* Button is hardcoded in HTML — just bind the click and sync state */
            existing.addEventListener('click', function() { MSE.toggle(); });
            MSE._updateToggles();
            return;
        }

        /* Dynamic injection for pages that do not have the button in HTML */
        var headerRight = document.querySelector('.header-right');
        if (!headerRight) return;

        var btn = document.createElement('button');
        btn.className = 'currency-toggle';
        btn.id = 'currencyToggleBtn';
        btn.setAttribute('aria-label', 'Change currency');
        btn.innerHTML =
            '<span class="ct-usd' + (_currency === 'USD' ? ' ct-active' : '') + '">USD</span>' +
            '<span class="ct-sep">·</span>' +
            '<span class="ct-eur' + (_currency === 'EUR' ? ' ct-active' : '') + '">EUR</span>';
        btn.addEventListener('click', function() { MSE.toggle(); });
        var badge = headerRight.querySelector('.status-badge, #statusBadge');
        if (badge) headerRight.insertBefore(btn, badge);
        else headerRight.insertBefore(btn, headerRight.firstChild);
    });

})(window);
