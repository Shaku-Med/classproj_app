let messages = []


let findObjectByID = (array, targetid) => {
    for (const item of array) {
        if (item.id === targetid) {
            return item
        }
        // 
        if (item.replies && item.replies.length > 0) {
            const foundObject = findObjectByID(item.replies, targetid);
            if (foundObject) {
                return foundObject
            }
        }
    }
    return null
};


let DeleteDTA = (id) => {
    let mes = messages
        // 
    let targetObject = findObjectByID(mes, id)

    if (targetObject) {
        let indexToRo = mes.indexOf(targetObject)
        if (indexToRo !== -1) {
            mes.splice(indexToRo, 1)
        } else {
            toast.info(`Unable to locate Action Index`)
        }
    } else {
        toast.info(`Unable to find action object to delete`)
    }
};


let RepliesAD = (id, replydata) => {
    let mes = messages
        // 
    let targetObject = findObjectByID(mes, id)
    targetObject.replies.push(replydata)

}

let EditTT = (id, input, file) => {
    let mes = messages
        // 
    let targetObject = findObjectByID(mes, id)
    targetObject.input = input.trim().length < 1 ? targetObject.input : input
    targetObject.file = file.length < 1 ? targetObject.file : file

}

module.exports = {
    findObjectByID,
    DeleteDTA,
    RepliesAD,
    EditTT,
    messages
}