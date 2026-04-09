# react-lazy

React 18 图片懒加载组件和原生 JavaScript 懒加载实现

## 特性

- 🚀 基于 Intersection Observer API，性能优异
- 📦 支持 React 18 组件和原生 JavaScript 两种使用方式
- 🎨 支持自定义占位符
- 🔄 平滑的加载过渡效果
- 📱 响应式设计，支持移动设备
- 🛠️ 完善的 TypeScript 类型定义
- 📖 易于使用和集成

## 安装

```bash
npm install @ruan-feiyang/react-lazy
# 或
yarn add @ruan-feiyang/react-lazy
```

## 使用方法

### React 组件

```jsx
import React from 'react';
import LazyImage from '@ruan-feiyang/react-lazy';

const App = () => {
  return (
    <div>
      <h1>React 图片懒加载示例</h1>
      
      {/* 基本用法 */}
      <LazyImage
        src="https://example.com/image.jpg"
        alt="示例图片"
        style={{ width: '300px', height: '200px', position: 'relative' }}
      />
      
      {/* 带占位符的用法 */}
      <LazyImage
        src="https://example.com/another-image.jpg"
        alt="另一张示例图片"
        placeholder={<div style={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>加载中...</div>}
        style={{ width: '400px', height: '300px', position: 'relative' }}
      />
    </div>
  );
};

export default App;
```

### 原生 JavaScript

```javascript
import { initLazyLoad } from '@ruan-feiyang/react-lazy/native';

// 初始化懒加载
const lazyLoadInstance = initLazyLoad({
  rootMargin: '200px 0px',
  threshold: 0
}, '[data-src]');

// 在 HTML 中使用
// <img data-src="https://example.com/image.jpg" alt="示例图片" />

// 销毁实例（如果需要）
// lazyLoadInstance.destroy();
```

## API

### React 组件 props

| 参数 | 类型 | 描述 | 必填 |
|------|------|------|------|
| src | string | 图片地址 | 是 |
| alt | string | 图片描述 | 是 |
| placeholder | React.ReactNode | 加载占位符 | 否 |
| ...props | React.HTMLAttributes<HTMLDivElement> | 其他 div 属性 | 否 |

### 原生 JavaScript API

#### `initLazyLoad(options, selector)`

- **options**: 配置选项，同 Intersection Observer 配置
  - `root`: 根元素，默认为 null
  - `rootMargin`: 根元素外边距，默认为 '200px 0px'
  - `threshold`: 阈值，默认为 0
- **selector**: 图片选择器，默认为 '[data-src]'
- **返回值**: 懒加载实例

#### 实例方法

- **init(selector)**: 初始化懒加载
- **destroy()**: 销毁懒加载实例

## 浏览器兼容性

- 现代浏览器（Chrome, Firefox, Safari, Edge）支持 Intersection Observer API
- 对于不支持的浏览器，会回退到滚动事件监听

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build
```

## 许可证

ISC

## 作者

ruan-ruan

## 仓库

[GitHub](https://github.com/ruan-ruan/react-lazy.git)

