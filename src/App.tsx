// App.tsx - json-render 简单演示：服务器购买场景
import { useState, useCallback } from 'react';
import {
  DataProvider,
  ActionProvider,
  VisibilityProvider,
  Renderer,
} from '@json-render/react';
import type { UITree } from '@json-render/core';
import { registry } from './components/registry';
import './App.css';

// 模拟 AI 生成的 UI 树 - 服务器配置表单
const serverFormTree: UITree = {
  root: 'form-card',
  elements: {
    'form-card': {
      key: 'form-card',
      type: 'Card',
      props: {
        title: '�️ 服务器配置',
        description: '请选择您需要的服务器规格',
      },
      children: ['cpu-select', 'memory-select', 'storage-select', 'confirm-btn'],
      parentKey: null,
    },
    'cpu-select': {
      key: 'cpu-select',
      type: 'Select',
      props: {
        label: 'CPU 规格',
        options: ['2核', '4核', '8核', '16核'],
        valuePath: '/server/cpu',
      },
      parentKey: 'form-card',
    },
    'memory-select': {
      key: 'memory-select',
      type: 'Select',
      props: {
        label: '内存大小',
        options: ['4GB', '8GB', '16GB', '32GB'],
        valuePath: '/server/memory',
      },
      parentKey: 'form-card',
    },
    'storage-select': {
      key: 'storage-select',
      type: 'Select',
      props: {
        label: '存储空间',
        options: ['100GB SSD', '200GB SSD', '500GB SSD', '1TB SSD'],
        valuePath: '/server/storage',
      },
      parentKey: 'form-card',
    },
    'confirm-btn': {
      key: 'confirm-btn',
      type: 'Button',
      props: {
        label: '确认配置',
        action: 'confirm_order',
        variant: 'primary',
      },
      parentKey: 'form-card',
    },
  },
};

function App() {
  const [userInput, setUserInput] = useState('');
  const [aiStatus, setAiStatus] = useState<'idle' | 'thinking' | 'done'>('idle');
  const [currentTree, setCurrentTree] = useState<UITree | null>(null);
  const [serverConfig, setServerConfig] = useState({
    cpu: '4核',
    memory: '8GB',
    storage: '200GB SSD',
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // 模拟 AI 处理
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // 检测用户是否想购买服务器
    if (userInput.includes('服务器') || userInput.includes('server')) {
      setAiStatus('thinking');
      setOrderConfirmed(false);

      // 模拟 AI 思考时间，然后生成 UI
      setTimeout(() => {
        setCurrentTree(serverFormTree);
        setAiStatus('done');
      }, 1500);
    }
  }, [userInput]);

  // 动作处理器
  const actionHandlers = {
    confirm_order: () => {
      setOrderConfirmed(true);
      console.log('订单已确认:', serverConfig);
    },
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 json-render Demo</h1>
        <p className="subtitle">AI 生成 UI 演示 - 服务器购买场景</p>
      </header>

      {/* 用户输入区 */}
      <section className="input-section">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="请输入您的需求，例如：我想买一台服务器"
            className="user-input"
          />
          <button type="submit" className="submit-btn">
            发送
          </button>
        </form>
      </section>

      {/* AI 响应区 */}
      <section className="response-section">
        <h2>AI 响应</h2>

        {aiStatus === 'idle' && (
          <div className="ai-message empty">
            💬 请在上方输入您的需求...
          </div>
        )}

        {aiStatus === 'thinking' && (
          <div className="ai-message thinking">
            <span className="dot-loading">🤖 AI 正在理解您的需求</span>
          </div>
        )}

        {aiStatus === 'done' && currentTree && (
          <div className="ai-message">
            <p className="ai-text">好的，我来帮您配置一台服务器。请选择您需要的规格：</p>

            {/* json-render 渲染区域 */}
            <div className="render-area">
              <DataProvider
                initialData={{
                  server: serverConfig
                }}
                onDataChange={(path, value) => {
                  // 更新配置
                  const key = path.split('/').pop() as string;
                  setServerConfig(prev => ({ ...prev, [key]: value }));
                }}
              >
                <VisibilityProvider>
                  <ActionProvider handlers={actionHandlers}>
                    <Renderer tree={currentTree} registry={registry} />
                  </ActionProvider>
                </VisibilityProvider>
              </DataProvider>
            </div>

            {/* 订单确认信息 */}
            {orderConfirmed && (
              <div className="order-confirmed">
                ✅ 订单已确认！您选择的配置：
                <ul>
                  <li>CPU: {serverConfig.cpu}</li>
                  <li>内存: {serverConfig.memory}</li>
                  <li>存储: {serverConfig.storage}</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </section>

      {/* JSON 预览 */}
      {currentTree && (
        <section className="json-section">
          <h2>生成的 UI 树 (JSON)</h2>
          <pre>{JSON.stringify(currentTree, null, 2)}</pre>
        </section>
      )}
    </div>
  );
}

export default App;
