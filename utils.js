class Toast {
  constructor() {
    this.toasts = [];
  }

  show(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideUp 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  success(message, duration = 3000) {
    this.show(`✅ ${message}`, 'success', duration);
  }

  error(message, duration = 3000) {
    this.show(`❌ ${message}`, 'error', duration);
  }

  warning(message, duration = 3000) {
    this.show(`⚠️ ${message}`, 'warning', duration);
  }
}

class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light-mode';
    this.init();
  }

  init() {
    document.body.classList.add(this.theme);
    this.createToggle();
  }

  createToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.textContent = this.theme === 'light-mode' ? '🌙 Dark' : '☀️ Light';
    toggle.addEventListener('click', () => this.toggle());
    document.body.appendChild(toggle);
  }

  toggle() {
    document.body.classList.remove(this.theme);
    this.theme = this.theme === 'light-mode' ? 'dark-mode' : 'light-mode';
    document.body.classList.add(this.theme);
    localStorage.setItem('theme', this.theme);
    const toggle = document.querySelector('.theme-toggle');
    toggle.textContent = this.theme === 'light-mode' ? '🌙 Dark' : '☀️ Light';
  }
}

class Modal {
  constructor(title, content) {
    this.title = title;
    this.content = content;
    this.element = null;
  }

  create() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <span class="modal-close">&times;</span>
      <h2>${this.title}</h2>
      <div>${this.content}</div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.querySelector('.modal-close').addEventListener('click', () => this.close());
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) this.close();
    });

    this.element = overlay;
  }

  close() {
    if(this.element) {
      this.element.classList.remove('show');
      setTimeout(() => this.element?.remove(), 300);
    }
  }
}

class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = [];
  }

  isLimited() {
    const now = Date.now();
    this.attempts = this.attempts.filter(time => now - time < this.windowMs);

    if(this.attempts.length >= this.maxAttempts) {
      return true;
    }

    this.attempts.push(now);
    return false;
  }

  getRemainingTime() {
    if(this.attempts.length === 0) return 0;
    const oldestAttempt = this.attempts[0];
    const remaining = this.windowMs - (Date.now() - oldestAttempt);
    return Math.ceil(remaining / 1000);
  }
}

class InputValidator {
  static sanitize(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  static validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static validateUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static maxLength(text, max) {
    return text.length <= max;
  }

  static minLength(text, min) {
    return text.length >= min;
  }
}

class LocalStorage {
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch(e) {
      console.error('LocalStorage error:', e);
    }
  }

  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch(e) {
      console.error('LocalStorage error:', e);
      return defaultValue;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch(e) {
      console.error('LocalStorage error:', e);
    }
  }

  static clear() {
    try {
      localStorage.clear();
    } catch(e) {
      console.error('LocalStorage error:', e);
    }
  }
}

const toast = new Toast();
const themeManager = new ThemeManager();
const rateLimiter = new RateLimiter(5, 60000);

export { Toast, ThemeManager, Modal, RateLimiter, InputValidator, LocalStorage, toast, themeManager, rateLimiter };
