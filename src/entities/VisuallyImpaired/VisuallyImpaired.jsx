import { faImage } from "@fortawesome/fontawesome-free-regular";
import {
  faMinus,
  faMinusCircle,
  faVolumeOff,
} from "@fortawesome/fontawesome-free-solid";
import {
  faCircleHalfStroke,
  faGear,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  activeSpeech,
  darkPictures,
  deactivateMode,
  decreaseFontSize,
  handleThemeChange,
  hidePictures,
  increaseFontSize,
  setHide,
  setShow,
  showPictures,
  unplugSpeech,
  useVisually,
} from "../../app/redux/slices/visually";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";

// import faImage from "@fortawesome/fontawesome-free-regular";
export const VisuallyImpaired = ({ mainTextSpeech }) => {
  const { hide } = useVisually();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {hide && (
        <div className="visually">
          <div className="visually__content">
            <p>{t("Размер шрифта")}</p>
            <div>
              <button onClick={() => {
                dispatch(decreaseFontSize())
                mainTextSpeech('Текст уменьшен')
              }}>A-</button>
              <button onClick={() => {
                dispatch(increaseFontSize())
                mainTextSpeech('Текст увеличен')
              }}>A+</button>
            </div>
          </div>
          <div className="visually__content" id="visually__content">
            <p>{t("Цвета сайта")}</p>
            <div>
              <button
                id="visually__content-light"
                onClick={() => {
                  dispatch(handleThemeChange("light"));
                  mainTextSpeech('Цвет сайта черный по белому')
                }}
              >
                ц
              </button>
              <button
                id="visually__content-dark"
                onClick={() => {
                  dispatch(handleThemeChange("dark"));
                  mainTextSpeech('Цвет сайта белый по черному')
                }}
              >
                ц
              </button>
              <button
                id="visually__content-blue"
                onClick={() => {
                  dispatch(handleThemeChange("blue"));
                  mainTextSpeech('Цвет сайта темно-синий по голубому')
                }}
              >
                ц
              </button>
              <button
                id="visually__content-brown"
                onClick={() => {
                  dispatch(handleThemeChange("brown"));
                  mainTextSpeech('Цвет сайта коричневый по бежевому')
                }}
              >
                ц
              </button>
              <button
                id="visually__content-green"
                onClick={() => {
                  dispatch(handleThemeChange("green"));
                  mainTextSpeech('Цвет сайта зеленый по темно-коричневому')
                }}
              >
                ц
              </button>
            </div>
          </div>
          <div className="visually__content">
            <p>{t("Изображения")}</p>
            <div>
              <button onClick={() => {
                dispatch(showPictures());
                mainTextSpeech('изображения включены');
              }}>
                <FontAwesomeIcon icon={faImage} />
              </button>
              <button onClick={() => {
                dispatch(hidePictures())
                mainTextSpeech('изображения выключены')
              }}>
                <FontAwesomeIcon icon={faMinusCircle} />
              </button>
              <button onClick={() => {
                dispatch(darkPictures());
                mainTextSpeech('изображения черно-белые')
              }}>
                <FontAwesomeIcon icon={faCircleHalfStroke} />
              </button>
            </div>
          </div>
          <div className="visually__content">
            <p>{t("Синтез речи")}</p>
            <div>
              <button onClick={() => {
                dispatch(unplugSpeech())
              }}>
                <FontAwesomeIcon icon={faVolumeOff} />
              </button>
              <button onClick={() => {
                dispatch(activeSpeech())
              }}>
                <FontAwesomeIcon icon={faVolumeHigh} />
              </button>
            </div>
          </div>
          <div className="visually__content">
            <p>{t("настройки")}</p>
            <div>
              <button onClick={() => setModal(!modal)}>
                <FontAwesomeIcon icon={faGear} />
              </button>
              <button onClick={() => {
                dispatch(deactivateMode())
                mainTextSpeech('Обычная версия сайта')
              }}>
                {t("обычная версия")}
              </button>
              <button onClick={() => {
                dispatch(setHide());
                mainTextSpeech('Панель скрыт');
              }}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
          {modal && <Modal mainTextSpeech={mainTextSpeech} setModal={setModal} />}
        </div>
      )}
      {!hide && <button onClick={() => {
        dispatch(setShow());
        mainTextSpeech('панель раскрыт')
      }}>показать</button>}
    </React.Fragment>
  );
};
