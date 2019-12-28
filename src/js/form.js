import { searchTarget } from "./mobile-menu";
import Modal from "./modal";

export function initForm() {
    const forms = document.forms;
    if(!forms.length) return;

    for (const form of forms) {

        form.onsubmit = async function (event) {
            event.preventDefault();

            let data = new FormData(this);

            const formBasket = this.classList.contains('basket_form');
            if (formBasket) {
                data = createDataProduct.call(this, data);
            }

            try {
                let response = await fetch(this.action, {
                    method: this.method,
                    credentials: 'omit',
                    body:  data,
                });
                console.log(true);
                if (formBasket) {
                    let modalSend = document.querySelector('.modal.sent.basket_sent');
                    if (modalSend) {
                        modalSend = new Modal(modalSend);
                        modalSend.on();
                    }
                } else {
                    let modalSend = document.querySelector('.modal.sent');
                    if (modalSend) {
                        modalSend = new Modal(modalSend);
                        modalSend.on();
                    }
                }

                if (response.status != 200) {
                    console.log(response);
                    return
                }

                let result = await response.json();
                console.log(result);

            } catch (e) {
                console.log(e)
            }
        };
    }

    function createDataProduct(data) {
        const products = [];

        data.delete('count');

        this.querySelectorAll('.gall_prod')
            .forEach((el, i) => {
                const val = el.querySelector("input[name=count]").value;
                if (val > 0) {
                    products.push([el.querySelector('.title').textContent, val])
                }
            });

        products.forEach((product, i) => {
            data.append('product['+i+']', product[0]);
            data.append('product['+i+']', product[1]);
        });

        return data
    }
}

export function formBasket() {
    const form = document.forms.basket;

    if (!form) return;

    class Basket {
        static formatPrice(value) {
            return value.replace( /([0-9]\d{0,2})(\d{3})?(\d{3})?(\.\d{2})?$/, (num, p1, p2, p3, p4) => {
                p2 = (p2) ? ' ' + p2 : '';
                p3 = (p3) ? ' ' + p3 : '';
                p4 = (+p4[1] + +p4[2]) ? p4 : '';
                return p1 + p2 + p3 + p4;
            } );
        }

        static formatAppend(target, value) {
            target.textContent = target.textContent.replace(/\d{1,3}(\s\d{3}){0,3}\.?\d{0,2}/i, value);
        }

        constructor(form,
                    deliveryNone,
                    selectorProductsPrice = '.productsPrice',
                    selectorDeliveryPrice = '.deliveryPrice',
                    selectorTotalPrice = '.totalPrice',
                    selectorDeliveryAddressInput = '.delivery .cn_input input') {
            this.form = form;
            this.productsPrice = 0;
            this.deliveryPrice = 0;
            this.deliveryPrice = 0;
            this.deliveryPrice = 0;
            this.deliveryAddressInput = this.form.querySelectorAll(selectorDeliveryAddressInput);
            this.productsPriceEl = this.form.querySelectorAll(selectorProductsPrice);
            this.deliveryPriceEl = this.form.querySelector(selectorDeliveryPrice);
            this.totalPriceEl = this.form.querySelector(selectorTotalPrice);
            this.deliveryNone = deliveryNone;
        }

        eventCount(target) {
            const countEl = target.parentElement.querySelector('input[name=count]');
            if (!countEl) return;

            let value = countEl.value;

            value = +target.value ?
                +countEl.max > value ? ++value : +countEl.max
                : +countEl.min < value ? --value : +countEl.min;

            countEl.value = value;

            this.setProdPrice(value, countEl);
        }

        eventInput(target) {
            if (!target.value) {
                target.value = +target.min;
                return
            }

            target.value = target.value.match(/[1-9]?\d$/);

            this.setProdPrice(target.value, target);
        }

        eventDelivery(target, self) {
            const formAddress = self.parentElement.querySelector('.cn_input');

            if (target.value === this.deliveryNone) {
                formAddress.classList.remove('active');
                this.deliveryAddressInput.forEach( (inputEl) => {
                    inputEl.removeAttribute('required');
                });

            } else {
                formAddress.classList.add('active');
                this.deliveryAddressInput.forEach( (inputEl) => {
                    inputEl.setAttribute('required', '');
                });
            }

            this.deliveryPrice = parseInt(target.getAttribute("data-price")).toFixed(2);

            Basket.formatAppend(this.deliveryPriceEl, Basket.formatPrice(this.deliveryPrice));

            this.setTotalPrice();
        }

        setProdPrice(count, targetInput) {
            const containerEl = targetInput.parentElement.parentElement.querySelector('.price');
            const defaultValue = targetInput.getAttribute('data-price');
            let value;

            if (count) {
                value = (defaultValue * count).toFixed(2);
                targetInput.setAttribute('data-value', value);
                value = Basket.formatPrice(value);

            } else {
                targetInput.removeAttribute('data-value');
                value = defaultValue;
            }

            Basket.formatAppend(containerEl, value);

            this.setProductsPrice();
        }

        setProductsPrice() {
            const prices = [];
            const pricesEl = this.form.querySelectorAll('input[data-value]');

            pricesEl.forEach((it) => prices.push(+it.getAttribute('data-value')));

            this.productsPrice = prices.reduce((sum, current) => sum + current, 0).toFixed(2);
            const value = Basket.formatPrice( this.productsPrice );

            this.productsPriceEl.forEach((element) => {
                Basket.formatAppend(element, value);
            });

            this.setTotalPrice();
        }
        
        setTotalPrice() {
            const value = +this.productsPrice + +this.deliveryPrice;
            Basket.formatAppend(this.totalPriceEl, Basket.formatPrice(value.toFixed(2)))
        }
    }
    
    const basketForm = new Basket(form, 'Самовывоз');



    const eventCount = searchTarget({
        fn: basketForm.eventCount.bind(basketForm),
        targets: ['BUTTON']
    });

    const eventInput = searchTarget({
        fn: basketForm.eventInput.bind(basketForm),
        targets: ['INPUT']
    });

    const eventDelivery = searchTarget({
        fn: basketForm.eventDelivery.bind(basketForm),
        targets: ['INPUT']
    });

    form.querySelector('.basket_product')
        .addEventListener('click', eventCount, { passive: true, capture: false });

    form.querySelector('.basket_product')
        .addEventListener('input', eventInput, { passive: true, capture: false });

    form.querySelector('.cn_checkbox')
        .addEventListener('change', eventDelivery,{ passive: true, capture: false });
}

