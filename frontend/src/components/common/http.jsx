export const apiUrl = 'http://127.0.0.1:8000/api'

export const adminToken = () => {
    const data = JSON.parse(localStorage.getItem('adminInfo'));
    return data.token;
}
export const adminRole = () => {
    const data = JSON.parse(localStorage.getItem('adminInfo'));
    return data?.role || null;
}
export const userToken = () => {
    const data = JSON.parse(localStorage.getItem('userInfo'));
    return data?.token || null;
}