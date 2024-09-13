const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const imgDir = path.join(__dirname, 'img/card'); // 图片所在的目录

app.get('/api/card', (req, res) => {
    fs.readdir(imgDir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('无法读取目录');
        }

        // 过滤只包含图片文件
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        if (imageFiles.length === 0) {
            return res.status(404).send('没有找到图片');
        }

        // 从数组中随机选择一张图片
        const pic = imageFiles[Math.floor(Math.random() * imageFiles.length)];

        // 返回指定格式
        const type = req.query.type;

        switch (type) {
            case 'json':
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ pic: `/img/card/${pic}` }));
                break;
            default:
                res.redirect(302, `/img/card/${pic}`);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});