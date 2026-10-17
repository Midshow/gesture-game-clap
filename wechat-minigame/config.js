module.exports = {
	"origin": "https://hezhang.local",
	"entry": "/",
	"router": {
		"full": [
			{
				"regexp": "^\\/(?:\\/)?$",
				"options": "i"
			}
		]
	},
	"generate": {
		"worker": "common/workers"
	},
	"runtime": {
		"subpackagesMap": {},
		"tabBarMap": {},
		"usingComponents": {},
		"extraStyleList": [
			"gap",
			"backdrop-filter",
			"aspect-ratio"
		]
	},
	"pages": {
		"full": {
			"rem": true,
			"pageStyle": true
		}
	},
	"redirect": {},
	"optimization": {
		"elementMultiplexing": false
	}
}