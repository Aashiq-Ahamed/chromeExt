document.getElementById('extractBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: extractVisibleText
        }, (results) => {
            if (results && results[0] && results[0].result) {
                const jsonString = JSON.stringify(results[0].result, null, 2);
                document.getElementById('output').textContent = jsonString;
            } else {
                document.getElementById('output').textContent = 'No visible text found or an error occurred.';
            }
        });
    });
});

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
