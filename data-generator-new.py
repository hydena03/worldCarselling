# 연도별 실제 순위를 반영한 자동차 판매 데이터 생성기
# 출처: JATO Dynamics, Wikipedia, Tesla IR

import random

# 연도별 주요 모델 실제 판매량 (단위: 대)
yearly_top_models = {
    2021: {
        "Toyota Corolla": 1100000,
        "Ford F-Series": 900000,
        "Honda CR-V": 840000,
        "Toyota RAV4": 830000,
        "Tesla Model 3": 500000,
    },
    2022: {
        "Toyota Corolla": 1120000,
        "Ford F-Series": 910000,
        "Toyota RAV4": 890000,
        "Honda CR-V": 850000,
        "Tesla Model Y": 750000,
    },
    2023: {
        "Tesla Model Y": 1223000,
        "Toyota Corolla": 1100000,
        "Ford F-Series": 930000,
        "Toyota RAV4": 1075000,  # 내연+하이브리드 합계
        "Honda CR-V": 870000,
    },
    2024: {
        "Tesla Model Y": 1090000,
        "Toyota Corolla": 1105000,
        "Ford F-Series": 920000,
        "Honda CR-V": 880000,
        "BYD SONG": 750000,
    },
    2025: {  # 3분기 데이터 (9개월) - 연간 추정치의 75%
        "Tesla Model Y": 820000,
        "Toyota Corolla": 830000,
        "Hyundai-Kia Tucson": 645000,
        "Hyundai-Kia Sportage": 630000,
        "BYD SONG": 600000,
    }
}

# 전체 제조사 연간 판매량 (단위: 대)
company_totals = {
    2020: {"Toyota": 9528753, "Volkswagen": 9305427, "Hyundai-Kia": 6520000, "GM": 6830000, 
           "Stellantis": 6600000, "Ford": 4200000, "Honda": 4600000, "Nissan": 3900000, 
           "BYD": 200000, "Tesla": 499550, "Mercedes-Benz": 2160000, "BMW": 2250000},
    2021: {"Toyota": 9700000, "Volkswagen": 8600000, "Hyundai-Kia": 6700000, "GM": 6100000,
           "Stellantis": 6100000, "Ford": 4000000, "Honda": 4500000, "Nissan": 3800000,
           "BYD": 600000, "Tesla": 936172, "Mercedes-Benz": 2200000, "BMW": 2300000},
    2022: {"Toyota": 10100000, "Volkswagen": 8300000, "Hyundai-Kia": 6850000, "GM": 5950000,
           "Stellantis": 6150000, "Ford": 4200000, "Honda": 4100000, "Nissan": 3500000,
           "BYD": 1860000, "Tesla": 1313851, "Mercedes-Benz": 2040000, "BMW": 2400000},
    2023: {"Toyota": 10307395, "Volkswagen": 9239575, "Hyundai-Kia": 7302451, "GM": 6200000,
           "Stellantis": 6350000, "Ford": 4400000, "Honda": 4000000, "Nissan": 3400000,
           "BYD": 3020000, "Tesla": 1808581, "Mercedes-Benz": 2491600, "BMW": 2253835},
    2024: {"Toyota": 10500000, "Volkswagen": 9000000, "Hyundai-Kia": 7500000, "GM": 6300000,
           "Stellantis": 6200000, "Ford": 4400000, "Honda": 4000000, "Nissan": 3400000,
           "BYD": 3600000, "Tesla": 1790000, "Mercedes-Benz": 2400000, "BMW": 2300000},
    2025: {"Toyota": 8100000, "Volkswagen": 6900000, "Hyundai-Kia": 5850000, "GM": 4800000,
           "Stellantis": 4725000, "Ford": 3375000, "Honda": 3075000, "Nissan": 2625000,
           "BYD": 2850000, "Tesla": 1380000, "Mercedes-Benz": 1845000, "BMW": 1770000}
}

# 제조사별 주요 모델 비율
company_models = {
    "Toyota": {
        "Corolla": {"ratio": 0.082, "type": "세단"},
        "Corolla 하이브리드": {"ratio": 0.025, "type": "세단 하이브리드"},
        "RAV4": {"ratio": 0.038, "type": "SUV"},
        "RAV4 하이브리드": {"ratio": 0.047, "type": "SUV 하이브리드"},
        "Camry": {"ratio": 0.041, "type": "세단"},
        "Camry 하이브리드": {"ratio": 0.041, "type": "세단 하이브리드"},
        "Hilux": {"ratio": 0.070, "type": "픽업트럭"},
        "Corolla Cross": {"ratio": 0.059, "type": "SUV"},
        "기타": {"ratio": 0.597, "type": "기타"}
    },
    "Volkswagen": {
        "Golf": {"ratio": 0.15, "type": "해치백"},
        "Tiguan": {"ratio": 0.20, "type": "SUV"},
        "Passat": {"ratio": 0.12, "type": "세단"},
        "ID.4": {"ratio": 0.10, "type": "전기차"},
        "Polo": {"ratio": 0.12, "type": "해치백"},
        "기타": {"ratio": 0.31, "type": "기타"}
    },
    "Hyundai-Kia": {
        "Tucson": {"ratio": 0.114, "type": "SUV"},
        "Tucson 하이브리드": {"ratio": 0.029, "type": "SUV 하이브리드"},
        "Sportage": {"ratio": 0.112, "type": "SUV"},
        "Sportage 하이브리드": {"ratio": 0.022, "type": "SUV 하이브리드"},
        "Elantra": {"ratio": 0.12, "type": "세단"},
        "아이오닉5": {"ratio": 0.08, "type": "전기차"},
        "EV6": {"ratio": 0.06, "type": "전기차"},
        "기타": {"ratio": 0.463, "type": "기타"}
    },
    "GM": {
        "Silverado": {"ratio": 0.25, "type": "픽업트럭"},
        "Equinox": {"ratio": 0.15, "type": "SUV"},
        "Buick": {"ratio": 0.20, "type": "세단"},
        "Wuling": {"ratio": 0.25, "type": "소형차"},
        "기타": {"ratio": 0.15, "type": "기타"}
    },
    "Stellantis": {
        "Jeep Grand Cherokee": {"ratio": 0.12, "type": "SUV"},
        "Jeep Wrangler": {"ratio": 0.10, "type": "SUV"},
        "Ram 1500": {"ratio": 0.21, "type": "픽업트럭"},
        "Peugeot 208": {"ratio": 0.15, "type": "해치백"},
        "Fiat Panda": {"ratio": 0.13, "type": "해치백"},
        "기타": {"ratio": 0.29, "type": "기타"}
    },
    "Ford": {
        "F-Series": {"ratio": 0.209, "type": "픽업트럭"},
        "Escape": {"ratio": 0.094, "type": "SUV"},
        "Escape 하이브리드": {"ratio": 0.045, "type": "SUV 하이브리드"},
        "Explorer": {"ratio": 0.072, "type": "SUV"},
        "Explorer 하이브리드": {"ratio": 0.029, "type": "SUV 하이브리드"},
        "Mustang Mach-E": {"ratio": 0.05, "type": "전기차"},
        "기타": {"ratio": 0.501, "type": "기타"}
    },
    "Honda": {
        "CR-V": {"ratio": 0.168, "type": "SUV"},
        "CR-V 하이브리드": {"ratio": 0.059, "type": "SUV 하이브리드"},
        "Civic": {"ratio": 0.165, "type": "세단"},
        "Accord": {"ratio": 0.124, "type": "세단"},
        "Accord 하이브리드": {"ratio": 0.031, "type": "세단 하이브리드"},
        "HR-V": {"ratio": 0.12, "type": "SUV"},
        "기타": {"ratio": 0.333, "type": "기타"}
    },
    "Nissan": {
        "Sentra": {"ratio": 0.20, "type": "세단"},
        "Rogue": {"ratio": 0.22, "type": "SUV"},
        "X-Trail": {"ratio": 0.18, "type": "SUV"},
        "Ariya": {"ratio": 0.05, "type": "전기차"},
        "기타": {"ratio": 0.35, "type": "기타"}
    },
    "BYD": {
        "Seagull": {"ratio": 0.25, "type": "전기차"},
        "SONG": {"ratio": 0.208, "type": "전기차"},
        "Seal": {"ratio": 0.18, "type": "전기차"},
        "Dolphin": {"ratio": 0.15, "type": "전기차"},
        "Han": {"ratio": 0.10, "type": "전기차"},
        "기타": {"ratio": 0.112, "type": "기타"}
    },
    "Tesla": {
        "Model Y": {"ratio": 0.609, "type": "전기차"},
        "Model 3": {"ratio": 0.328, "type": "전기차"},
        "Model S/X": {"ratio": 0.063, "type": "전기차"}
    },
    "Mercedes-Benz": {
        "C-Class": {"ratio": 0.20, "type": "세단"},
        "C-Class 하이브리드": {"ratio": 0.05, "type": "세단 하이브리드"},
        "E-Class": {"ratio": 0.18, "type": "세단"},
        "E-Class 하이브리드": {"ratio": 0.04, "type": "세단 하이브리드"},
        "GLC": {"ratio": 0.15, "type": "SUV"},
        "GLE": {"ratio": 0.12, "type": "SUV"},
        "EQE": {"ratio": 0.04, "type": "전기차"},
        "EQS": {"ratio": 0.03, "type": "전기차"},
        "기타": {"ratio": 0.19, "type": "기타"}
    },
    "BMW": {
        "3 Series": {"ratio": 0.18, "type": "세단"},
        "3 Series 하이브리드": {"ratio": 0.04, "type": "세단 하이브리드"},
        "5 Series": {"ratio": 0.16, "type": "세단"},
        "5 Series 하이브리드": {"ratio": 0.04, "type": "세단 하이브리드"},
        "X3": {"ratio": 0.14, "type": "SUV"},
        "X5": {"ratio": 0.12, "type": "SUV"},
        "i4": {"ratio": 0.05, "type": "전기차"},
        "iX": {"ratio": 0.05, "type": "전기차"},
        "기타": {"ratio": 0.22, "type": "기타"}
    }
}

# 월별 계절성 지수 (합계 = 12)
seasonal_factors = {
    1: 0.85,   # 1월 - 낮음
    2: 0.80,   # 2월 - 가장 낮음
    3: 0.95,   # 3월 - 분기말
    4: 0.90,   # 4월
    5: 0.95,   # 5월
    6: 1.05,   # 6월 - 분기말
    7: 0.95,   # 7월
    8: 1.00,   # 8월
    9: 1.10,   # 9월 - 분기말
    10: 1.05,  # 10월
    11: 1.10,  # 11월
    12: 1.30   # 12월 - 연말 성수기
}

# JavaScript 배열 생성
print("const salesData = [")

# 연도별 데이터 생성
for year in [2020, 2021, 2022, 2023, 2024, 2025]:
    # 2025년은 3분기까지 (1-9월)
    max_month = 10 if year == 2025 else 13
    
    for month in range(1, max_month):
        month_str = f"{month:02d}"
        factor = seasonal_factors[month]
        
        for company in company_totals[year].keys():
            total_sales = company_totals[year][company]
            months_in_year = 9 if year == 2025 else 12
            monthly_base = total_sales / months_in_year
            monthly_total = monthly_base * factor
            
            if company in company_models:
                for model, model_data in company_models[company].items():
                    ratio = model_data["ratio"]
                    vehicle_type = model_data["type"]
                    
                    # 특정 모델에 대한 조정 (실제 순위 반영)
                    sales = int(monthly_total * ratio)
                    
                    # 주요 모델 실제 판매량 조정
                    if year in yearly_top_models:
                        full_model_name = f"{company} {model}" if company != "Toyota" and company != "Ford" and company != "Honda" and company != "BYD" else model
                        
                        # Tesla Model Y 조정
                        if company == "Tesla" and model == "Model Y" and year in yearly_top_models:
                            if "Tesla Model Y" in yearly_top_models[year]:
                                yearly_target = yearly_top_models[year]["Tesla Model Y"]
                                sales = int((yearly_target / months_in_year) * factor)
                        
                        # Toyota Corolla 조정 (일반 + 하이브리드 합산)
                        elif company == "Toyota" and model == "Corolla" and "Toyota Corolla" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Toyota Corolla"]
                            # 일반 코롤라는 약 77% (하이브리드 23%)
                            sales = int((yearly_target * 0.77 / months_in_year) * factor)
                        elif company == "Toyota" and model == "Corolla 하이브리드" and "Toyota Corolla" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Toyota Corolla"]
                            sales = int((yearly_target * 0.23 / months_in_year) * factor)
                        
                        # Ford F-Series 조정
                        elif company == "Ford" and model == "F-Series" and "Ford F-Series" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Ford F-Series"]
                            sales = int((yearly_target / months_in_year) * factor)
                        
                        # Honda CR-V 조정 (일반 + 하이브리드)
                        elif company == "Honda" and model == "CR-V" and "Honda CR-V" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Honda CR-V"]
                            sales = int((yearly_target * 0.74 / months_in_year) * factor)
                        elif company == "Honda" and model == "CR-V 하이브리드" and "Honda CR-V" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Honda CR-V"]
                            sales = int((yearly_target * 0.26 / months_in_year) * factor)
                        
                        # Toyota RAV4 조정 (일반 + 하이브리드)
                        elif company == "Toyota" and model == "RAV4" and "Toyota RAV4" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Toyota RAV4"]
                            sales = int((yearly_target * 0.45 / months_in_year) * factor)
                        elif company == "Toyota" and model == "RAV4 하이브리드" and "Toyota RAV4" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Toyota RAV4"]
                            sales = int((yearly_target * 0.55 / months_in_year) * factor)
                        
                        # Tesla Model 3 조정
                        elif company == "Tesla" and model == "Model 3" and "Tesla Model 3" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Tesla Model 3"]
                            sales = int((yearly_target / months_in_year) * factor)
                        
                        # BYD SONG 조정
                        elif company == "BYD" and model == "SONG" and "BYD SONG" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["BYD SONG"]
                            sales = int((yearly_target / months_in_year) * factor)
                        
                        # Hyundai-Kia Tucson 조정
                        elif company == "Hyundai-Kia" and model == "Tucson" and "Hyundai-Kia Tucson" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Hyundai-Kia Tucson"]
                            sales = int((yearly_target * 0.797 / months_in_year) * factor)
                        elif company == "Hyundai-Kia" and model == "Tucson 하이브리드" and "Hyundai-Kia Tucson" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Hyundai-Kia Tucson"]
                            sales = int((yearly_target * 0.203 / months_in_year) * factor)
                        
                        # Hyundai-Kia Sportage 조정
                        elif company == "Hyundai-Kia" and model == "Sportage" and "Hyundai-Kia Sportage" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Hyundai-Kia Sportage"]
                            sales = int((yearly_target * 0.836 / months_in_year) * factor)
                        elif company == "Hyundai-Kia" and model == "Sportage 하이브리드" and "Hyundai-Kia Sportage" in yearly_top_models.get(year, {}):
                            yearly_target = yearly_top_models[year]["Hyundai-Kia Sportage"]
                            sales = int((yearly_target * 0.164 / months_in_year) * factor)
                    
                    if sales > 0:
                        print(f'  {{ date: "{year}-{month_str}", company: "{company}", model: "{model}", vehicleType: "{vehicle_type}", sales: {sales} }},')

print("];")

# 검증 출력
print("\n// ============ 연도별 주요 모델 검증 ============")
for year, models in yearly_top_models.items():
    months = 6 if year == 2025 else 12
    print(f"// {year}년 ({months}개월):")
    for model, target in models.items():
        print(f"//   {model}: 목표 {target:,}대 (월평균 {target//months:,}대)")

print("\n// ============ 제조사별 연간 판매량 ============")
for year, companies in company_totals.items():
    months = 6 if year == 2025 else 12
    print(f"// {year}년 ({months}개월):")
    for company, total in companies.items():
        print(f"//   {company}: {total:,}대 (월평균 {total//months:,}대)")

