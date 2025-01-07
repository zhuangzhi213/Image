export default async function middleware(req, res) {
    console.log('Request Host:', req.headers.host);
    console.log('Request Origin:', req.headers.origin || req.headers.referer);
  
    // 定义允许的顶级域名列表和对应的子域名模式
    const ALLOWED_DOMAINS = [
      'zlog.us.kg',
      'zhuangzhi.us.kg',
      'zwiki.us.kg'
    ];
  
    // 正则表达式用于匹配任意子域名或顶级域名
    const DOMAIN_PATTERN = new RegExp(`^([a-zA-Z0-9-]+\\.)?(${ALLOWED_DOMAINS.join('|')})$`);
  
    // 获取请求的来源信息
    const host = req.headers.host;
    const origin = req.headers.origin || req.headers.referer;
  
    // 检查 Host 是否匹配指定的顶级域名或子域名模式
    const isAllowedHost = DOMAIN_PATTERN.test(host);
  
    // 如果 Origin 存在，也检查它是否符合子域名模式
    const isAllowedOrigin = !origin || ALLOWED_DOMAINS.some(domain => 
      origin.startsWith(`https://${domain}`) || 
      DOMAIN_PATTERN.test(new URL(origin).hostname)
    );
  
    console.log('isAllowedHost:', isAllowedHost);
    console.log('isAllowedOrigin:', isAllowedOrigin);
  
    if (isAllowedHost && isAllowedOrigin) {
      return await res.next();
    } else {
      return res.status(403).send('Forbidden');
    }
  }