
// helpers.js 或 utils.js 或在同一个文件中，取决于您的项目结构

import Cookies from "js-cookie";

export const clearAllCookies = () => {
    const allCookies = Cookies.get(); // 获取所有cookies
    for (let cookie in allCookies) {
      Cookies.remove(cookie); // 逐一删除
    }
  }
  