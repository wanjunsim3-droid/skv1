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

    /* =========================================
       4. 30초 한정 프로모션 팝업 배너 (옵션 B)
       ========================================= */
    const promoModal = document.getElementById("promo-banner-modal");
    const promoCloseBtn = document.getElementById("promo-close-btn");
    const promoTimerFill = document.getElementById("promo-timer-fill");
    
    if (promoModal && promoCloseBtn && promoTimerFill) {
        // 이미 닫았는지 확인 (세션 스토리지 사용 - 새로고침하면 다시 안뜨게 할 수도 있으나 일단 매번 뜨게 하려면 무시)
        // 여기서는 요건에 맞게 매번 접속시 뜨게 하되 오늘 하루 안보기 기능을 넣을 수도 있음. 
        // 심플하게 무조건 뜨고 30초 뒤 사라지게 구현.
        
        let promoTimeout;

        // 배너 숨기기 함수
        const closePromoBanner = () => {
            promoModal.classList.remove("show");
            if (promoTimeout) clearTimeout(promoTimeout);
        };

        // 닫기 버튼 클릭 시 숨김
        promoCloseBtn.addEventListener("click", () => {
            closePromoBanner();
            // 오늘 하루 안보기 설정 (옵션)
            sessionStorage.setItem("hidePromo", "true");
        });

        // 세션에 숨김 기록이 없다면 1.5초 뒤 팝업 띄우기
        if (sessionStorage.getItem("hidePromo") !== "true") {
            setTimeout(() => {
                promoModal.classList.add("show");
                
                // 30초 카운트다운 진행바 애니메이션
                promoTimerFill.style.transition = "width 30s linear";
                promoTimerFill.style.width = "0%";
                
                // 30초 뒤 자동 숨김
                promoTimeout = setTimeout(() => {
                    closePromoBanner();
                }, 30000);
            }, 1500);
        }
    }
});
