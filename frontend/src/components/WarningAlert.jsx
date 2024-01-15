export const WarningAlert = ({ warningTitle, warningText }) => {
  return (
    <div className="loading__container">
      <h2>{warningTitle}</h2>
      <h3>{warningText}</h3>
    </div>
  );
};
