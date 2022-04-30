import os
import pandas as pd
import numpy as np
import json
from pymongo import MongoClient, GEOSPHERE
from dotenv import load_dotenv
import requests
import csv

# 상위 폴더를 base directory로 설정
BASEDIR = os.path.abspath(os.path.dirname(__file__))
BASEDIR = BASEDIR[:BASEDIR.rfind('/')]

# .env 파일 경로 설정
load_dotenv(os.path.join(BASEDIR, 'back/.env'))

# michelinMuglang db에 연결
mongodb = os.getenv("MONGODB_URL")

googleApiKey = os.getenv("GOOGLE_API_KEY")
url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?key={googleApiKey}&type=restaurant&query="

client = MongoClient(mongodb)
db = client.michelinMuglang
col = db.restaurants

# col.update_many({}, {"$set": {"placeId": None}})

file = os.path.join(BASEDIR, "raw_data/michelin_my_maps.csv")
data = pd.read_csv(file)
michelin = data.copy()

michelin["query"] = michelin["Name"] + " " + michelin["Address"]
lenData = michelin.shape[0]

noPlaceId = [["index", "name", "address", "latitude", "longitude", "url"]]
noPlaceIdIndex = [56, 66, 67, 87, 97, 111, 187, 208, 209, 210, 228, 325, 362, 364, 365, 366, 367, 368, 379, 393, 417, 418, 419, 487, 506, 541, 573, 699, 702, 794, 881, 892, 950, 1059,1060, 1061, 1063, 1065, 1066, 1070, 1071, 1072, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1083, 1084, 1085, 1145, 1146, 1147, 1148, 1149, 1150, 1152, 1178, 1214, 1219, 1293, 1540, 1542, 1603, 1614, 1636, 1714, 1749, 1770, 1777, 1779, 1787, 1897, 1898, 1899, 1900, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1912, 1913, 1914, 1916, 1917, 1918, 1922, 1923, 1924, 1927, 1931, 1934, 1945, 1972, 2017, 2040, 2046, 2054, 2057, 2073, 2082, 2088, 2094, 2124, 2156, 2170, 2171, 2172, 2173, 2174, 2175, 2176, 2177, 2178, 2179, 2180, 2181, 2182, 2183, 2220, 2234, 2304, 2310, 2312, 2462, 2535, 2684, 2693, 2726, 2797, 2865, 2879, 2896, 2929, 2969, 3045, 3120, 3143, 3198, 3232, 3248, 3253, 3259, 3264, 3270, 3302, 3304, 3306, 3310, 3325, 3355, 3406, 3419, 3435, 3439, 3453, 3482, 3547, 3550, 3560, 3566, 3648, 3649, 3651, 3653, 3654, 3655, 3656, 3657, 3661, 3662, 3663, 3665, 3681, 3710, 3737, 3738, 3739, 3740, 3741, 3743, 3744, 3745, 3747, 3748, 3750, 3752, 3754, 3756, 3757, 3758, 3759, 3762, 3765, 3769, 3770, 3780, 3784, 3785, 3786, 3789, 3790, 3794, 3797, 3813, 3827, 3830, 3832, 3833, 3844, 3845, 3849, 3851, 3853, 3864, 3878, 3928, 3951, 3963, 4348, 4401, 4429, 4437, 4440, 4441, 4450, 4525, 4535, 4548, 4606, 4714, 4715, 4716, 4722, 4724, 4725, 4728, 4733, 4741, 4764, 4769, 4780, 4781, 4786, 4789, 4792, 4795, 4810, 4822, 4830, 4843, 4875, 4879, 4889, 4912, 4927, 4940, 4941, 5096, 5097, 5098, 5099, 5100, 5101, 5103, 5104, 5106, 5107, 5108, 5110, 5111, 5115, 5116, 5117, 5118, 5119, 5120, 5122, 5123, 5125, 5126, 5127, 5210, 5241, 5242, 5243, 5244, 5246, 5247, 5248, 5249, 5251, 5253, 5254, 5255, 5256, 5257, 5260, 5261, 5262, 5272, 5274, 5275, 5278, 5280, 5281, 5282, 5284, 5287, 5288, 5291, 5292, 5293, 5294, 5295, 5299, 5300, 5303, 5305, 5307, 5309, 5310, 5311, 5312, 5315, 5316, 5317, 5318, 5321, 5323, 5324, 5327, 5329, 5330, 5337, 5472, 5646, 5727, 5740, 5799, 5823, 5843, 5845, 5848, 5950, 5974, 6018, 6040, 6137, 6154, 6161, 6169, 6229, 6284, 6305, 6317, 6321, 6323, 6344, 6363, 6377, 6379, 6405, 6427]

for idx in noPlaceIdIndex:
    noPlaceId.append([idx, michelin["Name"][idx], michelin["Address"][idx], michelin["Latitude"][idx], michelin["Longitude"][idx], michelin["Url"][idx]])

# for i in range(211, lenData):
#     try:
#         if i in [56,66,67,87,97,111,187]:
#             continue
#         q = michelin["query"][i]
#         result = requests.get(url + q)
#         obj = json.loads(result.text)["results"][0]
#         place_id = None
#         if "place_id" in obj:
#             place_id = json.loads(result.text)["results"][0]["place_id"]
#         elif "place_pid" in obj:
#             place_id = json.loads(result.text)["results"][0]["place_id"]
#         col.find_one_and_update({"name": michelin["Name"][i]}, {"$set":{"placeId":place_id}})
#     except:
#         print(i)
#         print(q + " have no placeId")
#         noPlaceId.append([i, michelin["Name"][i], michelin["Address"][i]])

print(noPlaceId)

f = open("no_place_id_restaurants.csv", "w", newline="")
wr = csv.writer(f)
wr.writerows(noPlaceId)
f.close()