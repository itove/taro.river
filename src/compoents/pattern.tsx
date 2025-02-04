import React, { useState, useEffect, useRef } from "react";
import { View } from '@tarojs/components'
import {
  Swipe,
  Cell,
  Form,
  Picker,
	Uploader,
  Button,
  InputNumber,
  Input,
  TextArea,
  Tabs
} from '@nutui/nutui-react-taro'
import { Right, Uploader as Plus } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'
import { Env } from '../env'

function Pattern({ pattern, isNew }) {
  const [form] = Form.useForm()

  useEffect(() => {
    console.log(pattern)
    if (pattern.image !== undefined) {
      form.setFieldsValue({
        files: [{
          url: Env.imagesUrl + pattern.image,
          status: 'success',
          type: 'image',
        }],
      })
    }
  }, [pattern])

  const onFailure = (res) => {
    console.log(res)
  }

  const onSuccess = (res) => {
    console.log(res)
  }

  const onFinishFailed = v => {
    console.log(v)
  }

  const formSubmit = data => {
    if (data.files !== undefined
        && data.files[0] !== undefined
        && data.files[0].responseText !== undefined
       ) {
      data.image = JSON.parse(data.files[0].responseText.data).url.replace(/.*\//, '') 
    }
    if (data.latitude !== undefined) data.latitude = Number(data.latitude)
    if (data.longitude !== undefined) data.longitude = Number(data.longitude)
    if (data.area !== undefined) data.area = Number(data.area)
    if (data.yuQiDanChan !== undefined) data.yuQiDanChan = Number(data.yuQiDanChan)
    if (data.moShiDanJia !== undefined) data.moShiDanJia = Number(data.moShiDanJia)
    if (data.moShiZongJia !== undefined) data.moShiZongJia = Number(data.moShiZongJia)
    if (data.zhongShiDanChan !== undefined) data.zhongShiDanChan = Number(data.zhongShiDanChan)
    if (data.guanGaiDingE !== undefined) data.guanGaiDingE = Number(data.guanGaiDingE)
    if (data.yanJianXiaJiang !== undefined) data.yanJianXiaJiang = Number(data.yanJianXiaJiang)
    if (data.diLiTiSheng !== undefined) data.diLiTiSheng = Number(data.diLiTiSheng)
    if (data.shuiXiaoTiSheng !== undefined) data.shuiXiaoTiSheng = Number(data.shuiXiaoTiSheng)
    if (data.yanZhengZhuanTi !== undefined) data.yanZhengZhuanTi = Number(data.yanZhengZhuanTi)
    if (data.quanYanLiang !== undefined) data.quanYanLiang = Number(data.quanYanLiang)
    if (data.youJiZhiHanLiang !== undefined) data.youJiZhiHanLiang = Number(data.youJiZhiHanLiang)
    if (data.EC !== undefined) data.EC = Number(data.EC)
    if (data.PH !== undefined) data.PH = Number(data.PH)
    if (data.touRu !== undefined) data.touRu = Number(data.touRu)
    if (data.chanChu !== undefined) data.chanChu = Number(data.chanChu)
    console.log(data)
    let method = 'POST'
    let url = Env.apiUrl + 'patterns'
    let header = {}
    if (!isNew) {
      method = 'PATCH'
      url = Env.apiUrl + 'patterns/' + pattern.id
      header = {
        'content-type': 'application/merge-patch+json'
      }
    }
    Taro.request({
      method,
      url,
      header,
      data
    }).then((res) => {
      if (res.statusCode === 200 || res.statusCode === 201) {
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        }).then(() => {
          Taro.reLaunch({ url: '/pages/node/index' })
        })
      } else {
        Taro.showToast({
          title: '系统错误',
          icon: 'error',
          duration: 2000
        })
        console.log('server error！' + res.errMsg)
      }
    })
  }

  return (
    <Form
      className="form"
      form={form}
      divider
      labelPosition="left"
      onFinish={(values) => formSubmit(values)}
      onFinishFailed={(values) => onFinishFailed(values)}
      footer={
        <Button formType="submit" block type="primary"> 保 存 </Button>
      }
    >
      <Form.Item
        label="模式名称"
        name="name"
        initialValue={pattern.name}
        rules={[
          { max: 50, message: '不能超过50字符' },
          { required: isNew, message: '请输入模式名称' },
        ]}
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
          readOnly={!isNew}
        />
      </Form.Item>

      <Form.Item
        label="模式编号"
        name="SN"
        initialValue={pattern.SN}
        rules={[
          { max: 10, message: '不能超过10字符' },
          { required: isNew, message: '请输入模式编号' },
        ]}
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
          readOnly={!isNew}
        />
      </Form.Item>

      <View className="label">地理位置</View>
      <Form.Item
        required
        label="验证地点"
        name="location"
        initialValue={pattern.location}
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="中心北纬"
        initialValue={pattern.latitude}
        name="latitude"
      >
        <Input
          className="nut-input-text"
          type="digit"
        />
      </Form.Item>

      <Form.Item
        required
        label="中心东经"
        initialValue={pattern.longitude}
        name="longitude"
      >
        <Input
          className="nut-input-text"
          type="digit"
        />
      </Form.Item>

      <Form.Item
        required
        label="高程"
        initialValue={pattern.gaoCheng}
        name="gaoCheng"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
         label="田块照片"
         name="files"
      >
       <Uploader
         name="upload"
         xhrState={200}
         // maxCount="9" multiple="true"
         url={Env.uploadUrl}
         onSuccess={onSuccess}
         onFailure={onFailure}
				 // defaultValue={files}
				 // initialValue={files}
       />
      </Form.Item>

      <View className="label">耕地质量</View>
      <Form.Item
        required
        label="面积(亩)"
        initialValue={pattern.area}
        name="area"
      >
        <Input
          className="nut-input-text"
          type="number"
        />
      </Form.Item>

      <Form.Item
        required
        label="土壤质地"
        initialValue={pattern.tuRangZhiDi}
        name="tuRangZhiDi"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="盐碱程度"
        initialValue={pattern.yanJianChengDu}
        name="yanJianChengDu"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="地力等级"
        initialValue={pattern.diLiDengJi}
        name="diLiDengJi"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="盐碱成因"
        initialValue={pattern.yanJianChengYin}
        name="yanJianChengYin"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="主要障碍"
        initialValue={pattern.zhuYaoZhangAi}
        name="zhuYaoZhangAi"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="盐化碱化"
        initialValue={pattern.yanHuaJianHua}
        name="yanHuaJianHua"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="全盐量"
        initialValue={pattern.quanYanLiang}
        name="quanYanLiang"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="有机质含量"
        initialValue={pattern.youJiZhiHanLiang}
        name="youJiZhiHanLiang"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="EC值"
        initialValue={pattern.EC}
        name="EC"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="PH值"
        initialValue={pattern.PH}
        name="PH"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <View className="label">方案措施</View>
      <Form.Item
        required
        label="种植作物"
        initialValue={pattern.zhongZhiZuoWu}
        name="zhongZhiZuoWu"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="灌溉协同"
        initialValue={pattern.guanGaiXieTong}
        name="guanGaiXieTong"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="消障培肥"
        initialValue={pattern.xiaoZhangPeiFei}
        name="xiaoZhangPeiFei"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="种子农艺"
        initialValue={pattern.zhongZiNongYi}
        name="zhongZiNongYi"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="跟踪监测"
        initialValue={pattern.genZongJianCe}
        name="genZongJianCe"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <View className="label">成本核算</View>
      <Form.Item
        required
        label="模式单价"
        initialValue={pattern.moShiDanJia}
        name="moShiDanJia"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="模式总价"
        initialValue={pattern.moShiZongJia}
        name="moShiZongJia"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="中试单产"
        initialValue={pattern.zhongShiDanChan}
        name="zhongShiDanChan"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="灌溉定额"
        initialValue={pattern.guanGaiDingE}
        name="guanGaiDingE"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <View className="label">预期目标</View>
      <Form.Item
        required
        label="盐碱下降"
        initialValue={pattern.yanJianXiaJiang}
        name="yanJianXiaJiang"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="地力提升"
        initialValue={pattern.diLiTiSheng}
        name="diLiTiSheng"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="单产提升"
        initialValue={pattern.danChanTiSheng}
        name="danChanTiSheng"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="水效提升"
        initialValue={pattern.shuiXiaoTiSheng}
        name="shuiXiaoTiSheng"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <View className="label">实施组织</View>
      <Form.Item
        required
        label="验证专题"
        initialValue={pattern.yanZhengZhuanTi}
        name="yanZhengZhuanTi"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="专题负责人"
        initialValue={pattern.zhuanTiFuZeRen}
        name="zhuanTiFuZeRen"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="实施负责人"
        initialValue={pattern.shiShiFuZeRen}
        name="shiShiFuZeRen"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <View className="label">审核审批</View>
      <Form.Item
        required
        label="灌排设计"
        initialValue={pattern.guanPaiSheJi}
        name="guanPaiSheJi"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="培肥设计"
        initialValue={pattern.peiFeiSheJi}
        name="peiFeiSheJi"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="种子确认"
        initialValue={pattern.zhongZiQueRen}
        name="zhongZiQueRen"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="农艺设计"
        initialValue={pattern.nongYiSheJi}
        name="nongYiSheJi"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="监测审核"
        initialValue={pattern.jianCeShenHe}
        name="jianCeShenHe"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="模式审核"
        initialValue={pattern.moShiShenHe}
        name="moShiShenHe"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="课题审批"
        initialValue={pattern.keTiShenPi}
        name="keTiShenPi"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="项目批准"
        initialValue={pattern.xiangMuPiZhun}
        name="xiangMuPiZhun"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <View className="label">其它指标</View>
      <Form.Item
        required
        label="灌溉方式"
        initialValue={pattern.guanGaiFangShi}
        name="guanGaiFangShi"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="肥料施用"
        initialValue={pattern.feiLiaoShiYong}
        name="feiLiaoShiYong"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="预期单产"
        initialValue={pattern.yuQiDanChan}
        name="yuQiDanChan"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="产能提升"
        initialValue={pattern.chanNengTiSheng}
        name="chanNengTiSheng"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="投入"
        initialValue={pattern.touRu}
        name="touRu"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="产出"
        initialValue={pattern.chanChu}
        name="chanChu"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="灌排协同措施"
        initialValue={pattern.guanPaiXieTongCuoShi}
        name="guanPaiXieTongCuoShi"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="消障培肥要点"
        initialValue={pattern.xiaoZhangPeiFeiYaoDian}
        name="xiaoZhangPeiFeiYaoDian"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="农艺栽培特点"
        initialValue={pattern.nongYiZaiPeiTeDian}
        name="nongYiZaiPeiTeDian"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="跟踪监测方案"
        initialValue={pattern.genZongJianCeFangAn}
        name="genZongJianCeFangAn"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="组织实施协同"
        initialValue={pattern.zuZhiShiShiXieTong}
        name="zuZhiShiShiXieTong"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="种子品种"
        initialValue={pattern.zhongZiPinZhong}
        name="zhongZiPinZhong"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>
    </Form>
  )
}

export default Pattern
