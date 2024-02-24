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
import IrrigationForm from './irrigationForm'

function Irrigation({ pattern }) {
  const [index, setIndex] = useState(0)

  const options = [
    { text: '第1次', value: 0 },
    { text: '第2次', value: 1 },
    { text: '第3次', value: 2 },
    { text: '第4次', value: 3 },
    { text: '第5次', value: 4 },
    { text: '第6次', value: 5 },
    { text: '第7次', value: 6 },
    { text: '第8次', value: 7 },
    { text: '第9次', value: 8 },
    { text: '第10次', value: 9 },
    { text: '第11次', value: 10 },
    { text: '第12次', value: 11 },
  ]

  const handleChange = v => {
    setIndex(v.value)
  }

  return (
    <>
      <Menu>
        <Menu.Item options={options} value={index} onChange={handleChange} />
      </Menu>
      <IrrigationForm index={index}/>
    </>
  )
}

export default Irrigation
