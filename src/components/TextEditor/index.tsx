import { FC } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>
}

const TextEditor: FC<Props> = ({ value, onChange }) => {
    return (
        <ReactQuill theme="snow" value={value} onChange={onChange}
            placeholder='Enter Description'
        />
    );
}

export default TextEditor