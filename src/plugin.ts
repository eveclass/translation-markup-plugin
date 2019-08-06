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
  private readonly compileOptions: ICompileOptions;

  constructor(options?: IPluginConstructorParams) {
    const {
      globPath = './**/*.lang.yaml',
      outputDirectory = './translations',
      compileOptions = { format: FormatOptions.JS }
    } = { ...options };

    this.globPath = globPath;
    this.outputDirectory = outputDirectory;
    this.compileOptions = compileOptions;
  }

  public apply(compiler: any) {
    /**
     * Used in the build stage
     */
    compiler.hooks.afterPlugins.tap('TranslationMarkupPlugin', () => {
      this.compileTranslationFiles();
    });

    /**
     * Used in development watch mode
     */
    compiler.hooks.watchRun.tapPromise(
      'TranslationMarkupPlugin',
      async (runCompiler: any) => {
        const changedFilesPaths = Object.keys(
          runCompiler.watchFileSystem.watcher.mtimes
        );

        const paths = changedFilesPaths.join();

        const found = paths.match(this.outputDirectory);

        if (!found) {
          this.compileTranslationFiles();
        }
      }
    );
  }

  private compileTranslationFiles() {
    compile({
      globPath: this.globPath,
      outputDirectory: this.outputDirectory,
      options: this.compileOptions
    }).catch((error: any) => {
      console.warn('Translation Compile error');
      console.log(error);
    });
  }
}

export default TranslationMarkupPlugin;
