<template>
  
</template>
<script>
export default {
  mounted(){
    this.$axios('https://apis.map.qq.com/ws/staticmap/v2/?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&size=500*400&center=39.12,116.54&zoom=12')
      .then(res=>console.log(res))
  }
}
</script>
<style lang="scss" scoped>

</style>