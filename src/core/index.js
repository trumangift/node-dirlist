const fs = require('fs');
const path = require('path');
const {cwd} = require('../config/index');
const Handlebars = require('Handlebars');
const urlencode = require('urlencode');
const mime = require('mime');
// read template
const templateurl = path.join(__dirname, '../template/index.tpl');
const templateContent = fs.readFileSync(templateurl, 'utf-8');
const template = Handlebars.compile(templateContent);

module.exports = async (req, res) => {
  try {
    const url = req.url;
    let filePath = path.join(cwd, url);
    filePath = urlencode.decode(filePath, 'utf8');
    const statSync = fs.statSync(filePath);
    const isFile = statSync.isFile();
    res.statusCode = 200;
    if (isFile) {
      // 获取文件Mime类型
      const extName = path.extname(filePath);
      const fileName = path.basename(filePath);
      const mimeType = mime.getType(extName);
      const file = fs.createReadStream(filePath);
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Length', statSync.size);
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      file.pipe(res);
    } else {
      res.setHeader('Content-Type', 'text/html');
      let dirs = await fs.readdirSync(filePath, 'utf-8');
      const relativePath = path.relative(cwd, filePath);
      dirs = dirs.map((url) => {
        return {
          url: relativePath ? '/' +relativePath + '/' + url : '/' + url,
          name: url,
        };
      });
      const htmlOutput = template({
        dirs,
      });
      res.end(htmlOutput);
    }
  } catch (e) {
    res.statusCode = '404';
    res.end(String(e));
  }
};
