/**
 * Creates and returns a styled button element for opening media.
 * @returns {HTMLButtonElement}
 */
function createLayout() {
    const button = document.createElement("button");
    button.textContent = "📂 Open";
    button.className = "custom-copy-btn";
    button.style.cssText = `
        position: absolute;
        top: 1.5vh;
        right: 1.5vw;
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
        z-index: 9999;
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
 * Currently: opens it in a new browser tab.
 * @param {string|null} url
 */

function handleUrl(url) {
    if (url) {
        window.open(url, "_blank");
    } else console.warn("No media URL found.");
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
        if (media.tagName === "IMG" &&
            typeof media.alt === "string" &&
            (
                media.alt.trim() === "" ||
                media.alt.trim().endsWith("'s profile picture")
            )
        ) continue;

        if (media.parentElement.querySelector(".custom-copy-btn")) continue;

        const url = getUrl(media);
        if (!url) continue;

        const button = createLayout(container);
        const parent = media.parentElement;
        parent.style.position = "relative";
        parent.appendChild(button);

        button.addEventListener("click", () => {
            handleUrl(url);
        });
    }
}


const mediaObserver = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType !== 1) continue;

            if (node.matches?.("img, video")) {
                const container = node.closest("article");
                if (container) initMediaBtn(container);
            }

            const media = node.querySelectorAll?.("img, video");
            if (media) {
                media.forEach(el => {
                    const container = el.closest("article");
                    if (container) initMediaBtn(container);
                });
            }
        }
    }
});

mediaObserver.observe(document.body, { childList: true, subtree: true });

// Initial scan
document.querySelectorAll("article, section").forEach(initMediaBtn);