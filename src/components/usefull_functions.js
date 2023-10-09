export let toggleClass = function (target, attribute) {
    let Target = document.querySelector(target);
    Target.classList.toggle(attribute);
}

export let removeClass = function (target, attribute) {
    let Target = document.querySelector(target);
    Target.classList.remove(attribute);
}

export let addClass = function (target, attribute) {
    let Target = document.querySelector(target);
    Target.classList.add(attribute);
}