<template>
    <div class="container">
        <div class="loader">
        </div>
        <div class="inner-loader"></div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 50px;
    height: 50px;
    position: relative;
} 
.loader {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
    border: 5px solid $third-color;
    border-top: 5px solid transparent;
    border-radius: 50%;
    animation: spin1 3s linear infinite 0s backwards;
}

.inner-loader {
    position: absolute;
    left: 7.5px;
    top: 7.5px;
    width: 35px;
    height: 35px;
    border: 5px solid $fourth-color;
    border-top: 5px solid transparent;
    border-radius: 50%;
    animation: spin2 3s linear infinite 0s backwards;
}

@keyframes spin1 {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes spin2 {
    from {
        transform: rotate(360deg);
    }
    to {
        transform: rotate(0deg);
    }
}
</style>