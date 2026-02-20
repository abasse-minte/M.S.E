/* ==========================================================================
   registration.js
   Used by: HTML/registration.html (loaded via <script src="../JAVA_SCRIPT/registration.js">)

   Controls the floating oval indicator that follows the cursor across the
   sidebar navigation icons, and handles active tab switching on click.
   ========================================================================== */


/* --------------------------------------------------------------------------
   DOM REFERENCES — queried once at startup for performance
   -------------------------------------------------------------------------- */

// The floating oval <div> animated to follow the cursor over nav icons
const oval = document.getElementById('hoverOval');

// The <nav> container — used to detect mouseenter / mouseleave on the whole bar
const sidenav = document.getElementById('sidenav');

// All individual nav link elements
const items = document.querySelectorAll('.nav-item');


/* --------------------------------------------------------------------------
   snapToItem(item)
   Moves the floating oval so its centre aligns with the centre of the
   given nav item's feather icon container (.nav-icon-wrap).

   getBoundingClientRect() gives the icon's position relative to the viewport,
   which matches the fixed-position oval's coordinate space.
   The CSS transform: translate(-50%, -50%) on .hover-oval then offsets the
   oval by half its own size so it is perfectly centred on that point.
   -------------------------------------------------------------------------- */
function snapToItem(item) {
  var wrap = item.querySelector('.nav-icon-wrap');
  var rect = wrap.getBoundingClientRect();
  oval.style.left = (rect.left + rect.width  / 2) + 'px';
  oval.style.top  = (rect.top  + rect.height / 2) + 'px';
}


/* --------------------------------------------------------------------------
   SIDENAV MOUSEENTER
   When the cursor enters the sidenav area, add "visible" to the oval,
   triggering its CSS opacity transition from 0 to 1.
   -------------------------------------------------------------------------- */
sidenav.addEventListener('mouseenter', function() {
  oval.classList.add('visible');
});


/* --------------------------------------------------------------------------
   SIDENAV MOUSELEAVE
   When the cursor exits the sidenav area, remove "visible" from the oval,
   triggering its CSS opacity transition back to 0 (fade out).
   -------------------------------------------------------------------------- */
sidenav.addEventListener('mouseleave', function() {
  oval.classList.remove('visible');
});


/* --------------------------------------------------------------------------
   NAV ITEM MOUSEENTER — per item
   Each time the cursor enters a nav item, snap the oval to that item's icon.
   The CSS transition on top/left makes the oval glide smoothly between items.
   -------------------------------------------------------------------------- */
items.forEach(function(item) {
  item.addEventListener('mouseenter', function() {
    snapToItem(item);
  });
});


/* --------------------------------------------------------------------------
   NAV ITEM CLICK — active tab switching
   1. e.preventDefault() stops the browser from following the "#" href
   2. Remove .active from all items (clears the persistent oval border)
   3. Add .active to the clicked item (shows its oval border + white label)
   -------------------------------------------------------------------------- */
items.forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    items.forEach(function(i) { i.classList.remove('active'); });
    item.classList.add('active');
  });
});
