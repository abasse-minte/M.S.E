/* ═══════════════════════════════════════════════════════════════
   mse-lang.js — M.S.E Global Language Manager
   Shared across all pages: Market, Assets, Registration, Settings
   ═══════════════════════════════════════════════════════════════ */

'use strict';

(function(global) {

    /* ── All UI strings, keyed by language ── */
    var STRINGS = {

        /* ──────────────────── COMMON ──────────────────── */
        'status.on':  { EN: 'ON',  FR: 'ON'  },
        'status.off': { EN: 'OFF', FR: 'OFF' },

        /* ──────────────────── MARKET ──────────────────── */
        'market.title':              { EN: 'Market — M.S.E',            FR: 'Marché — M.S.E' },
        'market.appname':            { EN: 'Market — M.S.E',            FR: 'Marché — M.S.E' },
        'market.freshness':          { EN: 'EOD data · Feb 19, 2026 · 16:00 EST', FR: 'Données de clôture · 19 fév. 2026 · 16h00 EST' },
        'market.equities.title':     { EN: 'Global Equities',           FR: 'Actions Mondiales' },
        'market.equities.badge':     { EN: '30 stocks',                 FR: '30 actions' },
        'market.equities.add':       { EN: 'Add',                       FR: 'Ajouter' },
        'market.equities.remove':    { EN: 'Remove',                    FR: 'Supprimer' },
        'market.equities.eod':       { EN: 'EOD · Feb 19, 2026',        FR: 'Clôture · 19 fév. 2026' },
        'market.crypto.title':       { EN: 'Crypto',                    FR: 'Crypto' },
        'market.crypto.badge':       { EN: '10 assets',                 FR: '10 actifs' },
        'market.crypto.live':        { EN: '24h · Live',                FR: '24h · Temps réel' },
        'market.forex.title':        { EN: 'Forex',                     FR: 'Forex' },
        'market.forex.badge':        { EN: 'Major pairs',               FR: 'Paires majeures' },
        'market.commodities.title':  { EN: 'Commodities',               FR: 'Matières Premières' },
        'market.commodities.badge':  { EN: '10 assets',                 FR: '10 actifs' },
        'market.bonds.title':        { EN: 'Gov. Bonds',                FR: 'Obligations d\'État' },
        'market.bonds.badge':        { EN: 'Yields',                    FR: 'Rendements' },
        'market.th.company':         { EN: 'Company',                   FR: 'Société' },
        'market.th.price':           { EN: 'Price (USD)',                FR: 'Prix (USD)' },
        'market.th.change':          { EN: 'Change',                    FR: 'Variation' },
        'market.th.day':             { EN: '% Day',                     FR: '% Jour' },
        'market.th.52w':             { EN: '52W Range',                 FR: 'Plage 52 sem.' },
        'market.th.cap':             { EN: 'Mkt Cap',                   FR: 'Capitalisation' },
        'market.th.pair':            { EN: 'Pair',                      FR: 'Paire' },
        'market.th.rate':            { EN: 'Rate',                      FR: 'Taux' },
        'market.th.asset':           { EN: 'Asset',                     FR: 'Actif' },
        'market.th.unit':            { EN: 'Unit',                      FR: 'Unité' },
        'market.th.bond':            { EN: 'Bond',                      FR: 'Obligation' },
        'market.th.yield':           { EN: 'Yield',                     FR: 'Rendement' },
        'market.th.bps':             { EN: 'Change (bps)',              FR: 'Variation (pbs)' },
        'market.th.bprice':          { EN: 'Price',                     FR: 'Prix' },
        'market.nav.market':         { EN: 'Market',                    FR: 'Marché' },
        'market.nav.assets':         { EN: 'Assets',                    FR: 'Actifs' },
        'market.nav.account':        { EN: 'Account',                   FR: 'Compte' },
        'market.nav.settings':       { EN: 'Settings',                  FR: 'Paramètres' },

        /* ── Add Company Modal ── */
        'modal.add.title':           { EN: 'Add a Company',             FR: 'Ajouter une Société' },
        'modal.add.name':            { EN: 'Company Name *',            FR: 'Nom de la société *' },
        'modal.add.sym':             { EN: 'Symbol / Ticker *',         FR: 'Symbole / Ticker *' },
        'modal.add.region':          { EN: 'Region',                    FR: 'Région' },
        'modal.add.price':           { EN: 'Price (USD) *',             FR: 'Prix (USD) *' },
        'modal.add.daychg':          { EN: 'Day Change ($)',            FR: 'Variation jour ($)' },
        'modal.add.pctchg':          { EN: 'Change (%)',                FR: 'Variation (%)' },
        'modal.add.low52':           { EN: '52W Low',                   FR: 'Plus bas 52 sem.' },
        'modal.add.high52':          { EN: '52W High',                  FR: 'Plus haut 52 sem.' },
        'modal.add.cap':             { EN: 'Market Cap',                FR: 'Capitalisation' },
        'modal.add.shares':          { EN: 'Shares Outstanding (M)',    FR: 'Actions en circulation (M)' },
        'modal.add.elig':            { EN: 'Eligibility',               FR: 'Éligibilité' },
        'modal.add.error':           { EN: 'Please fill in required fields (*).', FR: 'Veuillez remplir les champs obligatoires (*).' },
        'modal.add.duplicate':       { EN: 'This ticker already exists in the list.', FR: 'Ce ticker existe déjà dans la liste.' },
        'modal.add.cancel':          { EN: 'Cancel',                    FR: 'Annuler' },
        'modal.add.confirm':         { EN: 'Add',                       FR: 'Ajouter' },
        'modal.add.toast':           { EN: '✓ {name} added to the list.', FR: '✓ {name} ajouté à la liste.' },

        /* ── Remove Company Modal ── */
        'modal.rm.title':            { EN: 'Remove a Company',          FR: 'Supprimer une Société' },
        'modal.rm.hint':             { EN: 'Only custom companies can be removed.', FR: 'Seules les sociétés personnalisées peuvent être supprimées.' },
        'modal.rm.close':            { EN: 'Close',                     FR: 'Fermer' },
        'modal.rm.btn':              { EN: 'Remove',                    FR: 'Supprimer' },
        'modal.rm.empty':            { EN: 'No custom companies to remove.', FR: 'Aucune société personnalisée à supprimer.' },
        'modal.rm.toast':            { EN: 'Company removed.',          FR: 'Société supprimée.' },

        /* ──────────────────── ASSETS ──────────────────── */
        'assets.lock.title':         { EN: 'Restricted Access',         FR: 'Accès restreint' },
        'assets.lock.sub':           { EN: 'Sign in to access your portfolio and buy stocks.', FR: 'Connecte-toi pour accéder à ton portefeuille et acheter des actions.' },
        'assets.lock.btn':           { EN: 'Sign In',                   FR: 'Se connecter' },
        'assets.title':              { EN: 'Assets — M.S.E',            FR: 'Actifs — M.S.E' },
        'assets.appname':            { EN: 'Assets — M.S.E',            FR: 'Actifs — M.S.E' },
        'assets.portfolio':          { EN: 'Portfolio',                  FR: 'Portefeuille' },
        'assets.cto.sub':            { EN: 'Securities Account',        FR: 'Compte-Titres' },
        'assets.pea.sub':            { EN: 'Equity Savings Plan',       FR: 'Plan Épargne Actions' },
        'assets.balance.label':      { EN: 'Total Balance',             FR: 'Solde Total' },
        'assets.balance.sub':        { EN: 'Updated just now',          FR: 'Mis à jour à l\'instant' },
        'assets.perf.pnl':           { EN: 'P&L',                       FR: 'P&L' },
        'assets.perf.return':        { EN: 'Return',                    FR: 'Rendement' },
        'assets.perf.high':          { EN: 'High',                      FR: 'Haut' },
        'assets.perf.low':           { EN: 'Low',                       FR: 'Bas' },
        'assets.gains':              { EN: 'Gains',                     FR: 'Gains' },
        'assets.losses':             { EN: 'Losses',                    FR: 'Pertes' },
        'assets.addfunds':           { EN: 'Add Funds',                 FR: 'Ajouter des fonds' },
        'assets.withdraw':           { EN: 'Withdraw',                  FR: 'Retirer' },
        'assets.tax.title.cto':      { EN: 'Performance & Taxation — CTO', FR: 'Performance & Fiscalité — CTO' },
        'assets.tax.title.pea':      { EN: 'Performance & Benefits — PEA', FR: 'Performance & Avantages — PEA' },
        'assets.tax.gross':          { EN: 'Gross Capital Gain',        FR: 'Plus-value brute' },
        'assets.tax.estimated':      { EN: 'Estimated Tax',             FR: 'Impôt estimé' },
        'assets.tax.net':            { EN: 'Net Gain',                  FR: 'Gain net' },
        'assets.tax.disclaimer':     { EN: '* Indicative estimate. Consult a tax advisor.', FR: '* Estimation indicative. Consultez un conseiller fiscal.' },
        'assets.holdings.title':     { EN: 'My Holdings',               FR: 'Mes Positions' },
        'assets.holdings.empty':     { EN: 'No stocks yet. Browse the market →', FR: 'Aucune action pour l\'instant. Explorez le marché →' },
        'assets.market.title':       { EN: 'Market',                    FR: 'Marché' },
        'assets.stocks.title':       { EN: 'Available Stocks',          FR: 'Actions Disponibles' },
        'assets.search.placeholder': { EN: 'Search company or ticker…', FR: 'Rechercher une société ou un ticker…' },
        'assets.add.stock':          { EN: 'Add',                       FR: 'Ajouter' },
        'assets.remove.stock':       { EN: 'Remove',                    FR: 'Supprimer' },
        'assets.pea.ineligible':     { EN: 'Not PEA-eligible',          FR: 'Non éligible PEA' },
        'assets.sh':                 { EN: 'sh.',                       FR: 'act.' },
        'assets.buy.priceper':       { EN: 'Price per share:',          FR: 'Prix par action :' },
        'assets.sell.price':         { EN: 'Price:',                    FR: 'Prix :' },
        'assets.sell.youown':        { EN: 'You own:',                  FR: 'Vous avez :' },
        'assets.sell.taxcto':        { EN: 'Flat Tax (30%)',            FR: 'Flat Tax (30%)' },
        'assets.sell.taxpea':        { EN: 'PEA Exemption (5% PS)',     FR: 'Exonération PEA (5% PS)' },
        'assets.balance.insufficient': { EN: 'Insufficient balance',    FR: 'Solde insuffisant' },
        'assets.search.noresults':   { EN: 'No results for',            FR: 'Aucun résultat pour' },
        'assets.toast.added':        { EN: 'added to',                  FR: 'ajouté sur' },
        'assets.toast.withdrawn':    { EN: 'withdrawn from',            FR: 'retiré de' },
        'assets.toast.invalidamt':   { EN: 'Invalid amount',            FR: 'Montant invalide' },
        'assets.toast.insufbal':     { EN: 'Insufficient balance',      FR: 'Solde insuffisant' },
        'assets.toast.bought':       { EN: 'Bought',                    FR: 'Achat de' },
        'assets.toast.for':          { EN: 'for',                       FR: 'pour' },
        'assets.toast.sold':         { EN: 'Sold',                      FR: 'Vendu' },
        'assets.toast.net':          { EN: 'Net',                       FR: 'Net' },

        /* ── Assets modals ── */
        'modal.addfunds.title':      { EN: 'Add Funds',                 FR: 'Ajouter des fonds' },
        'modal.addfunds.sub':        { EN: 'Enter the amount you want to deposit into your wallet.', FR: 'Entrez le montant que vous souhaitez déposer dans votre portefeuille.' },
        'modal.addfunds.label':      { EN: 'Amount',                    FR: 'Montant' },
        'modal.addfunds.cancel':     { EN: 'Cancel',                    FR: 'Annuler' },
        'modal.addfunds.confirm':    { EN: 'Deposit',                   FR: 'Déposer' },

        'modal.withdraw.title':      { EN: 'Withdraw Funds',            FR: 'Retirer des fonds' },
        'modal.withdraw.sub':        { EN: 'Enter the amount you want to withdraw from your wallet.', FR: 'Entrez le montant que vous souhaitez retirer de votre portefeuille.' },
        'modal.withdraw.label':      { EN: 'Amount',                    FR: 'Montant' },
        'modal.withdraw.cancel':     { EN: 'Cancel',                    FR: 'Annuler' },
        'modal.withdraw.confirm':    { EN: 'Withdraw',                  FR: 'Retirer' },

        'modal.buy.title':           { EN: 'Buy Stock',                 FR: 'Acheter une action' },
        'modal.buy.shares':          { EN: 'Number of shares',          FR: 'Nombre d\'actions' },
        'modal.buy.total':           { EN: 'Total:',                    FR: 'Total :' },
        'modal.buy.cancel':          { EN: 'Cancel',                    FR: 'Annuler' },
        'modal.buy.confirm':         { EN: 'Buy',                       FR: 'Acheter' },

        'modal.sell.title':          { EN: 'Sell Stock',                FR: 'Vendre une action' },
        'modal.sell.shares':         { EN: 'Number of shares',          FR: 'Nombre d\'actions' },
        'modal.sell.gross':          { EN: 'Gross Revenue',             FR: 'Revenu brut' },
        'modal.sell.gain':           { EN: 'Capital Gain',              FR: 'Plus-value' },
        'modal.sell.net':            { EN: 'Net Received',              FR: 'Net encaissé' },
        'modal.sell.cancel':         { EN: 'Cancel',                    FR: 'Annuler' },
        'modal.sell.confirm':        { EN: 'Sell',                      FR: 'Vendre' },

        /* ──────────────────── REGISTRATION ──────────────────── */
        'reg.title':                 { EN: 'Account — M.S.E',           FR: 'Compte — M.S.E' },
        'reg.appname':               { EN: 'Account — M.S.E',           FR: 'Compte — M.S.E' },
        'reg.welcome':               { EN: 'Welcome to Muïo Stock Exchange', FR: 'Bienvenue sur Muïo Stock Exchange' },
        'reg.sub':                   { EN: 'Create an account or sign in to continue.', FR: 'Créez un compte ou connectez-vous pour continuer.' },
        'reg.signup':                { EN: 'Sign Up',                   FR: 'S\'inscrire' },
        'reg.signin':                { EN: 'Sign In',                   FR: 'Se connecter' },
        'reg.signin.noaccount':      { EN: 'No account?',               FR: 'Pas de compte ?' },
        'reg.signin.tossignup':      { EN: 'Sign Up',                   FR: 'S\'inscrire' },
        'reg.signin.error':          { EN: 'Invalid email or password.', FR: 'Email ou mot de passe invalide.' },
        'reg.step.username':         { EN: 'Username',                  FR: 'Nom d\'utilisateur' },
        'reg.step.birthday':         { EN: 'Birthday',                  FR: 'Date de naissance' },
        'reg.step.continent':        { EN: 'Continent',                 FR: 'Continent' },
        'reg.step.country':          { EN: 'Country',                   FR: 'Pays' },
        'reg.step.photo':            { EN: 'Profile Photo',             FR: 'Photo de profil' },
        'reg.step.photo.drop':       { EN: 'Drop your photo here',      FR: 'Déposez votre photo ici' },
        'reg.step.photo.sub':        { EN: 'or click to browse',        FR: 'ou cliquez pour parcourir' },
        'reg.step.photo.drag':       { EN: 'Drag to reposition',        FR: 'Glisser pour repositionner' },
        'reg.step.email':            { EN: 'Email',                     FR: 'Email' },
        'reg.step.email.error':      { EN: 'Please enter a valid email address.', FR: 'Veuillez entrer une adresse email valide.' },
        'reg.step.password':         { EN: 'Password',                  FR: 'Mot de passe' },
        'reg.step.password.ph':      { EN: 'Choose a password',         FR: 'Choisir un mot de passe' },
        'reg.rule.lower':            { EN: 'One lowercase letter',      FR: 'Une lettre minuscule' },
        'reg.rule.upper':            { EN: 'One uppercase letter',      FR: 'Une lettre majuscule' },
        'reg.rule.digit':            { EN: 'One number',                FR: 'Un chiffre' },
        'reg.rule.special':          { EN: 'One special character',     FR: 'Un caractère spécial' },
        'reg.recap.complete':        { EN: 'Registration complete',     FR: 'Inscription terminée' },
        'reg.recap.review':          { EN: 'Review your information',   FR: 'Vérifiez vos informations' },
        'reg.recap.photo':           { EN: 'Photo',                     FR: 'Photo' },
        'reg.recap.username':        { EN: 'Username',                  FR: 'Nom d\'utilisateur' },
        'reg.recap.birthday':        { EN: 'Birthday',                  FR: 'Date de naissance' },
        'reg.recap.continent':       { EN: 'Continent',                 FR: 'Continent' },
        'reg.recap.country':         { EN: 'Country',                   FR: 'Pays' },
        'reg.recap.email':           { EN: 'Email',                     FR: 'Email' },
        'reg.recap.password':        { EN: 'Password',                  FR: 'Mot de passe' },
        'reg.recap.confirm':         { EN: 'Confirm',                   FR: 'Confirmer' },
        'reg.profile.details':       { EN: 'Account Details',           FR: 'Détails du Compte' },
        'reg.profile.birthday':      { EN: 'Birthday',                  FR: 'Date de naissance' },
        'reg.profile.continent':     { EN: 'Continent',                 FR: 'Continent' },
        'reg.profile.country':       { EN: 'Country',                   FR: 'Pays' },
        'reg.profile.email':         { EN: 'Email',                     FR: 'Email' },
        'reg.profile.password':      { EN: 'Password',                  FR: 'Mot de passe' },
        'reg.logout':                { EN: 'Log Out',                   FR: 'Se déconnecter' },
        'reg.delete':                { EN: 'Delete Account',            FR: 'Supprimer le compte' },
        'reg.changepwd.title':       { EN: 'Change Password',           FR: 'Changer le mot de passe' },
        'reg.changepwd.ph':          { EN: 'New password',              FR: 'Nouveau mot de passe' },
        'reg.changepwd.cancel':      { EN: 'Cancel',                    FR: 'Annuler' },
        'reg.changepwd.save':        { EN: 'Save',                      FR: 'Enregistrer' },
        'reg.delete.title':          { EN: 'Delete Account?',           FR: 'Supprimer le compte ?' },
        'reg.delete.desc':           { EN: 'This action is irreversible. Type <strong>delete</strong> to confirm.', FR: 'Cette action est irréversible. Tapez <strong>delete</strong> pour confirmer.' },
        'reg.delete.ph':             { EN: 'delete',                    FR: 'delete' },
        'reg.delete.cancel':         { EN: 'Cancel',                    FR: 'Annuler' },
        'reg.delete.confirm':        { EN: 'Delete',                    FR: 'Supprimer' },

        /* ──────────────────── SETTINGS ──────────────────── */
        'settings.title':            { EN: 'Settings — M.S.E',         FR: 'Paramètres — M.S.E' },
        'settings.appname':          { EN: 'Settings — M.S.E',         FR: 'Paramètres — M.S.E' },
        'settings.notsignedin':      { EN: 'Not signed in',             FR: 'Non connecté' },
        'settings.tap.signin':       { EN: 'Tap to sign in or create an account', FR: 'Appuyez pour vous connecter ou créer un compte' },
        'settings.section.security': { EN: 'Security',                  FR: 'Sécurité' },
        'settings.changepwd.title':  { EN: 'Change Password',           FR: 'Changer le mot de passe' },
        'settings.changepwd.sub':    { EN: 'Update your current password', FR: 'Mettre à jour votre mot de passe actuel' },
        'settings.2fa.title':        { EN: 'Two-Factor Authentication', FR: 'Authentification à deux facteurs' },
        'settings.2fa.disabled':     { EN: 'Disabled',                  FR: 'Désactivée' },
        'settings.2fa.enabled':      { EN: 'Enabled',                   FR: 'Activée' },
        'settings.logout.title':     { EN: 'Log Out All Devices',       FR: 'Déconnecter tous les appareils' },
        'settings.logout.sub':       { EN: 'Revoke all active sessions', FR: 'Révoquer toutes les sessions actives' },
        'settings.section.notif':    { EN: 'Notifications',             FR: 'Notifications' },
        'settings.tx.title':         { EN: 'Transaction Alerts',        FR: 'Alertes de transaction' },
        'settings.tx.sub':           { EN: 'Notify on every transaction', FR: 'Notifier à chaque transaction' },
        'settings.balance.title':    { EN: 'Low Balance Warning',       FR: 'Alerte solde faible' },
        'settings.balance.sub':      { EN: 'Alert when balance is low', FR: 'Alerter quand le solde est faible' },
        'settings.reports.title':    { EN: 'Periodic Reports',          FR: 'Rapports périodiques' },
        'settings.reports.sub':      { EN: 'Weekly summary emails',     FR: 'Emails de synthèse hebdomadaires' },
        'settings.section.prefs':    { EN: 'Preferences',               FR: 'Préférences' },
        'settings.lang.title':       { EN: 'Language',                  FR: 'Langue' },
        'settings.lang.sub':         { EN: 'Display language',          FR: 'Langue d\'affichage' },
        'settings.format.title':     { EN: 'Amount Format',             FR: 'Format des montants' },
        'settings.format.sub':       { EN: 'How numbers are displayed', FR: 'Comment les nombres sont affichés' },
        'settings.section.about':    { EN: 'About & Support',           FR: 'À propos & Assistance' },
        'settings.version.title':    { EN: 'App Version',               FR: 'Version de l\'application' },
        'settings.version.sub':      { EN: 'M.S.E Platform',            FR: 'Plateforme M.S.E' },
        'settings.support.title':    { EN: 'Help & Support',            FR: 'Aide & Assistance' },
        'settings.support.sub':      { EN: 'Contact our support team',  FR: 'Contacter notre équipe de support' },
        'settings.legal.title':      { EN: 'Legal Notices',             FR: 'Mentions légales' },
        'settings.legal.sub':        { EN: 'Terms, Privacy Policy',     FR: 'CGU, Politique de confidentialité' },

        /* ── Settings modals ── */
        'modal.changepwd.title':     { EN: 'Change Password',           FR: 'Changer le mot de passe' },
        'modal.changepwd.ph':        { EN: 'New password',              FR: 'Nouveau mot de passe' },
        'modal.changepwd.cancel':    { EN: 'Cancel',                    FR: 'Annuler' },
        'modal.changepwd.save':      { EN: 'Save',                      FR: 'Enregistrer' },
        'modal.2fa.title':           { EN: 'Two-Factor Auth',           FR: 'Auth. deux facteurs' },
        'modal.2fa.desc':            { EN: 'Scan the QR code with your authenticator app, then enter the 6-digit code.', FR: 'Scannez le QR code avec votre application d\'authentification, puis entrez le code à 6 chiffres.' },
        'modal.2fa.secret':          { EN: 'Or enter this key manually in your authenticator app', FR: 'Ou entrez cette clé manuellement dans votre application d\'authentification' },
        'modal.2fa.error':           { EN: 'Incorrect code. Please try again.', FR: 'Code incorrect. Veuillez réessayer.' },
        'modal.2fa.cancel':          { EN: 'Cancel',                    FR: 'Annuler' },
        'modal.2fa.verify':          { EN: 'Verify',                    FR: 'Vérifier' },
        'modal.logout.title':        { EN: 'Log Out All Devices?',      FR: 'Déconnecter tous les appareils ?' },
        'modal.logout.desc':         { EN: 'All active sessions will be terminated immediately. You will need to sign in again on each device.', FR: 'Toutes les sessions actives seront immédiatement terminées. Vous devrez vous reconnecter sur chaque appareil.' },
        'modal.logout.cancel':       { EN: 'Cancel',                    FR: 'Annuler' },
        'modal.logout.confirm':      { EN: 'Log Out All',               FR: 'Tout déconnecter' },
        'modal.lang.title':          { EN: 'Language',                  FR: 'Langue' },
        'modal.lang.cancel':         { EN: 'Cancel',                    FR: 'Annuler' },
        'modal.lang.save':           { EN: 'Save',                      FR: 'Enregistrer' },
        'modal.format.title':        { EN: 'Amount Format',             FR: 'Format des montants' },
        'modal.format.cancel':       { EN: 'Cancel',                    FR: 'Annuler' },
        'modal.format.save':         { EN: 'Save',                      FR: 'Enregistrer' },
        'modal.legal.title':         { EN: 'Legal Notices',             FR: 'Mentions légales' },
        'modal.legal.tos.h':         { EN: 'Terms of Service',          FR: 'Conditions d\'utilisation' },
        'modal.legal.tos.body':      { EN: 'By using M.S.E you agree to our terms of service and acceptable use policy.', FR: 'En utilisant M.S.E vous acceptez nos conditions d\'utilisation et notre politique d\'usage acceptable.' },
        'modal.legal.pp.h':          { EN: 'Privacy Policy',            FR: 'Politique de confidentialité' },
        'modal.legal.pp.body':       { EN: 'We protect your personal data in accordance with GDPR and applicable regulations.', FR: 'Nous protégeons vos données personnelles conformément au RGPD et aux réglementations applicables.' },
        'modal.legal.lic.h':         { EN: 'Licenses',                  FR: 'Licences' },
        'modal.legal.lic.body':      { EN: '© 2025 M.S.E. All rights reserved.', FR: '© 2025 M.S.E. Tous droits réservés.' },
        'modal.legal.close':         { EN: 'Close',                     FR: 'Fermer' },

        /* ── Settings toasts ── */
        'toast.tx.on':               { EN: 'Transaction alerts enabled',  FR: 'Alertes de transaction activées' },
        'toast.tx.off':              { EN: 'Transaction alerts disabled',  FR: 'Alertes de transaction désactivées' },
        'toast.balance.on':          { EN: 'Low balance warning enabled',  FR: 'Alerte solde faible activée' },
        'toast.balance.off':         { EN: 'Low balance warning disabled', FR: 'Alerte solde faible désactivée' },
        'toast.reports.on':          { EN: 'Periodic reports enabled',     FR: 'Rapports périodiques activés' },
        'toast.reports.off':         { EN: 'Periodic reports disabled',    FR: 'Rapports périodiques désactivés' },
        'toast.2fa.off':             { EN: 'Two-factor authentication disabled', FR: 'Authentification à deux facteurs désactivée' },
        'toast.2fa.on':              { EN: '2FA enabled successfully',     FR: '2FA activée avec succès' },
        'toast.pwd.saved':           { EN: 'Password updated successfully', FR: 'Mot de passe mis à jour avec succès' },
        'toast.sessions':            { EN: 'All sessions terminated',      FR: 'Toutes les sessions terminées' },
        'toast.lang':                { EN: 'Language set to {lang}',       FR: 'Langue définie sur {lang}' },
        'toast.format':              { EN: 'Amount format updated',        FR: 'Format des montants mis à jour' },
        'toast.support':             { EN: 'Opening support… (demo)',      FR: 'Ouverture du support… (démo)' },

        /* ── Settings guest banner ── */
        'settings.guest.banner':     { EN: ' Security settings require an account. ', FR: ' Les paramètres de sécurité nécessitent un compte. ' },
        'settings.guest.link':       { EN: 'Sign in →',                 FR: 'Se connecter →' },
        'settings.guest.2fa.tip':    { EN: 'Sign in to manage 2FA',     FR: 'Connectez-vous pour gérer la 2FA' },
    };

    /* ── Active language — persisted in localStorage ── */
    var _lang = 'EN';
    try {
        var saved = localStorage.getItem('mse_lang');
        if (saved === 'EN' || saved === 'FR') _lang = saved;
    } catch(e) {}

    /* ── Callbacks registered by each page ── */
    var _listeners = [];

    /* ── Public API ── */
    var MSE_LANG = global.MSE_LANG = {

        /** Current language : 'EN' | 'FR' */
        get: function() { return _lang; },

        /** Toggle EN ↔ FR and notify all pages */
        toggle: function() {
            _lang = _lang === 'EN' ? 'FR' : 'EN';
            try { localStorage.setItem('mse_lang', _lang); } catch(e) {}
            _listeners.forEach(function(fn) { try { fn(_lang); } catch(e) {} });
            MSE_LANG._updateToggles();
        },

        /** Set directly */
        set: function(l) {
            if (l !== 'EN' && l !== 'FR') return;
            _lang = l;
            try { localStorage.setItem('mse_lang', _lang); } catch(e) {}
            _listeners.forEach(function(fn) { try { fn(_lang); } catch(e) {} });
            MSE_LANG._updateToggles();
        },

        /** Subscribe to language changes */
        onChange: function(fn) { _listeners.push(fn); },

        /**
         * Get a translated string by key.
         * Supports {placeholder} substitution: MSE_LANG.t('toast.lang', { lang: 'Français' })
         */
        t: function(key, vars) {
            var entry = STRINGS[key];
            if (!entry) return key;
            var str = entry[_lang] || entry['EN'] || key;
            if (vars) {
                Object.keys(vars).forEach(function(k) {
                    str = str.replace('{' + k + '}', vars[k]);
                });
            }
            return str;
        },

        /** Shorthand */
        fr: function() { return _lang === 'FR'; },

        /** Update the visual state of all lang toggles on the page */
        _updateToggles: function() {
            document.querySelectorAll('.lang-toggle').forEach(function(btn) {
                var enSpan = btn.querySelector('.lt-en');
                var frSpan = btn.querySelector('.lt-fr');
                if (!enSpan || !frSpan) return;
                if (_lang === 'FR') {
                    enSpan.classList.remove('lt-active');
                    frSpan.classList.add('lt-active');
                } else {
                    enSpan.classList.add('lt-active');
                    frSpan.classList.remove('lt-active');
                }
            });
        }
    };

    /* ── Wire up the lang toggle button ── */
    /* If the button is already in the HTML (market.html), just bind the click.
       Otherwise inject it dynamically (other pages). */
    document.addEventListener('DOMContentLoaded', function() {
        var existing = document.getElementById('langToggleBtn');
        if (existing) {
            /* Button is hardcoded in HTML — just bind the click and sync state */
            existing.addEventListener('click', function() { MSE_LANG.toggle(); });
            MSE_LANG._updateToggles();
            return;
        }

        /* Dynamic injection for pages that do not have the button in HTML */
        var headerRight = document.querySelector('.header-right');
        if (!headerRight) return;

        var btn = document.createElement('button');
        btn.className = 'lang-toggle';
        btn.id = 'langToggleBtn';
        btn.setAttribute('aria-label', 'Change language');
        btn.innerHTML =
            '<span class="lt-en' + (_lang === 'EN' ? ' lt-active' : '') + '">EN</span>' +
            '<span class="lt-sep">·</span>' +
            '<span class="lt-fr' + (_lang === 'FR' ? ' lt-active' : '') + '">FR</span>';
        btn.addEventListener('click', function() { MSE_LANG.toggle(); });

        var currencyBtn = headerRight.querySelector('.currency-toggle');
        var badge = headerRight.querySelector('.status-badge, #statusBadge');
        if (currencyBtn) headerRight.insertBefore(btn, currencyBtn);
        else if (badge) headerRight.insertBefore(btn, badge);
        else headerRight.insertBefore(btn, headerRight.firstChild);
    });

})(window);
