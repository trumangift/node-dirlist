// 断点续传
const fs = require('fs');
module.exports = async (totalAmount, filePath, req, res) => {
  const range = req.headers['range'];
  if (range) {
    let [, start, end] = range.match(/(\d*)-(\d*)/);
    start = parseInt(start, 10) || 0;
    end = parseInt(end, 10) || totalAmount -1;
    res.statusCode = 206;
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Ranges', `bytes ${start}-${end}/${totalAmount}`);
    return fs.createReadStream(filePath, {start, end});
  } else {
    return fs.createReadStream(filePath);
  }
};
