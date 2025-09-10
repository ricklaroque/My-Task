function NewBoard({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="group max-w-sm w-full h-[10rem]bg-transparent border-2 border-dashed border-gray-400 rounded-[4px] cursor-pointer hover:border-gray-600 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center group"
      onClick={onClick}
    >
      <div className="text-center">
        <span className="text-gray-500 group-hover:text-gray-700 font-medium text-lg">
          + Adicionar outro board
        </span>
      </div>
    </div>
  );
}

export default NewBoard;