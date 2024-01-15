export const ChangeViewBtn = () => {
  return (
    <div className="change-view">
      <button
        onClick={() => {
          setGridView(!gridView);
        }}
      >
        {gridView ? "List View" : "Grid View"}
      </button>
    </div>
  );
};
