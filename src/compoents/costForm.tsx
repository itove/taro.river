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

function TrackingForm() {
  return (
    <>
      <Form.Item
        label="内容"
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
        label="单位"
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
        label="总量"
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
        label="单价"
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
        label="总价"
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
        label="方法"
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
        label="名称"
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
        label="施用量"
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

export default TrackingForm
