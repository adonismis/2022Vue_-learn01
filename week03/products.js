import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

let productModal = "";
let delProductModal = "";
createApp({
  data() {
    return {
      imgUrl: "",
      addPicUrl: "",
      tempProdcut: "",
      products: [],
      token: document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      ),
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "adonismis",
    };
  },
  methods: {
    getCheck() {
      axios.defaults.headers.common["Authorization"] = this.token;
      axios
        .post(`${this.url}/api/user/check`)
        .then((req) => {
          this.getProducts();
        })
        .catch((err) => {
          alert(
            err?.data?.message ? err.data.message : "發生錯誤，請重新登入!"
          );
          document.location.href = "/2022Vue_-learn01/week03/login.html";
        });
    },
    getProducts() {
      axios
        .get(`${this.url}/api/${this.path}/admin/products/all`)
        .then((req) => {
          this.products = req.data.products;
        })
        .catch((err) => {
          this.megAlert(err);
        });
    },
    createProduct() {
      this.tempProdcut = {
        addPicUrl: "",
        category: "",
        content: "",
        description: "",
        id: "",
        imageUrl: "",
        imagesUrl: "",
        is_enabled: "",
        origin_price: "",
        price: "",
        title: "",
        unit: "",
      };
      productModal.show();
    },
    storeProduct(product) {
      axios
        .post(`${this.url}/api/${this.path}/admin/product/`, {
          data: { ...product },
        })
        .then((req) => {
          this.getProducts();
          alert("新增完成");
          productModal.hide();
        })
        .catch((err) => {
          this.errAlert(err);
        });
    },
    editProduct(product) {
      this.tempProdcut = { ...product };
      //console.log(this.tempProdcut);
      productModal.show();
    },
    updateProduct(product) {
      axios
        .put(`${this.url}/api/${this.path}/admin/product/${product.id}`, {
          data: { ...product },
        })
        .then((req) => {
          this.getProducts();
          alert("修改完成");
          productModal.hide();
        })
        .catch((err) => {
          this.errAlert(err);
        });
    },
    deleteProduct(product) {
      this.tempProdcut = { ...product };
      delProductModal.show();
    },
    destroyProduct() {
      delProductModal.hide();
      axios
        .delete(
          `${this.url}/api/${this.path}/admin/product/${this.tempProdcut.id}`
        )
        .then((req) => {
          this.getProducts();
          alert("刪除完成");
        })
        .catch((err) => {
          this.errAlert(err);
        });
    },
    pushImg() {
      if (this.addPicUrl == "") return;
      if (this.tempProdcut.imagesUrl == undefined) {
        this.tempProdcut.imagesUrl = [];
      }
      this.tempProdcut.imagesUrl.push(this.addPicUrl);
      this.addPicUrl = "";
    },
    RemoveImg(index) {
      this.tempProdcut.imagesUrl.splice(index, 1);
      alert("圖片已刪除，請點再選「確認」鈕以利存檔!");
    },
    errAlert(err) {
      //console.dir(err);
      const msgs = err?.data?.message;
      let msg = "發生錯誤：\n";
      msgs.forEach(function (value) {
        msg += value + "\n";
      });
      alert(msg);
    },
  },
  mounted() {
    this.getCheck();
    productModal = new bootstrap.Modal(document.querySelector("#productModal"));
    delProductModal = new bootstrap.Modal(
      document.querySelector("#delProductModal")
    );
  },
}).mount("#app");