const url     = "https://vue3-course-api.hexschool.io/v2";
const pathdir = "/2022Vue_-learn01/alertComponent";
const path    = "adonismis";

import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import { ProductModal } from './components/ProductModal.js';

export const app = {
  init(webpage='index'){
    createApp({
      data() {
        return {
          token: document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
          url: url,
          pathdir: pathdir,
          path: path,
        };
      },
      components: {
        ProductModal
      },
      methods: {
        getCheck() {
          // 產品頁確認是否登入
          axios.defaults.headers.common["Authorization"] = this.token;
          axios
            .post(`${this.url}/api/user/check`)
            .then((req) => {
              alert("test");
              // this.getProducts();
            })
            .catch((err) => {
              alert(
                err?.data?.message ? err.data.message : "發生錯誤，請重新登入!"
              );
              document.location.href = `${this.pathdir}/login.html`;
            });
        },
        getchecklogin() {
          // 登入頁確認是否登入
          axios.defaults.headers.common["Authorization"] = this.token;
          axios
            .post(`${this.url}/api/user/check`)
            .then((req) => {
              document.location.href = `${this.pathdir}/index.html`;
            })
            .catch((err) => {
              console.dir(err);
            });
        },
        signin() {
          axios
            .post(`${this.url}/admin/signin`, this.user)
            .then((res) => {
              const { token, expires } = res.data;
              document.cookie = `hexToken=${token}; expires=${new Date(expires)};`;
              this.token = token;
    
              this.getcheck();
            })
            .catch((err) => {
              console.dir(err);
            });
        },
      },
      mounted() {
        alert("webpage");

        // if(this.webpage=="login"){
        //   this.getchecklogin();
        // }else if(this.webpage=="index"){          
        //   this.getCheck();
        // }        
      },
    }).mount("#app");
  }
}