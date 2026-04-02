/* ============================================
   CIPHER — Cybersecurity Portfolio
   Interactive JavaScript Engine
   ============================================ */

(function () {
    'use strict';

    // ─── DOM READY ───
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initLoadingScreen();
        initParticles();
        initMatrixRain();
        initCursorTrail();
        initNavigation();
        initTypingEffect();
        initScrollReveal();
        initSkillBars();
        initCountUp();
        initTiltEffect();
        initContactForm();
        initSectionObserver();
    }

    // ═══════════════════════════════════════════
    //  LOADING SCREEN
    // ═══════════════════════════════════════════
    function initLoadingScreen() {
        const loader = document.getElementById('loading-screen');
        const bar = document.getElementById('loader-bar');
        const status = document.getElementById('loader-status');
        if (!loader || !bar) return;

        const messages = [
            'INITIALIZING SECURE CONNECTION...',
            'LOADING ENCRYPTION MODULES...',
            'ESTABLISHING TUNNEL...',
            'VERIFYING CERTIFICATES...',
            'DECRYPTING PAYLOAD...',
            'ACCESS GRANTED ✓'
        ];

        let progress = 0;
        let msgIndex = 0;

        function step() {
            progress += Math.random() * 15 + 5;
            if (progress > 100) progress = 100;
            bar.style.width = progress + '%';

            // Update message
            const newMsgIndex = Math.min(Math.floor(progress / (100 / messages.length)), messages.length - 1);
            if (newMsgIndex !== msgIndex) {
                msgIndex = newMsgIndex;
                if (status) status.textContent = messages[msgIndex];
            }

            if (progress < 100) {
                setTimeout(step, 200 + Math.random() * 300);
            } else {
                if (status) status.textContent = messages[messages.length - 1];
                setTimeout(() => {
                    loader.classList.add('hidden');
                    document.body.style.overflow = '';
                }, 500);
            }
        }

        document.body.style.overflow = 'hidden';
        setTimeout(step, 300);
    }

    // ═══════════════════════════════════════════
    //  PARTICLE NETWORK BACKGROUND
    // ═══════════════════════════════════════════
    function initParticles() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
                this.pulseOffset = Math.random() * Math.PI * 2;
            }
            update(time) {
                this.x += this.vx;
                this.y += this.vy;

                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.vx += (dx / dist) * force * 0.03;
                        this.vy += (dy / dist) * force * 0.03;
                    }
                }

                this.vx *= 0.99;
                this.vy *= 0.99;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                this.currentOpacity = this.opacity + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.15;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 136, ${this.currentOpacity})`;
                ctx.fill();
            }
        }

        const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const alpha = (1 - dist / 150) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function drawMouseConnections() {
            if (mouse.x === null) return;
            for (const p of particles) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius * 1.5) {
                    const alpha = (1 - dist / (mouse.radius * 1.5)) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        let time = 0;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time++;
            particles.forEach(p => {
                p.update(time);
                p.draw();
            });
            drawConnections();
            drawMouseConnections();
            requestAnimationFrame(animate);
        }
        animate();
    }

    // ═══════════════════════════════════════════
    //  MATRIX RAIN
    // ═══════════════════════════════════════════
    function initMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,./<>?~`アイウエオカキクケコサシスセソタチツテトナニヌネノ';
        const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize);
        let drops = new Array(columns).fill(1);

        window.addEventListener('resize', () => {
            columns = Math.floor(canvas.width / fontSize);
            drops = new Array(columns).fill(1);
        });

        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff88';
            ctx.font = `${fontSize}px 'Fira Code', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 50);
    }

    // ═══════════════════════════════════════════
    //  CURSOR TRAIL
    // ═══════════════════════════════════════════
    function initCursorTrail() {
        const canvas = document.getElementById('cursor-trail');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        const trail = [];
        const maxTrail = 20;

        window.addEventListener('mousemove', (e) => {
            trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            if (trail.length > maxTrail) trail.shift();
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const now = Date.now();

            // Remove old points
            while (trail.length > 0 && now - trail[0].time > 400) {
                trail.shift();
            }

            if (trail.length > 1) {
                for (let i = 1; i < trail.length; i++) {
                    const age = (now - trail[i].time) / 400;
                    const alpha = (1 - age) * 0.3;
                    const size = (1 - age) * 3;

                    if (alpha <= 0) continue;

                    ctx.beginPath();
                    ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
                    ctx.fill();
                }
            }

            requestAnimationFrame(animate);
        }
        animate();
    }

    // ═══════════════════════════════════════════
    //  NAVIGATION
    // ═══════════════════════════════════════════
    function initNavigation() {
        const nav = document.getElementById('main-nav');
        const toggle = document.getElementById('nav-toggle');
        const navLinks = document.getElementById('nav-links');
        const links = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        if (toggle) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                navLinks.classList.toggle('open');
            });
        }

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = nav.offsetHeight + 20;
                    const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
                toggle?.classList.remove('active');
                navLinks?.classList.remove('open');
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // ═══════════════════════════════════════════
    //  SECTION OBSERVER (Highlight nav on scroll)
    // ═══════════════════════════════════════════
    function initSectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[data-section]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        navLinks.forEach(l => {
                            l.classList.toggle('active', l.dataset.section === id);
                        });
                    }
                });
            },
            { rootMargin: '-30% 0px -60% 0px' }
        );

        sections.forEach(s => observer.observe(s));
    }

    // ═══════════════════════════════════════════
    //  TYPING EFFECT
    // ═══════════════════════════════════════════
    function initTypingEffect() {
        const el = document.getElementById('typed-intro');
        if (!el) return;

        const strings = [
            'nmap -sV -sC -A 192.168.1.0/24',
            'sqlmap -u "target.com/?id=1" --dbs --batch',
            'python3 packet_sniffer.py --interface eth0',
            'wireshark -i eth0 -f "tcp port 80"',
            'proxychains nmap -sT -Pn target.onion',
            'burpsuite --project pentest_webapp',
            'python3 threat_detector.py --model rf --live',
            'msfconsole -x "use auxiliary/scanner/http"'
        ];

        let stringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const current = strings[stringIndex];
            if (isDeleting) {
                el.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                el.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 30 : 60;

            if (!isDeleting && charIndex === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % strings.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1500);
    }

    // ═══════════════════════════════════════════
    //  SCROLL REVEAL
    // ═══════════════════════════════════════════
    function initScrollReveal() {
        const revealTargets = [
            { selector: '.section-header', cls: 'reveal' },
            { selector: '.about-image-container', cls: 'reveal-left' },
            { selector: '.about-text', cls: 'reveal-right' },
            { selector: '.skill-card', cls: 'reveal' },
            { selector: '.project-card', cls: 'reveal' },
            { selector: '.cert-item', cls: 'reveal' },
            { selector: '.exp-item', cls: 'reveal' },
            { selector: '.blog-card', cls: 'reveal' },
            { selector: '.contact-terminal', cls: 'reveal-left' },
            { selector: '.contact-form-container', cls: 'reveal' },
            { selector: '.contact-links', cls: 'reveal' },
            { selector: '.tool-cloud', cls: 'reveal' },
        ];

        revealTargets.forEach(({ selector, cls }) => {
            document.querySelectorAll(selector).forEach((el, i) => {
                el.classList.add(cls);
                el.style.transitionDelay = `${i * 0.1}s`;
            });
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
        );

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            observer.observe(el);
        });
    }

    // ═══════════════════════════════════════════
    //  SKILL BARS ANIMATION
    // ═══════════════════════════════════════════
    function initSkillBars() {
        const fills = document.querySelectorAll('.skill-fill');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const fill = entry.target;
                        const level = fill.dataset.level;
                        setTimeout(() => {
                            fill.style.width = level + '%';
                        }, 200);
                        observer.unobserve(fill);
                    }
                });
            },
            { threshold: 0.3 }
        );

        fills.forEach(fill => observer.observe(fill));
    }

    // ═══════════════════════════════════════════
    //  COUNT-UP ANIMATION
    // ═══════════════════════════════════════════
    function initCountUp() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statNumbers.forEach(el => observer.observe(el));

        function animateCount(el) {
            const target = parseInt(el.dataset.target, 10);
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            }

            requestAnimationFrame(update);
        }
    }

    // ═══════════════════════════════════════════
    //  TILT EFFECT (3D card hover)
    // ═══════════════════════════════════════════
    function initTiltEffect() {
        const tiltElements = document.querySelectorAll('[data-tilt]');

        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;

                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // ═══════════════════════════════════════════
    //  CONTACT FORM
    // ═══════════════════════════════════════════
    function initContactForm() {
        const form = document.getElementById('contact-form');
        const submitBtn = document.getElementById('contact-submit');
        if (!form) return;

        const originalHTML = submitBtn.innerHTML;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-icon">⟳</span> ENCRYPTING TRANSMISSION...';

            try {
                const formData = new FormData(form);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                submitBtn.classList.remove('loading');

                if (result.success) {
                    // Success state
                    submitBtn.innerHTML = '<span class="btn-icon">✓</span> TRANSMISSION SENT';
                    submitBtn.style.borderColor = 'rgba(0, 255, 136, 0.5)';
                    submitBtn.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
                    form.reset();
                } else {
                    // API returned an error
                    submitBtn.innerHTML = '<span class="btn-icon">✗</span> TRANSMISSION FAILED';
                    submitBtn.style.borderColor = 'rgba(255, 50, 50, 0.5)';
                    submitBtn.style.boxShadow = '0 0 20px rgba(255, 50, 50, 0.2)';
                }
            } catch (error) {
                // Network error
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<span class="btn-icon">✗</span> CONNECTION ERROR';
                submitBtn.style.borderColor = 'rgba(255, 50, 50, 0.5)';
                submitBtn.style.boxShadow = '0 0 20px rgba(255, 50, 50, 0.2)';
            }

            submitBtn.disabled = false;

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.borderColor = '';
                submitBtn.style.boxShadow = '';
            }, 3000);
        });
    }

})();
