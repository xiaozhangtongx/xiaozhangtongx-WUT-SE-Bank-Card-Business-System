<template>
  <div>
    <h1>hello</h1>
    <Chart :option="ChartOpthion" style="height:300px" />
  </div>
</template>

<script>
import Chart from '@/components/Chart'
import random from 'lodash/random'
export default {
  components: { Chart },
  name: '',
  data() {
    return {
      ChartOpthion: {
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.ChartOpthion.series[0].data = this.ChartOpthion.series[0].data.map(() => random(100))
      this.ChartOpthion = { ...this.ChartOpthion }
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {},
  components: {
    Chart,
  },
}
</script>

<style scoped lang='less'>
</style>