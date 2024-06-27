import datetime as dt
import requests

BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?"
API_KEY = 'caab6267314b8e6ea84310000bb625d5'
CITY = 'Mumbai'

url = BASE_URL + "appid=" + API_KEY + "&q=" + CITY + "&units=metric"

response = requests.get(url).json()

i = 0
while(i < len(response['list'])):
    print("Date:", dt.datetime.fromtimestamp(response['list'][i]['dt']))
    print("Weather:", response['list'][i]['weather'][0]['main'])
    print("Min Temperature:", response['list'][i]['main']['temp_min'], '°C')
    print("Max Temperature:", response['list'][i]['main']['temp_max'], '°C')
    print('Humidity:', str(response['list'][i]['main']['humidity']) + '%')
    print('Pressure:', response['list'][i]['main']['pressure'], "hPa")
    print("Wind Speed:", response['list'][i]['wind']['speed'], 'm/s')
    print("Wind Direction:", str(response['list'][i]['wind']['deg']) + '°')
    print("Clouds:", str(response['list'][i]['clouds']['all']) + '%')
    print("Visibility:", response['list'][i]['visibility'], 'm')
    print("Probability of Precipitation:", str(response['list'][i]['pop'] * 100) + '%')
    print()
    print("***********************************************************************************")
    print()
    i += 8