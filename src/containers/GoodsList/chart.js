import React, { useState, useEffect, useRef } from 'react'
import { Chart } from '@antv/g2'
import { Radio } from 'antd'
import moment from 'moment'

let btnOptions = [
  { label: '今日', value: 'day' },
  { label: '最近7日', value: 'week' },
  { label: '最近30日', value: 'month' }
]


export default class CustomChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'day'
    }
    this.chart = {}
    this.cls = 'chart' + moment().millisecond() + '' + Math.random().toFixed(6)
  }

  draw = () => {
    const { status } = this.state
    this.chart = new Chart({
      container: this.cls,
      autoFit: true,
      height: 400
    })
  
    this.chart.data(this.props[status])
  
    this.chart.scale({
      label: {
        range: [0, 1]
      },
      value: {
        min: 0,
        nice: true
      }
    })
  
    this.chart.tooltip({
      showCrosshairs: true,
      shared: true
    })
  
    this.chart.line().position('label*value').color('type')
    this.chart.point().position('label*value').color('type')
    this.chart.render()
  }

  handleChange = (e) => {
    this.setState({
      status: e.target.value
    }, () => {
      this.chart.data(this.props[e.target.value])
      this.chart.render()
    })
  }

  componentDidMount () {
    this.draw()
  }

  UNSAFE_componentWillReceiveProps (newProps) {
    this.chart.data(newProps[this.state.status])
    this.chart.render()
  }

  render() {
    const { status } = this.state
    return (
      <div>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <p>货物状态</p>
        <Radio.Group
          options={btnOptions}
          onChange={this.handleChange}
          value={status}
          optionType='button'
          buttonStyle='solid'
        />
      </div>

      <div id={this.cls} />
    </div>
    )
  }
}