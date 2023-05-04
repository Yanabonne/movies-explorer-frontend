import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound({ setIsFooterShown, setIsHeaderShown }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsFooterShown(false);
    setIsHeaderShown(false);
    return () => {
      setIsFooterShown(true);
      setIsHeaderShown(true);
    };
  }, []);

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>
      <p
        className="not-found__back"
        onClick={() => {
          navigate(-1);
        }}
      >
        Назад
      </p>
    </div>
  );
}

export default NotFound;
