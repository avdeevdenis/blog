const selectText = (elem: HTMLDivElement, callback?: () => void) => {
    if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(elem);

        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    callback && callback();
}

export const copyText = (domElem: HTMLDivElement, callback?: () => void) => {
    selectText(domElem, callback);

    document.execCommand('copy');

    const section = window.getSelection();
    section && section.removeAllRanges();
};
