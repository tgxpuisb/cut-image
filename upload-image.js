const fs = require('fs')
const request = require('request')
var formData = require('./config.js')

module.exports = function uploadImage (url, file) {
	return new Promise((resolve, reject) => {
		formData.file = {
			value: fs.createReadStream(file),
			options: {
				filename: file.replace(/.+\//g, ''),
				contentType: 'image/png'
			}
		}
		request.post({
			url: url,
			formData,
			json: true
		}, (err, httpResponse, body) => {
			if (err) {
				reject(err)
			} else {
				if (body.result && body.result.fullPath) {
					resolve(body.result.fullPath)
				} else {
					console.log('error')
					reject(body)
				}
			}
		})
	})
}
