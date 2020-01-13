import Modal from "./modal";

export function initForm() {
    const forms = document.forms;
    if(!forms.length) return;

    for (const form of forms) {

        form.onsubmit = async function (event) {
            event.preventDefault();

            let data = new FormData(this);

            try {
                let response = await fetch(this.action, {
                    method: this.method,
                    credentials: 'omit',
                    body:  data,
                });


                if (response.status == 200) {
                    let modalSend = document.querySelector('.modal.sent');
                    if (modalSend) {
                        modalSend = new Modal(modalSend);
                        modalSend.on();
                    }
                } else {
                    let modalSend = document.querySelector('.modal.sent.error');
                    if (modalSend) {
                        modalSend = new Modal(modalSend);
                        modalSend.on();
                    }
                }

                let result = await response.json();
                console.log(result);

            } catch (e) {
                let modalSend = document.querySelector('.modal.sent.error');
                if (modalSend) {
                    modalSend = new Modal(modalSend);
                    modalSend.on();
                }
                console.log(e)
            }
        };
    }
}

export function formDropdown(selector = '.search__dropdown', selectorTrigger = '.search__input') {
    const element = document.querySelector(selector);

    if(!element) return;

    const toggle = function(event) {
        event.stopPropagation();
        if (element.classList.contains('active')) return;
        element.classList.toggle('active');

        setTimeout(function () {
            document.body
              .addEventListener('click', clear, { capture: false, passive: true });
        }, 0);
    };


    const form =  document.querySelector('form.search');
    const trigger = form.querySelector(selectorTrigger);
    if (trigger) {
        form.addEventListener('submit', toggle, { capture: false, passive: true });
        trigger.addEventListener('input', toggle, { capture: false, passive: true });
    }

    function clear() {
        element.classList.remove('active');

        document.body
          .removeEventListener('click', clear, { capture: false })
    }
}

