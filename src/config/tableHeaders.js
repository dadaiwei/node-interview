const tableHeaders = {
	interview: [
		{
			name: '姓名',
			field: 'name'
		},
		{
			name: '部门',
			field: 'department'
		},
		{
			name: '岗位',
			field: 'station'
		},
		{
			name: '联系方式',
			field: 'phone'
		},
		{
			name: '学校',
			field: 'school'
		},
		{
			name: '电话面试',
			field: 'telInterResult'
		},
		{
			name: '现场面试',
			field: 'onSiteInterResult',
			children: [
				{
					name:'一面',
					field: 'oneSideResult'
				},
				{
					name:'二面',
					field: 'secondSideResult'
				}
			]
		},
		{
			name: '进度',
			field: 'progress'
		},
		{
			name: '接收offer',
			field: 'receiveOffer'
		},
		{
			name: '报到时间',
			field: 'reportTime'
		},
		{
			name: '备注',
			field: 'remark'
		}
	],
	interviewIng: [
		{
			name: '姓名',
			field: 'name'
		},
		{
			name: '部门',
			field: 'department'
		},
		{
			name: '岗位',
			field: 'station'
		},
		{
			name: '联系方式',
			field: 'phone'
		},
		{
			name: '学校',
			field: 'school'
		},
		{
			name: '电话面试',
			field: 'telInterResult'
		},
		{
			name: '现场面试',
			field: 'onSiteInterResult',
			children: [
				{
					name:'一面',
					field: 'oneSideResult'
				},
				{
					name:'二面',
					field: 'secondSideResult'
				}
			]
		},
		{
			name: '接收offer',
			field: 'receiveOffer'
		},
		{
			name: '报到时间',
			field: 'reportTime'
		},
		{
			name: '备注',
			field: 'remark'
		}
	],
	interviewEnd: [
		{
			name: '姓名',
			field: 'name'
		},
		{
			name: '部门',
			field: 'department'
		},
		{
			name: '岗位',
			field: 'station'
		},
		{
			name: '联系方式',
			field: 'phone'
		},
		{
			name: '学校',
			field: 'school'
		},
		{
			name: '电话面试',
			field: 'telInterResult'
		},
		{
			name: '现场面试',
			field: 'onSiteInterResult',
			children: [
				{
					name:'一面',
					field: 'oneSideResult'
				},
				{
					name:'二面',
					field: 'secondSideResult'
				}
			]
		},
		{
			name: '接收offer',
			field: 'receiveOffer'
		},
		{
			name: '报到时间',
			field: 'reportTime'
		},
		{
			name: '备注',
			field: 'remark'
		}
	]
};

export default tableHeaders;
