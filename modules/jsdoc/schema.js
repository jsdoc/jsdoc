/**
	@overview Schema for validating JSON produced by JSDoc Toolkit.
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
	@see <http://tools.ietf.org/html/draft-zyp-json-schema-02>
 */

exports.jsdocSchema = {
   "properties": {
		"doc": {
			"type": "array",
			"items": {
				"type": "object",
				"properties": {
					"path": { // unique identifier for each doc
						"type": "string",
						"maxItems": 1
					},
					"desc": { // a description
						"type": "string",
						"optional": true,
						"maxItems": 1
					},
					"name": { // probably a trailing substring of the path
						"type": "string",
						"maxItems": 1
					},
					"scope": { // how is this symbol attached to it's enclosing scope?
						"type": "string",
						"maxItems": 1,
						"enum": ["global", "static", "instance", "inner"]
					},
					"memberof": { // probably a leading substring of the path
						"type": "string",
						"optional": true,
						"maxItems": 1
					},
					"kind": { // what kind of symbol is this?
						"type": "string",
						"maxItems": 1,
						"enum": ["constructor", "module", "event", "namespace", "method", "property", "enum", "class", "interface", "constant", "mixin", "file", "version"]
					},
					"refersto": { // the path to another doc: this doc is simply a renamed alias to that
						"type": "string",
						"optional": true,
						"maxItems": 1
					},
					"access": { // what access priviledges are allowed
						"type": "string",
						"optional": true,
						"maxItems": 1,
						"enum": ["private", "protected", "public"]
					},
					"attrib": { // other attributes, like "readonly"
						"type": "string",
						"optional": true,
					},
					"type": { // what type is the value that this doc is associated with, like "number"
						"type": ["string", "array"],
						"optional": true,
						"items": {
							"type": "string"
						}
					},
					"param" : { // are there function parameters associated with this doc?
						"type": "array",
						"optional": true,
						"items": {
							"type": "object",
							"properties": {
								"type": { // what are the types of value expected for this parameter?
									"type": "array",
									"optional": true,
									"items": {
										"type": "string"
									}
								},
								"isoptional": { // is a value for this parameter optional?
									"type": "boolean",
									"optional": true,
									"default": true
								},
								"isnullable": { // can the value for this parameter be null?
									"type": "boolean",
									"optional": true,
									"default": true
								},
								"defaultvalue": { // what is the default value for this parameter?
									"type": "string",
									"optional": true
								},
								"name": { // what name does this parameter have within the function?
									"type": "string"
								},
								"desc": { // a description of the parameter
									"type": "string",
									"optional": true
								}
							}
						}
					},
					"tag": { // arbitrary tags associated with this doc
						"type": "array",
						"optional": true,
						"items": {
							"type": "object",
							"properties": {
								"name": { // the name of a tag
									"type": "string"
								},
								"desc": { // a value associated with that tag name
									"type": "string",
									"optional": true
								}
							}
						}
					},
					"meta": { // information about this doc
						"type": "object",
						"optional": true,
						"maxItems": 1,
						"file": { // what is the name of the file this doc appears in?
							"type": "string",
							"optional": true,
							"maxItems": 1
						},
						"line": {  // on what line of the file does this doc appear?
							"type": "number",
							"optional": true,
							"maxItems": 1
						}
					}
				}
			}
		},
		"meta": { // information about the generation for all the docs
			"type": "object",
			"optional": true,
			"maxItems": 1,
			"project": { // to what project does this doc belong
				"type": "object",
				"optional": true,
				"maxItems": 1,
				"name": { // the name of the project
					"type": "string",
					"maxItems": 1
				},
				"uri": { // the URI of the project
					"type": "string",
					"maxItems": 1,
					"format": "uri"
				}
			},
			"generated": { // some information about the running of the doc generator
				"type": "object",
				"optional": true,
				"maxItems": 1,
				"date": { // on what date and time was the doc generated?
					"type": "string",
					"maxItems": 1,
					"optional": true,
					"format": "date-time"
				},
				"parser": { // what tool was used to generate the doc
					"type": "string",
					"maxItems": 1,
					"optional": true
				}
			}
		}
	}
};