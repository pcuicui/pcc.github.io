# a标签下载文件

a标签的download属性

```js
function downloadImg(imgURL) {
  const MIME_TYPE = 'image/png'
  let dlLink = document.createElement('a')
  dlLink.download = 'downloadFilename'
  dlLink.href = imgURL // base64的
  // dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

  document.body.appendChild(dlLink)
  dlLink.click()
  document.body.removeChild(dlLink)
}

function img2Base64(img) {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0,0,img.width,img.height)
  const dataURL = canvas.toDataURL('image/png')
  return dataURL
}

function getImgBase64(imgUrl, cb) {
  const img = new Image()
  img.src = imgUrl
  img.crossOrigin = 'anonymous'
  img.onload = function() {
    const base64 = img2Base64(img)
    cb && cb(base64)
  }
}

getImgBase64('https://s1.wacdn.com/wis/540/c40fb8f05d1fd786_800x800.png', downloadImg)

// 图片服务器方不允许跨域请求
getImgBase64('https://wework.qpic.cn/bizmail/T018FwpmBoEbwfzjXcjSBiaRZJJ6vYFRzCEEeFeicXMsP7UtbiaxWgicGw/0', downloadImg)


```


