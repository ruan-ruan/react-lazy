/**
 * 原生 JavaScript 图片懒加载实现
 * 支持 Intersection Observer API
 */

class NativeLazyLoad {
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: '200px 0px',
      threshold: 0,
      ...options
    };
    this.observer = null;
    this.images = [];
  }

  /**
   * 初始化懒加载
   * @param {string} selector - 图片选择器，默认为 '[data-src]'
   */
  init(selector = '[data-src]') {
    // 检查浏览器是否支持 Intersection Observer
    if (!('IntersectionObserver' in window)) {
      console.warn('Intersection Observer API is not supported. Falling back to scroll event.');
      this.fallbackToScroll(selector);
      return;
    }

    // 创建 Intersection Observer 实例
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, this.options);

    // 观察所有匹配的图片
    this.images = document.querySelectorAll(selector);
    this.images.forEach((img) => {
      this.observer.observe(img);
    });
  }

  /**
   * 加载图片
   * @param {HTMLElement} img - 图片元素
   */
  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;

    // 创建新的图片元素来预加载
    const tempImg = new Image();
    tempImg.src = src;

    tempImg.onload = () => {
      // 图片加载成功后，替换 src 属性
      img.src = src;
      // 移除 data-src 属性
      img.removeAttribute('data-src');
      // 添加加载完成的类
      img.classList.add('lazy-loaded');
      // 触发自定义事件
      img.dispatchEvent(new CustomEvent('lazyload'));
    };

    tempImg.onerror = () => {
      // 图片加载失败时的处理
      img.classList.add('lazy-error');
      // 触发自定义事件
      img.dispatchEvent(new CustomEvent('lazyerror'));
    };
  }

  /**
   * 回退到滚动事件监听（当 Intersection Observer 不支持时）
   * @param {string} selector - 图片选择器
   */
  fallbackToScroll(selector) {
    this.images = document.querySelectorAll(selector);

    const checkImages = () => {
      this.images.forEach((img) => {
        if (this.isInViewport(img)) {
          this.loadImage(img);
          // 从数组中移除已加载的图片
          this.images = Array.from(this.images).filter((i) => i !== img);
        }
      });

      // 如果所有图片都已加载，移除滚动事件监听
      if (this.images.length === 0) {
        window.removeEventListener('scroll', checkImages);
        window.removeEventListener('resize', checkImages);
        window.removeEventListener('orientationchange', checkImages);
      }
    };

    // 初始检查
    checkImages();

    // 添加事件监听
    window.addEventListener('scroll', checkImages);
    window.addEventListener('resize', checkImages);
    window.addEventListener('orientationchange', checkImages);
  }

  /**
   * 检查元素是否在视口中
   * @param {HTMLElement} element - 要检查的元素
   * @returns {boolean} - 是否在视口中
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 200 &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.bottom >= 0 &&
      rect.right >= 0
    );
  }

  /**
   * 销毁懒加载实例
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.images = [];
  }
}

/**
 * 全局初始化函数
 * @param {Object} options - 配置选项
 * @param {string} selector - 图片选择器
 * @returns {NativeLazyLoad} - 懒加载实例
 */
function initLazyLoad(options = {}, selector = '[data-src]') {
  const lazyLoad = new NativeLazyLoad(options);
  lazyLoad.init(selector);
  return lazyLoad;
}

// 导出
export default NativeLazyLoad;
export { initLazyLoad };
