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
import FertilizerForm from './fertilizerForm'
import { ArrowDown } from '@nutui/icons-react-taro'

function Fertilizer({ pattern }) {
  const [form] = Form.useForm()

  const formSubmit = data => {
    data.entity = 'Fertilizer'
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
      <Collapse.Item title="第1次" name="1">
        <FertilizerForm index={0}/>
      </Collapse.Item>
      <Collapse.Item title="第2次" name="2">
        <FertilizerForm index={1}/>
      </Collapse.Item>
      <Collapse.Item title="第3次" name="3">
        <FertilizerForm index={2}/>
      </Collapse.Item>
      <Collapse.Item title="第4次" name="4">
        <FertilizerForm index={3}/>
      </Collapse.Item>
      <Collapse.Item title="第5次" name="5">
        <FertilizerForm index={4}/>
      </Collapse.Item>
      <Collapse.Item title="第6次" name="6">
        <FertilizerForm index={5}/>
      </Collapse.Item>
    </Collapse>
    </Form>
  )
}

export default Fertilizer
