export const themeScript = `(function() {
    try {
        localStorage.removeItem("theme");
        document.documentElement.removeAttribute("data-theme");
    } catch (e) {}
})()`;
