<template>
  <div class="login-container">
    <div class="title-container">
      <h1 class="login-title">Welcome Back</h1>
      <h2 class="sub-title">To Your Pet</h2>
    </div>
    <div class="login-card">
      <div class="input-group">
        <div class="input-field">
          <label class="input-label">Pet Name</label>
          <input type="text" class="input-box" />
        </div>
        <div class="input-field">
          <label class="input-label">Password</label>
          <input type="password" class="input-box" />
        </div>
      </div>
      <button class="enter-button">Enter</button>
      <p class="signup-prompt">Don’t have a pet yet?</p>
      <button class="create-button">Create</button>
    </div>
  </div>
</template>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title-container {
  text-align: center;
  margin-bottom: -10px;
  z-index: 1;
  color: #4a4a4a;
}
.login-title {
  background: linear-gradient(
    #fdf9ef 24.32%,
    #eadbc5 58.82%,
    #dac4ab 78.57%,
    #8a7154 93.28%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 60px;
  margin: 0;
}
.sub-title {
  background: linear-gradient(
    #fdf9ef 24.32%,
    #eadbc5 58.82%,
    #dac4ab 78.57%,
    #8a7154 93.28%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 40px;
  margin-top: -10px;
}
.login-card {
  background: linear-gradient(180deg, #f7f1e3 0%, #e9e0cf 34.51%, #d1baa0 100%), #e6dbc8;
  box-shadow: 5px 10px 26px 16px rgba(97, 90, 90, 0.31);
  padding: 40px 20px;
  border-radius: 35px;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.input-field {
  flex: 1;
}

.input-label {
  font-size: 30px;
  color: #40527b;
  margin-bottom: 10px;
  display: block;
  font-weight: bold;
}

.input-box {
  width: 70%;
  padding: 15px;
  border-radius: 20px;
  border: none;
  font-size: 15px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: inset 0px 4px 8px rgba(193, 118, 32, 0.581),
    0px 6px 12px rgba(193, 118, 32, 0.581);
  outline: none;
  transition: box-shadow 0.2s ease;
}

.input-box:focus {
  box-shadow: inset 0px 4px 8px rgb(255, 0, 0), 0px 6px 12px rgba(255, 0, 0, 0.15);
}
.enter-button {
  background: linear-gradient(180deg, #ff95a2 0%, #f26667 100%);
  box-shadow: 0px 4px 5.5px 5px rgba(30, 30, 30, 0.42);
  color: #fff;
  padding: 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  width: 40%;
  margin-top: 10px;
  font-size: 20px;
}

.signup-prompt {
  color: #40527b;
  font-size: 20px;
  margin: 15px 0 15px;
}

.create-button {
  background: linear-gradient(90deg, #6bcdc9 48.01%, #f4b32f 61.01%);
  box-shadow: 0px 4px 5.5px 5px rgba(30, 30, 30, 0.42);
  color: #fff;
  padding: 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  width: 40%;
  font-size: 20px;
}

body {
  background: linear-gradient(#73aab7, #88bbb8 20.01%, #a3c9a5 44.54%, #eccd83 74.79%, #cfd972 84.03%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
