import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import { config } from './config.js'; //設定檔相關變數
//import { vuefn } from './router.js'; //設定router

 export const app = {
  async init(){
    //----------- router -----------//
    let vuefn    = {};//Vue相關物件及函數引入
    let pathname = window.location.pathname;
    let router   = pathname.substring(pathname.lastIndexOf('/')+1);
    
    //判斷從哪個檔名進來，以分配相關功能。
    const routerName = ['index', 'login'];
    let webname  = router.split(".", 1);
    var isAction = routerName.some(function(item){
      return item == webname;
    });
    if (isAction) {
      //動態載入所屬頁面相關資料
      const page = await import(`./pages/${webname}.js`);
      vuefn = page.vuefn;
    } else {
      document.open();
      document.write("<h1>該頁尚未設定無法進入!</h1>");
      document.close();
    }
    //----------- router -----------//
 

    //----------- Vue起手式 -----------//
    createApp({
      data() {
        return {
          token: document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          ),
          url: config.url,
          pathdir: config.pathdir,
          path: config.path,
          ...vuefn.data,
        };
      },
      components: {        
        ...vuefn.components
      },
      methods: {
        ...vuefn.methods,
      },
      mounted() {
        this.getCheck();
      },
      computed: {
        ...vuefn.computed,
      }
    }).mount("#app");
    //----------- Vue起手式 -----------//
  }
}