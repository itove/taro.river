import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Cell, Empty, Skeleton, InfiniteLoading } from "@nutui/nutui-react-taro"
import { Right } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'
import { Env } from '../../env'
import { fmtDate } from '../../fmtDate'

function goto() {
  Taro.navigateTo({url: '/pages/node/new'})
}

function Index() {
  const [hasMore, setHasMore] = useState(true)
  const [nodeList, setNodeList] = useState()
  const [page, setPage] = useState(1)
  const [user, setUser] = useState([])

  const goto = (id) => {
    Taro.navigateTo({url: '/pages/node/show?id=' + id})
  }

  useEffect(() => {
  console.log(nodeList)
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      console.log('logged in')
      setUser(res.data)
      getNodes(res.data.id)
    })
    .catch(err => {
      console.log(err)
      Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  const getNodes = (uid, page = 1) => {
  console.log(page)
    // fetch my nodes
    Taro.request({
      url: Env.apiUrl + 'nodes?lawyer=' + uid + '&page=' + page
    })
    .then(res => {
      console.log(res)
      const l = res.data.map((n, i) => 
      // <li key={i}>
        <Cell
        className='cell'
        title={n.title}
        description={fmtDate(n.createdAt)}
        align='center'
        extra={<><span>{n.type.name}</span> <Right className="ms-1" size="12" /></>}
        onClick={() => goto(n.id)}
        />
        // </li>
      )
      console.log(l)
      setNodeList(l)
    })
  }

  const loadMore = (done: () => void) => {
    console.log('load morm')
    setTimeout(() => {
      const curLen = nodeList.length
      for (let i = curLen; i < curLen + 10; i++) {
        nodeList.push(`${i}`)
      }
      if (nodeList.length >= 30) {
        setHasMore(false)
      } else {
        setNodeList([...nodeList])
      }
      done()
    }, 500)
  }

  const refresh = (done: () => void) => {
    console.log('refresh')
    getNodes(user.id)
    setPage(1)
    setTimeout(() => {
      Taro.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000,
      })
      done()
    }, 1000)
  }
  const onScroll = (done: () => void) => {
    console.log('scrolling')
  }

  return (
    <View className="p-1">
      <View className="">
        { nodeList && nodeList.length > 0 &&
        // <ul id="nodelist">
        <Cell.Group divider>
         <InfiniteLoading
            pullingText={
              <span style={{ fontSize: '10px' }}>松开刷新</span>
            }
            loadingText="加载中···"
            loadMoreText="没有啦～"
            pullRefresh
            target="nodelist"
            hasMore={hasMore}
            onLoadMore={loadMore}
            onRefresh={refresh}
            threshold={200}
            onScroll={onScroll}
          >
          {nodeList}
        </InfiniteLoading>
        </Cell.Group>
        // </ul>
        }
        { nodeList && nodeList.length === 0 &&
        <Empty status="empty" description="暂无案件" imageSize={250} />
        }
        { nodeList === undefined &&
        <Skeleton animated title rows={22} />
        }
      </View>
    </View>
  )
}

export default Index
