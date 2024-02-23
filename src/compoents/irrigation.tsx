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
import IrrigationForm from './irrigationForm'
import { ArrowDown } from '@nutui/icons-react-taro'

function Irrigation() {
  const [form] = Form.useForm()

  const formSubmit = data => {
    console.log(data)
    let method = 'POST'
    let url = Env.apiUrl + 'patterns'
    let header = {}
    if (!isNew) {
      method = 'PATCH'
      url = Env.apiUrl + 'patterns/' + pid
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
      // labelPosition="left"
      onFinish={(values) => formSubmit(values)}
      onFinishFailed={(values) => onFinishFailed(values)}
      footer={
        <Button formType="submit" block type="primary"> 保 存 </Button>
      }
    >
      <Collapse defaultActiveName={['1']} expandIcon={<ArrowDown size="12"/>}>
      <Collapse.Item title="第1次" name="1">
        <IrrigationForm />
      </Collapse.Item>
      <Collapse.Item title="第2次" name="2">
        <IrrigationForm />
      </Collapse.Item>
      <Collapse.Item title="第3次" name="3">
        <IrrigationForm />
      </Collapse.Item>
      <Collapse.Item title="第4次" name="4">
        <IrrigationForm />
      </Collapse.Item>
      <Collapse.Item title="第5次" name="5">
        <IrrigationForm />
      </Collapse.Item>
      <Collapse.Item title="第6次" name="6">
        <IrrigationForm />
      </Collapse.Item>
      <Collapse.Item title="第7次" name="7">
        <IrrigationForm />
      </Collapse.Item>
      <Collapse.Item title="第8次" name="8">
        <IrrigationForm />
      </Collapse.Item>
      <Collapse.Item title="第9次" name="9">
        <IrrigationForm />
      </Collapse.Item>
      <Collapse.Item title="第10次" name="10">
        <IrrigationForm />
      </Collapse.Item>
      <Collapse.Item title="第11次" name="11">
        <IrrigationForm />
      </Collapse.Item>
      <Collapse.Item title="第12次" name="12">
        <IrrigationForm />
      </Collapse.Item>
    </Collapse>
    </Form>
  )
}

export default Irrigation
