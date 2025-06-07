/**
 * Creates and returns a styled button element for opening media.
 * @returns {HTMLButtonElement}
 */
function createLayout() {
    const button = document.createElement("button");
    button.textContent = "Save";
    button.className = "instasave-bt";

    // Determine the top offset based on the the type of page.
    const isStoriesPage = window.location.href.includes("https://www.instagram.com/stories");
    // const topOffset = isStoriesPage ? "9vh" : "1.5vh";
    if (isStoriesPage) return null;

    button.style.cssText = `
        position: absolute;
        top: 1.5vh;
        right: 1.5vw; /* use left instead of right */
        padding: 0.4em 0.8em;
        font-size: 0.75rem;
        font-weight: 500;
        font-family: system-ui, sans-serif;
        cursor: pointer;
        border: 1px solid #ffffff;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        color: #ffffff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        z-index: 2147483647;
        transition: all 0.25s ease, transform 0.2s ease;
    `;

    button.addEventListener("mouseenter", () => {
        button.style.background = "rgba(0, 0, 0, 0.6)";
        button.style.transform = "scale(1.05)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.background = "rgba(0, 0, 0, 0.4)";
        button.style.transform = "scale(1)";
    });

    return button;
}

/**
 * Extracts the direct URL from an <img> or <video> element.
 * For <video>, searches JSON script tags for an .mp4 URL.
 * @param {HTMLElement} media
 * @returns {string|null}
 */
function getUrl(media) {
    if (media.tagName === "IMG") return media.src || null;
    if (media.tagName === "VIDEO") {
        const scripts = document.querySelectorAll('script[type="application/json"]');
        for (const script of scripts) {
            const jsonText = script.textContent;
            const match = jsonText.match(/"url":"(https:[^"]+\.mp4.*?)"/);
            if (match) {
                return decodeURIComponent(match[1].replace(/\\\//g, "/"));
            }
        }
    }

    return null;
}

/**
 * Handles what to do with the media URL.
 * Save the media from the url link
 * @param {string|null} url
 */
function handleUrl(url) {
    if (url) {
        fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = url.split('/').pop().split('?')[0] || 'image.jpg';
            a.click();
            URL.revokeObjectURL(blobUrl);
        })
        .catch(err => console.error("Download failed:", err));
         
    } else console.warn("No media URL found.");
}

/**
 * Should skip this media element?
 * @param {HTMLElement} media
 */
function skipMedia(media) {
    if (!media) return true;
    if (media.parentElement.querySelector(".instasave-bt")) return true;
    if (media.closest('div[role="menu"], div[role="navigation"], div[role="none"], a[role="link"]')) return true;
    if (media.tagName === "IMG" && typeof media.alt === "string") {
        const alt = media.alt.trim();
        if (alt.endsWith("'s profile picture") || alt.endsWith("Change profile photo")) return true;
    }
    return false;
}

/**
 * Initializes the "Open Media" button on the first image or video found.
 * Adds the button, sets positioning, and hooks up click behavior.
 * @param {HTMLElement} container 
 */
function initMediaBtn(container) {
    if (!container) return;
    const mediaElements = container.querySelectorAll("video, img");
    for (const media of mediaElements) {
        if (skipMedia(media)) continue;

        const url = getUrl(media);
        if (!url) continue;

        const button = createLayout();
        media.parentElement.style.position = "relative";
        media.parentElement.appendChild(button);

        button.addEventListener("click", () => {
            handleUrl(url);
        });
    }
}

/**
 * Observes the DOM for added <img> or <video> elements inside <article> or <section>,
 * and attaches media download buttons to them using initMediaBtn().
 * 
 * This function also sets up a MutationObserver to handle dynamically loaded content 
 * (e.g. Instagram's infinite scroll or SPA navigation).
 * 
 * It disconnects any existing observer before starting a new one.
 * It is called initially and also re-triggered on URL changes every 500ms.
 */
let mediaObserver = null;
let currentUrl = location.href;

function observeMedia() {
    if (mediaObserver) mediaObserver.disconnect();

    mediaObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;

                if (node.matches?.("img, video")) {
                    const container = node.closest("article, section");
                    if (container) initMediaBtn(container);
                }

                const media = node.querySelectorAll?.("img, video");
                if (media) {
                    media.forEach(el => {
                        const container = el.closest("article, section");
                        if (container) initMediaBtn(container);
                    });
                }
            }
        }
    });

    mediaObserver.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll("article, section").forEach(initMediaBtn);
}

setInterval(() => {
    if (location.href !== currentUrl) {
        currentUrl = location.href;
        observeMedia();
    }
}, 500);

observeMedia();