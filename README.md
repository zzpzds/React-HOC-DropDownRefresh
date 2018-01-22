# React-HOC-DropDownRefresh
**一个实现下拉刷新的react高阶组件**
***
## 使用方法
1. 直接将`DropDownRefresh.jsx`和`DropDownRefresh.css`复制到你的项目中作为一个公共组件
2. 在想要实现下拉刷新的组件里面引入这个高阶组件
3. 将当前组件作为参数传入高阶组件即可实现下拉刷新的效果
***
代码示例：

    import React, {Component} from 'react'
    import WithDropDownRefresh from './drop-down-refresh'
    
    class Groups extends Component {
      constructor(props) {
        super(props)
        this.state = {}
      }
      render() {
        return (
          <div className='groups-content'>
            <div className='groups-list'>
              ...
            </div>
          </div>
        )
      }
    }

    export default WithDropDownRefresh(Groups)
