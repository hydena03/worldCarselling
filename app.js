// 전역 변수
let selectedYears = [2024]; // 배열로 변경 (다중 선택 가능)
let selectedPeriods = ['yearly']; // 배열로 변경 (다중 선택 가능)
let selectedMonths = []; // 배열로 변경 (다중 선택 가능)
let selectedPowertrainTypes = ['all']; // 배열로 변경 (다중 선택 가능)
let selectedCompany = null;
let charts = {};
let currentLang = 'ko'; // 현재 언어

// 다국어 지원
const translations = {
    ko: {
        mainTitle: '🚗 세계 자동차 판매량 순위',
        subtitle: '연도별 · 분기별 · 월별 제조사 및 차종 순위',
        yearSelection: '📅 연도 선택',
        powertrainSelection: '⚡ 구동 방식',
        periodSelection: '📊 기간 선택',
        monthSelection: '📅 월별 선택',
        all: '전체',
        ice: '🛢️ 내연기관',
        hybrid: '⚡ 하이브리드',
        ev: '🔋 전기차',
        yearly: '연간 전체',
        Q1: '1분기 (Q1)',
        Q2: '2분기 (Q2)',
        Q3: '3분기 (Q3)',
        Q4: '4분기 (Q4)',
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        companyRanking: '🏆 제조사 판매량 순위',
        modelDetails: '🚙 차종별 상세 순위',
        headerRank: '순위',
        headerBrand: '브랜드',
        headerSales: '판매대수',
        headerChange: '전년대비',
        headerEV: '전기차 비율',
        headerModelRank: '순위',
        headerModelName: '모델명',
        headerModelType: '차종',
        headerModelChange: '전년대비',
        headerModelSales: '판매대수',
        selectCompany: '제조사를 선택하세요',
        emptyState: '👈 왼쪽에서 제조사를 클릭하여 차종별 판매량을 확인하세요',
        allModels: '전체 차종 순위',
        totalSalesLabel: '총 판매량',
        topCompanyLabel: '1위 제조사',
        evRatioLabel: '전기차 비율',
        companyCountLabel: '제조사 수',
        units: '대',
        companies: '개',
        sedan: '세단',
        suv: 'SUV',
        truck: '픽업트럭',
        hatchback: '해치백',
        compact: '소형차',
        etc: '기타',
        suvHybrid: 'SUV 하이브리드',
        sedanHybrid: '세단 하이브리드'
    },
    en: {
        mainTitle: '🚗 Global Automobile Sales Ranking',
        subtitle: 'By Year · Quarter · Month - Manufacturer & Model Rankings',
        yearSelection: '📅 Year Selection',
        powertrainSelection: '⚡ Powertrain',
        periodSelection: '📊 Period Selection',
        monthSelection: '📅 Month Selection',
        all: 'All',
        ice: '🛢️ ICE',
        hybrid: '⚡ Hybrid',
        ev: '🔋 EV',
        yearly: 'Annual',
        Q1: 'Q1',
        Q2: 'Q2',
        Q3: 'Q3',
        Q4: 'Q4',
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        companyRanking: '🏆 Manufacturer Sales Ranking',
        modelDetails: '🚙 Model Details Ranking',
        headerRank: 'Rank',
        headerBrand: 'Brand',
        headerSales: 'Sales',
        headerChange: 'YoY',
        headerEV: 'EV Ratio',
        headerModelRank: 'Rank',
        headerModelName: 'Model',
        headerModelType: 'Type',
        headerModelChange: 'YoY',
        headerModelSales: 'Sales',
        selectCompany: 'Select a manufacturer',
        emptyState: '👈 Click a manufacturer to view model sales',
        allModels: 'All Models Ranking',
        totalSalesLabel: 'Total Sales',
        topCompanyLabel: 'Top Company',
        evRatioLabel: 'EV Ratio',
        companyCountLabel: 'Companies',
        units: 'units',
        companies: '',
        sedan: 'Sedan',
        suv: 'SUV',
        truck: 'Pickup Truck',
        hatchback: 'Hatchback',
        compact: 'Compact',
        etc: 'Others',
        suvHybrid: 'SUV Hybrid',
        sedanHybrid: 'Sedan Hybrid'
    },
    ja: {
        mainTitle: '🚗 世界自動車販売台数ランキング',
        subtitle: '年度別・四半期別・月別 メーカー＆車種ランキング',
        yearSelection: '📅 年度選択',
        powertrainSelection: '⚡ パワートレイン',
        periodSelection: '📊 期間選択',
        monthSelection: '📅 月別選択',
        all: '全体',
        ice: '🛢️ 内燃機関',
        hybrid: '⚡ ハイブリッド',
        ev: '🔋 電気自動車',
        yearly: '年間',
        Q1: '第1四半期',
        Q2: '第2四半期',
        Q3: '第3四半期',
        Q4: '第4四半期',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        companyRanking: '🏆 メーカー販売台数ランキング',
        modelDetails: '🚙 車種別詳細ランキング',
        headerRank: '順位',
        headerBrand: 'ブランド',
        headerSales: '販売台数',
        headerChange: '前年比',
        headerEV: 'EV比率',
        headerModelRank: '順位',
        headerModelName: 'モデル',
        headerModelType: 'タイプ',
        headerModelChange: '前年比',
        headerModelSales: '販売台数',
        selectCompany: 'メーカーを選択してください',
        emptyState: '👈 左側のメーカーをクリックして車種別販売台数を確認',
        allModels: '全車種ランキング',
        totalSalesLabel: '総販売台数',
        topCompanyLabel: '1位メーカー',
        evRatioLabel: 'EV比率',
        companyCountLabel: 'メーカー数',
        units: '台',
        companies: '社',
        sedan: 'セダン',
        suv: 'SUV',
        truck: 'ピックアップトラック',
        hatchback: 'ハッチバック',
        compact: 'コンパクト',
        etc: 'その他',
        suvHybrid: 'SUV ハイブリッド',
        sedanHybrid: 'セダン ハイブリッド'
    },
    zh: {
        mainTitle: '🚗 全球汽车销量排行榜',
        subtitle: '年度 · 季度 · 月度 制造商及车型排名',
        yearSelection: '📅 年度选择',
        powertrainSelection: '⚡ 动力系统',
        periodSelection: '📊 期间选择',
        monthSelection: '📅 月份选择',
        all: '全部',
        ice: '🛢️ 燃油车',
        hybrid: '⚡ 混合动力',
        ev: '🔋 电动车',
        yearly: '全年',
        Q1: '第一季度',
        Q2: '第二季度',
        Q3: '第三季度',
        Q4: '第四季度',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        companyRanking: '🏆 制造商销量排名',
        modelDetails: '🚙 车型详细排名',
        headerRank: '排名',
        headerBrand: '品牌',
        headerSales: '销量',
        headerChange: '同比',
        headerEV: '电动车占比',
        headerModelRank: '排名',
        headerModelName: '车型',
        headerModelType: '类型',
        headerModelChange: '同比',
        headerModelSales: '销量',
        selectCompany: '请选择制造商',
        emptyState: '👈 点击左侧制造商查看车型销量',
        allModels: '全部车型排名',
        totalSalesLabel: '总销量',
        topCompanyLabel: '第一名',
        evRatioLabel: '电动车占比',
        companyCountLabel: '制造商数',
        units: '辆',
        companies: '家',
        sedan: '轿车',
        suv: 'SUV',
        truck: '皮卡',
        hatchback: '两厢车',
        compact: '小型车',
        etc: '其他',
        suvHybrid: 'SUV 混动',
        sedanHybrid: '轿车 混动'
    }
};

// 구동 방식 판별 함수
function getPowertrainType(vehicleType) {
    if (vehicleType === '전기차') {
        return '전기차';
    } else if (vehicleType.includes('하이브리드')) {
        return '하이브리드';
    } else {
        return '내연기관';
    }
}

// 언어 전환 함수
function switchLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    // 헤더 업데이트
    document.getElementById('mainTitle').textContent = t.mainTitle;
    
    // 섹션 제목 업데이트
    document.querySelectorAll('.selection-group h2')[0].innerHTML = t.yearSelection;
    document.querySelectorAll('.selection-group h2')[1].innerHTML = t.powertrainSelection;
    document.querySelectorAll('.period-row h2')[0].innerHTML = t.periodSelection;
    document.querySelectorAll('.period-row h2')[1].innerHTML = t.monthSelection;
    
    // 구동 방식 버튼 업데이트
    document.querySelector('[data-type="all"]').textContent = t.all;
    document.querySelector('[data-type="내연기관"]').textContent = t.ice;
    document.querySelector('[data-type="하이브리드"]').textContent = t.hybrid;
    document.querySelector('[data-type="전기차"]').textContent = t.ev;
    
    // 기간 탭 업데이트
    document.querySelector('[data-period="yearly"]').textContent = t.yearly;
    document.querySelector('[data-period="Q1"]').textContent = t.Q1;
    document.querySelector('[data-period="Q2"]').textContent = t.Q2;
    document.querySelector('[data-period="Q3"]').textContent = t.Q3;
    document.querySelector('[data-period="Q4"]').textContent = t.Q4;
    
    // 월별 탭 업데이트
    document.querySelectorAll('.month-tab').forEach((btn, idx) => {
        btn.textContent = t.months[idx];
    });
    
    // 제조사 순위 헤더 업데이트
    document.querySelector('.company-ranking .section-header h2').innerHTML = t.companyRanking;
    document.querySelector('.header-rank').textContent = t.headerRank;
    document.querySelector('.header-brand').textContent = t.headerBrand;
    document.querySelector('.header-sales').textContent = t.headerSales;
    document.querySelector('.header-change').textContent = t.headerChange;
    document.querySelector('.header-ev').textContent = t.headerEV;
    
    // 차종별 순위 헤더 업데이트
    document.querySelector('.model-details .section-header h2').innerHTML = t.modelDetails;
    document.querySelector('.header-model-rank').textContent = t.headerModelRank;
    document.querySelector('.header-model-name').textContent = t.headerModelName;
    document.querySelector('.header-model-type').textContent = t.headerModelType;
    document.querySelector('.header-model-change').textContent = t.headerModelChange;
    document.querySelector('.header-model-sales').textContent = t.headerModelSales;
    
    // 차트 제목 업데이트
    const chartTitle1 = {
        ko: '📈 제조사별 판매량 차트',
        en: '📈 Sales by Manufacturer',
        ja: '📈 メーカー別販売台数チャート',
        zh: '📈 制造商销量图表'
    };
    const chartTitle2 = {
        ko: '📊 선택한 제조사의 차종별 비율',
        en: '📊 Model Distribution by Selected Manufacturer',
        ja: '📊 選択したメーカーの車種別比率',
        zh: '📊 所选制造商的车型分布'
    };
    const chartTitle3 = {
        ko: '📊 연도별 브랜드 판매량 추이',
        en: '📊 Brand Sales Trend by Year',
        ja: '📊 年度別ブランド販売台数推移',
        zh: '📊 品牌销量年度趋势'
    };
    document.querySelectorAll('.chart-container h2')[0].innerHTML = chartTitle1[lang];
    document.querySelectorAll('.chart-container h2')[1].innerHTML = chartTitle2[lang];
    document.querySelectorAll('.chart-container h2')[2].innerHTML = chartTitle3[lang];
    
    // 통계 카드 업데이트
    document.querySelectorAll('.stat-content h3')[0].textContent = t.totalSalesLabel;
    document.querySelectorAll('.stat-content h3')[1].textContent = t.topCompanyLabel;
    document.querySelectorAll('.stat-content h3')[2].textContent = t.evRatioLabel;
    document.querySelectorAll('.stat-content h3')[3].textContent = t.companyCountLabel;
    
    // 데이터 다시 표시
    updateDisplay();
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    
    // 언어 선택 버튼 이벤트
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            switchLanguage(this.dataset.lang);
        });
    });
    
    updateDisplay();
});

// 이벤트 리스너 설정
function setupEventListeners() {
    // 연도 선택 - 토글 방식 (다중 선택)
    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const year = parseInt(this.dataset.year);
            
            if (selectedYears.includes(year)) {
                // 이미 선택되어 있으면 제거 (최소 1개는 유지)
                if (selectedYears.length > 1) {
                    selectedYears = selectedYears.filter(y => y !== year);
                    this.classList.remove('active');
                }
            } else {
                // 선택되어 있지 않으면 추가
                selectedYears.push(year);
                selectedYears.sort(); // 정렬
                this.classList.add('active');
            }
            
            selectedCompany = null; // 연도 변경 시 선택 초기화
            updateDisplay();
        });
    });

    // 구동 방식 선택 - 토글 방식 (다중 선택)
    document.querySelectorAll('.powertrain-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            
            if (type === 'all') {
                // "전체" 선택 시 다른 모든 선택 해제
                selectedPowertrainTypes = ['all'];
                document.querySelectorAll('.powertrain-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            } else {
                // 특정 타입 선택 - 토글
                selectedPowertrainTypes = selectedPowertrainTypes.filter(t => t !== 'all'); // 'all' 제거
                
                if (selectedPowertrainTypes.includes(type)) {
                    // 이미 선택되어 있으면 제거
                    selectedPowertrainTypes = selectedPowertrainTypes.filter(t => t !== type);
                    this.classList.remove('active');
                } else {
                    // 선택되어 있지 않으면 추가
                    selectedPowertrainTypes.push(type);
                    this.classList.add('active');
                }
                
                // 아무것도 선택 안 되어 있으면 'all'로
                if (selectedPowertrainTypes.length === 0) {
                    selectedPowertrainTypes = ['all'];
                    document.querySelector('.powertrain-btn[data-type="all"]').classList.add('active');
                }
            }
            
            selectedCompany = null; // 구동 방식 변경 시 선택 초기화
            updateDisplay();
        });
    });

    // 기간(분기) 선택 - 토글 방식
    document.querySelectorAll('.period-tab').forEach(btn => {
        btn.addEventListener('click', function() {
            const period = this.dataset.period;
            
            if (period === 'yearly') {
                // 연간 선택 시 다른 모든 선택 해제
                selectedPeriods = ['yearly'];
                selectedMonths = [];
                document.querySelectorAll('.period-tab').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.month-tab').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            } else {
                // 분기 선택 - 토글
                selectedPeriods = selectedPeriods.filter(p => p !== 'yearly'); // yearly 제거
                
                if (selectedPeriods.includes(period)) {
                    // 이미 선택되어 있으면 제거
                    selectedPeriods = selectedPeriods.filter(p => p !== period);
                    this.classList.remove('active');
                } else {
                    // 선택되어 있지 않으면 추가
                    selectedPeriods.push(period);
                    this.classList.add('active');
                }
                
                // 아무것도 선택 안 되어 있으면 yearly로
                if (selectedPeriods.length === 0 && selectedMonths.length === 0) {
                    selectedPeriods = ['yearly'];
                    document.querySelector('.period-tab[data-period="yearly"]').classList.add('active');
                }
            }
            
            selectedCompany = null;
            updateDisplay();
        });
    });

    // 월별 선택 - 토글 방식
    document.querySelectorAll('.month-tab').forEach(btn => {
        btn.addEventListener('click', function() {
            const month = this.dataset.month;
            
            // yearly와 분기 선택 해제
            selectedPeriods = [];
            document.querySelectorAll('.period-tab').forEach(b => b.classList.remove('active'));
            
            if (selectedMonths.includes(month)) {
                // 이미 선택되어 있으면 제거
                selectedMonths = selectedMonths.filter(m => m !== month);
                this.classList.remove('active');
            } else {
                // 선택되어 있지 않으면 추가
                selectedMonths.push(month);
                this.classList.add('active');
            }
            
            // 아무것도 선택 안 되어 있으면 yearly로
            if (selectedMonths.length === 0 && selectedPeriods.length === 0) {
                selectedPeriods = ['yearly'];
                document.querySelector('.period-tab[data-period="yearly"]').classList.add('active');
            }
            
            selectedCompany = null;
            updateDisplay();
        });
    });

}

// 데이터 필터링 (연도 + 기간들 + 구동 방식)
function getFilteredData() {
    let filtered = salesData.filter(item => {
        const [year, month] = item.date.split('-');
        
        // 연도 필터 (다중 선택)
        if (!selectedYears.includes(parseInt(year))) return false;
        
        // 구동 방식 필터 (다중 선택)
        if (!selectedPowertrainTypes.includes('all')) {
            const powertrainType = getPowertrainType(item.vehicleType);
            if (!selectedPowertrainTypes.includes(powertrainType)) return false;
        }
        
        // 연간 전체 선택된 경우
        if (selectedPeriods.includes('yearly')) {
            return true;
        }
        
        // 월별 선택이 있는 경우
        if (selectedMonths.length > 0) {
            return selectedMonths.includes(month);
        }
        
        // 분기 선택이 있는 경우
        if (selectedPeriods.length > 0) {
            const monthNum = parseInt(month);
            
            for (const period of selectedPeriods) {
                if (period === 'Q1' && monthNum >= 1 && monthNum <= 3) return true;
                if (period === 'Q2' && monthNum >= 4 && monthNum <= 6) return true;
                if (period === 'Q3' && monthNum >= 7 && monthNum <= 9) return true;
                if (period === 'Q4' && monthNum >= 10 && monthNum <= 12) return true;
            }
        }
        
        return false;
    });
    
    return filtered;
}

// 이전 기간 데이터 가져오기 (전년도 동일 기간)
function getPreviousPeriodData() {
    // 전년도 계산
    const previousYears = selectedYears.map(y => y - 1);
    
    let filtered = salesData.filter(item => {
        const [year, month] = item.date.split('-');
        
        // 전년도 필터
        if (!previousYears.includes(parseInt(year))) return false;
        
        // 구동 방식 필터 (현재와 동일)
        if (!selectedPowertrainTypes.includes('all')) {
            const powertrainType = getPowertrainType(item.vehicleType);
            if (!selectedPowertrainTypes.includes(powertrainType)) return false;
        }
        
        // 기간 필터 (현재와 동일)
        if (selectedPeriods.includes('yearly')) {
            return true;
        }
        
        if (selectedMonths.length > 0) {
            return selectedMonths.includes(month);
        }
        
        if (selectedPeriods.length > 0) {
            const monthNum = parseInt(month);
            for (const period of selectedPeriods) {
                if (period === 'Q1' && monthNum >= 1 && monthNum <= 3) return true;
                if (period === 'Q2' && monthNum >= 4 && monthNum <= 6) return true;
                if (period === 'Q3' && monthNum >= 7 && monthNum <= 9) return true;
                if (period === 'Q4' && monthNum >= 10 && monthNum <= 12) return true;
            }
        }
        
        return false;
    });
    
    return filtered;
}

// 제조사별 판매량 집계
function aggregateByCompany(data) {
    const aggregated = {};
    
    data.forEach(item => {
        if (!aggregated[item.company]) {
            aggregated[item.company] = 0;
        }
        aggregated[item.company] += item.sales;
    });
    
    // 배열로 변환하고 판매량 순으로 정렬
    return Object.entries(aggregated)
        .map(([company, sales]) => ({ company, sales }))
        .sort((a, b) => b.sales - a.sales);
}

// 차종별 판매량 집계 (company가 null이면 전체, 아니면 특정 제조사만)
function aggregateByModel(data, company) {
    const filtered = company ? data.filter(item => item.company === company) : data;
    const aggregated = {};
    
    filtered.forEach(item => {
        // 전체 모델 집계 시에는 "회사명 - 모델명"을 키로 사용
        const key = company ? item.model : `${item.company}|${item.model}`;
        if (!aggregated[key]) {
            aggregated[key] = {
                model: item.model,
                company: item.company,
                vehicleType: item.vehicleType,
                sales: 0
            };
        }
        aggregated[key].sales += item.sales;
    });
    
    // 배열로 변환하고 판매량 순으로 정렬 ("기타"는 맨 뒤로)
    return Object.values(aggregated)
        .sort((a, b) => {
            // "기타"는 항상 맨 뒤로
            if (a.model === "기타") return 1;
            if (b.model === "기타") return -1;
            // 나머지는 판매량 순
            return b.sales - a.sales;
        });
}

// 제조사 순위 표시
function displayCompanyRanking(companyData) {
    const container = document.getElementById('companyRankingList');
    container.innerHTML = '';
    
    // 전년도 데이터 가져오기
    const previousData = getPreviousPeriodData();
    const previousCompanyData = aggregateByCompany(previousData);
    
    companyData.forEach((item, index) => {
        const rank = index + 1;
        const div = document.createElement('div');
        div.className = 'ranking-item';
        div.dataset.company = item.company;
        
        if (selectedCompany === item.company) {
            div.classList.add('selected');
        }
        
        // 전년도 데이터 찾기
        const previousItem = previousCompanyData.find(p => p.company === item.company);
        const previousRank = previousItem ? previousCompanyData.indexOf(previousItem) + 1 : null;
        const previousSales = previousItem ? previousItem.sales : 0;
        
        // 증감 계산
        const salesDiff = previousSales > 0 ? item.sales - previousSales : null;
        const salesDiffPercent = previousSales > 0 ? ((salesDiff / previousSales) * 100).toFixed(1) : null;
        const rankDiff = previousRank ? previousRank - rank : null;
        
        // 전기차 비율 계산
        const companyDataFiltered = getFilteredData().filter(d => d.company === item.company);
        const evSales = companyDataFiltered.filter(d => d.vehicleType === '전기차').reduce((sum, d) => sum + d.sales, 0);
        const evRatio = ((evSales / item.sales) * 100).toFixed(1);
        
        const t = translations[currentLang];
        
        // 증감 표시
        let changeHtml = '';
        if (salesDiff !== null) {
            const isPositive = salesDiff >= 0;
            const arrow = isPositive ? '▲' : '▼';
            const colorClass = isPositive ? 'increase' : 'decrease';
            changeHtml = `<div class="sales-change ${colorClass}">${arrow} ${Math.abs(salesDiff).toLocaleString()} ${t.units} (${isPositive ? '+' : ''}${salesDiffPercent}%)</div>`;
        } else {
            changeHtml = `<div class="sales-change">-</div>`;
        }
        
        // 순위 변동 표시
        let rankChangeHtml = '';
        if (rankDiff !== null && rankDiff !== 0) {
            const isUp = rankDiff > 0;
            const arrow = isUp ? '↑' : '↓';
            const colorClass = isUp ? 'rank-up' : 'rank-down';
            rankChangeHtml = `<span class="rank-change ${colorClass}">${arrow}${Math.abs(rankDiff)}</span>`;
        } else if (previousRank) {
            rankChangeHtml = `<span class="rank-change rank-same">-</span>`;
        }
        div.innerHTML = `
            <div class="ranking-number rank-${rank}">${rank} ${rankChangeHtml}</div>
            <div class="ranking-content">
                <div class="company-name">${item.company}</div>
                <div class="company-sales">${item.sales.toLocaleString()} ${t.units}</div>
                ${changeHtml}
            </div>
            ${evRatio > 0 ? `<div class="ranking-badge">⚡ ${evRatio}%</div>` : '<div class="ranking-badge" style="visibility: hidden;">⚡ 0%</div>'}
        `;
        
        div.addEventListener('click', function() {
            // 이전 선택 제거
            document.querySelectorAll('.ranking-item').forEach(el => {
                el.classList.remove('selected');
            });
            
            // 현재 항목 선택
            this.classList.add('selected');
            selectedCompany = item.company;
            
            // 차종별 상세 정보만 업데이트 (리스트는 유지)
            displayModelDetails(item.company);
            updateModelChart(item.company);
        });
        
        container.appendChild(div);
    });
}

// 차종별 상세 정보 표시
function displayModelDetails(company) {
    const data = getFilteredData();
    const modelData = aggregateByModel(data, company);
    
    // 전년도 데이터
    const previousData = getPreviousPeriodData();
    const previousModelData = aggregateByModel(previousData, company);
    
    const container = document.getElementById('modelList');
    const infoElement = document.getElementById('selectedCompanyInfo');
    const headerElement = document.getElementById('modelHeader');
    
    // 회사 선택 여부에 따라 제목 변경
    const t = translations[currentLang];
    infoElement.textContent = company ? company : t.allModels;
    container.innerHTML = '';
    
    // 헤더 표시
    headerElement.style.display = 'flex';
    
    // 전체 차종일 때는 "기타" 제외하고 상위 30개만
    const displayData = company 
        ? modelData 
        : modelData.filter(item => item.model !== "기타").slice(0, 30);
    
    displayData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'model-item';
        
        // "기타" 항목 특별 처리
        if (item.model === "기타") {
            div.classList.add('other-model');
        }
        
        // 전년도 데이터 찾기
        const previousItem = previousModelData.find(p => 
            p.model === item.model && p.company === item.company
        );
        const previousRank = previousItem ? previousModelData.indexOf(previousItem) + 1 : null;
        const previousSales = previousItem ? previousItem.sales : 0;
        
        // 증감 계산
        const salesDiff = previousSales > 0 ? item.sales - previousSales : null;
        const salesDiffPercent = previousSales > 0 ? ((salesDiff / previousSales) * 100).toFixed(1) : null;
        const rankDiff = previousRank ? previousRank - (index + 1) : null;
        
        const powertrainType = getPowertrainType(item.vehicleType);
        const powertrainBadge = {
            '내연기관': '<span class="powertrain-badge ice">🛢️ 내연기관</span>',
            '하이브리드': '<span class="powertrain-badge hybrid">⚡ 하이브리드</span>',
            '전기차': '<span class="powertrain-badge ev">🔋 전기차</span>'
        };
        
        // "기타"는 순위 표시 대신 "-" 표시
        const rankDisplay = item.model === "기타" ? "-" : (index + 1);
        
        // 순위 변동 표시
        let rankChangeHtml = '';
        if (item.model !== "기타") {
            if (rankDiff !== null && rankDiff !== 0) {
                const isUp = rankDiff > 0;
                const arrow = isUp ? '↑' : '↓';
                const colorClass = isUp ? 'rank-up' : 'rank-down';
                rankChangeHtml = `<span class="rank-change-small ${colorClass}">${arrow}${Math.abs(rankDiff)}</span>`;
            } else if (previousRank) {
                rankChangeHtml = `<span class="rank-change-small rank-same">-</span>`;
            }
        }
        
        // 전체 차종 순위일 때는 제조사명 표시
        const modelName = company ? item.model : `${item.company} ${item.model}`;
        
        const t = translations[currentLang];
        
        // 증감 표시
        let changeHtml = '';
        if (salesDiff !== null && item.model !== "기타") {
            const isPositive = salesDiff >= 0;
            const arrow = isPositive ? '▲' : '▼';
            const colorClass = isPositive ? 'increase' : 'decrease';
            changeHtml = `<div class="model-change ${colorClass}">${arrow} ${Math.abs(salesDiff).toLocaleString()} ${t.units} (${isPositive ? '+' : ''}${salesDiffPercent}%)</div>`;
        } else {
            changeHtml = `<div class="model-change">-</div>`;
        }
        div.innerHTML = `
            <div class="model-rank">${rankDisplay} ${rankChangeHtml}</div>
            <div class="model-info">
                <div class="model-name">${modelName}</div>
                <div class="model-type">${item.vehicleType} ${item.model === "기타" ? "" : powertrainBadge[powertrainType]}</div>
                ${changeHtml}
            </div>
            <div class="model-sales">${item.sales.toLocaleString()} ${t.units}</div>
        `;
        
        container.appendChild(div);
    });
}

// 연도별 순위 변화 차트 업데이트
function updateRankingTrendChart() {
    const ctx = document.getElementById('rankingTrendChart');
    const years = [2020, 2021, 2022, 2023, 2024, 2025];
    const t = translations[currentLang];
    
    // 각 연도별 제조사 순위 계산
    const rankingsByYear = {};
    const allCompanies = new Set();
    
    years.forEach(year => {
        const yearData = salesData.filter(item => {
            const [itemYear] = item.date.split('-');
            return parseInt(itemYear) === year;
        });
        
        const companyData = aggregateByCompany(yearData);
        rankingsByYear[year] = companyData;
        
        // 모든 회사 수집
        companyData.forEach(item => allCompanies.add(item.company));
    });
    
    // 상위 10개 회사만 선택 (2024년 기준)
    const topCompanies = rankingsByYear[2024] ? 
        rankingsByYear[2024].slice(0, 10).map(item => item.company) : 
        Array.from(allCompanies).slice(0, 10);
    
    // 각 회사별 연도별 판매량 데이터 생성
    const datasets = topCompanies.map((company, idx) => {
        const salesByYear = years.map(year => {
            const yearRanking = rankingsByYear[year];
            const companyData = yearRanking.find(item => item.company === company);
            return companyData ? companyData.sales : null;
        });
        
        const colors = [
            '#007AFF', '#FF3B30', '#34C759', '#FF9500', '#5AC8FA',
            '#AF52DE', '#FF2D55', '#5856D6', '#FFCC00', '#FF6482'
        ];
        
        const pointStyles = [
            'circle', 'rect', 'triangle', 'rectRot', 'cross', 
            'star', 'crossRot', 'rectRounded', 'dash', 'line'
        ];
        
        return {
            label: company,
            data: salesByYear,
            borderColor: colors[idx % colors.length],
            backgroundColor: colors[idx % colors.length],
            borderWidth: 2.5,
            tension: 0,
            pointRadius: 6,
            pointHoverRadius: 9,
            pointStyle: pointStyles[idx % pointStyles.length],
            pointBorderWidth: 2,
            pointBorderColor: '#fff',
            spanGaps: true
        };
    });
    
    if (charts.rankingTrend) {
        charts.rankingTrend.destroy();
    }
    
    // 언어별 레이블
    const unitText = t.units;
    const noDataText = currentLang === 'ko' ? '데이터 없음' : 
                      currentLang === 'en' ? 'No data' : 
                      currentLang === 'ja' ? 'データなし' : 
                      currentLang === 'zh' ? '无数据' : 'No data';
    const salesLabel = currentLang === 'ko' ? '판매량' : 
                      currentLang === 'en' ? 'Sales Volume' : 
                      currentLang === 'ja' ? '販売台数' : 
                      currentLang === 'zh' ? '销量' : 'Sales Volume';
    const yearLabel = currentLang === 'ko' ? '연도' : 
                     currentLang === 'en' ? 'Year' : 
                     currentLang === 'ja' ? '年度' : 
                     currentLang === 'zh' ? '年度' : 'Year';
    
    charts.rankingTrend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 11,
                            weight: 500,
                            family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                        },
                        color: '#1d1d1f',
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 10,
                        boxHeight: 10
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 13,
                        weight: 600,
                        family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                    },
                    bodyFont: {
                        size: 12,
                        family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                    },
                    callbacks: {
                        label: function(context) {
                            const company = context.dataset.label;
                            const sales = context.parsed.y;
                            return sales ? `${company}: ${sales.toLocaleString()} ${unitText}` : `${company}: ${noDataText}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        lineWidth: 1
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11,
                            family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                        },
                        color: '#86868b',
                        padding: 8,
                        callback: function(value) {
                            return (value / 1000).toFixed(0) + 'K';
                        }
                    },
                    title: {
                        display: true,
                        text: salesLabel,
                        font: {
                            size: 13,
                            weight: 600,
                            family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                        },
                        color: '#1d1d1f',
                        padding: {top: 0, bottom: 10}
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11,
                            family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                        },
                        color: '#86868b',
                        padding: 8
                    },
                    title: {
                        display: true,
                        text: yearLabel,
                        font: {
                            size: 13,
                            weight: 600,
                            family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                        },
                        color: '#1d1d1f',
                        padding: {top: 10, bottom: 0}
                    }
                }
            }
        }
    });
}

// 기간 정보 텍스트 생성
function getPeriodText() {
    const t = translations[currentLang];
    
    // 연도 텍스트
    let yearText = '';
    if (selectedYears.length === 1) {
        if (currentLang === 'ko') {
            yearText = `${selectedYears[0]}년`;
        } else if (currentLang === 'ja') {
            yearText = `${selectedYears[0]}年`;
        } else if (currentLang === 'zh') {
            yearText = `${selectedYears[0]}年`;
        } else {
            yearText = `${selectedYears[0]}`;
        }
    } else {
        const sortedYears = [...selectedYears].sort();
        if (currentLang === 'ko') {
            yearText = `${sortedYears.join(', ')}년`;
        } else if (currentLang === 'ja') {
            yearText = `${sortedYears.join(', ')}年`;
        } else if (currentLang === 'zh') {
            yearText = `${sortedYears.join(', ')}年`;
        } else {
            yearText = sortedYears.join(', ');
        }
    }
    
    // 기간 텍스트
    if (selectedPeriods.includes('yearly')) {
        return `${yearText} ${t.yearly}`;
    }
    
    // 월별 선택
    if (selectedMonths.length > 0) {
        if (selectedMonths.length === 1) {
            const monthText = t.months[parseInt(selectedMonths[0]) - 1];
            return `${yearText} ${monthText}`;
        } else {
            const months = selectedMonths.map(m => parseInt(m)).sort((a, b) => a - b);
            const monthText = months.map(m => t.months[m - 1]).join(', ');
            return `${yearText} ${monthText}`;
        }
    }
    
    // 분기 선택
    if (selectedPeriods.length > 0) {
        const quarters = [...selectedPeriods].sort();
        const quarterText = quarters.map(q => {
            if (currentLang === 'ko') return q;
            if (currentLang === 'ja') {
                const qNum = q.replace('Q', '');
                return `第${qNum}四半期`;
            }
            if (currentLang === 'zh') {
                const qMap = {'Q1': '第一季度', 'Q2': '第二季度', 'Q3': '第三季度', 'Q4': '第四季度'};
                return qMap[q];
            }
            return q;
        }).join(', ');
        return `${yearText} ${quarterText}`;
    }
    
    return yearText;
}

// 요약 통계 업데이트
function updateSummaryStats(companyData) {
    const data = getFilteredData();
    const t = translations[currentLang];
    
    // 총 판매량
    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
    document.getElementById('totalSales').textContent = totalSales.toLocaleString() + ' ' + t.units;
    
    // 1위 제조사
    if (companyData.length > 0) {
        document.getElementById('topCompany').textContent = companyData[0].company;
    }
    
    // 전기차 비율
    const evSales = data.filter(item => item.vehicleType === '전기차').reduce((sum, item) => sum + item.sales, 0);
    const evRatio = totalSales > 0 ? ((evSales / totalSales) * 100).toFixed(1) : 0;
    document.getElementById('evRatio').textContent = evRatio + '%';
    
    // 제조사 수
    const companies = new Set(data.map(item => item.company));
    document.getElementById('companyCount').textContent = companies.size + ' ' + t.companies;
}

// 제조사별 차트 업데이트
function updateCompanyChart(companyData) {
    const ctx = document.getElementById('companyChart');
    const top10 = companyData.slice(0, 10);
    const labels = top10.map(item => item.company);
    const values = top10.map(item => item.sales);
    
    if (charts.company) {
        charts.company.destroy();
    }
    
    const colors = [
        '#007AFF', '#FF3B30', '#34C759', '#FF9500', '#5AC8FA',
        '#AF52DE', '#FF2D55', '#5856D6', '#FFCC00', '#FF6482'
    ];
    
    charts.company = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '판매량',
                data: values,
                backgroundColor: colors,
                borderRadius: 12,
                borderWidth: 0,
                hoverBackgroundColor: colors.map(c => c + 'CC')
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 13,
                        weight: 600,
                        family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                    },
                    bodyFont: {
                        size: 12,
                        family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                    },
                    callbacks: {
                        label: function(context) {
                            return '판매량: ' + context.parsed.y.toLocaleString() + ' 대';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        lineWidth: 1
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11,
                            family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                        },
                        color: '#86868b',
                        padding: 8,
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11,
                            family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                        },
                        color: '#86868b',
                        padding: 8
                    }
                }
            }
        }
    });
}

// 차종별 차트 업데이트
function updateModelChart(company) {
    const ctx = document.getElementById('modelChart');
    const data = getFilteredData();
    const modelData = aggregateByModel(data, company);
    
    // "기타" 제외하고 상위 10개만 (전체 차종일 때)
    const filteredData = company 
        ? modelData 
        : modelData.filter(item => item.model !== "기타").slice(0, 10);
    
    const labels = filteredData.map(item => 
        company ? item.model : `${item.company} ${item.model}`
    );
    const values = filteredData.map(item => item.sales);
    
    if (charts.model) {
        charts.model.destroy();
    }
    
    const colors = [
        '#007AFF', '#FF3B30', '#34C759', '#FF9500', '#5AC8FA',
        '#AF52DE', '#FF2D55', '#5856D6', '#FFCC00', '#FF6482'
    ];
    
    charts.model = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors.slice(0, labels.length),
                borderWidth: 4,
                borderColor: 'rgba(255, 255, 255, 0.8)',
                hoverBorderWidth: 6,
                hoverBorderColor: 'white'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 11,
                            weight: 500,
                            family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                        },
                        color: '#1d1d1f',
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 10,
                        boxHeight: 10
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 13,
                        weight: 600,
                        family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                    },
                    bodyFont: {
                        size: 12,
                        family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                    },
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value.toLocaleString()} 대 (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// 전체 디스플레이 업데이트
function updateDisplay() {
    const data = getFilteredData();
    const companyData = aggregateByCompany(data);
    
    // 기간 정보 업데이트
    document.getElementById('periodInfo').textContent = getPeriodText();
    
    // 제조사 순위 표시
    displayCompanyRanking(companyData);
    
    // 요약 통계 업데이트
    updateSummaryStats(companyData);
    
    // 제조사별 차트 업데이트
    updateCompanyChart(companyData);
    
    // 연도별 순위 변화 차트 업데이트
    updateRankingTrendChart();
    
    // 차종별 정보 업데이트 (선택된 제조사가 있으면 해당 제조사, 없으면 전체)
    if (selectedCompany) {
        // 현재 기간에 해당 제조사 데이터가 있는지 확인
        const hasData = companyData.some(item => item.company === selectedCompany);
        if (hasData) {
            displayModelDetails(selectedCompany);
            updateModelChart(selectedCompany);
        } else {
            // 데이터가 없으면 초기화
            selectedCompany = null;
            const t = translations[currentLang];
            document.getElementById('selectedCompanyInfo').textContent = t.selectCompany;
            document.getElementById('modelHeader').style.display = 'none';
            document.getElementById('modelList').innerHTML = `
                <div class="empty-state">
                    <p>${t.emptyState}</p>
                </div>
            `;
            
            // 빈 차트 표시
            if (charts.model) {
                charts.model.destroy();
            }
        }
    } else {
        // 선택된 제조사가 없을 때 - 전체 차종 순위 표시
        displayModelDetails(null);
        updateModelChart(null);
    }
}
