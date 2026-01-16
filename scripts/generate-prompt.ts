/**
 * 生成静态 Catalog Prompt 文件
 * 运行: npm run gen:prompt
 * 输出: catalog-prompt.txt
 */
import { generateCatalogPrompt } from '@json-render/core';
import { catalog } from '../src/lib/catalog';
import fs from 'fs';
import path from 'path';

const outputDir = path.resolve(process.cwd(), 'generated');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 生成 prompt 文本
const prompt = generateCatalogPrompt(catalog);
const promptPath = path.join(outputDir, 'catalog-prompt.txt');
fs.writeFileSync(promptPath, prompt, 'utf-8');
console.log(`✅ Prompt 已生成: ${promptPath}`);

// 同时导出原始 catalog 结构 (供调试/其他语言使用)
const catalogJson = JSON.stringify(catalog, null, 2);
const jsonPath = path.join(outputDir, 'catalog.json');
fs.writeFileSync(jsonPath, catalogJson, 'utf-8');
console.log(`✅ Catalog JSON 已生成: ${jsonPath}`);
