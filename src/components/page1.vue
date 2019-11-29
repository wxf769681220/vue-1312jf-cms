<template>
  <div class="page1">
    <Table :columns="columns14" :data="data5" border :span-method="handleSpan"></Table>
  </div>
</template>

<script>
// Iview Components
import { Table } from 'view-design'
export default {
  name: 'page1',
  props: {},
  data() {
    return {
      columns14: [
        {
          title: 'Date',
          key: 'date'
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data5: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    handleSpan({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 0) {
        return {
          rowspan: 2,
          colspan: 1
        }
      } else if (rowIndex === 1 && columnIndex === 0) {
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    }
  },
  components: {
    Table
  },
  beforedestroy() {}
}
</script>

<style lang="stylus" scoped>
</style>
