import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import styles from './Popup.module.css';

const container = document.createElement('div');
document.body.appendChild(container);

type Props = {
  children: JSX.Element;
};
function Mask(props: Props) {
  const getChildren = () => {
    const { children } = props;
    const ChildComponent = getChildComponent(props);
    return React.cloneElement(ChildComponent, {
      ...children.props,
      'data-id': 'gagaggagag',
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        children.props.onClick && children.props.onClick(e);
      },
    });
  };

  return (
    <div className={styles['mask']} onClick={close}>
      {getChildren()}
    </div>
  );
}

function getChildComponent({ children }: Props) {
  // const ChildComponent =
  switch (typeof children.type) {
    case 'function':
      return children.type(children.props);
    case 'string':
      return children;
  }
}

type openProps = {
  component: JSX.Element;
};
function open({ component }: openProps) {
  return ReactDOM.render(<Mask>{component}</Mask>, container);
}

function close() {
  return ReactDOM.unmountComponentAtNode(container);
}

export default {
  open,
  close,
};
