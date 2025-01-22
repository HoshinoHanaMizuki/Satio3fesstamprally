{/* <div className="modeChanger">
    <div className="editTitle flex" onClick={() => isOpenDetailPart(isModeDetailPartOpen, setIsModeDetailPartOpen)}>
        <div className="detailVector text-left">凸</div>
        <div className="titleText text-right">開催期間中or期間外</div>
    </div>
    {isModeDetailPartOpen && (
        <div className="detailPart">
            <div className="modeChangeButton">
                <div className="inputLists flex">
                    <p>
                        <input type="radio" defaultChecked={editMode?.mode == true} value="期間中" name="isModeDefine" onChange={() => setEditMode({ mode: true })} />
                        <label className="pl-1 pr-1">期間中に設定</label>
                    </p>
                    <p>
                        <input type="radio" defaultChecked={editMode?.mode == false} value="期間外" name="isModeDefine" onChange={() => setEditMode({ mode: false })} />
                        <label className="pl-1 pr-1">期間外に設定</label>
                    </p>
                </div>
            </div>
        </div>
    )}
</div>

<div className="confirmMode">
    <h3>開催期間:{editMode?.mode ? "期間中" : "期間外"}</h3>
</div> */}