import { compile } from '@shiftcode/translation-markup';
import { FormatOptions } from '@shiftcode/translation-markup/lib/src/enums/FormatOptions';
import { ICompileOptions } from '@shiftcode/translation-markup/lib/src/interfaces/ICompileOptions';
import { IPluginConstructorParams } from '../types/IPluginConstructorParams';

/**
 * Plugin class
 */
class TranslationMarkupPlugin {
  private readonly globPath: string;
  private readonly outputDirectory: string;
  private readonly options: ICompileOptions;
  private readonly test?: string;

  constructor(pluginOptions?: IPluginConstructorParams) {
    const {
      globPath = './**/*.lang.yaml',
      outputDirectory = './translations',
      options = { format: FormatOptions.JS },
      test,
    } = { ...pluginOptions };

    this.globPath = globPath;
    this.outputDirectory = outputDirectory;
    this.options = options;
    this.test = test;
  }

  public apply(compiler: any) {
    /**
     * Used in the build stage
     */
    compiler.hooks.afterPlugins.tap('TranslationMarkupPlugin', () => {
      return this.compileTranslationFiles();
    });

    /**
     * Used in development watch mode
     */
    compiler.hooks.watchRun.tapPromise(
      'TranslationMarkupPlugin',
      async (runCompiler: any) => {
        const changedFilesPaths = Object.keys(runCompiler.watchFileSystem.watcher.mtimes);
        const paths = changedFilesPaths.join();
        const recompile = this.test
          ? paths.match(this.test)
          : !paths.match(this.outputDirectory);
        if (recompile) {
          return this.compileTranslationFiles();
        }
      },
    );
  }

  private compileTranslationFiles() {
    return compile({
      globPath: this.globPath,
      outputDirectory: this.outputDirectory,
      options: this.options,
    }).catch((error: any) => {
      console.warn('Translation Compile error');
      console.log(error);
    });
  }
}

export default TranslationMarkupPlugin;
