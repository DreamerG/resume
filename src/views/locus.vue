<template>
  <div id="locus">
    <div class="radio">
      排序：
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>

    <el-timeline :reverse="reverse" class="m-mt-40">
      <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.traceTime">
        {{ activity.remark }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import axios from '../axios/http'
export default {
  data() {
    return {
      resumeNo: this.$route.query.resumeNo,
      reverse: true,
      activities: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      axios.get(`/resume/listTrace/${this.resumeNo}`).then(res => {
        this.activities = res.data
      })
    }
  }
}
</script>
