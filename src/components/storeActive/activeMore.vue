<template>
  <div class="container">
    <div class="header">
      <div class="back">
        <router-link to="/storeActive" class="iconfont">&#xe611;</router-link>
      </div>
      <div class="title">活动详情</div>
    </div>
    <div class="main">
        <div class="activeBox">
            <span class="name">活动名称：</span>
            <span class="text" v-html="dataArr.activityName"></span>
        </div>
        <div class="activeBox">
            <span class="name">活动时间：</span>
            <span class="text" v-html="dataArr.activityTime"></span>
        </div>
        <div class="activeBox">
            <span class="name">活动地点：</span>
            <span class="text" v-html="dataArr.activityAddress"></span>
        </div>
        <div class="activeBox">
            <span class="name">活动内容：</span>
            <span class="text" v-html="dataArr.activityContent"></span>
        </div>
        <div class="activeBox">
            <span class="name">活动奖品：</span>
            <span class="text" v-html="dataArr.activityPrize"></span>
        </div>
        <div class="activeBox">
            <span class="name">联系人：</span>
            <span class="text" v-html="dataArr.activityContact"></span>
        </div>
        <div class="activeBox">
            <span class="name">联系人电话：</span>
            <span class="text" v-html="dataArr.activityPhone"></span>
        </div>
    </div>
    <div class="footer">
      <div class="addBtn" @click="sendMore">一键群发</div>
      <div class="shareBtn" @click="shareFn">分享</div>
    </div>
    <div class="shareMask" v-if="shareMask" @click="closeMask"></div>
  </div>
</template>

<script>
import { Toast} from 'vant';
export default {
  name: "activeMore",
  data() {
    return {
      dataArr: [],
      activityCode:'',
      shareMask: false
    };
  },
  methods: {
    closeMask: function () {
      this.shareMask = false;
    },
    // 分享activityCode
    shareFn: function () {
      let _this = this;
      let link = window.location.href.split('/#')[0]+'?shareId=playActive&activityCode='+this.activityCode;
      console.log(link)
      this.wxInfo({
        title: _this.dataArr.activityName,
        desc: _this.dataArr.activityContent,
        link: link
      });
      this.shareMask = true;
    },
    // 一键群发
    sendMore: function () {
      let _this = this;
      this.$axios.get("sendActivity.do", {
        params: {
          activityCode: _this.activityCode
        }
      })
      .then(res => {
        if (res.data.code == 0) {
          Toast.success('群发成功');
        }
      })
      .catch(function(res) {
        console.error(res);
      });
    }
  },
  mounted() {
    this.activityCode =  this.$route.query.activityCode;
    let _this = this;
    this.$axios.get("getActivityInfo.do", {
        params: {
          activityCode: _this.activityCode
        }
      })
      .then(res => {
        this.dataArr = res.data.data.activityInfo;
      })
      .catch(function(res) {
        console.error(res);
      });
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  font-size: 0.3rem;
  box-sizing: border-box;
  padding-bottom: 0rem;
}
.header {
  position: relative;
  height: 0.8rem;
  width: 100%;
  background: #fff;
  .back {
      position: absolute;
      height: 100%;
      width: auto;
      line-height: 0.8rem;
      left: 0.05rem;
      z-index: 1;
      font-size: 0.3rem;
      font-weight: bold;
     a {
        list-style: none;
        color: #000;
        text-decoration: none;
      }
  }
  .title {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.34rem;
    margin-right: .3rem;
  }
}
.main {
  width: 100%;
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  -webkit-overflow-scrolling : touch;
  padding: .3rem .3rem 0 .3rem;
  .activeBox {
    width: 100%;
    display: flex;
    margin-top: .2rem;
    span {
      display: inline-block;
      color: #666;
      font-size: .34rem;
    }
    .text {
      flex: 1;
      flex-wrap: wrap;
    }
  }
}
.footer {
    width: 100%;
    height: 2rem;
    margin-bottom: .2rem;
    margin-top: .2rem;
    box-sizing: border-box;
    padding-right: .25rem;
    padding-left: .25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .addBtn {
        width: 100%;
        height: .85rem;
        text-align: center;
        line-height: .85rem;
        font-size: .34rem;
        color: #24c3c5;
        border: 1px solid #24c3c5;
        border-radius: .1rem;
    }
    .shareBtn {
        width: 100%;
        height: .86rem;
        text-align: center;
        line-height: .86rem;
        font-size: .34rem;
        color: #fff;
        border-radius: .1rem;
        background:  #24c3c5;
        margin-top: .2rem;
    }
}
 .shareMask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../../assets/image/share.png) no-repeat;
    background-size: 100% 100%;
    left: 0;
    top: 0;
    z-index: 999;
  }
</style>
