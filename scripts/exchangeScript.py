import os
import pandas as pd
import json
from pymongo import MongoClient
from dotenv import load_dotenv

# 상위 폴더를 base directory로 설정
BASEDIR = os.path.abspath(os.path.dirname(__file__))
BASEDIR = BASEDIR[:BASEDIR.rfind('/')]

# .env 파일 경로 설정
load_dotenv(os.path.join(BASEDIR, 'back/.env'))

# michelinMuglang db에 연결
file = os.path.join(BASEDIR, "data/exchange_rates.csv")
mongodb = os.getenv("MONGODB_URL")
client = MongoClient(mongodb)
db = client.michelinMuglang

data = pd.read_csv(file)
currencyExchange = data

# 불필요한 column들 제거 // ["Unnamed: 0", "Country/Currency"]
currencyExchange = currencyExchange.drop(columns=["Unnamed: 0", "Country/Currency"])

# 가장 최신 데이터만 남기고 나머지 제거
currencyExchange = currencyExchange.drop_duplicates(["currency"], keep="last")

dataJson = json.loads(currencyExchange.to_json(orient="records"))

if "currencies" in db.list_collection_names():
       db.currencies.drop()
       print("collection has been dropped")

db.currencies.insert_many(dataJson)