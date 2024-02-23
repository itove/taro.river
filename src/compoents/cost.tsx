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
import CostForm from './costForm'
import { ArrowDown } from '@nutui/icons-react-taro'

function Cost() {
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
      <Collapse.Item title="高标准农田建设" name="1">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="平田整地" name="2">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="播种" name="3">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="灌溉排水" name="4">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="施肥1" name="5">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="施肥2" name="6">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="施肥3" name="7">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="管护1" name="8">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="管护2" name="9">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="管护3" name="10">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="产品1" name="11">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="产品2" name="12">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="产品3" name="13">
        <CostForm />
      </Collapse.Item>
      <Collapse.Item title="产品4" name="14">
        <CostForm />
      </Collapse.Item>
    </Collapse>
    </Form>
  )
}

export default Cost
