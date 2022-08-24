appModule.factory("NotificationService", NotificationService);

function NotificationService() {

    function _notify(msg, duration){
        duration = !!duration ? duration : 2000;
        var el = document.createElement("div");
        el.setAttribute('class', 'popup-container');
        el.classList.add('popup-animation-enter');
        el.innerHTML = msg;
        setTimeout(() => {
            el.classList.replace('popup-animation-enter', 'popup-animation-leave');
            setTimeout(() => {
                el.parentNode.removeChild(el);
            },400);
        },duration);
        document.body.appendChild(el);
    }

    return {
        notify: _notify
    };
}