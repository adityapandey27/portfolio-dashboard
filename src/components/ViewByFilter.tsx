export default function ViewByFilter({
  viewBy,
  setViewBy,
}: {
  viewBy: string;
  setViewBy: (v: any) => void;
}) {
  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold">View by:</label>
      <select
        value={viewBy}
        onChange={e => setViewBy(e.target.value)}
        className="border px-3 py-2 rounded bg-black"
      >
        
        <option value="sector">Sector</option>
        <option value="exchange">Exchange</option>
        
      </select>
    </div>
  );
}