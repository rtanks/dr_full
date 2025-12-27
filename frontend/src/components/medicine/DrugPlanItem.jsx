export default function DrugPlanItem({ drug, onEdit }) {
  const dailyConsumed = drug.consumedCount % drug.freq;
  console.log(drug)
  return (
    <div className="plan-item">
      <div className="plan-header">
        <div className="drug-title">{drug.form} <span className="dose-badge">{drug.dose}</span> {drug.name}</div>
        <button className="edit-btn" onClick={onEdit}>ویرایش</button>
      </div>
      <div className="dose-pills">
        {drug.times.map((t, i) => (
          <span key={i} className={`pill ${i < dailyConsumed ? 'done' : ''}`}>{t}:00</span>
        ))}
      </div>
      <div className="w-full text-sm text-676767 mt-3 border-t border-gray-200 py-1 h-max flex flex-row items-center justify-between">
        <div className="w-max flex flex-row items-center ">
          <span>کل دوره : </span>
          <span>{drug.count} عدد</span>
        </div>
        <div className="w-max flex flex-row items-center">
          <span>مانده</span>
          <span>{drug.duration}</span>
        </div>
      </div>
    </div>
  );
}