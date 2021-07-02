import { VNode } from "./types";
import { initVNode } from "./vdom";

function render(vNode: VNode, rootDOM: HTMLElement) {
  rootDOM.appendChild(initVNode(vNode))
}

export default {
  render,
};
