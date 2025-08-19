export function hidePageContents(el, overlay = false) {
    const page = el.closest(overlay ? ".overlay-target" : ".page-target");
    const main = page.querySelector("main");
    main.classList.add("hidden");

    const header = page.querySelector("header");
    header.classList.add("hidden");
}
export function showPageContents(el, overlay = false) {
    const page = el.closest(overlay ? ".overlay-target" : ".page-target");

    const main = page.querySelector("main");
    main.classList.remove("hidden");

    const header = page.querySelector("header");
    header.classList.remove("hidden");
}