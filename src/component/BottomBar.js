export default function ({onSelected}) {

    return (
        <div className="h-10">
            <div className="fixed bottom-0 h-10 flex px-20 z-[20]">
                <div className="bottom-button" onClick={() => onSelected(0)}>
                    ETF / Portfolio
                </div>

                <div className="bottom-button" onClick={() => onSelected(1)}>
                    Long Term Return
                </div>
            </div>
        </div>

    );
}