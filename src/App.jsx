import { useEffect, useRef, useState } from 'react'
import NoteInput from './components/NoteInput';
import NotesList from './components/NotesList';

function App() {
  const [canInstall, setCanInstall] = useState(false);

  const deferredPrompt = useRef(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();

      deferredPrompt.current = e;

      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt)
    {
      return;
    }

    const result = await deferredPrompt.current.prompt();
    console.log(`Installation ${result.outcome}`);
    deferredPrompt.current = null;
    setCanInstall(false);
  }

  const [notes, setNotes] = useState(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    return storedNotes || [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const removeNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <>
      {canInstall && (
        <div className='bg-gray-300 shadow-gray-700 p-4 flex items-center'>
          <div className='flex-grow text-center'>
            Voulez-vous installer l'application sur votre appareil ?
          </div>
          <button
            className='px-4 py-2 rounded text-white bg-teal-600'
            onClick={handleInstallClick}
          >
            Installer
          </button>
        </div>
      )}
      <div className='min-h-screen flex flex-col items-center p-4 bg-gray-100 md:p-6'>
        <h1 className='text-2xl font-bold mb-4 text-center'>
          KeepPeek - Prise de Notes
        </h1>
        <NoteInput addNote={addNote} />
        <NotesList notes={notes} removeNote={removeNote} />
      </div>
    </>
  );
};

export default App
