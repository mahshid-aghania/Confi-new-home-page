export const runTests = false;

// add checkmark
export function addCheck(elID, successful = true) {
     const el = document.getElementById(elID);
     if (el && successful) {
         const checkMark = '<i style="color: green;" class="fa-solid fa-check"></i>';
         el.innerHTML = checkMark + ' ' + el.innerHTML;
     } else if (el && !successful) {
         const xMark = '<i style="color: red;" class="fa-solid fa-x"></i>';
         el.innerHTML = xMark + ' ' + el.innerHTML;
     }
}
