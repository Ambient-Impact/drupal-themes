This respository has been
[split](https://shantanoo-desai.github.io/posts/technology/git_subtree/) into
separate repositories for each theme as per Drupal best practices:

* [Ambient-Impact/drupal-ambientimpact-base](https://github.com/Ambient-Impact/drupal-ambientimpact-base)

* [Ambient-Impact/drupal-ambientimpact-site](https://github.com/Ambient-Impact/drupal-ambientimpact-site)

Please migrate to those as this repository is now archived and not recommended.

----

This respository contains a Drupal base theme intended to be used across
multiple sites (```ambientimpact_base```) and the theme used on
[ambientimpact.com](https://ambientimpact.com/) (```ambientimpact_site```).

Note that these require various
[```ambientimpact_*```](https://gitlab.com/Ambient.Impact/drupal-modules)
modules being present in your Drupal installation.

**Warning**: while these are generally production-ready, they're not guaranteed
to maintain a stable API and may occasionally contain bugs, being a
work-in-progress. Stable releases may be provided at a later date.

----

# Requirements

* [Drupal 9](https://www.drupal.org/download) ([Drupal 8 is end-of-life](https://www.drupal.org/psa-2021-11-30))

* PHP 8

* [Composer](https://getcomposer.org/)

## Drupal dependencies

* Several [```ambientimpact_*``` modules](https://github.com/Ambient-Impact/drupal-modules) must be present.

## Front-end dependencies

To build front-end assets for this project, [Node.js](https://nodejs.org/) and
[Yarn](https://yarnpkg.com/) are required.

----

# Installation

## Composer

This is a partly legacy codebase, and as such, Composer installation of the
themes in this repository isn't supported directly. You'll have to check out
the repository into your Drupal themes directory, optionally as a Git
submodule. The long term plan is to refactor these as individual Composer
packages, but for now, manual installation is required.

## Front-end assets

To build front-end assets for this project, you'll need to install
[Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).

This package makes use of [Yarn
Workspaces](https://yarnpkg.com/features/workspaces) and references other local
workspace dependencies. In the `package.json` in the root of your Drupal
project, you'll need to add the following:

```json
"workspaces": [
  "<web directory>/themes/ambientimpact/*"
],
```

where `<web directory>` is your public Drupal directory name, `web` by default.
Once those are defined, add the following to the `"dependencies"` section of
your top-level `package.json`:

```json
"ambientimpact-drupal-themes": "workspace:^5"
```

Then run `yarn install` and let Yarn do the rest.

### Optional: install yarn.BUILD

While not required, we recommend installing [yarn.BUILD](https://yarn.build/) to
make building all of the front-end assets even easier.

### Optional: use ```nvm```

If you want to be sure you're using the same Node.js version we're using, we
support using [Node Version Manager (```nvm```)](https://github.com/nvm-sh/nvm)
([Windows port](https://github.com/coreybutler/nvm-windows)). Once ```nvm``` is
installed, you can simply navigate to the project root and run ```nvm install```
to install the appropriate version contained in the ```.nvmrc``` file.

Note that if you're using the [Windows
port](https://github.com/coreybutler/nvm-windows), it [does not support
```.nvmrc```
files](https://github.com/coreybutler/nvm-windows/wiki/Common-Issues#why-isnt-nvmrc-supported-why-arent-some-nvm-for-macoslinux-features-supported),
so you'll have to provide the version contained in the ```.nvmrc``` as a
parameter: ```nvm install <version>``` (without the ```<``` and ```>```).

This step is not required, and may be dropped in the future as Node.js is fairly
mature and stable at this point.

----

# Building front-end assets

We use [Webpack](https://webpack.js.org/) and [Symfony Webpack
Encore](https://symfony.com/doc/current/frontend.html) to automate most of the
build process. These will have been installed for you if you followed the Yarn
installation instructions above.

If you have [yarn.BUILD](https://yarn.build/) installed, you can run:

```
yarn build
```

from the root of your Drupal site. If you want to build just this package, run:

```
yarn workspace ambientimpact-drupal-themes run build
```

----

# Major breaking changes

The following major version bumps indicate breaking changes:

* 3.x - Now require [the 3.x branch of modules](https://gitlab.com/Ambient.Impact/drupal-modules), which now require Drupal 9. All development is now against that major version of Drupal.

* 4.x - Refactored to use [Sass modules](https://sass-lang.com/blog/the-module-system-is-launched); all development is now against this and will no longer compile using the old ```@import``` directive.

* 5.x - Front-end package manager is now [Yarn](https://yarnpkg.com/); front-end build process ported to [Webpack](https://webpack.js.org/).
