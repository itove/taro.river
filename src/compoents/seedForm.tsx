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

function SeedForm() {
  return (
    <>
      <View className="label">土壤物理</View>
      <Form.Item
        label="日期"
        name="name"
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
        label="农艺技术"
        name="name"
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
        label="物理结构改善"
        name="name"
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
        label="措施3"
        name="name"
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
    </>
  )
}

export default SeedForm
