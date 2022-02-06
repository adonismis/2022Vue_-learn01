//-----Pagination-----//
let PaginationHtml = 
`
<nav aria-label="Page navigation">
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{'disabled':currentpage==0}" @click="currentpageEmit(0)"><a class="page-link">最前頁</a></li>
    <li class="page-item" v-for="index in totalpage" :key="index" :class="{'disabled':currentpage==index-1}"><a class="page-link" @click="currentpageEmit(index-1)">{{index}}</a></li>
    <li class="page-item" :class="{'disabled':currentpage==totalpage-1}" @click="currentpageEmit(totalpage-1)"><a class="page-link">最後頁</a></li>
  </ul>
</nav>
`;
//-----Pagination-----//




export const Pagination = {
  data() {
    return {
      currentpage: 0,
      totalpage: 0,
    };
  },
  props: {
    props_pagination_options: Object,
  },
  emits: ['emit_currentpage'],
  methods: {
    //回傳目前頁數上傳至上一層
    currentpageEmit(currentpage) {
      this.$emit('emit_currentpage', currentpage); 
    },
  },  
  watch: {
    props_pagination_options: function (val) {
      this.currentpage = val.currentpage;
      this.totalpage = val.totalpage;
    },
  },
  template: PaginationHtml,
};
