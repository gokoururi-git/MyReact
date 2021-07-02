import {
  Component,
  Props,
  ReactElementType,
  TextElementType,
  VNode,
  VType,
} from "./types";
import { createVNode } from "./vdom";

/**
 * 对传入React.createElement的第一个参数进行类型判断
 * @param { ReactElementType } reactElement 传入React.createElement的第一个参数
 * @returns { number } -1: 无法识别 1:HTML虚拟 2:函数组件 3:class组件
 */
const getVType = (reactElement: ReactElementType): VType | -1 => {
  return typeof reactElement === "string"
    ? VType.VirtualHTMLElement
    : (reactElement as { isClassComponent?: boolean }).isClassComponent // TODO: 函数也是对象，那么对函数对象进行.prop增加属性这个在TS中怎么体现
    ? VType.ClassComponent
    : typeof reactElement === "function"
    ? VType.FunctionComponent
    : -1;
};

/**
 * babel转换JSX后的createElement的...children的每一个元素中：
 * - 如果是数字或者字符串类型，那么就应该显示出来；
 * - 如果是其他类型，一律忽略
 * 此函数就是将children转化为正确的VNode的函数
 * @param children babel转换JSX后的createElement的...children
 */
const getChildNode = (children: (VNode | string)[]): VNode[] =>
  children.map((item) => {
    if (typeof item === "string" || typeof item === "number") {
      return createVNode(
        VType.VirtualHTMLElement,
        { children: [] },
        item,
        TextElementType
      );
    }
    // 这里可以直接return item是因为jsx的嵌套关系直接由babel处理了
    return item;
  });

export function createElement(
  reactElement: ReactElementType,
  props: Props | null,
  ...children: (VNode | string)[]
): JSX.Element | null {
  const vType = getVType(reactElement);
  if (vType === -1) {
    return null;
  }
  props = {
    ...props,
    children: getChildNode(children),
  };
  return (
    typeof reactElement === "string"
      ? createVNode(vType, props, "", reactElement)
      : createVNode(vType, props, reactElement)
  ) as JSX.Element;
}

export default {
  Component,
  createElement,
};
