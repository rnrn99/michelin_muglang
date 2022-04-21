import pandas as pd
import numpy as np
import sys
import os

dir = os.path.dirname(os.path.realpath(__file__))
# data = dir + '/data/worldometer_coronavirus_daily_data.csv'
data = pd.read_csv(dir + "/data/worldometer_coronavirus_daily_data.csv")
covid = data # 혹시 모를 상황을 대비하여 데이터 복사
print(covid.head())
# print(covid[0])