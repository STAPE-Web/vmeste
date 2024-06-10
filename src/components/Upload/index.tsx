import { FC, useState } from "react"
import styles from "./style.module.css"
import { AddFileIcon, CloseIcon } from "@/ui/Icons"
import { calculateSize, formatType } from "@/utils"

interface Props {
    file: FileList | null
    setFile: React.Dispatch<React.SetStateAction<FileList | null>>
    id: string
}

const Upload: FC<Props> = ({ file, setFile, id }) => {
    const [list, setList] = useState<File[]>([]);
    console.log(list)

    const allowedFileTypes = id === "photos" ? ["png", "jpeg", "jpg"] : ["pdf", "doc", "docx"];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const validFiles = Array.from(selectedFiles).filter((file) => {
                const fileExtension = file.name.split('.').pop()?.toLowerCase();
                return allowedFileTypes.includes(fileExtension || "");
            });

            if (validFiles.length > 0) {
                setFile(selectedFiles);
                setList(prev => [...prev, ...validFiles]);
            } else {
                alert("Данное разрешение файла не поддерживается.")
            }
        }
    };

    return (
        <>
            <input type="file" multiple id={id} className={styles.Input} onChange={e => handleFileChange(e)} />
            <label htmlFor={id} className={`${styles.Label} ${file?.length !== null ? styles.Active : ""}`}>
                <AddFileIcon />
                Прикрепить файлы
            </label>

            <div className={styles.List}>
                {list.map((f, index) => (
                    <div key={index} className={styles.Item}>
                        <div className={styles.Row}>
                            <p>{f.name}</p>
                            <CloseIcon onClick={() => {
                                const newArray = list.filter((_, i) => i !== index)
                                setList(newArray)
                            }} />
                        </div>

                        <div className={styles.Row}>
                            <p>{calculateSize(f.size)}</p>
                            <div>{formatType(f.type)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Upload