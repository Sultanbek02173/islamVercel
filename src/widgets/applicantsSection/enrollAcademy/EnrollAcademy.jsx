import "./enrollAcademy.scss"

export const EnrollAcademy = ({ applicants }) => {
  const { description, number, email } = applicants;

  return (
    <div className="enrollAcademy">
      <div className="content" dangerouslySetInnerHTML={{ __html: description }} />
      <div className="contacts">
        {email && (
          <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
        )}
        {number && (
          <p>Телефон: <a href={`tel:${number}`}>{number}</a></p>
        )}
      </div>
    </div>
  );
};

