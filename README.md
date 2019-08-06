# Translation Markup Plugin

Webpack plugin that uses [Translation Markup](https://translationmarkup.com/) to auto generate you translations files.

## Getting Started

Translation Markup Plugin auto generates your translations files, write your transaltions only once, in YAML, and refernce the auto generated JS files to internationalize your application with any i18n library you desire.

## Install

### Install

**NPM:**

```sh
npm install @shiftcode/translation-markup-plugin
```

**Yarn:**

```sh
yarn add @shiftcode/translation-markup-plugin
```

## Config

`webpack.config.js`

```
import TranslationMarkupPlugin from '@shiftcode/translation-markup-plugin';

{
	...
	plugins: [
		new TranslationMarkupPlugin(options)
	]
	...
}
```

## Options

|      Param      |                                Type                                |                             Default                             |                                       Details                                       |
| :-------------: | :----------------------------------------------------------------: | :-------------------------------------------------------------: | :---------------------------------------------------------------------------------: |
|    globPath     |                             `<string>`                             |                      `'./**/*.lang.yaml'`                       | [Glob](https://www.npmjs.com/package/glob) style path where to find the yaml files. |
| outputDirectory |                             `<string>`                             |                       `'./translations'`                        |                        Directory to output the translations.                        |
|     options     | `{ format: <string>, splitFiles: <boolean>, outputName: <string>}` | `{ format: 'JS', splitFiles: true, outputName: 'translations'}` |                           Output type and split options.                            |

\*\*\* `format` accepts `JS` or `JSON` as values

**&rarr; Returns: `Promise<void>`**
