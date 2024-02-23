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

function Pattern() {
  const [tabIndex, setTabIndex] = useState(0)
  const [form] = Form.useForm()
  const [pid, setPid] = useState(0)

  useEffect(() => {
    const instance = Taro.getCurrentInstance();
    const pid = instance.router.params.id
    setPid(pid)
  }, [])

  const onFailure = (res) => {
    console.log(res)
  }

  const onSuccess = (res) => {
    console.log(res)
  }

  const onFinishFailed = v => {
  }

  const formSubmit = data => {
    data.image = JSON.parse(data.upload[0].responseText.data).url.replace(/.*\//, '') 
    console.log(data)
    Taro.request({
      method: 'PATCH',
      url: Env.apiUrl + 'patterns/' + pid,
      header: {
        'content-type': 'application/merge-patch+json'
      },
      data
    }).then((res) => {
      if (res.statusCode === 200) {
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
        required
        label="模式名称"
        name="name"
        initialValue="fuck name"
        rules={[
          { max: 50, message: '不能超过50字符' },
          { required: true, message: '请输入模式名称' },
        ]}
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="模式编号"
        name="SN"
        rules={[
          { max: 10, message: '不能超过10字符' },
          { required: true, message: '请输入模式编号' },
        ]}
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="验证地点"
        name="location"
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
        name="latitude"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="中心东经"
        name="longitude"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="面积(亩)"
        name="area"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="土壤质地"
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
        label="种植作物"
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
        name="genZongJianCe"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="模式单价"
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
        name="guanGaiDingE"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="盐碱下降"
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
        name="shuiXiaoTiSheng"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="验证专题"
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
        name="shiShiFuZeRen"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="灌排设计"
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
        name="xiangMuPiZhun"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="高程"
        name="gaoCheng"
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
        name="PH"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
        required
        label="灌溉方式"
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
        name="zhongZiPinZhong"
      >
        <Input
          className="nut-input-text"
          placeholder=""
          type="text"
        />
      </Form.Item>

      <Form.Item
         label="田块照片"
         name="upload"
      >
       <Uploader
         name="upload"
         xhrState={200}
         // maxCount="9" multiple="true"
         url={Env.uploadUrl}
         onSuccess={onSuccess}
         onFailure={onFailure}
       />
      </Form.Item>
    </Form>
  )
}

export default Pattern
