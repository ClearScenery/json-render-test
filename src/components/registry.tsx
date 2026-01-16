// registry.tsx - 组件渲染注册表
import type { ReactNode } from 'react';
import { useDataBinding } from '@json-render/react';
import './registry.css';

// 简化的组件属性类型
interface BaseProps {
    element: {
        key: string;
        type: string;
        props: Record<string, unknown>;
    };
    children?: ReactNode;
    onAction?: (action: { name: string; params?: Record<string, unknown> }) => void;
}

// Card 组件 - 卡片容器
const Card = ({ element, children }: BaseProps) => (
    <div className="jr-card">
        <h3 className="jr-card-title">{String(element.props.title)}</h3>
        {!!element.props.description && (
            <p className="jr-card-desc">{String(element.props.description)}</p>
        )}
        <div className="jr-card-body">{children}</div>
    </div>
);

// Select 组件 - 下拉选择器
const Select = ({ element }: BaseProps) => {
    const valuePath = String(element.props.valuePath || '');
    const [value, setValue] = useDataBinding(valuePath);
    const options = (element.props.options as string[]) || [];

    return (
        <div className="jr-select">
            <label className="jr-select-label">{String(element.props.label)}</label>
            <select
                className="jr-select-input"
                value={String(value || options[0] || '')}
                onChange={(e) => setValue(e.target.value)}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
};

// Button 组件 - 按钮
const Button = ({ element, onAction }: BaseProps) => {
    const variant = String(element.props.variant || 'primary');
    const actionName = String(element.props.action || '');

    return (
        <button
            className={`jr-button jr-button-${variant}`}
            onClick={() => onAction?.({ name: actionName })}
        >
            {String(element.props.label)}
        </button>
    );
};

// Text 组件 - 文本
const Text = ({ element }: BaseProps) => (
    <p className="jr-text">{String(element.props.content)}</p>
);

// 导出组件注册表
export const registry = {
    Card,
    Select,
    Button,
    Text,
};
