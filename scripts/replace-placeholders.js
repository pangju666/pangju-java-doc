const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// 加载 .env 文件
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 定义要替换的占位符映射
const placeholders = {
    '__DEPENDENCIES_VERSION__': process.env.VITE_DEPENDENCIES_VERSION,
    '__COMMONS_VERSION__': process.env.VITE_COMMONS_VERSION,
    '__FRAMEWORK_VERSION__': process.env.VITE_FRAMEWORK_VERSION,
    '__FRAMEWORK_SPRING_BOOT_STARTER_VERSION__': process.env.VITE_FRAMEWORK_SPRING_BOOT_STARTER_VERSION,
    '_SPRING_BOOT_VERSION_': process.env.VITE_SPRING_BOOT_VERSION
};

// 文档目录（根据你的项目结构调整）
const docsDir = path.resolve(__dirname, '../docs');

// 递归遍历并替换 .md 文件
function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            replaceInFiles(filePath); // 递归
        } else if (path.extname(file) === '.md') {
            let content = fs.readFileSync(filePath, 'utf8');
            let updatedContent = content;

            // 遍历占位符进行替换
            for (const [placeholder, value] of Object.entries(placeholders)) {
                const regex = new RegExp(placeholder, 'g');
                updatedContent = updatedContent.replace(regex, value);
            }

            // 只有内容变化时才写入
            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`✅ 替换完成: ${filePath}`);
            }
        }
    });
}

replaceInFiles(docsDir);
