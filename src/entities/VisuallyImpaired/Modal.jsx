import { useDispatch } from "react-redux";
import {
  increaseLetterSpacing,
  increaseLineSpacing,
  largeLetterSpacing,
  largeLineSpacing,
  normalLetterSpacing,
  normalLineSpacing,
  setDefaultFont,
  switchToSerifFont,
} from "../../app/redux/slices/visually";
import { useTranslation } from "react-i18next";

const Modal = ({ setModal, mainTextSpeech }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className="visually__modal">
      <div className="visually__modal-head">
        <p>{t("настройки")}</p>
        <button onClick={() => {
          setModal(false);
        }}>&times;</button>
      </div>
      <div className="visually__modal-body">
        <div className="visually__content">
          <p>{t("Межбуквенное расстояние")}</p>
          <div>
            <button onClick={() => {
              dispatch(normalLetterSpacing());
              mainTextSpeech('Интервал между буквами стандартный');
            }}>
              {t("стандартный")}
            </button>
            <button onClick={() => {
              dispatch(increaseLetterSpacing());
              mainTextSpeech('Интервал между буквами средний');
            }}>
              {t("средний")}
            </button>
            <button onClick={() => {
              dispatch(largeLetterSpacing());
              mainTextSpeech('Интервал между буквами большой');
            }}>
              {t("большой")}
            </button>
          </div>
        </div>
        <div className="visually__content">
          <p>{t("Межстрочный интервал")}</p>
          <div>
            <button onClick={() => {
              dispatch(normalLineSpacing());
              mainTextSpeech('Межстрочный интервал стандартный');
            }}>
              {t("стандартный")}
            </button>
            <button onClick={() => {
              dispatch(increaseLineSpacing())
              mainTextSpeech('Межстрочный интервал средний');
            }}>
              {t("средний")}
            </button>
            <button onClick={() => {
              dispatch(largeLineSpacing());
              mainTextSpeech('Межстрочный интервал большой');
            }}>
              {t("большой")}
            </button>
          </div>
        </div>
        <div className="visually__content">
          <p>{t("Шрифт")}</p>
          <div>
            <button onClick={() => {
              dispatch(setDefaultFont());
              mainTextSpeech('Шрифт без засечек');
            }}>
              {t("без засечек")}
            </button>
            <button onClick={() => {
              dispatch(switchToSerifFont())
              mainTextSpeech('Шрифт c засечками');
            }}>
              {t("с засечками")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
