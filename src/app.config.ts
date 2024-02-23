export default defineAppConfig({
  pages: [
    'pages/node/index',
    'pages/pattern/index',
    'pages/pattern/edit',
    'pages/pattern/new',
    'pages/node/new',
    'pages/me/index',
    'pages/me/info',
    'pages/me/name',
    'pages/me/login',
    'pages/me/setting',
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    // custom: true,
    selectedColor: '#000000',
    list: [
      {
        "pagePath": "pages/node/index",
        "text": "模式",
        "iconPath": './icon/home.png',
        "selectedIconPath": './icon/home-fill.png'
      },
      {
        "pagePath": "pages/pattern/new",
        "iconPath": './icon/plus-circle.png',
        "selectedIconPath": './icon/plus-circle-fill.png'
      },
      {
        "pagePath": "pages/me/index",
        "text": "我",
        "iconPath": './icon/account.png',
        "selectedIconPath": './icon/account-fill.png'
      },
    ]
  }
})
