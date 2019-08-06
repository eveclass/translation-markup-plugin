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
		new TranslationMarkupPlugin()
	]
	...
}
```
