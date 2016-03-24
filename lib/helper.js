(function() {
  var dargs, path;

  path = require("path");

  dargs = require("dargs");

  module.exports = {
    vnuJar: path.normalize(path.join(__dirname, "..", "vnu", "vnu.jar")),
    javaBin: function() {
      if (process.env.JAVA_HOME) {
        return path.join(process.env.JAVA_HOME, "bin", "java");
      } else {
        return "java";
      }
    },
    genArgs: function(args, xprefixed, __private) {
      var exclude, preResult, result;
      result = [];
      exclude = __private ? void 0 : ["format"];
      if (args === void 0) {
        args = {};
      }
      if (xprefixed) {
        Object.keys(args).forEach(function(key) {
          return result.push("-X" + key + args[key]);
        });
        return result;
      }
      preResult = dargs(args, {
        "excludes": exclude
      }).map(function(arg) {
        return arg.split("=");
      });
      preResult.forEach(function(arg) {
        return result = result.concat(arg);
      });
      return result;
    }
  };

}).call(this);
