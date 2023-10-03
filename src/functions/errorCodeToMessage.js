export default code => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Email invalide.'
    case 'auth/user-not-found':
      return 'Email ou mot de passe incorrecte.'
    case 'auth/wrong-password':
      return 'Email ou mot de passe incorrecte.'
    case 'auth/user-disabled':
      return 'Vous avez été banni, veuillez contacter un administrateur.'
    case 'auth/invalid-login-credentials':
      return 'Email ou mot de passe incorrecte.'
    default:
      return code
  }
}