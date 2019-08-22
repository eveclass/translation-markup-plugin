"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const translation_markup_1 = require("@shiftcode/translation-markup");
const FormatOptions_1 = require("@shiftcode/translation-markup/lib/src/enums/FormatOptions");
/**
 * Plugin class
 */
class TranslationMarkupPlugin {
    constructor(pluginOptions) {
        const { globPath = './**/*.lang.yaml', outputDirectory = './translations', options = { format: FormatOptions_1.FormatOptions.JS } } = Object.assign({}, pluginOptions);
        this.globPath = globPath;
        this.outputDirectory = outputDirectory;
        this.options = options;
    }
    apply(compiler) {
        /**
         * Used in the build stage
         */
        compiler.hooks.afterPlugins.tap('TranslationMarkupPlugin', () => {
            this.compileTranslationFiles();
        });
        /**
         * Used in development watch mode
         */
        compiler.hooks.watchRun.tapPromise('TranslationMarkupPlugin', (runCompiler) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const changedFilesPaths = Object.keys(runCompiler.watchFileSystem.watcher.mtimes);
            const paths = changedFilesPaths.join();
            const found = paths.match(this.outputDirectory);
            if (!found) {
                this.compileTranslationFiles();
            }
        }));
    }
    compileTranslationFiles() {
        translation_markup_1.compile({
            globPath: this.globPath,
            outputDirectory: this.outputDirectory,
            options: this.options
        }).catch((error) => {
            console.warn('Translation Compile error');
            console.log(error);
        });
    }
}
exports.default = TranslationMarkupPlugin;
//# sourceMappingURL=plugin.js.map