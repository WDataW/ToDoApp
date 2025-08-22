export function hidePageContents(el, overlay = false) {
    document.documentElement.classList.add("overflow-hidden");

}
export function showPageContents(el, overlay = false) {
    document.documentElement.classList.remove("overflow-hidden");
}