import Taro from '@tarojs/taro'

let baseUrl
let envVer = Taro.getAccountInfoSync().miniProgram.envVersion
console.log(envVer)

switch (envVer) {
  case 'develop':
    // baseUrl = 'https://127.0.0.1:8000/'
    // baseUrl = 'http://localhost:8000/'
    baseUrl = 'https://subao.itove.com/'
    break
  case 'trial':
    baseUrl = 'https://subao.itove.com/'
    break
  case 'release':
    baseUrl = 'https://subao.itove.com/';
    break
}

export const Env = {
  baseUrl: baseUrl,
  apiUrl: baseUrl + 'api/',
  imgUrl: baseUrl + 'img/',
  storageKey: 'user',
  ver: '0.1.0'
}
