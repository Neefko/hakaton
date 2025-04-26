import requests
testAPI = 'http://192.168.0.112:5000/login'
response = requests.post(testAPI, json={
  "name": "testuser",
  "password": "qwerty123"
})

print(response.status_code)
print(response.json())