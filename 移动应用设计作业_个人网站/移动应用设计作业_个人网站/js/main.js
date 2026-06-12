// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // 导航栏滚动高亮
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href && href === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 64;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                // 关闭移动端菜单
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 50) {
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }
        }

        updateActiveNav();
        lastScrollY = currentScrollY;
    });

    // 打字机效果
    const typingText = document.querySelector('.typing-effect');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let index = 0;

        function type() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }

        // 延迟一点开始打字效果
        setTimeout(type, 500);
    }

    // 技能条滚动动画
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function checkSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }

    // 元素进入视口动画
    const animatedElements = document.querySelectorAll('.food-card, .movie-card, .hobby-item, .detail-block, .about-info-card');
    
    function checkScrollAnimation() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    // 初始设置动画元素样式
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });

    // 滚动监听
    window.addEventListener('scroll', function() {
        checkScrollAnimation();
    });

    // 初始检查
    setTimeout(() => {
        checkScrollAnimation();
        checkSkillBars();
    }, 200);

});
