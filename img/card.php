<?php
// 目录路径
$dir = "card/"; // 假设你的图片都存储在这个目录下

if (!is_dir($dir)) {
    die('目录不存在');
}

// 获取目录中的所有文件
$pics = glob($dir . '*.{webp,jepg,jpg,png,gif}', GLOB_BRACE); // 支持多种图片格式

// 如果没有找到任何图片
if (empty($pics)) {
    die('没有找到图片');
}

// 从数组中随机选择一张图片
$pic = $pics[array_rand($pics)];

// 返回指定格式
$type = $_GET['type'] ?? 'redirect'; // 默认为重定向

switch ($type) {

    // JSON返回
    case 'json':
        header('Content-Type: application/json');
        die(json_encode(['pic' => $pic]));

    default:
        die(header("Location: $pic"));
}
?>