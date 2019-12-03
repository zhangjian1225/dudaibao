<template>
   
</template>

<script>
export default {
    name: "reset",
    data() {
        return {
           thisHref:''
        };
    },
    methods: {
        getUrlParams: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'); // 定义正则表达式
            var r = this.thisHref.split('?')[1].match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
    },
    mounted() {
        if (location.href.includes('shareId')) { // 判断是否分享的页面
            // let urlName = href.split('/?')[1].split('#/')[0].split('&')[0].split('=')[1]
            let href = window.location.href;
            this.thisHref = href.replace('/?','?').replace('#/','');
            let shareId = this.getUrlParams('shareId');
            let r = this.thisHref.split('?')[1];
            let h = this.thisHref.split('?')[0];
            let url = h+'/#/'+shareId+'?'+r;
            window.location.href = url;
        } else {
            this.$router.push({
                path: '/homePage',
                query: {}
            });
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
