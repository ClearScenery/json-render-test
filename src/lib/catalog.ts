// catalog.ts - 定义 AI 可以使用的组件目录
import { createCatalog } from '@json-render/core';
import { z } from 'zod';

export const catalog = createCatalog({
  components: {
    // Card 组件 - 可容纳子元素
    Card: {
      props: z.object({
        title: z.string(),
        description: z.string().nullable(),
      }),
      hasChildren: true,
    },

    // Metric 组件 - 展示指标数据
    Metric: {
      props: z.object({
        label: z.string(),
        valuePath: z.string(), // 绑定到数据源的 JSON Pointer 路径
        format: z.enum(['currency', 'percent', 'number']),
      }),
    },

    // Button 组件 - 触发动作
    Button: {
      props: z.object({
        label: z.string(),
        action: z.string(),
        variant: z.enum(['primary', 'secondary', 'danger']).default('primary'),
      }),
    },

    // Text 组件 - 显示文本
    Text: {
      props: z.object({
        content: z.string(),
        size: z.enum(['sm', 'base', 'lg', 'xl']).default('base'),
      }),
    },

    // Grid 组件 - 网格布局
    Grid: {
      props: z.object({
        columns: z.number().min(1).max(4).default(2),
      }),
      hasChildren: true,
    },

    // Chart 组件 - 显示图表（简化版）
    Chart: {
      props: z.object({
        type: z.enum(['bar', 'line', 'pie']),
        title: z.string(),
        dataPath: z.string(),
      }),
    },
  },

  // 定义可用的动作
  actions: {
    confirm_order: {
      description: '确认订单配置',
      params: z.object({}),
    },
  },
});
