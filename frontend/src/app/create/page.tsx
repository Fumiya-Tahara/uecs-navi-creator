function Create() {
  return (
    <div className="bg-gray-100 h-screen">
      {/* サイドバー */}
      <div className="w-1/5 bg-white h-full">
        <div className="bg-gray-800 ">
          <ul className="list-none flex text-white">
            <li>
              <span className="material-symbols-outlined">devices</span>
            </li>
            <li>
              <span className="material-symbols-outlined">sensors</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Create;
