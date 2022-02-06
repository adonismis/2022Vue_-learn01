//-----彈跳刪除視窗-----//
let delProductModal = null;
let delProductModalHtml = 
`
<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 id="delProductModalLabel" class="modal-title">
                    <span>刪除產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                是否刪除
                <strong class="text-danger">{{tempProduct.title}}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <button type="button" class="btn btn-danger" @click="destroyProduct(tempProduct)">
                    確認刪除
                </button>
            </div>
        </div>
    </div>
</div>
`;
//-----彈跳刪除視窗-----//


//-----彈跳新增修改視窗-----//
let updateproductModal = null;
let productModalHtml = 
`
<div id="updateproductModal" ref="updateproductModal" class="modal fade" tabindex="-1"
    aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 id="productModalLabel" class="modal-title">
                    <span>{{isNew !='create'?'修改':'新增'}}產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-4">
                        評價星級：
                        <select v-model="tempProduct.star">
                          <option selected>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                        <hr>
                        主圖網址：
                        <div class="mb-2">
                            <div class="mb-3">
                                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                                <input type="file" class="form-control" id="imageUrl" placeholder="請選擇圖片檔案"/>
                                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="imageUrlUpload()">
                                  上傳圖片
                                </button>
                            </div>
                            <img class="img-fluid" :src="tempProduct.imageUrl" alt="" v-if="tempProduct.imageUrl!=''"
                                onerror="this.src='https://media.istockphoto.com/photos/frolic-smiling-pug-puppy-dog-with-yellow-constructor-helmet-holding-picture-id1127384534?s=612x612'">
                        </div>
                        <hr>
                        次圖圖片：
                        <div>
                            <input type="text" class="form-control" placeholder="請選擇次圖片檔案" v-model="addPicUrl">
                            <input type="file" class="form-control" id="addPicsUrl" placeholder="請選擇次圖片檔案"/>
                            <button class="btn btn-outline-primary btn-sm d-block w-100" @click="imagesUrlUpload()">
                                新增圖片
                            </button>
                        </div>
                        <div v-for="(image, index) in tempProduct.imagesUrl" :key="index">
                            <img :src="tempProduct.imagesUrl[index]" :alt="tempProduct.title + '_img' + index"
                                class="img-fluid">
                            <button class="btn btn-outline-danger btn-sm d-block w-100" @click="RemoveImg(index)">
                                刪除圖片
                            </button>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="mb-3">
                            <label for="title" class="form-label">標題</label>
                            <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                                v-model="tempProduct.title">
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="category" class="form-label">分類</label>
                                <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                                    v-model="tempProduct.category">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">單位</label>
                                <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                                    v-model="tempProduct.unit">
                            </div>
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="origin_price" class="form-label">原價</label>
                                <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                                    v-model.number="tempProduct.origin_price">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">售價</label>
                                <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                                    v-model.number="tempProduct.price">
                            </div>
                        </div>
                        <hr>

                        <div class="mb-3">
                            <label for="description" class="form-label">產品描述</label>
                            <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                                v-model="tempProduct.description">
                      </textarea>
                        </div>
                        <div class="mb-3">
                            <label for="content" class="form-label">說明內容</label>
                            <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                                v-model="tempProduct.content">
                      </textarea>
                        </div>
                        <div class="mb-3">
                            <div class="form-check">
                                <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1"
                                    :false-value="0" v-model="tempProduct.is_enabled">
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <button type="button" class="btn btn-primary" @click="tempProduct?.id!=''?updateProduct(tempProduct):storeProduct(tempProduct)">
                    確認
                </button>
            </div>
        </div>
    </div>
</div>
`;
//-----彈跳新增修改視窗-----//



export const ProductModal = {
  data() {
    return {
      tempProduct: {},
      isNew: "",
      addPicUrl: "",
    };
  },
  props: {
    props_modal_options: Object,
  },
  emits: ['emit_product'],
  methods: {
    //打開彈跳視窗
    openModal(isNew, item) {
      if (isNew === "create") {
        this.tempProduct = {
          imagesUrl: [],
        };// 需要做清空物件的動作
        this.isNew = isNew;
        updateproductModal.show();
      } else if (isNew === "edit") {
        this.tempProduct = { ...item };
        this.isNew = isNew;
        updateproductModal.show();
      } else if (isNew === "delete") {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
    //新增資料或修改資料
    updateProduct(temp_product) {
      let api = `${this.props_modal_options.url}/api/${this.props_modal_options.path}/admin/product`
      let httpMethod = 'post';
      let product_id = temp_product.id;
      let product = {...temp_product};
      let isNew = this.isNew;

      // 根據 isNew 來判斷要串接 post 或是 put API
      if (isNew=="edit") {
        // 編輯狀態
        api = `${this.props_modal_options.url}/api/${this.props_modal_options.path}/admin/product/${product_id}`;
        httpMethod = 'put';
      }

      // 因 post 和 put 需要帶的參數相同，成功後的行為也相同（整體函式架構長一樣），所以可以寫在一起
      axios[httpMethod](api, { data: product })
      .then((response) => {
        let product_id = product?.id
        //回傳值至上一層
        this.updateProductEmit({'isNew':isNew, 'product':product ,'product_id': product_id});
        
        alert(response?.data?.message);
        updateproductModal.hide();
      }).catch((err) => {
        this.errAlert(err);
      });
    },
    //刪除資料
    destroyProduct(temp_product) {
      let product_id = temp_product.id;
      let product = {...temp_product};

      delProductModal.hide();
      axios
        .delete(
          `${this.props_modal_options.url}/api/${this.props_modal_options.path}/admin/product/${product_id}`
        )
        .then((req) => {
          this.updateProductEmit({'isNew': "delete", 'product': product ,'product_id': product_id});
          alert(req?.data?.message);
        })
        .catch((err) => {
          this.errAlert(err);
        });
    },
    //新增主圖片
    imageUrlUpload(){
      const fileInput = document.querySelector('#imageUrl');
      // #1 撰寫上傳的 API 事件
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file)

      axios.post(`${this.props_modal_options.url}/api/${this.props_modal_options.path}/admin/upload`, formData)
      .then((res)=>{
        this.tempProduct.imageUrl = res.data.imageUrl;
      })
      .catch((err)=>{
        console.dir(err)
      })
    },
    //新增次圖片
    imagesUrlUpload() {
      const fileInput = document.querySelector('#addPicsUrl');

      // #1 撰寫上傳的 API 事件
      const file = fileInput.files[0];
      const formData = new FormData();
      let imageUrl = "";
      formData.append('file-to-upload', file)

      axios.post(`${this.props_modal_options.url}/api/${this.props_modal_options.path}/admin/upload`, formData)
      .then((res)=>{
        imageUrl = res.data.imageUrl;
        if (imageUrl == "") return;
        this.tempProduct.imagesUrl.push(imageUrl);
      })
      .catch((err)=>{
        console.dir(err)
      }) 
    },
    //刪除圖片
    RemoveImg(index) {
      this.tempProduct.imagesUrl.splice(index, 1);
      alert("圖片已刪除，請點再選「確認」鈕以利存檔!");
    },
    errAlert(err) {
      const msgs = err?.data?.message;
      let msg = "發生錯誤：\n";
      if(Array.isArray(msgs) && msgs.length > 0){
        msgs.forEach(function (value) {
          msg += value + "\n";
        });
      }else{
        msg += msgs ;
      }
      alert(msg);
    },
    updateProductEmit(option) {
      console.log(option);
      this.$emit('emit_product', option); 
    },
  },
  mounted() {
    //updateproductModal = new bootstrap.Modal(document.getElementById('#updateproductModal'));
    delProductModal = new bootstrap.Modal(
      document.querySelector("#delProductModal")
    );
    updateproductModal = new bootstrap.Modal(
      document.querySelector("#updateproductModal")
    );
  },
  watch: {
    props_modal_options: function (val) {
      this.openModal(val.isNew, val.item);
    },
  },
  template: delProductModalHtml + productModalHtml,
};
