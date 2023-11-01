import  React, { useState, useEffect } from "react";
import { View } from '@tarojs/components'
import './index.scss'
import {
  Cell,
  Form,
  Picker,
	Uploader,
  Button,
  InputNumber,
  Input,
  TextArea
} from '@nutui/nutui-react-taro'
import { Right } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'
import { Env } from '../../env'

function Index() {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState('')
  const [types, setTypes] = useState([])
  const [others, setOthers] = useState([])
  const [othersList, setOthersList] = useState([])
  const [count, setCount] = useState(1)
  const [desc1, setDesc1] = useState('')

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'types'
    })
    .then(res => {
      // console.log(res)
      let t = res.data
      for (const i of t) {
        i.text = i.name
        i.value = i.id
      }
      setTypes(t)
    })
  }, [])

  const changePicker = (list: any[], option: any, columnIndex: number) => {
    // console.log(columnIndex, option)
  }

  const confirmPicker = (options: PickerOption[], values: (string | number)[]) => {
    setType(options[0])
    setDesc1('')
  }

  const formSubmit = v => {
    let data = v
    // if type not selected
    if (type.value === undefined) {
      // show error msg and return
      setDesc1('请选择类型')
      // console.log('select type')
      return
    }
    //
    // if app image not uploaded
    // show error msg and return
    
    data.tid = type.value
    console.log(data)
  }

  const more = () => {
    // console.log('add more')
    setCount(count + 1)
    let list = []
    for (let i = 0; i < count; i++) {
      list.push(
      <Cell>
        <Input
          className="nut-input-text"
          placeholder="材料名称"
          type="text"
        />
        <Uploader url="https://my-json-server.typicode.com/linrufeng/demo/posts" />
      </Cell>
      )
    }
    setOthersList(list)
  }

  return (
    <View className="">
      <View className="index">
      <Form
        divider
        labelPosition="left"
        onSubmit={formSubmit}
        onFinish={(values) => formSubmit(values)}
        footer={
          <>
            <Button formType="submit" block type="primary">
              提交
            </Button>
          </>
        }
      >
        <Cell title="请选择类型" description={desc1} className="red-desc" extra={type.name} onClick={() => setVisible(!visible)} />
        <Picker
          visible={visible}
          options={types}
          onConfirm={(list, values) => confirmPicker(list, values)}
          onClose={() => setVisible(false)}
          onChange={changePicker}
         />

        <Form.Item
          // required
          label="标题"
          name="title"
          className="err-on-right"
          rules={[
            { max: 25, message: '标题不能超过25个字' },
            { required: true, message: '请输入标题' },
          ]}
        >
          <Input
            className="nut-input-text"
            placeholder="请输入标题"
            align="right"
            type="text"
          />
        </Form.Item>
       <Form.Item
          label="申请书图片"
          name="files"
					required="true"
        >
          <Uploader
            url="https://my-json-server.typicode.com/linrufeng/demo/posts" />
        </Form.Item>

        {othersList}

        <Button block type="default" onClick={more}> 添加材料 </Button>

        <Cell>正文</Cell>
        <Form.Item
          name="body"
					autoSize="true"
          rules={[
            { min: 10, message: '正文不能少于10个字' },
            { required: true, message: '请输入正文' },
          ]}
        >
          <TextArea placeholder="请输入正文" maxLength={1000} />
        </Form.Item>
      </Form>
      </View>
    </View>
  )
}

export default Index
