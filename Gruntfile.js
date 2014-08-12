"use strict";

module.exports = function (grunt) {
	var libdir = "bower_components/";

	// A temporary directory used by amdserialize to output the processed modules.
	var tmpdir = "tmp/";

	// The final output directory.
	var outdir = "out/";

	// The grunt.config property populated by amdserialize, containing the
	// list of files to include in the layer.
	var outprop = "amdoutput";


	grunt.initConfig({
		// The loader config should go here.
		amdloader: {
			// Here goes the config for the amd plugins build process.
			baseUrl: "./",

			packages: [
				{name: "dcl", location: libdir + "dcl"},
				{name: "decor", location: libdir + "decor"},
				{name: "delite", location: libdir + "delite"},
				{name: "deliteful", location: libdir + "deliteful"},
				{name: "dojo", location: libdir + "dojo"},
				{name: "dpointer", location: libdir + "dpointer"},
				{name: "dstore", location: libdir + "dstore"},
				{name: "ecma402", location: libdir + "ecma402"},
				{name: "requirejs", location: libdir + "requirejs"},
				{name: "requirejs-domready", location: libdir + "requirejs-domready"},
				{name: "requirejs-dplugins", location: libdir + "requirejs-dplugins"},
				{name: "requirejs-text", location: libdir + "requirejs-text"}
			],

			config: {
				// text should be replace by the module id of text plugin
				text: {
					inlineText: true
				},
				// i18n should be replace by the module id of i18n plugin
				i18n: {
					localesList: ["fr"]
				}
			}
		},

		// The common build config
		amdbuild: {
			// dir is the output directory.
			dir: tmpdir,

			// List of plugins that the build should not try to resolve at build time.
			runtimePlugins: [
				"ecma402/features"
			],

			// List of layers to build.
			layers: [{
				name: "app",
				include: [
					// Modules and layers listed here, and their dependencies, will be added to the layer.
					"app/app"
				],
				includeShallow: [
					// Only the modules listed here (ie. NOT their dependencies) will be added to the layer.
				],
				exclude: [
					// Modules and layers listed here, and their dependencies, will NOT be in the layer.
				],
				excludeShallow: [
					// Only the modules listed here (ie. NOT their dependencies)  will NOT be in the layer.
				]
			}]
		},

		// Config to allow concat to generate the layer.
		concat: {
			options: {
				banner: "<%= " + outprop + ".header%>"
			},
			dist: {
				src: "<%= " + outprop + ".modules.abs %>",
				dest: outdir + "<%= " + outprop + ".layerPath %>"
			}
		},

		// Copy the plugin files to the real output directory.
		copy: {
			dist: {
				expand: true,
				cwd: tmpdir,
				src: "<%= " + outprop + ".plugins.rel %>",
				dest: outdir
			}
		},

		// Erase temp directory and previous build
		clean: {
			erase: [outdir],
			finish: [tmpdir]
		}
	});


	// The main build task.
	grunt.registerTask("amdbuild", function (amdloader) {
		var name = this.name,
			layers = grunt.config(name).layers;

		layers.forEach(function (layer) {
			grunt.task.run("amddepsscan:" + layer.name + ":" + name + ":" + amdloader);
			grunt.task.run("amdserialize:" + layer.name + ":" + name + ":" + amdloader + ":" + outprop);
			grunt.task.run("concat");
			grunt.task.run("copy");
		});
	});


	// Load the plugin that provides the "amd" task.
	grunt.loadNpmTasks("grunt-amd-build");

	// Load vendor plugins.
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Default task.
	grunt.registerTask("default", ["clean:erase", "amdbuild:amdloader", "clean:finish"]);
};
