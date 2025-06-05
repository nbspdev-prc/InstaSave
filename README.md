# InstagramPostDownload

A simple browser extension to add a "Download" button to Instagram posts and stories, allowing you to quickly open or download media.

## Setup

1. **Clone or Download the Repository**
   ```sh
   git clone https://github.com/yourusername/InstagramPostDownload.git
   ```
   Or download and extract the ZIP.

2. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/` in your browser.
   - Enable **Developer mode** (toggle in the top right).

3. **Load Unpacked Extension**
   - Click **Load unpacked**.
   - Select the `/ReadingTime` folder (the root of this project).

4. **(Optional) Pin the Extension**
   - Click the puzzle piece icon in Chrome and pin "InstagramPostDownload" for easy access.

## Usage

1. **Go to Instagram**
   - Visit any Instagram post or story in your browser.

2. **Find the "Download" Button**
   - On posts: A "Download" button will appear on the image or video.
   - On stories: The button will appear at the top of the story media.

3. **Download or Open Media**
   - Click the "Download" button to open the media in a new tab. You can then right-click and save the image or video.

## Notes

- The extension works on both posts and stories.
- For stories, the button is positioned lower to avoid UI overlap.
- If you encounter issues, try refreshing the page.

## Development

- All main logic is in `/scripts/content.js`.
- You can customize the button style or behavior in that file.

---

**Enjoy saving your favorite Instagram media!**



WIP:
Video still mess up. open article still mess up. Download more formally.
