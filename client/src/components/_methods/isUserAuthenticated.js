export default function isUserAuthenticated() {
    if (typeof window == undefined) {
        return false;
    }
    if (!localStorage.getItem("jwt")) {
        return false;
    }
    if (JSON.parse(localStorage.getItem("jwt")).user.type === 'user') {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else return false
}