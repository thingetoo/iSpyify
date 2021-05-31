const dbHelpers = require('./index.js');

module.exports = {
  createScore: async function (data, callback) {
    const doc1 = new dbHelpers.Scores(data);
    doc1.save(function (err, doc) {
      if (err) {
        console.log(err);
      }
      callback(err, doc);
    });
  },
  getScore: async function (username, callback) {
    dbHelpers.Scores.findOne(username, (err, doc) => {
      if (err) {
        callback(err, null);
      }
      callback(null, doc);
    });
  },
  updateScore: async function (data, callback) {
    const { username, score, attempts } = data;
    dbHelpers.Scores.findOneAndUpdate(
      { username },
      { score, attempts },
      function (err, results) {
        if (err) {
          callback(err, null);
        }
        callback(null, results);
      }
    );
  },
};
