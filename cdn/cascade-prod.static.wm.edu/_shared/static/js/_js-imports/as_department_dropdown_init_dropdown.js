export function as_department_dropdown_init_dropdown() {
    const button = document.getElementById("departmentMenuButton");
    const menu = document.getElementById("departmentMenu");

    if (!button || !menu) {
        return;
    }

    button.addEventListener("click", (e) => {
        e.stopPropagation();

        const expanded =
            button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!expanded));
        menu.classList.toggle("is-open");
    });

    document.addEventListener("click", (e) => {
        if (
            !button.contains(e.target) &&
            !menu.contains(e.target)
        ) {
            button.setAttribute("aria-expanded", "false");
            menu.classList.remove("is-open");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            button.setAttribute("aria-expanded", "false");
            menu.classList.remove("is-open");
            button.focus();
        }
    });
}