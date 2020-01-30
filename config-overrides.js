const { override, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  addWebpackModuleRule({
    test: /pdf\.worker\.js$/,
    use: { loader: "worker-loader", options: { inline: true } }
  })
);
