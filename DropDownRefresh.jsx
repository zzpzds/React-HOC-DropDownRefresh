import React, {Component} from 'react'
import './index.css'

export default function WithDropDownRefresh(DropDownComponent) {
  return class DropDownRefresh extends Component {
    constructor(props) {
      super(props)
      this.state = {
        startPosition: 0, //开始滑动的起始位置
        lengthPosition: 0, //刷新元素的长度
        lastPosition: 0, //当前开始滑动的时候刷新元素的长度
        refresh: false //是否刷新
      }
    }
    refreshPosition = 50 //指定的刷新位置长度
    trik = '' //结束滑动后循环减少刷新元素长度的收缩效果
    componentDidMount() {
      this.refs.ddc.addEventListener('touchstart', (evt) => {
        if (this.trik) {
          clearInterval(this.trik) //结束收缩效果
        }
        this.setState({
          startPosition: evt.changedTouches[0].clientY,
          lastPosition: this.state.lengthPosition
        })
      })
      this.refs.ddc.addEventListener('touchmove', (evt) => {
        evt.preventDefault()
        let length = evt.changedTouches[0].clientY-this.state.startPosition //滑动的长度
        this.setState({
          lengthPosition: ((length > 0?Math.pow(length, 0.8):length) + this.state.lastPosition > 0)?((length > 0?Math.pow(length, 0.8):length) + this.state.lastPosition):0 //（1）利用函数使滑动随长度越来越难；（2）总长度=滑动长度+上次收缩结束时的长度；（3）如果计算出的滑动元素长度小于0则直接指定为0，因为如果长度值没有经过0，它会显示最小正值
        })
      })
      this.refs.ddc.addEventListener('touchend', (evt) => {
        let endPosition;
        if (this.state.lengthPosition >= this.refreshPosition) {
          endPosition = this.refreshPosition
        } else {
          endPosition = 0
        }
        this.trik = setInterval(() => {
          if (this.state.lengthPosition > endPosition) {
            this.setState((prevState) => ({
              lengthPosition: prevState.lengthPosition -= 3
            }))
          } else {
            this.setState({
              lengthPosition: endPosition, //如果元素长度恰好没有经过0，它就会显示最小的正数长度，比如1-3=-2，它会显示1。所以直接指定想要的长度
              refresh: endPosition === this.refreshPosition?true:false //指定是否执行刷新操作
            })
            clearInterval(this.trik)
          }
        }, 1)
      })
    }
    render() {
      return (
        <div className='refresh-content'>
          <div className='refresh-wrap' style={{height: this.state.lengthPosition+'px'}}>
            {this.state.refresh ? <div className='icon-refresh'></div>:<div className='tip-refresh'>放开刷新</div>}
          </div>
          <div ref='ddc'>
            <DropDownComponent></DropDownComponent>        
          </div>
        </div>
      )
    }
  }
}
