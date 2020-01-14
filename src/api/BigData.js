import request from '@/utils/request'
import { getCurrentDay } from '@/utils'
const CUR_DATE = getCurrentDay()

// 机械作业完成情况左右图表
export function getJxzy_Graph(params) {
  return request({
    url: '/api/bigdata/jxzy_graph',
    method: 'get',
    params
  })
}

// 机械作业完成情况地图
export function getJxzy_Map(params) {
  return request({
    url: '/api/bigdata/jxzy_map',
    method: 'get',
    params
  })
}

// 垃圾清运左右图表
export function getLjqy_Graph(params) {
  return request({
    url: '/api/bigdata/ljqy_graph',
    method: 'get',
    params
  })
}

// 垃圾清运地图数据
export function getLjqy_Map(params) {
  return request({
    url: '/api/bigdata/ljqy_map',
    method: 'get',
    params
  })
}

// 获取垃圾填埋场/焚烧厂
export function getLjqy_Refuse_Plant(params) {
  return request({
    url: '/api/bigdata/ljqy_refuse_plant',
    method: 'get',
    params
  })
}

// 垃圾清运全流程
export function getLjqy_Flow(params) {
  return request({
    url: '/api/bigdata/ljqy_flow',
    method: 'get',
    params
  })
}

// 垃圾清运全流程 前端
export function getLjqy_flow_frontend(params) {
  return request({
    url: '/api/bigdata/ljqy_flow_frontend',
    method: 'get',
    params
  })
}

// 垃圾清运全流程 后端
export function getLjqy_flow_backend(params) {
  return request({
    url: '/api/bigdata/ljqy_flow_backend',
    method: 'get',
    params
  })
}

// 获取垃圾中转站
export function getLjqy_Refuse_Station(params) {
  return request({
    url: '/api/bigdata/ljqy_refuse_station',
    method: 'get',
    params
  })
}

// 清扫保洁达标情况-图表
export function getQsbjdb_Graph() {
  return request({
    url: `/api/bigdata/qsbjdb_graph?beginDate=${CUR_DATE}`,
    method: 'get'
  })
}

// 清扫保洁达标情况-地图
export function getQsbjdb_Map(params) {
  return request({
    url: '/api/bigdata/qsbjdb_map',
    method: 'get',
    params
  })
}

// 清扫保洁覆盖情况-人和车_图表
export function getQsbjfg_Graph(params) {
  return request({
    url: '/api/bigdata/qsbjfg_graph',
    method: 'get',
    params
  })
}

// 清扫保洁覆盖情况-人和车_地图
export function getQsbjfg_Map(params) {
  return request({
    url: '/api/bigdata/qsbjfg_map',
    method: 'get',
    params
  })
}

// 垃圾清运2 流向图
export function getTrachClean2(params) {
  return request({
    url: '/api/bigdata/trachClean2',
    method: 'get',
    params
  })
}

// 垃圾清运2 覆盖物
export function getTrachClean2Overlay(params) {
  return request({
    url: '/api/bigdata/trachClean2/overlay',
    method: 'get',
    params
  })
}

// 公众服务_垃圾处理厂
export function getGarbagePlant6(params) {
  return request({
    url: `/api/bigdata/pub_svc/garbagePlant?beginDate=${CUR_DATE}`,
    method: 'get',
    params
  })
}

// 获取公众服务处理厂弹窗
export function getTreatmentPlantPopInfo(params) {
  return request({
    url: `/api/bigdata/TreatmentPlantPopInfo?beginDate=${CUR_DATE}`,
    method: 'get',
    params
  })
}

// 公众服务_公厕
export function getGarPubToilet(params) {
  return request({
    url: `/api/bigdata/pub_svc/toilet?beginDate=${CUR_DATE}`,
    method: 'get',
    params
  })
}

// 获取公众服务公厕头部数据
export function getTotiletInfo(params) {
  return request({
    url: `/api/bigdata/GetTotiletInfo?beginDate=${CUR_DATE}`,
    method: 'get',
    params
  })
}

// 公众服务转运站头部数据
export function getRefuseStationHeadData(params) {
  return request({
    url: `/api/bigdata/GetRefuseStationHeadData?beginDate=${CUR_DATE}`,
    method: 'get',
    params
  })
}

// 公众服务_转运站
export function getRefuseStation(params) {
  return request({
    url: '/api/bigdata/pub_svc/refuseStation',
    method: 'get',
    params
  })
}

// 公众服务转运站-车辆运输列表
export function getCarTransListVm(params) {
  return request({
    url: '/api/bigdata/GetCarTransListVm',
    method: 'get',
    params
  })
}

// 案件数据
export function getEvent(params) {
  return request({
    url: '/api/bigdata/event',
    method: 'get',
    params
  })
}

// 标段地图(JQB)[全覆盖 标段]
export function getSectionMap(params) {
  return request({
    url: `/api/bigdata/GetSectionMap?beginDate=${CUR_DATE}`,
    method: 'get',
    params
  })
}

// 标段各类型数量
export function getSectionCount(params) {
  return request({
    url: `/api/bigdata/GetSectionCount?beginDate=${CUR_DATE}`,
    method: 'get',
    params
  })
}

// 垃圾处理量、垃圾流向弹窗信息
export function getGarbageAmount(params) {
  return request({
    url: '/api/bigdata/GetGarbageAmount',
    method: 'get',
    params
  })
}
// 垃圾分类、餐厨垃圾地图
export function getGarbageClassificationMap(params) {
  return request({
    url: '/api/map/GetGarbageClassificationMap',
    method: 'get',
    params
  })
}

// 环卫人员
export function getallPeople(params) {
  return request({
    url: '/api/bigdata/GetCityPeople',
    method: 'get',
    params
  })
}
// 环卫人员mark
export function getPeopelMark(params) {
  return request({
    url: '/api/bigdata/GetPeopleMap',
    method: 'get',
    params
  })
}

// 转运站
export function getCityStation(params) {
  return request({
    url: '/api/bigdata/GetCityStation',
    method: 'get',
    params
  })
}

// 公厕
export function getCityToilet(params) {
  return request({
    url: '/api/bigdata/GetCityToilet',
    method: 'get',
    params
  })
}

// 标段
export function getCitySection(params) {
  return request({
    url: '/api/bigdata/GetCitySection',
    method: 'get',
    params
  })
}

// 标段
export function getCityCar(params) {
  return request({
    url: '/api/bigdata/GetCityCar',
    method: 'get',
    params
  })
}

// 人员、车辆详情
export function getObjInfoWin(params) {
  return request({
    url: '/api/bigdata/GetPeopleCarDetail',
    method: 'get',
    params
  })
}

// 环卫车辆
export function getallCar(params) {
  return request({
    url: '/api/bigdata/GetCarMap',
    method: 'get',
    params
  })
}

// 环卫指数
export function getsubdistriceSideData(params) {
  return request({
    url: '/api/bigdata/GetChengzhongVillageInfo',
    method: 'get',
    params
  })
}

// 街道黑点
export function getdotData(params) {
  return request({
    url: '/api/map/GetStreetBlackPointMap',
    method: 'get',
    params
  })
}

// 城中村黑点
export function getVillageData(params) {
  return request({
    url: '/api/map/GetChengzhongVillageMapInfo',
    method: 'get',
    params
  })
}
// 城中村黑点弹窗

export function getVillagePop(params) {
  return request({
    url: '/api/bigdata/GetChengzhongVillagePopInfo',
    method: 'get',
    params
  })
}
// 公厕分析黑点
export function getWcMapInfo(params) {
  return request({
    url: '/api/map/GetToiletBlcakPointMap',
    method: 'get',
    params
  })
}

// 公厕黑点弹窗
export function getWcwinInfo(params) {
  return request({
    url: '/api/bigdata/GetToiletBlcakPointPop',
    method: 'get',
    params
  })
}

// 餐厨垃圾头部
export function getKitchenHeader() {
  return request({
    url: '/api/map/GetGarbageClassificationTotal?beginDate=2019-09-06',
    method: 'get'
  })
}

// 公众服务处理厂左右数据
export function getTreatmentPlant(params) {
  return request({
    url: `/api/bigdata/GetTreatmentPlant?beginDate=${CUR_DATE}`,
    method: 'get',
    params
  })
}

// 根据处理厂查询转运站
export function getPlantToStation(params) {
  return request({
    url: '/api/bigdata/PlantToStation',
    method: 'get',
    params
  })
}

// 转运站信息
export function getStationDetail(params) {
  return request({
    url: `/api/bigdata/StationDetail?beginDate=${CUR_DATE}`,
    method: 'get',
    params
  })
}

// 各类报警数量
export function getAlarmCount(params) {
  return request({
    url: '/api/bigdata/GetAlarmCount',
    method: 'get',
    params
  })
}

// 分类垃圾量
export function getClassifiedGarbage(params) {
  return request({
    url: '/api/bigdata/GetClassifiedGarbage',
    method: 'get',
    params
  })
}

// 分区垃圾量
export function getAreaGarbage(params) {
  return request({
    url: '/api/bigdata/GetAreaGarbage',
    method: 'get',
    params
  })
}

// 分区垃圾量
export function getSanitationSmall(params) {
  return request({
    url: '/api/bigdata/GetSanitationSmall',
    method: 'get',
    params
  })
}

// 获得环卫人员作业情况
export function getPersonConfig(params) {
  return request({
    url: '/api/bigdata/GetPersonConfig',
    method: 'get',
    params
  })
}

// 获得环卫车辆作业情况
export function getCarConfig(params) {
  return request({
    url: '/api/bigdata/GetCarConfig',
    method: 'get',
    params
  })
}

// 获得环卫企业作业情况
export function getCompanyConfig(params) {
  return request({
    url: '/api/bigdata/GetCompanyConfig',
    method: 'get',
    params
  })
}

// 获得环卫人员实时在岗情况的接口，当前应在线人数，实时在线人数
export function getPersonRealTime(params) {
  return request({
    url: '/api/bigdata/getPersonRealTime',
    method: 'get',
    params
  })
}

// 获得当日环卫人员应在线人数，实际在线人数24小时（以小时为单位）
export function getPersonOnline(params) {
  return request({
    url: '/api/bigdata/GetPersonOnline',
    method: 'get',
    params
  })
}

// 获得环卫人员作业情况的接口，应出勤人数、实际出勤人数、作业达标人数、人均作业时长、人均作业里程
export function getPersonWork(params) {
  return request({
    url: '/api/bigdata/GetPersonWork',
    method: 'get',
    params
  })
}

// 今日垃圾清运概况
export function getDailyGarbage(params) {
  return request({
    url: '/api/bigdata/GetDailyGarbage',
    method: 'get',
    params
  })
}

// 今日机械作业概况
export function getDailyCarWork(params) {
  return request({
    url: '/api/bigdata/GetDailyCarWork',
    method: 'get',
    params
  })
}

// 机械作业车辆
export function getCarWorkCount(params) {
  return request({
    url: '/api/bigdata/GetCarWorkCount',
    method: 'get',
    params
  })
}

// 今日环卫指数
export function getIndexInfo(params) {
  return request({
    url: '/api/bigdata/GetIndexInfo',
    method: 'get',
    params
  })
}

// 今日环卫指数
export function getCarMap(params) {
  return request({
    url: '/api/bigdata/GetCarMap',
    method: 'get',
    params
  })
}

// 获取基础设施点击厂区详气体
export function ljqy_refuse_plant_air(params) {
  return request({
    url: '/api/bigdata/ljqy_refuse_plant_air',
    method: 'get',
    params
  })
}

// 获取智能公厕数据
export function GetToiletDetail(params) {
  return request({
    url: '/api/bigdata/GetToiletDetail',
    method: 'get',
    params
  })
}

// 垃圾处理量
export function getCityRubbishWeight(params) {
  return request({
    url: '/api/bigdata/GetCityRubbishWeight',
    method: 'get',
    params
  })
}

// 获取中转站气体数据
export function GetPm25CurrData(params) {
  return request({
    url: '/api/bigdata/GetPm25CurrData',
    method: 'get',
    params
  })
}

// 获取中转站气体数据
export function getVideoes(params) {
  return request({
    url: '/api/bigdata/GetVideoes',
    method: 'get',
    params
  })
}

// 获取标段红黄牌信息明细
export function GetCompanyCardDetail(params) {
  return request({
    url: '/api/bigdata/GetCompanyCardDetail',
    method: 'get',
    params
  })
}

// 获取标段红黄牌信息明细
export function GetIndexToiletStreetEnvironment(type, id) {
  return request({
    url: `/api/bigdata/GetIndexToiletStreetEnvironment?queryType=${type}&streetId=${id}`,
    method: 'get'
  })
}

// 获取标段红黄牌信息明细
export function GetDistinctGarbageDetail(id) {
  return request({
    url: `/api/bigdata/GetDistinctGarbageDetail?sysId=${id}`,
    method: 'get'
  })
}
