"use client"
export const TagInput = () => {
  return (
    <>
      <label className="text-base text-gray-500 font-semibold mb-2 block ">Tags</label>
      <input
        required
        type="text"
        name="tags"
        id="tags"
        className="w-full py-2 px-2 text-gray-400 font-semibold text-sm bg-slate-800 border file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
      />
      <p className="text-xs text-gray-400 mt-2">Separate tags with a comma.</p>
    </>
  )
}