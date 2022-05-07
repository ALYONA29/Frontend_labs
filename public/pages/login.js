const login = `
<link rel="stylesheet" href="/styles/auth.css">
<section class="login-section">
        <form class="form-style" onsubmit="logInCheck(); return false">
          <label class="label-style" for="login-input">EMAIL</label>
          <input class="form-input-style" id="login-input" type="text" name="" value="" required>
          <label class="label-style" for="login-input">PASSWORD</label>
          <input class="form-input-style" id="password-input" type="password" name="" value="" required>
          <button class="form-button-style" name="button">LOG IN</button>
        </form>
      </section>
`