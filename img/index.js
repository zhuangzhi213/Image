const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const filename = path.join(__dirname, 'img.txt');

app.get('/api/img', (req, res) => {
    if (!fs.existsSync(filename)) {
        return res.status(404).send('文件不存在');
    }

    const pics = [];
    const fsStream = fs.createReadStream(filename, { encoding: 'utf8' });

    fsStream.on('data', (chunk) => {
        chunk.split('\n').forEach((line) => {
            line = line.trim();
            if (line !== '') {
                pics.push(line);
            }
        });
    });

    fsStream.on('end', () => {
        if (pics.length === 0) {
            return res.status(404).send('没有找到图片链接');
        }

        // 从数组中随机选择一个链接
        const pic = pics[Math.floor(Math.random() * pics.length)];

        // 返回指定格式
        const type = req.query.type;

        switch (type) {
            case 'json':
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ pic }));
                break;
            default:
                res.redirect(302, pic);
        }
    });

    fsStream.on('error', (error) => {
        console.error('Error reading file:', error);
        res.status(500).send('无法读取文件');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});