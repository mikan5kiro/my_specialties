// 编辑/添加菜谱页
Page({
  data: {
    // 编辑模式：'add' 新增, 'edit' 编辑
    editMode: 'add',
    // 输入模式：'manual' 手动, 'paste' 粘贴
    mode: 'manual',
    // 原始ID（编辑模式用）
    recipeId: null,
    // 菜谱数据
    recipe: {
      name: '',
      coverImage: '',
      ingredientLabel: '',
      typeLabel: '',
      sceneLabel: '',
      ingredients: [],
      steps: [],
      tips: '',
      rating: 0,
      cookCount: 0,
      duration: '',
      servings: ''
    },
    // 粘贴文本
    pasteText: '',
    // 食材和步骤的文本形式（用于textarea显示）
    ingredientsText: '',
    stepsText: '',
    // 标签选项
    ingredientTags: ['鸡肉', '牛肉', '猪肉', '羊肉', '虾', '鱼', '蟹', '贝类', '鸡蛋', '豆腐', '菌菇', '土豆', '番茄', '绿叶菜', '根茎类'],
    typeTags: ['荤菜', '素菜', '汤羹', '主食', '凉菜', '饮品', '烘焙', '火锅', '烧烤'],
    sceneTags: ['减脂餐', '快手菜', '下饭菜', '宴客菜', '早餐', '夜宵', '便当', '解馋零食']
  },

  onLoad(options) {
    // 如果有ID传入，则是编辑模式
    if (options.id) {
      this.setData({ 
        editMode: 'edit',
        recipeId: options.id 
      })
      wx.setNavigationBarTitle({ title: '编辑菜谱' })
      this.loadRecipeData(options.id)
    } else {
      // 新增模式，设置默认值
      this.setData({
        editMode: 'add',
        recipe: {
          name: '',
          coverImage: '',
          ingredientLabel: '',
          typeLabel: '',
          sceneLabel: '',
          ingredients: [],
          steps: [],
          tips: '',
          rating: 0,
          cookCount: 0,
          duration: '',
          servings: ''
        }
      })
    }
  },

  // 加载菜谱数据（模拟）
  loadRecipeData(id) {
    // 这里应该从数据库加载，先用模拟数据
    const mockRecipe = {
      id: id,
      name: '经典自制披萨',
      coverImage: '/images/default-goods-image.png',
      ingredientLabel: '猪肉',
      typeLabel: '烘焙',
      sceneLabel: '宴客菜',
      ingredients: [
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
      steps: [
        '将面粉、酵母和盐混合。加入温水和橄榄油，揉面10分钟至光滑。',
        '将面团放在温暖处发酵1小时，直到体积翻倍。',
        '烤箱预热至250°C，放入披萨石一起预热。',
        '将面团分成两份，擀成圆形，铺上番茄酱、奶酪和配料。',
        '烘烤12-15分钟，直到饼皮金黄、奶酪起泡。',
        '撒上新鲜罗勒叶，趁热享用。'
      ],
      tips: '想要更酥脆的饼皮，可以在烘烤前在边缘刷一层橄榄油。奶酪建议现刨现用，口感更佳！',
      rating: 4.9,
      cookCount: 15,
      duration: '90分钟',
      servings: '4人份'
    }

    this.setData({
      recipe: mockRecipe,
      ingredientsText: mockRecipe.ingredients.join('\n'),
      stepsText: mockRecipe.steps.join('\n')
    })
  },

  // 切换输入模式
  switchMode(e) {
    const mode = e.currentTarget.dataset.mode
    this.setData({ mode })
  },

  // 粘贴输入
  onPasteInput(e) {
    this.setData({ pasteText: e.detail.value })
  },

  // 智能解析
  parseRecipe() {
    const { pasteText } = this.data
    if (!pasteText.trim()) {
      wx.showToast({ title: '请先粘贴菜谱内容', icon: 'none' })
      return
    }

    wx.showLoading({ title: '解析中...' })

    // 模拟解析逻辑（实际应该调用云函数）
    setTimeout(() => {
      const result = this.mockParse(pasteText)
      
      this.setData({
        recipe: {
          ...this.data.recipe,
          name: result.name,
          ingredients: result.ingredients,
          steps: result.steps,
          tips: result.tips
        },
        ingredientsText: result.ingredients.join('\n'),
        stepsText: result.steps.join('\n'),
        mode: 'manual' // 解析后切换到手动模式便于修改
      })

      wx.hideLoading()
      wx.showToast({ title: '解析完成', icon: 'success' })
    }, 1000)
  },

  // 模拟解析函数
  mockParse(text) {
    const lines = text.split('\n').filter(line => line.trim())
    
    // 提取菜名（第一行或【】《》内的内容）
    let name = lines[0] || ''
    name = name.replace(/[🍗🍖🥩🍤🐟🍕🍜🍲🥘🍳🥗🍰🎂🍮]/g, '').trim()
    
    // 提取食材（包含数量单位的行）
    const ingredients = []
    const steps = []
    let tips = ''
    
    lines.forEach(line => {
      const trimmed = line.trim()
      // 跳过emoji和话题标签
      if (/^#/.test(trimmed) || /^@/.test(trimmed)) return
      
      // 提取食材（包含数字和单位的行）
      if (/\d+\s*[g克ml毫升勺杯个根片块]/.test(trimmed)) {
        ingredients.push(trimmed.replace(/^[0-9一二三四五六七八九十]+[️⃣.\s]*/, ''))
      }
      // 提取步骤（包含烹饪动词或以数字开头的行）
      else if (/[切炒煮炖煎蒸炸拌烤腌泡]/.test(trimmed) || /^[0-9一二三四五六七八九十]/.test(trimmed)) {
        steps.push(trimmed.replace(/^[0-9一二三四五六七八九十]+[️⃣.\s]*/, ''))
      }
      // 提取小贴士
      else if (/小贴士|注意|PS|窍门/.test(trimmed)) {
        tips = trimmed.replace(/小贴士[：:]|注意[：:]|PS[：:]/, '').trim()
      }
    })

    return { name, ingredients, steps, tips }
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'recipe.coverImage': res.tempFilePaths[0]
        })
      }
    })
  },

  // 菜名输入
  onNameInput(e) {
    this.setData({ 'recipe.name': e.detail.value })
  },

  // 选择食材标签
  selectIngredientTag(e) {
    const tag = e.currentTarget.dataset.tag
    this.setData({ 
      'recipe.ingredientLabel': this.data.recipe.ingredientLabel === tag ? '' : tag 
    })
  },

  // 选择类型标签
  selectTypeTag(e) {
    const tag = e.currentTarget.dataset.tag
    this.setData({ 
      'recipe.typeLabel': this.data.recipe.typeLabel === tag ? '' : tag 
    })
  },

  // 选择场景标签
  selectSceneTag(e) {
    const tag = e.currentTarget.dataset.tag
    this.setData({ 
      'recipe.sceneLabel': this.data.recipe.sceneLabel === tag ? '' : tag 
    })
  },

  // 食材输入
  onIngredientsInput(e) {
    const text = e.detail.value
    const ingredients = text.split('\n').filter(line => line.trim())
    this.setData({
      ingredientsText: text,
      'recipe.ingredients': ingredients
    })
  },

  // 步骤输入
  onStepsInput(e) {
    const text = e.detail.value
    const steps = text.split('\n').filter(line => line.trim())
    this.setData({
      stepsText: text,
      'recipe.steps': steps
    })
  },

  // 小贴士输入
  onTipsInput(e) {
    this.setData({ 'recipe.tips': e.detail.value })
  },

  // 选择评分
  selectRating(e) {
    const score = parseInt(e.currentTarget.dataset.score)
    this.setData({ 'recipe.rating': score })
  },

  // 次数输入
  onCountInput(e) {
    this.setData({ 'recipe.cookCount': parseInt(e.detail.value) || 0 })
  },

  // 时长输入
  onDurationInput(e) {
    this.setData({ 'recipe.duration': e.detail.value })
  },

  // 份量输入
  onServingsInput(e) {
    this.setData({ 'recipe.servings': e.detail.value })
  },

  // 保存
  onSave() {
    const { recipe, editMode } = this.data

    // 验证必填项
    if (!recipe.name.trim()) {
      wx.showToast({ title: '请输入菜名', icon: 'none' })
      return
    }

    wx.showLoading({ title: '保存中...' })

    // 模拟保存
    setTimeout(() => {
      wx.hideLoading()
      
      const message = editMode === 'edit' ? '修改成功' : '添加成功'
      wx.showToast({ 
        title: message, 
        icon: 'success',
        complete: () => {
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      })
    }, 1000)
  },

  // 取消
  onCancel() {
    const { editMode } = this.data
    const content = editMode === 'edit' ? '确定要放弃修改吗？' : '确定要放弃添加吗？'
    wx.showModal({
      title: '确认放弃',
      content: content,
      confirmColor: '#999',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack()
        }
      }
    })
  }
})
