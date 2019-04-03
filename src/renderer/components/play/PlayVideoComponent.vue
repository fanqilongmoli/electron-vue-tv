<template>
    <div>
        <video-player :options="playerOptions" @ready="playerReadied"/>
        <el-button style="position: fixed;bottom: 80px;right: 40px" icon="el-icon-back" circle
                   @click="back"></el-button>
    </div>
</template>

<script>
    import 'vue-video-player/src/custom-theme.css'

    import videojs from 'video.js'

    window.videojs = videojs;

    require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

    export default {
        name: "PlayVideoComponent",
        data() {
            return {
                playerOptions: {}
            }
        },
        methods: {
            playerReadied(player) {
                var hls = player.tech({IWillNotUseThisInPlugins: true}).hls
                player.tech_.hls.xhr.beforeRequest = function (options) {
                    return options
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
                flash: {hls: {withCredentials: false}},
                html5: {hls: {withCredentials: false}},
                // poster: "https://ws1.sinaimg.cn/large/0065oQSqly1g0ajj4h6ndj30sg11xdmj.jpg"
            }

        }
    }
</script>

<style scoped>

</style>