const fs = require('fs');
const path = require('path');

function generateSidebar(folderPath) {
  const sidebar = {};

  function traverseFolder(folderPath, basePath = '') {
    const files = fs.readdirSync(folderPath);

	// 排序文件列表
    const sortedFiles = files.sort((a, b) => {
      if (a === 'README.md') {
        return -1;
      } else if (b === 'README.md') {
        return 1;
      } else {
        return a.localeCompare(b);
      }
    });
    
	sortedFiles.forEach(file => {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);

      // 如果是文件夹，递归调用 traverseFolder 方法，获取文件夹下的文件
	  if (stat.isDirectory()) {
        const subFolderPath = path.join(folderPath, file);
        const subBasePath = path.join(basePath, `/${file}/`);
        traverseFolder(subFolderPath, subBasePath);
      } else if (file.endsWith('.md')) {
        let fileName = path.parse(file).name;
        if (fileName === 'README') {
          fileName = '';
        }
		
		// 替换路径中的反斜杠为正斜杠
        const normalizedBasePath = basePath.replace(/\\/g, '/');
		// 只有当 basePath 不为空时才加入到 sidebar 中
        if (normalizedBasePath !== '') {
          sidebar[normalizedBasePath] = sidebar[normalizedBasePath] || [];
          sidebar[normalizedBasePath].push(fileName);
        }
      }
    });
  }

  traverseFolder(folderPath);

  return sidebar;
}

try {
  const sidebarConfig = generateSidebar('./docs');
  const jsonContent = JSON.stringify(sidebarConfig, null, 2);

  fs.writeFileSync('./docs/.vuepress/sidebar_config.json', jsonContent);
  console.log('JSON file generated successfully.');
} catch (error) {
  console.error(error.message);
}