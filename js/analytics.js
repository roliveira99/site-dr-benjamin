/**
 * Carrega Cloudflare Web Analytics e Microsoft Clarity.
 * Lê os IDs de window.SITE_DR_BENJAMIN.analytics (js/config.js).
 */
(function () {
  if (window.__SITE_ANALYTICS_LOADED__) return;

  const cfg = window.SITE_DR_BENJAMIN || {};
  const analytics = cfg.analytics || {};
  const cfToken = String(analytics.cloudflareToken || "").trim();
  const clarityId = String(analytics.clarityProjectId || "").trim();

  if (!cfToken && !clarityId) return;

  window.__SITE_ANALYTICS_LOADED__ = true;

  if (cfToken) {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.setAttribute("data-cf-beacon", JSON.stringify({ token: cfToken }));
    document.head.appendChild(script);
  }

  if (clarityId) {
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);
  }
})();
