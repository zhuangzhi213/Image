// pages/api/image/[filename].js

export default async function handler(req, res) {
  const { filename } = req.query;
  // 替换为实际的GitLab图片URL模板
  const gitlabImageUrlTemplate = 'https://gitlab.com/zhuangzhi213/hexo-images/raw/main/images/';
  
  try {
    // 构建完整的GitLab图片URL
    const imageUrl = `${gitlabImageUrlTemplate}${encodeURIComponent(filename)}`;

    // 发送HTTP重定向响应
    res.setHeader('Location', imageUrl);
    res.statusCode = 302;
    res.end();
  } catch (error) {
    res.status(404).json({ message: 'Image not found' });
  }
}