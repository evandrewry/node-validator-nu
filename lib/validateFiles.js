(function() {
  var helper;

  helper = require("./helper");

  module.exports = function(files, xargs, args, vnuPath) {
    var argsToPass, defer, e, error, path, result, spawn, validator;
    if (xargs == null) {
      xargs = {};
    }
    if (args == null) {
      args = {};
    }
    if (vnuPath == null) {
      vnuPath = helper.vnuJar;
    }
    spawn = require("child_process").spawn;
    path = require("path");
    argsToPass = helper.genArgs(xargs, true).concat("-jar", vnuPath, helper.genArgs({
      "format": "json"
    }, false, true), helper.genArgs(args), files);
    defer = require("q").defer();
    result = "";
    try {
      validator = spawn(helper.javaBin(), argsToPass);
      validator.stderr.on("data", function(data) {
        return result += data;
      });
      return validator.stderr.on("end", function() {
        var e, error;
        try {
          return defer.resolve(JSON.parse(result).messages);
        } catch (error) {
          e = error;
          e.message += "\n" + result;
          return defer.reject(e);
        }
      });
    } catch (error) {
      e = error;
      return defer.reject(e);
    } finally {
      return defer.promise;
    }
  };

}).call(this);
