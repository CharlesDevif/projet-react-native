import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore'

const db = getFirestore()
const collectionName = 'boards/'

function docToInstance(document) {
  const data = document.data()
  return !data ? null : new Board(document.id, data.name, data.owner, data.columns)
}

export default class Board {
  constructor(id, name, owner, columns) {
    this.id = id
    this.name = name
    this.owner = owner
    this.columns = columns
  }

  static listenByOwner(ownerId, callback) {
    const docsQuery = query(collection(db, collectionName), where('owner', '==', ownerId))

    return onSnapshot(docsQuery, snapshot => {
      const list = []
      snapshot.forEach(document => {
        list.push(docToInstance(document))
      })
      callback(list)
    })
  }

  async save() {
    const new_board = {
      name: this.name,
      owner: this.owner,
      columns: this.columns
    }

    if (this.id) {
      await updateDoc(doc(db, collectionName, this.id), new_board)
    } else {
      const res = await addDoc(collection(db, collectionName), new_board)
      this.id = res.id
    }
  }
  async createColumn(name) {
    if (!this.columns) {
      this.columns = []
    }
    this.columns.push({
      name: name
    })
    await this.save()
  }
  async createTask(name, description, column) {
    // TODO: createTask
  }

  async delete() {
    await deleteDoc(doc(db, collectionName, this.id))
  }
}
