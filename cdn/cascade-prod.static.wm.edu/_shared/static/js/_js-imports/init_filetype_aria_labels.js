const { runTests, addCheck } = await import('./_run_tests_var.js');

/* ============================================================
   Add Aria Labels for File Links
   Scans all <a> tags and adds aria-labels for file types
   Skips links that already include (pdf), (doc), etc.
   ============================================================ */

export function init_filetype_aria_labels() {

    // Expanded file type list
    const fileTypes = [
        // Documents
        "pdf", "doc", "docx", "txt", "rtf", "odt",
        // Spreadsheets
        "xls", "xlsx", "csv", "ods",
        // Presentations
        "ppt", "pptx", "odp",
        // Images
        "jpg", "jpeg", "png", "gif", "bmp", "tiff", "svg", "webp",
        // Archives
        "zip", "rar", "7z", "tar", "gz",
        // Audio
        "mp3", "wav", "ogg", "m4a", "flac",
        // Video
        "mp4", "mov", "avi", "wmv", "mkv"
    ];

    document.querySelectorAll('a[href]').forEach(link => {
        const text = link.textContent.trim();
        const href = link.getAttribute('href');
        if (!href) return;

        // Detect file extension from href
        const match = href.match(/\.([a-z0-9]+)(\?|#|$)/i);
        if (!match) return;

        const ext = match[1].toLowerCase();
        if (!fileTypes.includes(ext)) return;

        // Skip if link text already contains (ext), case-insensitive
        if (new RegExp(`\\(${ext}\\)`, 'i').test(text)) return;

        // Escape double quotes in text
        const escapedText = text.replace(/"/g, "&quot;");

        // Add aria-label
        link.setAttribute('aria-label', `${escapedText} (${ext})`);
    });
}