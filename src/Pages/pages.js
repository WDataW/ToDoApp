export function hidePageContents(el, overlay = false) {
    if (!overlay) document.documentElement.classList.add("overflow-hidden");

}
export function showPageContents(el, overlay = false) {
    if (!overlay) document.documentElement.classList.remove("overflow-hidden");
}