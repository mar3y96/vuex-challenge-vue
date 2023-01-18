<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/nav/TheHeader.vue';

export default {
  components: {
    TheHeader
  },
  data() {
    return {
      isLoggedIn: this.$store.getters.loggInCheck,
      products: this.$store.getters.getProducts,
      cart: { items: this.$store.getters.allItems, total: this.$store.getters.getTotal, qty: this.$store.getters.getQty },
    };
  },
  
  methods: {
    addProductToCart(productData) {
      this.$store.dispatch('addProductToCart',{productData:productData});
      
    },

    removeProductFromCart(prodId) {
      this.$store.dispatch('removeProductFromCart',{prodId:prodId});
     
    },
    login() {
      this.$store.dispatch('setAuth',{auth:true})
      
    },
    logout() {
      this.$store.dispatch('setAuth',{auth:false})
      
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>