// utils.js
const Utils = {
    redirectTo: function(url, delay) {
        // 使用setTimeout来延迟导航
        setTimeout(function() {
            window.location.href = url;
        }, delay);
    },

    // ...你可以在这里添加更多的工具函数
};

// 为了在其他脚本中使用这些函数，你需要导出 Utils 对象
export default Utils;
