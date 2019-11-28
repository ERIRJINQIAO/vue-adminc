<template>
    <div id="header-wrap">
        <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu"></svg-icon></div>
        <div class="pull-right">
            <div class="user-info pull-left">
                管理员
            </div>
            <div class=" header-icon pull-left">
                <svg-icon iconClass="exit" className="exit"> </svg-icon>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "layoutHeader",
    setup(props,{ root }){
        const navMenuState = () => {
            root.$store.commit('SET_COLLAPSE')
        }
        return {
            navMenuState
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: $navMeau;
    height: 75px;
    background-color: #fff;
    box-shadow: 0 3px  16px 0 rgba(0, 0, 0, .1);
    line-height: 75px;
}
.header-icon {
    padding: 0 32px;
    svg {
        margin-bottom: -8px;
        font-size: 25px;
        cursor: pointer;
    }
}
.user-info {
    height: 100%;
    padding: 0 32px;
    border: 1px solid #ededed;
    + .header-icon {
       padding:  0 28px;
    }
}
</style>