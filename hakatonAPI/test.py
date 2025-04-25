import requests
addBankAPI = "http://192.168.0.112:5000/addMoney?bank="
money = int(input())
response = requests.get(addBankAPI+f"{money}_3")