import React from 'react';
import './style.scss';

interface Props {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

function Button({ children, onClick, ...props }: Props): JSX.Element {
  return (
    <button
      className="button"
      data-testid="test-button"
      onClick={(e) => onClick(e)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
