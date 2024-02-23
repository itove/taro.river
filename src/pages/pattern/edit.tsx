import React, { useState, useEffect, useRef } from "react";
import { View } from '@tarojs/components'
import './index.scss'
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
import { Env } from '../../env'
import Pattern from '../../compoents/pattern'
import Soil from '../../compoents/soil'
import Irrigation from '../../compoents/irrigation'
import Fertilizer from '../../compoents/fertilizer'
import Seed from '../../compoents/seed'
import Tracking from '../../compoents/tracking'
import Cost from '../../compoents/cost'

function Edit() {
  const [tabIndex, setTabIndex] = useState(0)
  const [form] = Form.useForm()
  const [pid, setPid] = useState(0)

  useEffect(() => {
    const instance = Taro.getCurrentInstance();
    const pid = instance.router.params.pid
    setPid(pid)
  }, [])

  return (
    <View className="">
      <Tabs onChange={(v) => {setTabIndex(v)}} activeType="simple">
        <Tabs.TabPane key={0} title="模式概要"> <Pattern /> </Tabs.TabPane>
        <Tabs.TabPane key={1} title="理化本底"> <Soil /> </Tabs.TabPane>
        <Tabs.TabPane key={2} title="灌排协同"> <Irrigation /> </Tabs.TabPane>
        <Tabs.TabPane key={3} title="消障培肥"> <Fertilizer /> </Tabs.TabPane>
        <Tabs.TabPane key={4} title="种子农艺"> <Seed /> </Tabs.TabPane>
        <Tabs.TabPane key={5} title="跟踪监测"> <Tracking /> </Tabs.TabPane>
        <Tabs.TabPane key={6} title="成本效益"> <Cost /> </Tabs.TabPane>
			</Tabs>
    </View>
  )
}

export default Edit
