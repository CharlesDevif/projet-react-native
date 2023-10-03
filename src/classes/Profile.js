import { getFirestore, doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore'

const db = getFirestore()
const collectionName = 'profiles/'

function docToInstance(document) {
  const data = document.data()
  return !data ? null : new Profile(document.id, data.email)
}

export default class Profile {
  constructor(id, email) {
    this.id = id
    this.email = email
  }

  static listenById(id, callback) {
    return onSnapshot(doc(db, collectionName, id), snapshot => {
      callback(docToInstance(snapshot))
    })
  }

  async add() {
    const new_profile = {
      email: this.email
    }

    await setDoc(doc(db, collectionName, this.id), new_profile)
  }

  async delete() {
    await deleteDoc(doc(db, collectionName, this.id))
  }
}
