const SearchInput = ({ desc, setDesc }) => {
    return (
        <input value={desc} onChange={(e) => setDesc(e.target.value)} type="text" placeholder={`🔎 Search by title, post, or timeline`} className="w-full bg-slate-800 outline-none text-slate-100 px-4 py-2 rounded-full mt-5" />
    )
}

export default SearchInput