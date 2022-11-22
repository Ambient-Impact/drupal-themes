This respository contains a reusable Drupal base theme.

**Warning**: while this is generally production-ready, it's not guaranteed to
maintain a stable API and may occasionally contain bugs, being a
work-in-progress. Stable releases may be provided at a later date.

----

# Requirements

* [Drupal 9](https://www.drupal.org/download) ([Drupal 8 is end-of-life](https://www.drupal.org/psa-2021-11-30))

* PHP 8

* [Composer](https://getcomposer.org/)

## Drupal dependencies

* Several [```ambientimpact_*``` modules](https://github.com/Ambient-Impact/drupal-modules) must be present.

----

# Installation

## Composer

Ensure that you have your Drupal installation set up with the correct Composer
installer types such as those provided by [the ```drupal\recommended-project```
template](https://www.drupal.org/docs/develop/using-composer/starting-a-site-using-drupal-composer-project-templates#s-drupalrecommended-project).
If you're starting from scratch, simply requiring that template and following
[the Drupal.org Composer
documentation](https://www.drupal.org/docs/develop/using-composer/starting-a-site-using-drupal-composer-project-templates)
should get you up and running.

Then, in your root ```composer.json```, add the following to the
```"repositories"``` section:

```json
"drupal/ambientimpact_base": {
  "type": "vcs",
  "url": "https://github.com/neurocracy/drupal-ambientimpact-base.git"
}
```

Then, in your project's root, run ```composer require
"drupal/ambientimpact_base:5.x-dev@dev"``` to have Composer install the theme
and its required dependencies for you.

----

# Major breaking changes

The following major version bumps indicate breaking changes:

* 3.x - Now require [the 3.x branch of modules](https://gitlab.com/Ambient.Impact/drupal-modules), which now require Drupal 9. All development is now against that major version of Drupal.

* 4.x - Refactored to use [Sass modules](https://sass-lang.com/blog/the-module-system-is-launched); all development is now against this and will no longer compile using the old ```@import``` directive.

* 5.x - Front-end package manager is now [Yarn](https://yarnpkg.com/); front-end build process ported to [Webpack](https://webpack.js.org/).
