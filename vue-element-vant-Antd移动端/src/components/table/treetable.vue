<!--
 * @Descripttion: 表格组件，用于联动表格与分页插件
 * @version: 0.1
 * @Author: luoxi
 * @Date: 2019年9月6日16:34:57
 * @LastEditors: seven
 * @LastEditTime: 2019-09-26 16:06:22
 -->
<template>
  <div class="table_all">
    <el-table
      :data="data"
      :style="{'width': width}"
      v-loading="loading"
      :height= height
      stripe
      :border="border"
      @selection-change="handleSelectionChange"
	  row-key="id"
	  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column type="selection" align="center" width="60" v-if="selection" />
      <!-- <el-table-column type="index" label="序号" width="80" align="center" v-if="index" /> -->
      <el-table-column label="序号" width="80" align="center" v-if="index">
        <template slot-scope="scope">
          {{ (pagination.pageIndex - 1)*pagination.pageNums + scope.$index + 1 }}
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <el-pagination
      v-if="showPage"
      background
      class="table_pagination"
      layout="total, sizes, prev, pager, next, jumper"
      :hide-on-single-page="pagination.hide"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="pagination.pageNums"
      :total="pagination.count"
      :current-page.sync="pagination.pageIndex"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
  export default {
    model: {
      prop:'select',
      event: 'select'
    },
    props: {
      'width': {
        type: String,
        default: '100%'
      },
      'height': {
        type: String,
        default: 'calc(100% - 50px)'
      },
      'data': {
        type: Array,
        default: () => {
          return []
        }
      },
      'select': {
        type: Array,
        default: () => {
          return []
        }
      },
      'selection': {
        type: Boolean,
        default: false
      },
      'index': {
        type: Boolean,
        default: false
      },
      'loading': {
        type: Boolean,
        default: false
      },
      'border': {
        type: Boolean,
        default: true
      },
      'showPage': {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        // 分页组件使用
        pagination: {
          pageIndex: 1,
          pageNums: 20,
          hide: false,
          count: 0
        },
        // 已选中的数据
        multipleSelection: [],
      }
    },
    watch: {
      multipleSelection() {
        this.changeSelection()
      }
    },
    mounted() {
      this.multipleSelection = this.select
    },
    methods: {
      // 分页相关：监听单页显示数量切换事件
      handleSizeChange(val) {
        this.pagination.pageNums = val
        this.pagination.pageIndex = 1
        this.$emit('getData')
      },
      // 分页相关：监听页码切换事件
      handleCurrentChange(val) {
        this.pagination.pageIndex = val
        this.$emit('getData')
      },
      // 监听选择事件
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // v-model使用
      changeSelection() {
        this.$emit('select', this.multipleSelection)
      }
    }
  }
</script>

<style scoped="" lang="scss">
  .table_all{
    height: 100%;
    .el-pagination{
      margin-top: 15px;
    }
  }
</style>
