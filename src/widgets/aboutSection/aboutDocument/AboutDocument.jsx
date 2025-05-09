import './aboutDocument.scss';
import PropTypes from 'prop-types';
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiDownload } from "react-icons/hi";

export const AboutDocument = ({ items }) => {
  return (
    <section className="about-document">
      {items.map((item) => (
        <div key={item.id} className="about-document__block">
          <div className="about-document__block-left">
             <h2 className='about-document__block-left-title'>{item.title}</h2>
          </div>
          <div className="about-document__block-right">
             <a className="about-document__block-right-open" href={item.link_open}>открыть <IoDocumentTextOutline/></a>
             <a 
               className="about-document__block-right-download" 
               href={item.link_download}
               download={item.link_download + '.jpg'}
             >
               скачать <HiDownload/>
             </a>
          </div>
        </div>
      ))}
    </section>
  );
};

AboutDocument.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            link_open: PropTypes.string.isRequired,
            link_download: PropTypes.string.isRequired,
        })
    ).isRequired,
};