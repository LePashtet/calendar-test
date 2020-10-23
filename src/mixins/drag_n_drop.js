export default {
  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData("itemID");
      this.$events.forEach(event => {
        if (event.id + "" === itemID) {
          let timeEnd = list[1] + (event.timeEnd - event.timeStart);
          this.$set(event, "timeStart", list[1]);
          this.$set(event, "timeEnd", timeEnd);
          this.$set(event, "date", this.format(list[0], "LL.dd.yyyy"));
        }
      });
    }
  }
};
