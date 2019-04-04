<template>
    <div>
        <my-video-player :options="playerOptions"/>
        <el-button style="position: fixed;bottom: 80px;right: 40px;z-index: 1000" icon="el-icon-back" circle
                   @click="back"></el-button>
    </div>
</template>

<script>
    import 'vue-video-player-videojs-7/src/custom-theme.css'
    import MyVideoPlayer from '../video/MyVideoPlayer'
    import videojs from 'video.js'

    window.videojs = videojs;

    import * as HLS from 'videojs-contrib-hls'

    export default {
        name: "PlayVideoComponent2",
        data() {
            return {
                playerOptions: {}
            }
        },
        components: {MyVideoPlayer},
        methods: {
            playerReadied(player) {
                console.log('playerReadied', player);
                try {
                    var hls = player.tech({IWillNotUseThisInPlugins: true}).hls;
                    player.tech_.hls.xhr.beforeRequest = function (options) {
                        return options
                    }
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
                autoplay: true,
                height: document.body.clientHeight,
                width: document.body.clientWidth,
                sources: {
                    type: 'application/x-mpegURL',
                    src: path
                },
                // controlBar: {
                //     timeDivider: false,
                //     durationDisplay: false
                // },
                // flash: {hls: {withCredentials: false}},
                // html5: {hls: {withCredentials: false}},
                //poster: "https://ws1.sinaimg.cn/large/0065oQSqly1g0ajj4h6ndj30sg11xdmj.jpg"
            }

        }
    }
</script>

<style scoped>

</style>