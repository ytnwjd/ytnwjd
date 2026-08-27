const Parser = require('rss-parser');
const fs = require('fs');

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Referer': 'https://ytnwjd.tistory.com/'
  }
});

(async () => {
  const feed = await parser.parseURL('https://ytnwjd.tistory.com/rss');
  const posts = feed.items.slice(0, 3);
  const list = posts.map(p => `- [${p.title}](${p.link})`).join('\n');

  const readme = fs.readFileSync('README.md', 'utf8');
  const updated = readme.replace(
    /<!-- BLOG-POST-LIST:START -->[\s\S]*<!-- BLOG-POST-LIST:END -->/,
    `<!-- BLOG-POST-LIST:START -->\n${list}\n<!-- BLOG-POST-LIST:END -->`
  );
  fs.writeFileSync('README.md', updated);
})();
