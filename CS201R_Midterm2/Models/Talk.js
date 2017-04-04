var mongoose = require('mongoose');
var TalkSchema = new mongoose.Schema({
    title: String,
    pictureUrl: String,
    session: String,
    speaker: String,
    upvotes: { type: Number, default: 0 },
});
TalkSchema.methods.upvote = function (cb) {
    console.log("Added upvote");
    this.upvotes += 1;
    this.save(cb);
};
mongoose.model('Talk', TalkSchema);