<template>
    <div>
        <video-player :options="playerOptions" @ready="playerReadied"/>
        <el-button style="position: fixed;bottom: 80px;right: 40px;z-index: 1000" icon="el-icon-back" circle
                   @click="back"></el-button>
    </div>
</template>

<script>
    import 'vue-video-player-videojs-7/src/custom-theme.css'

    // import videojs from 'video.js'
    //
    // window.videojs = videojs;
    //
    // require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

    export default {
        name: "PlayVideoComponent",
        data() {
            return {
                playerOptions: {}
            }
        },
        methods: {
            playerReadied(player) {
                console.log('playerReadied', player);
                try {
                    // var hls = player.tech({IWillNotUseThisInPlugins: true}).hls;
                    // player.tech_.hls.xhr.beforeRequest = function (options) {
                    //     return options
                    // }
                } catch (e) {
                    console.log('playerReadied catch', e);
                }

            },
            back() {
                this.$router.back()
            }
        },
        created() {
            let name = this.$route.query.name;
            let path = this.$route.query.path;

            console.log("height", document.body.scrollHeight);
            console.log("width", document.body.clientWidth);
            console.log("name", name);
            console.log("path", path);

            this.playerOptions = {
                autoplay: false,
                height: document.body.clientHeight,
                width: document.body.clientWidth,
                sources: [{
                    type: "application/x-mpegURL",
                    src: path
                }],
                controlBar: {
                    timeDivider: false,
                    durationDisplay: false
                },
                // flash: {hls: {withCredentials: false}},
                // html5: {hls: {withCredentials: false}},
                //poster: "https://ws1.sinaimg.cn/large/0065oQSqly1g0ajj4h6ndj30sg11xdmj.jpg"
            }

        }
    }
</script>

<style scoped>

</style>