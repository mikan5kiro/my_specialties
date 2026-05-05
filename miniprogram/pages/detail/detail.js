// 详情页逻辑
Page({
  data: {
    recipe: {},
    // 默认示例数据（当没有传入数据时显示）
    defaultIngredients: [
      '500g 高筋面粉',
      '325ml 温水',
      '2茶匙 即发酵母',
      '2茶匙 盐',
      '1汤匙 橄榄油',
      '1杯 番茄酱',
      '300g 马苏里拉奶酪',
      '新鲜罗勒叶',
      '自选配料（火腿、蘑菇、青椒等）'
    ],
    defaultSteps: [
      '将面粉、酵母和盐混合。加入温水和橄榄油，揉面10分钟至光滑。',
      '将面团放在温暖处发酵1小时，直到体积翻倍。',
      '烤箱预热至250°C，放入披萨石一起预热。',
      '将面团分成两份，擀成圆形，铺上番茄酱、奶酪和配料。',
      '烘烤12-15分钟，直到饼皮金黄、奶酪起泡。',
      '撒上新鲜罗勒叶，趁热享用。'
    ],
    defaultTips: '想要更酥脆的饼皮，可以在烘烤前在边缘刷一层橄榄油。奶酪建议现刨现用，口感更佳！'
  },

  onLoad(options) {
    // 获取传入的菜谱ID
    const id = options.id
    if (id) {
      this.loadRecipeDetail(id)
    } else {
      // 没有ID时显示示例数据
      this.setData({
        recipe: {
          name: '经典自制披萨',
          typeLabel: '烘焙',
          rating: 4.9,
          cookCount: 15,
          duration: '90分钟',
          servings: '4人份',
          coverImage: '/images/default-goods-image.png'
        }
      })
    }
  },

  // 加载菜谱详情（模拟数据）
  loadRecipeDetail(id) {
    // 这里可以从本地存储或服务器获取数据
    // 暂时使用模拟数据
    const mockRecipes = {
      '1': {
        name: '自制披萨',
        typeLabel: '烘焙',
        rating: 4.9,
        cookCount: 15,
        duration: '90分钟',
        servings: '4人份',
        coverImage: '/images/default-goods-image.png',
        ingredients: [
          '500g 高筋面粉',
          '325ml 温水',
          '2茶匙 即发酵母',
          '2茶匙 盐',
          '1汤匙 橄榄油',
          '1杯 番茄酱',
          '300g 马苏里拉奶酪',
          '新鲜罗勒叶',
          '自选配料'
        ],
        steps: [
          '将面粉、酵母和盐混合。加入温水和橄榄油，揉面10分钟至光滑。',
          '将面团放在温暖处发酵1小时，直到体积翻倍。',
          '烤箱预热至250°C，放入披萨石一起预热。',
          '将面团分成两份，擀成圆形，铺上番茄酱、奶酪和配料。',
          '烘烤12-15分钟，直到饼皮金黄、奶酪起泡。',
          '撒上新鲜罗勒叶，趁热享用。'
        ],
        tips: '想要更酥脆的饼皮，可以在烘烤前在边缘刷一层橄榄油。'
      },
      '2': {
        name: '奶油蘑菇意面',
        typeLabel: '主食',
        rating: 4.8,
        cookCount: 12,
        duration: '30分钟',
        servings: '2人份',
        coverImage: '/images/default-goods-image.png',
        ingredients: [
          '200g 意大利面',
          '300g 混合蘑菇',
          '200ml 淡奶油',
          '50g 帕尔马干酪',
          '2瓣 大蒜',
          '1个 洋葱',
          '适量 橄榄油',
          '适量 盐和黑胡椒'
        ],
        steps: [
          '烧一锅开水，加盐，放入意面煮8-10分钟。',
          '蘑菇切片，洋葱切丁，大蒜切末。',
          '平底锅热油，爆香洋葱和大蒜。',
          '加入蘑菇翻炒至出水变软。',
          '倒入淡奶油，小火煮至浓稠。',
          '加入煮好的意面和帕尔马干酪，搅拌均匀即可。'
        ],
        tips: '煮意面的水要像海水一样咸，这样面条才有味道。'
      }
    }

    const recipe = mockRecipes[id] || mockRecipes['1']
    this.setData({ recipe })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 切换"最近想做"状态
  onToggleWant() {
    const recipe = this.data.recipe
    recipe.recent = !recipe.recent
    this.setData({ recipe })
    wx.showToast({
      title: recipe.recent ? '已标记为最近想做' : '已取消标记',
      icon: 'none'
    })
  },

  // 编辑菜谱
  onEdit() {
    wx.showToast({
      title: '编辑功能开发中',
      icon: 'none'
    })
  },

  // 删除菜谱
  onDelete() {
    wx.showModal({
      title: '确认删除',
      content: `确定要删除"${this.data.recipe.name}"吗？`,
      confirmColor: '#E74C3C',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '已删除',
            icon: 'success'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      }
    })
  }
})
