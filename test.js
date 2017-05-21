"use strict"

const PSD = require('psd')
const fs = require('fs')

var psd = PSD.fromFile('./test.psd')
psd.parse()

let obj = psd.tree().export()
console.log(obj)

let target = {}

target.width = obj.document.width
target.height = obj.document.height
target.background = ''
target.thumb_img = ''

target.pieces = obj.children.find(v => {
	return v.type === 'group' && v.name === 'block'
}).children.map(({bottom, left, top, right}) => {
	return {
		left,
		top,
		right,
		bottom
	}
})

target.pic_count = target.pieces.length

fs.writeFileSync('./test.json', JSON.stringify(target))
// psd.image.saveAsPng('./s.png').then(() => {})
// let tree = psd.tree()


// console.log(tree.export())