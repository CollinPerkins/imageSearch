var mongoose = require("mongoose");

var SearchSchema = new mongoose.Schema({
    term: String,
    when: Date
});

module.exports = mongoose.model("Search", SearchSchema);
