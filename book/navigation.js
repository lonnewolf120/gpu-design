/**
 * Tiny-GPU Book Navigation Enhancement
 * Adds keyboard navigation, progress tracking, and quick chapter access
 */

(function() {
    'use strict';

    // Chapter data for navigation
    const CHAPTERS = [
        { id: 1, title: 'Big Picture - What is a GPU?', file: 'chapter-01.html' },
        { id: 2, title: 'GPU vs CPU - Architecture Deep Dive', file: 'chapter-02.html' },
        { id: 3, title: 'Parallel Execution Models', file: 'chapter-03.html' },
        { id: 4, title: 'Core GPU Components', file: 'chapter-04.html' },
        { id: 5, title: 'Instruction Set Architecture (ISA)', file: 'chapter-05.html' },
        { id: 6, title: 'Memory Systems Overview', file: 'chapter-06.html' },
        { id: 7, title: 'Memory Controllers', file: 'chapter-07.html' },
        { id: 8, title: 'Thread Management', file: 'chapter-08.html' },
        { id: 9, title: 'Hardware Scheduling', file: 'chapter-09.html' },
        { id: 10, title: 'Synchronization Primitives', file: 'chapter-10.html' },
        { id: 11, title: 'RTL Fundamentals', file: 'chapter-11.html' },
        { id: 12, title: 'Simulation & Verification', file: 'chapter-12.html' },
        { id: 13, title: 'Clock/Reset & Timing', file: 'chapter-13.html' },
        { id: 14, title: 'Debug Infrastructure', file: 'chapter-14.html' },
        { id: 15, title: 'tiny-gpu Overview', file: 'chapter-15.html' },
        { id: 16, title: 'Scheduler Implementation', file: 'chapter-16.html' },
        { id: 17, title: 'Kernel Walkthrough', file: 'chapter-17.html' },
        { id: 18, title: 'Putting It Together', file: 'chapter-18.html' },
        { id: 19, title: 'Modern GPU Landscape', file: 'chapter-19.html' },
        { id: 20, title: 'NVIDIA vs AMD Architecture', file: 'chapter-20.html' },
        { id: 21, title: 'Tensor Cores & AI', file: 'chapter-21.html' },
        { id: 22, title: 'Future Trends', file: 'chapter-22.html' },
        { id: 23, title: 'FPGA Prototyping', file: 'chapter-23.html' },
        { id: 24, title: 'ASIC Design Flow', file: 'chapter-24.html' },
        { id: 25, title: 'Tapeout & Manufacturing', file: 'chapter-25.html' }
    ];

    const APPENDICES = [
        { id: 'A', title: 'Glossary of Terms', file: 'appendix-a-glossary.html' },
        { id: 'B', title: 'Instruction Set Reference', file: 'appendix-b-instruction-reference.html' },
        { id: 'C', title: 'RTL Module Reference', file: 'appendix-c-module-reference.html' },
        { id: 'D', title: 'Simulation & Testing Guide', file: 'appendix-d-simulation-guide.html' }
    ];

    // Get current chapter from URL
    function getCurrentChapter() {
        const path = window.location.pathname;
        const match = path.match(/chapter-(\d+)\.html/);
        if (match) {
            return parseInt(match[1]);
        }
        return null;
    }

    // Get previous/next chapter URLs
    function getPrevNextUrls() {
        const current = getCurrentChapter();
        if (!current) return { prev: null, next: null };

        const isInChapters = window.location.pathname.includes('/chapters/');
        const prefix = isInChapters ? '' : 'chapters/';

        return {
            prev: current > 1 ? `${prefix}chapter-${String(current - 1).padStart(2, '0')}.html` : null,
            next: current < 25 ? `${prefix}chapter-${String(current + 1).padStart(2, '0')}.html` : null
        };
    }

    // Keyboard navigation
    function setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            // Ignore if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            const { prev, next } = getPrevNextUrls();

            // Left arrow or 'p' for previous
            if ((e.key === 'ArrowLeft' || e.key === 'p') && prev) {
                window.location.href = prev;
            }
            // Right arrow or 'n' for next
            else if ((e.key === 'ArrowRight' || e.key === 'n') && next) {
                window.location.href = next;
            }
            // 't' for table of contents
            else if (e.key === 't') {
                const tocPath = window.location.pathname.includes('/chapters/') ? 
                    '../table-of-contents.html' : 'table-of-contents.html';
                window.location.href = tocPath;
            }
            // '?' to show keyboard shortcuts
            else if (e.key === '?') {
                showShortcutsModal();
            }
        });
    }

    // Show keyboard shortcuts modal
    function showShortcutsModal() {
        // Remove existing modal if any
        const existing = document.getElementById('shortcuts-modal');
        if (existing) {
            existing.remove();
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'shortcuts-modal';
        modal.innerHTML = `
            <div class="shortcuts-backdrop"></div>
            <div class="shortcuts-content">
                <h3>⌨️ Keyboard Shortcuts</h3>
                <table>
                    <tr><td><kbd>←</kbd> or <kbd>P</kbd></td><td>Previous chapter</td></tr>
                    <tr><td><kbd>→</kbd> or <kbd>N</kbd></td><td>Next chapter</td></tr>
                    <tr><td><kbd>T</kbd></td><td>Table of contents</td></tr>
                    <tr><td><kbd>?</kbd></td><td>Toggle this help</td></tr>
                    <tr><td><kbd>Esc</kbd></td><td>Close modal</td></tr>
                </table>
                <button class="close-btn">Close</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Close handlers
        modal.querySelector('.shortcuts-backdrop').addEventListener('click', () => modal.remove());
        modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // Add reading progress bar
    function setupProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        document.body.prepend(progressBar);

        const fill = progressBar.querySelector('.progress-fill');

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            fill.style.width = `${progress}%`;
        }

        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }

    // Quick chapter selector dropdown
    function setupChapterSelector() {
        // Only add if we're on a chapter page
        if (!getCurrentChapter()) return;

        const nav = document.querySelector('.chapter-nav');
        if (!nav) return;

        const selector = document.createElement('select');
        selector.id = 'chapter-selector';
        selector.innerHTML = '<option value="">Jump to chapter...</option>';

        CHAPTERS.forEach(ch => {
            const option = document.createElement('option');
            option.value = ch.file;
            option.textContent = `Chapter ${ch.id}: ${ch.title}`;
            if (ch.id === getCurrentChapter()) {
                option.selected = true;
            }
            selector.appendChild(option);
        });

        // Add appendices
        selector.innerHTML += '<option disabled>──────────</option>';
        APPENDICES.forEach(app => {
            const option = document.createElement('option');
            option.value = `../appendices/${app.file}`;
            option.textContent = `Appendix ${app.id}: ${app.title}`;
            selector.appendChild(option);
        });

        selector.addEventListener('change', (e) => {
            if (e.target.value) {
                window.location.href = e.target.value;
            }
        });

        nav.appendChild(selector);
    }

    // Track reading progress in localStorage
    function trackReadingProgress() {
        const current = getCurrentChapter();
        if (!current) return;

        const key = 'tiny-gpu-progress';
        let progress = JSON.parse(localStorage.getItem(key) || '{}');

        // Mark current chapter as visited
        progress[current] = {
            visited: true,
            lastVisit: new Date().toISOString()
        };

        // Update scroll position on scroll end
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );
                progress[current].scrollPercent = scrollPercent;
                localStorage.setItem(key, JSON.stringify(progress));
            }, 200);
        });

        localStorage.setItem(key, JSON.stringify(progress));

        // Restore scroll position if returning to chapter
        if (progress[current]?.scrollPercent) {
            // Only restore if navigating back (not fresh page load)
            if (performance.navigation.type === 2 || document.referrer.includes('chapter-')) {
                const targetScroll = (progress[current].scrollPercent / 100) * 
                    (document.documentElement.scrollHeight - window.innerHeight);
                setTimeout(() => window.scrollTo(0, targetScroll), 100);
            }
        }
    }

    // Add CSS for navigation enhancements
    function addNavigationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Reading progress bar */
            #reading-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(0, 0, 0, 0.1);
                z-index: 9999;
            }
            #reading-progress .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #4c6fff, #667eea);
                width: 0;
                transition: width 0.1s ease-out;
            }

            /* Chapter selector dropdown */
            #chapter-selector {
                padding: 0.5rem;
                border: 1px solid var(--border, #ddd);
                border-radius: 6px;
                background: var(--panel, white);
                color: var(--text, #333);
                font-size: 0.9rem;
                cursor: pointer;
                margin-left: auto;
            }
            #chapter-selector:focus {
                outline: 2px solid var(--accent, #4c6fff);
            }

            /* Shortcuts modal */
            #shortcuts-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .shortcuts-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
            }
            .shortcuts-content {
                position: relative;
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-width: 400px;
                z-index: 1;
            }
            .shortcuts-content h3 {
                margin-top: 0;
            }
            .shortcuts-content table {
                width: 100%;
                margin: 1rem 0;
            }
            .shortcuts-content td {
                padding: 0.5rem;
            }
            .shortcuts-content kbd {
                background: #f0f0f0;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                border: 1px solid #ddd;
                font-family: monospace;
            }
            .shortcuts-content .close-btn {
                width: 100%;
                padding: 0.75rem;
                background: var(--accent, #4c6fff);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: bold;
            }
            .shortcuts-content .close-btn:hover {
                opacity: 0.9;
            }

            /* Keyboard hint in nav */
            .keyboard-hint {
                font-size: 0.75rem;
                color: var(--muted, #888);
                margin-left: 1rem;
            }

            @media (max-width: 768px) {
                #chapter-selector {
                    display: none;
                }
                .keyboard-hint {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add keyboard hint to navigation
    function addKeyboardHint() {
        const nav = document.querySelector('.chapter-nav');
        if (!nav) return;

        const hint = document.createElement('span');
        hint.className = 'keyboard-hint';
        hint.textContent = 'Press ? for shortcuts';
        nav.appendChild(hint);
    }

    // Initialize all enhancements
    function init() {
        addNavigationStyles();
        setupKeyboardNav();
        setupProgressBar();
        setupChapterSelector();
        addKeyboardHint();
        trackReadingProgress();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
