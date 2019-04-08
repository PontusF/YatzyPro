const Product = {
    props: ['product'],
    template: `
        <div>
            <p> {{ this.product }} </p>
        </div>
    `
}

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


const app = new Vue({
    el: "#app",
    data: {
        products: [
            "Lampa",
            "Stol",
            "Soffa",
            "Bord"
        ],
        varukorg: []
    },
    component: ['product-list']
})