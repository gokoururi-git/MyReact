import {
  ClassComponentConstructor,
  FunctionComponent,
  HTMLElementType,
  Props,
  ReactElementType,
  TextElementType,
  VNode,
  VType,
} from "./types";

import { v4 as UUIDv4 } from "uuid";

export function createVNode(
  vType: VType,
  props: Props,
  value: ReactElementType | string,
  type?: HTMLElementType
): VNode {
  return {
    vType,
    props,
    type: type ? type : "div",
    value,
    key: props.key ? props.key : UUIDv4(),
  };
}

function createHTMLElementNode(vNode: VNode) {
  const { type, value, props } = vNode;
  if (type === TextElementType) {
    return document.createTextNode(value as string);
  }
  const node = document.createElement(type as keyof HTMLElementTagNameMap);
  const { children, ...rest } = props;
  Object.keys(rest).forEach((prop) => {
    switch (prop) {
      case "className": {
        node.setAttribute("class", props["className"]);
        break;
      }
      case "htmlFor": {
        node.setAttribute("for", props["htmlFor"]);
        break;
      }
      default: {
        node.setAttribute(prop, props[prop]);
      }
    }
  });
  children.forEach((item) => {
    node.appendChild(createHTMLElementNode(item as VNode));
  });
  return node;
}

function createClassNode(vNode: VNode) {
  const { value, props } = vNode;
  const node = new (value as ClassComponentConstructor)(props).render();
  return createHTMLElementNode(node);
}

function createFunctionNode(vNode: VNode) {
  const { value, props } = vNode;
  const node = (value as FunctionComponent)(props);
  return createHTMLElementNode(node);
}

export function initVNode(vNode: VNode) {
  const { vType } = vNode;
  switch (vType) {
    case VType.ClassComponent:
      return createClassNode(vNode);
    case VType.FunctionComponent:
      return createFunctionNode(vNode);
    case VType.VirtualHTMLElement:
      return createHTMLElementNode(vNode);
  }
}
