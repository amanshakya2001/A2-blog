const verifyEmailRegex = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
    
const logout = () => {
    fetch('/api/auth/logout', {
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = '/';
        }
    })
    .catch(error => {
        console.error('Logout failed:', error);
    });
}

// Toasts and Confirm helpers
function createToast(type = 'success', message = '') {
    const container = document.getElementById('toastContainer');
    if (!container) return null;
    const el = document.createElement('div');
    el.className = `toast-item ${type}`;
    el.innerHTML = `<span>${message}</span><button class="toast-close" aria-label="Close">✕</button>`;
    container.appendChild(el);
    const close = () => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-6px)';
        setTimeout(() => el.remove(), 150);
    };
    el.querySelector('.toast-close').addEventListener('click', close);
    setTimeout(close, 3000);
    return el;
}

function showToast(type, message) {
    return createToast(type, message);
}

function confirmDialog(message, onConfirm) {
    try {
        const modalEl = document.getElementById('confirmModal');
        const msgEl = document.getElementById('confirmMessage');
        const okBtn = document.getElementById('confirmOkBtn');
        if (!modalEl || !msgEl || !okBtn || !bootstrap) return false;
        msgEl.textContent = message;
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        const handler = () => {
            okBtn.removeEventListener('click', handler);
            modal.hide();
            if (typeof onConfirm === 'function') onConfirm();
        };
        okBtn.addEventListener('click', handler);
        modal.show();
        return true;
    } catch (e) {
        return false;
    }
}

const postComment = (blogId) => {
    const content = document.querySelector('#comment').value;
    fetch('/api/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, blogId }),
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = '/blog/' + blogId;
        }
    })
    .catch(error => {
        console.error('Comment failed:', error);
    });
}

const deleteComment = (commentId,blogId) => {
    const doDelete = () => {
        fetch('/api/comment/' + commentId, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/blog/' + blogId;
            } else {
                showToast('error', data.error || 'Failed to delete comment');
            }
        })
        .catch(error => {
            console.error('Comment failed:', error);
            showToast('error', 'Network error');
        });
    };

    if (window.confirmDialog) {
        confirmDialog('Delete this comment?', doDelete);
    } else {
        if (confirm('Are you sure you want to delete this comment?')) doDelete();
    }
}

// Theme toggle with persistence
document.addEventListener('DOMContentLoaded', () => {
    try {
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        const savedTheme = localStorage.getItem('theme');
        const body = document.body;

        const setTheme = (mode) => {
            if (mode === 'light') {
                body.classList.add('light');
            } else {
                body.classList.remove('light');
            }
        };

        setTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            const syncIcon = () => {
                const icon = toggle.querySelector('i');
                if (!icon) return;
                icon.className = body.classList.contains('light') ? 'bi bi-sun' : 'bi bi-moon-stars';
            };

            syncIcon();

            toggle.addEventListener('click', () => {
                const isLight = body.classList.toggle('light');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
                syncIcon();
            });
        }
    } catch (err) {
        console.warn('Theme toggle init failed', err);
    }

    // Equalize homepage card heights
    const equalizeHomeCards = () => {
        const cards = document.querySelectorAll('#home .card');
        if (!cards.length) return;
        // reset first
        cards.forEach(c => c.style.minHeight = '');
        let max = 0;
        cards.forEach(c => { max = Math.max(max, c.offsetHeight); });
        if (max > 0) cards.forEach(c => c.style.minHeight = max + 'px');
    };

    // Run after images load
    if (document.readyState === 'complete') {
        equalizeHomeCards();
    } else {
        window.addEventListener('load', equalizeHomeCards);
    }

    // Debounced resize
    let rh;
    window.addEventListener('resize', () => {
        clearTimeout(rh);
        rh = setTimeout(equalizeHomeCards, 150);
    });
});
