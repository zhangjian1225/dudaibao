(function (doc, win) {
    window.base = document.documentElement.clientWidth / 750;
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            window.clientWidth = docEl.clientWidth;
            window.clientHeight = docEl.clientHeight;
            var aspectRatio = window.clientWidth/window.clientHeight;
            // if(aspectRatio > 750 / 1334){
            //     docEl.style.fontSize = 100 * (window.clientHeight / 1334) + 'px';
            //     window.base = 100 * (window.clientHeight / 1334); 
            // }else{
                docEl.style.fontSize = 100 * (window.clientWidth / 750) + 'px';
                window.base = 100 * (window.clientWidth / 750); 
            // }
        };
    recalc();
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
// (function (doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function () {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             if(clientWidth>=640){
//                 docEl.style.fontSize = '100px';
//             }else{
//                 docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
//             }
//         };

//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);