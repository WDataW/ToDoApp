const icons = import.meta.glob("/src/assets/icons/**/*.svg", { eager: true });
export function getIcon(src) {
    return icons[src]?.default || null;
}

