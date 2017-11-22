<template>
    <div>
        <span class='green circle'>{{caseNum}}</span>
    </div>
</template>

<script>
    export default {
        props: ["caseNum"],
    }
</script>

<style scoped>
div{
    display: inline-block;
    margin-right: 5px;
}
.green{
    background: green
}
.circle{
    border-radius: 50%;
    line-height: 20px;
    color: #333;
    text-align: center;
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
}
</style>