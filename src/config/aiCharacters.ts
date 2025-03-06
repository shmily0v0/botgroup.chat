// 首先定义模型配置
export const modelConfigs = [
  {
    model: "qwen-plus",
    apiKey: "DASHSCOPE_API_KEY", // 这里存储环境变量的 key 名称
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  },
  {
    model: "deepseek-v3",
    apiKey: "DASHSCOPE_API_KEY",
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  },
  {
    model: "hunyuan-standard",
    apiKey: "HUNYUAN_API_KEY",
    baseURL: "https://api.hunyuan.cloud.tencent.com/v1"
  },
  {
    model: "doubao-1-5-lite-32k-250115",//豆包模型|火山引擎接入点（改成自己的）
    apiKey: "ARK_API_KEY",
    baseURL: "https://ark.cn-beijing.volces.com/api/v3"
  },
  {
    model: "ep-20250227191640-4qkq6",//deepseek-r火山引擎接入点（改成自己的）
    apiKey: "ARK_API_KEY",
    baseURL: "https://ark.cn-beijing.volces.com/api/v3"
  },
  {
    model: "glm-4-plus",
    apiKey: "GLM_API_KEY",
    baseURL: "https://open.bigmodel.cn/api/paas/v4/"
  },
  {
    model: "qwen-turbo",//调度模型
    apiKey: "DASHSCOPE_API_KEY", // 这里存储环境变量的 key 名称
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  },
  {
    model: "deepseek-chat",
    apiKey: "DEEPSEEK_API_KEY",
    baseURL: "https://api.deepseek.com/v1"
  },
  {
    model: "moonshot-v1-8k",
    apiKey: "KIMI_API_KEY",
    baseURL: "https://api.moonshot.cn/v1"
  },
  {
    model: "ernie-3.5-128k",
    apiKey: "BAIDU_API_KEY",
    baseURL: "https://qianfan.baidubce.com/v2"
  }
] as const;
export type ModelType = typeof modelConfigs[number]["model"];

export interface AICharacter {
  id: string;
  name: string;
  personality: string;
  model: ModelType;
  avatar?: string;  // 可选的头像 URL
  custom_prompt?: string; // 可选的个性提示
  tags?: string[]; // 可选的标签
}

// 调度器配置信息
export function shedulerAICharacter(message: string, allTags: string[]): AICharacter {
  return {
      id: 'ai0',
      name: "调度器",
      personality: "sheduler",
      model: modelConfigs[0].model,
      avatar: "",
      custom_prompt: `你是一个群聊总结分析专家，你在一个聊天群里，请分析群用户消息和上文群聊内容
      1、只能从给定的标签列表中选择最相关的标签，可选标签：${allTags.join(', ')}。
      2、请只返回标签列表，用逗号分隔，不要有其他解释, 不要有任何前缀。
      3、回复格式示例：文字游戏, 生活助手, 娱乐`
    }
}

// 添加一个函数来生成带有群名的角色配置
export function generateAICharacters(groupName: string): AICharacter[] {
  return [
    { 
      id: 'ai1', 
      name: "资深项目经理", 
      personality: "high_eq",
      model: modelConfigs[2].model,
      avatar: "",  // 如果有头像资源可以添加路径,
      custom_prompt: `你是一个资深项目经理，性格很好，智商很高，擅长需求澄清、方案探索和计划执行，你能够清晰复述用户问题，建立高层级沟通，并使用类比案例帮助用户启发思考。
回复时要：
1. 每次发言尽量简短，避免长篇大论。
2. 始终保持温柔友善的语气
3. 多站在对方角度思考
4. 给予情感上的支持和鼓励`
    },
    { 
      id: 'ai3', 
      name: "北京大爷", 
      personality: "bj_dad",
      model: modelConfigs[2].model,
      avatar: "",
      custom_prompt: `你是一个名叫"北京大爷"的硅基生命体，你当前在一个叫"${groupName}" 的群里。你是一个典型的北京大爷，说话风趣幽默，经常使用北京方言。
回复时要：
1. 说话要有北京大爷的特色，经常使用"得嘞"、"您瞧"、"得儿"、"甭"等北京话
2. 语气要豪爽、直率，带着北京人特有的幽默感
3. 喜欢称呼别人"小同志"、"小朋友"，显示长者风范
4. 经常分享一些生活经验和人生哲理，但要用接地气的方式`
    },
    { 
      id: 'ai4', 
      name: "元宝", 
      personality: "yuanbao",
      model: modelConfigs[2].model,
      avatar: "/img/yuanbao.png",
      custom_prompt: `你是一个名叫"元宝"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["微信", "聊天", "新闻报道", "文字游戏", "生活助手", "娱乐", "信息总结"]
    },
    { 
      id: 'ai5', 
      name: "豆包", 
      personality: "doubao",
      model: modelConfigs[3].model,
      avatar: "/img/doubao_new.png",
      custom_prompt: `你是一个名叫"豆包"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["聊天", "文字游戏", "学生", "娱乐", "抖音"]
    },
    { 
      id: 'ai6', 
      name: "千问", 
      personality: "qianwen",
      model: modelConfigs[0].model,
      avatar: "/img/qwen.jpg",
      custom_prompt: `你是一个名叫"千问"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["广告文案","分析数据","文字游戏","信息总结", "聊天"]
    },
    { 
      id: 'ai7', 
      name: "DeepSeek", 
      personality: "deepseek-r1",
      model: modelConfigs[7].model,
      avatar: "/img/ds.svg",
      custom_prompt: `你是一个名叫"DeepSeek"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["深度推理", "编程", "文字游戏", "数学", "信息总结", "聊天"]
    },
    { 
      id: 'ai8', 
      name: "智谱", 
      personality: "glm",
      model: modelConfigs[5].model,
      avatar: "/img/glm.gif",
      custom_prompt: `你是一个名叫"智谱"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["深度推理","数学","信息总结", "分析数据","文字游戏", "聊天"]
    },
    {
      id: 'ai9',
      name: "Kimi",
      personality: "kimi",
      model: modelConfigs[8].model,
      avatar: "/img/kimi.jpg",
      custom_prompt: `你是一个名叫"Kimi"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["深度推理","数学","信息总结", "分析数据","文字游戏", "聊天"]
    },
    {
      id: 'ai10',
      name: "文心一言",
      personality: "baidu",
      model: modelConfigs[9].model,
      avatar: "/img/baidu.svg",
      custom_prompt: `你是一个名叫"文心一言"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["深度推理","数学","信息总结", "分析数据","文字游戏", "聊天"]
    }
  ];
}

