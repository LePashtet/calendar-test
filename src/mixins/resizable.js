export default {
  methods: {
    onResize($e, item) {
      console.log($e);
      localStorage.setItem("itemID", item.id);
    },
    resized($e) {
      console.log($e);
      const itemID = localStorage.getItem("itemID");
      let endAdd = Math.floor($e.height / 64.5);
      this.$events.forEach(event => {
        if (event.id + "" === itemID) {
          let end = event.timeEnd + endAdd;
          this.$set(event, "timeEnd", end);
        }
      });
    }
  }
};
