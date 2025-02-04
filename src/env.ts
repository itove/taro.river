import Taro from '@tarojs/taro'

let baseUrl
let envVer = Taro.getAccountInfoSync().miniProgram.envVersion
console.log(envVer)

switch (envVer) {
  case 'develop':
    // baseUrl = 'https://127.0.0.1:8000/'
    // baseUrl = 'http://localhost:8000/'
    baseUrl = 'https://192.168.122.1:8000/'
    // baseUrl = 'https://river.dev.itove.com/'
    break
  case 'trial':
    baseUrl = 'https://river.dev.itove.com/'
    break
  case 'release':
    baseUrl = 'https://river.itove.com/';
    break
}

export const Env = {
  baseUrl: baseUrl,
  apiUrl: baseUrl + 'api/',
  imagesUrl: baseUrl + 'images/',
  uploadUrl: baseUrl + 'api/media_objects',
  storageKey: 'user',
  ver: '0.1.0'
}
