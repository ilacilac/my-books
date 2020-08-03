import React from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import PersonContext from '../context/PersonContext';

// state = {
//   connt: 0,
// }

// this.setState({count: this.state.count + 1});

export default function Counter() {
  const [state, setState] = React.useState({ count: 0 });
  const width = useWindowWidth(); // state변경으로 다시 랜더
  // // componentDidMount
  // React.useEffect(() => {
  //   console.log('Counter componentDidMount');
  //   return () => {
  //     console.log('Counter componentWillUnmount');
  //   };
  // }, []);

  // // [state]가 바뀌면 바뀐 return 직후에 돌린다.
  // React.useEffect(() => {
  //   console.log('Counter state가 변경된 후 실행');
  //   return () => {
  //     // cleanup 과정
  //     console.log('Counter state가 변경되기 전 실행');
  //   };
  // }, [state]);

  // // props가 있을 경우
  // React.useEffect(() => {
  //   console.log('Counter state가 변경된 후 실행');
  //   return () => {
  //     // cleanup 과정
  //     console.log('Counter state가 변경되기 전 실행');
  //   };
  // }, [name]);

  // // 둘다 있을경우
  // React.useEffect(() => {
  //   console.log('Counter state가 변경된 후 실행');
  //   return () => {
  //     // cleanup 과정
  //     console.log('Counter state가 변경되기 전 실행');
  //   };
  // }, [state, name]);

  return (
    <div>
      <h1>
        {state.count} {width}
      </h1>
      <button onClick={click}>+</button>
      <PersonContext.Consumer>
        {(value) => <p>{JSON.stringify(value)}</p>}
      </PersonContext.Consumer>
    </div>
  );
  function click() {
    console.log('+');
    setState({ count: state.count + 1 });
  }
}
