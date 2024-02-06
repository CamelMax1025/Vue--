import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.15/vue.esm-browser.min.js";

const site = "https://vue3-course-api.hexschool.io/v2";
const api_path = "camelpath2";

const app = createApp({
  data() {
    return {
      tempProduct: {},
      products: {},
    };
  },
  methods: {
    checkUser() {
      const api = `${site}/api/user/check`;
      axios
        .post(api)
        .then((res) => {
          console.log(res.data.success);
          if (res.data.success) {
            this.getData();
          }
        })
        .catch((err) => {
          console.log(err);
          window.location = "index.html";
        });
    },
    getData() {
      const api = `${site}/api/${api_path}/admin/products/all`;
      axios.get(api).then((res) => {
        this.products = res.data.products;
        console.log(this.products);
      });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)camelpath2\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.checkUser();
    // this.getData();
  },
});

app.mount("#app");
