import isNull from "../../../mixin/global/isNull";
import DownloadIcon from "../icon/DownloadIcon";
import useDownload from "../../../use/useDownload";
import CloseIcon from "../icon/CloseIcon.js";
import useConfirm from "../../../use/useConfirm";

export default function File({base64, contentType, filename, css, removeFunction = null}) {
    const download = useDownload();
    const confirm = useConfirm();

    if (contentType.includes("image/")) {
        return (
            <div className="relative w-full">
                {
                    !isNull(removeFunction)
                        ? (
                            <button className="badge-red-square mt-1 ml-1" onClick={e => {
                                confirm.launch("La suppression du fichier est définitive", isConfirm => {
                                    if (!isConfirm) return;

                                    removeFunction(e)
                                })
                            }}>
                                <CloseIcon size={6}/>
                            </button>
                        )
                        : null
                }

                <div className="flex justify-center">
                    <img className="shadow-2xl" src={`data:${contentType};base64,${base64}`}/>
                </div>
                <div className="text-blue-500 font-bold mt-3 flex justify-center cursor-pointer"
                     onClick={() => download(base64, contentType, filename)}>
                    <DownloadIcon size={6}/>
                    Télécharger
                </div>
            </div>
        );
    }


    if (contentType === "application/pdf") {
        return (
            <div className="relative h-full">
                {
                    !isNull(removeFunction)
                        ? (
                            <button className="badge-red mt-1 ml-1" onClick={e => {
                                confirm.launch("La suppression du fichier est définitive", isConfirm => {
                                    if (!isConfirm) return;

                                    removeFunction(e)
                                })
                            }}>
                                <CloseIcon size={6}/>
                            </button>
                        )
                        : null
                }
                <iframe className={isNull(css) ? "w-full h-5/6" : css}
                        src={`data:${contentType};base64,${base64}`}
                        content={contentType}></iframe>

                <div className="text-blue-500 font-bold mt-3 flex justify-center cursor-pointer"
                     onClick={() => download(base64, contentType, filename)}>
                    <DownloadIcon size={6}/>
                    Télécharger
                </div>
            </div>
        );
    }


    return (
        <div className="relative">
            {
                !isNull(removeFunction)
                    ? (
                        <button className="badge-red mt-1 ml-1" onClick={e => {
                            confirm.launch("La suppression du fichier est définitive", isConfirm => {
                                if (!isConfirm) return;

                                removeFunction(e)
                            })
                        }}>
                            <CloseIcon size={6}/>
                        </button>
                    )
                    : null
            }

            <div>
                <div>Ce document ne peut être affiché.</div>
                <div>Vous pouvez le télécharger.</div>
            </div>

            <div className="text-blue-500 font-bold mt-3 flex justify-center cursor-pointer"
                 onClick={() => download(base64, contentType, filename)}>
                <DownloadIcon size={6}/>
                Télécharger
            </div>
        </div>
    );
}
