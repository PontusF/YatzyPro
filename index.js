// Ett sätt att skriva en component...
const Product = {
        props: ['product'],
        template: `
        <div>
            <p> {{ this.product.name }} </p>
            <p v-if="this.product.consumerPrice"> {{ this.product.consumerPrice }} </p>
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
            <h3 v-if="totalSum>0" >Totalt: {{ totalSum }} </h3>
        </section>
    `,
    computed: {
        totalSum: function() {
            // Räkna bara ut om title är varukorg.
            if (this.title == "Varukorg") {
                var total = this.products.reduce(function(accumulator, product) {
                    return accumulator + product.consumerPrice;
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
        products: [],
        varukorg: []
    },
    mounted: function() {

        var self = this;
        var xhr = new XMLHttpRequest;

        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
                console.log(xhr.response.products)
                self.products = xhr.response.products;
            }
        }

        xhr.open("GET", "https://www.hulabeck.se/html/temp/products.json");
        xhr.responseType = "json";
        xhr.send();
    }
})