<template>
    <div class="list-item">
        <input type="checkbox" :checked="complete" @input="$emit('complete-item', id, $event.target.checked)">
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
