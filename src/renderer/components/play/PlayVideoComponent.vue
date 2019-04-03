<template>
    <div>
        <video-player :options="playerOptions" @ready="playerReadied"/>
    </div>
</template>

<script>
    import 'video.js/dist/video-js.css'
    import videojs from 'video.js'
    window.videojs = videojs
    require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

    export default {
        name: "PlayVideoComponent",
        data() {
            return {
                playerOptions: {
                    height: '360',
                    sources: [{
                        withCredentials: false,
                        type: "application/x-mpegURL",
                        src: "http://aljazeera-eng-hd-live.hls.adaptive.level3.net/aljazeera/english2/index.m3u8"
                    }],
                    controlBar: {
                        timeDivider: false,
                        durationDisplay: false
                    },
                    poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg"
                }
            }
        },
        methods: {
            playerReadied(player) {
                var hls = player.tech({IWillNotUseThisInPlugins: true}).hls
                player.tech_.hls.xhr.beforeRequest = function (options) {
                    // console.log(options)
                    return options
                }
            }
        },
        // components: {videoPlayer}
    }
</script>

<style scoped>

</style>