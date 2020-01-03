"use strict";

console.log('%c ALT+CLICK copy and append to clipboard', 'color: #cc00cc;, padding: 16px; font-size: 20px; font-weight: bold');
console.log('Multiple selections are welcome!')

var TXTS = [];
document.addEventListener('click', function altCopyFunction(e) {
    if (!e.altKey || !e.target.textContent) {
        return;
    };
    e.stopPropagation(); // We dont wan't other events firing
    e.preventDefault(); // Prevents link/acnhor opening on alt click

    var txt = e.target.textContent;

    var toggleOn = e.target.classList.toggle('tooltip');

    console.log('toggleOn', toggleOn);

    !toggleOn ? removeItem(txt) : TXTS.push(txt);

    copyText();
}, {
    passive: false
});

function removeItem(txt) {
    TXTS.forEach(function (val, idx) {
        var equal = val === txt ? true : false;
        if (equal) {
            TXTS.splice(idx, 1);
        }
    });
};

function copyText() {
    var inputEl = document.createElement('input');
    document.body.appendChild(inputEl);
    inputEl.classList.add('hidden-input-txt');
    inputEl.value = TXTS.join(' ') || ' ';
    inputEl.select();
    document.execCommand("copy");
    return setTimeout(function () {
        inputEl.remove();
    }, 666);
};
