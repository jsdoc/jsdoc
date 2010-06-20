/**
	@overview Schema for validating JSON produced by JSDoc Toolkit.
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
	@see <http://tools.ietf.org/html/draft-zyp-json-schema-02>
 */

var jsdoc = jsdoc || {};
jsdoc.schema = (typeof exports === 'undefined')? {} : exports; // like commonjs

jsdoc.schema.jsdocSchema = {
   "properties": {
		"doc": {
			"items": {
				"type": "object",
				"properties": {
					"path": {
						"type": "string",
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
						"enum": ["constructor", "module", "event", "namespace", "method", "member", "enum"]
					},
					"meta": {
						"file": {
							"type": "string",
							"optional": true,
							"maxItems": 1
						},
						"line": {
							"type": "string",
							"optional": true,
							"maxItems": 1
						},
						"optional": true,
						"maxItems": 1
					}
				}
			}
		},
		"meta": {
			"optional": true,
			"date": {
				"type": "string",
				"maxItems": 1
			}
		}
	}
};