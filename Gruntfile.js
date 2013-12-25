module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bumpup: {
            options: {
                updateProps: {
                    pkg: 'package.json'
                }
            },
            setters: {
                date: function(oldDate, releaseType, options) {
                    return oldDate;
                },
                version: function(oldVersion, releaseType, options) {
                    return oldVersion;
                },
                revision: function(oldVersion, releaseType, options) {
                    return String( Date.now() );
                }
            },
            files: [
                'package.json'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-bumpup');
    grunt.renameTask('bumpup', 'bump');

    grunt.registerTask('default', ['bump']);
};
