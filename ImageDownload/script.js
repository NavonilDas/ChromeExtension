function ClickMe(){
    chrome.tabs.executeScript({
        file:"jspdf.min.js"
    });
    chrome.tabs.executeScript(null, {
        file: "backend.js"
    }, function() {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        }
    });
}

document.addEventListener('DOMContentLoaded',function(){
    const button = document.getElementsByTagName('button')[0];
    button.addEventListener('click',ClickMe);
});