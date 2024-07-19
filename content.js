function extractVisibleText() {
    const getTextNodes = (element) => {
        const textNodes = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => {
                // Filter out text nodes that are not visible
                return (node.parentElement.offsetParent !== null || node.parentElement.tagName === 'BODY') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        });

        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        return textNodes;
    };

    const textNodes = getTextNodes(document.body);
    const visibleText = textNodes.map(node => node.textContent.trim()).filter(text => text.length > 0);

    return { textContent: visibleText };
}