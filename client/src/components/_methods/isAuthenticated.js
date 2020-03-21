export default function isAuthenticated() {
    if (typeof window == undefined) {
        return false;
    }
    if (!localStorage.getItem("jwt")) {
        return false;
    }
    if (Object.keys(JSON.parse(localStorage.getItem("jwt")))[1] === 'admin') {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else return false
}