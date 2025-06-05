function createButton() {
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

function getMediaUrl(media) {
    if (media.tagName === "IMG") {
        return media.src;
    } else if (media.tagName === "VIDEO") {
        const scripts = document.querySelectorAll('script[type="application/json"]');
        for (const script of scripts) {
            try {
                const json = JSON.parse(script.textContent);
                const jsonStr = JSON.stringify(json);
                if (jsonStr.includes("video_versions")) {
                    const match = jsonStr.match(/"url":"(https:[^"]+\.mp4.*?)"/);
                    if (match) {
                        return decodeURIComponent(match[1].replace(/\\\//g, "/"));
                    }
                }
            } catch (e) {
                console.error("Failed to parse JSON script", e);
            }
        }
    }
    return null;
}

function handleMediaOutput(url) {
    if (url) window.open(url, "_blank");
    else console.warn("No media URL found.");
}


function addOpenMediaButton() {
    const media = document.querySelector("video, img");
    if (!media || media.parentElement.querySelector(".custom-copy-btn")) return;

    const button = createButton();
    const parent = media.parentElement;
    parent.style.position = "relative";
    parent.appendChild(button);

    button.addEventListener("click", () => {
        const url = getMediaUrl(media);
        handleMediaOutput(url);
    });
}

addOpenMediaButton();