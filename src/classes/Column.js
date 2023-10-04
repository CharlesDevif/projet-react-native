import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore'

const db = getFirestore()
const collectionName = 'columns/'

function docToInstance(document) {
  const data = document.data()
  return !data ? null : new Column(document.id, data.board, data.name)
}

export default class Column {
  constructor(id, board, name) {
    this.id = id
    this.board = board
    this.name = name
  }

  static listenByBoard(boardId, callback) {
    const docsQuery = query(collection(db, collectionName), where('board', '==', boardId))
  
    return onSnapshot(docsQuery, snapshot => {
      const list = []
      snapshot.forEach(document => {
        list.push(docToInstance(document))
      })
      callback(list)
    })
  }

  async save() {
    const new_column = {
      board: this.board,
      name: this.name
    }

    if (this.id) {
      await updateDoc(doc(db, collectionName, this.id), new_column)
    } else {
      const res = await addDoc(collection(db, collectionName), new_column)
      this.id = res.id
    }
  }
  async delete() {
    await deleteDoc(doc(db, collectionName, this.id))
  }
}
