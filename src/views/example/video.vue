
<template>
  <div class="permissions">

    <vue-run-sfc :js-labs="jsLabs" :css-labs="cssLabs" :open="true" title="测试DEMO" :code="code" />

  </div>
</template>

<script>
// import mixProps from './mixProps'
// import { fetchDate, save, update } from './api'

const code = `
<template>
<div>
  <h1>{{ title }}</h1>
  <div><el-button type="primary" @click="handleClick">点一下, 玩一年, 是兄弟就来砍我 </el-button></div>
</div>
</template>
<script>
export default {
  data() {
    return {
      title: "宝刀屠龙"
    }
  },
  methods: {
    handleClick() {
      this.$message.success('装备不花一分钱')
    }
  }
};
<\/script>
<style>
  body {color: #409EFF;}
</style>
`

import { getRandomID } from '@/utils'
import dayjs from 'dayjs'
import docsMix from '@/mixProps/docsMix' // 文档外链 ele 样式 + js 必须

export default {
  name: 'Permissions',
  components: {
  },
  mixins: [docsMix],
  data() {
    return {
      pathType: false,
      path: `views/example/testBcom`,
      code: code,
      beginTime2endTime: [
        dayjs().format('YYYY-MM-DD') + ' 00:00:00',
        dayjs().format('YYYY-MM-DD hh:mm:ss')
      ],
      recordPlaySelect: null,
      device: 13302232033,
      playModel: true, //  true 实时  false 回放
      fetchMapLoading: false,
      realChannel: '1,2,3,4', // 通道号
      realProtocol: 1, // 协议类型
      begintime: '',
      endtime: '',
      config: {
        id: 'PlayerBox',
        isReal: this.playModel,
        isRecord: !this.playModel,
        userId: 'apidemo',
        baseURL: 'wss://videostream.car900.com/',
        userkey: '2161e23a-4d3b-4d1a-bf0a-cafd56f9c6f8'
      },
      playList: [], // 正在播放列表
      recordQueryList: [], // 正在播放列表
      valueOne: null
    }
  },
  watch: {
    playModel: {
      immediate: true,
      handler(value) {
        this.createPlayer()
        console.log(this.playModel, 'playModel-playModel')
      }
    }
  },
  beforeDestroy() {
    this.destroy()
  },
  mounted() {
    this.code = this.$refs['code']
  },
  methods: {
    handleChange() {
      this.pathType = !this.pathType
      this.path = !this.pathType ? `views/example/testBcom` : `views/example/testAcom`
    },
    handleClick() {
      console.log(this.$refs['CubeAsyncComs'].getCurrentComponent())
    },
    destroy() {
      if (this.player) {
        // this.player.destroy()
        // this.$refs['box'].innerHTML = '<div id="PlayerBox" />'
        // this.playList = []
      }
    },
    createPlayer() {
      if (this.player) this.destroy()
      setTimeout(() => {
        const Byskplayer = window.Byskplayer
        this.config.isReal = !!this.playModel
        this.config.isRecord = !this.playModel
        console.log(this.config, '创建视频实例参数')
        this.player = new Byskplayer(this.config)

        // 设置自动关闭视频时间 0 不会主动关闭
        this.player.onCloseTimeChange = 0
      }, 200)
    },
    // 实时播放
    openLive() {
      if (!this.player) return
      if (!this.player.allocate) return
      const device = this.device
      const channel = this.realChannel // '1,2,3,4', // 通道号
      const protocolType = Number(this.realProtocol)
      const obj = this.playList.find(
        p => p.device === device && p.channel === channel
      )
      if (obj) return // 已经在播放的则不能再播放
      const channelArr = channel.split(',').map(p => p * 1) // 几个格子视频窗口
      const tidObj = this.player.allocate(channelArr.length) // 根据通道数申请
      // let tidObj = player.allocate(1); //申请一个视频播放器
      if (tidObj.flag === 1) {
        // 申请成功
        const params = {
          device: device, // 终端号
          channel: channel, // 通道号 （1~8） '1,2,3,4', // 通道号
          protocolType: protocolType, // 协议类型，1：GF-1078，2：GA系列
          plate: 'carNo', // 车牌号（可选）
          vehicleId: '4321', // 车辆Id（可选）
          groupId: '1' // 车辆所属车组ID（可选）
        }

        if (protocolType === 1) {
          // 1078
          for (let i = 0; i < channelArr.length; i++) {
            const tid = tidObj.ids[i]
            const param = { ...params, channel: channelArr[i] }
            this.player.real.open(tid, param, res => {
              console.log(res, 'this.player.real.open cb')
            })
            this.playList.push({ ...param })
          }
        } else if (protocolType === 2) {
          // GA
          this.player.real.open(tidObj.ids, params, res => {
            console.log(res, 'this.player.real.open cb')
          })
          this.playList.push(
            ...tidObj.ids.map((p, i) => {
              return { ...params, channel: channelArr[i] }
            })
          )
        }
      } else {
        // 申请失败
        this.$message({ message: obj.msg, type: 'warning' })
      }
    },
    // 回放视频查询
    recordQuery() {
      if (
        Array.isArray(this.beginTime2endTime) &&
        this.beginTime2endTime.length
      ) {
        const begintime = new Date(this.beginTime2endTime[0]).getTime() / 1000
        const endtime = new Date(this.beginTime2endTime[1]).getTime() / 1000
        const channel = 1
        const protocolType = Number(this.realProtocol)
        const params = {
          device: this.device, // 终端号
          channel: channel, // 通道号
          protocolType: protocolType, // 协议类型，1：GF-1078，2：GA系列
          begintime: begintime, // 开始时间（时间戳，精确至秒）
          endtime: endtime, // 结束时间（时间戳，精确至秒）
          alarmSign: 0 // 报警类型（目前只支持：0）
        }
        console.log(params, '查询参数')
        this.fetchMapLoading = true
        this.player.record.query(params, res => {
          console.log(res, 'sssmsmsmsm')

          this.fetchMapLoading = '视频完毕'
          if (res.status === 1) {
            this.loadfile(res.recordfiles)
            this.fetchMapLoading = false
          } else {
            this.fetchMapLoading = false
            this.$message({ message: res.info, type: 'warning' })
          }
        })
      }
    },
    // 加载回放视频
    loadfile(files) {
      if (Array.isArray(files) && files.length) {
        for (const item of files) {
          item.label =
            dayjs(item.begintime).format('YYYY-MM-DD hh:mm') +
            '至' +
            dayjs(item.endtime).format('YYYY-MM-DD hh:mm')
          item.keyId = getRandomID()
        }
        this.recordQueryList = files
      }
    },
    // 回放视频播放
    recordOpenPlay() {
      console.log(this.recordPlaySelect)
      const protocolType = Number(this.realProtocol)
      const params = {
        device: this.device,
        channel: this.recordPlaySelect.channel,
        protocolType: protocolType,
        begintime: Math.round(this.recordPlaySelect.begintime / 1000),
        endtime: Math.round(this.recordPlaySelect.endtime / 1000),
        fileName: this.recordPlaySelect.fileName,
        plate: '车辆视频回放',
        vehicleId: '4321',
        groupId: '1'
      }
      const obj = this.playList.find(
        p =>
          p.device === this.device &&
          p.channel === this.recordPlaySelect.channel
      )
      if (obj) return
      const tidObj = this.player.allocate(4)
      if (tidObj.flag === 1) {
        const tid = tidObj.ids[0]
        this.player.record.open(tid, params, res => {
          console.log(res, '车辆视频回放')
        })
        this.playList.push({ ...params })
      } else {
        this.$message({ message: tidObj.msg, type: 'warning' })
      }
    },
    // 回放视频停止
    recordOpenStop() {
      const device = this.device
      const channel = this.realChannel * 1
      const index = this.playList.findIndex(
        p => p.device === device && p.channel === channel
      )
      const obj = this.playList[index]
      if (obj) {
        this.player.record.close(
          obj.tid,
          {
            device: obj.device,
            channel: obj.channel,
            protocolType: obj.protocolType
          },
          res => {
            console.log(res)
          }
        )
      }
      this.playList.splice(index, 1)
    },
    // 开启对讲机
    openSpeak(callback = false) {
      const params = {
        device: this.device, // 终端号
        protocolType: 1 // 协议类型，1：GF-1078，2：GA系列，目前支持GF-1078
      }
      this.player &&
        this.player.real.openSpeak(params, res => {
          if (res.status === 1) {
            console.log(res, '开启对讲机')
            if (typeof callback === 'function') {
              callback({ status: 1, msg: '连接成功' })
            }
          } else {
            if (typeof callback === 'function') {
              callback({ status: 0, msg: res.info })
            }
          }
        })
    },
    // 开启关闭
    closeSpeak(callback = false) {
      const params = {
        device: this.device,
        protocolType: 1
      }
      this.player &&
        this.player.real.closeSpeak(params, res => {
          if (res.status === 1) {
            console.log('关闭通话成功')
            if (typeof callback === 'function') {
              callback({ status: 1, msg: '连接成功' })
            }
          } else {
            if (typeof callback === 'function') {
              callback({ status: 0, msg: res.info })
            }
          }
        })
    },
    clickToDo(type) {
      if (type === 1) {
        this.createPlayer()
      } else if (type === 2) {
        console.log(2)
      } else {
        console.log(3)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.permissions {
  .box {
    width: 400px;
    height: 400px;
    background: #cccccc;
  }
  #PlayerBox {
    width: 400px;
    height: 400px;
    background: #cccccc;
  }

  .playerTools {
    width: 840px;
  }

  .flex-box {
    display: flex;
  }

  .playerTool-item {
    margin-bottom: 22px;
  }
}
</style>
