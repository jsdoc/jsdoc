/**
	@overview Schema for validating JSON produced by JSDoc Toolkit.
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
	@see <http://tools.ietf.org/html/draft-zyp-json-schema-02>
 */

exports.jsdocSchema = {
   "properties": {
		"docnode": {
			"type": "array",
			"items": {
				"type": "object",
				"properties": {
					"path": {
						"type": "string",
						"maxItems": 1
					},
					"desc": {
						"type": "string",
						"optional": true,
						"maxItems": 1
					},
					"name": {
						"type": "string",
						"maxItems": 1
					},
					"memberof": {
						"type": "string",
						"optional": true,
						"maxItems": 1
					},
					"isa": {
						"type": "string",
						"maxItems": 1,
						"enum": ["constructor", "module", "event", "namespace", "method", "property", "enum", "class", "interface", "constant", "file"]
					},
					"access": {
						"type": "string",
						"optional": true,
						"maxItems": 1,
						"enum": ["private", "protected", "public"]
					},
					"scope": {
						"type": "string",
						"maxItems": 1,
						"enum": ["global", "static", "instance", "inner"]
					},
					"attrib": {
						"type": "string",
						"optional": true,
					},
					"api": {
						"type": "string",
						"optional": true
					},
					"type": {
						"type": "array",
						"optional": true,
						"items": {
							"type": "string"
						}
					},
					"param" : {
						"type": "array",
						"optional": true,
						"items": {
							"type": "object",
							"properties": {
								"type": {
									"type": "array",
									"optional": true,
									"items": {
										"type": "string"
									}
								},
								"isoptional": {
									"type": "boolean",
									"optional": true,
									"default": true
								},
								"isnullable": {
									"type": "boolean",
									"optional": true,
									"default": true
								},
								"defaultvalue": {
									"optional": true
								},
								"name": {
									"type": "string",
								},
								"desc": {
									"type": "string",
									"optional": true
								}
							}
						}
					},
					"meta": {
						"type": "object",
						"optional": true,
						"maxItems": 1,
						"file": {
							"type": "string",
							"optional": true,
							"maxItems": 1
						},
						"line": {
							"type": "number",
							"optional": true,
							"maxItems": 1
						},
						"category": {
							"type": "string",
							"optional": true,
							"maxItems": 1
						},
						"tags": {
							"type": "array",
							"optional": true,
							"items": {
								"type": "object",
								"properties": {
									"tagname": {
										"type": "string"
									},
									"tagtext": {
										"type": "string",
										"optional": true
									}
								}
							}
						}
					}
				}
			}
		},
		"meta": {
			"type": "object",
			"optional": true,
			"maxItems": 1,
			"project": {
				"type": "object",
				"optional": true,
				"maxItems": 1,
				"name": {
					"type": "string",
					"maxItems": 1
				},
				"uri": {
					"type": "string",
					"maxItems": 1,
					"format": "uri"
				}
			},
			"generated": {
				"type": "object",
				"optional": true,
				"maxItems": 1,
				"date": {
					"type": "string",
					"maxItems": 1,
					"optional": true,
					"format": "date-time"
				},
				"parser": {
					"type": "string",
					"maxItems": 1,
					"optional": true
				}
			}
		}
	}
};