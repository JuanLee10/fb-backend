const db = require('./RepliesCmd');

exports.getReplies = async (req, res) => {
  const result = await db.getByListingId(req.params.id);
  res.status(200).json(result);
};
