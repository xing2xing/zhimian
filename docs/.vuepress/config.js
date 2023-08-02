module.exports = {
  title: '醒醒同学',
  description: '醒醒同学',
  head: [ 
    ['link', { rel: 'icon', href: '/images/logo.jpg' }],
  ],
  base: '/gallup/', 
  markdown: {
    lineNumbers: false 
  },
  themeConfig: {
    logo:'/images/logo.jpg',
    nav: require('./nav'),
	sidebar: require('./sidebar_config.json'),
	sidebarDepth: 1
  }
};
