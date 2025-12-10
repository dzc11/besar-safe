import { useState } from 'react'

export default function PhotoUploader({ onChange }) {
  const [preview, setPreview] = useState(null)

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      onChange && onChange(file, reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFile} />
      {preview && <img src={preview} alt="preview" className="mt-2 w-48 rounded-lg shadow-sm" />}
    </div>
  )
}
