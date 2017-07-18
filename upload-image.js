const fs = require('fs')
const formData = require('./config.js')
const request = require('request')


module.exports = function uploadImage (url, file) {
	return new Promise((resolve, reject) => {
		request.post({
			url: url,
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