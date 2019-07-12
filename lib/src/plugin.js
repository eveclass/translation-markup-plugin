"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const translation_markup_1 = require("@shiftcode/translation-markup");
const FormatOptions_1 = require("@shiftcode/translation-markup/lib/src/enums/FormatOptions");
/**
 * Plugin class
 */
class TranslationMarkupPlugin {
    constructor(params) {
        const { globPath, outputDirectory, options = { format: FormatOptions_1.FormatOptions.JS }, test = '.lang.yaml' } = Object.assign({}, params);
        this.globPath = globPath;
        this.outputDirectory = outputDirectory;
        this.options = options;
        this.test = test;
    }
    apply(compiler) {
        /**
         * Used in the build to production
         */
        compiler.hooks.afterPlugins.tap('TranslationMarkupPlugin', () => {
            translation_markup_1.compile({
                globPath: this.globPath,
                outputDirectory: this.outputDirectory,
                options: this.options
            }).catch((error) => {
                console.warn('Translation Compile error');
                console.log(error);
            });
        });
        /**
         * Used in development watch mode
         */
        compiler.hooks.watchRun.tapPromise('TranslationMarkupPlugin', (runCompiler) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const changedFilesPaths = Object.keys(runCompiler.watchFileSystem.watcher.mtimes);
            const translationsToCompile = [];
            for (const filePath of changedFilesPaths) {
                if (filePath.includes(this.test)) {
                    translationsToCompile.push(translation_markup_1.compile({
                        globPath: filePath,
                        outputDirectory: this.outputDirectory,
                        options: this.options
                    }));
                }
            }
            try {
                yield Promise.all(translationsToCompile);
            }
            catch (error) {
                console.warn('Translation Compile error');
                console.log(error);
            }
        }));
    }
}
exports.default = TranslationMarkupPlugin;
//# sourceMappingURL=plugin.js.map