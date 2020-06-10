// 需要监听的目录参数
const sl = process.argv.slice(2);
let watchDir = sl ? sl[0] : '';
if (watchDir && watchDir.indexOf('=') > 0) {
  watchDir = watchDir.split('=')[1];
}
module.exports = {
  cwd: watchDir || process.cwd(),
  host: '127.0.0.1',
  port: '3000',
  compress: /.(html|js|css|png)$/, // 需要压缩的文件类型
};
