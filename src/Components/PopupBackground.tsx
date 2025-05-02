import './PopupBackground.css';

interface PopupBackgroundProps {
  onClick: () => void;
}

export default function PopupBackground ({ onClick }:PopupBackgroundProps)  {

  return (
    <div onClick={onClick} className="popupBackground">
    </div>
  );
}
