import datetime as dt
import requests

BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
API_KEY = 'caab6267314b8e6ea84310000bb625d5'
CITY = 'Mumbai'

url = BASE_URL + "appid=" + API_KEY + "&q=" + CITY + "&units=metric"

response = requests.get(url).json()

print("Date:", dt.datetime.fromtimestamp(response['dt']))
print("Weather:", response['weather'][0]['main'])
print('Current Temperature:', response['main']['temp'], '°C')
print("Feels Like:", response['main']['feels_like'], '°C')
print("Min Temperature:", response['main']['temp_min'], '°C')
print("Max Temperature:", response['main']['temp_max'], '°C')
print('Current Humidity:', str(response['main']['humidity']) + '%')
print('Current Pressure:', response['main']['pressure'], "hPa")
print("Visibility", response['visibility'], 'm')
print("Wind Speed:", response['wind']['speed'], 'm/s')
print("Wind Direction:", str(response['wind']['deg']) + '°')
print("Clouds:", str(response['clouds']['all']) + '%')
print("Sunrise:", dt.datetime.fromtimestamp(response['sys']['sunrise']))
print("Sunset:", dt.datetime.fromtimestamp(response['sys']['sunset']))
print("Timezone:", dt.datetime.fromtimestamp(response['timezone']))