module.exports = function(grunt) {
	require('jit-grunt')(grunt);

	template = '../templates/bakeproject/';
	content = template + 'build/html/content.json'; // multilingual content

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		bake: {
			main: {
				options: {
					content: content,
				//	section: "en",
					section: function(){
						var cont = grunt.file.readJSON(content);
						var lang = cont.cur_section !== undefined ? cont.cur_section : "en";

						return lang;
					},
					addPath: "section_", //"section" - special string, section==options.section
				},
				files: [
					{
						cwd: template + 'build/html/',
						src: ['*.html', '! _*.html'],
						dest: template,
						expand: true,
					},
				]
			},
		},

		watch: {
			html: {
				files: [template + 'build/html/*.html', template + 'build/html/content.json'],
				tasks: ['bake:main'],
				options: {
					spawn: false,
					event: ['added', 'changed'],
				},
			},
		},

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bake');

	grunt.registerTask('dev', ['watch']);
	grunt.registerTask('ba', ['bake:main',]);
	grunt.registerTask('default', 'dev');
};