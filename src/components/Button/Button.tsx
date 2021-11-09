import React from 'react';
import classnames from 'classnames';
import './style.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  title?: string;
  isDisabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

function Button({
  className,
  children,
  onClick,
  title,
  isDisabled,
  ...props
}: Props): JSX.Element {
  return (
    <button
      className={`button ${classnames(className)}`}
      data-testid="test-button"
      onClick={(e) => onClick(e)}
      title={title}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
