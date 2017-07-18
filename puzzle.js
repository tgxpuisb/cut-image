const fs = require('fs')
const PSD = require('psd')
const uploadImage = require('./upload-image.js')

const PSD_PATH = './puzzle.psd'
const UPLOAD_IMAGE_URL = 'http://open.hmp2.fi.beibei.com/system/img/uploadFile'

function getPSDTree (path) {
	const psd = PSD.fromFile(path)
	psd.parse()
	return psd.tree()
}

function saveAsPng(layer, savePath) {
	return new Promise((resolve, reject) => {
		layer.saveAsPng(savePath)
			.then(() => {
				resolve()
			})
			.catch(() => {
				reject()
			})
	})
}

(async function getPuzzleConfig (path) {
	try {
		const tree = getPSDTree(path)
		const treeData = tree.export()

		let puzzles = []
		const puzzlesData = treeData.children.filter(v => {
			return v.type === 'group'
		})
		for (let index = 0; index < puzzlesData.length; index++) {
			const value = puzzlesData[index]
			// thumb 上传
			const thumbTmpPath = `./image_tmp/thumb-${index}.png`
			await saveAsPng(tree.childrenAtPath(`${value.name}/thumb`)[0], thumbTmpPath)
			const thumb = await uploadImage(UPLOAD_IMAGE_URL, thumbTmpPath)
			console.log(thumb)

			// cover(background)上传
			const backgroundTmpPath = `./image_tmp/background-${index}.png`
			await saveAsPng(tree.childrenAtPath(`${value.name}/cover`)[0], backgroundTmpPath)
			const background = await uploadImage(UPLOAD_IMAGE_URL, backgroundTmpPath)
			console.log(background)

			const pieces = value.children[2].children.map(({bottom, left, top, right}) => {
				return {bottom, left, top, right}
			})

			puzzles.push({
				thumb,
				background,
				pieces,
				pic_count: pieces.length,
				width: value.width,
				height: value.height
			})
		}

		fs.writeFileSync('./puzzles-result.json', JSON.stringify(puzzles, undefined, 4))

	} catch (e) {
		console.log(e)
	}
})(PSD_PATH)