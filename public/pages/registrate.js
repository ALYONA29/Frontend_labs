const register = `
<link rel="stylesheet" href="/styles/auth.css">
<section class="register-section">
        <form class="form-style" onsubmit="signUpCheck(); return false;">
          <label class="label-style" for="login-input">EMAIL</label>
          <input class="form-input-style" id="login-input" type="text" name="" value="" required>
          <label class="label-style" for="login-input">PASSWORD</label>
          <input class="form-input-style" id="password-input" type="password" name="" value="" required>
          <label class="label-style" for="password-again-input">PASSWORD AGAIN</label>
          <input class="form-input-style" id="password-again-input" type="password" name="" value="" required>
          <button class="form-button-style" name="button">SIGN UP</button>
        </form>
      </section>
`