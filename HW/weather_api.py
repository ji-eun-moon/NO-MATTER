import requests
from datetime import datetime
import xmltodict
import json
from apscheduler.schedulers.blocking import BlockingScheduler

def get_current_date_string():
    current_date = datetime.now().date()
    return current_date.strftime("%Y%m%d")

def get_current_hour_string():
    now = datetime.now()
    if now.minute<45:
        if now.hour==0:
            base_time = "2330"
        else:
            pre_hour = now.hour-1
            if pre_hour<10:
                base_time = "0" + str(pre_hour) + "30"
            else:
                base_time = str(pre_hour) + "30"
    else:
        if now.hour < 10:
            base_time = "0" + str(now.hour) + "30"
        else:
            base_time = str(now.hour) + "30"

    return base_time

keys = 'VMaJNJ0QS39K3leMESiDpMBnHheFqIYPtm%2FOlt4oN7f5rMrjK5zOxtw3%2BM22Nr2OkXZkolwsykH50toBFfaT9g%3D%3D'
url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'
params ={'serviceKey' : keys, 
         'pageNo' : '1', 
         'numOfRows' : '1000', 
         'dataType' : 'XML', 
         'base_date' : get_current_date_string(), 
         'base_time' : get_current_hour_string(), 
         'nx' : '55', 
         'ny' : '127' }

def forecast():
    res = requests.get(url, params = params)

    xml_data = res.text
    dict_data = xmltodict.parse(xml_data)

    weather_data = dict()
    for item in dict_data['response']['body']['items']['item']:
        if item['category'] == 'T1H':
            weather_data['tmp'] = item['fcstValue']
        if item['category'] == 'REH':
            weather_data['hum'] = item['fcstValue']
        if item['category'] == 'SKY':
            weather_data['wth'] = item['fcstValue']
    return weather_data

def save_to_json(data):
    with open('weather_data.json', 'w') as json_file:
        json.dump(data, json_file, indent=4)

def get_and_save_weather():
    weather_data = forecast()
    if weather_data:
        save_to_json(weather_data)

scheduler = BlockingScheduler()
scheduler.add_job(get_and_save_weather, 'interval', minutes=60)  # 60분마다 실행

try:
    print("Weather data collection started.")
    scheduler.start()
except KeyboardInterrupt:
    print("Weather data collection stopped.")
