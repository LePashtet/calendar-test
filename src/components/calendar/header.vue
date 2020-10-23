<template>
  <div class="calendar__header">
    <div class="calendar__header__title">
      {{ $t("title") }}
    </div>
    <div class="calendar__header__menu">
      <div class="calendar__header__menu__date-selector">
        <span class="date-before" @click="dateBefore(7)"> &lt; </span>
        <span class="date">{{ this.$dates }}</span>
        <span class="date-after" @click="dateAfter(7)"> > </span>
      </div>
      <div class="calendar__header__menu__type-selector">
        <div
          class="type-item"
          :class="{ hover: $selectedType === item }"
          v-for="item in header.types"
          :key="item"
          @click="selectType(item)"
        >
          {{ $t(`types.${item}`) }}
        </div>
      </div>
    </div>
    <div class="calendar__header__filters">
      <!--TODO Filters-->
    </div>
  </div>
</template>

<script>
import { startOfWeek, format, endOfWeek } from "date-fns";

export default {
  name: "CalendarHeader",
  props: {
    selectedType: {
      type: String,
      default: "week"
    },
    currentDate: {
      type: Date
    }
  },
  data: () => {
    return {
      startOfWeek,
      format,
      endOfWeek,
      header: {
        types: ["day", "week", "month"]
      }
    };
  },
  computed: {
    $selectedType: {
      get() {
        return this.selectedType;
      },
      set(val) {
        this.$emit("selectedType", val);
      }
    },
    $dates: {
      get() {
        let start = `${format(startOfWeek(this.currentDate), "d")} ${this.$t(
          `months[${format(startOfWeek(this.currentDate), "L") - 1}]`
        )}`;
        let end = `${format(endOfWeek(this.currentDate), "d")} ${this.$t(
          `months[${format(endOfWeek(this.currentDate), "L") - 1}]`
        )}`;
        return start + " - " + end;
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
    selectType(payload) {
      this.$selectedType = payload;
    }
  }
};
</script>

<style scoped lang="scss">
.calendar {
  &__header {
    padding: 20px;

    &__title {
      color: #272848;
      font-size: 32px;
      font-weight: 500;
      text-transform: capitalize;
      margin: 0 0 30px 0;
    }

    &__menu {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 500;
      color: #383838;

      &__date-selector {
        width: 300px;
        span {
          margin: 0 5px;
        }
        .date-before,
        .date-after {
          cursor: pointer;
        }
      }

      &__type-selector {
        display: flex;

        .type-item {
          padding: 5px;
          border-radius: 4px;
          cursor: pointer;
        }

        .hover {
          background: #e1e5f9;
        }
      }
    }
  }
}
</style>
