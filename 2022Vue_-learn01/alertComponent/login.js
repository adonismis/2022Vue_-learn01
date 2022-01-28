import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";

createApp({
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "adonismis",
      token: document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      ),
      products: [],
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    getcheck() {
      // 確認是否登入
      axios.defaults.headers.common["Authorization"] = this.token;
      axios
        .post(`${this.url}/api/user/check`)
        .then((req) => {
          document.location.href = "/2022Vue_-learn01/alertComponent/index.html";
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
    this.getcheck();
  },
}).mount("#app");
