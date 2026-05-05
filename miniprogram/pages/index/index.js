// 首页逻辑
Page({
  data: {
    // 当前激活的Tab
    activeTab: 'frequent',
    // 当前激活的筛选标签
    activeFilter: 'all',
    // 搜索关键词
    searchKeyword: '',
    // 原始菜谱数据（模拟数据）
    recipes: [
      {
        id: '1',
        name: 'Classic Homemade Pizza',
        coverImage: '',
        tags: ['Pizza', '烘焙'],
        rating: 4.9,
        cookCount: 15,
        cookTime: 1620000000000,
        favorite: true,
        recent: false
      },
      {
        id: '2',
        name: 'Creamy Mushroom Pasta',
        coverImage: '',
        tags: ['Pasta', '主食'],
        rating: 4.8,
        cookCount: 12,
        cookTime: 1619000000000,
        favorite: true,
        recent: false
      },
      {
        id: '3',
        name: 'Thai Green Curry',
        coverImage: '',
        tags: ['Asian', '荤菜'],
        rating: 4.7,
        cookCount: 6,
        cookTime: 1618000000000,
        favorite: true,
        recent: true
      },
      {
        id: '4',
        name: 'Strawberry Shortcake',
        coverImage: '',
        tags: ['Dessert', '烘焙'],
        rating: 4.6,
        cookCount: 4,
        cookTime: 1617000000000,
        favorite: false,
        recent: true
      },
      {
        id: '5',
        name: 'Mediterranean Buddha Bowl',
        coverImage: '',
        tags: ['Salad', '素菜'],
        rating: 4.5,
        cookCount: 8,
        cookTime: 1616000000000,
        favorite: false,
        recent: true
      },
      {
        id: '6',
        name: 'Hearty Vegetable Soup',
        coverImage: '',
        tags: ['Soup', '汤羹'],
        rating: 4.4,
        cookCount: 10,
        cookTime: 1615000000000,
        favorite: false,
        recent: false
      }
    ],
    // 筛选后的菜谱
    filteredRecipes: []
  },

  onLoad() {
    this.filterAndSortRecipes()
  },

  // Tab切换
  onTabTap(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
    this.filterAndSortRecipes()
  },

  // 筛选标签点击
  onFilterTap(e) {
    const filter = e.currentTarget.dataset.filter
    this.setData({ activeFilter: filter })
    this.filterAndSortRecipes()
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
    this.filterAndSortRecipes()
  },

  // 清空搜索
  clearSearch() {
    this.setData({ searchKeyword: '' })
    this.filterAndSortRecipes()
  },

  // 筛选和排序逻辑
  filterAndSortRecipes() {
    const { recipes, activeTab, activeFilter, searchKeyword } = this.data
    let result = [...recipes]

    // 1. 按Tab筛选
    switch (activeTab) {
      case 'frequent':
        // 我常做的：按制作次数降序
        result = result.filter(r => r.cookCount > 0)
        result.sort((a, b) => b.cookCount - a.cookCount)
        break
      case 'favorite':
        // 我爱吃的：按喜爱度降序
        result = result.filter(r => r.rating > 0)
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'recent':
        // 最近想做
        result = result.filter(r => r.recent)
        result.sort((a, b) => b.cookTime - a.cookTime)
        break
    }

    // 2. 按标签筛选
    if (activeFilter !== 'all') {
      const filterMap = {
        'chicken': '鸡肉',
        'beef': '牛肉',
        'pork': '猪肉',
        'seafood': '海鲜',
        'vegetable': '素菜',
        'soup': '汤羹',
        'dessert': '烘焙'
      }
      const filterTag = filterMap[activeFilter]
      if (filterTag) {
        result = result.filter(r => r.tags.includes(filterTag))
      }
    }

    // 3. 按关键词搜索
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase()
      result = result.filter(r =>
        r.name.toLowerCase().includes(keyword) ||
        r.tags.some(tag => tag.toLowerCase().includes(keyword))
      )
    }

    this.setData({ filteredRecipes: result })
  },

  // 跳转到详情页
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  // 跳转到添加页
  goToAdd() {
    wx.navigateTo({
      url: '/pages/add/add'
    })
  }
})
