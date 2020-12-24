module.exports = {
    env: {
        es6: true,
        jasmine: true,
        node: true
    },

    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },

    rules: {
        // Possible errors
        'for-direction': 'error',
        'getter-return': 'error',
        'no-async-promise-executor': 'error',
        'no-await-in-loop': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': 'error',
        'no-console': 'off',
        'no-constant-condition': 'off',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-dupe-args': 'error',
        'no-dupe-else-if': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty': 'error',
        'no-empty-character-class': 'error',
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        'no-extra-parens': 'off',
        'no-extra-semi': 'error',
        'no-func-assign': 'error',
        'no-import-assign': 'error',
        'no-inner-declarations': ['error', 'functions'],
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-loss-of-precision': 'error',
        'no-misleading-character-class': 'error',
        'no-obj-calls': 'error',
        'no-prototype-builtins': 'error',
        'no-regex-spaces': 'error',
        'no-setter-return': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-unexpected-multiline': 'error',
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unsafe-optional-chaining': 'error',
        'no-useless-backreference': 'error',
        'require-atomic-updates': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error',

        // Best practices
        'accessor-pairs': 'error',
        'array-callback-return': 'error',
        'block-scoped-var': 'off',
        'class-methods-use-this': 'off',
        complexity: 'off', // TODO: enable
        'consistent-return': 'error',
        curly: ['error', 'all'],
        'default-case': 'error',
        'default-case-last': 'error',
        'default-param-last': 'error',
        'dot-location': ['error', 'property'],
        'dot-notation': 'error',
        eqeqeq: ['error', 'smart'],
        'grouped-accessor-pairs': 'error',
        'guard-for-in': 'error',
        'max-classes-per-file': 'off',
        'no-alert': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-constructor-return': 'off',
        'no-div-regex': 'error',
        'no-else-return': 'off',
        'no-empty-function': 'error',
        'no-empty-pattern': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-fallthrough': 'off', // disabled due to bug in ESLint
        'no-floating-decimal': 'error',
        'no-global-assign': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': 'off', // TODO: enable?
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-nonoctal-decimal-escape': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'off',
        'no-proto': 'error',
        'no-redeclare': 'error',
        'no-restricted-properties': 'off',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-concat': 'error',
        'no-useless-escape': 'error',
        'no-useless-return': 'error',
        'no-void': 'error',
        'no-warning-comments': 'off',
        'no-with': 'error',
        'prefer-named-capture-group': 'off', // TODO: enable
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': 'error',
        radix: 'error',
        'require-await': 'error',
        'require-unicode-regexp': 'off',
        'vars-on-top': 'off', // TODO: enable
        'wrap-iife': ['error', 'inside'],
        yoda: 'error',

        // Strict mode
        strict: ['error', 'global'],

        // Variables
        'init-declarations': 'off',
        'no-delete-var': 'error',
        'no-label-var': 'error',
        'no-restricted-globals': ['error', 'app', 'env'],
        'no-shadow': 'error',
        'no-shadow-restricted-names': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-undefined': 'off',
        'no-unused-vars': 'error',
        'no-use-before-define': 'error',

        // Stylistic issues
        'array-bracket-newline': 'off',
        'array-bracket-spacing': ['error', 'never'],
        'array-element-newline': 'off',
        'block-spacing': ['error', 'always'],
        'brace-style': 'off', // TODO: enable with "stroustrup" (or "1tbsp" + lots of cleanup)
        camelcase: 'error',
        'capitalized-comments': 'off',
        'comma-dangle': 'error',
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        'comma-style': ['error', 'last'],
        'computed-property-spacing': ['error', 'never'],
        'consistent-this': ['error', 'self'],
        'eol-last': 'error',
        'func-call-spacing': ['error', 'never'],
        'func-name-matching': ['error', 'always'],
        'func-names': 'off',
        'func-style': 'off',
        'function-call-argument-newline:': 'off',
        'function-paren-newline': 'off',
        'id-denylist': 'off',
        'id-length': 'off',
        'id-match': 'off',
        'implicit-arrow-linebreak': 'off',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'jsx-quotes': ['error', 'prefer-double'],
        'key-spacing': [
            'error',
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'line-comment-position': 'off',
        'linebreak-style': 'off',
        'lines-around-comment': 'off',
        'lines-between-class-members': 'off',
        'max-depth': 'off', // TODO: enable
        'max-len': 'off', // TODO: enable
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-nested-callbacks': 'off',
        'max-params': 'off', // TODO: enable
        'max-statements': 'off',
        'max-statements-per-line': 'off',
        'multiline-comment-style': 'off',
        'multiline-ternary': 'off',
        'new-cap': 'error',
        'new-parens': 'error',
        'newline-per-chained-call': 'off', // TODO: enable
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-continue': 'off',
        'no-inline-comments': 'off',
        'no-lonely-if': 'error',
        'no-mixed-operators': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-multi-assign': 'off',
        'no-multiple-empty-lines': [
            'error',
            {
                max: 2
            }
        ],
        'no-negated-condition': 'off',
        'no-nested-ternary': 'error',
        'no-new-object': 'error',
        'no-plusplus': 'off',
        'no-restricted-syntax': 'off',
        'no-tabs': 'error',
        'no-ternary': 'off',
        'no-trailing-spaces': 'error',
        'no-underscore-dangle': 'off',
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        'nonblock-statement-body-position': 'off',
        'object-curly-newline': 'off',
        'object-curly-spacing': 'off',
        'object-property-newline': 'error',
        'one-var': 'off',
        'one-var-declaration-per-line': 'error',
        'operator-assignment': 'off',
        'operator-linebreak': ['error', 'after'],
        'padded-blocks': ['error', 'never'],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: 'return'
            },
            {
                blankLine: 'always',
                prev: ['const', 'let', 'var'],
                next: '*'
            },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var'],
                next: ['const', 'let', 'var']
            }
        ],
        'prefer-exponentiation-operator': 'error',
        'prefer-object-spread': 'off',
        'quote-props': 'off',
        quotes: ['error', 'single', 'avoid-escape'],
        semi: ['error', 'always'],
        'semi-spacing': 'error',
        'semi-style': ['error', 'last'],
        'sort-keys': 'off',
        'sort-vars': 'off', // TODO: enable?
        'space-before-blocks': ['error', 'always'],
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always'
        }],
        'space-in-parens': 'off', // TODO: enable?
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': ['error', 'always'],
        'switch-colon-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],
        'template-tag-spacing': ['error', 'never'],
        'unicode-bom': ['error', 'never'],
        'wrap-regex': 'off',

        // ECMAScript 2015
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-parens': 'off',
        'arrow-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'constructor-super': 'error',
        'generator-star-spacing': [
            'error',
            {
                before: true,
                after: false
            }
        ],
        'no-class-assign': 'error',
        'no-confusing-arrow': 'error',
        'no-const-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-duplicate-imports': [
            'error',
            {
                includeExports: true
            }
        ],
        'no-new-symbol': 'error',
        'no-restricted-exports': 'off',
        'no-restricted-imports': 'off',
        'no-this-before-super': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'off',
        'no-useless-rename': 'error',
        'no-var': 'off', // TODO: enable
        'object-shorthand': 'off',
        'prefer-arrow-callback': 'off',
        'prefer-const': 'off',
        'prefer-destructuring': 'off',
        'prefer-numeric-literals': 'off',
        'prefer-rest-params': 'off',
        'prefer-spread': 'off',
        'prefer-template': 'off',
        'require-yield': 'error',
        'rest-spread-spacing': ['error', 'never'],
        'sort-imports': 'error',
        'symbol-description': 'error',
        'template-curly-spacing': ['error', 'never'],
        'yield-star-spacing': ['error', 'before']
    }
};
