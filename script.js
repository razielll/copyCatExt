"use strict";

window.onload = function () {
    console.log('%cALT+CLICK any text to copy and append to clipboard', 'color: #cc00cc;, padding: 16px; font-size: 20px; font-weight: bold');

    let TXTS = [];
    document.body.addEventListener('click', handleClickForCopy, {
        capture: true,
        passive: false
    });

    let removeTxt = currTxt => TXTS = TXTS.filter(txt => currTxt !== txt);


    function handleClickForCopy(e) {
        if (!e.altKey || typeof e.target.textContent !== 'string') return;

        e.stopPropagation(); // We dont wan't other events firing
        e.preventDefault(); // Prevents link/acnhor opening on alt click
        let txtContent = e.target.textContent;

        let isToggle = e.target.classList.toggle('tooltip');

        isToggle ? TXTS.push(txtContent) : removeTxt(txtContent);

        copyText();
    };

    function copyText() {
        let inputEl = document.createElement('input');
        inputEl.classList.add('temp-input-holder');
        document.body.appendChild(inputEl);
        inputEl.value = TXTS.join(' ') || ' ';
        inputEl.select();
        document.execCommand("copy");
        return setTimeout(function () {
            inputEl.remove();
        }, 50);
    };
}();