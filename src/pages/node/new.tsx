import  React, { useState  } from "react";
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

function Index() {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState('')
  const [others, setOthers] = useState([])
  const [othersList, setOthersList] = useState([])
  const [count, setCount] = useState(1)
  const types = [
    [
      { value: 1, text: '南京市',},
      { value: 2, text: '无锡市',},
      { value: 3, text: '海北藏族自治区',},
      { value: 4, text: '北京市',}
    ]
  ]

  const changePicker = (list: any[], option: any, columnIndex: number) => {
    // console.log(columnIndex, option)
  }

  const confirmPicker = (options: PickerOption[], values: (string | number)[]) => {
    setType(options[0])
  }

  const formSubmit = v => {
    console.log(v)
  }

  const more = () => {
    console.log('add more')
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
        <Cell title="请选择类型" extra={type.text} onClick={() => setVisible(!visible)} />
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
