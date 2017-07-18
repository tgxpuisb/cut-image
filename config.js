const md5 = require('md5')
const appId = 0
const space = ''
const appKey = ''
const crop = ''
const rotate = ''

var formData = {
	appId,
	space,
	quality: 70
}

if (crop) {
	formData.crop = crop
}

if (rotate) {
	formData.rotate = rotate
}

// 出于安全考虑,隐去上传图片签名算法

module.exports = formData