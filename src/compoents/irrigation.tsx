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

function Irrigation({ pattern }) {
  const [form] = Form.useForm()

  const formSubmit = data => {
    data.entity = 'Irrigation'
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
        <IrrigationForm index={0}/>
      </Collapse.Item>
      <Collapse.Item title="第2次" name="2">
        <IrrigationForm index={1}/>
      </Collapse.Item>
      <Collapse.Item title="第3次" name="3">
        <IrrigationForm index={2}/>
      </Collapse.Item>
      <Collapse.Item title="第4次" name="4">
        <IrrigationForm index={3}/>
      </Collapse.Item>
      <Collapse.Item title="第5次" name="5">
        <IrrigationForm index={4}/>
      </Collapse.Item>
      <Collapse.Item title="第6次" name="6">
        <IrrigationForm index={5}/>
      </Collapse.Item>
      <Collapse.Item title="第7次" name="7">
        <IrrigationForm index={6}/>
      </Collapse.Item>
      <Collapse.Item title="第8次" name="8">
        <IrrigationForm index={7}/>
      </Collapse.Item>
      <Collapse.Item title="第9次" name="9">
        <IrrigationForm index={8}/>
      </Collapse.Item>
      <Collapse.Item title="第10次" name="10">
        <IrrigationForm index={9}/>
      </Collapse.Item>
      <Collapse.Item title="第11次" name="11">
        <IrrigationForm index={10}/>
      </Collapse.Item>
      <Collapse.Item title="第12次" name="12">
        <IrrigationForm index={11}/>
      </Collapse.Item>
    </Collapse>
    </Form>
  )
}

export default Irrigation
