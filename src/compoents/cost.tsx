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

function Cost({ pattern }) {
  const [form] = Form.useForm()

  const formSubmit = data => {
    data.entity = 'Cost'
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
      <Collapse.Item title="高标准农田建设" name="1">
        <CostForm index={0} />
      </Collapse.Item>
      <Collapse.Item title="平田整地" name="2">
        <CostForm index={1} />
      </Collapse.Item>
      <Collapse.Item title="播种" name="3">
        <CostForm index={2}/>
      </Collapse.Item>
      <Collapse.Item title="灌溉排水" name="4">
        <CostForm index={3}/>
      </Collapse.Item>
      <Collapse.Item title="施肥1" name="5">
        <CostForm index={4}/>
      </Collapse.Item>
      <Collapse.Item title="施肥2" name="6">
        <CostForm index={5}/>
      </Collapse.Item>
      <Collapse.Item title="施肥3" name="7">
        <CostForm index={6}/>
      </Collapse.Item>
      <Collapse.Item title="管护1" name="8">
        <CostForm index={7}/>
      </Collapse.Item>
      <Collapse.Item title="管护2" name="9">
        <CostForm index={8}/>
      </Collapse.Item>
      <Collapse.Item title="管护3" name="10">
        <CostForm index={9}/>
      </Collapse.Item>
      <Collapse.Item title="产品1" name="11">
        <CostForm index={10}/>
      </Collapse.Item>
      <Collapse.Item title="产品2" name="12">
        <CostForm index={11}/>
      </Collapse.Item>
      <Collapse.Item title="产品3" name="13">
        <CostForm index={12}/>
      </Collapse.Item>
      <Collapse.Item title="产品4" name="14">
        <CostForm index={13}/>
      </Collapse.Item>
    </Collapse>
    </Form>
  )
}

export default Cost
