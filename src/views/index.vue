span<template>
  <div class="list">
    <div class="search">
      <div class="m-fb">
        <el-input class="m-mr-12" v-model="searchCondition.candidateName" placeholder="候选人姓名"></el-input>
        <el-input class="m-mr-12" v-model="searchCondition.candidatePhone" placeholder="候选人联系方式"></el-input>
        <el-select v-model="searchCondition.positionCode" placeholder="候选人职位" class="m-mr-12">
          <el-option v-for="item in positionOptions" :key="item.positionCode" :label="item.positionName" :value="item.positionCode"> </el-option>
        </el-select>
        <el-input v-model="searchCondition.createPerson" placeholder="录入人用户名" class="m-mr-12"></el-input>
        <el-select v-model="searchCondition.resumeStatus" placeholder="简历状态">
          <el-option v-for="item in resumeStatusOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div class="m-mt-12 m-fb">
        <el-date-picker v-model="createTime" type="datetimerange" range-separator="至" start-placeholder="录入开始时间" end-placeholder="录入结束时间" class="m-mr-12"> </el-date-picker>
        <el-date-picker v-model="notesTime" type="datetimerange" range-separator="至" start-placeholder="提醒开始时间" end-placeholder="提醒结束时间" class="m-mr-12"> </el-date-picker>
        <div>
          <el-button type="primary" round icon="el-icon-search">查询</el-button>
          <el-button type="success" round icon="el-icon-plus" @click="handleCreateResume">新增</el-button>
        </div>
      </div>
    </div>
    <div class="table m-mt-24">
      <el-table
        :data="tableData"
        border
        fit
        v-loading="false"
        highlight-current-row
        style="width: 100%;border-radius:5px;"
        :header-cell-style="{
          color: '#666',
          background: 'rgb(250,250,250)',
          height: '40px'
        }"
        :cell-style="{ height: '40px', padding: '10px 0' }"
      >
        <el-table-column prop="candidateName" label="候选人名称" width="100"> </el-table-column>
        <el-table-column prop="candidatePhone" label="候选人联系方式" width="180"> </el-table-column>
        <el-table-column prop="positionName" label="候选人职位" width="100"> </el-table-column>
        <el-table-column label="简历状态">
          <template slot-scope="scope">
            <span
              :class="{
                'm-c-F0562F': Number(scope.row.resumeStatusCode) > 36.8
              }"
              >{{ scope.row.resumeStatusDesc }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="notesEvent" label="提醒事项"> </el-table-column>
        <el-table-column prop="notesDate" label="提醒时间" width="180"> </el-table-column>
        <el-table-column prop="createPerson" label="录入人"> </el-table-column>
        <el-table-column prop="createTime" label="录入时间" width="180"> </el-table-column>
        <el-table-column label="简历地址" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :href="scope.row.url">{{ scope.row.url }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">流转</el-button>
            <el-button type="text" size="small" @click="handleClickLocus(scope.row)">轨迹</el-button>
            <el-button type="text" size="small" @click="handleCloseResume(scope.row)">关闭</el-button>
            <el-button type="text" size="small" @click="handleCreateEvent(scope.row)">录入事项</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top:30px;text-align: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="新增简历" :visible.sync="createResumeDialogVisible" width="30%" :before-close="handleCloseCreateResume">
      <el-form label-position="right" label-width="120px" :model="createData">
        <el-form-item label="候选人">
          <el-input v-model="createData.candidateName"></el-input>
        </el-form-item>
        <el-form-item label="候选人联系方式">
          <el-input v-model="createData.candidatePhone"></el-input>
        </el-form-item>
        <el-form-item label="候选人职位">
          <el-select v-model="createData.positionCode" placeholder="请选择职位">
            <el-option v-for="item in positionOptions" :key="item.positionCode" :label="item.positionName" :value="item.positionCode"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简历附件地址">
          <el-input v-model="createData.url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createResumeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fetchCreateResume">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="录入事项" :visible.sync="createEventDialogVisible" width="30%" :before-close="handleCloseCreateEvent">
      <el-form label-position="right" label-width="120px" :model="createEventData">
        <el-form-item label="提醒事项">
          <el-input v-model="createEventData.notesEvent"></el-input>
        </el-form-item>
        <el-form-item label="提醒日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="createEventData.notesDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="提醒时间段">
          <el-radio-group v-model="createEventData.notesPeriod">
            <el-radio :label="1">上午</el-radio>
            <el-radio :label="2">下午</el-radio>
            <el-radio :label="3">晚上</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createEventDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fetchCreateEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="关闭" :visible.sync="closeDialogVisible" width="30%" :before-close="handleCloseCClose">
      <el-form label-position="right" label-width="120px" :model="createEventData">
        <el-form-item label="备注">
          <el-input v-model="closeData.remark"></el-input>
        </el-form-item>
        <el-form-item label="关闭情况">
          <el-select v-model="closeData.reason" placeholder="请选择">
            <el-option v-for="item in closeOptions" :key="item.label" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fetchCloseResume">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { resumeStatusOptions, closeOptions } from '../utils/constUtils'
export default {
  data() {
    return {
      resumeNo: '',
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      createTime: [],
      notesTime: [],
      searchCondition: {
        candidateName: '',
        candidatePhone: '',
        positionCode: null,
        createPerson: '',
        resumeStatus: null
      },
      positionOptions: [],
      resumeStatusOptions: resumeStatusOptions,
      closeOptions: closeOptions,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 新增
      createData: {
        candidateName: '',
        candidatePhone: '',
        positionCode: '',
        url: ''
      },
      // 录入事项
      createEventData: {
        notesDate: '',
        notesEvent: '',
        notesPeriod: null
      },
      // 关闭简历
      closeData: {
        remark: '',
        reason: null
      },
      // 新增简历dialog
      createResumeDialogVisible: false,
      // 录入事项dialog
      createEventDialogVisible: false,
      // 关闭 dialog
      closeDialogVisible: false
    }
  },
  async mounted() {
    this.positionOptions = await this.fetchGetPositionOptions()
    let res = await this.fetchGetResumeList()
    console.log(res)
    this.tableData = res.items
    this.total = res.totalNumber
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    fetchGetPositionOptions() {
      return this.$get('getPositionOptions')
    },
    // 查看轨迹
    handleClickLocus(item) {
      this.$router.push({
        path: '/locus',
        query: {
          resumeNo: item.resumeNo
        }
      })
    },
    // 新增
    handleCreateResume() {
      this.createResumeDialogVisible = true
    },
    // 录入事项
    handleCreateEvent(row) {
      this.resumeNo = row.resumeNo
      this.createEventDialogVisible = true
    },
    // 关闭简历
    handleCloseResume(row) {
      this.resumeNo = row.resumeNo
      this.closeDialogVisible = true
    },
    // 关闭新增dialog
    handleCloseCreateResume() {
      this.methodsClearCreateData()
    },
    // 关闭录入事项dialog
    handleCloseCreateEvent() {
      this.methodsClearCreateEvent()
    },
    // 关闭 关闭dialog
    handleCloseCClose() {
      this.methodsClearClose()
    },
    // 重置新增数据
    methodsClearCreateData() {
      this.createData = {
        candidateName: '',
        candidatePhone: '',
        positionCode: '',
        url: ''
      }
    },
    // 重置录入事项
    methodsClearCreateEvent() {
      this.createEventData = {
        notesDate: '',
        notesEvent: '',
        notesPeriod: 0
      }
    },
    // 重置关闭字段
    methodsClearClose() {
      this.closeData = {
        remark: '',
        reason: 0
      }
    },
    // 简历列表
    fetchGetResumeList() {
      let _params = {
        ...this.searchCondition,
        createBeginTime: (this.createTime || [])[0] || '',
        createEndTime: (this.createTime || [])[1] || '',
        notesBeginTime: (this.notesTime || [])[0] || '',
        notesEndTime: (this.notesTime || [])[1] || '',
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      return this.$get('getResumeList', _params)
    },
    // 新增接口
    fetchCreateResume() {
      let _data = {
        ...this.createData
      }
      this.$get('getResumeList', _data)
        .then(() => {
          this.createResumeDialogVisible = false
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.fetchGetResumeList()
        })
        .catch(error => {
          this.createResumeDialogVisible = false
          this.$message({
            message: error.message || '创建失败',
            type: 'error'
          })
        })
    },
    // 录入事项接口
    fetchCreateEvent() {
      let _data = {
        ...this.createEventData,
        resumeNo: this.resumeNo
      }
      this.$post('createEvent', _data)
        .then(() => {
          this.createEventDialogVisible = false
          this.$message({
            message: '录入成功',
            type: 'success'
          })
          this.fetchGetResumeList()
        })
        .catch(error => {
          this.createEventDialogVisible = false
          this.$message({
            message: error.message || '录入失败',
            type: 'error'
          })
        })
    },
    // 关闭简历接口
    fetchCloseResume() {
      let _data = {
        ...this.closeData,
        resumeNo: this.resumeNo
      }
      this.$post('closeEvent', _data)
        .then(() => {
          this.closeDialogVisible = false
          this.$message({
            message: '关闭成功',
            type: 'success'
          })
          this.fetchGetResumeList()
        })
        .catch(error => {
          this.closeDialogVisible = false
          this.$message({
            message: error.message || '关闭失败',
            type: 'error'
          })
        })
    }
  }
}
</script>
