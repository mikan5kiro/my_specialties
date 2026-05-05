// 首页逻辑
Page({
  data: {
    // 排序相关
    activeSort: 'default',
    sortDropdownOpen: false,
    currentSortText: '按添加顺序排序',
    currentSortIcon: '📋',
    
    // 搜索关键词
    searchKeyword: '',
    
    // 筛选面板状态
    filterPanelOpen: false,
    
    // 筛选展开状态
    filterExpand: {
      ingredient: true,
      type: true,
      scene: true
    },
    
    // 三个维度的标签数据
    ingredients: [
      { value: 'chicken', label: '鸡肉' },
      { value: 'beef', label: '牛肉' },
      { value: 'pork', label: '猪肉' },
      { value: 'fish', label: '鱼类' },
      { value: 'shrimp', label: '虾' },
      { value: 'egg', label: '鸡蛋' },
      { value: 'tofu', label: '豆腐' },
      { value: 'mushroom', label: '菌菇' },
      { value: 'tomato', label: '番茄' },
      { value: 'potato', label: '土豆' },
      { value: 'green', label: '绿叶菜' },
    ],
    types: [
      { value: 'meat', label: '荤菜' },
      { value: 'vegetable', label: '素菜' },
      { value: 'soup', label: '汤羹' },
      { value: 'staple', label: '主食' },
      { value: 'cold', label: '凉菜' },
      { value: 'drink', label: '饮品' },
      { value: 'bakery', label: '烘焙' },
      { value: 'hotpot', label: '火锅' },
      { value: 'bbq', label: '烧烤' },
    ],
    scenes: [
      { value: 'diet', label: '减脂餐' },
      { value: 'quick', label: '快手菜' },
      { value: 'rice', label: '下饭菜' },
      { value: 'guest', label: '宴客菜' },
      { value: 'breakfast', label: '早餐' },
      { value: 'supper', label: '夜宵' },
      { value: 'lunchbox', label: '便当' },
      { value: 'snack', label: '解馋零食' },
    ],
    
    // 选中的标签
    selectedIngredients: ['all'],
    selectedTypes: ['all'],
    selectedScenes: ['all'],
    
    // 原始菜谱数据（模拟数据）
    recipes: [
      {
        id: '1',
        name: '自制披萨',
        coverImage: '',
        ingredientTag: 'pork',
        typeTag: 'bakery',
        typeLabel: '烘焙',
        sceneTag: 'guest',
        rating: 4.9,
        cookCount: 15,
        cookTime: 1620000000000,
        favorite: true,
        recent: false
      },
      {
        id: '2',
        name: '奶油蘑菇意面',
        coverImage: '',
        ingredientTag: 'mushroom',
        typeTag: 'staple',
        typeLabel: '主食',
        sceneTag: 'quick',
        rating: 4.8,
        cookCount: 12,
        cookTime: 1619000000000,
        favorite: true,
        recent: false
      },
      {
        id: '3',
        name: '泰式绿咖喱',
        coverImage: '',
        ingredientTag: 'chicken',
        typeTag: 'meat',
        typeLabel: '荤菜',
        sceneTag: 'rice',
        rating: 4.7,
        cookCount: 6,
        cookTime: 1618000000000,
        favorite: true,
        recent: true
      },
      {
        id: '4',
        name: '草莓蛋糕',
        coverImage: '',
        ingredientTag: 'egg',
        typeTag: 'bakery',
        typeLabel: '烘焙',
        sceneTag: 'snack',
        rating: 4.6,
        cookCount: 4,
        cookTime: 1617000000000,
        favorite: false,
        recent: true
      },
      {
        id: '5',
        name: '地中海沙拉碗',
        coverImage: '',
        ingredientTag: 'green',
        typeTag: 'vegetable',
        typeLabel: '素菜',
        sceneTag: 'diet',
        rating: 4.5,
        cookCount: 8,
        cookTime: 1616000000000,
        favorite: false,
        recent: true
      },
      {
        id: '6',
        name: '蔬菜浓汤',
        coverImage: '',
        ingredientTag: 'tomato',
        typeTag: 'soup',
        typeLabel: '汤羹',
        sceneTag: 'lunchbox',
        rating: 4.4,
        cookCount: 10,
        cookTime: 1615000000000,
        favorite: false,
        recent: false
      },
      {
        id: '7',
        name: '香煎三文鱼',
        coverImage: '',
        ingredientTag: 'fish',
        typeTag: 'meat',
        typeLabel: '荤菜',
        sceneTag: 'diet',
        rating: 4.8,
        cookCount: 7,
        cookTime: 1614000000000,
        favorite: true,
        recent: false
      },
      {
        id: '8',
        name: '麻婆豆腐',
        coverImage: '',
        ingredientTag: 'tofu',
        typeTag: 'vegetable',
        typeLabel: '素菜',
        sceneTag: 'rice',
        rating: 4.7,
        cookCount: 11,
        cookTime: 1613000000000,
        favorite: true,
        recent: false
      },
      {
        id: '9',
        name: '蒜蓉虾',
        coverImage: '',
        ingredientTag: 'shrimp',
        typeTag: 'meat',
        typeLabel: '荤菜',
        sceneTag: 'quick',
        rating: 4.9,
        cookCount: 9,
        cookTime: 1612000000000,
        favorite: true,
        recent: true
      }
    ],
    // 筛选后的菜谱
    filteredRecipes: []
  },

  onLoad() {
    this.filterRecipes()
    console.log('selectedIngredients:', this.data.selectedIngredients)
  },

  // 切换排序下拉菜单
  toggleSortDropdown() {
    this.setData({
      sortDropdownOpen: !this.data.sortDropdownOpen
    })
  },

  // 选择排序方式
  onSortSelect(e) {
    const sort = e.currentTarget.dataset.sort
    const sortTextMap = {
      default: '按添加顺序排序',
      favorite: '按喜爱程度排序',
      frequent: '按制作次数排序',
      recent: '最近想做'
    }
    const sortIconMap = {
      default: '📋',
      favorite: '⭐',
      frequent: '💕',
      recent: '📝'
    }
    this.setData({
      activeSort: sort,
      currentSortText: sortTextMap[sort],
      currentSortIcon: sortIconMap[sort],
      sortDropdownOpen: false
    })
    this.filterRecipes()
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
    this.filterRecipes()
  },

  // 清空搜索
  clearSearch() {
    this.setData({ searchKeyword: '' })
    this.filterRecipes()
  },

  // 切换筛选面板显示/隐藏
  toggleFilterPanel() {
    this.setData({
      filterPanelOpen: !this.data.filterPanelOpen
    })
  },

  // 切换筛选组展开状态
  toggleFilterGroup(e) {
    const group = e.currentTarget.dataset.group
    const key = `filterExpand.${group}`
    this.setData({
      [key]: !this.data.filterExpand[group]
    })
  },

  // 切换食材标签
  toggleIngredient(e) {
    const value = e.currentTarget.dataset.value
    this.toggleTag('selectedIngredients', value)
  },

  // 切换类型标签
  toggleType(e) {
    const value = e.currentTarget.dataset.value
    this.toggleTag('selectedTypes', value)
  },

  // 切换场景标签
  toggleScene(e) {
    const value = e.currentTarget.dataset.value
    this.toggleTag('selectedScenes', value)
  },

  // 通用标签切换逻辑
  // 通用标签切换逻辑
toggleTag(field, value) {
  console.log('=== 点击标签 ===')
  console.log('维度:', field)
  console.log('值:', value)
  console.log('点击前选中:', this.data[field])
  
  const current = [...this.data[field]]
  if (value === 'all') {
    this.setData({ [field]: ['all'] })
  } else {
    const index = current.indexOf(value)
    if (index > -1) {
      current.splice(index, 1)
    } else {
      // 如果选中了all，先移除all
      const allIndex = current.indexOf('all')
      if (allIndex > -1) {
        current.splice(allIndex, 1)
      }
      current.push(value)
    }
    // 如果没有选中任何标签，默认选中all
    if (current.length === 0) {
      current.push('all')
    }
    this.setData({ [field]: current })
  }
  
  console.log('点击后选中:', this.data[field])
  this.filterRecipes()
},

  // 筛选菜谱逻辑
  filterRecipes() {
    const { recipes, activeSort, searchKeyword, selectedIngredients, selectedTypes, selectedScenes } = this.data
    let result = [...recipes]

    // 1. 按排序方式筛选和排序
    switch (activeSort) {
      case 'default':
        // 按添加顺序，保持原始顺序
        break
      case 'favorite':
        result = result.filter(r => r.rating > 0)
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'frequent':
        result = result.filter(r => r.cookCount > 0)
        result.sort((a, b) => b.cookCount - a.cookCount)
        break
      case 'recent':
        result = result.filter(r => r.recent)
        result.sort((a, b) => b.cookTime - a.cookTime)
        break
    }

    // 2. 按食材筛选
    if (!selectedIngredients.includes('all')) {
      result = result.filter(r => selectedIngredients.includes(r.ingredientTag))
    }

    // 3. 按类型筛选
    if (!selectedTypes.includes('all')) {
      result = result.filter(r => selectedTypes.includes(r.typeTag))
    }

    // 4. 按场景筛选
    if (!selectedScenes.includes('all')) {
      result = result.filter(r => selectedScenes.includes(r.sceneTag))
    }

    // 5. 按关键词搜索（匹配菜名和筛选标签）
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase()
      result = result.filter(r => {
        // 匹配菜名
        if (r.name.toLowerCase().includes(keyword)) {
          return true
        }
        // 匹配食材标签中文
        const ingredient = this.data.ingredients.find(i => i.value === r.ingredientTag)
        if (ingredient && ingredient.label.toLowerCase().includes(keyword)) {
          return true
        }
        // 匹配类型标签中文
        const type = this.data.types.find(t => t.value === r.typeTag)
        if (type && type.label.toLowerCase().includes(keyword)) {
          return true
        }
        // 匹配场景标签中文
        const scene = this.data.scenes.find(s => s.value === r.sceneTag)
        if (scene && scene.label.toLowerCase().includes(keyword)) {
          return true
        }
        return false
      })
    }

    this.setData({ filteredRecipes: result })
  },

  // 获取类型标签的中文名称
  getTypeLabel(typeValue) {
    const types = this.data.types
    const type = types.find(t => t.value === typeValue)
    return type ? type.label : typeValue
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
      url: '/pages/edit/edit'
    })
  }
})
