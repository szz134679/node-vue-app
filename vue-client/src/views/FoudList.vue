<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" :model="search_data">
        <el-form-item label="时间筛选" class="datatime">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
            default-time="12:00:00"
          >
          </el-date-picker>
          --
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="选择结束时间"
            default-time="12:00:00"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="search"
            @click="onSearch()"
            >筛选</el-button
          >
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="view"
            :disabled="user.identify == 'manager' ? false : true"
            @click="onAddMoney()"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="tablecontain">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-if="tableData.length > 0"
        max-height="350"
        border
      >
        <el-table-column type="index" label="序号" align="center" width="70">
        </el-table-column>
        <el-table-column
          prop="data"
          label="创建时间"
          align="center"
          width="250"
          sortable
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.data }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="describe"
          label="收支描述"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="170">
          <template slot-scope="scope">
            <span style="color: #00d053">+{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="170">
          <template slot-scope="scope">
            <span style="color: #f56767">-{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cash"
          label="账户现金"
          align="center"
          width="170"
        >
          <template slot-scope="scope">
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="220">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="warning"
              icon="edit"
              :disabled="user.identify == 'manager' ? false : true"
              @click="onEditMoney(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              icon="delete"
              :disabled="user.identify == 'manager' ? false : true"
              @click="onDeleteMoney(scope.row, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentpage"
              :page-sizes="pagination.pagesizes"
              :page-size="pagination.pagesize"
              :layout="pagination.layout"
              :total="pagination.total"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>

    <DialogFound
      :dialog="dialog"
      :form="form"
      @update="getProfile"
    ></DialogFound>
  </div>
</template>

<script>
import DialogFound from "../components/DialogFound.vue";
export default {
  data() {
    return {
      search_data: {
        startTime: "",
        endTime: "",
      },
      pagination: {
        currentpage: 1,
        pagesizes: [5, 10, 15, 20],
        pagesize: 5,
        total: 0,
        layout: "total, sizes, prev, pager, next, jumper",
      },
      tableData: [],
      allTabledata: [],
      filterTableData: [],
      form: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
      },
      dialog: {
        show: false,
        option: "edit",
        title: "",
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  components: {
    DialogFound,
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios.get("/api/profiles").then((res) => {
        //console.log(res);
        this.allTabledata = res.data;
        this.filterTableData = res.data;
        // 设置分页数据
        this.setpagedata();
      });
    },
    setpagedata() {
      // 分页属性设置
      this.pagination.total = this.allTabledata.length;
      this.pagination.currentpage = 1;
      this.pagination.pagesize = 5;
      // 设置默认的分页数据
      this.tableData = this.allTabledata.filter((item, index) => {
        return index < this.pagination.pagesize;
      });
    },
    onEditMoney(row) {
      // console.log(row);
      // console.log(this.dialog);
      this.dialog = {
        show: true,
        option: "edit",
        title: "修改资金信息",
      };
      this.form = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id,
      };
    },
    onDeleteMoney(row, index) {
      // console.log(row, index);
      this.$axios.delete(`api/profiles/delete/${row._id}`).then((res) => {
        this.getProfile();
        this.$message("删除成功");
      });
    },
    onSearch() {
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区域",
        });
        this.getProfile();
        return;
      }
      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTabledata = this.filterTableData.filter((item) => {
        let date = new Date(item.data);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      // 分页数据
      this.setpagedata();
    },
    onAddMoney() {
      // console.log("wq");
      // this.dialog.show = true;
      this.dialog = {
        show: true,
        option: "add",
        title: "添加资金信息",
      };
      this.form = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
      };
    },
    handleSizeChange(pagesize) {
      // console.log(`每页 ${pagesize} 条`);
      this.pagination.currentpage = 1;
      this.pagination.pagesize = pagesize;
      this.tableData = this.allTabledata.filter((item, index) => {
        return index < pagesize;
      });
    },
    handleCurrentChange(page) {
      // console.log(`当前页${page}`);
      // 获取当前页
      let index = this.pagination.pagesize * (page - 1);
      // 获取数据总数
      let num = this.pagination.pagesize * page;
      // 容器，用于存放数据
      let tables = [];
      for (let i = index; i < num; i++) {
        if (this.allTabledata[i]) {
          tables.push(this.allTabledata[i]);
        }
        this.tableData = tables;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>