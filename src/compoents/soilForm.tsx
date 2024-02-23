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

function SoilForm() {
  return (
    <>
      <View className="label">土壤物理</View>
      <Form.Item
        label="粘:粉:砂"
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
        label="土壤质地"
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
        label="干容重(mg/cm³)"
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
        label="孔隙度(%)"
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
      <View className="label">土壤养分</View>
      <Form.Item
        label="全氮(g/kg)"
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
        label="全磷(g/kg)"
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
        label="全钾(g/kg)"
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
        label="有机质(g/kg)"
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
        label="硝态氮(g/kg)"
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
        label="氨态氮(g/kg)"
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
        label="有效磷(mg/kg)"
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
        label="有效钾(mg/kg)"
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
        label="碱解氮(mg/kg)"
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
        label="全盐量(g/kg)"
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
        label="EC(ds/m)"
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
        label="pH"
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
      <View className="label">水力特性参数</View>
      <Form.Item
        label="饱和含水率(cm³/cm³)"
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
        label="饱和导水率(cm/d)"
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
        label="田间持水量(cm³/cm³)"
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

export default SoilForm
