/**
 * Runs before paint (inline in <head>): sets the flags the layer view and the reduced-motion path read.
 *   ?layers=1 start with the layer view on   ?layers=0 off   ?reduced=1 force the reduced-motion path
 *   ?tilt=DEG total tilt in degrees   ?z=PX plate lift.
 * Content never depends on this; it only sets html classes. Storage and query access are guarded.
 */
export const LAYER_BOOT_SCRIPT = `(function () {
  var h = document.documentElement;
  try {
    var q = new URLSearchParams(location.search), on = null, stored = null;
    h.classList.add('js');
    if (q.get('reduced') || matchMedia('(prefers-reduced-motion: reduce)').matches) h.classList.add('rm');
    try { stored = sessionStorage.getItem('jcd-layers'); } catch (e) {}
    var optin = false;
    try { optin = sessionStorage.getItem('jcd-rmtilt') === '1'; } catch (e) {}
    if (optin) h.classList.add('rmtilt');
    if (q.get('layers') === '1') on = true; else if (q.get('layers') === '0') on = false; else if (stored === '1') { on = true; h.classList.add('boot'); }
    if (on) { h.classList.add('layers'); if (!h.classList.contains('rm') || optin) h.classList.add('t3d'); }
    if (q.get('tilt')) h.style.setProperty('--k', String(parseFloat(q.get('tilt')) / 3.2));
    if (q.get('z')) h.style.setProperty('--tz', parseFloat(q.get('z')) + 'px');
  } catch (e) {}
})();`;
