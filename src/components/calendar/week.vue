<template>
  <div class="calendar__body__week">
    <div class="calendar__body__week__week-selector">
      <span class="week-before" @click="dateBefore(7)"> &lt; </span>
      <div class="week-dates">
        <div
          class="week-item"
          :class="{ selected: formatDate(item).selected }"
          :key="`${item}`"
          v-for="item in $dates"
          @click="selectDate(item)"
        >
          <span class="week-item__date">{{ formatDate(item).name }}</span>
          <div class="table-columns">
            <div
              class="table-row"
              :class="`table-row-${hour}`"
              :key="hour"
              v-for="hour in 17"
              @dragover.prevent
              @dragenter.prevent
              @drop="onDrop($event, [item, hour + 5])"
            ></div>
            <div class="events">
              <vue-resizable
                class="resizable"
                :style="{
                  top: `${64.5 * (event.timeStart - 6)}px`,
                  minHeight: `${64.5 * (event.timeEnd - event.timeStart)}px`,
                  width: 'auto',
                  backgroundColor: week.eventStyles[event.color].bg
                }"
                @resize:start="onResize"
                @resize:end="resized"
                :key="event.id"
                v-for="event in getEventsByDate(item)"
              >
                <div
                  class="event"
                  :class="`event-${event.id}`"
                  :style="{
                    borderLeft: `5px solid ${
                      week.eventStyles[event.color].line
                    }`
                  }"
                  draggable
                  @dragstart="startDrag($event, event)"
                >
                  <span class="event-date">
                    {{ formatTime(event.timeStart) }} -
                    {{ formatTime(event.timeEnd) }}
                  </span>
                  <br />
                  <span class="event-name">{{ event.name }}</span>
                </div>
              </vue-resizable>
            </div>
          </div>
        </div>
      </div>
      <span class="week-after" @click="dateAfter(7)"> > </span>
    </div>
  </div>
</template>

<script>
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import VueResizable from "vue-resizable";

import drag_n_drop from "@/mixins/drag_n_drop";
import resizable from "../../mixins/resizable";

export default {
  name: "CalendarWeek",
  props: {
    currentDate: {
      type: Date
    },
    events: {
      type: Array
    }
  },
  mixins: [drag_n_drop, resizable],
  components: { VueResizable },
  data: () => {
    return {
      format,
      addDays,
      startOfWeek,
      isSameDay,
      week: {
        eventStyles: {
          1: {
            line: "#FFBC42",
            bg: "#FFEECE"
          },
          2: {
            line: "#A499FF",
            bg: "#CCC6FF"
          }
        }
      }
    };
  },
  computed: {
    $dates() {
      const res = [];
      let date = startOfWeek(this.currentDate);
      for (let i = 0; i < 7; i++) {
        res.push(addDays(date, i));
      }
      return res;
    },
    $events: {
      get() {
        return this.events;
      },
      set(payload) {
        this.$emit("events", payload);
      }
    }
  },
  methods: {
    dateBefore(e) {
      this.$emit("dateBefore", e);
    },
    dateAfter(e) {
      this.$emit("dateAfter", e);
    },
    selectDate(payload) {
      this.$emit("selectDate", payload);
    },
    formatDate(date) {
      return {
        name: `${this.$t(`week[${format(date, "e") - 1}]`)} ${format(
          date,
          "d "
        )} `,
        selected: isSameDay(date, this.currentDate)
      };
    },
    getEventsByDate(day) {
      if (this.$events.length >= 1) {
        const res = this.$events
          .filter(event => isSameDay(new Date(event.date), day))
          .sort((a, b) => {
            if (a.timeStart > b.timeStart) return 1;
            if (a.timeStart < b.timeStart) return -1;
          });
        return res;
      } else return [];
    },
    formatTime(hour) {
      if (hour < 10) return `0${hour}:00`;
      else return `${hour}:00`;
    },
    resizeEvent(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped lang="scss">
$hours: (
  "1": "6:00",
  "2": "7:00",
  "3": "8:00",
  "4": "9:00",
  "5": "10:00",
  "6": "11:00",
  "7": "12:00",
  "8": "13:00",
  "9": "14:00",
  "10": "15:00",
  "11": "16:00",
  "12": "17:00",
  "13": "18:00",
  "14": "19:00",
  "15": "20:00",
  "16": "21:00",
  "17": "22:00"
);
.calendar {
  &__body {
    &__week {
      font-size: 16px;
      color: #72849e;
      overflow: auto;
      min-height: 580px;
      position: relative;
      &__week-selector {
        display: flex;
        justify-content: space-between;
        .week-dates {
          width: 92%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          .week-item {
            position: relative;
            height: 100%;
            width: 15%;
            text-align: center;
            &:not(:last-child) {
              box-shadow: 1px 0 0 0 #d9d9d9;
            }
            &:hover {
              .table-columns {
                background-color: rgba(37, 143, 251, 0.1);
              }
              .week-item__date {
                color: #258ffb;
              }
            }
            &.selected {
              .table-columns {
                background-color: rgba(37, 143, 251, 0.1);
              }
              .week-item__date {
                color: #258ffb;
              }
            }
            .table-columns {
              position: absolute;
              top: 40px;
              width: 100%;
              background-color: white;
              &:hover {
                background-color: rgba(37, 143, 251, 0.1);
              }
              .table-row {
                position: relative;
                height: 63.5px;
                z-index: 99;
                &:not(:last-child) {
                  border-bottom: 1px dashed #d9d9d9;
                }
              }

              .events {
                position: absolute;
                height: 0;
                top: 0;
                width: 100%;
                z-index: 9999;
                .resizable-component {
                  position: absolute;

                  .event {
                    border-top-left-radius: 6px;
                    border-bottom-left-radius: 6px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    color: #272848;
                    padding: 10px 15px;
                    box-sizing: border-box;
                    &-date {
                      font-size: 12px;
                    }
                    &-name {
                      font-size: 16px;
                    }
                  }
                }
              }
            }
            &:nth-child(1) {
              @each $id, $hour in $hours {
                .table-row-#{$id}:before {
                  position: absolute;
                  left: -45px;
                  top: -9px;
                  content: $hour;
                  color: black;
                }
              }
            }
          }
        }
        .week-before {
          margin-left: 20px;
          cursor: pointer;
        }
        .week-after {
          margin-right: 20px;
          cursor: pointer;
        }
      }
      &__table {
        width: 100%;
        height: 100%;
        margin: 0 30px;
        display: flex;
        .table-columns {
          width: 14%;
          height: 100%;
          &:hover {
            background-color: rgba(37, 143, 251, 0.1);
          }
        }
      }
    }
  }
}
</style>
