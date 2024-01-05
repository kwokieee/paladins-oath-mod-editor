export default function FileList ({ files }) {
  return (
      <ul>
        {files.map(file => (
          <li key={file.name}>
            {file.name}
          </li>
        ))}
      </ul>
    );
};