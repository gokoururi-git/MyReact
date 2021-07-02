export const TextElementType = Symbol("TextElementType");

export type HTMLElementType =
  | keyof HTMLElementTagNameMap
  | typeof TextElementType;

/**
 * 1: HTML元素
 * 2: 函数组件
 * 3: class组件
 */
export const enum VType {
  VirtualHTMLElement = 1,
  FunctionComponent = 2,
  ClassComponent = 3,
}

interface BaseProps {
  children?: (VNode | string)[];
  className?: string;
  htmlFor?: string;
  key?: string;
};

export interface Props extends BaseProps{
  [prop: string]: any
}

export interface VNode {
  type?: HTMLElementType;
  value: ReactElementType | string;
  props: Props;
  vType: VType;
  key: string;
}

export type FunctionComponent = (props?: Props) => VNode;

export type ClassComponentInstance = { render: () => VNode | null };

export type ClassComponentConstructor = new (
  props: Props
) => ClassComponentInstance;

export class Component {
  [x: string]: Props | string;
  static isClassComponent = true;
  constructor(props?: Props) {
    this.props = props;
  }
  render():VNode | null{
    return null;
  };
}

export type ReactElementType =
  | HTMLElementType
  | ClassComponentConstructor
  | FunctionComponent;
