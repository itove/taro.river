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
import TrackingForm from './trackingForm'

function Tracking({ pattern }) {
  const [index, setIndex] = useState(0)

  const options = [
    { text: '1.气象水文环境', value: 0 },
    { text: '2.灌溉', value: 1 },
    { text: '3.排水', value: 2 },
    { text: '4.施肥', value: 3 },
    { text: '5.水分运动', value: 4 },
    { text: '6.盐分运动', value: 5 },
    { text: '7.作物生长', value: 6 },
  ]

  const handleChange = v => {
    setIndex(v.value)
  }

  return (
    <>
      <Menu>
        <Menu.Item options={options} value={index} onChange={handleChange} />
      </Menu>
      <TrackingForm index={index}/>
    </>
  )
}

export default Tracking
