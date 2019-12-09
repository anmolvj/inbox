const fs = require("fs");
const path = require("path");
const solc = require("solc");

const src = fs.readFileSync(
  path.join(__dirname + "/contracts/inbox.sol"),
  "utf8"
);

const compiledFile = solc.compile(src, 1);

module.exports = compiledFile.contracts[":Inbox"];
