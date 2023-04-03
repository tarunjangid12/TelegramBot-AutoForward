const { SaveStorage } = require("../utils/saveStorage")

const checkWorker = (label, idFromUser) => {
    const filePath = SaveStorage.checkSessionExist('forwardWorker')
    const workers = SaveStorage.loadSession(filePath)

    const findSameWorkers = workers.filter(({worker, id}) => {
        return worker === label && id == idFromUser
    })[0]

    if (findSameWorkers) {
        return true
    }
    return false
}

const resultSplitId = (argAction, argLabel, argCommand) => {
    const lenActionAndLabel = argAction.length + argLabel.length
    const forwardChatId = argCommand.slice(lenActionAndLabel + 1, argCommand.length - 1)
    let from = forwardChatId.split('->')[0].trim()
    let to = forwardChatId.split('->')[1].trim()
    console.log(from, " <= from")
    console.log(to, " <= to")

    from = from.split(',')
    to = to.split(',')

    return {from, to}
}

const loadWorkers = (idFromUser) => {
    const filePath = SaveStorage.checkSessionExist('forwardWorker')
    const workers = SaveStorage.loadSession(filePath)
    const findWorker = workers.filter(({id}) => id == idFromUser)
    return findWorker
}

const saveToStorage = (forwardInfo) => {
    const result = SaveStorage.set(forwardInfo, 'forwardWorker')
}

module.exports = { resultSplitId, saveToStorage, loadWorkers, checkWorker }