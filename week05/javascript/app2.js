import { config } from './config.js'; //設定檔相關變數

 export const app = {
  init(){
    //----------- Vue起手式 -----------//

    Object.keys(VeeValidateRules).forEach(rule => {
        if (rule !== 'default') {
          VeeValidate.defineRule(rule, VeeValidateRules[rule]);
        }
    });

    VeeValidateI18n.loadLocaleFromURL('./javascript/zh_TW.json');

    // Activate the locale
    VeeValidate.configure({
        generateMessage: VeeValidateI18n.localize('zh_TW'),
        validateOnInput: true, // 調整為輸入字元立即進行驗證
    });

    Vue.createApp({
      data() {
        return {
          token: document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
          url: config.url,
          pathdir: config.pathdir,
          path: config.path,
          cartData: '',
          productsArray: {},
          fullPage: true,
          isLoadingId: '', 
          orderUser:{}
        };
      },
      methods: {
        getProducts() {
            axios
                .get(`${this.url}/api/${this.path}/products/all`)
                .then((req) => {
                    this.productsArray = req.data.products;
                })
                .catch((err) => {
                alert('發生錯誤!!');
                });
        },
        openProductModal(product) {
          this.isLoadingId = product.id;
          this.$refs.productModal.openModal({...product});
          this.isLoadingId = '';
        },
        getCart() {
          axios.get(`${this.url}/api/${this.path}/cart`).then((res) => {
            console.log(res.data.data);
            this.cartData = res.data.data;
          });
        },
        addToCart(id, qty = 1) {
          const data = {
            product_id: id,
            qty,
          };
          this.isLoadingId = id;
          axios.post(`${this.url}/api/${this.path}/cart`, { data }).then((res) => {
            this.getCart();
            this.$refs.productModal.closeModal();
            this.isLoadingId = '';
          });
        },
        updateCart(cart) {
          const data = {
            product_id: cart.id,
            qty: cart.qty,
          };
          this.isLoadingId = cart.id;
          axios.put(`${this.url}/api/${this.path}/cart/${cart.id}`, { data }).then((res) => {
            console.log(res);
            this.getCart();
            this.isLoadingId = '';
          });
        },
        removeCart(id) {
          this.isLoadingId = id;
          axios.delete(`${this.url}/api/${this.path}/cart/${id}`).then((res) => {
            console.log(res);
            this.getCart();
            this.isLoadingId = '';
          });
        },
        removeCartAll(){
          axios.delete(`${this.url}/api/${this.path}/carts`).then((res) => {
            this.getCart();
            alert("清空清空購物車完成!");
          });
        },
        isPhone(value) {
          const phoneNumber = /^(09)[0-9]{8}$/
          return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        },
        onSubmit(){
          console.log(this.orderUser);

          alert("老師，助教：很懶!!寫的亂些~辛苦了!");
        }
      },
      mounted() {
        this.getProducts();
        this.getCart();

      },
      computed: {
      }
    })
    .component("product-modal", {
      data() {
        return {
          productModal: {},
          product: {},
          qty:1,
        };
      },
      template: "#userProductModal",
      methods: {
        openModal(product) {
          this.product = product;
          this.productModal.show();
        },
        closeModal() {
          this.productModal.hide();
        },
        addCart() {
          this.closeModal();
          this.$emit('add-cart', this.product.id, this.qty);
        },
      },
      mounted() {
        this.productModal = new bootstrap.Modal(
          this.$refs.modal
        );
      },
    })
    .component('VForm', VeeValidate.Form)
    .component('VField', VeeValidate.Field)
    .component('ErrorMessage', VeeValidate.ErrorMessage)
    .mount("#app");
    //----------- Vue起手式 -----------//
  }
}