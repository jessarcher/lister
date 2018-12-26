<template>
    <textarea ref="textarea" :value="$slots.default[0].text" rows="1" @blur="blur"></textarea>
</template>

<script>
import autosize from "autosize"

export default {
    mounted() {
        autosize(this.$refs.textarea)
    },

    methods: {
        blur(e) {
            this.$emit('blur', e)
        },
    },
}
</script>
