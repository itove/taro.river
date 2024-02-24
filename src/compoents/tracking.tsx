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
  Collapse,
  Tabs
} from '@nutui/nutui-react-taro'
import { Right, Uploader as Plus } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'
import { Env } from '../env'
import TrackingForm from './trackingForm'
import { ArrowDown } from '@nutui/icons-react-taro'

function Tracking({ pattern }) {
  const [form] = Form.useForm()

  const formSubmit = data => {
    data.entity = 'Tracking'
    console.log(data)
    const method = 'PATCH'
    const url = Env.apiUrl + 'updateOthers/' + pattern.id
    const header = {
      'content-type': 'application/merge-patch+json'
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
      // labelPosition="left"
      onFinish={(values) => formSubmit(values)}
      onFinishFailed={(values) => onFinishFailed(values)}
      footer={
        <Button formType="submit" block type="primary"> 保 存 </Button>
      }
    >
      <Collapse defaultActiveName={['1']} expandIcon={<ArrowDown size="12"/>}>
      <Collapse.Item title="1.气象水文环境" name="1">
        <TrackingForm index={0}/>
      </Collapse.Item>
      <Collapse.Item title="2.灌溉" name="2">
        <TrackingForm index={1}/>
      </Collapse.Item>
      <Collapse.Item title="3.排水" name="3">
        <TrackingForm index={2}/>
      </Collapse.Item>
      <Collapse.Item title="4.施肥" name="4">
        <TrackingForm index={3}/>
      </Collapse.Item>
      <Collapse.Item title="5.水分运动" name="5">
        <TrackingForm index={4}/>
      </Collapse.Item>
      <Collapse.Item title="6.盐分运动" name="6">
        <TrackingForm index={5}/>
      </Collapse.Item>
      <Collapse.Item title="7.作物生长" name="7">
        <TrackingForm index={6}/>
      </Collapse.Item>
    </Collapse>
    </Form>
  )
}

export default Tracking
