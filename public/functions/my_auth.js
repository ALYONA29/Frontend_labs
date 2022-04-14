class AuthLogic {
    constructor() {
      this.user = null;
    }
  
    async isAuthenticated() {
      let service = this;
      return await startAuth.then(() => {
        return service.user != null
      })
    }
  
    signUp(email, password) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        onNavigate('/');
      }).catch(function (error) {
        alert('Email is wrong or has already been used. Please try again')
      });
    }
  
    login(email, password) {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        onNavigate('/');
      }).catch(function (error) {
        alert('Email or password is wrong. Please try again')
      });
    }
  
    logOut() {
      firebase.auth().signOut().then(function () {
        onNavigate('/');
      });
    }
  
  
  }
  
  const startAuth = new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      my_auth.user = user;
      if (user) {
        renameLogout();
      } else {
        renameLogin();
      }
      resolve();
    })
  })
  
  function renameLogin() {
    document.getElementById('login-link').style.display = 'block';
    document.getElementById('logout-link').style.display = 'none';
  }
  
  function renameLogout() {
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('logout-link').style.display = 'block';
  }
  
  
  let my_auth = new AuthLogic();
  