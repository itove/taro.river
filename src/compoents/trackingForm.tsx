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

function TrackingForm({ index }) {
  const [form] = Form.useForm()

  useEffect(() => {
    console.log(index)
  }, [index])

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
      <Form.Item
        label="方法设备"
        name={"fangFaSheBei-" + index}
        // initialValue={pattern.name}
        rules={[
          { max: 50, message: '不能超过50字符' },
        ]}
      >
        <Input
          className="nut-input-text"
          type="text"
        />
      </Form.Item>
      <Form.Item
        label="监测频次"
        name={"jianCePinCi-" + index}
        // initialValue={pattern.name}
        rules={[
          { max: 50, message: '不能超过50字符' },
        ]}
      >
        <Input
          className="nut-input-text"
          type="text"
        />
      </Form.Item>
      <Form.Item
        label="现地远程"
        name={"xianDiYuanCheng-" + index}
        // initialValue={pattern.name}
        rules={[
          { max: 50, message: '不能超过50字符' },
        ]}
      >
        <Input
          className="nut-input-text"
          type="text"
        />
      </Form.Item>
      <Form.Item
        label="监测专题"
        name={"jianCeZhuanTi-" + index}
        // initialValue={pattern.name}
        rules={[
          { max: 50, message: '不能超过50字符' },
        ]}
      >
        <Input
          className="nut-input-text"
          type="text"
        />
      </Form.Item>
    </Form>
  )
}

export default TrackingForm
