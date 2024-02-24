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
  Menu,
  Tabs
} from '@nutui/nutui-react-taro'
import { Right, Uploader as Plus } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'
import { Env } from '../env'
import CostForm from './costForm'

function Cost({ pattern }) {
  const [index, setIndex] = useState(0)

  const options = [
    { text: '高标准农田建设', value: 0 },
    { text: '平田整地', value: 1 },
    { text: '播种', value: 2 },
    { text: '灌溉排水', value: 3 },
    { text: '施肥1', value: 4 },
    { text: '施肥2', value: 5 },
    { text: '施肥3', value: 6 },
    { text: '管护1', value: 7 },
    { text: '管护2', value: 8 },
    { text: '管护3', value: 9 },
    { text: '产品1', value: 10 },
    { text: '产品2', value: 11 },
    { text: '产品3', value: 12 },
    { text: '产品4', value: 13 },
  ]

  const handleChange = v => {
    setIndex(v.value)
  }

  return (
    <>
      <Menu>
        <Menu.Item options={options} value={index} onChange={handleChange} />
      </Menu>
      <CostForm index={index}/>
    </>
  )
}

export default Cost
