export default function isAuthenticated() {
    if (typeof window == undefined) {
        return false;
    }
    if (!localStorage.getItem("jwt")) {
        return false;
    }
    if (JSON.parse(localStorage.getItem("jwt")).user.type === 'admin') {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else return false
}