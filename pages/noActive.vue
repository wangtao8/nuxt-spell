<template>
	<div class="wrap">
    <header class="headerImg">
        <img src="../assets/images/logo.png" alt=""/>
    </header>
    <section>
        <div class="noImg">
            <img src="../assets/images/prompt.png" alt=""/>
        </div>
        <p class="noTxt">你好，你目前没有</p>

    </section>
    <footer class="footBtn">
        <a href="javascript:;" class="groupBtn joinBtn" >我要拼团</a>
        <a href="javascript:;" class="groupBtn">我要参团</a>
    </footer>
</div>
</template>

<script>
</script>

<style scoped>
	@import "../assets/css/base.css";
	.wrap{
    height: 100%;
    width: 100%;
}
	.headerImg{
    height: 66px;
    padding: 60px 0 0 40px;
}

.footBtn{
    background: #fff;
    position: absolute;
    bottom:16px;
    left: 0;

}
.groupBtn{
    display: inline-block;
    width: 346px;
    height: 88px;
    line-height: 88px;
    font-size: 36px;
    color: #fff;
    background: #58af8a;
    border-radius: 8px;
    box-sizing: border-box;
    text-align: center;

}
.joinBtn{
    color: #58af8a;
    background: #fff;
    border: 1px solid #58af8a;
    margin: 0 18px;
}
.noImg{
    width: 396px;
    height: 292px;
}
.noImg{
    display: block;
    width: 100%;
    height: 100%;
    padding-top: 168px;
    text-align: center;
}
.noTxt{
    padding-top: 46px;
    font-size: 30px;
    color: #999;
    text-align: center;
}
</style>
