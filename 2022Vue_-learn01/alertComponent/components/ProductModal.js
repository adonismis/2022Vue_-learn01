let delProductModal     = null;
let delProductModalHtml = 
  `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel" aria-hidden="true">
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
          <strong class="text-danger">{{tempProdcut.title}}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="destroyProduct()">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

let updateproductModal  = null;
let productModalHtml    = `
  <div id="updateproductModal" ref="updateproductModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
           aria-hidden="true">
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
                    主圖網址：
                    <div class="mb-2">
                      <div class="mb-3">
                        <label for="imageUrl" class="form-label">輸入圖片網址</label>
                        <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProdcut.imageUrl">                      
                      </div>
                      <img class="img-fluid" :src="tempProdcut.imageUrl" alt="" v-if="tempProdcut.imageUrl!=''" onerror="this.src='https://media.istockphoto.com/photos/frolic-smiling-pug-puppy-dog-with-yellow-constructor-helmet-holding-picture-id1127384534?s=612x612'">
                    </div>
                    <hr>
                    次圖圖片：
                    <div>
                      <input type="text" class="form-control" placeholder="請輸入次圖片連結" >                      
                      <button class="btn btn-outline-primary btn-sm d-block w-100" @click="pushImg()">
                        新增圖片
                      </button>
                    </div>
                    <div v-for="(image, index) in tempProdcut.imagesUrl" :key="index">
                      <img :src="tempProdcut.imagesUrl[index]" :alt="tempProdcut.title + '_img' + index" class="img-fluid">
                      <button class="btn btn-outline-danger btn-sm d-block w-100" @click="RemoveImg(index)">
                        刪除圖片
                      </button>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="mb-3">
                      <label for="title" class="form-label">標題</label>
                      <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProdcut.title">
                    </div>

                    <div class="row">
                      <div class="mb-3 col-md-6">
                        <label for="category" class="form-label">分類</label>
                        <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="tempProdcut.category">
                      </div>
                      <div class="mb-3 col-md-6">
                        <label for="price" class="form-label">單位</label>
                        <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProdcut.unit">
                      </div>
                    </div>

                    <div class="row">
                      <div class="mb-3 col-md-6">
                        <label for="origin_price" class="form-label">原價</label>
                        <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tempProdcut.origin_price">
                      </div>
                      <div class="mb-3 col-md-6">
                        <label for="price" class="form-label">售價</label>
                        <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="tempProdcut.price">
                      </div>
                    </div>
                    <hr>

                    <div class="mb-3">
                      <label for="description" class="form-label">產品描述</label>
                      <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model="tempProdcut.description">
                      </textarea>
                    </div>
                    <div class="mb-3">
                      <label for="content" class="form-label">說明內容</label>
                      <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容" v-model="tempProdcut.content">
                      </textarea>
                    </div>
                    <div class="mb-3">
                      <div class="form-check">
                        <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempProdcut.is_enabled" >
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
                <button type="button" class="btn btn-primary" @click="tempProdcut?.id!=''?updateProduct(tempProdcut):storeProduct(tempProdcut)">
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
`;

export const ProductModal = {
    data() {
      return {
        tempProdcut: {},
        isNew: '',
      }
    },
    methods: {
        deleteProduct() {
          delProductModal.show();
        },
        openModal(isNew, item) {
          if (isNew === 'create') {
            this.tempProduct = { // 需要做清空物件的動作
              imagesUrl: [],
            };
            this.isNew = isNew;
            updateproductModal.show();
          } else if (isNew === 'edit') {
            this.tempProduct = { ...item }; 
            this.isNew = isNew;
            updateproductModal.show();
          } else if (isNew === 'delete') {
            this.tempProduct = { ...item };
            delProductModal.show()
          }
        } 
    },
    mounted() {
        //updateproductModal = new bootstrap.Modal(document.getElementById('#updateproductModal'));
        delProductModal = new bootstrap.Modal(document.querySelector("#delProductModal"));
        updateproductModal = new bootstrap.Modal(document.querySelector("#updateproductModal"));
        
        //this.openModal('create', '');
    },
    template: delProductModalHtml + productModalHtml,
  }
