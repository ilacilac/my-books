import React from 'react';
import { Redirect } from 'react-router-dom';

//  이 hoc를 사용한 컴포넌트는 토큰이 없으면 리다이렉트

export default function withAuth(Component) {
  const displayName = `withAuth(${Component.displayName})`;
  const C = (props) => {
    const token = localStorage.getItem('token');
    if (token === null) {
      return <Redirect to="/signin" />;
    }
    return <Component {...props} token={token} />;
    // if (token !== null && !hasToken) {
    //   return <Redirect to="/" />;
    // }
  };
  C.displayName = displayName;
  return C;
}
