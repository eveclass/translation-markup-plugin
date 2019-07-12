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
  private readonly test: string;

  constructor(params?: IPluginConstructorParams) {
    const {
      globPath,
      outputDirectory,
      options = { format: FormatOptions.JS },
      test = '.lang.yaml'
    } = { ...params };

    this.globPath = globPath;
    this.outputDirectory = outputDirectory;
    this.options = options;
    this.test = test;
  }

  public apply(compiler: any) {
    /**
     * Used in the build to production
     */
    compiler.hooks.afterPlugins.tap('TranslationMarkupPlugin', () => {
      compile({
        globPath: this.globPath,
        outputDirectory: this.outputDirectory,
        options: this.options
      }).catch((error: any) => {
        console.warn('Translation Compile error');
        console.log(error);
      });
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

        const translationsToCompile: Promise<void>[] = [];

        for (const filePath of changedFilesPaths) {
          if (filePath.includes(this.test)) {
            translationsToCompile.push(
              compile({
                globPath: filePath,
                outputDirectory: this.outputDirectory,
                options: this.options
              })
            );
          }
        }

        try {
          await Promise.all(translationsToCompile);
        } catch (error) {
          console.warn('Translation Compile error');
          console.log(error);
        }
      }
    );
  }
}

export default TranslationMarkupPlugin;
