import { createStore } from 'vuex';
const cartMedule = {
  state() {
    return {
      items: [],
      total: 0,
      qty: 0,
    };
  },
  mutations:{
    addProductToCartMuta(state,payLoad) {
       
        const productInCartIndex = state.items.findIndex(
          (ci) => ci.productId === payLoad.productData.id
        );
  
        if (productInCartIndex >= 0) {
            state.items[productInCartIndex].qty++;
        } else {
          const newItem = {
            productId: payLoad.productData.id,
            title: payLoad.productData.title,
            image: payLoad.productData.image,
            price: payLoad.productData.price,
            qty: 1,
          };
          state.items.push(newItem);
        }
        state.qty++;
        state.total += payLoad.productData.price;
      },
  
      removeProductFromCartMut(state,payLoad) {
        const productInCartIndex = state.items.findIndex(
          (cartItem) => cartItem.productId === payLoad.prodId
        );
        const prodData = state.items[productInCartIndex];
        state.items.splice(productInCartIndex, 1);
        state.qty -= prodData.qty;
        state.total -= prodData.price * prodData.qty;
      },
      
  },
  getters:{
        allItems(state){
            return state.items
        },
        getTotal(state){
            return state.total
        },
        getQty(state){
            console.log(state.qty);
            return state.qty
        },
        cart(_,getters){
            return {
                items:getters.allItems,
                total:getters.getTotal,
                qty:getters.getQty
            }
        }
  },
  actions:{
    addProductToCart(context,payLoad){
        // console.log(payLoad);
        // console.log(context.getters.getQty);
        context.commit('addProductToCartMuta',payLoad)
    },
    removeProductFromCart(context,payLoad){
      context.commit('removeProductFromCartMut',payLoad)
    }
  }

};
const store = createStore({
  modules: {
    cart: cartMedule,
  },
  state() {
    return {
      isLoggedIn: false,
      products: [
        {
          id: 'p1',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Books_HD_%288314929977%29.jpg/640px-Books_HD_%288314929977%29.jpg',
          title: 'Book Collection',
          description:
            'A collection of must-read books. All-time classics included!',
          price: 99.99,
        },
        {
          id: 'p2',
          image:
            'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Tent_at_High_Shelf_Camp_cropped.jpg/640px-Tent_at_High_Shelf_Camp_cropped.jpg',
          title: 'Mountain Tent',
          description: 'A tent for the ambitious outdoor tourist.',
          price: 129.99,
        },
        {
          id: 'p3',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/640px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
          title: 'Food Box',
          description:
            'May be partially expired when it arrives but at least it is cheap!',
          price: 6.99,
        },
      ],
    };
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    loggInCheck(state) {
      
      return state.isLoggedIn;
    },
  },
  mutations: {
    setAuth(state, payLoad) {
      state.isLoggedIn = payLoad.auth;
    },
  },
  actions: {
    login(context) {
      context.commit('setAuth', { auth: true });
    },
    logout(context) {
      context.commit('setAuth', { auth: false });
    },
  },
});
export default store;
