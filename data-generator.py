# 실제 연간 판매량 기반 월별 데이터 생성기

# 2024년 실제 연간 판매량 (단위: 대)
companies_2024 = {
    "Toyota": {
        "total": 10500000,
        "models": {
            "Corolla": 0.20,  # 20%
            "RAV4": 0.25,     # 25%
            "Camry": 0.15,    # 15%
            "Hilux": 0.12,    # 12%
            "Corolla Cross": 0.10,  # 10%
            "기타": 0.18      # 18%
        }
    },
    "Volkswagen": {
        "total": 9000000,
        "models": {
            "Golf": 0.15,
            "Tiguan": 0.20,
            "Passat": 0.12,
            "ID.4": 0.10,
            "Polo": 0.12,
            "기타": 0.31
        }
    },
    "Hyundai-Kia": {
        "total": 7500000,
        "models": {
            "Tucson": 0.15,
            "Sportage": 0.14,
            "Elantra": 0.12,
            "아이오닉5": 0.08,
            "EV6": 0.06,
            "기타": 0.45
        }
    },
    "GM": {
        "total": 6300000,
        "models": {
            "Silverado": 0.25,
            "Equinox": 0.15,
            "Buick": 0.20,
            "Wuling": 0.25,
            "기타": 0.15
        }
    },
    "Ford": {
        "total": 4400000,
        "models": {
            "F-Series": 0.40,
            "Escape": 0.15,
            "Explorer": 0.12,
            "Mustang Mach-E": 0.05,
            "기타": 0.28
        }
    },
    "Honda": {
        "total": 4000000,
        "models": {
            "CR-V": 0.25,
            "Civic": 0.20,
            "Accord": 0.15,
            "HR-V": 0.12,
            "기타": 0.28
        }
    },
    "BYD": {
        "total": 3600000,
        "models": {
            "Seagull": 0.25,
            "Song Plus": 0.20,
            "Seal": 0.18,
            "Dolphin": 0.15,
            "Han": 0.10,
            "기타": 0.12
        }
    },
    "Tesla": {
        "total": 1790000,
        "models": {
            "Model Y": 0.58,  # 약 1,038,200대
            "Model 3": 0.36,  # 약 644,400대
            "Model S/X": 0.06 # 약 107,400대
        }
    }
}

# 차종 매핑
vehicle_types = {
    "Corolla": "세단",
    "RAV4": "SUV",
    "Camry": "세단",
    "Hilux": "픽업트럭",
    "Corolla Cross": "SUV",
    "Golf": "해치백",
    "Tiguan": "SUV",
    "Passat": "세단",
    "ID.4": "전기차",
    "Polo": "해치백",
    "Tucson": "SUV",
    "Sportage": "SUV",
    "Elantra": "세단",
    "아이오닉5": "전기차",
    "EV6": "전기차",
    "Silverado": "픽업트럭",
    "Equinox": "SUV",
    "Buick": "세단",
    "Wuling": "소형차",
    "F-Series": "픽업트럭",
    "Escape": "SUV",
    "Explorer": "SUV",
    "Mustang Mach-E": "전기차",
    "CR-V": "SUV",
    "Civic": "세단",
    "Accord": "세단",
    "HR-V": "SUV",
    "Seagull": "전기차",
    "Song Plus": "전기차",
    "Seal": "전기차",
    "Dolphin": "전기차",
    "Han": "전기차",
    "Model Y": "전기차",
    "Model 3": "전기차",
    "Model S/X": "전기차",
    "기타": "기타"
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

for month in range(1, 13):
    month_str = f"{month:02d}"
    factor = seasonal_factors[month]
    
    for company, data in companies_2024.items():
        monthly_total = (data["total"] / 12) * factor
        
        for model, ratio in data["models"].items():
            sales = int(monthly_total * ratio)
            vehicle_type = vehicle_types.get(model, "기타")
            
            # 기타는 여러 모델로 분산
            if model == "기타":
                vehicle_type = "기타"
            
            print(f'  {{ date: "2024-{month_str}", company: "{company}", model: "{model}", vehicleType: "{vehicle_type}", sales: {sales} }},')

print("];")

# 검증
print("\n// 검증:")
for company, data in companies_2024.items():
    print(f"// {company}: {data['total']:,}대 (월평균 {data['total']//12:,}대)")

