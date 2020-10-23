<template>
  <div class="calendar">
    <calendar-header
      :selectedType="global.selectedType"
      :currentDate="global.currentDate"
      @selectedType="global.selectedType = $event"
      @dateAfter="dateAfter($event)"
      @dateBefore="dateBefore($event)"
    />
    <component
      :is="global.selectedType"
      :currentDate="global.currentDate"
      :events="global.events"
      @dateAfter="dateAfter($event)"
      @dateBefore="dateBefore($event)"
      @selectDate="selectDate($event)"
      @events="global.events = $event"
    />
  </div>
</template>

<script>
import { addDays, subDays } from "date-fns";

import CalendarHeader from "./header.vue";
import week from "./week.vue";
import day from "./day.vue";
import month from "./month.vue";

export default {
  name: "OpoCalendar",
  components: {
    CalendarHeader,
    week,
    day,
    month
  },
  data: () => {
    return {
      addDays,
      subDays,
      global: {
        currentDate: new Date(),
        selectedType: "week",
        events: [
          {
            id: 23244,
            color: 1,
            name: "Урок Французкого",
            timeStart: 13,
            timeEnd: 15,
            date: "10.20.2020"
          },
          {
            id: 23234,
            color: 2,
            name: "Урок Немецкого",
            timeStart: 8,
            timeEnd: 11,
            date: "10.20.2020"
          }
        ]
      }
    };
  },
  methods: {
    selectDate(date) {
      this.global.currentDate = date;
    },
    dateBefore(numOfDays) {
      this.global.currentDate = subDays(this.global.currentDate, numOfDays);
    },
    dateAfter(numOfDays) {
      this.global.currentDate = addDays(this.global.currentDate, numOfDays);
    }
  }
};
</script>

<style scoped lang="scss">
.calendar {
  cursor: default;
}
</style>
