// UTM / click-id attribution capture.
//
// Captures marketing attribution params from the landing URL and persists them
// in localStorage so they survive client-side navigation and page reloads, then
// makes them available to every form submission (forwarded to Zapier + stored
// with the lead). Landing page + referrer are first-touch (set once); UTM and
// click-id params are last-touch (overwritten only when a new visit carries
// them, so plain navigation never wipes an existing value).

const STORAGE_KEY = 'fhco_attribution';

// Marketing params we care about: standard UTMs plus ad-platform click ids.
const UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',   // Google Ads
    'fbclid',  // Facebook/Meta Ads
    'msclkid', // Microsoft/Bing Ads
];

function readStored() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
        return {};
    }
}

/**
 * Read attribution params from the current URL and merge them into storage.
 * Safe to call on every page load; no-op during SSR.
 */
export function captureUtmParams() {
    if (typeof window === 'undefined') return;

    try {
        const params = new URLSearchParams(window.location.search);
        const stored = readStored();
        let changed = false;

        // First-touch landing context — only recorded once per visitor.
        if (!stored.landing_page) {
            stored.landing_page = window.location.href;
            stored.referrer = document.referrer || '';
            stored.first_touch_at = new Date().toISOString();
            changed = true;
        }

        // Last-touch UTM/click ids — overwrite only when the URL carries them.
        if (UTM_KEYS.some((key) => params.has(key))) {
            UTM_KEYS.forEach((key) => {
                const value = params.get(key);
                if (value) stored[key] = value;
            });
            changed = true;
        }

        if (changed) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        }
    } catch (e) {
        // localStorage may be unavailable (private mode, etc.) — fail silently.
    }
}

/**
 * Return the stored attribution params for inclusion in a form submission.
 * Returns an empty object during SSR or when nothing has been captured.
 */
export function getUtmParams() {
    if (typeof window === 'undefined') return {};
    return readStored();
}
