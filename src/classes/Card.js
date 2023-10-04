import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore'

const db = getFirestore()
const collectionName = 'cards/'

function docToInstance(document) {
  const data = document.data()
  return !data ? null : new Card(document.id, data.column, data.board, data.name,data.description, data.image)
}

export default class Card {
  constructor(id, column, board, name, description, image) {
    this.id = id
    this.column = column
    this.board = board
    this.name = name
    this.description = description
    this.image = image
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
    const new_card = {
      column: this.column,
      board: this.board,
      name: this.name,
      description: this.description,
      image: this.image
    }

    if (this.id) {
      await updateDoc(doc(db, collectionName, this.id), new_card)
    } else {
      const res = await addDoc(collection(db, collectionName), new_card)
      this.id = res.id
    }
  }

  async delete() {
    await deleteDoc(doc(db, collectionName, this.id))
  }
}

