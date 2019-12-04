This respository contains a Drupal base theme intended to be used across
multiple sites (```ambientimpact_base```) and the theme used on
[ambientimpact.com](https://ambientimpact.com/) (```ambientimpact_site```).

Note that these depend on the
[```ambientimpact_core```](https://gitlab.com/Ambient.Impact/drupal-modules)
module being present and enabled to function, but [Drupal themes can't yet
declare modules as dependencies](https://www.drupal.org/project/drupal/issues/474684).

**Warning**: while these are generally production-ready, they're not guaranteed
to maintain a stable API and may occasionally contain bugs, being a
work-in-progress. Stable releases may be provided at a later date.

-----------------

Cross-platform browser testing done via
[BrowserStack](https://www.browserstack.com/).

<img src="browserstack-logo.svg" alt="BrowserStack logo" width="128" />

# Building

## Installation

To build the CSS for this project, you'll need to have
[Node.js](https://nodejs.org/) installed. Once you've installed it, you'll have
to install the [Grunt CLI](https://gruntjs.com/getting-started) globally from
the commandline:

```
npm install -g grunt-cli
```

Once that's installed, you can then install all the required Node modules by
running ```npm install``` in the project root.

To build the favicons, you'll also need to install
[ImageMagick](https://imagemagick.org/).

## Building

To build everything, you can run ```grunt all``` in the commandline in the
project root.

To build specific things:

* ```grunt css``` - builds all CSS files and their associated map files.

* ```grunt favicons``` - builds all the shortcut/browser icons for the theme, using [japrescott/grunt-favicons](https://github.com/japrescott/grunt-favicons); requires [ImageMagick](https://imagemagick.org/) to be installed.
