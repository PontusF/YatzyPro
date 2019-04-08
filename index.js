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
        </section>
    `
})

// Här är "root-komponenten", dvs själva appen, 
// den som är kopplad till ett element på sidan.
const app = new Vue({
    el: "#app",
    data: {
        products: [{
                name: "Lampa",
                price: 200
            },
            {
                name: "Stol",
                price: 2100
            },
            { name: "Soffa" },
            { name: "Bord" }
        ],
        varukorg: []
    },
    component: ['product-list']
})