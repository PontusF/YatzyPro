// Ett sätt att skriva en component...
const Product = {
        props: ['product'],
        template: `
        <div>
            <p> {{ this.product.name }} </p>
            <p v-if="this.product.price"> {{ this.product.price }} </p>
        </div>
    `
    }
    // ...och ett annat.
Vue.component('product-list', {
    props: ['title', 'products'],
    components: {
        'product-holder': Product
    },
    template: `
        <section>
            <h1> {{ title }} </h1>
            <product-holder
              v-for="product, index in products"
              v-bind:product="product"
              v-bind:key="index">
            </product-holder>
            <h3 v-if="totalSum>0" > {{ totalSum }} </h3>
        </section>
    `,
    computed: {
        totalSum: function() {
            // Räkna bara ut om title är varukorg.
            if (this.title == "Varukorg") {
                var total = this.products.reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue.price;
                }, 0);
                return total;
            }
        }
    }
})

// Här är "root-komponenten", dvs själva appen, 
// den som är kopplad till ett element på sidan.
const app = new Vue({
    el: "#app",
    data: {
        products: [{
            name: "Korv",
            price: 23
        }, {
            name: "Fisk",
            price: 39
        }, {
            name: "Gurka",
            price: 12
        }],
        varukorg: []
    },
    component: ['product-list']
})