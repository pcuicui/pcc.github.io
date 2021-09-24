const path = require('path')
const glob = require('glob')
const docsDir = path.join(__dirname, '../')
const _cache = []

// 仅支持到dir下的1层目录
function getSidebar({dir = '/', pattern = '**/*.md'} = {}) {
  let sidebar = []
  glob
    .sync(pattern, {
      cwd: path.join(docsDir, `.${dir}`),
    })
    .forEach(ctrPath => {
      const parentDir = path.dirname(ctrPath)
      ctrPath = ctrPath.replace(/([/\\]?README)?\.md$/, '')
      if(parentDir !== '.') {
        if(_cache.includes(parentDir)) {
          return
        }
        _cache.push(parentDir)
        const paths = `${dir}${parentDir}/`
        const children = getSidebar({dir: paths})
        sidebar.push({
          title: parentDir,
          collapsable: false,
          sidebarDepth: 2,
          path: paths,
          children: children.length === 1 && children[0] === paths ? [] : children,
        })
      } else {
        if(!ctrPath) {
          sidebar.unshift(dir)
        } else {
          sidebar.push(dir + ctrPath)
        }
      }
    })
  return sidebar
}

module.exports = {
  base: '',
  title: '',
  description: '',
  dest: 'dist',
  themeConfig: {
    displayAllHeaders: true,
    sidebarDepth: 2,
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: {
      // "/工程/": getSidebar({dir: '/工程/', pattern: '**/*.md'}),
      "/": getSidebar({dir: '/', pattern: '**/*.md'}),
    },
  }
}
