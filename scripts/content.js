/**
 * Creates and returns a styled button element for opening media.
 * @returns {HTMLButtonElement}
 */
function createLayout() {
    const button = document.createElement("button");
    button.textContent = "📋 Open Media";
    button.className = "custom-copy-btn";
    button.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 6px 12px;
        font-size: 0.9rem;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: 6px;
        background-color: #f5f5f5;
        color: #333;
        z-index: 9999;
    `;
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
    const media = container.querySelector("video, img");
    if (!media || media.parentElement.querySelector(".custom-copy-btn")) return;

    const url = getUrl(media);
    if (!url) return;

    const button = createLayout();
    const parent = media.parentElement;
    parent.style.position = "relative";
    parent.appendChild(button);

    button.addEventListener("click", () => {
        handleUrl(url);
    });
}

initMediaBtn(document.querySelector("article"));