export default class Column {
  static async create(board, name) {
    if (!board.columns) {
      board.columns = []
    }
    board.columns.push({
      name: name
    })
    await board.save()
  }
}
