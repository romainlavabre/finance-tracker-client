import React, {useEffect, useState} from "react";
import isNull from "../../../mixin/global/isNull";
import LineLoader from "../loader/LineLoader";
import axios from "axios";
import database from "../../../database/database";
import File from "../file/File";
import ArrowLeftIcon from "../icon/ArrowLeftIcon";
import ArrowRightIcon from "../icon/ArrowRightIcon";
import inputFileToDocument from "../../../mixin/global/inputFileToDocument.js";
import ButtonLoader from "../loader/ButtonLoader";

export default function Slide({paths = [], duration = null, files = null, uploadFunction = null}) {
    const [currentFile, setCurrentFile] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [storage, setStorage] = useState([]);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);

    useEffect(() => {
        if (!isNull(files)) {
            paths = files;
        } else {
            const tmp = [];
            if (!isNull(paths)) {
                paths.forEach(path => tmp.push({path: path}));
                paths = tmp;
            }
        }

        if (paths.length === 0) {
            return;
        }

        getFile(0);
    }, []);

    useEffect(() => {
        setUploadLoading(false);
    }, [paths, files])

    const getFile = async index => {
        if (!isNull(storage[index])) {
            setCurrentFile({...storage[index]})
            setCurrentPosition(index);
            return;
        }

        let headers = {};
        const accessToken = database.read(database.TABLE_AUTHENTICATION, "access_token");

        if (accessToken !== null) {
            headers = {
                headers: {
                    Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                }
            };
        }

        try {
            setFileLoading(true);
            const response = await axios.get(!isNull(files) ? files[index].path : paths[index].path, headers);
            const obj = {
                removeFunc: !isNull(files) ? files[index].removeFunc : paths[index].removeFunc,
                file: response.data
            };

            setCurrentFile(obj);
            storage[index] = obj;
            setStorage([...storage]);
            setCurrentPosition(index);
        } catch (e) {
            console.log(e)
        }

        setFileLoading(false);
    }

    const increment = () => {
        let nextPosition = currentPosition;

        if (isNull(!isNull(files) ? files[currentPosition + 1] : paths[currentPosition + 1])) {
            nextPosition = 0;
        } else {
            nextPosition++;
        }

        getFile(nextPosition);
    }

    const decrement = () => {
        let nextPosition = currentPosition;

        if (isNull(!isNull(files) ? files[currentPosition - 1] : paths[currentPosition - 1])) {
            nextPosition = !isNull(files) ? files.length - 1 : paths.length - 1;
        } else {
            nextPosition--;
        }

        getFile(nextPosition);
    }

    if (isNull(currentFile) && paths.length > 0) {
        return (
            <div className="border border-2 border-gray-700 mt-2">
                <div className="p-2">
                    <LineLoader size={32}/>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="border border-2 border-gray-700 p-2 mt-2">
                {
                    !isNull(uploadFunction)
                        ? (
                            <div className="flex justify-end">
                                {
                                    !uploadLoading
                                        ? (
                                            <input
                                                type="file"
                                                onChange={async e => {
                                                    setUploadLoading(true);
                                                    await uploadFunction(await inputFileToDocument(e.target.files[0]))
                                                }}
                                            />
                                        )
                                        : (
                                            <div className="mt-3">
                                                <ButtonLoader text={"Upload du fichier"} background={"bg-gray-750"}/>
                                            </div>
                                        )
                                }

                            </div>
                        )
                        : null
                }
                {
                    isNull(currentFile) || paths.length === 0
                        ? (
                            <div className="text-center text-lg font-bold my-10">
                                No file available
                            </div>
                        )
                        : (
                            <>
                                <div className={(!isNull(files) ? files.length : paths.length) < 2 ? "hidden" : null}>
                                    <div className="flex justify-between mb-2 mt-5">
                                        <button className="badge-yellow" onClick={decrement}>
                                            <ArrowLeftIcon size={5}/>
                                        </button>
                                        <button className="badge-green" onClick={increment}>
                                            <ArrowRightIcon size={5}/>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    {
                                        !fileLoading
                                            ? (
                                                <File
                                                    base64={currentFile.file.base64}
                                                    contentType={currentFile.file.content_type}
                                                    filename={currentFile.file.name}
                                                    removeFunction={currentFile.removeFunc}
                                                />
                                            )
                                            : (
                                                <div className="mt-3">
                                                    <ButtonLoader text={"Chargement du fichier"} background={"bg-gray-750"}/>
                                                </div>
                                            )
                                    }
                                </div>
                                <span className="font-bold italic flex justify-end mt-3">
                                    {currentPosition + 1} sur {!isNull(files) ? files.length : paths.length} fichiers
                                </span>
                            </>
                        )
                }
            </div>
        </div>
    );
}
