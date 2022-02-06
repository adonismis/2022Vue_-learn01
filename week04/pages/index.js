import { ProductModal } from "../components/ProductModal.js"; //components
import { Pagination } from "../components/Pagination.js"; //components
export const vuefn = {
  data: {
    products: [],
    perpage: 5,
    currentpage: 0,
    totalpage: 0,
    props_modal: {},
  },
  methods: {
    getCheck() {
      // 產品頁確認是否登入
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
          document.location.href = `${this.pathdir}/login.html`;
        });
    },
    getProducts() {
      axios
        .get(`${this.url}/api/${this.path}/admin/products/all`)
        .then((req) => {
          this.products = req.data.products;
        })
        .catch((err) => {
          alert('發生錯誤!!');
        });
    },
    update_currentpage(val){
      this.currentpage = val
    },
    update_product(val){
      const isNew = val.isNew;
      const product    = val.product;
      const product_id = val.product_id;

      if (isNew=="create") {
        this.getProducts();
      } else if (isNew=="edit") {
        this.products[product_id] = product;
      } else if (isNew=="delete") {
        delete this.products[product_id];
        this.currentpage = 0; //刪除後回到第一頁
      }
    },
  },
  components: { ProductModal, Pagination },
  computed: {
    props_pagination() {
          return {currentpage: this.currentpage,totalpage: this.totalpage}
        },
        productsArray() {
          let products    = this.products;
          let perpage     = this.perpage;
          let currentpage = this.currentpage;
          let data        = [];

          //分頁
          Object.keys(products).forEach((key, index) => {
            let pageindex = parseInt(index/perpage);
            if(data[pageindex]== undefined){
              data[pageindex] = [];
            }
            data[pageindex].push(products[key]);
          });

          this.totalpage = data?.length?data?.length:0;
          return data[currentpage];
        }
  },
};

