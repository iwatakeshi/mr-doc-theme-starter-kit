<template>
  <div class="top-bar" id="top-nav-bar">
    <div class="top-bar-title">
      <span data-responsive-toggle="responsive-menu" data-hide-for="medium">
        <span class="menu-icon dark" data-toggle></span>
      </span>
      <a class='logo' v-link="{ path: '/', activeClass: 'v-link-inactive' }">Mr. Doc </a>
    </div>
    <div id="responsive-menu">
      <div class="top-bar-right">
        <ul class="menu">
          <li><a v-link="{ path: '/' }">Home</a></li>
          <li><a v-link="{ path: '/api' }">API</a></li>
          <li><a v-link="{ path: '/changes' }">Changes</a></li>
          <li><a href="https://www.github.com/mr-doc">GitHub</a></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      github: 'http://www.github.com/mr-doc'
    }
  }
}
</script>


<style>
  .logo { font-size: 20px; }
  .logo {
    display: inline-block;
    padding-left: 50px;
    margin-left: 25px;
    text-decoration: none;
    color: #333333;
    line-height: 60px;
    background-image: url(../assets/logo.png);
    background-size: 40px;
    background-repeat: no-repeat;
    background-position: left center;
  }
  .top-bar { box-shadow: 0 0 4px rgba(0, 0, 0, 0.5); }
  .top-bar, .top-bar ul { background-color: white; }
  .top-bar a {
    display: inline-block;
    color: #333333;
    text-decoration: none;
    font-size: 20px;
    line-height: 60px;
    -webkit-transition: opacity 0.2s;
    transition: opacity 0.2s;
  }
  .top-bar a.v-link-active { color: #2199e8; }
  .top-bar a:hover { color: #2199e8; }
  .top-bar li { padding-top: 10px; }
</style>
