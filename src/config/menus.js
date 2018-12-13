const menus = {
	user: [{
			title: '面试管理',
			target: 'dashboard',
			icon: 'iconfont bigicon_i icon-zonglan2',
			view: 'dashboard',
			index: '1',
			children: [{
					title: '面试中',
					target: 'interviewIng',
					icon: 'iconfont bigicon_i icon-shouye',
					view: 'interviewIng',
					index: '1-1'
				},
				{
					title: '面试结束',
					target: 'interviewEnd',
					icon: 'iconfont bigicon_i icon-shijian',
					view: 'interviewEnd',
					index: '1-2'
				}
			]
		},
		{
			title: '部门人才库',
			target: 'interview',
			icon: 'iconfont bigicon_i icon-lianxiren',
			view: 'interview',
			index: '2'
		}
	],
	admin: [{
		title: '部门人才库',
		target: 'interview',
		icon: 'iconfont bigicon_i icon-lianxiren',
		view: 'interview',
		index: '2'
	}]
}

export default menus;
