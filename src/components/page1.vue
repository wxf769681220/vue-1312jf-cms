<template>
  <div class="test">
    <div class="box">
      <Table border :stripe="true" :columns="columns" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
import { Table } from 'view-design'
export default {
  name: 'test',
  props: {},
  data() {
    return {
      columns: [
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
      data1: [
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
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {},
  beforedestroy() {},
  components: {
    Table
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/media'
.box
  background-color: grey
</style>
