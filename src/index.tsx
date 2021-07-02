import React from "./MyReact";
import ReactDOM from "./MyReactDOM";
import { Component, Props, VNode } from "./types";
// import ReactDOM from 'react-dom';

interface AppProps {}

interface CompProps extends Props{
  prop: string
}

// class ClassComp extends Component{
//   constructor(props: Props){
//     super(props);
//   }
//   render(){
//     return (<h1>这是class组件的h1 props: {this.props.attr}</h1>) as VNode;
//   }
// }

function Comp(props: CompProps) {
  return <div>hello world {props.prop}</div>;
}

function App(props: AppProps){
  return <div>
    <Comp
      prop="prop1"
      className="cccccccccc"
    />
    <span>hello world {1 + 1}</span>
    {/* <ClassComp/> */}
  </div>
}

ReactDOM.render(<App/> as VNode, document.querySelector('#app'));