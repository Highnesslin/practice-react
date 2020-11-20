import React from 'react';
import Popup from '../../components/Popup/Popup';

export default function Layer() {
  const onShowPopup = () => {
    Popup.open({
      component: <LayerComp />,
    });
  };

  return (
    <div>
      <button onClick={onShowPopup}>open</button>
      <button onClick={() => Popup.close()}>close</button>
    </div>
  );
}

function LayerComp() {
  return (
    <div style={{ display: 'block', width: 100, margin: '50vh auto 0', background: '#0af' }}>
      <p>title</p>
      <button onClick={() => alert('hello')}>hello</button>
    </div>
  );
}
