export const vuefn = {
  data: {
    user: {},
  },
  methods: {
    getCheck() {
      // 產品頁確認是否登入
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
          this.getCheck();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  components: {},
  mounted: {},
  computed: {},
};
