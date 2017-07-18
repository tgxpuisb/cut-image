const fs = require('fs')
const formData = require('./config.js')
const request = require('request')

const UPLOAD_IMAGE_URL = 'http://open.hmp2.fi.beibei.com/system/img/uploadFile'

module.exports = function uploadImage (file) {
	return new Promise((resolve, reject) => {
		request.post({
			url: UPLOAD_IMAGE_URL,
			formData: {
				...formData,
				file: fs.createReadStream(file)
			},
			json: true
		}, (err, httpResponse, body) => {
			if (err) {
				reject(err)
			} else {
				resolve(body)
			}
		})
	})
}