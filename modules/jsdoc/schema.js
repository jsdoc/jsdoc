/**
	@overview Schema for validating JSON produced by JSDoc Toolkit.
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
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
						"type": "string"
					},
					"name": {
						"type": "string"
					},
					"memberof": {
						"type": "string",
						"optional": true
					},
					"denom": {
						"type": "string",
						"enum": ["constructor", "module", "event", "namespace", "method", "member", "function", "variable", "enum"]
					},
					"meta": {
						"file": {
							"type": "string"
						},
						"line": {
							"type": "string"
						}
					}
				}
			}
		},
		"meta": {
			"optional": true,
			"date": {
				"type": "string"
			}
		}
	}
};