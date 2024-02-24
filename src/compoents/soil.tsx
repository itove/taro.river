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
import SoilForm from './soilForm'
import { ArrowDown } from '@nutui/icons-react-taro'

function Soil({ pattern }) {
  const [index, setIndex] = useState(0)

  const options = [
    { text: '0-20cm', value: 0 },
    { text: '20-40cm', value: 1 },
    { text: '40-60cm', value: 2 },
    { text: '60-80cm', value: 3 },
  ]

  const handleChange = v => {
    setIndex(v.value)
  }

  return (
    <>
      <Menu>
        <Menu.Item options={options} value={index} onChange={handleChange} />
      </Menu>
      <SoilForm index={index}/>
    </>
  )
}

export default Soil
