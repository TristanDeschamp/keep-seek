import { useState } from "react";

function NoteInput({ addNote }) {
	const [note, setNote] = useState("");

	const handleSubmit = () => {
		if (note.trim() !== "")
		{
			addNote(note);
			setNote("");
		}
	};

	return (
		<div className="w-full max-w-lg">
			<textarea
				className="w-full p-2 border rounded-md resize-none md:text-lg"
				rows="3"
				value={note}
				onChange={(e) => setNote(e.target.value)}
				placeholder="Entrer votre note ici..."
			>
			</textarea>
			<button
				className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
				onClick={handleSubmit}
			>
				Ajouter
			</button>
		</div>
	);
}

export default NoteInput;