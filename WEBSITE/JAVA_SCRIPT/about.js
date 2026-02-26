'use strict';

/* ── Sidenav cursor oval ── */
(function() {
    var oval = document.getElementById('hoverOval');
    var navItems = document.querySelectorAll('.nav-icon-wrap');
    navItems.forEach(function(wrap) {
        var parent = wrap.closest('.nav-item');
        parent.addEventListener('mouseenter', function() {
            var r = wrap.getBoundingClientRect();
            oval.style.left = (r.left + r.width/2) + 'px';
            oval.style.top  = (r.top  + r.height/2) + 'px';
            oval.classList.add('visible');
        });
        parent.addEventListener('mouseleave', function() {
            oval.classList.remove('visible');
        });
    });
})();

/* ── Scroll reveal ── */
(function() {
    var els = document.querySelectorAll('.reveal');
    var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach(function(el) { io.observe(el); });
})();

/* ── Language ── */
(function() {
    /* i18n strings for this page */
    var STRINGS = {
        'about.appname':          { EN: 'About — M.S.E',    FR: 'À propos — M.S.E' },
        'about.hero.tagline':     { EN: 'About me',         FR: 'À propos' },
        'about.hero.age':         { EN: '21 y.o · Paris, France', FR: '21 ans · Paris, France' },
        'about.hero.intro':       { EN: "<strong>Frankly... I love life!</strong><br>Developer, cyclist, baller, cinephile, foodie, all at once. Here's my story.",
                                    FR: "<strong>Franchement... j'aime la vie !</strong><br>Développeur, cycliste, basketteur, cinéphile, foodie, tout à la fois. Voici mon histoire." },
        'about.hero.strong':      { EN: "Frankly... I love life!", FR: "Franchement... j'aime la vie !" },
        'about.stat.bball':       { EN: 'Years bball',  FR: 'Ans de basket' },
        'about.stat.bike':        { EN: 'Trips by bike', FR: 'Trajets à vélo' },
        'about.stat.code':        { EN: 'Lines of code', FR: 'Lignes de code' },
        'about.scroll':           { EN: 'scroll', FR: 'défiler' },
        'about.chapters.label':   { EN: '— My chapters', FR: '— Mes chapitres' },
        'about.chapter1.tag':     { EN: '2013 – 2022',   FR: '2013 – 2022' },
        'about.chapter1.title':   { EN: "Nine years<br><em>on the court</em>",  FR: "Neuf ans<br><em>sur le parquet</em>" },
        'about.chapter1.body':    { EN: "I played basketball for <strong>nine years</strong>, nine years of running, shooting, sweating, improving... so many memories. I stopped because my studies took up too much time, but that <span class='highlight'>work ethic</span> stayed with me. Sport taught me to never give up.",
                                    FR: "J'ai joué au basketball pendant <strong>neuf ans</strong>, neuf ans à courir, shooter, suer, progresser... Autant de souvenirs gravés. J'ai arrêté parce que mes études prenaient trop de place, mais cette <span class='highlight'>mentalité de travail</span>, elle est restée. Le sport m'a appris à ne jamais lâcher." },
        'chip.teamwork':          { EN: 'Team spirit', FR: 'Esprit d\'équipe' },
        'chip.discipline':        { EN: 'Discipline',  FR: 'Discipline' },
        'chip.neverquit':         { EN: 'Never quit',  FR: 'Never quit' },
        'about.chapter2.tag':     { EN: 'New passion', FR: 'Nouvelle passion' },
        'about.chapter2.title':   { EN: "<span class='highlight'>90%</span> of my trips<br><em>by bike</em>", FR: "<span class='highlight'>90%</span> de mes trajets<br><em>à vélo</em>" },
        'about.chapter2.body':    { EN: "Now it's all about cycling! It's become my new passion, and I do <strong>90% of my trips by bike</strong>. Yes, 90%! Whether it's to go to class, go out, or just get some fresh air, I cycle. It clears my head, motivates me, and makes me feel good.",
                                    FR: "Maintenant c'est le vélo ! C'est devenu ma nouvelle passion, et je fais <strong>90 % de mes déplacements à vélo</strong>. Oui, 90 % ! Que ce soit pour aller en cours, sortir, ou juste prendre l'air, je pédale. Ça me libère l'esprit, ça me motive et ça me fait du bien." },
        'chip.freedom':           { EN: 'Freedom', FR: 'Liberté' },
        'chip.paris':             { EN: 'Paris streets', FR: 'Rues parisiennes' },
        'chip.eco':               { EN: 'Eco lifestyle', FR: 'Éco-lifestyle' },
        'about.chapter3n.tag':    { EN: 'Nature & adventure', FR: 'Nature & aventure' },
        'about.chapter3n.title':  { EN: "Mountains, forests<br><em>&amp; fresh air</em>", FR: "Montagne, forêt<br><em>&amp; grand air</em>" },
        'about.chapter3n.body':   { EN: "I love <strong>nature</strong>, forest walks, mountain trails, those moments where you switch everything off and just walk. It's a way of <span class='highlight'>recharging</span>, finding calm away from screens. Nature soothes me as much as code electrifies me.",
                                    FR: "J'aime la <strong>nature</strong>, les balades en forêt, les sentiers de montagne, ces moments où tu coupes tout et tu marches juste pour marcher. C'est une façon de <span class='highlight'>recharger les batteries</span>, de retrouver le calme loin des écrans. La nature m'apaise autant que le code m'électrise." },
        'chip.fresh.air':         { EN: 'Fresh air', FR: 'Grand air' },
        'about.chapter3.tag':     { EN: 'I love to eat', FR: 'J\'adore manger' },
        'about.chapter3.title':   { EN: "Tempura, shawarma<br><em>&amp; bubble tea</em>", FR: "Tempura, shawarma<br><em>&amp; bubble tea</em>" },
        'about.chapter3.body':    { EN: "I <strong>REALLY</strong> love to eat. Seriously. Tempura, shrimp, salmon, shawarma... ahem... incredible. And bubble tea? Don't even get me started. It's my <span class='highlight'>little slice of heaven</span>.",
                                    FR: "J'adore <strong>vraiment</strong> manger. Sérieusement. Tempura, crevettes, saumon, shawarma... incroyable. Et le bubble tea ? N'en parlons même pas. C'est mon <span class='highlight'>petit paradis</span>." },
        'about.chapter4.tag':     { EN: 'Multiple worlds', FR: 'Mondes multiples' },
        'about.chapter4.title':   { EN: "Cinema, fashion<br><em>F1 &amp; technology</em>", FR: "Cinéma, mode<br><em>F1 &amp; technologie</em>" },
        'about.chapter4.body':    { EN: "I'm passionate about <strong>film, fashion, Formula 1, and computers</strong>. Yes, all of them at once! Different worlds, but each with its own energy, style, and intensity. It's those contrasts that define me.",
                                    FR: "Je suis passionné de <strong>cinéma, mode, Formule 1 et informatique</strong>. Oui, tout ça en même temps ! Des univers différents, mais chacun avec sa propre énergie, son style et son intensité. Ce sont ces contrastes qui me définissent." },
        'about.chapter5.tag':     { EN: 'Since middle school', FR: 'Depuis le collège' },
        'about.chapter5.title':   { EN: "I've been coding<br><em>since middle school</em>", FR: "Je code<br><em>depuis le collège</em>" },
        'about.chapter5.body':    { EN: "I've been coding since middle school, back when I took classes at the <strong>Kids Coding Club</strong>. And then... it clicked. I fell in love with development. What I particularly love, what I love most, is <span class='highlight'>designing algorithms</span>. Imagining, structuring, optimizing... I can spend all night coding until a function works. I don't give up until it works perfectly!",
                                    FR: "J'ai commencé à coder au collège, au <strong>Kids Coding Club</strong>. Et puis... le déclic. Je suis tombé amoureux du développement. Ce que j'aime tout particulièrement, ce que j'aime le plus, c'est <span class='highlight'>concevoir des algorithmes</span>. Imaginer, structurer, optimiser... Je peux passer la nuit entière à coder jusqu'à ce qu'une fonction marche. Je ne lâche pas tant que ce n'est pas parfait." },
        'about.goal.label':       { EN: '— My goal', FR: '— Mon objectif' },
        'about.goal.eyebrow':     { EN: 'The ambition', FR: "L'ambition" },
        'about.goal.text':        { EN: "Become a Java<br>software engineer.", FR: "Devenir ingénieur<br>logiciel Java." },
        'about.goal.sub':         { EN: 'Clear. Precise. Ambitious.', FR: 'Clair. Précis. Ambitieux.' },
        'about.yt.label':         { EN: '— My YouTube channel', FR: '— Ma chaîne YouTube' },
        'about.yt.title':         { EN: "MU<span>Ï</span>O", FR: "MU<span>Ï</span>O" },
        'about.yt.sub':           { EN: "I film memories, atmospheres, simple yet powerful instants.", FR: "Je filme des souvenirs, des atmosphères, des instants simples mais puissants." },
        'about.travel.eyebrow':   { EN: 'And then?', FR: 'Et après ?' },
        'about.travel.text':      { EN: "Travel, discover the world,<br>see something different, have even more experiences.", FR: "Voyager, découvrir le monde,<br>voir autre chose, vivre encore plus d'expériences." },
        'about.travel.sub':       { EN: "In the meantime, every moment counts. Check MUÏO 🎥", FR: "En attendant, chaque instant compte. Check MUÏO 🎥" },
        'about.nav.market':       { EN: 'Market',   FR: 'Marché' },
        'about.nav.assets':       { EN: 'Assets',   FR: 'Actifs' },
        'about.nav.account':      { EN: 'Account',  FR: 'Compte' },
        'about.nav.settings':     { EN: 'Settings', FR: 'Paramètres' },
        'about.nav.about':        { EN: 'About',    FR: 'À propos' },
    };

    var _lang = 'EN';
    try {
        var s = localStorage.getItem('mse_lang');
        if (s === 'EN' || s === 'FR') _lang = s;
    } catch(e) {}

    function applyLang() {
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            if (STRINGS[key] && STRINGS[key][_lang] !== undefined) {
                el.innerHTML = STRINGS[key][_lang];
            }
        });
        var btn = document.getElementById('langToggleBtn');
        if (btn) {
            btn.querySelector('.lt-en').classList.toggle('lt-active', _lang === 'EN');
            btn.querySelector('.lt-fr').classList.toggle('lt-active', _lang === 'FR');
        }
        document.documentElement.lang = _lang.toLowerCase();
    }

    document.getElementById('langToggleBtn').addEventListener('click', function() {
        _lang = _lang === 'EN' ? 'FR' : 'EN';
        try { localStorage.setItem('mse_lang', _lang); } catch(e) {}
        applyLang();
    });

    applyLang();

    /* ── Sync with MSE_LANG if available ── */
    if (window.MSE_LANG) {
        window.MSE_LANG.onChange(function(l) { _lang = l; applyLang(); });
    }
})();
