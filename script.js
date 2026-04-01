document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       1. 모바일 햄버거 메뉴 기능
       ========================================= */
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const closeBtn = document.querySelector(".close-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const menuOverlay = document.querySelector(".mobile-menu-overlay");
    const mobileTabLinks = document.querySelectorAll(".tab-link-mobile");
    
    // 메뉴 열기
    if (mobileBtn) {
        mobileBtn.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            menuOverlay.classList.add("active");
        });
    }

    // 메뉴 닫기 공통 함수
    const closeMenu = () => {
        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
    };

    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);
    
    // 모바일 탭 링크 클릭 시에도 메뉴 닫기
    mobileTabLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    /* =========================================
       2. 탭 전환 (그룹 분할) 로직
       ========================================= */
    const tabLinksAll = document.querySelectorAll(".tab-link, .tab-link-mobile");
    const tabContents = document.querySelectorAll(".tab-content");
    const viewerSection = document.getElementById("viewer-section");

    tabLinksAll.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            // 타겟 그룹 ID 가져오기
            const targetId = this.getAttribute("data-target");

            // 모든 탭 버튼 활성화 해제 (PC 메뉴만 적용)
            document.querySelectorAll(".tab-link").forEach(btn => btn.classList.remove("active"));
            
            // 현재 클릭한 버튼이 PC 메뉴라면 활성화
            if(this.classList.contains("tab-link")) {
                this.classList.add("active");
            } else {
                // 모바일에서 클릭 시 해당하는 PC 메뉴 연동 활성화
                const matchingPcTab = document.querySelector(`.tab-link[data-target="${targetId}"]`);
                if(matchingPcTab) matchingPcTab.classList.add("active");
            }

            // 부드러운 전환을 위해 모든 컨텐츠 숨김 후 재노출
            tabContents.forEach(content => {
                content.classList.remove("active");
            });

            const targetContent = document.getElementById(targetId);
            if(targetContent) {
                targetContent.classList.add("active");
                
                // 모바일/PC 상관없이 탭 선택 시 화면 상단으로 부드럽게 스크롤
                // 헤더 높이(80px)를 감안한 여백
                const headerOffset = 100;
                const elementPosition = viewerSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================================
       3. 네비게이션바 하단 그림자 트랜지션
       ========================================= */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
        }
    });
});
