const fs = require('fs');
const path = require('path');
const {cwd} = require('../config/index');
const Handlebars = require('Handlebars');
// read template
const templateurl = path.join(cwd, './src/template/index.tpl');
const templateContent = fs.readFileSync(templateurl, 'utf-8');
const template = Handlebars.compile(templateContent);

module.exports = async (req, res) => {
  try {
    const url = req.url;
    const filePath = path.join(cwd, url);
    const isFile = fs.statSync(filePath).isFile();
    res.statusCode = 200;
    if (isFile) {
      res.setHeader('Content-Type', 'text/plain');
      fs.createReadStream(filePath).pipe(res);
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
