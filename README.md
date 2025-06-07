# InstaSave

<p align="center">
  <img src="images/icon128.png" alt="InstaSave Icon" width="96" height="96">
</p>

A simple browser extension to add a "Download" button to Instagram posts and stories, allowing you to quickly download the media.

## 🚀 Setup

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
   - Select the `/InstaSave` folder (the root of this project).

4. **(Optional) Pin the Extension**
   - Click the puzzle piece icon in Chrome and pin "InstaSave" for easy access.

## 📸 Usage

1. **Go to Instagram**
   - Visit any Instagram post or story in your browser.

2. **Find the "Save" Button**
   - On posts: A "Save" button will appear on the image or video.
   - On stories: The button will appear at the top of the story media.

3. **Download or Open Media**
   - Click the "Save" button to open the media in a new tab. You can then right-click and save the image or video.
   - If the button doesn't work immediately, try refreshing the page.
   - Alternatively, you can copy the media link and open it in a separate tab to download.

## 💡 Notes

- Everything should work fine out of the box.
- If you encounter any issues like downloading the wrong vid or button not appearing, simply refresh the page.
- As mentioned above, you can also copy the media link and paste it into a new tab (as an alternative method) to verify the button is working correctly and download the media directly.

## 🛠️ Development

- All main logic is in `/scripts/content.js`.
- You can customize the button style or behavior in that file.

---

**Enjoy saving your favorite Instagram media!** 🎉
