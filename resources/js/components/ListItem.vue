<template>
    <div>
        <input type="checkbox" @input="$emit('update:complete', $event.target.checked)">
        <input type="text" :value="name" @input="$emit('update:name', $event.target.value)">
        <button @click="$emit('delete-item', id)">
            Delete
        </button>
    </div>
</template>

<script>
    export default {
        props: ['id', 'name', 'complete'],
    }
</script>
