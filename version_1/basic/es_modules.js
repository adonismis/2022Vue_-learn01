
export default {
  fn() {
    console.log('這是外部匯入的方法');
  }
}

export function fn() {
  console.log('這是外部匯入的具名函式');
}