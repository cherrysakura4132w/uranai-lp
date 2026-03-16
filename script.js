/* ===========================
   Luna 占い鑑定 LP - スクリプト
   =========================== */

'use strict';

/* ===== スクロール時フェードイン ===== */
const initFadeIn = () => {
  const targets = document.querySelectorAll(
    '.reason-card, .voice-card, .menu-card, .empathy-list li, .faq-item, .profile-inner, .cta-inner'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
};

/* ===== FAQ アコーディオン ===== */
const initFaq = () => {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // 全て閉じる
      questions.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.style.maxHeight = '0';
      });

      // クリックしたものを開く（既に開いていたら閉じたまま）
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
};

/* ===== ヘッダースクロール制御 ===== */
const initHeader = () => {
  const header = document.querySelector('.site-header');
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80) {
      header.style.boxShadow = '0 4px 30px rgba(201, 168, 76, 0.15)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastY = y;
  }, { passive: true });
};

/* ===== スムーズスクロール（アンカーリンク） ===== */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
};

/* ===== キラキラエフェクト（クリック時） ===== */
const initSparkle = () => {
  document.addEventListener('click', (e) => {
    const colors = ['#C9A84C', '#F0D080', '#E8C96A', '#fff8d0', '#ffd700'];
    const count = 6;

    for (let i = 0; i < count; i++) {
      const spark = document.createElement('span');
      spark.classList.add('sparkle');
      const angle = (Math.PI * 2 / count) * i;
      const dist = 30 + Math.random() * 30;
      spark.style.left = e.clientX + 'px';
      spark.style.top = e.clientY + window.scrollY + 'px';
      spark.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      spark.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      spark.style.background = colors[Math.floor(Math.random() * colors.length)];
      spark.style.width = (4 + Math.random() * 4) + 'px';
      spark.style.height = spark.style.width;
      document.body.appendChild(spark);
      spark.addEventListener('animationend', () => spark.remove());
    }
  });
};

/* ===== 星降りアニメーション（ヒーロー追加装飾） ===== */
const initStarfall = () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const createStar = () => {
    const star = document.createElement('span');
    star.style.cssText = `
      position: absolute;
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
      background: #E8C96A;
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: 0;
      animation: twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 5}s infinite alternate;
      pointer-events: none;
    `;
    hero.querySelector('.hero-overlay').appendChild(star);
  };

  for (let i = 0; i < 40; i++) {
    createStar();
  }
};

/* ===== カウントアップ（実績数字） ===== */
const initCountUp = () => {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString();
        if (current >= target) clearInterval(timer);
      }, 25);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => obs.observe(n));
};

/* ===== LINE固定ボタン パルスアニメーション ===== */
const initFloatPulse = () => {
  const floatBtn = document.querySelector('.float-line');
  if (!floatBtn) return;

  let pulseInterval = setInterval(() => {
    floatBtn.style.transform = 'scale(1.08)';
    setTimeout(() => {
      floatBtn.style.transform = 'scale(1)';
    }, 300);
  }, 3000);
};

/* ===== 初期化 ===== */
document.addEventListener('DOMContentLoaded', () => {
  initFadeIn();
  initFaq();
  initHeader();
  initSmoothScroll();
  initSparkle();
  initStarfall();
  initCountUp();
  initFloatPulse();
});
