import os
import pandas as pd
import numpy as np
import json
from pymongo import MongoClient
from dotenv import load_dotenv

# 상위 폴더를 base directory로 설정
BASEDIR = os.path.abspath(os.path.dirname(__file__))
BASEDIR = BASEDIR[:BASEDIR.rfind('/')]

# .env 파일 경로 설정
load_dotenv(os.path.join(BASEDIR, 'back/.env'))

# michelin_muglang db에 연결
file = os.path.join(BASEDIR, "data/michelin_my_maps.csv")
mongodb = os.getenv("MONGODB_URL")
connection = MongoClient(mongodb)
db = connection.michelin_muglang
print(db.restaurants)

data = pd.read_csv(file)
michelin = data
michelin.columns = ["name", "address", "location", "minPrice", "maxPrice", "currency",
       "cuisine", "longitude", "latitude", "phoneNumber", "url", "websiteUrl",
       "award"]
print(michelin.columns)

# cuisine을 String에서 Array로 변환 
michelin["cuisine"] = michelin["cuisine"].apply(lambda x:x.split(","))

# 주소에서 국가 추출
michelin["country"] = michelin["address"].apply(lambda x:x[x.rfind(",")+2:])
michelin["country"] = michelin["country"].replace({'China Mainland':'China', 'Taipei & Taichung':'Taiwan'})

# string -> int로 형변환(결측값 포함) // ["minPrice", "maxPrice"]
michelin["minPrice"] = michelin["minPrice"].fillna(-1)
michelin["minPrice"] = michelin["minPrice"].apply(lambda x:str(x).strip().replace(",", ""))
michelin["minPrice"] = michelin["minPrice"].astype('Int32')
michelin["minPrice"] = michelin["minPrice"].replace(-1, np.nan)

michelin["maxPrice"] = michelin["maxPrice"].fillna(-1)
michelin["maxPrice"] = michelin["maxPrice"].apply(lambda x:str(x).strip().replace(",", ""))
michelin["maxPrice"] = michelin["maxPrice"].astype('Int32')
michelin["maxPrice"] = michelin["maxPrice"].replace(-1, np.nan)

# float64 -> string으로 형변환(결측값 포함) // phoneNumber
michelin["phoneNumber"] = michelin["phoneNumber"].fillna(-1)
michelin["phoneNumber"] = michelin["phoneNumber"].apply(lambda x:'+'+str(int(x)))
michelin["phoneNumber"] = michelin["phoneNumber"].replace("+-1", np.nan)

print(michelin.dtypes)

dataJson = json.loads(michelin.to_json(orient="records"))
db.restaurants.insert_many(dataJson)

# restaurants["minPrice"] = restaurants[restaurants["minPrice"].notnull()].apply(lambda x:x.replace(",", "") if "," in x else x).astype(int)


# nullHeaders = ['minPrice', 'maxPrice', 'currency', 'phoneNumber', 'websiteUrl']

# for each in reader:
#     data = each

#     # 가격은 정수형으로 형변환
#     for header in toIntHeaders:
#         if data[header] == "":
#             break
#         # 가격에 존재하는 ,를 제거
#         if ',' in data[header]:
#             data[header] = data[header].replace(",", "")
#         data[header] = int(data[header])

#     print(data)
#     # 위도와 경도는 실수형으로 형변환
#     for header in toFloatHeaders:
#         data[header] = float(data[header])

#     # cuisine을 String에서 Array로 변환
#     data['cuisine'] = data['cuisine'].split(',')

#     # China Mainland를 China로 수정
#     if 'China' in data['address']:
#         data['address'] = data['address'].replace('China Mainland', 'China')

#     # 주소에서 국가 추출
#     address = data['address']
#     data['country'] = address[address.rfind(',') + 2:]

#     db.restaurants.insert_one(data)