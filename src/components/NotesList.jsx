function NotesList({ notes, removeNote }) {
	return (
		<div className="mt-4 w-full max-w-lg px-4">
			{notes.map((n, index) => (
				<div
					key={index}
					className="p-2 my-2 bg-white shadow-md rounded-md cursor-pointer text-sm md:text-lg hover:bg-gray-200 transition"
					onClick={() => removeNote(index)}
				>
					{n}
				</div>
			))}
		</div>
	);
}

export default NotesList;