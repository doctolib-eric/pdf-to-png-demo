# Browser-side PDF to PNG conversion (demo app)

Demo app for [pdf-to-png](https://github.com/doctolib-eric/pdf-to-png).

See the `App.js` file for the actual implementation, everything else is basically boilerplate.

## Known issues

### Misc

Some frightening compilation warnings ("Critical dependency: require function is used in a way in which dependencies cannot be statically extracted") that should disappear as soon as [https://github.com/mozilla/pdf.js/commit/d370037618211c8642dd3c576edbc2d2b3d6e09e](this commit) joins the stable release of PDF.js (and the dependency here is leveled up)
