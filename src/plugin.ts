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

  constructor(params?: IPluginConstructorParams) {
    const {
      globPath,
      outputDirectory,
      options = { format: FormatOptions.JS }
    } = { ...params };

    this.globPath = globPath;
    this.outputDirectory = outputDirectory;
    this.options = options;
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
    compiler.hooks.watchRun.tapPromise('TranslationMarkupPlugin', async () => {
      this.compileTranslationFiles();
    });
  }

  private compileTranslationFiles() {
    compile({
      globPath: this.globPath,
      outputDirectory: this.outputDirectory,
      options: this.options
    }).catch((error: any) => {
      console.warn('Translation Compile error');
      console.log(error);
    });
  }
}

export default TranslationMarkupPlugin;
