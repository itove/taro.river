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
  const [pid, setPid] = useState(0)
  const [pattern, setPattern] = useState({})
  const [isNew, setIsNew] = useState(true)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const instance = Taro.getCurrentInstance();
    const pid = instance.router.params.pid
    setPid(pid)
    if (pid !== undefined) {
      setIsNew(false)
      setDisabled(false)
      Taro.request({
        url: Env.apiUrl + 'patterns/' + pid
      })
      .then(res => {
        const pattern = res.data
        setPattern(pattern)
        console.log(pattern)
      })
    } else {
    }
  }, [])

  return (
    <View className="">
      <Tabs autoHeight onChange={(v) => {setTabIndex(v)}} activeType="simple">
        <Tabs.TabPane key={0} title="模式概要"> <Pattern pattern={pattern} isNew={isNew} /> </Tabs.TabPane>
        <Tabs.TabPane disabled={disabled} key={1} title="理化本底"> <Soil /> </Tabs.TabPane>
        <Tabs.TabPane disabled={disabled} key={2} title="灌排协同"> <Irrigation /> </Tabs.TabPane>
        <Tabs.TabPane disabled={disabled} key={3} title="消障培肥"> <Fertilizer /> </Tabs.TabPane>
        <Tabs.TabPane disabled={disabled} key={4} title="种子农艺"> <Seed /> </Tabs.TabPane>
        <Tabs.TabPane disabled={disabled} key={5} title="跟踪监测"> <Tracking /> </Tabs.TabPane>
        <Tabs.TabPane disabled={disabled} key={6} title="成本效益"> <Cost /> </Tabs.TabPane>
			</Tabs>
    </View>
  )
}

export default Edit
