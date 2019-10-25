function Vue() {
  this.$data = {
    a: 1
  }
  this.el = document.getElementById('app');
  this.ast = '';
  this.observe(this.$data);
  this.render();
}
Vue.prototype.observe = function() {
  var self = this;
  this.$data = new Proxy(this.$data, {
    set(target, key, newValue) {
      // 触发更新
      target[key] = newValue;
      self.render();
    },
    get(target, key) {
      // 依赖收集
      return target[key];
    }
  })
}
Vue.prototype.render = function() {
  this.ast = `this is ${this.$data.a}`;
  this.el.innerHTML = this.ast;
}
