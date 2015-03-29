<?php

    $cssVersion = '1.0.0';
    $cssCookieExpirationDate = ((86400 * 7) * 90);

    $cachedCssVersion = $_COOKIE['gal_cached_css_version'];

    $criticalCssIsNeeded = $cssVersion !== $cachedCssVersion;

    if ($criticalCssIsNeeded) {
        setcookie('gal_cached_css_version', $cssVersion, $cssCookieExpirationDate, '/');
    }

?>