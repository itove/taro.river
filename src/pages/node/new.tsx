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
import { Right, Uploader as Plus } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'
import { Env } from '../../env'

function Index() {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState('')
  const [types, setTypes] = useState([])
  const [pics, setPics] = useState([])
  const [others, setOthers] = useState([])
  const [othersList, setOthersList] = useState([])
  const [count, setCount] = useState(1)
  const [desc1, setDesc1] = useState('')
  const [uid, setUid] = useState(0)

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      setUid(res.data.id)
    })
  }, [])

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

  const onFinishFailed = v => {
    if (type.value === undefined) {
      setDesc1('请选择类型')
    }
  }

  const formSubmit = v => {
    let data = v
    if (type.value === undefined) {
      setDesc1('请选择类型')
      return
    }

    data.type = '/api/types/' + type.value
    data.lawyer = '/api/users/' + uid
    data.application = pics[0]
    console.log(data)
    // return

    Taro.request({
      method: 'POST',
      url: Env.apiUrl + 'nodes',
      data
    }).then((res) => {
      if (res.statusCode === 201) {
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        }).then(() => {
          Taro.reLaunch({ url: '/pages/node/index' })
        })
      } else {
        Taro.showToast({
          title: '系统错误',
          icon: 'error',
          duration: 2000
        })
        console.log('server error！' + res.errMsg)
      }
    })

    //
    // if app image not uploaded
    // show error msg and return
  }
  
  const onFailure = (res) => {
    console.log(res)
  }

  const onSuccess = (res) => {
    console.log(res)
    let pic = JSON.parse(res.responseText.data).url.replace(/.*\//, '')
    setPics([...pics, pic])
  }

  const onSuccessOther = (res) => {
    console.log(res)
    let pic = JSON.parse(res.responseText.data).url.replace(/.*\//, '')
  }

  const onDelete = (file, files) => {
    console.log(file)
    console.log(files)
    setPics(files)
  }

  const onDeleteOther = (file, files) => {
    console.log(file)
    console.log(files)
  }

  const onBlurOther = (v) => {
    console.log(v)
  }

  const more = () => {
    setCount(count + 1)
    let list = []
    for (let i = 0; i < count; i++) {
      list.push(
      <Cell>
        <Input
          className="nut-input-text"
          placeholder="材料名称"
          type="text"
          onBlur={onBlurOther}
        />
        <Uploader
          name="upload"
          xhrState={201}
          maxCount="1" multiple="true"
          data={{type: 3}}
          url={Env.uploadUrl}
          onSuccess={onSuccessOther}
          onFailure={onFailure}
          onDelete={onDeleteOther}
        />
      </Cell>
      )
    }
    setOthersList(list)
  }

  const reset = () => {
    console.log('reset')
    setOthersList([])
    setType('')
    setCount(1)
  }

  return (
    <View className="">
      <View className="index">
      <Form
        className="form"
        divider
        labelPosition="left"
        onFinish={(values) => formSubmit(values)}
        onFinishFailed={(values) => onFinishFailed(values)}
        footer={
          <View className="footer">
            <Button formType="submit" type="primary"> 提交 </Button>
            <Button formType="reset" type="default" onClick={reset}> 清空 </Button>
          </View>
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
          className="title1"
          label="标题"
          name="title"
          errorMessageAlign="right"
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
            // required="true"
         >
          <Uploader
            name="upload"
            xhrState={201}
            // maxCount="9" multiple="true"
            data={{type: 2}}
            url={Env.uploadUrl}
            onSuccess={onSuccess}
            onFailure={onFailure}
            onDelete={onDelete}
          />
        </Form.Item>

        {othersList}

        <View class="btn-wrapper">
          <Button size="small" block type="default" onClick={more} icon={<Plus size="16" />}> 添加材料 </Button>
        </View>

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
