// First, we initialize the chart in the container element.
var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom, null, {
	renderer: 'canvas',
	useDirtyRect: false
});

// Fetching the data from the 'data.json' file.
fetch('data.json')
.then(response => response.json())
.then(data => {
	// Once data is fetched, we configure the chart options.
	var option = {
		textStyle: {
			fontFamily: 'NanumSquareNeo-Variable',
			fontSize: 8,
			color: '#000000'
		},
		legend: {
			show: false,
		},
		tooltip: {
			triggerOn: 'click',
			transitionDuration: 0.5,
			alwaysShowContent: true,
			borderColor: '#000000',
			padding: 16,
			textStyle: {
				color: '#000000',
				fontSize: 10,
				lineHeight: 16,
				height: 8,
				fontWeight: 'normal',
			},
			appendToBody: true,
		},
		xAxis: {
			type: 'time',
			axisLabel: {
				fontSize: 8,
				fontWeight: 'normal',
			},
			axisTick: {
				length: 4,
			},
			axisPointer: {
				value: '2016-12-07',
				snap: true,
				lineStyle: {
					color: '#000',
					width: 1,
					type: 'solid',
				},
				label: {
					show: true,
					margin: 0,
					padding: [8, 10, 8, 10],
					formatter: function (params) {
						return echarts.format.formatTime('yyyy-MM-dd', params.value);
					},
					backgroundColor: '#000'
				},
				handle: {
					show: true,
					color: 'rgba(0,0,0,0)',
					size: [80, 20],
					margin: 20,
				}
			},
			splitLine: {
				show: false
			}
		},
		yAxis: {
			type: 'value',
			axisLine: {
				show: true,
			},
			axisTick: {
				inside: true
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#000000',
					opacity: 0.1,
				}
			},
			axisLabel: {
				fontSize: 8,
				align: 'left',
				margin: 50,
			},
			z: 10
		},
		grid: {
			top: 4,
			left: 50,
			right: 10,
			bottom: 0,
			height: 381,
		},
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: 0,
				minSpan: 5,
			},
			{
				type: 'slider',
				xAxisIndex: 0,
				minSpan: 5,
				left: 46,
				right: 13,
				bottom: 10,
				height: 40,
				backgroundColor: "#FAFAFA",
				borderRadius: 6,
				borderColor: '#E8E8E8',
				fillerColor: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [{
						offset: 0, color: 'rgba(0, 0, 0, 0)'
					}, {
						offset: 1, color: 'rgba(0, 0, 0, 0.1)'
					}],
					global: false
				},
				dataBackground: {
					areaStyle: {
						color: '#E4F5FF',
						opacity: 1,
					},
					lineStyle: {
						color: '#C9E7F8',
						opacity: 1,
						width: 1,
					}
				},
				selectedDataBackground: {
					areaStyle: {
						color: '#ADFFFF',
						opacity: 1,
					},
					lineStyle: {
						color: '#87F4F2',
						opacity: 1,
						width: 1,
					}
				},
				handleStyle: {
					borderColor: "#A8ADBA",
				},
				moveHandleSize: 10,
				moveHandleStyle: {
					color: '#A8ADBA',
					borderWidth: 0,
					opacity: 1,
				},
				emphasis: {
					moveHandleStyle: {
						color: '#95A1BE',
					},
					handleStyle: {
						borderColor: "#95A1BE",
					},
				},
			}
		],
		series: [
			{
				name: '실제가격',
				type: 'line',
				emphasis: {
					focus: 'series'
				},
				smooth: 0.2,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				itemStyle: {
					color: '#00CD7D',
				},
				lineStyle: {
					color: '#00CD7D',
					width: 1.5,
				},
				data: data.cu
			},
			{
				name: '예측모델',
				type: 'line',
				emphasis: {
					focus: 'series'
				},
				smooth: 0.2,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				itemStyle: {
					color: '#00CD7D',
				},
				lineStyle: {
					color: '#00CD7D',
					width: 1.5,
					opacity: 0.5,
				},
				data: data.cuFct
			},
			{
				name: '예측모델 Max',
				type: 'line',
				stack: 'MinMax',
				emphasis: {
					focus: 'series'
				},
				smooth: 0.2,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				itemStyle: {
					color: '#00CD7D',
				},
				lineStyle: {
					opacity: 0,
				},
				data: data.cuRan
			},
			{
				name: '예측모델 Min',
				type: 'line',
				stack: 'MinMax',
				emphasis: {
					focus: 'series'
				},
				smooth: 0.2,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				itemStyle: {
					color: '#00CD7D',
				},
				lineStyle: {
					opacity: 0,
				},
				areaStyle: {
					color: '#00CD7D',
					opacity: 0.1,
				},
				data: data.cuRan
			},
		]
	};

	// Setting the option to the chart.
	myChart.setOption(option);
})
.catch(error => console.error('Error fetching the data:', error));

// Ensure the chart resizes correctly when the window size changes.
window.addEventListener('resize', myChart.resize);
