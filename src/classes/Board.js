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
  async delete() {
    await deleteDoc(doc(db, collectionName, this.id))
  }

  async createColumn(name) {
    if (name === '') {
      throw new Error('Nom invalide')
    } else if (this.columns.some(column => column.name === name)) {
      throw new Error('Nom déjà utilisé')
    } else {

      if (!this.columns) {
        this.columns = []
      }
      this.columns.push({
        name: name,
        tasks: []
      })
      await this.save()
    }
  }
  async deleteColumn(column) {
    const index = this.columns.findIndex(c => c.name === column.name)
    this.columns.splice(index, 1)
    await this.save()
  }

  async createTask(name, description, column) {
    const index = this.columns.findIndex(c => c.name === column.name)

    if (name === '') {
      throw new Error('Nom invalide')
    } else if (!column) {
      throw new Error('Column invalide')
    } else if (this.columns[index].tasks.some(t => t.name === name)) {
      throw new Error('Nom déjà utilisé')
    } else {

      if (!this.columns[index].tasks) {
        this.columns[index].tasks = []
      }
      this.columns[index].tasks.push({
        name: name,
        description: description
      })
      await this.save()
    }
  }
  async deleteTask(column, task) {
    const colIndex = this.columns.findIndex(c => c.name === column.name)
    const taskIndex = this.columns[colIndex].tasks.findIndex(t => t.name === task.name)
    this.columns[colIndex].tasks(taskIndex, 1)
    await this.save()
  }
}
