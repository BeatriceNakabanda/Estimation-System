<template>
  <footer class="footer px-4 py-4">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-11">
        <div class="copyright text-center text-lg-center text-muted">
          © {{year}} skalla
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style>

/* Removing background color of footer */
.footer{
  background: none !important;
}
</style>
