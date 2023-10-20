const Migrations = artifacts.require("DAO");

module.exports = function (deployer) {

  deployer.deploy(Migrations,"3600","3600","51");
};