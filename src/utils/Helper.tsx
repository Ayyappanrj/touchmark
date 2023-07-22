export const LocalStorage = () => {
    let data = JSON.parse(localStorage.getItem("LOGIN") || "{}");
    return Object.keys(data).length > 0 ? data : false;
};