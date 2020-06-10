/**
 * gzip、deflate压缩,优先gzip压缩
 */
const {createGzip, createDeflate} = require('zlib');

module.exports = (stream, req, res) => {
  const acceptEncoding = req.headers['accept-encoding'];
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/g)) {
    return stream;
  } else if (acceptEncoding.match(/\b(gzip)\b/g)) {
    res.setHeader('Content-Encoding', 'gzip');
    return stream.pipe(createGzip());
  } else if (acceptEncoding.match(/\b(deflate)\b/g)) {
    res.setHeader('Content-Encoding', 'deflate');
    return stream.pipe(createDeflate());
  }
};
